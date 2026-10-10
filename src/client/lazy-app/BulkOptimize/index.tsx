import { h, Component, Fragment } from 'preact';
// @ts-ignore
import JSZip from 'jszip/dist/jszip.min.js';
import * as style from './style.css';
import 'add-css:./style.css';
import {
  blobToImg,
  builtinDecode,
  sniffMimeType,
  canDecodeImageType,
  abortable,
  assertSignal,
} from '../util';
import { encoderMap } from '../feature-meta';
import WorkerBridge from '../worker-bridge';
import prettyBytes from '../Compress/Results/pretty-bytes';
import type SnackBarElement from 'shared/custom-els/snack-bar';

export type BulkFormat = 'webP' | 'mozJPEG' | 'avif' | 'oxiPNG';

export interface BulkItem {
  id: string;
  file: File;
  previewUrl: string;
  originalSize: number;
  dimensions?: { width: number; height: number };
  status: 'pending' | 'compressing' | 'done' | 'error';
  compressedBlob?: Blob;
  compressedSize?: number;
  compressedUrl?: string;
  outputFilename: string;
  savings?: number;
  error?: string;
}

interface Props {
  initialFiles?: File[];
  showSnack: SnackBarElement['showSnackbar'];
  onBackToSingle: (file?: File) => void;
  onHome: () => void;
}

interface State {
  items: BulkItem[];
  targetFormat: BulkFormat;
  quality: number;
  maxDimension: number;
  isProcessing: boolean;
}

function formatBytes(bytes: number): string {
  const pb = prettyBytes(bytes);
  return `${pb.value} ${pb.unit}`;
}

export default class BulkOptimize extends Component<Props, State> {
  state: State = {
    items: [],
    targetFormat: 'webP',
    quality: 75,
    maxDimension: 0,
    isProcessing: false,
  };

  private workerBridge = new WorkerBridge();
  private abortController = new AbortController();
  private fileInputRef?: HTMLInputElement;
  private queueRunning = false;

  constructor(props: Props) {
    super(props);
    if (props.initialFiles && props.initialFiles.length > 0) {
      this.addFiles(props.initialFiles);
    }
  }

  componentWillUnmount() {
    this.abortController.abort();
    this.cleanupUrls();
  }

  private cleanupUrls() {
    for (const item of this.state.items) {
      if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      if (item.compressedUrl) URL.revokeObjectURL(item.compressedUrl);
    }
  }

  public addFiles = (files: File[] | FileList) => {
    const validFiles = Array.from(files).filter(
      (f) => f.type.startsWith('image/') || /\.(png|jpe?g|webp|avif|jxl|svg)$/i.test(f.name),
    );

    if (validFiles.length === 0) {
      this.props.showSnack('Please select valid image files');
      return;
    }

    const newItems: BulkItem[] = validFiles.map((file) => {
      const ext = this.getFormatExtension(this.state.targetFormat);
      const outputFilename = file.name.replace(/\.[^.]+$/, `.${ext}`);
      return {
        id: `${file.name}-${file.size}-${Math.random().toString(36).substring(2, 9)}`,
        file,
        previewUrl: URL.createObjectURL(file),
        originalSize: file.size,
        status: 'pending',
        outputFilename,
      };
    });

    this.setState(
      (prev) => ({ items: [...prev.items, ...newItems] }),
      () => {
        this.processQueue();
      },
    );
  };

  private getFormatExtension(format: BulkFormat): string {
    switch (format) {
      case 'webP':
        return 'webp';
      case 'mozJPEG':
        return 'jpg';
      case 'avif':
        return 'avif';
      case 'oxiPNG':
        return 'png';
      default:
        return 'webp';
    }
  }

  private onFileInputChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.addFiles(input.files);
      input.value = '';
    }
  };

  private onDrop = (event: DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files) {
      this.addFiles(event.dataTransfer.files);
    }
  };

  private onDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  private async decodeFileToImageData(signal: AbortSignal, file: File): Promise<ImageData> {
    assertSignal(signal);

    if (file.type.startsWith('image/svg+xml')) {
      const img = await blobToImg(file);
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || 800;
      canvas.height = img.naturalHeight || 600;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      return ctx.getImageData(0, 0, canvas.width, canvas.height);
    }

    const mimeType = await abortable(signal, sniffMimeType(file));
    const canDecode = await abortable(signal, canDecodeImageType(mimeType));

    if (!canDecode) {
      if (mimeType === 'image/avif') {
        return await this.workerBridge.avifDecode(signal, file);
      }
      if (mimeType === 'image/webp') {
        return await this.workerBridge.webpDecode(signal, file);
      }
      if (mimeType === 'image/jxl') {
        return await this.workerBridge.jxlDecode(signal, file);
      }
      if (mimeType === 'image/webp2') {
        return await this.workerBridge.wp2Decode(signal, file);
      }
      if (mimeType === 'image/qoi') {
        return await this.workerBridge.qoiDecode(signal, file);
      }
    }

    return await builtinDecode(signal, file);
  }

  private async resizeImageData(
    imageData: ImageData,
    maxDimension: number,
  ): Promise<ImageData> {
    if (
      maxDimension <= 0 ||
      (imageData.width <= maxDimension && imageData.height <= maxDimension)
    ) {
      return imageData;
    }

    const ratio = Math.min(
      maxDimension / imageData.width,
      maxDimension / imageData.height,
    );
    const targetWidth = Math.max(1, Math.round(imageData.width * ratio));
    const targetHeight = Math.max(1, Math.round(imageData.height * ratio));

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d')!;

    const imgBitmap = await createImageBitmap(imageData);
    ctx.drawImage(imgBitmap, 0, 0, targetWidth, targetHeight);
    return ctx.getImageData(0, 0, targetWidth, targetHeight);
  }

  private async compressItem(item: BulkItem): Promise<void> {
    const signal = this.abortController.signal;
    const { targetFormat, quality, maxDimension } = this.state;

    // Set item status to compressing
    this.setState((prev) => ({
      items: prev.items.map((i) =>
        i.id === item.id ? { ...i, status: 'compressing' as const } : i,
      ),
    }));

    try {
      // 1. Decode
      let imageData = await this.decodeFileToImageData(signal, item.file);
      const originalDimensions = { width: imageData.width, height: imageData.height };

      // 2. Resize if specified
      if (maxDimension > 0) {
        imageData = await this.resizeImageData(imageData, maxDimension);
      }

      // 3. Encode
      const encoder = encoderMap[targetFormat];
      let options: any;
      if (targetFormat === 'webP' || targetFormat === 'mozJPEG') {
        options = { ...encoder.meta.defaultOptions, quality };
      } else if (targetFormat === 'avif') {
        const cqLevel = Math.max(0, Math.min(63, Math.round(63 - (quality * 63) / 100)));
        options = { ...encoder.meta.defaultOptions, cqLevel };
      } else if (targetFormat === 'oxiPNG') {
        const level = Math.max(1, Math.min(6, Math.round((quality / 100) * 5) + 1));
        options = { ...encoder.meta.defaultOptions, level };
      }

      const compressedBuffer = await encoder.encode(
        signal,
        this.workerBridge,
        imageData,
        options,
      );

      const compressedBlob = new Blob([compressedBuffer], {
        type: encoder.meta.mimeType,
      });

      const compressedSize = compressedBlob.size;
      const savings = Math.round(
        ((item.originalSize - compressedSize) / item.originalSize) * 100,
      );
      const ext = this.getFormatExtension(targetFormat);
      const outputFilename = item.file.name.replace(/\.[^.]+$/, `.${ext}`);
      const compressedUrl = URL.createObjectURL(compressedBlob);

      this.setState((prev) => ({
        items: prev.items.map((i) =>
          i.id === item.id
            ? {
                ...i,
                status: 'done' as const,
                dimensions: originalDimensions,
                compressedBlob,
                compressedSize,
                compressedUrl,
                outputFilename,
                savings,
              }
            : i,
        ),
      }));
    } catch (err: any) {
      if (signal.aborted) return;
      console.error('Bulk compression error for:', item.file.name, err);
      this.setState((prev) => ({
        items: prev.items.map((i) =>
          i.id === item.id
            ? { ...i, status: 'error' as const, error: err?.message || 'Compression failed' }
            : i,
        ),
      }));
    }
  }

  private async processQueue() {
    if (this.queueRunning) return;
    this.queueRunning = true;
    this.setState({ isProcessing: true });

    try {
      while (true) {
        const pendingItem = this.state.items.find((i) => i.status === 'pending');
        if (!pendingItem) break;
        await this.compressItem(pendingItem);
      }
    } finally {
      this.queueRunning = false;
      this.setState({ isProcessing: false });
    }
  }

  private onFormatChange = (e: Event) => {
    const targetFormat = (e.target as HTMLSelectElement).value as BulkFormat;
    this.setState({ targetFormat }, () => this.recompressAll());
  };

  private onQualityChange = (e: Event) => {
    const quality = parseInt((e.target as HTMLInputElement).value, 10);
    this.setState({ quality });
  };

  private onQualityCommit = () => {
    this.recompressAll();
  };

  private onResolutionChange = (e: Event) => {
    const maxDimension = parseInt((e.target as HTMLSelectElement).value, 10);
    this.setState({ maxDimension }, () => this.recompressAll());
  };

  private recompressAll = () => {
    this.abortController.abort();
    this.abortController = new AbortController();

    this.setState(
      (prev) => ({
        items: prev.items.map((i) => {
          if (i.compressedUrl) URL.revokeObjectURL(i.compressedUrl);
          const ext = this.getFormatExtension(this.state.targetFormat);
          const outputFilename = i.file.name.replace(/\.[^.]+$/, `.${ext}`);
          return {
            ...i,
            status: 'pending' as const,
            compressedBlob: undefined,
            compressedSize: undefined,
            compressedUrl: undefined,
            outputFilename,
            savings: undefined,
            error: undefined,
          };
        }),
      }),
      () => {
        this.queueRunning = false;
        this.processQueue();
      },
    );
  };

  private removeItem = (id: string) => {
    this.setState((prev) => {
      const item = prev.items.find((i) => i.id === id);
      if (item) {
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
        if (item.compressedUrl) URL.revokeObjectURL(item.compressedUrl);
      }
      return { items: prev.items.filter((i) => i.id !== id) };
    });
  };

  private clearAll = () => {
    this.abortController.abort();
    this.abortController = new AbortController();
    this.cleanupUrls();
    this.setState({ items: [], isProcessing: false });
  };

  private downloadSingle = (item: BulkItem) => {
    if (!item.compressedUrl) return;
    const link = document.createElement('a');
    link.href = item.compressedUrl;
    link.download = item.outputFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  private downloadAllZip = async () => {
    const doneItems = this.state.items.filter(
      (i) => i.status === 'done' && i.compressedBlob,
    );

    if (doneItems.length === 0) {
      this.props.showSnack('No compressed images ready for download');
      return;
    }

    try {
      this.props.showSnack(`Archiving ${doneItems.length} images into ZIP...`);
      const zip = new JSZip();

      for (const item of doneItems) {
        zip.file(item.outputFilename, item.compressedBlob!);
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'zyro-pro-bulk-optimized.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      this.props.showSnack('ZIP download complete!');
    } catch (err: any) {
      console.error('Failed to generate zip:', err);
      this.props.showSnack('Failed to generate ZIP file');
    }
  };

  render(
    { onBackToSingle, onHome }: Props,
    { items, targetFormat, quality, maxDimension, isProcessing }: State,
  ) {
    const totalCount = items.length;
    const doneItems = items.filter((i) => i.status === 'done');
    const doneCount = doneItems.length;

    const totalOriginalBytes = items.reduce((acc, i) => acc + i.originalSize, 0);
    const totalCompressedBytes = doneItems.reduce(
      (acc, i) => acc + (i.compressedSize || 0),
      0,
    );
    const totalSavedBytes = Math.max(0, totalOriginalBytes - totalCompressedBytes);
    const overallSavings =
      totalOriginalBytes > 0 && doneCount > 0
        ? Math.round((totalSavedBytes / totalOriginalBytes) * 100)
        : 0;

    return (
      <div class={style.bulkApp} onDrop={this.onDrop} onDragOver={this.onDragOver}>
        <input
          type="file"
          multiple
          accept="image/*"
          ref={(el) => (this.fileInputRef = el || undefined)}
          class={style.hiddenInput}
          onChange={this.onFileInputChange}
        />

        {/* Top Header */}
        <header class={style.topBar}>
          <div class={style.brandGroup}>
            <button
              type="button"
              class={style.backBtn}
              onClick={() => onBackToSingle(items[0]?.file)}
              title="Return to side-by-side single editor"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
              Single Editor
            </button>
            <button
              type="button"
              class={style.backBtn}
              onClick={onHome}
              title="Return to Home"
            >
              Home
            </button>
            <div class={style.brandTitle}>
              <span class={style.brandWhite}>Zyro</span>
              <span class={style.brandGradient}>Pro</span>
              <span class={style.bulkBadge}>Bulk Optimizer</span>
            </div>
          </div>

          {totalCount > 0 && (
            <div class={style.statsGroup}>
              <div class={style.statItem}>
                <span>Images:</span>
                <span class={style.statHighlight}>
                  {doneCount}/{totalCount}
                </span>
              </div>
              <div class={style.statItem}>
                <span>Size:</span>
                <span class={style.statHighlight}>{formatBytes(totalOriginalBytes)}</span>
                {doneCount > 0 && (
                  <Fragment>
                    <span>→</span>
                    <span class={style.statHighlight}>
                      {formatBytes(totalCompressedBytes)}
                    </span>
                  </Fragment>
                )}
              </div>
              {doneCount > 0 && overallSavings > 0 && (
                <div class={style.statSavings}>-{overallSavings}% Saved</div>
              )}
            </div>
          )}

          <div class={style.actionGroup}>
            <button
              type="button"
              class={style.addFilesBtn}
              onClick={() => this.fileInputRef?.click()}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
              Add Images
            </button>

            {totalCount > 0 && (
              <button
                type="button"
                class={style.clearBtn}
                onClick={this.clearAll}
                title="Clear all images from queue"
              >
                Clear All
              </button>
            )}

            <button
              type="button"
              class={style.downloadAllBtn}
              onClick={this.downloadAllZip}
              disabled={doneCount === 0}
              title="Download all compressed images as a single ZIP file"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" />
              </svg>
              Download All (.ZIP)
            </button>
          </div>
        </header>

        {/* Global Preset Controls Bar */}
        <section class={style.presetsBar}>
          <div class={controlsWrap}>
            {/* Format Picker */}
            <div class={style.controlField}>
              <label class={style.controlLabel}>Format:</label>
              <div class={style.selectWrap}>
                <select
                  class={style.selectInput}
                  value={targetFormat}
                  onChange={this.onFormatChange}
                >
                  <option value="webP">WebP (Recommended)</option>
                  <option value="mozJPEG">MozJPEG (Photo Quality)</option>
                  <option value="avif">AVIF (Next-Gen Smallest)</option>
                  <option value="oxiPNG">OxiPNG (Lossless)</option>
                </select>
                <svg viewBox="0 0 24 24" class={style.selectArrow}>
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </div>
            </div>

            {/* Quality Slider */}
            <div class={style.controlField}>
              <label class={style.controlLabel}>Quality:</label>
              <div class={style.rangeWrap}>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={quality}
                  class={style.rangeInput}
                  onInput={this.onQualityChange}
                  onChange={this.onQualityCommit}
                />
                <span class={style.qualityBadge}>{quality}%</span>
              </div>
            </div>

            {/* Max Resolution / Resize */}
            <div class={style.controlField}>
              <label class={style.controlLabel}>Max Size:</label>
              <div class={style.selectWrap}>
                <select
                  class={style.selectInput}
                  value={maxDimension}
                  onChange={this.onResolutionChange}
                >
                  <option value="0">Original Resolution</option>
                  <option value="1920">Max 1920px (Full HD)</option>
                  <option value="1280">Max 1280px (HD Web)</option>
                  <option value="800">Max 800px (Medium)</option>
                  <option value="500">Max 500px (Thumbnail)</option>
                </select>
                <svg viewBox="0 0 24 24" class={style.selectArrow}>
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <button
              type="button"
              class={style.recompressBtn}
              onClick={this.recompressAll}
              disabled={items.length === 0 || isProcessing}
            >
              {isProcessing ? (
                <Fragment>
                  <span class={style.miniSpinner} /> Optimizing...
                </Fragment>
              ) : (
                <Fragment>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
                  </svg>
                  Re-optimize All
                </Fragment>
              )}
            </button>
          </div>
        </section>

        {/* Main Content Area */}
        <main class={style.mainContent}>
          {totalCount === 0 ? (
            <div
              class={style.emptyState}
              onClick={() => this.fileInputRef?.click()}
            >
              <div class={style.emptyIconWrap}>
                <svg viewBox="0 0 24 24" class={style.emptyIcon}>
                  <path d="M19 7v3h-2V7h-3V5h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5a2 2 0 00-2 2v12c0 1.1.9 2 2 2h12a2 2 0 002-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z" />
                </svg>
              </div>
              <h2 class={style.emptyTitle}>Drop multiple images here</h2>
              <p class={style.emptyDesc}>
                Batch compress PNG, JPG, WebP, AVIF, and SVG images with custom
                codecs, auto-resizing, and zero quality loss.
              </p>
              <button
                type="button"
                class={style.selectFilesPrimaryBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  this.fileInputRef?.click();
                }}
              >
                Choose Multiple Images
              </button>
            </div>
          ) : (
            <div class={style.cardsGrid}>
              {items.map((item) => (
                <div class={style.card} key={item.id}>
                  {/* Thumbnail */}
                  <div class={style.thumbWrap}>
                    <img src={item.previewUrl} alt={item.file.name} class={style.thumbImg} />
                  </div>

                  {/* Card Info */}
                  <div class={style.cardInfo}>
                    <div class={style.fileName} title={item.file.name}>
                      {item.file.name}
                    </div>

                    <div class={style.metaRow}>
                      <span>{formatBytes(item.originalSize)}</span>
                      {item.status === 'done' && item.compressedSize && (
                        <Fragment>
                          <span class={style.sizeArrow}>→</span>
                          <span style="color: #38bdf8; font-weight: 600;">
                            {formatBytes(item.compressedSize)}
                          </span>
                          {item.savings !== undefined && item.savings > 0 && (
                            <span class={style.savingsBadge}>-{item.savings}%</span>
                          )}
                        </Fragment>
                      )}
                    </div>

                    {/* Status */}
                    <div class={style.statusIndicator}>
                      {item.status === 'pending' && (
                        <span class={style.statusPending}>Queued...</span>
                      )}
                      {item.status === 'compressing' && (
                        <span class={style.statusCompressing}>
                          <span class={style.miniSpinner} /> Compressing...
                        </span>
                      )}
                      {item.status === 'done' && (
                        <span style="color: #4ade80; font-weight: 500;">
                          ✓ Ready ({item.outputFilename.split('.').pop()?.toUpperCase()})
                        </span>
                      )}
                      {item.status === 'error' && (
                        <span class={style.statusError}>⚠ {item.error}</span>
                      )}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div class={style.cardActions}>
                    {item.status === 'done' && (
                      <button
                        type="button"
                        class={style.downloadSingleBtn}
                        onClick={() => this.downloadSingle(item)}
                        title={`Download ${item.outputFilename}`}
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                        </svg>
                      </button>
                    )}
                    <button
                      type="button"
                      class={style.removeSingleBtn}
                      onClick={() => this.removeItem(item.id)}
                      title="Remove image from queue"
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    );
  }
}
const controlsWrap = style.controlsWrap;
