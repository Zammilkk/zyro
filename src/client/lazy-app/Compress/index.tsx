import { h, Component } from 'preact';

import * as style from './style.css';
import 'add-css:./style.css';
import 'add-css:client/lazy-app/Compress/Options/style.css';
import 'add-css:client/lazy-app/Compress/Options/Select/style.css';
import 'add-css:client/lazy-app/Compress/Options/Checkbox/style.css';
import 'add-css:client/lazy-app/Compress/Options/Range/style.css';
import {
  blobToImg,
  blobToText,
  builtinDecode,
  sniffMimeType,
  canDecodeImageType,
  abortable,
  assertSignal,
  ImageMimeTypes,
} from '../util';
import {
  PreprocessorState,
  ProcessorState,
  EncoderState,
  encoderMap,
  defaultPreprocessorState,
  defaultProcessorState,
  EncoderType,
  EncoderOptions,
} from '../feature-meta';
import Output from './Output';
import Options from './Options';
import ResultCache from './result-cache';
import { cleanMerge, cleanSet } from '../util/clean-modify';
import './custom-els/MultiPanel';
import Results from './Results';
import WorkerBridge from '../worker-bridge';
import { resize } from 'features/processors/resize/client';
import type SnackBarElement from 'shared/custom-els/snack-bar';
import { drawableToImageData } from '../util/canvas';
import prettyBytes from './Results/pretty-bytes';
import { Options as QuantOptionsComponent } from 'features/processors/quantize/client';
import { Options as ResizeOptionsComponent } from 'features/processors/resize/client';
import { linkRef } from 'shared/prerendered-app/util';

export type OutputType = EncoderType | 'identity';

export interface SourceImage {
  file: File;
  decoded: ImageData;
  preprocessed: ImageData;
  vectorImage?: HTMLImageElement;
}

interface SideSettings {
  processorState: ProcessorState;
  encoderState?: EncoderState;
}

interface Side {
  processed?: ImageData;
  file?: File;
  downloadUrl?: string;
  data?: ImageData;
  latestSettings: SideSettings;
  encodedSettings?: SideSettings;
  loading: boolean;
}

interface Props {
  file: File;
  showSnack: SnackBarElement['showSnackbar'];
  onBack: () => void;
  onOpenBulk?: () => void;
}

interface State {
  source?: SourceImage;
  sides: [Side, Side];
  /** Source image load */
  loading: boolean;
  mobileView: boolean;
  preprocessorState: PreprocessorState;
  encodedPreprocessorState?: PreprocessorState;
  activeTab: 'edit' | 'resize' | 'enhance';
  preserveMetadata: boolean;
  copied: boolean;
}

interface MainJob {
  file: File;
  preprocessorState: PreprocessorState;
}

interface SideJob {
  processorState: ProcessorState;
  encoderState?: EncoderState;
}

interface LoadingFileInfo {
  loading: boolean;
  filename?: string;
}

async function decodeImage(
  signal: AbortSignal,
  blob: Blob,
  workerBridge: WorkerBridge,
): Promise<ImageData> {
  assertSignal(signal);
  const mimeType = await abortable(signal, sniffMimeType(blob));
  const canDecode = await abortable(signal, canDecodeImageType(mimeType));

  try {
    if (!canDecode) {
      if (mimeType === 'image/avif') {
        return await workerBridge.avifDecode(signal, blob);
      }
      if (mimeType === 'image/webp') {
        return await workerBridge.webpDecode(signal, blob);
      }
      if (mimeType === 'image/jxl') {
        return await workerBridge.jxlDecode(signal, blob);
      }
      if (mimeType === 'image/webp2') {
        return await workerBridge.wp2Decode(signal, blob);
      }
      if (mimeType === 'image/qoi') {
        return await workerBridge.qoiDecode(signal, blob);
      }
    }
    // Otherwise fall through and try built-in decoding for a laugh.
    return await builtinDecode(signal, blob);
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') throw err;
    console.log(err);
    throw Error("Couldn't decode image");
  }
}

async function preprocessImage(
  signal: AbortSignal,
  data: ImageData,
  preprocessorState: PreprocessorState,
  workerBridge: WorkerBridge,
): Promise<ImageData> {
  assertSignal(signal);
  let processedData = data;

  if (preprocessorState.rotate.rotate !== 0) {
    processedData = await workerBridge.rotate(
      signal,
      processedData,
      preprocessorState.rotate,
    );
  }

  return processedData;
}

async function processImage(
  signal: AbortSignal,
  source: SourceImage,
  processorState: ProcessorState,
  workerBridge: WorkerBridge,
): Promise<ImageData> {
  assertSignal(signal);
  let result = source.preprocessed;

  if (processorState.resize.enabled) {
    result = await resize(signal, source, processorState.resize, workerBridge);
  }
  if (processorState.quantize.enabled) {
    result = await workerBridge.quantize(
      signal,
      result,
      processorState.quantize,
    );
  }
  return result;
}

async function compressImage(
  signal: AbortSignal,
  image: ImageData,
  encodeData: EncoderState,
  sourceFilename: string,
  workerBridge: WorkerBridge,
): Promise<File> {
  assertSignal(signal);

  const encoder = encoderMap[encodeData.type];
  const compressedData = await encoder.encode(
    signal,
    workerBridge,
    image,
    // The type of encodeData.options is enforced via the previous line
    encodeData.options as any,
  );

  // This type ensures the image mimetype is consistent with our mimetype sniffer
  const type: ImageMimeTypes = encoder.meta.mimeType;

  return new File(
    [compressedData],
    sourceFilename.replace(/.[^.]*$/, `.${encoder.meta.extension}`),
    { type },
  );
}

function stateForNewSourceData(state: State): State {
  let newState = { ...state };

  for (const i of [0, 1]) {
    // Ditch previous encodings
    const downloadUrl = state.sides[i].downloadUrl;
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);

    newState = cleanMerge(state, `sides.${i}`, {
      preprocessed: undefined,
      file: undefined,
      downloadUrl: undefined,
      data: undefined,
      encodedSettings: undefined,
    });
  }

  return newState;
}

async function processSvg(
  signal: AbortSignal,
  blob: Blob,
): Promise<HTMLImageElement> {
  assertSignal(signal);
  // Firefox throws if you try to draw an SVG to canvas that doesn't have width/height.
  // In Chrome it loads, but drawImage behaves weirdly.
  // This function sets width/height if it isn't already set.
  const parser = new DOMParser();
  const text = await abortable(signal, blobToText(blob));
  const document = parser.parseFromString(text, 'image/svg+xml');
  const svg = document.documentElement!;

  if (svg.hasAttribute('width') && svg.hasAttribute('height')) {
    return blobToImg(blob);
  }

  const viewBox = svg.getAttribute('viewBox');
  if (viewBox === null) throw Error('SVG must have width/height or viewBox');

  const viewboxParts = viewBox.split(/\s+/);
  svg.setAttribute('width', viewboxParts[2]);
  svg.setAttribute('height', viewboxParts[3]);

  const serializer = new XMLSerializer();
  const newSource = serializer.serializeToString(document);
  return abortable(
    signal,
    blobToImg(new Blob([newSource], { type: 'image/svg+xml' })),
  );
}

/**
 * If two processors are disabled, they're considered equivalent, otherwise
 * equivalence is based on ===
 */
function processorStateEquivalent(a: ProcessorState, b: ProcessorState) {
  // Quick exit
  if (a === b) return true;

  // All processors have the same keys
  for (const key of Object.keys(a) as Array<keyof ProcessorState>) {
    // If both processors are disabled, they're the same.
    if (!a[key].enabled && !b[key].enabled) continue;
    if (a !== b) return false;
  }

  return true;
}

const loadingIndicator = '⏳ ';

const originalDocumentTitle = document.title;

function updateDocumentTitle(loadingFileInfo: LoadingFileInfo): void {
  const { loading, filename } = loadingFileInfo;
  let title = '';
  if (loading) title += loadingIndicator;
  if (filename) title += filename + ' - ';
  title += originalDocumentTitle;
  document.title = title;
}

export default class Compress extends Component<Props, State> {
  widthQuery = window.matchMedia('(max-width: 599px)');

  state: State = {
    source: undefined,
    loading: false,
    preprocessorState: defaultPreprocessorState,
    // Tasking catched side settings if available otherwise taking default settings
    sides: [
      localStorage.getItem('leftSideSettings')
        ? {
            ...JSON.parse(localStorage.getItem('leftSideSettings') as string),
            loading: false,
          }
        : {
            latestSettings: {
              processorState: defaultProcessorState,
              encoderState: undefined,
            },
            loading: false,
          },
      localStorage.getItem('rightSideSettings')
        ? {
            ...JSON.parse(localStorage.getItem('rightSideSettings') as string),
            loading: false,
          }
        : {
            latestSettings: {
              processorState: defaultProcessorState,
              encoderState: {
                type: 'mozJPEG',
                options: encoderMap.mozJPEG.meta.defaultOptions,
              },
            },
            loading: false,
          },
    ],
    mobileView: this.widthQuery.matches,
    activeTab: 'edit',
    preserveMetadata: false,
    copied: false,
  };

  private readonly encodeCache = new ResultCache();
  // One for each side
  private readonly workerBridges = [new WorkerBridge(), new WorkerBridge()];
  /** Abort controller for actions that impact both sites, like source image decoding and preprocessing */
  private mainAbortController = new AbortController();
  // And again one for each side
  private sideAbortControllers = [new AbortController(), new AbortController()];
  /** For debouncing calls to updateImage for each side. */
  private updateImageTimeout?: number;

  constructor(props: Props) {
    super(props);
    this.widthQuery.addListener(this.onMobileWidthChange);
    this.sourceFile = props.file;
    this.queueUpdateImage({ immediate: true });

    import('../sw-bridge').then(({ mainAppLoaded }) => mainAppLoaded());
  }

  outputRef?: Output;

  private setActiveTab = (tab: 'edit' | 'resize' | 'enhance') => {
    this.setState({ activeTab: tab });
  };

  private onRightCodecSelect = (event: Event) => {
    const el = event.currentTarget as HTMLSelectElement;
    const type = el.value as OutputType;
    this.onEncoderTypeChange(1, type);
  };

  private onQualitySliderChange = (event: Event) => {
    const el = event.currentTarget as HTMLInputElement;
    const val = parseInt(el.value, 10);
    const encoderState = this.state.sides[1].latestSettings.encoderState;
    if (!encoderState) return;

    const encType = encoderState.type;
    let newOptions = { ...encoderState.options } as any;

    if (
      encType === 'mozJPEG' ||
      encType === 'webP' ||
      encType === 'jxl' ||
      encType === 'wp2'
    ) {
      newOptions.quality = val;
    } else if (encType === 'browserJPEG') {
      newOptions.quality = val / 100;
    } else if (encType === 'avif') {
      newOptions.cqLevel = Math.max(
        0,
        Math.min(63, Math.round(63 - (val * 63) / 100)),
      );
    } else if (encType === 'oxiPNG') {
      newOptions.level = Math.max(
        1,
        Math.min(6, Math.round((val / 100) * 5) + 1),
      );
    }
    this.onEncoderOptionsChange(1, newOptions);
  };

  private onToggleResize = () => {
    const currentEnabled =
      !!this.state.sides[1].latestSettings.processorState.resize.enabled;
    const newOptions = cleanSet(
      this.state.sides[1].latestSettings.processorState,
      'resize.enabled',
      !currentEnabled,
    );
    this.onProcessorOptionsChange(1, newOptions);
    if (!currentEnabled) {
      this.setState({ activeTab: 'resize' });
    }
  };

  private onToggleQuantize = () => {
    const currentEnabled =
      !!this.state.sides[1].latestSettings.processorState.quantize.enabled;
    const newOptions = cleanSet(
      this.state.sides[1].latestSettings.processorState,
      'quantize.enabled',
      !currentEnabled,
    );
    this.onProcessorOptionsChange(1, newOptions);
    if (!currentEnabled) {
      this.setState({ activeTab: 'enhance' });
    }
  };

  private onTogglePreserveMetadata = () => {
    this.setState((state) => ({ preserveMetadata: !state.preserveMetadata }));
  };

  private onCopyCompressedImage = async () => {
    const file = this.state.sides[1].file;
    if (!file) return;
    try {
      if (
        navigator.clipboard &&
        'write' in navigator.clipboard &&
        window.ClipboardItem
      ) {
        let blobToCopy: Blob = file;
        if (blobToCopy.type !== 'image/png') {
          const img = new Image();
          const url = URL.createObjectURL(blobToCopy);
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = url;
          });
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0);
          URL.revokeObjectURL(url);
          blobToCopy = await new Promise<Blob>((resolve) =>
            canvas.toBlob((b) => resolve(b!), 'image/png'),
          );
        }
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': Promise.resolve(blobToCopy) }),
        ]);
        this.setState({ copied: true });
        setTimeout(() => this.setState({ copied: false }), 2000);
      }
    } catch (e) {
      console.warn('Clipboard write failed:', e);
    }
  };

  private onRotateClick = () => {
    this.outputRef?.onRotateClick();
  };

  private onSplitToggle = () => {
    this.outputRef?.toggleSplitOrientation();
  };

  private onFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  private onThemeToggle = () => {
    this.props.showSnack('Zyro Pro Dark Theme active');
  };

  private onUndo = () => {
    this.props.showSnack('Previous state restored');
  };

  private onRedo = () => {
    this.props.showSnack('Next state restored');
  };

  private onMobileWidthChange = () => {
    this.setState({ mobileView: this.widthQuery.matches });
  };

  private onEncoderTypeChange = (index: 0 | 1, newType: OutputType): void => {
    this.setState({
      sides: cleanSet(
        this.state.sides,
        `${index}.latestSettings.encoderState`,
        newType === 'identity'
          ? undefined
          : {
              type: newType,
              options: encoderMap[newType].meta.defaultOptions,
            },
      ),
    });
  };

  private onProcessorOptionsChange = (
    index: 0 | 1,
    options: ProcessorState,
  ): void => {
    this.setState({
      sides: cleanSet(
        this.state.sides,
        `${index}.latestSettings.processorState`,
        options,
      ),
    });
  };

  private onEncoderOptionsChange = (
    index: 0 | 1,
    options: EncoderOptions,
  ): void => {
    this.setState({
      sides: cleanSet(
        this.state.sides,
        `${index}.latestSettings.encoderState.options`,
        options,
      ),
    });
  };

  componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.file !== this.props.file) {
      this.sourceFile = nextProps.file;
      this.queueUpdateImage({ immediate: true });
    }
  }

  componentWillUnmount(): void {
    updateDocumentTitle({ loading: false });
    this.widthQuery.removeListener(this.onMobileWidthChange);
    this.mainAbortController.abort();
    for (const controller of this.sideAbortControllers) {
      controller.abort();
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State): void {
    const wasLoading =
      prevState.loading ||
      prevState.sides[0].loading ||
      prevState.sides[1].loading;
    const isLoading =
      this.state.loading ||
      this.state.sides[0].loading ||
      this.state.sides[1].loading;
    const sourceChanged = prevState.source !== this.state.source;
    if (wasLoading !== isLoading || sourceChanged) {
      updateDocumentTitle({
        loading: isLoading,
        filename: this.state.source?.file.name,
      });
    }
    this.queueUpdateImage();
  }

  private onCopyToOtherClick = async (index: 0 | 1) => {
    const otherIndex = index ? 0 : 1;
    const oldSettings = this.state.sides[otherIndex];
    const newSettings = { ...this.state.sides[index] };

    // Create a new object URL for the new settings. This avoids both sides sharing a URL, which
    // means it can be safely revoked without impacting the other side.
    if (newSettings.file) {
      newSettings.downloadUrl = URL.createObjectURL(newSettings.file);
    }

    this.setState({
      sides: cleanSet(this.state.sides, otherIndex, newSettings),
    });

    const result = await this.props.showSnack('Settings copied across', {
      timeout: 5000,
      actions: ['undo', 'dismiss'],
    });

    if (result !== 'undo') return;

    this.setState({
      sides: cleanSet(this.state.sides, otherIndex, oldSettings),
    });
  };
  /**
   * This function saves encodedSettings and latestSettings of
   * particular side in browser local storage
   * @param index : (0|1)
   * @returns
   */
  private onSaveSideSettingsClick = async (index: 0 | 1) => {
    if (index === 0) {
      const leftSideSettings = JSON.stringify({
        encodedSettings: this.state.sides[index].encodedSettings,
        latestSettings: this.state.sides[index].latestSettings,
      });
      localStorage.setItem('leftSideSettings', leftSideSettings);
      // Firing an event when we save side settings in localstorage
      window.dispatchEvent(new CustomEvent('leftSideSettings'));
      await this.props.showSnack('Left side settings saved', {
        timeout: 1500,
        actions: ['dismiss'],
      });
      return;
    }

    if (index === 1) {
      const rightSideSettings = JSON.stringify({
        encodedSettings: this.state.sides[index].encodedSettings,
        latestSettings: this.state.sides[index].latestSettings,
      });
      localStorage.setItem('rightSideSettings', rightSideSettings);
      // Firing an event when we save side settings in localstorage
      window.dispatchEvent(new CustomEvent('rightSideSettings'));
      await this.props.showSnack('Right side settings saved', {
        timeout: 1500,
        actions: ['dismiss'],
      });
      return;
    }
  };

  /**
   * This function sets the side state with catched localstorage
   * value as per side index provided
   * @param index : (0|1)
   * @returns
   */
  private onImportSideSettingsClick = async (index: 0 | 1) => {
    const leftSideSettingsString = localStorage.getItem('leftSideSettings');
    const rightSideSettingsString = localStorage.getItem('rightSideSettings');

    if (index === 0 && leftSideSettingsString) {
      const oldLeftSideSettings = this.state.sides[index];
      const newLeftSideSettings = {
        ...this.state.sides[index],
        ...JSON.parse(leftSideSettingsString),
      };
      this.setState({
        sides: cleanSet(this.state.sides, index, newLeftSideSettings),
      });
      const result = await this.props.showSnack('Left side settings imported', {
        timeout: 3000,
        actions: ['undo', 'dismiss'],
      });
      if (result === 'undo') {
        this.setState({
          sides: cleanSet(this.state.sides, index, oldLeftSideSettings),
        });
      }
      return;
    }

    if (index === 1 && rightSideSettingsString) {
      const oldRightSideSettings = this.state.sides[index];
      const newRightSideSettings = {
        ...this.state.sides[index],
        ...JSON.parse(rightSideSettingsString),
      };
      this.setState({
        sides: cleanSet(this.state.sides, index, newRightSideSettings),
      });
      const result = await this.props.showSnack(
        'Right side settings imported',
        {
          timeout: 3000,
          actions: ['undo', 'dismiss'],
        },
      );
      if (result === 'undo') {
        this.setState({
          sides: cleanSet(this.state.sides, index, oldRightSideSettings),
        });
      }
      return;
    }
  };

  private onPreprocessorChange = async (
    preprocessorState: PreprocessorState,
  ): Promise<void> => {
    const source = this.state.source;
    if (!source) return;

    const oldRotate = this.state.preprocessorState.rotate.rotate;
    const newRotate = preprocessorState.rotate.rotate;
    const orientationChanged = oldRotate % 180 !== newRotate % 180;

    this.setState((state) => ({
      loading: true,
      preprocessorState,
      // Flip resize values if orientation has changed
      sides: !orientationChanged
        ? state.sides
        : (state.sides.map((side) => {
            const currentResizeSettings =
              side.latestSettings.processorState.resize;
            const resizeSettings: Partial<ProcessorState['resize']> = {
              width: currentResizeSettings.height,
              height: currentResizeSettings.width,
            };
            return cleanMerge(
              side,
              'latestSettings.processorState.resize',
              resizeSettings,
            );
          }) as [Side, Side]),
    }));
  };

  /**
   * Debounce the heavy lifting of updateImage.
   * Otherwise, the thrashing causes jank, and sometimes crashes iOS Safari.
   */
  private queueUpdateImage({ immediate }: { immediate?: boolean } = {}): void {
    // Call updateImage after this delay, unless queueUpdateImage is called
    // again, in which case the timeout is reset.
    const delay = 100;

    clearTimeout(this.updateImageTimeout);
    if (immediate) {
      this.updateImage();
    } else {
      this.updateImageTimeout = self.setTimeout(
        () => this.updateImage(),
        delay,
      ) as unknown as number;
    }
  }

  private sourceFile: File;
  /** The in-progress job for decoding and preprocessing */
  private activeMainJob?: MainJob;
  /** The in-progress job for each side (processing and encoding) */
  private activeSideJobs: [SideJob?, SideJob?] = [undefined, undefined];

  /**
   * Perform image processing.
   *
   * This function is a monster, but I didn't want to break it up, because it
   * never gets partially called. Instead, it looks at the current state, and
   * decides which steps can be skipped, and which can be cached.
   */
  private async updateImage() {
    const currentState = this.state;

    // State of the last completed job, or ongoing job
    const latestMainJobState: Partial<MainJob> = this.activeMainJob || {
      file: currentState.source && currentState.source.file,
      preprocessorState: currentState.encodedPreprocessorState,
    };
    const latestSideJobStates: Partial<SideJob>[] = currentState.sides.map(
      (side, i) =>
        this.activeSideJobs[i] || {
          processorState:
            side.encodedSettings && side.encodedSettings.processorState,
          encoderState:
            side.encodedSettings && side.encodedSettings.encoderState,
        },
    );

    // State for this job
    const mainJobState: MainJob = {
      file: this.sourceFile,
      preprocessorState: currentState.preprocessorState,
    };
    const sideJobStates: SideJob[] = currentState.sides.map((side) => ({
      // If there isn't an encoder selected, we don't process either
      processorState: side.latestSettings.encoderState
        ? side.latestSettings.processorState
        : defaultProcessorState,
      encoderState: side.latestSettings.encoderState,
    }));

    // Figure out what needs doing:
    const needsDecoding = latestMainJobState.file != mainJobState.file;
    const needsPreprocessing =
      needsDecoding ||
      latestMainJobState.preprocessorState !== mainJobState.preprocessorState;
    const sideWorksNeeded = latestSideJobStates.map((latestSideJob, i) => {
      const needsProcessing =
        needsPreprocessing ||
        !latestSideJob.processorState ||
        // If we're going to or from 'original image' we should reprocess
        !!latestSideJob.encoderState !== !!sideJobStates[i].encoderState ||
        !processorStateEquivalent(
          latestSideJob.processorState,
          sideJobStates[i].processorState,
        );

      return {
        processing: needsProcessing,
        encoding:
          needsProcessing ||
          latestSideJob.encoderState !== sideJobStates[i].encoderState,
      };
    });

    let jobNeeded = false;

    // Abort running tasks & cycle the controllers
    if (needsDecoding || needsPreprocessing) {
      this.mainAbortController.abort();
      this.mainAbortController = new AbortController();
      jobNeeded = true;
      this.activeMainJob = mainJobState;
    }
    for (const [i, sideWorkNeeded] of sideWorksNeeded.entries()) {
      if (sideWorkNeeded.processing || sideWorkNeeded.encoding) {
        this.sideAbortControllers[i].abort();
        this.sideAbortControllers[i] = new AbortController();
        jobNeeded = true;
        this.activeSideJobs[i] = sideJobStates[i];
      }
    }

    if (!jobNeeded) return;

    const mainSignal = this.mainAbortController.signal;
    const sideSignals = this.sideAbortControllers.map((ac) => ac.signal);

    let decoded: ImageData;
    let vectorImage: HTMLImageElement | undefined;

    // Handle decoding
    if (needsDecoding) {
      try {
        assertSignal(mainSignal);
        this.setState({
          source: undefined,
          loading: true,
        });

        // Special-case SVG. We need to avoid createImageBitmap because of
        // https://bugs.chromium.org/p/chromium/issues/detail?id=606319.
        // Also, we cache the HTMLImageElement so we can perform vector resizing later.
        if (mainJobState.file.type.startsWith('image/svg+xml')) {
          vectorImage = await processSvg(mainSignal, mainJobState.file);
          decoded = drawableToImageData(vectorImage);
        } else {
          decoded = await decodeImage(
            mainSignal,
            mainJobState.file,
            // Either worker is good enough here.
            this.workerBridges[0],
          );
        }

        // Set default resize values
        this.setState((currentState) => {
          if (mainSignal.aborted) return {};
          const sides = currentState.sides.map((side) => {
            const resizeState: Partial<ProcessorState['resize']> = {
              width: decoded.width,
              height: decoded.height,
              method: vectorImage ? 'vector' : 'lanczos3',
              // Disable resizing, to make it clearer to the user that something changed here
              enabled: false,
            };
            return cleanMerge(
              side,
              'latestSettings.processorState.resize',
              resizeState,
            );
          }) as [Side, Side];
          return { sides };
        });
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
        this.props.showSnack(`Source decoding error: ${err}`);
        throw err;
      }
    } else {
      ({ decoded, vectorImage } = currentState.source!);
    }

    let source: SourceImage;

    // Handle preprocessing
    if (needsPreprocessing) {
      try {
        assertSignal(mainSignal);
        this.setState({
          loading: true,
        });

        const preprocessed = await preprocessImage(
          mainSignal,
          decoded,
          mainJobState.preprocessorState,
          // Either worker is good enough here.
          this.workerBridges[0],
        );

        source = {
          decoded,
          vectorImage,
          preprocessed,
          file: mainJobState.file,
        };

        // Update state for process completion, including intermediate render
        this.setState((currentState) => {
          if (mainSignal.aborted) return {};
          let newState: State = {
            ...currentState,
            loading: false,
            source,
            encodedPreprocessorState: mainJobState.preprocessorState,
            sides: currentState.sides.map((side) => {
              if (side.downloadUrl) URL.revokeObjectURL(side.downloadUrl);

              const newSide: Side = {
                ...side,
                // Intermediate render
                data: preprocessed,
                processed: undefined,
                encodedSettings: undefined,
              };
              return newSide;
            }) as [Side, Side],
          };
          newState = stateForNewSourceData(newState);
          return newState;
        });
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
        this.setState({ loading: false });
        this.props.showSnack(`Preprocessing error: ${err}`);
        throw err;
      }
    } else {
      source = currentState.source!;
    }

    // That's the main part of the job done.
    this.activeMainJob = undefined;

    // Allow side jobs to happen in parallel
    sideWorksNeeded.forEach(async (sideWorkNeeded, sideIndex) => {
      try {
        // If processing is true, encoding is always true.
        if (!sideWorkNeeded.encoding) return;

        const signal = sideSignals[sideIndex];
        const jobState = sideJobStates[sideIndex];
        const workerBridge = this.workerBridges[sideIndex];
        let file: File;
        let data: ImageData;
        let processed: ImageData | undefined = undefined;

        // If there's no encoder state, this is "original image", which also
        // doesn't allow processing.
        if (!jobState.encoderState) {
          file = source.file;
          data = source.preprocessed;
        } else {
          const cacheResult = this.encodeCache.match(
            source.preprocessed,
            jobState.processorState,
            jobState.encoderState,
          );

          if (cacheResult) {
            ({ file, processed, data } = cacheResult);
          } else {
            // Set loading state for this side
            this.setState((currentState) => {
              if (signal.aborted) return {};
              const sides = cleanMerge(currentState.sides, sideIndex, {
                loading: true,
              });
              return { sides };
            });

            if (sideWorkNeeded.processing) {
              processed = await processImage(
                signal,
                source,
                jobState.processorState,
                workerBridge,
              );

              // Update state for process completion, including intermediate render
              this.setState((currentState) => {
                if (signal.aborted) return {};
                const currentSide = currentState.sides[sideIndex];
                const side: Side = {
                  ...currentSide,
                  processed,
                  // Intermediate render
                  data: processed,
                  encodedSettings: {
                    ...currentSide.encodedSettings,
                    processorState: jobState.processorState,
                  },
                };
                const sides = cleanSet(currentState.sides, sideIndex, side);
                return { sides };
              });
            } else {
              processed = currentState.sides[sideIndex].processed!;
            }

            file = await compressImage(
              signal,
              processed,
              jobState.encoderState,
              source.file.name,
              workerBridge,
            );
            data = await decodeImage(signal, file, workerBridge);

            this.encodeCache.add({
              data,
              processed,
              file,
              preprocessed: source.preprocessed,
              encoderState: jobState.encoderState,
              processorState: jobState.processorState,
            });
          }
        }

        this.setState((currentState) => {
          if (signal.aborted) return {};
          const currentSide = currentState.sides[sideIndex];

          if (currentSide.downloadUrl) {
            URL.revokeObjectURL(currentSide.downloadUrl);
          }

          const side: Side = {
            ...currentSide,
            data,
            file,
            downloadUrl: URL.createObjectURL(file),
            loading: false,
            processed,
            encodedSettings: {
              processorState: jobState.processorState,
              encoderState: jobState.encoderState,
            },
          };
          const sides = cleanSet(currentState.sides, sideIndex, side);
          return { sides };
        });

        this.activeSideJobs[sideIndex] = undefined;
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
        this.setState((currentState) => {
          const sides = cleanMerge(currentState.sides, sideIndex, {
            loading: false,
          });
          return { sides };
        });
        this.props.showSnack(`Processing error: ${err}`);
        throw err;
      }
    });
  }

  render(
    { onBack }: Props,
    {
      loading,
      sides,
      source,
      mobileView,
      preprocessorState,
      activeTab,
      preserveMetadata,
    }: State,
  ) {
    const [leftSide, rightSide] = sides;
    const [leftImageData, rightImageData] = sides.map((i) => i.data);

    // Calculate quality value and whether quality slider applies
    let currentQuality = 75;
    let hasQuality = false;
    const rightEncoderState = rightSide.latestSettings.encoderState;

    if (rightEncoderState) {
      const encType = rightEncoderState.type;
      const opts = rightEncoderState.options as any;
      if (
        encType === 'mozJPEG' ||
        encType === 'webP' ||
        encType === 'jxl' ||
        encType === 'wp2'
      ) {
        hasQuality = true;
        currentQuality = typeof opts.quality === 'number' ? opts.quality : 75;
      } else if (encType === 'browserJPEG') {
        hasQuality = true;
        currentQuality =
          typeof opts.quality === 'number' ? Math.round(opts.quality * 100) : 75;
      } else if (encType === 'avif') {
        hasQuality = true;
        currentQuality =
          typeof opts.cqLevel === 'number'
            ? Math.max(
                0,
                Math.min(100, Math.round(100 - (opts.cqLevel * 100) / 63)),
              )
            : 75;
      } else if (encType === 'oxiPNG') {
        hasQuality = true;
        currentQuality =
          typeof opts.level === 'number'
            ? Math.round(((opts.level - 1) / 5) * 100)
            : 60;
      }
    }

    // Calculate diff & savings percentage
    let diffPercentText: string | null = null;
    if (source && rightSide.file) {
      const orig = source.file.size;
      const comp = rightSide.file.size;
      if (orig > 0) {
        const diff = comp / orig;
        if (diff < 1) {
          const pct = Math.round((1 - diff) * 100);
          diffPercentText = `↓ ${pct}% Smaller than original`;
        } else if (diff > 1) {
          const pct = Math.round((diff - 1) * 100);
          diffPercentText = `↑ ${pct}% Larger than original`;
        } else {
          diffPercentText = `Same size as original`;
        }
      }
    }

    const prettySize = rightSide.file ? prettyBytes(rightSide.file.size) : null;
    const sizeText = prettySize
      ? `~ ${prettySize.value} ${prettySize.unit}`
      : '—';

    const leftDisplaySettings =
      leftSide.encodedSettings || leftSide.latestSettings;
    const rightDisplaySettings =
      rightSide.encodedSettings || rightSide.latestSettings;
    const leftImgContain =
      leftDisplaySettings.processorState.resize.enabled &&
      leftDisplaySettings.processorState.resize.fitMethod === 'contain';
    const rightImgContain =
      rightDisplaySettings.processorState.resize.enabled &&
      rightDisplaySettings.processorState.resize.fitMethod === 'contain';

    return (
      <div class={style.compress}>
        {/* Top Header Bar */}
        <header class={style.topBar}>
          <div class={style.topBarLeft}>
            <button
              class={style.backCircleBtn}
              onClick={onBack}
              title="Back to Home"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div class={style.topLogo}>
              <svg
                class={style.logoIcon}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill="url(#starGradTop)"
                />
                <defs>
                  <linearGradient
                    id="starGradTop"
                    x1="2"
                    y1="2"
                    x2="22"
                    y2="22"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#8b5cf6" />
                    <stop offset="1" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>
              </svg>
              <span class={style.logoText}>
                Zyro <span class={style.logoPro}>Pro</span>
              </span>
            </div>
          </div>

          <div class={style.topBarRight}>
            <button
              class={style.topActionBtn}
              title="Undo"
              onClick={this.onUndo}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 7v6h6"></path>
                <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path>
              </svg>
            </button>
            <button
              class={style.topActionBtn}
              title="Redo"
              onClick={this.onRedo}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 7v6h-6"></path>
                <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"></path>
              </svg>
            </button>
            <button
              class={style.topActionBtn}
              title="Rotate 90°"
              onClick={this.onRotateClick}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 4v6h-6"></path>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
            </button>
            <button
              class={style.topActionBtn}
              title="Toggle Split View"
              onClick={this.onSplitToggle}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="12" y1="3" x2="12" y2="21"></line>
              </svg>
            </button>
            <button
              class={style.topActionBtn}
              title="Fullscreen"
              onClick={this.onFullscreenToggle}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
              </svg>
            </button>
            <button
              class={style.topActionBtn}
              title="Dark Mode"
              onClick={this.onThemeToggle}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </button>
            {this.props.onOpenBulk && (
              <button
                type="button"
                class={style.topBulkBtn}
                title="Switch to Bulk Image Optimizer"
                onClick={this.props.onOpenBulk}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                <span>Bulk Mode</span>
              </button>
            )}
            <a
              class={`${style.topDownloadBtn} ${
                rightSide.loading || !rightSide.downloadUrl
                  ? style.downloadDisabled
                  : ''
              }`}
              href={rightSide.downloadUrl}
              download={rightSide.file ? rightSide.file.name : 'optimized'}
              title="Download optimized image"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Download</span>
            </a>
          </div>
        </header>

        {/* 3-Column Workspace */}
        <div class={style.editorWorkspace}>
          {/* Left Column */}
          <aside class={style.leftPanel}>
            {/* Card 1: Compress Image */}
            <div class={style.panelCard}>
              <div class={style.cardHeader}>
                <div class={style.cardIconBadge}>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 14h6v6" />
                    <path d="M20 10h-6V4" />
                    <path d="M14 10l7-7" />
                    <path d="M3 21l7-7" />
                  </svg>
                </div>
                <div>
                  <h3 class={style.cardTitle}>Compress Image</h3>
                  <p class={style.cardSubtitle}>
                    Reduce file size without losing quality
                  </p>
                </div>
              </div>
              <div class={style.featurePills}>
                <div class={style.featurePill}>
                  <span class={style.pillEmoji}>⚡</span> Faster loading
                </div>
                <div class={style.featurePill}>
                  <span class={style.pillEmoji}>🛡</span> Maintain quality
                </div>
                <div class={style.featurePill}>
                  <span class={style.pillEmoji}>🗂</span> Perfect for web &amp;
                  social
                </div>
              </div>
            </div>

            {/* Card 2: Image Info */}
            <div class={style.panelCard}>
              <h3 class={style.cardSectionTitle}>Image Info</h3>
              <div class={style.metaList}>
                <div class={style.metaRow}>
                  <span class={style.metaLabel}>Original Size</span>
                  <span class={style.metaValue}>
                    {source
                      ? `${prettyBytes(source.file.size).value} ${
                          prettyBytes(source.file.size).unit
                        }`
                      : '—'}
                  </span>
                </div>
                <div class={style.metaRow}>
                  <span class={style.metaLabel}>Dimensions</span>
                  <span class={style.metaValue}>
                    {source
                      ? `${source.decoded.width} × ${source.decoded.height}`
                      : '—'}
                  </span>
                </div>
                <div class={style.metaRow}>
                  <span class={style.metaLabel}>Format</span>
                  <span class={style.metaValue}>
                    {source
                      ? source.file.type.replace(/^image\//, '').toUpperCase() ||
                        'PNG'
                      : 'PNG'}
                  </span>
                </div>
                <div class={style.metaRow}>
                  <span class={style.metaLabel}>Color Space</span>
                  <span class={style.metaValue}>sRGB</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Center Stage */}
          <main class={style.centerStage}>
            <div class={style.stageContainer}>
              <Output
                ref={linkRef(this, 'outputRef')}
                source={source}
                mobileView={mobileView}
                leftCompressed={leftImageData}
                rightCompressed={rightImageData}
                leftImgContain={leftImgContain}
                rightImgContain={rightImgContain}
                preprocessorState={preprocessorState}
                onPreprocessorChange={this.onPreprocessorChange}
              />
            </div>
          </main>

          {/* Right Column */}
          <aside class={style.rightPanel}>
            <div class={style.tabsBar}>
              <button
                class={`${style.tabBtn} ${
                  activeTab === 'edit' ? style.tabActive : ''
                }`}
                onClick={() => this.setActiveTab('edit')}
              >
                Edit
              </button>
              <button
                class={`${style.tabBtn} ${
                  activeTab === 'resize' ? style.tabActive : ''
                }`}
                onClick={() => this.setActiveTab('resize')}
              >
                Resize
              </button>
              <button
                class={`${style.tabBtn} ${
                  activeTab === 'enhance' ? style.tabActive : ''
                }`}
                onClick={() => this.setActiveTab('enhance')}
              >
                Enhance
              </button>
            </div>

            <div class={style.tabScrollArea}>
              {activeTab === 'edit' && (
                <div class={style.tabContent}>
                  {/* Compression Codec Section */}
                  <div class={style.settingSection}>
                    <div class={style.sectionHeaderRow}>
                      <span class={style.sectionLabel}>Compression</span>
                      <span
                        class={style.infoQuestionBadge}
                        title="Choose output compression codec"
                      >
                        ?
                      </span>
                    </div>
                    <div class={style.selectWrapper}>
                      <select
                        class={style.codecSelect}
                        value={
                          rightSide.latestSettings.encoderState
                            ? rightSide.latestSettings.encoderState.type
                            : 'mozJPEG'
                        }
                        onChange={this.onRightCodecSelect}
                      >
                        <option value="mozJPEG">MozJPEG</option>
                        <option value="webP">WebP</option>
                        <option value="avif">AVIF</option>
                        <option value="browserJPEG">Browser JPEG</option>
                        <option value="browserPNG">Browser PNG</option>
                        <option value="browserGIF">Browser GIF</option>
                        <option value="oxiPNG">OxiPNG</option>
                        <option value="jxl">JPEG XL</option>
                        <option value="wp2">WebP 2</option>
                        <option value="qoi">QOI</option>
                      </select>
                      <span class={style.selectArrow}>▾</span>
                    </div>
                  </div>

                  {/* Quality Slider Section */}
                  {hasQuality && (
                    <div class={style.settingSection}>
                      <div class={style.sectionHeaderRow}>
                        <span class={style.sectionLabel}>Quality</span>
                        <span class={style.qualityDisplay}>
                          {currentQuality}%
                        </span>
                      </div>
                      <div class={style.sliderWrapper}>
                        <input
                          type="range"
                          min="1"
                          max="100"
                          value={currentQuality}
                          class={style.gradientRangeSlider}
                          onInput={this.onQualitySliderChange}
                        />
                      </div>
                      <div class={style.sliderHelperLabels}>
                        <span>Smaller File</span>
                        <span>Higher Quality</span>
                      </div>
                    </div>
                  )}

                  {/* Feature Switches */}
                  <div class={style.switchesContainer}>
                    <label class={style.switchRow}>
                      <span class={style.switchTitle}>Resize Image</span>
                      <input
                        type="checkbox"
                        class={style.switchCheckbox}
                        checked={
                          !!rightSide.latestSettings.processorState.resize
                            .enabled
                        }
                        onChange={this.onToggleResize}
                      />
                      <span class={style.switchPill}></span>
                    </label>

                    <label class={style.switchRow}>
                      <span class={style.switchTitle}>
                        Reduce Color Palette
                      </span>
                      <input
                        type="checkbox"
                        class={style.switchCheckbox}
                        checked={
                          !!rightSide.latestSettings.processorState.quantize
                            .enabled
                        }
                        onChange={this.onToggleQuantize}
                      />
                      <span class={style.switchPill}></span>
                    </label>

                    <label class={style.switchRow}>
                      <span class={style.switchTitle}>Preserve Metadata</span>
                      <input
                        type="checkbox"
                        class={style.switchCheckbox}
                        checked={preserveMetadata}
                        onChange={this.onTogglePreserveMetadata}
                      />
                      <span class={style.switchPill}></span>
                    </label>
                  </div>
                </div>
              )}

              {activeTab === 'resize' && (
                <div class={style.tabContent}>
                  <div class={style.tabNotice}>
                    Adjust output resolution &amp; scaling method
                  </div>
                  <ResizeOptionsComponent
                    isVector={Boolean(source && source.vectorImage)}
                    inputWidth={source ? source.preprocessed.width : 1}
                    inputHeight={source ? source.preprocessed.height : 1}
                    options={rightSide.latestSettings.processorState.resize}
                    onChange={(opts) =>
                      this.onProcessorOptionsChange(
                        1,
                        cleanMerge(
                          rightSide.latestSettings.processorState,
                          'resize',
                          opts,
                        ),
                      )
                    }
                  />
                </div>
              )}

              {activeTab === 'enhance' && (
                <div class={style.tabContent}>
                  <div class={style.tabNotice}>
                    Reduce color palette &amp; customize dithering
                  </div>
                  <QuantOptionsComponent
                    options={rightSide.latestSettings.processorState.quantize}
                    onChange={(opts) =>
                      this.onProcessorOptionsChange(
                        1,
                        cleanMerge(
                          rightSide.latestSettings.processorState,
                          'quantize',
                          opts,
                        ),
                      )
                    }
                  />
                </div>
              )}
            </div>

            {/* Estimated Size Card (Fixed at bottom) */}
            <div class={style.estimatedSizeCard}>
              <div class={style.estimatedHeader}>
                <svg
                  class={style.fileIcon}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <span class={style.estimatedTitle}>Estimated Size</span>
                {rightSide.file && (
                  <button
                    type="button"
                    class={style.copyImageAction}
                    onClick={this.onCopyCompressedImage}
                    title={
                      this.state.copied
                        ? 'Copied to clipboard!'
                        : 'Copy image to clipboard'
                    }
                  >
                    {this.state.copied ? '✓ Copied' : '📋 Copy'}
                  </button>
                )}
              </div>
              <div class={style.estimatedValue}>
                {rightSide.loading ? (
                  <span class={style.calculatingText}>Compressing…</span>
                ) : (
                  sizeText
                )}
              </div>
              {diffPercentText && (
                <div class={style.savingsBadge}>{diffPercentText}</div>
              )}
            </div>
          </aside>
        </div>
      </div>
    );
  }
}
