import { h, Component, Fragment } from 'preact';
import type PinchZoom from './custom-els/PinchZoom';
import type { ScaleToOpts } from './custom-els/PinchZoom';
import './custom-els/PinchZoom';
import './custom-els/TwoUp';
import * as style from './style.css';
import 'add-css:./style.css';
import { shallowEqual, isSafari } from '../../util';
import {
  ToggleAliasingIcon,
  ToggleAliasingActiveIcon,
  ToggleBackgroundIcon,
  AddIcon,
  RemoveIcon,
  ToggleBackgroundActiveIcon,
  RotateIcon,
  SplitOrientationIcon,
  SplitOrientationVerticalIcon,
  ResetZoomIcon,
  InfoIcon,
} from '../../icons';
import prettyBytes from '../Results/pretty-bytes';

import { twoUpHandle } from './custom-els/TwoUp/styles.css';
import type { PreprocessorState } from '../../feature-meta';
import { cleanSet } from '../../util/clean-modify';
import type { SourceImage } from '../../Compress';
import { linkRef } from 'shared/prerendered-app/util';
import { drawDataToCanvas } from 'client/lazy-app/util/canvas';
interface Props {
  source?: SourceImage;
  preprocessorState?: PreprocessorState;
  mobileView: boolean;
  leftCompressed?: ImageData;
  rightCompressed?: ImageData;
  leftImgContain: boolean;
  rightImgContain: boolean;
  onPreprocessorChange: (newState: PreprocessorState) => void;
}

interface State {
  scale: number;
  editingScale: boolean;
  altBackground: boolean;
  aliasing: boolean;
  splitOrientation: 'horizontal' | 'vertical';
  showInfoModal: boolean;
}

const scaleToOpts: ScaleToOpts = {
  originX: '50%',
  originY: '50%',
  relativeTo: 'container',
  allowChangeEvent: true,
};

export default class Output extends Component<Props, State> {
  state: State = {
    scale: 1,
    editingScale: false,
    altBackground: false,
    aliasing: false,
    splitOrientation: 'horizontal',
    showInfoModal: false,
  };
  canvasLeft?: HTMLCanvasElement;
  canvasRight?: HTMLCanvasElement;
  pinchZoomLeft?: PinchZoom;
  pinchZoomRight?: PinchZoom;
  scaleInput?: HTMLInputElement;
  retargetedEvents = new WeakSet<Event>();

  componentDidMount() {
    const leftDraw = this.leftDrawable();
    const rightDraw = this.rightDrawable();

    // Reset the pinch zoom, which may have an position set from the previous view, after pressing
    // the back button.
    this.pinchZoomLeft!.setTransform({
      allowChangeEvent: true,
      x: 0,
      y: 0,
      scale: 1,
    });

    if (this.canvasLeft && leftDraw) {
      drawDataToCanvas(this.canvasLeft, leftDraw);
    }
    if (this.canvasRight && rightDraw) {
      drawDataToCanvas(this.canvasRight, rightDraw);
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const prevLeftDraw = this.leftDrawable(prevProps);
    const prevRightDraw = this.rightDrawable(prevProps);
    const leftDraw = this.leftDrawable();
    const rightDraw = this.rightDrawable();
    const sourceFileChanged =
      // Has the value become (un)defined?
      !!this.props.source !== !!prevProps.source ||
      // Or has the file changed?
      (this.props.source &&
        prevProps.source &&
        this.props.source.file !== prevProps.source.file);

    const oldSourceData = prevProps.source && prevProps.source.preprocessed;
    const newSourceData = this.props.source && this.props.source.preprocessed;
    const pinchZoom = this.pinchZoomLeft!;

    if (sourceFileChanged) {
      // New image? Reset the pinch-zoom.
      pinchZoom.setTransform({
        allowChangeEvent: true,
        x: 0,
        y: 0,
        scale: 1,
      });
    } else if (
      oldSourceData &&
      newSourceData &&
      oldSourceData !== newSourceData
    ) {
      // Since the pinch zoom transform origin is the top-left of the content, we need to flip
      // things around a bit when the content size changes, so the new content appears as if it were
      // central to the previous content.
      const scaleChange = 1 - pinchZoom.scale;
      const oldXScaleOffset = (oldSourceData.width / 2) * scaleChange;
      const oldYScaleOffset = (oldSourceData.height / 2) * scaleChange;

      pinchZoom.setTransform({
        allowChangeEvent: true,
        x: pinchZoom.x - oldXScaleOffset + oldYScaleOffset,
        y: pinchZoom.y - oldYScaleOffset + oldXScaleOffset,
      });
    }

    if (leftDraw && leftDraw !== prevLeftDraw && this.canvasLeft) {
      drawDataToCanvas(this.canvasLeft, leftDraw);
    }
    if (rightDraw && rightDraw !== prevRightDraw && this.canvasRight) {
      drawDataToCanvas(this.canvasRight, rightDraw);
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    );
  }

  private leftDrawable(props: Props = this.props): ImageData | undefined {
    return props.leftCompressed || (props.source && props.source.preprocessed);
  }

  private rightDrawable(props: Props = this.props): ImageData | undefined {
    return props.rightCompressed || (props.source && props.source.preprocessed);
  }

  private toggleAliasing = () => {
    this.setState((state) => ({
      aliasing: !state.aliasing,
    }));
  };

  private toggleBackground = () => {
    this.setState({
      altBackground: !this.state.altBackground,
    });
  };

  private resetZoom = () => {
    if (!this.pinchZoomLeft) return;
    this.pinchZoomLeft.setTransform({
      allowChangeEvent: true,
      x: 0,
      y: 0,
      scale: 1,
    });
  };

  public toggleSplitOrientation = () => {
    this.setState((state) => ({
      splitOrientation:
        state.splitOrientation === 'horizontal' ? 'vertical' : 'horizontal',
    }));
  };

  private toggleInfoModal = () => {
    this.setState((state) => ({
      showInfoModal: !state.showInfoModal,
    }));
  };

  private zoomIn = () => {
    if (!this.pinchZoomLeft) throw Error('Missing pinch-zoom element');
    this.pinchZoomLeft.scaleTo(this.state.scale * 1.25, scaleToOpts);
  };

  private zoomOut = () => {
    if (!this.pinchZoomLeft) throw Error('Missing pinch-zoom element');
    this.pinchZoomLeft.scaleTo(this.state.scale / 1.25, scaleToOpts);
  };

  public onRotateClick = () => {
    const { preprocessorState: inputProcessorState } = this.props;
    if (!inputProcessorState) return;

    const newState = cleanSet(
      inputProcessorState,
      'rotate.rotate',
      (inputProcessorState.rotate.rotate + 90) % 360,
    );

    this.props.onPreprocessorChange(newState);
  };

  private onScaleValueFocus = () => {
    this.setState({ editingScale: true }, () => {
      if (this.scaleInput) {
        // Firefox unfocuses the input straight away unless I force a style
        // calculation here. I have no idea why, but it's late and I'm quite
        // tired.
        getComputedStyle(this.scaleInput).transform;
        this.scaleInput.focus();
      }
    });
  };

  private onScaleInputBlur = () => {
    this.setState({ editingScale: false });
  };

  private onScaleInputChanged = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const percent = parseFloat(target.value);
    if (isNaN(percent)) return;
    if (!this.pinchZoomLeft) throw Error('Missing pinch-zoom element');

    this.pinchZoomLeft.scaleTo(percent / 100, scaleToOpts);
  };

  private onPinchZoomLeftChange = (event: Event) => {
    if (!this.pinchZoomRight || !this.pinchZoomLeft) {
      throw Error('Missing pinch-zoom element');
    }
    this.setState({
      scale: this.pinchZoomLeft.scale,
    });
    this.pinchZoomRight.setTransform({
      scale: this.pinchZoomLeft.scale,
      x: this.pinchZoomLeft.x,
      y: this.pinchZoomLeft.y,
    });
  };

  /**
   * We're using two pinch zoom elements, but we want them to stay in sync. When one moves, we
   * update the position of the other. However, this is tricky when it comes to multi-touch, when
   * one finger is on one pinch-zoom, and the other finger is on the other. To overcome this, we
   * redirect all relevant pointer/touch/mouse events to the first pinch zoom element.
   *
   * @param event Event to redirect
   */
  private onRetargetableEvent = (event: Event) => {
    const targetEl = event.target as HTMLElement;
    if (!this.pinchZoomLeft) throw Error('Missing pinch-zoom element');
    // If the event is on the handle of the two-up, let it through,
    // unless it's a wheel event, in which case always let it through.
    if (event.type !== 'wheel' && targetEl.closest(`.${twoUpHandle}`)) return;
    // If we've already retargeted this event, let it through.
    if (this.retargetedEvents.has(event)) return;
    // Stop the event in its tracks.
    event.stopImmediatePropagation();
    event.preventDefault();
    // Clone the event & dispatch
    // Some TypeScript trickery needed due to https://github.com/Microsoft/TypeScript/issues/3841
    const clonedEvent = new (event.constructor as typeof Event)(
      event.type,
      event,
    );
    this.retargetedEvents.add(clonedEvent);
    this.pinchZoomLeft.dispatchEvent(clonedEvent);

    // Unfocus any active element on touchend. This fixes an issue on (at least) Android Chrome,
    // where the software keyboard is hidden, but the input remains focused, then after interaction
    // with this element the keyboard reappears for NO GOOD REASON. Thanks Android.
    if (
      event.type === 'touchend' &&
      document.activeElement &&
      document.activeElement instanceof HTMLElement
    ) {
      document.activeElement.blur();
    }
  };

  render({ mobileView, leftImgContain, rightImgContain, source }: Props) {
    const {
      scale,
      editingScale,
      altBackground,
      aliasing,
      splitOrientation,
      showInfoModal,
    } = this.state;
    const leftDraw = this.leftDrawable();
    const rightDraw = this.rightDrawable();
    // To keep position stable, the output is put in a square using the longest dimension.
    const originalImage = source && source.preprocessed;
    const effectiveOrientation = mobileView ? 'vertical' : splitOrientation;

    return (
      <Fragment>
        <div
          class={`${style.output} ${altBackground ? style.altBackground : ''}`}
        >
          <div class={style.floatingBadgeLeft}>Before</div>
          <div class={style.floatingBadgeRight}>After</div>
          <two-up
            legacy-clip-compat
            class={style.twoUp}
            orientation={effectiveOrientation}
            // Event redirecting. See onRetargetableEvent.
            onTouchStartCapture={this.onRetargetableEvent}
            onTouchEndCapture={this.onRetargetableEvent}
            onTouchMoveCapture={this.onRetargetableEvent}
            onPointerDownCapture={
              // We avoid pointer events in our PinchZoom due to a Safari bug.
              // That means we also need to avoid them here too, else we end up preventing the fallback mouse events.
              isSafari ? undefined : this.onRetargetableEvent
            }
            onMouseDownCapture={this.onRetargetableEvent}
            onWheelCapture={this.onRetargetableEvent}
          >
            <pinch-zoom
              class={style.pinchZoom}
              onChange={this.onPinchZoomLeftChange}
              ref={linkRef(this, 'pinchZoomLeft')}
            >
              <canvas
                class={`${style.pinchTarget} ${
                  aliasing ? style.pixelated : ''
                }`}
                ref={linkRef(this, 'canvasLeft')}
                width={leftDraw && leftDraw.width}
                height={leftDraw && leftDraw.height}
                style={{
                  width: originalImage ? originalImage.width : '',
                  height: originalImage ? originalImage.height : '',
                  objectFit: leftImgContain ? 'contain' : '',
                }}
              />
            </pinch-zoom>
            <pinch-zoom
              class={style.pinchZoom}
              ref={linkRef(this, 'pinchZoomRight')}
            >
              <canvas
                class={`${style.pinchTarget} ${
                  aliasing ? style.pixelated : ''
                }`}
                ref={linkRef(this, 'canvasRight')}
                width={rightDraw && rightDraw.width}
                height={rightDraw && rightDraw.height}
                style={{
                  width: originalImage ? originalImage.width : '',
                  height: originalImage ? originalImage.height : '',
                  objectFit: rightImgContain ? 'contain' : '',
                }}
              />
            </pinch-zoom>
          </two-up>
        </div>
        <div class={style.controls}>
          <div class={style.buttonGroup}>
            <button class={style.firstButton} onClick={this.zoomOut} title="Zoom out">
              <RemoveIcon />
            </button>
            {editingScale ? (
              <input
                type="number"
                step="1"
                min="1"
                max="1000000"
                ref={linkRef(this, 'scaleInput')}
                class={style.zoom}
                value={Math.round(scale * 100)}
                onInput={this.onScaleInputChanged}
                onBlur={this.onScaleInputBlur}
              />
            ) : (
              <span
                class={style.zoom}
                tabIndex={0}
                onFocus={this.onScaleValueFocus}
                title="Click to type zoom %"
              >
                <span class={style.zoomValue}>{Math.round(scale * 100)}</span>%
              </span>
            )}
            <button class={style.button} onClick={this.zoomIn} title="Zoom in">
              <AddIcon />
            </button>
            <button
              class={style.lastButton}
              onClick={this.resetZoom}
              title="Reset Zoom to 100% (1:1)"
            >
              <ResetZoomIcon />
            </button>
          </div>
          <div class={style.buttonGroup}>
            <button
              class={style.firstButton}
              onClick={this.onRotateClick}
              title="Rotate 90°"
            >
              <RotateIcon />
            </button>
            {!mobileView && (
              <button
                class={style.button}
                onClick={this.toggleSplitOrientation}
                title={`Split view orientation: currently ${splitOrientation} (Click to toggle)`}
              >
                {splitOrientation === 'horizontal' ? (
                  <SplitOrientationIcon />
                ) : (
                  <SplitOrientationVerticalIcon />
                )}
              </button>
            )}
            {!isSafari && (
              <button
                class={style.button}
                onClick={this.toggleAliasing}
                title="Toggle pixel smoothing"
              >
                {aliasing ? (
                  <ToggleAliasingActiveIcon />
                ) : (
                  <ToggleAliasingIcon />
                )}
              </button>
            )}
            <button
              class={style.button}
              onClick={this.toggleBackground}
              title="Toggle background transparency check"
            >
              {altBackground ? (
                <ToggleBackgroundActiveIcon />
              ) : (
                <ToggleBackgroundIcon />
              )}
            </button>
            <button
              class={style.lastButton}
              onClick={this.toggleInfoModal}
              title="Image Properties & Inspection"
            >
              <InfoIcon />
            </button>
          </div>
        </div>

        {showInfoModal && source && (
          <div class={style.modalBackdrop} onClick={this.toggleInfoModal}>
            <div
              class={style.modalContent}
              onClick={(e: MouseEvent) => e.stopPropagation()}
            >
              <div class={style.modalTitle}>
                <span>Image Inspection</span>
                <button
                  class={style.closeButton}
                  onClick={this.toggleInfoModal}
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
              <table class={style.metaTable}>
                <tbody>
                  <tr>
                    <td>File Name</td>
                    <td>{source.file.name}</td>
                  </tr>
                  <tr>
                    <td>Original Format</td>
                    <td>{source.file.type || 'Unknown'}</td>
                  </tr>
                  <tr>
                    <td>Original File Size</td>
                    <td>{prettyBytes(source.file.size).value} {prettyBytes(source.file.size).unit}</td>
                  </tr>
                  <tr>
                    <td>Dimensions</td>
                    <td>
                      {source.decoded.width} &times; {source.decoded.height} px
                    </td>
                  </tr>
                  <tr>
                    <td>Aspect Ratio</td>
                    <td>
                      {(source.decoded.width / source.decoded.height).toFixed(2)}:1
                    </td>
                  </tr>
                  <tr>
                    <td>Current Zoom</td>
                    <td>{Math.round(scale * 100)}%</td>
                  </tr>
                  {source.preprocessed && (
                    <tr>
                      <td>Processed Size</td>
                      <td>
                        {source.preprocessed.width} &times; {source.preprocessed.height} px
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}
