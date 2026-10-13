define(['require', 'exports', './initial-app-b9185c19', './index-b6db047a', './util-3d88c3bb', './comlink-f3ac916c'], function (require, exports, index, index$1, util, comlink) { 'use strict';

    const compress = "_compress_mjt0z_1";
    const topBar = "_top-bar_mjt0z_19";
    const topBarLeft = "_top-bar-left_mjt0z_33";
    const backCircleBtn = "_back-circle-btn_mjt0z_39";
    const topLogo = "_top-logo_mjt0z_60";
    const logoIcon = "_logo-icon_mjt0z_67";
    const logoText = "_logo-text_mjt0z_71";
    const logoPro = "_logo-pro_mjt0z_78";
    const topBarRight = "_top-bar-right_mjt0z_86";
    const topActionBtn = "_top-action-btn_mjt0z_92";
    const topBulkBtn = "_top-bulk-btn_mjt0z_114";
    const topDownloadBtn = "_top-download-btn_mjt0z_138";
    const downloadDisabled = "_download-disabled_mjt0z_161";
    const editorWorkspace = "_editor-workspace_mjt0z_169";
    const leftPanel = "_left-panel_mjt0z_193";
    const panelCard = "_panel-card_mjt0z_205";
    const cardHeader = "_card-header_mjt0z_217";
    const cardIconBadge = "_card-icon-badge_mjt0z_223";
    const cardTitle = "_card-title_mjt0z_237";
    const cardSubtitle = "_card-subtitle_mjt0z_245";
    const featurePills = "_feature-pills_mjt0z_252";
    const featurePill = "_feature-pill_mjt0z_252";
    const pillEmoji = "_pill-emoji_mjt0z_276";
    const cardSectionTitle = "_card-section-title_mjt0z_280";
    const metaList = "_meta-list_mjt0z_288";
    const metaRow = "_meta-row_mjt0z_293";
    const metaLabel = "_meta-label_mjt0z_306";
    const metaValue = "_meta-value_mjt0z_311";
    const centerStage = "_center-stage_mjt0z_318";
    const stageContainer = "_stage-container_mjt0z_331";
    const rightPanel = "_right-panel_mjt0z_345";
    const tabsBar = "_tabs-bar_mjt0z_363";
    const tabBtn = "_tab-btn_mjt0z_374";
    const tabActive = "_tab-active_mjt0z_391";
    const tabScrollArea = "_tab-scroll-area_mjt0z_398";
    const tabContent = "_tab-content_mjt0z_416";
    const tabNotice = "_tab-notice_mjt0z_422";
    const settingSection = "_setting-section_mjt0z_428";
    const sectionHeaderRow = "_section-header-row_mjt0z_434";
    const sectionLabel = "_section-label_mjt0z_440";
    const infoQuestionBadge = "_info-question-badge_mjt0z_446";
    const selectWrapper = "_select-wrapper_mjt0z_461";
    const codecSelect = "_codec-select_mjt0z_467";
    const selectArrow = "_select-arrow_mjt0z_487";
    const qualityDisplay = "_quality-display_mjt0z_495";
    const sliderWrapper = "_slider-wrapper_mjt0z_501";
    const gradientRangeSlider = "_gradient-range-slider_mjt0z_507";
    const sliderHelperLabels = "_slider-helper-labels_mjt0z_543";
    const switchesContainer = "_switches-container_mjt0z_552";
    const switchRow = "_switch-row_mjt0z_559";
    const switchTitle = "_switch-title_mjt0z_567";
    const switchCheckbox = "_switch-checkbox_mjt0z_573";
    const switchPill = "_switch-pill_mjt0z_579";
    const estimatedSizeCard = "_estimated-size-card_mjt0z_612";
    const estimatedHeader = "_estimated-header_mjt0z_625";
    const fileIcon = "_file-icon_mjt0z_633";
    const estimatedTitle = "_estimated-title_mjt0z_638";
    const copyImageAction = "_copy-image-action_mjt0z_643";
    const estimatedValue = "_estimated-value_mjt0z_659";
    const calculatingText = "_calculating-text_mjt0z_666";
    const savingsBadge = "_savings-badge_mjt0z_672";

    var css = "._compress_mjt0z_1{width:100vw;height:100vh;box-sizing:border-box;background-color:#070913;background-image:radial-gradient(circle at 15% 15%,rgba(124,58,237,.12) 0,transparent 40%),radial-gradient(circle at 85% 85%,rgba(56,189,248,.08) 0,transparent 40%),radial-gradient(circle at 50% 50%,rgba(15,23,42,.5) 0,transparent 100%);color:#f8fafc;display:flex;flex-direction:column;overflow:hidden;user-select:none;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif}._top-bar_mjt0z_19{height:64px;min-height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 24px;background:rgba(11,15,25,.85);backdrop-filter:blur(16px);border-bottom:1px solid hsla(0,0%,100%,.08);z-index:50;box-sizing:border-box}._top-bar-left_mjt0z_33{display:flex;align-items:center;gap:16px}._back-circle-btn_mjt0z_39{width:38px;height:38px;border-radius:50%;background:hsla(0,0%,100%,.06);border:1px solid hsla(0,0%,100%,.1);color:#cbd5e1;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s ease;padding:0}._back-circle-btn_mjt0z_39:hover{background:hsla(0,0%,100%,.12);color:#fff;transform:scale(1.05)}._top-logo_mjt0z_60{display:flex;align-items:center;gap:8px;text-decoration:none}._logo-icon_mjt0z_67{filter:drop-shadow(0 0 8px rgba(139,92,246,.6))}._logo-text_mjt0z_71{font-size:19px;font-weight:700;color:#fff;letter-spacing:-.3px}._logo-pro_mjt0z_78{background:linear-gradient(135deg,#a855f7,#38bdf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-weight:800;margin-left:2px}._top-bar-right_mjt0z_86{display:flex;align-items:center;gap:10px}._top-action-btn_mjt0z_92{width:38px;height:38px;border-radius:50%;background:hsla(0,0%,100%,.05);border:1px solid hsla(0,0%,100%,.08);color:#94a3b8;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s ease;padding:0}._top-action-btn_mjt0z_92:hover{background:hsla(0,0%,100%,.12);color:#f8fafc;border-color:hsla(0,0%,100%,.15);transform:translateY(-1px)}._top-bulk-btn_mjt0z_114{height:38px;padding:0 16px;border-radius:9999px;background:rgba(168,85,247,.15);border:1px solid rgba(168,85,247,.4);color:#c084fc;font-size:13px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:all .2s ease}._top-bulk-btn_mjt0z_114:hover{background:rgba(168,85,247,.25);border-color:#a855f7;color:#fff;box-shadow:0 0 14px rgba(168,85,247,.4);transform:translateY(-1px)}._top-download-btn_mjt0z_138{height:38px;padding:0 20px;border-radius:9999px;background:linear-gradient(135deg,#7c3aed,#6366f1);color:#fff;font-size:14px;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:8px;border:none;cursor:pointer;box-shadow:0 4px 18px rgba(124,58,237,.45);transition:all .2s ease}._top-download-btn_mjt0z_138:hover{transform:translateY(-1px);box-shadow:0 6px 24px rgba(124,58,237,.65);filter:brightness(1.08)}._top-download-btn_mjt0z_138._download-disabled_mjt0z_161{opacity:.55;pointer-events:none;box-shadow:none}._editor-workspace_mjt0z_169{flex:1;display:grid;grid-template-columns:290px 1fr 340px;gap:20px;padding:20px 24px;box-sizing:border-box;overflow:hidden;min-height:0}@media (max-width:1100px){._editor-workspace_mjt0z_169{grid-template-columns:260px 1fr 310px;gap:14px;padding:14px 16px}}@media (max-width:860px){._editor-workspace_mjt0z_169{display:flex;flex-direction:column;overflow-y:auto}}._left-panel_mjt0z_193{display:flex;flex-direction:column;gap:16px;overflow-y:auto;min-height:0}@media (max-width:860px){._left-panel_mjt0z_193{order:2}}._panel-card_mjt0z_205{background:rgba(15,23,42,.65);backdrop-filter:blur(14px);border:1px solid hsla(0,0%,100%,.08);border-radius:16px;padding:20px;display:flex;flex-direction:column;gap:16px;box-shadow:0 8px 30px rgba(0,0,0,.35)}._card-header_mjt0z_217{display:flex;align-items:center;gap:14px}._card-icon-badge_mjt0z_223{width:42px;height:42px;border-radius:12px;background:rgba(124,58,237,.16);border:1px solid rgba(139,92,246,.3);color:#c084fc;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 0 14px rgba(124,58,237,.25)}._card-title_mjt0z_237{font-size:16px;font-weight:700;color:#fff;margin:0 0 3px;letter-spacing:-.2px}._card-subtitle_mjt0z_245{font-size:12px;color:#94a3b8;margin:0;line-height:1.35}._feature-pills_mjt0z_252{display:flex;flex-direction:column;gap:8px}._feature-pill_mjt0z_252{background:rgba(30,41,59,.5);border:1px solid hsla(0,0%,100%,.06);border-radius:10px;padding:9px 12px;font-size:13px;color:#cbd5e1;display:flex;align-items:center;gap:10px;transition:all .2s ease}._feature-pill_mjt0z_252:hover{background:rgba(30,41,59,.75);border-color:rgba(139,92,246,.25)}._pill-emoji_mjt0z_276{font-size:14px}._card-section-title_mjt0z_280{font-size:15px;font-weight:700;color:#fff;margin:0;letter-spacing:-.2px}._meta-list_mjt0z_288{display:flex;flex-direction:column}._meta-row_mjt0z_293{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid hsla(0,0%,100%,.06)}._meta-row_mjt0z_293:last-child{border-bottom:none;padding-bottom:0}._meta-label_mjt0z_306{font-size:13px;color:#94a3b8}._meta-value_mjt0z_311{font-size:13px;font-weight:600;color:#f1f5f9}._center-stage_mjt0z_318{position:relative;display:flex;flex-direction:column;min-height:0;height:100%}@media (max-width:860px){._center-stage_mjt0z_318{height:480px;order:1}}._stage-container_mjt0z_331{position:relative;flex:1;border-radius:18px;border:1px solid rgba(139,92,246,.35);background:#060914;overflow:hidden;box-shadow:0 16px 48px rgba(0,0,0,.65),0 0 30px rgba(124,58,237,.15);height:100%}._right-panel_mjt0z_345{background:rgba(15,23,42,.65);backdrop-filter:blur(14px);border:1px solid hsla(0,0%,100%,.08);border-radius:16px;padding:20px;display:flex;flex-direction:column;gap:18px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,.35);min-height:0}@media (max-width:860px){._right-panel_mjt0z_345{order:3}}._tabs-bar_mjt0z_363{background:rgba(30,41,59,.65);border:1px solid hsla(0,0%,100%,.08);border-radius:9999px;padding:4px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;flex-shrink:0}._tab-btn_mjt0z_374{border-radius:9999px;padding:8px 0;text-align:center;font-size:13px;font-weight:500;color:#94a3b8;background:transparent;cursor:pointer;border:none;transition:all .2s ease}._tab-btn_mjt0z_374:hover{color:#fff}._tab-active_mjt0z_391{background:linear-gradient(135deg,#7c3aed,#6366f1)!important;color:#fff!important;font-weight:600;box-shadow:0 2px 12px rgba(124,58,237,.55)}._tab-scroll-area_mjt0z_398{flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:16px;min-height:0;padding-right:4px}._tab-scroll-area_mjt0z_398::-webkit-scrollbar{width:5px}._tab-scroll-area_mjt0z_398::-webkit-scrollbar-thumb{background:hsla(0,0%,100%,.15);border-radius:9999px}._tab-content_mjt0z_416{display:flex;flex-direction:column;gap:18px}._tab-notice_mjt0z_422{font-size:12px;color:#94a3b8;margin-bottom:4px}._setting-section_mjt0z_428{display:flex;flex-direction:column;gap:10px}._section-header-row_mjt0z_434{display:flex;justify-content:space-between;align-items:center}._section-label_mjt0z_440{font-size:13px;font-weight:600;color:#cbd5e1}._info-question-badge_mjt0z_446{width:18px;height:18px;border-radius:50%;background:hsla(0,0%,100%,.08);border:1px solid hsla(0,0%,100%,.12);color:#94a3b8;font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:help}._select-wrapper_mjt0z_461{position:relative;display:flex;align-items:center}._codec-select_mjt0z_467{width:100%;background:rgba(30,41,59,.85);border:1px solid hsla(0,0%,100%,.12);border-radius:10px;padding:11px 14px;font-size:14px;font-weight:500;color:#fff;outline:none;appearance:none;cursor:pointer;transition:all .2s ease}._codec-select_mjt0z_467:focus{border-color:#8b5cf6;box-shadow:0 0 0 2px rgba(139,92,246,.3)}._select-arrow_mjt0z_487{position:absolute;right:14px;color:#94a3b8;pointer-events:none;font-size:12px}._quality-display_mjt0z_495{font-size:14px;font-weight:700;color:#a855f7}._slider-wrapper_mjt0z_501{display:flex;align-items:center;padding:6px 0}._gradient-range-slider_mjt0z_507{width:100%;height:6px;border-radius:3px;background:linear-gradient(90deg,#ec4899 0,#8b5cf6 50%,#06b6d4);outline:none;appearance:none;cursor:pointer}._gradient-range-slider_mjt0z_507::-webkit-slider-thumb{appearance:none;width:20px;height:20px;border-radius:50%;background:#fff;border:3px solid #7c3aed;box-shadow:0 0 12px rgba(124,58,237,.85);cursor:pointer;transition:transform .1s ease}._gradient-range-slider_mjt0z_507::-webkit-slider-thumb:hover{transform:scale(1.15)}._gradient-range-slider_mjt0z_507::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:#fff;border:3px solid #7c3aed;box-shadow:0 0 12px rgba(124,58,237,.85);cursor:pointer}._slider-helper-labels_mjt0z_543{display:flex;justify-content:space-between;font-size:11px;color:#64748b;font-weight:500}._switches-container_mjt0z_552{display:flex;flex-direction:column;gap:14px;padding-top:6px}._switch-row_mjt0z_559{display:flex;justify-content:space-between;align-items:center;cursor:pointer;user-select:none}._switch-title_mjt0z_567{font-size:13px;font-weight:500;color:#cbd5e1}._switch-checkbox_mjt0z_573{position:absolute;opacity:0;pointer-events:none}._switch-pill_mjt0z_579{position:relative;width:42px;height:24px;background:rgba(51,65,85,.7);border-radius:9999px;transition:all .25s ease;flex-shrink:0}._switch-pill_mjt0z_579:after{content:\"\";position:absolute;top:3px;left:3px;width:18px;height:18px;background:#fff;border-radius:50%;transition:transform .25s cubic-bezier(.4,0,.2,1);box-shadow:0 2px 4px rgba(0,0,0,.3)}._switch-checkbox_mjt0z_573:checked+._switch-pill_mjt0z_579{background:#7c3aed;box-shadow:0 0 10px rgba(124,58,237,.5)}._switch-checkbox_mjt0z_573:checked+._switch-pill_mjt0z_579:after{transform:translateX(18px)}._estimated-size-card_mjt0z_612{background:rgba(30,41,59,.6);border:1px solid hsla(0,0%,100%,.08);border-radius:14px;padding:16px 18px;margin-top:auto;display:flex;flex-direction:column;gap:8px;flex-shrink:0;box-shadow:0 6px 20px rgba(0,0,0,.25)}._estimated-header_mjt0z_625{display:flex;align-items:center;gap:8px;color:#94a3b8;font-size:13px}._file-icon_mjt0z_633{color:#8b5cf6;flex-shrink:0}._estimated-title_mjt0z_638{flex:1;font-weight:500}._copy-image-action_mjt0z_643{background:hsla(0,0%,100%,.08);border:1px solid hsla(0,0%,100%,.1);color:#cbd5e1;font-size:11px;padding:4px 10px;border-radius:6px;cursor:pointer;transition:all .2s ease}._copy-image-action_mjt0z_643:hover{background:hsla(0,0%,100%,.18);color:#fff}._estimated-value_mjt0z_659{font-size:24px;font-weight:800;color:#fff;letter-spacing:-.5px}._calculating-text_mjt0z_666{font-size:16px;color:#c084fc;font-weight:600}._savings-badge_mjt0z_672{align-self:flex-start;background:rgba(16,185,129,.15);border:1px solid rgba(16,185,129,.35);color:#34d399;font-size:12px;font-weight:700;padding:4px 12px;border-radius:9999px;display:inline-flex;align-items:center;gap:4px;box-shadow:0 0 10px rgba(16,185,129,.15)}";

    index.appendCss(css);

    var css$1 = "._options-scroller_1rb78_1{--horizontal-padding:15px;border-radius:var(--scroller-radius);overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.6),0 0 0 1px hsla(0,0%,100%,.1)}@media (min-width:600px){._options-scroller_1rb78_1{overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch}}._options-title_1rb78_14{background-color:var(--main-theme-color);color:var(--header-text-color);margin:0;padding:12px var(--horizontal-padding);font-weight:700;font-size:1.35rem;letter-spacing:-.01em;border-bottom:1px solid rgba(0,0,0,.25);transition:all .3s ease-in-out;position:sticky;top:0;z-index:1}._original-image_1rb78_29 ._options-title_1rb78_14{background-color:#0f172a;color:#f8fafc}._options-section_1rb78_34{background:transparent;display:flex;flex-direction:column;gap:12px;width:100%;box-sizing:border-box}._option-text-first_1rb78_43{flex-direction:column;gap:6px;padding:4px 0;font-weight:500}._option-text-first_1rb78_43,._option-toggle_1rb78_55{display:flex;font-size:13px;color:#cbd5e1;width:100%;box-sizing:border-box}._option-toggle_1rb78_55{cursor:pointer;justify-content:space-between;align-items:center;padding:10px 0;user-select:none;transition:color .2s}._option-toggle_1rb78_55:hover{color:#fff}._option-reveal_1rb78_73{border-top:1px solid hsla(0,0%,100%,.08)}._option-reveal_1rb78_73:focus-within,._option-reveal_1rb78_73:hover{background-color:hsla(0,0%,100%,.04)}._option-one-cell_1rb78_83{display:flex;flex-direction:column;gap:6px;padding:6px 0;width:100%;box-sizing:border-box}._section-enabler_1rb78_92{background:rgba(30,41,59,.6);padding:10px 14px;border-radius:10px;font-weight:600}._text-field_1rb78_100{background:rgba(30,41,59,.85);color:#fff;font:inherit;border:1px solid hsla(0,0%,100%,.12);padding:10px 14px;width:100%;box-sizing:border-box;border-radius:10px;font-size:14px;font-weight:500;outline:none;transition:all .2s ease}._text-field_1rb78_100:focus{border-color:#8b5cf6;box-shadow:0 0 0 2px rgba(139,92,246,.3)}._title-and-buttons_1rb78_120{grid-template-columns:1fr;grid-auto-columns:max-content;grid-auto-flow:column;display:grid;gap:.8rem}._title-button_1rb78_128 svg{--size:20px;display:block;width:var(--size);height:var(--size)}._cli-button_1rb78_138 svg{stroke:var(--header-text-color)}._copy-over-button_1rb78_145{transform:rotate(var(--rotate-copyoverbutton-angle))}._copy-over-button_1rb78_145 svg{fill:var(--header-text-color)}._copy-over-button_1rb78_145:focus{outline:var(--header-text-color) solid 2px;outline-offset:.25em}._import-button_1rb78_158 svg,._save-button_1rb78_157 svg{stroke:var(--header-text-color)}._import-button_1rb78_158:focus,._save-button_1rb78_157:focus{outline:var(--header-text-color) solid 2px;outline-offset:.25em}._button-opacity_1rb78_169{pointer-events:none;cursor:not-allowed}._button-opacity_1rb78_169 svg{opacity:.5}";

    index.appendCss(css$1);

    class Pointer {
        constructor(nativePointer) {
            /** Unique ID for this pointer */
            this.id = -1;
            this.nativePointer = nativePointer;
            this.pageX = nativePointer.pageX;
            this.pageY = nativePointer.pageY;
            this.clientX = nativePointer.clientX;
            this.clientY = nativePointer.clientY;
            if (self.Touch && nativePointer instanceof Touch) {
                this.id = nativePointer.identifier;
            }
            else if (isPointerEvent(nativePointer)) {
                // is PointerEvent
                this.id = nativePointer.pointerId;
            }
        }
        /**
         * Returns an expanded set of Pointers for high-resolution inputs.
         */
        getCoalesced() {
            if ('getCoalescedEvents' in this.nativePointer) {
                const events = this.nativePointer
                    .getCoalescedEvents()
                    .map((p) => new Pointer(p));
                // Firefox sometimes returns an empty list here. I'm not sure it's doing the right thing.
                // https://github.com/w3c/pointerevents/issues/409
                if (events.length > 0)
                    return events;
            }
            return [this];
        }
    }
    const isPointerEvent = (event) => 'pointerId' in event;
    const isTouchEvent = (event) => 'changedTouches' in event;
    const noop = () => { };
    /**
     * Track pointers across a particular element
     */
    class PointerTracker {
        /**
         * Track pointers across a particular element
         *
         * @param element Element to monitor.
         * @param options
         */
        constructor(_element, { start = () => true, move = noop, end = noop, rawUpdates = false, avoidPointerEvents = false, } = {}) {
            this._element = _element;
            /**
             * State of the tracked pointers when they were pressed/touched.
             */
            this.startPointers = [];
            /**
             * Latest state of the tracked pointers. Contains the same number of pointers, and in the same
             * order as this.startPointers.
             */
            this.currentPointers = [];
            /**
             * Firefox has a bug where touch-based pointer events have a `buttons` of 0, when this shouldn't
             * happen. https://bugzilla.mozilla.org/show_bug.cgi?id=1729440
             *
             * Usually we treat `buttons === 0` as no-longer-pressed. This set allows us to exclude these
             * buggy Firefox events.
             */
            this._excludeFromButtonsCheck = new Set();
            /**
             * Listener for mouse/pointer starts.
             *
             * @param event This will only be a MouseEvent if the browser doesn't support pointer events.
             */
            this._pointerStart = (event) => {
                if (isPointerEvent(event) && event.buttons === 0) {
                    // This is the buggy Firefox case. See _excludeFromButtonsCheck.
                    this._excludeFromButtonsCheck.add(event.pointerId);
                }
                else if (!(event.buttons & 1 /* LeftMouseOrTouchOrPenDown */)) {
                    return;
                }
                const pointer = new Pointer(event);
                // If we're already tracking this pointer, ignore this event.
                // This happens with mouse events when multiple buttons are pressed.
                if (this.currentPointers.some((p) => p.id === pointer.id))
                    return;
                if (!this._triggerPointerStart(pointer, event))
                    return;
                // Add listeners for additional events.
                // The listeners may already exist, but no harm in adding them again.
                if (isPointerEvent(event)) {
                    const capturingElement = event.target && 'setPointerCapture' in event.target
                        ? event.target
                        : this._element;
                    capturingElement.setPointerCapture(event.pointerId);
                    this._element.addEventListener(this._rawUpdates ? 'pointerrawupdate' : 'pointermove', this._move);
                    this._element.addEventListener('pointerup', this._pointerEnd);
                    this._element.addEventListener('pointercancel', this._pointerEnd);
                }
                else {
                    // MouseEvent
                    window.addEventListener('mousemove', this._move);
                    window.addEventListener('mouseup', this._pointerEnd);
                }
            };
            /**
             * Listener for touchstart.
             * Only used if the browser doesn't support pointer events.
             */
            this._touchStart = (event) => {
                for (const touch of Array.from(event.changedTouches)) {
                    this._triggerPointerStart(new Pointer(touch), event);
                }
            };
            /**
             * Listener for pointer/mouse/touch move events.
             */
            this._move = (event) => {
                if (!isTouchEvent(event) &&
                    (!isPointerEvent(event) ||
                        !this._excludeFromButtonsCheck.has(event.pointerId)) &&
                    event.buttons === 0 /* None */) {
                    // This happens in a number of buggy cases where the browser failed to deliver a pointerup
                    // or pointercancel. If we see the pointer moving without any buttons down, synthesize an end.
                    // https://github.com/w3c/pointerevents/issues/407
                    // https://github.com/w3c/pointerevents/issues/408
                    this._pointerEnd(event);
                    return;
                }
                const previousPointers = this.currentPointers.slice();
                const changedPointers = isTouchEvent(event)
                    ? Array.from(event.changedTouches).map((t) => new Pointer(t))
                    : [new Pointer(event)];
                const trackedChangedPointers = [];
                for (const pointer of changedPointers) {
                    const index = this.currentPointers.findIndex((p) => p.id === pointer.id);
                    if (index === -1)
                        continue; // Not a pointer we're tracking
                    trackedChangedPointers.push(pointer);
                    this.currentPointers[index] = pointer;
                }
                if (trackedChangedPointers.length === 0)
                    return;
                this._moveCallback(previousPointers, trackedChangedPointers, event);
            };
            /**
             * Call the end callback for this pointer.
             *
             * @param pointer Pointer
             * @param event Related event
             */
            this._triggerPointerEnd = (pointer, event) => {
                // Main button still down?
                // With mouse events, you get a mouseup per mouse button, so the left button might still be down.
                if (!isTouchEvent(event) &&
                    event.buttons & 1 /* LeftMouseOrTouchOrPenDown */) {
                    return false;
                }
                const index = this.currentPointers.findIndex((p) => p.id === pointer.id);
                // Not a pointer we're interested in?
                if (index === -1)
                    return false;
                this.currentPointers.splice(index, 1);
                this.startPointers.splice(index, 1);
                this._excludeFromButtonsCheck.delete(pointer.id);
                // The event.type might be a 'move' event due to workarounds for weird mouse behaviour.
                // See _move for details.
                const cancelled = !(event.type === 'mouseup' ||
                    event.type === 'touchend' ||
                    event.type === 'pointerup');
                this._endCallback(pointer, event, cancelled);
                return true;
            };
            /**
             * Listener for mouse/pointer ends.
             *
             * @param event This will only be a MouseEvent if the browser doesn't support pointer events.
             */
            this._pointerEnd = (event) => {
                if (!this._triggerPointerEnd(new Pointer(event), event))
                    return;
                if (isPointerEvent(event)) {
                    if (this.currentPointers.length)
                        return;
                    this._element.removeEventListener(this._rawUpdates ? 'pointerrawupdate' : 'pointermove', this._move);
                    this._element.removeEventListener('pointerup', this._pointerEnd);
                    this._element.removeEventListener('pointercancel', this._pointerEnd);
                }
                else {
                    // MouseEvent
                    window.removeEventListener('mousemove', this._move);
                    window.removeEventListener('mouseup', this._pointerEnd);
                }
            };
            /**
             * Listener for touchend.
             * Only used if the browser doesn't support pointer events.
             */
            this._touchEnd = (event) => {
                for (const touch of Array.from(event.changedTouches)) {
                    this._triggerPointerEnd(new Pointer(touch), event);
                }
            };
            this._startCallback = start;
            this._moveCallback = move;
            this._endCallback = end;
            this._rawUpdates = rawUpdates && 'onpointerrawupdate' in window;
            // Add listeners
            if (self.PointerEvent && !avoidPointerEvents) {
                this._element.addEventListener('pointerdown', this._pointerStart);
            }
            else {
                this._element.addEventListener('mousedown', this._pointerStart);
                this._element.addEventListener('touchstart', this._touchStart);
                this._element.addEventListener('touchmove', this._move);
                this._element.addEventListener('touchend', this._touchEnd);
                this._element.addEventListener('touchcancel', this._touchEnd);
            }
        }
        /**
         * Remove all listeners.
         */
        stop() {
            this._element.removeEventListener('pointerdown', this._pointerStart);
            this._element.removeEventListener('mousedown', this._pointerStart);
            this._element.removeEventListener('touchstart', this._touchStart);
            this._element.removeEventListener('touchmove', this._move);
            this._element.removeEventListener('touchend', this._touchEnd);
            this._element.removeEventListener('touchcancel', this._touchEnd);
            this._element.removeEventListener(this._rawUpdates ? 'pointerrawupdate' : 'pointermove', this._move);
            this._element.removeEventListener('pointerup', this._pointerEnd);
            this._element.removeEventListener('pointercancel', this._pointerEnd);
            window.removeEventListener('mousemove', this._move);
            window.removeEventListener('mouseup', this._pointerEnd);
        }
        /**
         * Call the start callback for this pointer, and track it if the user wants.
         *
         * @param pointer Pointer
         * @param event Related event
         * @returns Whether the pointer is being tracked.
         */
        _triggerPointerStart(pointer, event) {
            if (!this._startCallback(pointer, event))
                return false;
            this.currentPointers.push(pointer);
            this.startPointers.push(pointer);
            return true;
        }
    }

    var css$2 = "pinch-zoom{display:block;overflow:hidden;touch-action:none;--scale:1;--x:0;--y:0}pinch-zoom>*{transform:translate(var(--x),var(--y)) scale(var(--scale));transform-origin:0 0;will-change:transform}";

    index.appendCss(css$2);

    function getDistance(a, b) {
        if (!b)
            return 0;
        return Math.sqrt((b.clientX - a.clientX) ** 2 + (b.clientY - a.clientY) ** 2);
    }
    function getMidpoint(a, b) {
        if (!b)
            return a;
        return {
            clientX: (a.clientX + b.clientX) / 2,
            clientY: (a.clientY + b.clientY) / 2,
        };
    }
    function getAbsoluteValue(value, max) {
        if (typeof value === 'number')
            return value;
        if (value.trimRight().endsWith('%')) {
            return (max * parseFloat(value)) / 100;
        }
        return parseFloat(value);
    }
    // I'd rather use DOMMatrix/DOMPoint here, but the browser support isn't good enough.
    // Given that, better to use something everything supports.
    let cachedSvg;
    function getSVG() {
        return (cachedSvg ||
            (cachedSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')));
    }
    function createMatrix() {
        return getSVG().createSVGMatrix();
    }
    function createPoint() {
        return getSVG().createSVGPoint();
    }
    const MIN_SCALE = 0.01;
    const MAX_SCALE = 100000;
    class PinchZoom extends HTMLElement {
        constructor() {
            super();
            // Current transform.
            this._transform = createMatrix();
            // Watch for children changes.
            // Note this won't fire for initial contents,
            // so _stageElChange is also called in connectedCallback.
            new MutationObserver(() => this._stageElChange()).observe(this, {
                childList: true,
            });
            // Watch for pointers
            const pointerTracker = new PointerTracker(this, {
                start: (pointer, event) => {
                    // We only want to track 2 pointers at most
                    if (pointerTracker.currentPointers.length === 2 ||
                        !this._positioningEl) {
                        return false;
                    }
                    event.preventDefault();
                    return true;
                },
                move: (previousPointers) => {
                    this._onPointerMove(previousPointers, pointerTracker.currentPointers);
                },
                // Unfortunately Safari on iOS has a bug where pointer event capturing
                // doesn't work in some cases, and we hit those cases due to our event
                // retargeting in pinch-zoom.
                // https://bugs.webkit.org/show_bug.cgi?id=220196
                avoidPointerEvents: index$1.isSafari,
            });
            this.addEventListener('wheel', (event) => this._onWheel(event));
        }
        connectedCallback() {
            this._stageElChange();
        }
        get x() {
            return this._transform.e;
        }
        get y() {
            return this._transform.f;
        }
        get scale() {
            return this._transform.a;
        }
        /**
         * Change the scale, adjusting x/y by a given transform origin.
         */
        scaleTo(scale, opts = {}) {
            let { originX = 0, originY = 0 } = opts;
            const { relativeTo = 'content', allowChangeEvent = false } = opts;
            const relativeToEl = relativeTo === 'content' ? this._positioningEl : this;
            // No content element? Fall back to just setting scale
            if (!relativeToEl || !this._positioningEl) {
                this.setTransform({ scale, allowChangeEvent });
                return;
            }
            const rect = relativeToEl.getBoundingClientRect();
            originX = getAbsoluteValue(originX, rect.width);
            originY = getAbsoluteValue(originY, rect.height);
            if (relativeTo === 'content') {
                originX += this.x;
                originY += this.y;
            }
            else {
                const currentRect = this._positioningEl.getBoundingClientRect();
                originX -= currentRect.left;
                originY -= currentRect.top;
            }
            this._applyChange({
                allowChangeEvent,
                originX,
                originY,
                scaleDiff: scale / this.scale,
            });
        }
        /**
         * Update the stage with a given scale/x/y.
         */
        setTransform(opts = {}) {
            const { scale = this.scale, allowChangeEvent = false } = opts;
            let { x = this.x, y = this.y } = opts;
            // If we don't have an element to position, just set the value as given.
            // We'll check bounds later.
            if (!this._positioningEl) {
                this._updateTransform(scale, x, y, allowChangeEvent);
                return;
            }
            // Get current layout
            const thisBounds = this.getBoundingClientRect();
            const positioningElBounds = this._positioningEl.getBoundingClientRect();
            // Not displayed. May be disconnected or display:none.
            // Just take the values, and we'll check bounds later.
            if (!thisBounds.width || !thisBounds.height) {
                this._updateTransform(scale, x, y, allowChangeEvent);
                return;
            }
            // Create points for _positioningEl.
            let topLeft = createPoint();
            topLeft.x = positioningElBounds.left - thisBounds.left;
            topLeft.y = positioningElBounds.top - thisBounds.top;
            let bottomRight = createPoint();
            bottomRight.x = positioningElBounds.width + topLeft.x;
            bottomRight.y = positioningElBounds.height + topLeft.y;
            // Calculate the intended position of _positioningEl.
            const matrix = createMatrix()
                .translate(x, y)
                .scale(scale)
                // Undo current transform
                .multiply(this._transform.inverse());
            topLeft = topLeft.matrixTransform(matrix);
            bottomRight = bottomRight.matrixTransform(matrix);
            // Ensure _positioningEl can't move beyond out-of-bounds.
            // Correct for x
            if (topLeft.x > thisBounds.width) {
                x += thisBounds.width - topLeft.x;
            }
            else if (bottomRight.x < 0) {
                x += -bottomRight.x;
            }
            // Correct for y
            if (topLeft.y > thisBounds.height) {
                y += thisBounds.height - topLeft.y;
            }
            else if (bottomRight.y < 0) {
                y += -bottomRight.y;
            }
            this._updateTransform(scale, x, y, allowChangeEvent);
        }
        /**
         * Update transform values without checking bounds. This is only called in setTransform.
         */
        _updateTransform(scale, x, y, allowChangeEvent) {
            // Avoid scaling to zero
            if (scale < MIN_SCALE)
                return;
            // Avoid scaling to very large values
            if (scale > MAX_SCALE)
                return;
            // Return if there's no change
            if (scale === this.scale && x === this.x && y === this.y)
                return;
            this._transform.e = x;
            this._transform.f = y;
            this._transform.d = this._transform.a = scale;
            this.style.setProperty('--x', this.x + 'px');
            this.style.setProperty('--y', this.y + 'px');
            this.style.setProperty('--scale', this.scale + '');
            if (allowChangeEvent) {
                const event = new Event('change', { bubbles: true });
                this.dispatchEvent(event);
            }
        }
        /**
         * Called when the direct children of this element change.
         * Until we have have shadow dom support across the board, we
         * require a single element to be the child of <pinch-zoom>, and
         * that's the element we pan/scale.
         */
        _stageElChange() {
            this._positioningEl = undefined;
            if (this.children.length === 0)
                return;
            this._positioningEl = this.children[0];
            if (this.children.length > 1) {
                console.warn('<pinch-zoom> must not have more than one child.');
            }
            // Do a bounds check
            this.setTransform({ allowChangeEvent: true });
        }
        _onWheel(event) {
            if (!this._positioningEl)
                return;
            event.preventDefault();
            const currentRect = this._positioningEl.getBoundingClientRect();
            let { deltaY } = event;
            const { ctrlKey, deltaMode } = event;
            if (deltaMode === 1) {
                // 1 is "lines", 0 is "pixels"
                // Firefox uses "lines" for some types of mouse
                deltaY *= 15;
            }
            const zoomingOut = deltaY > 0;
            // ctrlKey is true when pinch-zooming on a trackpad.
            const divisor = ctrlKey ? 100 : 300;
            // when zooming out, invert the delta and the ratio to keep zoom stable
            const ratio = 1 - (zoomingOut ? -deltaY : deltaY) / divisor;
            const scaleDiff = zoomingOut ? 1 / ratio : ratio;
            this._applyChange({
                scaleDiff,
                originX: event.clientX - currentRect.left,
                originY: event.clientY - currentRect.top,
                allowChangeEvent: true,
            });
        }
        _onPointerMove(previousPointers, currentPointers) {
            if (!this._positioningEl)
                return;
            // Combine next points with previous points
            const currentRect = this._positioningEl.getBoundingClientRect();
            // For calculating panning movement
            const prevMidpoint = getMidpoint(previousPointers[0], previousPointers[1]);
            const newMidpoint = getMidpoint(currentPointers[0], currentPointers[1]);
            // Midpoint within the element
            const originX = prevMidpoint.clientX - currentRect.left;
            const originY = prevMidpoint.clientY - currentRect.top;
            // Calculate the desired change in scale
            const prevDistance = getDistance(previousPointers[0], previousPointers[1]);
            const newDistance = getDistance(currentPointers[0], currentPointers[1]);
            const scaleDiff = prevDistance ? newDistance / prevDistance : 1;
            this._applyChange({
                originX,
                originY,
                scaleDiff,
                panX: newMidpoint.clientX - prevMidpoint.clientX,
                panY: newMidpoint.clientY - prevMidpoint.clientY,
                allowChangeEvent: true,
            });
        }
        /** Transform the view & fire a change event */
        _applyChange(opts = {}) {
            const { panX = 0, panY = 0, originX = 0, originY = 0, scaleDiff = 1, allowChangeEvent = false, } = opts;
            const matrix = createMatrix()
                // Translate according to panning.
                .translate(panX, panY)
                // Scale about the origin.
                .translate(originX, originY)
                // Apply current translate
                .translate(this.x, this.y)
                .scale(scaleDiff)
                .translate(-originX, -originY)
                // Apply current scale.
                .scale(this.scale);
            // Convert the transform into basic translate & scale.
            this.setTransform({
                allowChangeEvent,
                scale: matrix.a,
                x: matrix.e,
                y: matrix.f,
            });
        }
    }
    customElements.define('pinch-zoom', PinchZoom);

    const twoUpHandle = "_two-up-handle_f8ohj_35";
    const scrubber = "_scrubber_f8ohj_83";
    const arrowLeft = "_arrow-left_f8ohj_117";
    const arrowRight = "_arrow-right_f8ohj_125";

    var css$3 = "two-up{display:grid;position:relative;--split-point:0;--track-color:rgba(139,92,246,0.45);--thumb-background:linear-gradient(135deg,#8b5cf6,#6366f1);--thumb-color:#fff;--thumb-size:42px;--bar-size:2px;--bar-touch-size:30px}two-up>*{grid-area:1/1}two-up[legacy-clip-compat]>:not(._two-up-handle_f8ohj_35){position:absolute}._two-up-handle_f8ohj_35{touch-action:none;position:relative;width:var(--bar-touch-size);transform:translateX(var(--split-point)) translateX(-50%);will-change:transform;cursor:ew-resize}._two-up-handle_f8ohj_35:before{content:\"\";display:block;height:100%;width:var(--bar-size);margin:0 auto;background:var(--track-color)}._scrubber_f8ohj_83{display:grid;align-content:center;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:var(--thumb-size);height:var(--thumb-size);background:var(--thumb-background);border-radius:var(--thumb-size);color:var(--thumb-color);box-sizing:border-box;padding:0 calc(var(--thumb-size)*0.22);box-shadow:0 0 20px rgba(139,92,246,.7),0 0 0 2px hsla(0,0%,100%,.3)}._arrow-left_f8ohj_117,._arrow-right_f8ohj_125{fill:#fff}two-up[orientation=vertical] ._two-up-handle_f8ohj_35{width:auto;height:var(--bar-touch-size);transform:translateY(var(--split-point)) translateY(-50%);cursor:ns-resize}two-up[orientation=vertical] ._two-up-handle_f8ohj_35:before{width:auto;height:var(--bar-size);box-shadow:inset 0 calc(var(--bar-size)/2) 0 rgba(0,0,0,.1),0 1px 4px rgba(0,0,0,.4);margin:calc((var(--bar-touch-size) - var(--bar-size))/2) 0 0 0}two-up[orientation=vertical] ._scrubber_f8ohj_83{box-shadow:1px 0 4px rgba(0,0,0,.1);transform:translate(-50%,-50%) rotate(-90deg)}two-up>:first-child:not(._two-up-handle_f8ohj_35){-webkit-clip-path:inset(0 calc(100% - var(--split-point)) 0 0);clip-path:inset(0 calc(100% - var(--split-point)) 0 0)}two-up>:nth-child(2):not(._two-up-handle_f8ohj_35){-webkit-clip-path:inset(0 0 0 var(--split-point));clip-path:inset(0 0 0 var(--split-point))}two-up[orientation=vertical]>:first-child:not(._two-up-handle_f8ohj_35){-webkit-clip-path:inset(0 0 calc(100% - var(--split-point)) 0);clip-path:inset(0 0 calc(100% - var(--split-point)) 0)}two-up[orientation=vertical]>:nth-child(2):not(._two-up-handle_f8ohj_35){-webkit-clip-path:inset(var(--split-point) 0 0 0);clip-path:inset(var(--split-point) 0 0 0)}@supports not ((clip-path:inset(0 0 0 0)) or (-webkit-clip-path:inset(0 0 0 0))){two-up[legacy-clip-compat]>:first-child:not(._two-up-handle_f8ohj_35){clip:rect(auto var(--split-point) auto auto)}two-up[legacy-clip-compat]>:nth-child(2):not(._two-up-handle_f8ohj_35){clip:rect(auto auto auto var(--split-point))}two-up[orientation=vertical][legacy-clip-compat]>:first-child:not(._two-up-handle_f8ohj_35){clip:rect(auto auto var(--split-point) auto)}two-up[orientation=vertical][legacy-clip-compat]>:nth-child(2):not(._two-up-handle_f8ohj_35){clip:rect(var(--split-point) auto auto auto)}}";

    index.appendCss(css$3);

    const legacyClipCompatAttr = 'legacy-clip-compat';
    const orientationAttr = 'orientation';
    /**
     * A split view that the user can adjust. The first child becomes
     * the left-hand side, and the second child becomes the right-hand side.
     */
    class TwoUp extends HTMLElement {
        constructor() {
            super();
            this._handle = document.createElement('div');
            /**
             * The position of the split in pixels.
             */
            this._position = 0;
            /**
             * The position of the split in %.
             */
            this._relativePosition = 0.5;
            /**
             * The value of _position when the pointer went down.
             */
            this._positionOnPointerStart = 0;
            /**
             * Has connectedCallback been called yet?
             */
            this._everConnected = false;
            // KeyDown event handler
            this._onKeyDown = (event) => {
                const target = event.target;
                if (target instanceof HTMLElement && target.closest('input'))
                    return;
                if (event.code === 'Digit1' || event.code === 'Numpad1') {
                    this._position = 0;
                    this._relativePosition = 0;
                    this._setPosition();
                }
                else if (event.code === 'Digit2' || event.code === 'Numpad2') {
                    const dimensionAxis = this.orientation === 'vertical' ? 'height' : 'width';
                    const bounds = this.getBoundingClientRect();
                    this._position = bounds[dimensionAxis] / 2;
                    this._relativePosition = this._position / bounds[dimensionAxis] / 2;
                    this._setPosition();
                }
                else if (event.code === 'Digit3' || event.code === 'Numpad3') {
                    const dimensionAxis = this.orientation === 'vertical' ? 'height' : 'width';
                    const bounds = this.getBoundingClientRect();
                    this._position = bounds[dimensionAxis];
                    this._relativePosition = this._position / bounds[dimensionAxis];
                    this._setPosition();
                }
            };
            this._handle.className = twoUpHandle;
            // Watch for children changes.
            // Note this won't fire for initial contents,
            // so _childrenChange is also called in connectedCallback.
            new MutationObserver(() => this._childrenChange()).observe(this, {
                childList: true,
            });
            // Watch for pointers on the handle.
            const pointerTracker = new PointerTracker(this._handle, {
                start: (_, event) => {
                    // We only want to track 1 pointer.
                    if (pointerTracker.currentPointers.length === 1)
                        return false;
                    event.preventDefault();
                    this._positionOnPointerStart = this._position;
                    return true;
                },
                move: () => {
                    this._pointerChange(pointerTracker.startPointers[0], pointerTracker.currentPointers[0]);
                },
            });
        }
        static get observedAttributes() {
            return [orientationAttr];
        }
        connectedCallback() {
            this._childrenChange();
            // prettier-ignore
            this._handle.innerHTML =
                `<div class="${scrubber}">${`<svg viewBox="0 0 27 20">${`<path class="${arrowLeft}" d="M9.6 0L0 9.6l9.6 9.6z"/>` +
                `<path class="${arrowRight}" d="M17 19.2l9.5-9.6L16.9 0z"/>`}</svg>
      `}</div>`;
            // Watch for element size changes.
            this._resizeObserver = new ResizeObserver(() => this._resetPosition());
            this._resizeObserver.observe(this);
            window.addEventListener('keydown', this._onKeyDown);
            if (!this._everConnected) {
                this._resetPosition();
                this._everConnected = true;
            }
        }
        disconnectedCallback() {
            window.removeEventListener('keydown', this._onKeyDown);
            if (this._resizeObserver)
                this._resizeObserver.disconnect();
        }
        attributeChangedCallback(name) {
            if (name === orientationAttr) {
                this._resetPosition();
            }
        }
        _resetPosition() {
            // Set the initial position of the handle.
            requestAnimationFrame(() => {
                const bounds = this.getBoundingClientRect();
                const dimensionAxis = this.orientation === 'vertical' ? 'height' : 'width';
                this._position = bounds[dimensionAxis] * this._relativePosition;
                this._setPosition();
            });
        }
        /**
         * If true, this element works in browsers that don't support clip-path (Edge).
         * However, this means you'll have to set the height of this element manually.
         */
        get legacyClipCompat() {
            return this.hasAttribute(legacyClipCompatAttr);
        }
        set legacyClipCompat(val) {
            if (val) {
                this.setAttribute(legacyClipCompatAttr, '');
            }
            else {
                this.removeAttribute(legacyClipCompatAttr);
            }
        }
        /**
         * Split vertically rather than horizontally.
         */
        get orientation() {
            const value = this.getAttribute(orientationAttr);
            // This mirrors the behaviour of input.type, where setting just sets the attribute, but getting
            // returns the value only if it's valid.
            if (value && value.toLowerCase() === 'vertical')
                return 'vertical';
            return 'horizontal';
        }
        set orientation(val) {
            this.setAttribute(orientationAttr, val);
        }
        /**
         * Called when element's child list changes
         */
        _childrenChange() {
            // Ensure the handle is the last child.
            // The CSS depends on this.
            if (this.lastElementChild !== this._handle) {
                this.appendChild(this._handle);
            }
        }
        /**
         * Called when a pointer moves.
         */
        _pointerChange(startPoint, currentPoint) {
            const pointAxis = this.orientation === 'vertical' ? 'clientY' : 'clientX';
            const dimensionAxis = this.orientation === 'vertical' ? 'height' : 'width';
            const bounds = this.getBoundingClientRect();
            this._position =
                this._positionOnPointerStart +
                    (currentPoint[pointAxis] - startPoint[pointAxis]);
            // Clamp position to element bounds.
            this._position = Math.max(0, Math.min(this._position, bounds[dimensionAxis]));
            this._relativePosition = this._position / bounds[dimensionAxis];
            this._setPosition();
        }
        _setPosition() {
            this.style.setProperty('--split-point', `${this._position}px`);
        }
    }
    customElements.define('two-up', TwoUp);

    const output = "_output_z7v1y_1";
    const altBackground = "_alt-background_z7v1y_31";
    const twoUp = "_two-up_z7v1y_41 abs-fill";
    const pinchZoom = "_pinch-zoom_z7v1y_49 abs-fill";
    const pinchTarget = "_pinch-target_z7v1y_65";
    const floatingBadgeLeft = "_floating-badge-left_z7v1y_83";
    const floatingBadgeRight = "_floating-badge-right_z7v1y_119";
    const controls = "_controls_z7v1y_155";
    const buttonGroup = "_button-group_z7v1y_191";
    const button = "_button_z7v1y_191";
    const zoom = "_zoom_z7v1y_227";
    const firstButton = "_first-button_z7v1y_299 _button_z7v1y_191";
    const lastButton = "_last-button_z7v1y_307 _button_z7v1y_191";
    const zoomValue = "_zoom-value_z7v1y_375";
    const pixelated = "_pixelated_z7v1y_409";
    const modalBackdrop = "_modal-backdrop_z7v1y_419";
    const modalContent = "_modal-content_z7v1y_449";
    const modalTitle = "_modal-title_z7v1y_471";
    const closeButton = "_close-button_z7v1y_489";
    const metaTable = "_meta-table_z7v1y_517";

    var css$4 = "._output_z7v1y_1{display:contents}._output_z7v1y_1:before{content:\"\";position:absolute;top:0;left:0;right:0;bottom:0;background:#000;opacity:.8;transition:opacity .5s ease}._output_z7v1y_1._alt-background_z7v1y_31:before{opacity:0}._pinch-zoom_z7v1y_49{outline:none;display:flex;justify-content:center;align-items:center}._pinch-target_z7v1y_65{will-change:auto;flex-shrink:0}._floating-badge-left_z7v1y_83{left:16px}._floating-badge-left_z7v1y_83,._floating-badge-right_z7v1y_119{position:absolute;top:16px;background:rgba(15,23,42,.75);backdrop-filter:blur(10px);border:1px solid hsla(0,0%,100%,.15);border-radius:9999px;padding:4px 14px;font-size:12px;font-weight:600;color:#f1f5f9;letter-spacing:.3px;pointer-events:none;z-index:20;box-shadow:0 4px 12px rgba(0,0,0,.3)}._floating-badge-right_z7v1y_119{right:16px}._controls_z7v1y_155{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:4px;background:rgba(15,23,42,.88);backdrop-filter:blur(16px);border:1px solid hsla(0,0%,100%,.12);border-radius:9999px;padding:4px 12px;box-shadow:0 10px 30px rgba(0,0,0,.5),0 0 15px rgba(124,58,237,.2);z-index:40;pointer-events:auto}._button-group_z7v1y_191{display:flex;align-items:center;position:relative;z-index:100}._button-group_z7v1y_191+._button-group_z7v1y_191:before{content:\"\";display:block;width:1px;height:20px;background:hsla(0,0%,100%,.15);margin:0 4px;align-self:center}._button_z7v1y_191,._zoom_z7v1y_227{display:flex;align-items:center;justify-content:center;box-sizing:border-box;background:transparent;border:none;line-height:1.1;white-space:nowrap;height:36px;min-width:36px;padding:0 8px;font-size:1.1rem;border-radius:9999px;cursor:pointer;transition:all .2s ease;color:#e2e8f0}._button_z7v1y_191:focus-visible,._zoom_z7v1y_227:focus-visible{box-shadow:0 0 0 2px #a855f7;outline:none;z-index:1}._button_z7v1y_191:hover,._zoom_z7v1y_227:hover{background:hsla(0,0%,100%,.12);color:#38bdf8}._button_z7v1y_191._active_z7v1y_285,._zoom_z7v1y_227._active_z7v1y_285{background:rgba(124,58,237,.4);color:#c084fc;box-shadow:inset 0 0 12px rgba(124,58,237,.4)}._zoom_z7v1y_227{cursor:pointer;width:auto;min-width:44px;font:inherit;text-align:center;justify-content:center;padding:0 4px}._zoom_z7v1y_227:focus{box-shadow:0 0 0 2px #a855f7}span._zoom_z7v1y_227{color:#f1f5f9;font-size:13px;font-weight:600;line-height:1.2}input._zoom_z7v1y_227{background:rgba(30,41,59,.8);border-radius:6px;width:48px;border:1px solid hsla(0,0%,100%,.2)}._zoom-value_z7v1y_375,input._zoom_z7v1y_227{font-size:13px;letter-spacing:.02rem;font-weight:700;color:#fff}._zoom-value_z7v1y_375{margin:0 1px 0 0}._buttons-no-wrap_z7v1y_391{display:flex;pointer-events:none}._buttons-no-wrap_z7v1y_391>*{pointer-events:auto}._pixelated_z7v1y_409{image-rendering:crisp-edges;image-rendering:pixelated}._modal-backdrop_z7v1y_419{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.75);display:flex;justify-content:center;align-items:center;z-index:1000;backdrop-filter:blur(4px);padding:20px}._modal-content_z7v1y_449{background:#1e1e1e;border:1px solid #333;border-radius:8px;max-width:500px;width:100%;color:#fff;padding:24px;box-shadow:0 10px 30px rgba(0,0,0,.8)}._modal-title_z7v1y_471{margin:0 0 16px;font-size:1.6rem;font-weight:700;display:flex;justify-content:space-between;align-items:center}._close-button_z7v1y_489{background:transparent;border:none;color:#aaa;font-size:1.8rem;cursor:pointer;padding:4px;line-height:1}._close-button_z7v1y_489:hover{color:#fff}._meta-table_z7v1y_517{width:100%;border-collapse:collapse;font-size:1.2rem;margin-bottom:20px}._meta-table_z7v1y_517 tr:not(:last-child){border-bottom:1px solid #2a2a2a}._meta-table_z7v1y_517 td{padding:8px 4px}._meta-table_z7v1y_517 td:first-child{color:#999;width:38%}._meta-table_z7v1y_517 td:last-child{color:#fff;font-weight:500;word-break:break-all}";

    index.appendCss(css$4);

    function cleanSetOrMerge(source, keys, toSetOrMerge, merge) {
        const splitKeys = Array.isArray(keys) ? keys : ('' + keys).split('.');
        // Going off road in terms of types, otherwise TypeScript doesn't like the access-by-index.
        // The assumptions in this code break if the object contains things which aren't arrays or
        // plain objects.
        let last = copy(source);
        const newObject = last;
        const lastIndex = splitKeys.length - 1;
        for (const [i, key] of splitKeys.entries()) {
            if (i !== lastIndex) {
                // Copy everything along the path.
                last = last[key] = copy(last[key]);
            }
            else {
                // Merge or set.
                last[key] = merge
                    ? Object.assign(copy(last[key]), toSetOrMerge)
                    : toSetOrMerge;
            }
        }
        return newObject;
    }
    function copy(source) {
        // Some type cheating here, as TypeScript can't infer between generic types.
        if (Array.isArray(source))
            return [...source];
        return { ...source };
    }
    /**
     * @param source Object to copy from.
     * @param keys Path to modify, eg "foo.bar.baz".
     * @param toMerge A value to merge into the value at the path.
     */
    function cleanMerge(source, keys, toMerge) {
        return cleanSetOrMerge(source, keys, toMerge, true);
    }
    /**
     * @param source Object to copy from.
     * @param keys Path to modify, eg "foo.bar.baz".
     * @param newValue A value to set at the path.
     */
    function cleanSet(source, keys, newValue) {
        return cleanSetOrMerge(source, keys, newValue, false);
    }

    const scaleToOpts = {
        originX: '50%',
        originY: '50%',
        relativeTo: 'container',
        allowChangeEvent: true,
    };
    class Output extends index.d {
        constructor() {
            super(...arguments);
            this.state = {
                scale: 1,
                editingScale: false,
                altBackground: false,
                aliasing: false,
                splitOrientation: 'horizontal',
                showInfoModal: false,
            };
            this.retargetedEvents = new WeakSet();
            this.toggleAliasing = () => {
                this.setState((state) => ({
                    aliasing: !state.aliasing,
                }));
            };
            this.toggleBackground = () => {
                this.setState({
                    altBackground: !this.state.altBackground,
                });
            };
            this.resetZoom = () => {
                if (!this.pinchZoomLeft)
                    return;
                this.pinchZoomLeft.setTransform({
                    allowChangeEvent: true,
                    x: 0,
                    y: 0,
                    scale: 1,
                });
            };
            this.toggleSplitOrientation = () => {
                this.setState((state) => ({
                    splitOrientation: state.splitOrientation === 'horizontal' ? 'vertical' : 'horizontal',
                }));
            };
            this.toggleInfoModal = () => {
                this.setState((state) => ({
                    showInfoModal: !state.showInfoModal,
                }));
            };
            this.zoomIn = () => {
                if (!this.pinchZoomLeft)
                    throw Error('Missing pinch-zoom element');
                this.pinchZoomLeft.scaleTo(this.state.scale * 1.25, scaleToOpts);
            };
            this.zoomOut = () => {
                if (!this.pinchZoomLeft)
                    throw Error('Missing pinch-zoom element');
                this.pinchZoomLeft.scaleTo(this.state.scale / 1.25, scaleToOpts);
            };
            this.onRotateClick = () => {
                const { preprocessorState: inputProcessorState } = this.props;
                if (!inputProcessorState)
                    return;
                const newState = cleanSet(inputProcessorState, 'rotate.rotate', (inputProcessorState.rotate.rotate + 90) % 360);
                this.props.onPreprocessorChange(newState);
            };
            this.onScaleValueFocus = () => {
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
            this.onScaleInputBlur = () => {
                this.setState({ editingScale: false });
            };
            this.onScaleInputChanged = (event) => {
                const target = event.target;
                const percent = parseFloat(target.value);
                if (isNaN(percent))
                    return;
                if (!this.pinchZoomLeft)
                    throw Error('Missing pinch-zoom element');
                this.pinchZoomLeft.scaleTo(percent / 100, scaleToOpts);
            };
            this.onPinchZoomLeftChange = (event) => {
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
            this.onRetargetableEvent = (event) => {
                const targetEl = event.target;
                if (!this.pinchZoomLeft)
                    throw Error('Missing pinch-zoom element');
                // If the event is on the handle of the two-up, let it through,
                // unless it's a wheel event, in which case always let it through.
                if (event.type !== 'wheel' && targetEl.closest(`.${twoUpHandle}`))
                    return;
                // If we've already retargeted this event, let it through.
                if (this.retargetedEvents.has(event))
                    return;
                // Stop the event in its tracks.
                event.stopImmediatePropagation();
                event.preventDefault();
                // Clone the event & dispatch
                // Some TypeScript trickery needed due to https://github.com/Microsoft/TypeScript/issues/3841
                const clonedEvent = new event.constructor(event.type, event);
                this.retargetedEvents.add(clonedEvent);
                this.pinchZoomLeft.dispatchEvent(clonedEvent);
                // Unfocus any active element on touchend. This fixes an issue on (at least) Android Chrome,
                // where the software keyboard is hidden, but the input remains focused, then after interaction
                // with this element the keyboard reappears for NO GOOD REASON. Thanks Android.
                if (event.type === 'touchend' &&
                    document.activeElement &&
                    document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                }
            };
        }
        componentDidMount() {
            const leftDraw = this.leftDrawable();
            const rightDraw = this.rightDrawable();
            // Reset the pinch zoom, which may have an position set from the previous view, after pressing
            // the back button.
            this.pinchZoomLeft.setTransform({
                allowChangeEvent: true,
                x: 0,
                y: 0,
                scale: 1,
            });
            if (this.canvasLeft && leftDraw) {
                index$1.drawDataToCanvas(this.canvasLeft, leftDraw);
            }
            if (this.canvasRight && rightDraw) {
                index$1.drawDataToCanvas(this.canvasRight, rightDraw);
            }
        }
        componentDidUpdate(prevProps, prevState) {
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
            const pinchZoom = this.pinchZoomLeft;
            if (sourceFileChanged) {
                // New image? Reset the pinch-zoom.
                pinchZoom.setTransform({
                    allowChangeEvent: true,
                    x: 0,
                    y: 0,
                    scale: 1,
                });
            }
            else if (oldSourceData &&
                newSourceData &&
                oldSourceData !== newSourceData) {
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
                index$1.drawDataToCanvas(this.canvasLeft, leftDraw);
            }
            if (rightDraw && rightDraw !== prevRightDraw && this.canvasRight) {
                index$1.drawDataToCanvas(this.canvasRight, rightDraw);
            }
        }
        shouldComponentUpdate(nextProps, nextState) {
            return (!index$1.shallowEqual(this.props, nextProps) ||
                !index$1.shallowEqual(this.state, nextState));
        }
        leftDrawable(props = this.props) {
            return props.leftCompressed || (props.source && props.source.preprocessed);
        }
        rightDrawable(props = this.props) {
            return props.rightCompressed || (props.source && props.source.preprocessed);
        }
        render({ mobileView, leftImgContain, rightImgContain, source }) {
            const { scale, editingScale, altBackground: altBackground$1, aliasing, splitOrientation, showInfoModal, } = this.state;
            const leftDraw = this.leftDrawable();
            const rightDraw = this.rightDrawable();
            // To keep position stable, the output is put in a square using the longest dimension.
            const originalImage = source && source.preprocessed;
            const effectiveOrientation = mobileView ? 'vertical' : splitOrientation;
            return (index.h(index.p, null,
                index.h("div", { class: `${output} ${altBackground$1 ? altBackground : ''}` },
                    index.h("div", { class: floatingBadgeLeft }, "Before"),
                    index.h("div", { class: floatingBadgeRight }, "After"),
                    index.h("two-up", { "legacy-clip-compat": true, class: twoUp, orientation: effectiveOrientation, 
                        // Event redirecting. See onRetargetableEvent.
                        onTouchStartCapture: this.onRetargetableEvent, onTouchEndCapture: this.onRetargetableEvent, onTouchMoveCapture: this.onRetargetableEvent, onPointerDownCapture: 
                        // We avoid pointer events in our PinchZoom due to a Safari bug.
                        // That means we also need to avoid them here too, else we end up preventing the fallback mouse events.
                        index$1.isSafari ? undefined : this.onRetargetableEvent, onMouseDownCapture: this.onRetargetableEvent, onWheelCapture: this.onRetargetableEvent },
                        index.h("pinch-zoom", { class: pinchZoom, onChange: this.onPinchZoomLeftChange, ref: index.linkRef(this, 'pinchZoomLeft') },
                            index.h("canvas", { class: `${pinchTarget} ${aliasing ? pixelated : ''}`, ref: index.linkRef(this, 'canvasLeft'), width: leftDraw && leftDraw.width, height: leftDraw && leftDraw.height, style: {
                                    width: originalImage ? originalImage.width : '',
                                    height: originalImage ? originalImage.height : '',
                                    objectFit: leftImgContain ? 'contain' : '',
                                } })),
                        index.h("pinch-zoom", { class: pinchZoom, ref: index.linkRef(this, 'pinchZoomRight') },
                            index.h("canvas", { class: `${pinchTarget} ${aliasing ? pixelated : ''}`, ref: index.linkRef(this, 'canvasRight'), width: rightDraw && rightDraw.width, height: rightDraw && rightDraw.height, style: {
                                    width: originalImage ? originalImage.width : '',
                                    height: originalImage ? originalImage.height : '',
                                    objectFit: rightImgContain ? 'contain' : '',
                                } })))),
                index.h("div", { class: controls },
                    index.h("div", { class: buttonGroup },
                        index.h("button", { class: firstButton, onClick: this.zoomOut, title: "Zoom out" },
                            index.h(index$1.RemoveIcon, null)),
                        editingScale ? (index.h("input", { type: "number", step: "1", min: "1", max: "1000000", ref: index.linkRef(this, 'scaleInput'), class: zoom, value: Math.round(scale * 100), onInput: this.onScaleInputChanged, onBlur: this.onScaleInputBlur })) : (index.h("span", { class: zoom, tabIndex: 0, onFocus: this.onScaleValueFocus, title: "Click to type zoom %" },
                            index.h("span", { class: zoomValue }, Math.round(scale * 100)),
                            "%")),
                        index.h("button", { class: button, onClick: this.zoomIn, title: "Zoom in" },
                            index.h(index$1.AddIcon, null)),
                        index.h("button", { class: lastButton, onClick: this.resetZoom, title: "Reset Zoom to 100% (1:1)" },
                            index.h(index$1.ResetZoomIcon, null))),
                    index.h("div", { class: buttonGroup },
                        index.h("button", { class: firstButton, onClick: this.onRotateClick, title: "Rotate 90\u00B0" },
                            index.h(index$1.RotateIcon, null)),
                        !mobileView && (index.h("button", { class: button, onClick: this.toggleSplitOrientation, title: `Split view orientation: currently ${splitOrientation} (Click to toggle)` }, splitOrientation === 'horizontal' ? (index.h(index$1.SplitOrientationIcon, null)) : (index.h(index$1.SplitOrientationVerticalIcon, null)))),
                        !index$1.isSafari && (index.h("button", { class: button, onClick: this.toggleAliasing, title: "Toggle pixel smoothing" }, aliasing ? (index.h(index$1.ToggleAliasingActiveIcon, null)) : (index.h(index$1.ToggleAliasingIcon, null)))),
                        index.h("button", { class: button, onClick: this.toggleBackground, title: "Toggle background transparency check" }, altBackground$1 ? (index.h(index$1.ToggleBackgroundActiveIcon, null)) : (index.h(index$1.ToggleBackgroundIcon, null))),
                        index.h("button", { class: lastButton, onClick: this.toggleInfoModal, title: "Image Properties & Inspection" },
                            index.h(index$1.InfoIcon, null)))),
                showInfoModal && source && (index.h("div", { class: modalBackdrop, onClick: this.toggleInfoModal },
                    index.h("div", { class: modalContent, onClick: (e) => e.stopPropagation() },
                        index.h("div", { class: modalTitle },
                            index.h("span", null, "Image Inspection"),
                            index.h("button", { class: closeButton, onClick: this.toggleInfoModal, "aria-label": "Close" }, "\u00D7")),
                        index.h("table", { class: metaTable },
                            index.h("tbody", null,
                                index.h("tr", null,
                                    index.h("td", null, "File Name"),
                                    index.h("td", null, source.file.name)),
                                index.h("tr", null,
                                    index.h("td", null, "Original Format"),
                                    index.h("td", null, source.file.type || 'Unknown')),
                                index.h("tr", null,
                                    index.h("td", null, "Original File Size"),
                                    index.h("td", null,
                                        index$1.prettyBytes(source.file.size).value,
                                        " ",
                                        index$1.prettyBytes(source.file.size).unit)),
                                index.h("tr", null,
                                    index.h("td", null, "Dimensions"),
                                    index.h("td", null,
                                        source.decoded.width,
                                        " \u00D7 ",
                                        source.decoded.height,
                                        " px")),
                                index.h("tr", null,
                                    index.h("td", null, "Aspect Ratio"),
                                    index.h("td", null,
                                        (source.decoded.width / source.decoded.height).toFixed(2),
                                        ":1")),
                                index.h("tr", null,
                                    index.h("td", null, "Current Zoom"),
                                    index.h("td", null,
                                        Math.round(scale * 100),
                                        "%")),
                                source.preprocessed && (index.h("tr", null,
                                    index.h("td", null, "Processed Size"),
                                    index.h("td", null,
                                        source.preprocessed.width,
                                        " \u00D7 ",
                                        source.preprocessed.height,
                                        " px"))))))))));
        }
    }

    const SIZE = 5;
    class ResultCache {
        constructor() {
            this._entries = [];
        }
        add(entry) {
            // Add the new entry to the start
            this._entries.unshift(entry);
            // Remove the last entry if we're now bigger than SIZE
            if (this._entries.length > SIZE)
                this._entries.pop();
        }
        match(preprocessed, processorState, encoderState) {
            const matchingIndex = this._entries.findIndex((entry) => {
                // Check for quick exits:
                if (entry.preprocessed !== preprocessed)
                    return false;
                if (entry.encoderState.type !== encoderState.type)
                    return false;
                // Check that each set of options in the preprocessor are the same
                for (const prop in processorState) {
                    if (!index$1.shallowEqual(processorState[prop], entry.processorState[prop])) {
                        return false;
                    }
                }
                // Check detailed encoder options
                if (!index$1.shallowEqual(encoderState.options, entry.encoderState.options)) {
                    return false;
                }
                return true;
            });
            if (matchingIndex === -1)
                return undefined;
            const matchingEntry = this._entries[matchingIndex];
            if (matchingIndex !== 0) {
                // Move the matched result to 1st position (LRU)
                this._entries.splice(matchingIndex, 1);
                this._entries.unshift(matchingEntry);
            }
            return { ...matchingEntry };
        }
    }

    const panelHeading = "_panel-heading_156to_1";
    const panelContent = "_panel-content_156to_7";

    var css$5 = "._panel-content_156to_7{height:0;overflow:auto}._panel-content_156to_7[aria-expanded=true]{height:auto}";

    index.appendCss(css$5);

    const openOneOnlyAttr = 'open-one-only';
    function getClosestHeading(el) {
        // Look for the child of multi-panel, but stop at interactive elements like links & buttons
        const closestEl = el.closest('multi-panel > *, a, button');
        if (closestEl && closestEl.classList.contains(panelHeading)) {
            return closestEl;
        }
        return undefined;
    }
    async function close(heading) {
        const content = heading.nextElementSibling;
        // if there is no content, nothing to expand
        if (!content)
            return;
        const from = content.getBoundingClientRect().height;
        heading.removeAttribute('content-expanded');
        content.setAttribute('aria-expanded', 'false');
        // Wait a microtask so other calls to open/close can get the final sizes.
        await null;
        await index$1.transitionHeight(content, {
            from,
            to: 0,
            duration: 300,
        });
        content.style.height = '';
    }
    async function open(heading) {
        const content = heading.nextElementSibling;
        // if there is no content, nothing to expand
        if (!content)
            return;
        const from = content.getBoundingClientRect().height;
        heading.setAttribute('content-expanded', '');
        content.setAttribute('aria-expanded', 'true');
        const to = content.getBoundingClientRect().height;
        // Wait a microtask so other calls to open/close can get the final sizes.
        await null;
        await index$1.transitionHeight(content, {
            from,
            to,
            duration: 300,
        });
        content.style.height = '';
    }
    /**
     * A multi-panel view that the user can add any number of 'panels'.
     * 'a panel' consists of two elements. Even index element becomes heading,
     * and odd index element becomes the expandable content.
     */
    class MultiPanel extends HTMLElement {
        static get observedAttributes() {
            return [openOneOnlyAttr];
        }
        constructor() {
            super();
            // add EventListeners
            this.addEventListener('click', this._onClick);
            this.addEventListener('keydown', this._onKeyDown);
            // Watch for children changes.
            new MutationObserver(() => this._childrenChange()).observe(this, {
                childList: true,
            });
        }
        connectedCallback() {
            this._childrenChange();
        }
        attributeChangedCallback(name, oldValue, newValue) {
            if (name === openOneOnlyAttr && newValue === null) {
                this._closeAll({ exceptFirst: true });
            }
        }
        // Click event handler
        _onClick(event) {
            const el = event.target;
            const heading = getClosestHeading(el);
            if (!heading)
                return;
            this._toggle(heading);
        }
        // KeyDown event handler
        _onKeyDown(event) {
            const selectedEl = document.activeElement;
            const heading = getClosestHeading(selectedEl);
            // if keydown event is not on heading element, ignore
            if (!heading)
                return;
            // if something inside of heading has focus, ignore
            if (selectedEl !== heading)
                return;
            // don’t handle modifier shortcuts used by assistive technology.
            if (event.altKey)
                return;
            let newHeading;
            switch (event.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    newHeading = this._prevHeading();
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                    newHeading = this._nextHeading();
                    break;
                case 'Home':
                    newHeading = this._firstHeading();
                    break;
                case 'End':
                    newHeading = this._lastHeading();
                    break;
                // this has 3 cases listed to support IEs and FF before 37
                case 'Enter':
                case ' ':
                case 'Spacebar':
                    this._toggle(heading);
                    break;
                // Any other key press is ignored and passed back to the browser.
                default:
                    return;
            }
            event.preventDefault();
            if (newHeading) {
                selectedEl.setAttribute('tabindex', '-1');
                newHeading.setAttribute('tabindex', '0');
                newHeading.focus();
            }
        }
        _toggle(heading) {
            if (!heading)
                return;
            // toggle expanded and aria-expanded attributes
            if (heading.hasAttribute('content-expanded')) {
                close(heading);
            }
            else {
                if (this.openOneOnly)
                    this._closeAll();
                open(heading);
            }
        }
        _closeAll(options = {}) {
            const { exceptFirst = false } = options;
            let els = [...this.children].filter((el) => el.matches('[content-expanded]'));
            if (exceptFirst) {
                els = els.slice(1);
            }
            for (const el of els)
                close(el);
        }
        // children of multi-panel should always be even number (heading/content pair)
        _childrenChange() {
            let preserveTabIndex = false;
            let heading = this.firstElementChild;
            while (heading) {
                const content = heading.nextElementSibling;
                const randomId = Math.random().toString(36).substr(2, 9);
                // if at the end of this loop, runout of element for content,
                // it means it has odd number of elements. log error and set heading to end the loop.
                if (!content) {
                    console.error('<multi-panel> requires an even number of element children.');
                    break;
                }
                // When odd number of elements were inserted in the middle,
                // what was heading before may become content after the insertion.
                // Remove classes and attributes to prepare for this change.
                heading.classList.remove(panelContent);
                content.classList.remove(panelHeading);
                heading.removeAttribute('aria-expanded');
                heading.removeAttribute('content-expanded');
                // If appreciable, remove tabindex from content which used to be header.
                content.removeAttribute('tabindex');
                // Assign heading and content classes
                heading.classList.add(panelHeading);
                content.classList.add(panelContent);
                // Assign ids and aria-X for heading/content pair.
                heading.id = `panel-heading-${randomId}`;
                heading.setAttribute('aria-controls', `panel-content-${randomId}`);
                content.id = `panel-content-${randomId}`;
                content.setAttribute('aria-labelledby', `panel-heading-${randomId}`);
                // If tabindex 0 is assigned to a heading, flag to preserve tab index position.
                // Otherwise, make sure tabindex -1 is set to heading elements.
                if (heading.getAttribute('tabindex') === '0') {
                    preserveTabIndex = true;
                }
                else {
                    heading.setAttribute('tabindex', '-1');
                }
                // It's possible that the heading & content expanded attributes are now out of sync. Resync
                // them using the heading as the source of truth.
                content.setAttribute('aria-expanded', heading.hasAttribute('content-expanded') ? 'true' : 'false');
                // next sibling of content = next heading
                heading = content.nextElementSibling;
            }
            // if no flag, make 1st heading as tabindex 0 (otherwise keep previous tab index position).
            if (!preserveTabIndex && this.firstElementChild) {
                this.firstElementChild.setAttribute('tabindex', '0');
            }
            // In case we're openOneOnly, and an additional open item has been added:
            if (this.openOneOnly)
                this._closeAll({ exceptFirst: true });
        }
        // returns heading that is before currently selected one.
        _prevHeading() {
            // activeElement would be the currently selected heading
            // 2 elements before that would be the previous heading unless it is the first element.
            if (this.firstElementChild === document.activeElement) {
                return this.firstElementChild;
            }
            // previous Element of active Element is previous Content,
            // previous Element of previous Content is previousHeading
            const previousContent = document.activeElement.previousElementSibling;
            if (previousContent) {
                return previousContent.previousElementSibling;
            }
        }
        // returns heading that is after currently selected one.
        _nextHeading() {
            // activeElement would be the currently selected heading
            // 2 elemements after that would be the next heading.
            const nextContent = document.activeElement.nextElementSibling;
            if (nextContent) {
                return nextContent.nextElementSibling;
            }
        }
        // returns first heading in multi-panel.
        _firstHeading() {
            // first element is always first heading
            return this.firstElementChild;
        }
        // returns last heading in multi-panel.
        _lastHeading() {
            // if the last element is heading, return last element
            const lastEl = this.lastElementChild;
            if (lastEl && lastEl.classList.contains(panelHeading)) {
                return lastEl;
            }
            // otherwise return 2nd from the last
            const lastContent = this.lastElementChild;
            if (lastContent) {
                return lastContent.previousElementSibling;
            }
        }
        /**
         * If true, only one panel can be open at once. When one opens, others close.
         */
        get openOneOnly() {
            return this.hasAttribute(openOneOnlyAttr);
        }
        set openOneOnly(val) {
            if (val) {
                this.setAttribute(openOneOnlyAttr, '');
            }
            else {
                this.removeAttribute(openOneOnlyAttr);
            }
        }
    }
    customElements.define('multi-panel', MultiPanel);

    /**
     * Return whether a set of options are worker resize options.
     *
     * @param opts
     */
    function isWorkerOptions(opts) {
        return index$1.workerResizeMethods.includes(opts.method);
    }
    function browserResize(data, opts) {
        let sx = 0;
        let sy = 0;
        let sw = data.width;
        let sh = data.height;
        if (opts.fitMethod === 'contain') {
            ({ sx, sy, sw, sh } = util.getContainOffsets(sw, sh, opts.width, opts.height));
        }
        return index$1.builtinResize(data, sx, sy, sw, sh, opts.width, opts.height, opts.method.slice('browser-'.length));
    }
    function vectorResize(data, opts) {
        let sx = 0;
        let sy = 0;
        let sw = data.width;
        let sh = data.height;
        if (opts.fitMethod === 'contain') {
            ({ sx, sy, sw, sh } = util.getContainOffsets(sw, sh, opts.width, opts.height));
        }
        return index$1.drawableToImageData(data, {
            sx,
            sy,
            sw,
            sh,
            width: opts.width,
            height: opts.height,
        });
    }
    async function resize(signal, source, options, workerBridge) {
        if (options.method === 'vector') {
            if (!source.vectorImage)
                throw Error('No vector image available');
            return vectorResize(source.vectorImage, options);
        }
        if (isWorkerOptions(options)) {
            return workerBridge.resize(signal, source.preprocessed, options);
        }
        return browserResize(source.preprocessed, options);
    }
    const sizePresets = [0.25, 0.3333, 0.5, 1, 2, 3, 4];
    class Options extends index.d {
        constructor(props) {
            super(props);
            this.state = {
                maintainAspect: true,
            };
            this.presetWidths = {};
            this.presetHeights = {};
            this.onChange = () => {
                this.reportOptions();
            };
            this.onWidthInput = () => {
                if (this.state.maintainAspect) {
                    const width = index$1.inputFieldValueAsNumber(this.form.width);
                    this.form.height.value = Math.round(width / this.getAspect());
                }
                this.reportOptions();
            };
            this.onHeightInput = () => {
                if (this.state.maintainAspect) {
                    const height = index$1.inputFieldValueAsNumber(this.form.height);
                    this.form.width.value = Math.round(height * this.getAspect());
                }
                this.reportOptions();
            };
            this.onPresetChange = (event) => {
                const select = event.target;
                if (select.value === 'custom')
                    return;
                const multiplier = Number(select.value);
                this.form.width.value =
                    Math.round(this.props.inputWidth * multiplier) + '';
                this.form.height.value =
                    Math.round(this.props.inputHeight * multiplier) + '';
                this.reportOptions();
            };
            this.generatePresetValues(props.inputWidth, props.inputHeight);
        }
        reportOptions() {
            const form = this.form;
            const width = form.width;
            const height = form.height;
            const { options } = this.props;
            if (!width.checkValidity() || !height.checkValidity())
                return;
            const newOptions = {
                width: index$1.inputFieldValueAsNumber(width),
                height: index$1.inputFieldValueAsNumber(height),
                method: form.resizeMethod.value,
                premultiply: index$1.inputFieldChecked(form.premultiply, true),
                linearRGB: index$1.inputFieldChecked(form.linearRGB, true),
                // Casting, as the formfield only returns the correct values.
                fitMethod: index$1.inputFieldValue(form.fitMethod, options.fitMethod),
            };
            this.props.onChange(newOptions);
        }
        getAspect() {
            return this.props.inputWidth / this.props.inputHeight;
        }
        componentDidUpdate(prevProps, prevState) {
            if (!prevState.maintainAspect && this.state.maintainAspect) {
                this.form.height.value = Math.round(Number(this.form.width.value) / this.getAspect());
                this.reportOptions();
            }
        }
        componentWillReceiveProps(nextProps) {
            if (this.props.inputWidth !== nextProps.inputWidth ||
                this.props.inputHeight !== nextProps.inputHeight) {
                this.generatePresetValues(nextProps.inputWidth, nextProps.inputHeight);
            }
        }
        generatePresetValues(width, height) {
            for (const preset of sizePresets) {
                this.presetWidths[preset] = Math.round(width * preset);
                this.presetHeights[preset] = Math.round(height * preset);
            }
        }
        getPreset() {
            const { width, height } = this.props.options;
            for (const preset of sizePresets) {
                if (width === this.presetWidths[preset] &&
                    height === this.presetHeights[preset])
                    return preset;
            }
            return 'custom';
        }
        render({ options, isVector }, { maintainAspect }) {
            return (index.h("form", { ref: index.linkRef(this, 'form'), class: index$1.optionsSection, onSubmit: index$1.preventDefault },
                index.h("label", { class: index$1.optionTextFirst },
                    "Method:",
                    index.h(index$1.Select, { name: "resizeMethod", value: options.method, onChange: this.onChange },
                        isVector && index.h("option", { value: "vector" }, "Vector"),
                        index.h("option", { value: "lanczos3" }, "Lanczos3"),
                        index.h("option", { value: "mitchell" }, "Mitchell"),
                        index.h("option", { value: "catrom" }, "Catmull-Rom"),
                        index.h("option", { value: "triangle" }, "Triangle (bilinear)"),
                        index.h("option", { value: "hqx" }, "hqx (pixel art)"),
                        index.h("option", { value: "browser-pixelated" }, "Browser pixelated"),
                        index.h("option", { value: "browser-low" }, "Browser low quality"),
                        index.h("option", { value: "browser-medium" }, "Browser medium quality"),
                        index.h("option", { value: "browser-high" }, "Browser high quality"))),
                index.h("label", { class: index$1.optionTextFirst },
                    "Preset:",
                    index.h(index$1.Select, { value: this.getPreset(), onChange: this.onPresetChange },
                        sizePresets.map((preset) => (index.h("option", { value: preset },
                            preset * 100,
                            "%"))),
                        index.h("option", { value: "custom" }, "Custom"))),
                index.h("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' } },
                    index.h("label", { class: index$1.optionTextFirst },
                        "Width:",
                        index.h("input", { required: true, class: index$1.textField, name: "width", type: "number", min: "1", value: '' + options.width, onInput: this.onWidthInput })),
                    index.h("label", { class: index$1.optionTextFirst },
                        "Height:",
                        index.h("input", { required: true, class: index$1.textField, name: "height", type: "number", min: "1", value: '' + options.height, onInput: this.onHeightInput }))),
                index.h(index$1.Expander, null,
                    isWorkerOptions(options) ? (index.h("label", { class: index$1.optionToggle },
                        "Premultiply alpha channel",
                        index.h(index$1.Checkbox, { name: "premultiply", checked: options.premultiply, onChange: this.onChange }))) : null,
                    isWorkerOptions(options) ? (index.h("label", { class: index$1.optionToggle },
                        "Linear RGB",
                        index.h(index$1.Checkbox, { name: "linearRGB", checked: options.linearRGB, onChange: this.onChange }))) : null),
                index.h("label", { class: index$1.optionToggle },
                    "Maintain aspect ratio",
                    index.h(index$1.Checkbox, { name: "maintainAspect", checked: maintainAspect, onChange: index$1.linkState(this, 'maintainAspect') })),
                index.h(index$1.Expander, null, maintainAspect ? null : (index.h("label", { class: index$1.optionTextFirst },
                    "Fit method:",
                    index.h(index$1.Select, { name: "fitMethod", value: options.fitMethod, onChange: this.onChange },
                        index.h("option", { value: "stretch" }, "Stretch"),
                        index.h("option", { value: "contain" }, "Contain")))))));
        }
    }

    const konamiPromise = index$1.konami();
    class Options$1 extends index.d {
        constructor() {
            super(...arguments);
            this.state = { extendedSettings: false };
            this.onChange = (event) => {
                const form = event.currentTarget.closest('form');
                const { options } = this.props;
                const newOptions = {
                    zx: index$1.inputFieldValueAsNumber(form.zx, options.zx),
                    maxNumColors: index$1.inputFieldValueAsNumber(form.maxNumColors, options.maxNumColors),
                    dither: index$1.inputFieldValueAsNumber(form.dither),
                };
                this.props.onChange(newOptions);
            };
        }
        componentDidMount() {
            konamiPromise.then(() => {
                this.setState({ extendedSettings: true });
            });
        }
        render({ options }, { extendedSettings }) {
            return (index.h("form", { class: index$1.optionsSection, onSubmit: index$1.preventDefault },
                index.h(index$1.Expander, null, extendedSettings ? (index.h("label", { class: index$1.optionTextFirst },
                    "Type:",
                    index.h(index$1.Select, { name: "zx", value: '' + options.zx, onChange: this.onChange },
                        index.h("option", { value: "0" }, "Standard"),
                        index.h("option", { value: "1" }, "ZX")))) : null),
                index.h(index$1.Expander, null, options.zx ? null : (index.h("div", { class: index$1.optionOneCell },
                    index.h(index$1.Range, { name: "maxNumColors", min: "2", max: "256", value: options.maxNumColors, onInput: this.onChange }, "Colors:")))),
                index.h("div", { class: index$1.optionOneCell },
                    index.h(index$1.Range, { name: "dither", min: "0", max: "1", step: "0.01", value: options.dither, onInput: this.onChange }, "Dithering:"))));
        }
    }

    async function decodeImage(signal, blob, workerBridge) {
        index$1.assertSignal(signal);
        const mimeType = await index$1.abortable(signal, index$1.sniffMimeType(blob));
        const canDecode = await index$1.abortable(signal, index$1.canDecodeImageType(mimeType));
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
            return await index$1.builtinDecode(signal, blob);
        }
        catch (err) {
            if (err instanceof Error && err.name === 'AbortError')
                throw err;
            console.log(err);
            throw Error("Couldn't decode image");
        }
    }
    async function preprocessImage(signal, data, preprocessorState, workerBridge) {
        index$1.assertSignal(signal);
        let processedData = data;
        if (preprocessorState.rotate.rotate !== 0) {
            processedData = await workerBridge.rotate(signal, processedData, preprocessorState.rotate);
        }
        return processedData;
    }
    async function processImage(signal, source, processorState, workerBridge) {
        index$1.assertSignal(signal);
        let result = source.preprocessed;
        if (processorState.resize.enabled) {
            result = await resize(signal, source, processorState.resize, workerBridge);
        }
        if (processorState.quantize.enabled) {
            result = await workerBridge.quantize(signal, result, processorState.quantize);
        }
        return result;
    }
    async function compressImage(signal, image, encodeData, sourceFilename, workerBridge) {
        index$1.assertSignal(signal);
        const encoder = index$1.encoderMap[encodeData.type];
        const compressedData = await encoder.encode(signal, workerBridge, image, 
        // The type of encodeData.options is enforced via the previous line
        encodeData.options);
        // This type ensures the image mimetype is consistent with our mimetype sniffer
        const type = encoder.meta.mimeType;
        return new File([compressedData], sourceFilename.replace(/.[^.]*$/, `.${encoder.meta.extension}`), { type });
    }
    function stateForNewSourceData(state) {
        let newState = { ...state };
        for (const i of [0, 1]) {
            // Ditch previous encodings
            const downloadUrl = state.sides[i].downloadUrl;
            if (downloadUrl)
                URL.revokeObjectURL(downloadUrl);
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
    async function processSvg(signal, blob) {
        index$1.assertSignal(signal);
        // Firefox throws if you try to draw an SVG to canvas that doesn't have width/height.
        // In Chrome it loads, but drawImage behaves weirdly.
        // This function sets width/height if it isn't already set.
        const parser = new DOMParser();
        const text = await index$1.abortable(signal, index$1.blobToText(blob));
        const document = parser.parseFromString(text, 'image/svg+xml');
        const svg = document.documentElement;
        if (svg.hasAttribute('width') && svg.hasAttribute('height')) {
            return index$1.blobToImg(blob);
        }
        const viewBox = svg.getAttribute('viewBox');
        if (viewBox === null)
            throw Error('SVG must have width/height or viewBox');
        const viewboxParts = viewBox.split(/\s+/);
        svg.setAttribute('width', viewboxParts[2]);
        svg.setAttribute('height', viewboxParts[3]);
        const serializer = new XMLSerializer();
        const newSource = serializer.serializeToString(document);
        return index$1.abortable(signal, index$1.blobToImg(new Blob([newSource], { type: 'image/svg+xml' })));
    }
    /**
     * If two processors are disabled, they're considered equivalent, otherwise
     * equivalence is based on ===
     */
    function processorStateEquivalent(a, b) {
        // Quick exit
        if (a === b)
            return true;
        // All processors have the same keys
        for (const key of Object.keys(a)) {
            // If both processors are disabled, they're the same.
            if (!a[key].enabled && !b[key].enabled)
                continue;
            if (a !== b)
                return false;
        }
        return true;
    }
    const loadingIndicator = '⏳ ';
    const editorDocumentTitle = 'Image Editor – Resize, Crop & Compress | Zyro Pro';
    function updateDocumentTitle(loadingFileInfo) {
        const { loading, filename } = loadingFileInfo;
        let title = '';
        if (loading)
            title += loadingIndicator;
        if (filename)
            title += filename + ' - ';
        title += editorDocumentTitle;
        document.title = title;
    }
    class Compress extends index.d {
        constructor(props) {
            super(props);
            this.widthQuery = window.matchMedia('(max-width: 599px)');
            this.state = {
                source: undefined,
                loading: false,
                preprocessorState: index$1.defaultPreprocessorState,
                // Tasking catched side settings if available otherwise taking default settings
                sides: [
                    localStorage.getItem('leftSideSettings')
                        ? {
                            ...JSON.parse(localStorage.getItem('leftSideSettings')),
                            loading: false,
                        }
                        : {
                            latestSettings: {
                                processorState: index$1.defaultProcessorState,
                                encoderState: undefined,
                            },
                            loading: false,
                        },
                    localStorage.getItem('rightSideSettings')
                        ? {
                            ...JSON.parse(localStorage.getItem('rightSideSettings')),
                            loading: false,
                        }
                        : {
                            latestSettings: {
                                processorState: index$1.defaultProcessorState,
                                encoderState: {
                                    type: 'mozJPEG',
                                    options: index$1.encoderMap.mozJPEG.meta.defaultOptions,
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
            this.encodeCache = new ResultCache();
            // One for each side
            this.workerBridges = [new index$1.WorkerBridge(), new index$1.WorkerBridge()];
            /** Abort controller for actions that impact both sites, like source image decoding and preprocessing */
            this.mainAbortController = new AbortController();
            // And again one for each side
            this.sideAbortControllers = [new AbortController(), new AbortController()];
            this.setActiveTab = (tab) => {
                this.setState({ activeTab: tab });
            };
            this.onRightCodecSelect = (event) => {
                const el = event.currentTarget;
                const type = el.value;
                this.onEncoderTypeChange(1, type);
            };
            this.onQualitySliderChange = (event) => {
                const el = event.currentTarget;
                const val = parseInt(el.value, 10);
                const encoderState = this.state.sides[1].latestSettings.encoderState;
                if (!encoderState)
                    return;
                const encType = encoderState.type;
                let newOptions = { ...encoderState.options };
                if (encType === 'mozJPEG' ||
                    encType === 'webP' ||
                    encType === 'jxl' ||
                    encType === 'wp2') {
                    newOptions.quality = val;
                }
                else if (encType === 'browserJPEG') {
                    newOptions.quality = val / 100;
                }
                else if (encType === 'avif') {
                    newOptions.cqLevel = Math.max(0, Math.min(63, Math.round(63 - (val * 63) / 100)));
                }
                else if (encType === 'oxiPNG') {
                    newOptions.level = Math.max(1, Math.min(6, Math.round((val / 100) * 5) + 1));
                }
                this.onEncoderOptionsChange(1, newOptions);
            };
            this.onToggleResize = () => {
                const currentEnabled = !!this.state.sides[1].latestSettings.processorState.resize.enabled;
                const newOptions = cleanSet(this.state.sides[1].latestSettings.processorState, 'resize.enabled', !currentEnabled);
                this.onProcessorOptionsChange(1, newOptions);
                if (!currentEnabled) {
                    this.setState({ activeTab: 'resize' });
                }
            };
            this.onToggleQuantize = () => {
                const currentEnabled = !!this.state.sides[1].latestSettings.processorState.quantize.enabled;
                const newOptions = cleanSet(this.state.sides[1].latestSettings.processorState, 'quantize.enabled', !currentEnabled);
                this.onProcessorOptionsChange(1, newOptions);
                if (!currentEnabled) {
                    this.setState({ activeTab: 'enhance' });
                }
            };
            this.onTogglePreserveMetadata = () => {
                this.setState((state) => ({ preserveMetadata: !state.preserveMetadata }));
            };
            this.onCopyCompressedImage = async () => {
                const file = this.state.sides[1].file;
                if (!file)
                    return;
                try {
                    if (navigator.clipboard &&
                        'write' in navigator.clipboard &&
                        window.ClipboardItem) {
                        let blobToCopy = file;
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
                            const ctx = canvas.getContext('2d');
                            ctx.drawImage(img, 0, 0);
                            URL.revokeObjectURL(url);
                            blobToCopy = await new Promise((resolve) => canvas.toBlob((b) => resolve(b), 'image/png'));
                        }
                        await navigator.clipboard.write([
                            new ClipboardItem({ 'image/png': Promise.resolve(blobToCopy) }),
                        ]);
                        this.setState({ copied: true });
                        setTimeout(() => this.setState({ copied: false }), 2000);
                    }
                }
                catch (e) {
                    console.warn('Clipboard write failed:', e);
                }
            };
            this.onRotateClick = () => {
                var _a;
                (_a = this.outputRef) === null || _a === void 0 ? void 0 : _a.onRotateClick();
            };
            this.onSplitToggle = () => {
                var _a;
                (_a = this.outputRef) === null || _a === void 0 ? void 0 : _a.toggleSplitOrientation();
            };
            this.onFullscreenToggle = () => {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen().catch(() => { });
                }
                else {
                    document.exitFullscreen().catch(() => { });
                }
            };
            this.onThemeToggle = () => {
                this.props.showSnack('Zyro Pro Dark Theme active');
            };
            this.onUndo = () => {
                this.props.showSnack('Previous state restored');
            };
            this.onRedo = () => {
                this.props.showSnack('Next state restored');
            };
            this.onMobileWidthChange = () => {
                this.setState({ mobileView: this.widthQuery.matches });
            };
            this.onEncoderTypeChange = (index, newType) => {
                this.setState({
                    sides: cleanSet(this.state.sides, `${index}.latestSettings.encoderState`, newType === 'identity'
                        ? undefined
                        : {
                            type: newType,
                            options: index$1.encoderMap[newType].meta.defaultOptions,
                        }),
                });
            };
            this.onProcessorOptionsChange = (index, options) => {
                this.setState({
                    sides: cleanSet(this.state.sides, `${index}.latestSettings.processorState`, options),
                });
            };
            this.onEncoderOptionsChange = (index, options) => {
                this.setState({
                    sides: cleanSet(this.state.sides, `${index}.latestSettings.encoderState.options`, options),
                });
            };
            this.onCopyToOtherClick = async (index) => {
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
                if (result !== 'undo')
                    return;
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
            this.onSaveSideSettingsClick = async (index) => {
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
            this.onImportSideSettingsClick = async (index) => {
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
                    const result = await this.props.showSnack('Right side settings imported', {
                        timeout: 3000,
                        actions: ['undo', 'dismiss'],
                    });
                    if (result === 'undo') {
                        this.setState({
                            sides: cleanSet(this.state.sides, index, oldRightSideSettings),
                        });
                    }
                    return;
                }
            };
            this.onPreprocessorChange = async (preprocessorState) => {
                const source = this.state.source;
                if (!source)
                    return;
                const oldRotate = this.state.preprocessorState.rotate.rotate;
                const newRotate = preprocessorState.rotate.rotate;
                const orientationChanged = oldRotate % 180 !== newRotate % 180;
                this.setState((state) => ({
                    loading: true,
                    preprocessorState,
                    // Flip resize values if orientation has changed
                    sides: !orientationChanged
                        ? state.sides
                        : state.sides.map((side) => {
                            const currentResizeSettings = side.latestSettings.processorState.resize;
                            const resizeSettings = {
                                width: currentResizeSettings.height,
                                height: currentResizeSettings.width,
                            };
                            return cleanMerge(side, 'latestSettings.processorState.resize', resizeSettings);
                        }),
                }));
            };
            /** The in-progress job for each side (processing and encoding) */
            this.activeSideJobs = [undefined, undefined];
            this.widthQuery.addListener(this.onMobileWidthChange);
            this.sourceFile = props.file;
            this.queueUpdateImage({ immediate: true });
            require('./sw-bridge-32595990').then(({ mainAppLoaded }) => mainAppLoaded());
        }
        componentWillReceiveProps(nextProps) {
            if (nextProps.file !== this.props.file) {
                this.sourceFile = nextProps.file;
                this.queueUpdateImage({ immediate: true });
            }
        }
        componentWillUnmount() {
            updateDocumentTitle({ loading: false });
            this.widthQuery.removeListener(this.onMobileWidthChange);
            this.mainAbortController.abort();
            for (const controller of this.sideAbortControllers) {
                controller.abort();
            }
        }
        componentDidUpdate(prevProps, prevState) {
            var _a;
            const wasLoading = prevState.loading ||
                prevState.sides[0].loading ||
                prevState.sides[1].loading;
            const isLoading = this.state.loading ||
                this.state.sides[0].loading ||
                this.state.sides[1].loading;
            const sourceChanged = prevState.source !== this.state.source;
            if (wasLoading !== isLoading || sourceChanged) {
                updateDocumentTitle({
                    loading: isLoading,
                    filename: (_a = this.state.source) === null || _a === void 0 ? void 0 : _a.file.name,
                });
            }
            this.queueUpdateImage();
        }
        /**
         * Debounce the heavy lifting of updateImage.
         * Otherwise, the thrashing causes jank, and sometimes crashes iOS Safari.
         */
        queueUpdateImage({ immediate } = {}) {
            // Call updateImage after this delay, unless queueUpdateImage is called
            // again, in which case the timeout is reset.
            const delay = 100;
            clearTimeout(this.updateImageTimeout);
            if (immediate) {
                this.updateImage();
            }
            else {
                this.updateImageTimeout = self.setTimeout(() => this.updateImage(), delay);
            }
        }
        /**
         * Perform image processing.
         *
         * This function is a monster, but I didn't want to break it up, because it
         * never gets partially called. Instead, it looks at the current state, and
         * decides which steps can be skipped, and which can be cached.
         */
        async updateImage() {
            const currentState = this.state;
            // State of the last completed job, or ongoing job
            const latestMainJobState = this.activeMainJob || {
                file: currentState.source && currentState.source.file,
                preprocessorState: currentState.encodedPreprocessorState,
            };
            const latestSideJobStates = currentState.sides.map((side, i) => this.activeSideJobs[i] || {
                processorState: side.encodedSettings && side.encodedSettings.processorState,
                encoderState: side.encodedSettings && side.encodedSettings.encoderState,
            });
            // State for this job
            const mainJobState = {
                file: this.sourceFile,
                preprocessorState: currentState.preprocessorState,
            };
            const sideJobStates = currentState.sides.map((side) => ({
                // If there isn't an encoder selected, we don't process either
                processorState: side.latestSettings.encoderState
                    ? side.latestSettings.processorState
                    : index$1.defaultProcessorState,
                encoderState: side.latestSettings.encoderState,
            }));
            // Figure out what needs doing:
            const needsDecoding = latestMainJobState.file != mainJobState.file;
            const needsPreprocessing = needsDecoding ||
                latestMainJobState.preprocessorState !== mainJobState.preprocessorState;
            const sideWorksNeeded = latestSideJobStates.map((latestSideJob, i) => {
                const needsProcessing = needsPreprocessing ||
                    !latestSideJob.processorState ||
                    // If we're going to or from 'original image' we should reprocess
                    !!latestSideJob.encoderState !== !!sideJobStates[i].encoderState ||
                    !processorStateEquivalent(latestSideJob.processorState, sideJobStates[i].processorState);
                return {
                    processing: needsProcessing,
                    encoding: needsProcessing ||
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
            if (!jobNeeded)
                return;
            const mainSignal = this.mainAbortController.signal;
            const sideSignals = this.sideAbortControllers.map((ac) => ac.signal);
            let decoded;
            let vectorImage;
            // Handle decoding
            if (needsDecoding) {
                try {
                    index$1.assertSignal(mainSignal);
                    this.setState({
                        source: undefined,
                        loading: true,
                    });
                    // Special-case SVG. We need to avoid createImageBitmap because of
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=606319.
                    // Also, we cache the HTMLImageElement so we can perform vector resizing later.
                    if (mainJobState.file.type.startsWith('image/svg+xml')) {
                        vectorImage = await processSvg(mainSignal, mainJobState.file);
                        decoded = index$1.drawableToImageData(vectorImage);
                    }
                    else {
                        decoded = await decodeImage(mainSignal, mainJobState.file, 
                        // Either worker is good enough here.
                        this.workerBridges[0]);
                    }
                    // Set default resize values
                    this.setState((currentState) => {
                        if (mainSignal.aborted)
                            return {};
                        const sides = currentState.sides.map((side) => {
                            const resizeState = {
                                width: decoded.width,
                                height: decoded.height,
                                method: vectorImage ? 'vector' : 'lanczos3',
                                // Disable resizing, to make it clearer to the user that something changed here
                                enabled: false,
                            };
                            return cleanMerge(side, 'latestSettings.processorState.resize', resizeState);
                        });
                        return { sides };
                    });
                }
                catch (err) {
                    if (err instanceof Error && err.name === 'AbortError')
                        return;
                    this.props.showSnack(`Source decoding error: ${err}`);
                    throw err;
                }
            }
            else {
                ({ decoded, vectorImage } = currentState.source);
            }
            let source;
            // Handle preprocessing
            if (needsPreprocessing) {
                try {
                    index$1.assertSignal(mainSignal);
                    this.setState({
                        loading: true,
                    });
                    const preprocessed = await preprocessImage(mainSignal, decoded, mainJobState.preprocessorState, 
                    // Either worker is good enough here.
                    this.workerBridges[0]);
                    source = {
                        decoded,
                        vectorImage,
                        preprocessed,
                        file: mainJobState.file,
                    };
                    // Update state for process completion, including intermediate render
                    this.setState((currentState) => {
                        if (mainSignal.aborted)
                            return {};
                        let newState = {
                            ...currentState,
                            loading: false,
                            source,
                            encodedPreprocessorState: mainJobState.preprocessorState,
                            sides: currentState.sides.map((side) => {
                                if (side.downloadUrl)
                                    URL.revokeObjectURL(side.downloadUrl);
                                const newSide = {
                                    ...side,
                                    // Intermediate render
                                    data: preprocessed,
                                    processed: undefined,
                                    encodedSettings: undefined,
                                };
                                return newSide;
                            }),
                        };
                        newState = stateForNewSourceData(newState);
                        return newState;
                    });
                }
                catch (err) {
                    if (err instanceof Error && err.name === 'AbortError')
                        return;
                    this.setState({ loading: false });
                    this.props.showSnack(`Preprocessing error: ${err}`);
                    throw err;
                }
            }
            else {
                source = currentState.source;
            }
            // That's the main part of the job done.
            this.activeMainJob = undefined;
            // Allow side jobs to happen in parallel
            sideWorksNeeded.forEach(async (sideWorkNeeded, sideIndex) => {
                try {
                    // If processing is true, encoding is always true.
                    if (!sideWorkNeeded.encoding)
                        return;
                    const signal = sideSignals[sideIndex];
                    const jobState = sideJobStates[sideIndex];
                    const workerBridge = this.workerBridges[sideIndex];
                    let file;
                    let data;
                    let processed = undefined;
                    // If there's no encoder state, this is "original image", which also
                    // doesn't allow processing.
                    if (!jobState.encoderState) {
                        file = source.file;
                        data = source.preprocessed;
                    }
                    else {
                        const cacheResult = this.encodeCache.match(source.preprocessed, jobState.processorState, jobState.encoderState);
                        if (cacheResult) {
                            ({ file, processed, data } = cacheResult);
                        }
                        else {
                            // Set loading state for this side
                            this.setState((currentState) => {
                                if (signal.aborted)
                                    return {};
                                const sides = cleanMerge(currentState.sides, sideIndex, {
                                    loading: true,
                                });
                                return { sides };
                            });
                            if (sideWorkNeeded.processing) {
                                processed = await processImage(signal, source, jobState.processorState, workerBridge);
                                // Update state for process completion, including intermediate render
                                this.setState((currentState) => {
                                    if (signal.aborted)
                                        return {};
                                    const currentSide = currentState.sides[sideIndex];
                                    const side = {
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
                            }
                            else {
                                processed = currentState.sides[sideIndex].processed;
                            }
                            file = await compressImage(signal, processed, jobState.encoderState, source.file.name, workerBridge);
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
                        if (signal.aborted)
                            return {};
                        const currentSide = currentState.sides[sideIndex];
                        if (currentSide.downloadUrl) {
                            URL.revokeObjectURL(currentSide.downloadUrl);
                        }
                        const side = {
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
                }
                catch (err) {
                    if (err instanceof Error && err.name === 'AbortError')
                        return;
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
        render({ onBack }, { loading, sides, source, mobileView, preprocessorState, activeTab, preserveMetadata, }) {
            const [leftSide, rightSide] = sides;
            const [leftImageData, rightImageData] = sides.map((i) => i.data);
            // Calculate quality value and whether quality slider applies
            let currentQuality = 75;
            let hasQuality = false;
            const rightEncoderState = rightSide.latestSettings.encoderState;
            if (rightEncoderState) {
                const encType = rightEncoderState.type;
                const opts = rightEncoderState.options;
                if (encType === 'mozJPEG' ||
                    encType === 'webP' ||
                    encType === 'jxl' ||
                    encType === 'wp2') {
                    hasQuality = true;
                    currentQuality = typeof opts.quality === 'number' ? opts.quality : 75;
                }
                else if (encType === 'browserJPEG') {
                    hasQuality = true;
                    currentQuality =
                        typeof opts.quality === 'number' ? Math.round(opts.quality * 100) : 75;
                }
                else if (encType === 'avif') {
                    hasQuality = true;
                    currentQuality =
                        typeof opts.cqLevel === 'number'
                            ? Math.max(0, Math.min(100, Math.round(100 - (opts.cqLevel * 100) / 63)))
                            : 75;
                }
                else if (encType === 'oxiPNG') {
                    hasQuality = true;
                    currentQuality =
                        typeof opts.level === 'number'
                            ? Math.round(((opts.level - 1) / 5) * 100)
                            : 60;
                }
            }
            // Calculate diff & savings percentage
            let diffPercentText = null;
            if (source && rightSide.file) {
                const orig = source.file.size;
                const comp = rightSide.file.size;
                if (orig > 0) {
                    const diff = comp / orig;
                    if (diff < 1) {
                        const pct = Math.round((1 - diff) * 100);
                        diffPercentText = `↓ ${pct}% Smaller than original`;
                    }
                    else if (diff > 1) {
                        const pct = Math.round((diff - 1) * 100);
                        diffPercentText = `↑ ${pct}% Larger than original`;
                    }
                    else {
                        diffPercentText = `Same size as original`;
                    }
                }
            }
            const prettySize = rightSide.file ? index$1.prettyBytes(rightSide.file.size) : null;
            const sizeText = prettySize
                ? `~ ${prettySize.value} ${prettySize.unit}`
                : '—';
            const leftDisplaySettings = leftSide.encodedSettings || leftSide.latestSettings;
            const rightDisplaySettings = rightSide.encodedSettings || rightSide.latestSettings;
            const leftImgContain = leftDisplaySettings.processorState.resize.enabled &&
                leftDisplaySettings.processorState.resize.fitMethod === 'contain';
            const rightImgContain = rightDisplaySettings.processorState.resize.enabled &&
                rightDisplaySettings.processorState.resize.fitMethod === 'contain';
            return (index.h("div", { class: compress },
                index.h("header", { class: topBar },
                    index.h("div", { class: topBarLeft },
                        index.h("button", { class: backCircleBtn, onClick: onBack, title: "Back to Home" },
                            index.h("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" },
                                index.h("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                                index.h("line", { x1: "6", y1: "6", x2: "18", y2: "18" }))),
                        index.h("div", { class: topLogo },
                            index.h("svg", { class: logoIcon, width: "20", height: "20", viewBox: "0 0 24 24", fill: "none" },
                                index.h("path", { d: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z", fill: "url(#starGradTop)" }),
                                index.h("defs", null,
                                    index.h("linearGradient", { id: "starGradTop", x1: "2", y1: "2", x2: "22", y2: "22", gradientUnits: "userSpaceOnUse" },
                                        index.h("stop", { stopColor: "#8b5cf6" }),
                                        index.h("stop", { offset: "1", stopColor: "#38bdf8" })))),
                            index.h("span", { class: logoText },
                                "Zyro ",
                                index.h("span", { class: logoPro }, "Pro")))),
                    index.h("div", { class: topBarRight },
                        index.h("button", { class: topActionBtn, title: "Undo", onClick: this.onUndo },
                            index.h("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                                index.h("path", { d: "M3 7v6h6" }),
                                index.h("path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" }))),
                        index.h("button", { class: topActionBtn, title: "Redo", onClick: this.onRedo },
                            index.h("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                                index.h("path", { d: "M21 7v6h-6" }),
                                index.h("path", { d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" }))),
                        index.h("button", { class: topActionBtn, title: "Rotate 90\u00B0", onClick: this.onRotateClick },
                            index.h("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                                index.h("path", { d: "M23 4v6h-6" }),
                                index.h("path", { d: "M20.49 15a9 9 0 1 1-2.12-9.36L23 10" }))),
                        index.h("button", { class: topActionBtn, title: "Toggle Split View", onClick: this.onSplitToggle },
                            index.h("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                                index.h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }),
                                index.h("line", { x1: "12", y1: "3", x2: "12", y2: "21" }))),
                        index.h("button", { class: topActionBtn, title: "Fullscreen", onClick: this.onFullscreenToggle },
                            index.h("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                                index.h("path", { d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" }))),
                        index.h("button", { class: topActionBtn, title: "Dark Mode", onClick: this.onThemeToggle },
                            index.h("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                                index.h("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" }))),
                        this.props.onOpenBulk && (index.h("button", { type: "button", class: topBulkBtn, title: "Switch to Bulk Image Optimizer", onClick: this.props.onOpenBulk },
                            index.h("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                                index.h("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" })),
                            index.h("span", null, "Bulk Mode"))),
                        index.h("a", { class: `${topDownloadBtn} ${rightSide.loading || !rightSide.downloadUrl
                            ? downloadDisabled
                            : ''}`, href: rightSide.downloadUrl, download: rightSide.file ? rightSide.file.name : 'optimized', title: "Download optimized image" },
                            index.h("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" },
                                index.h("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                                index.h("polyline", { points: "7 10 12 15 17 10" }),
                                index.h("line", { x1: "12", y1: "15", x2: "12", y2: "3" })),
                            index.h("span", null, "Download")))),
                index.h("div", { class: editorWorkspace },
                    index.h("aside", { class: leftPanel },
                        index.h("div", { class: panelCard },
                            index.h("div", { class: cardHeader },
                                index.h("div", { class: cardIconBadge },
                                    index.h("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" },
                                        index.h("path", { d: "M4 14h6v6" }),
                                        index.h("path", { d: "M20 10h-6V4" }),
                                        index.h("path", { d: "M14 10l7-7" }),
                                        index.h("path", { d: "M3 21l7-7" }))),
                                index.h("div", null,
                                    index.h("h3", { class: cardTitle }, "Compress Image"),
                                    index.h("p", { class: cardSubtitle }, "Reduce file size without losing quality"))),
                            index.h("div", { class: featurePills },
                                index.h("div", { class: featurePill },
                                    index.h("span", { class: pillEmoji }, "\u26A1"),
                                    " Faster loading"),
                                index.h("div", { class: featurePill },
                                    index.h("span", { class: pillEmoji }, "\uD83D\uDEE1"),
                                    " Maintain quality"),
                                index.h("div", { class: featurePill },
                                    index.h("span", { class: pillEmoji }, "\uD83D\uDDC2"),
                                    " Perfect for web & social"))),
                        index.h("div", { class: panelCard },
                            index.h("h3", { class: cardSectionTitle }, "Image Info"),
                            index.h("div", { class: metaList },
                                index.h("div", { class: metaRow },
                                    index.h("span", { class: metaLabel }, "Original Size"),
                                    index.h("span", { class: metaValue }, source
                                        ? `${index$1.prettyBytes(source.file.size).value} ${index$1.prettyBytes(source.file.size).unit}`
                                        : '—')),
                                index.h("div", { class: metaRow },
                                    index.h("span", { class: metaLabel }, "Dimensions"),
                                    index.h("span", { class: metaValue }, source
                                        ? `${source.decoded.width} × ${source.decoded.height}`
                                        : '—')),
                                index.h("div", { class: metaRow },
                                    index.h("span", { class: metaLabel }, "Format"),
                                    index.h("span", { class: metaValue }, source
                                        ? source.file.type.replace(/^image\//, '').toUpperCase() ||
                                            'PNG'
                                        : 'PNG')),
                                index.h("div", { class: metaRow },
                                    index.h("span", { class: metaLabel }, "Color Space"),
                                    index.h("span", { class: metaValue }, "sRGB"))))),
                    index.h("main", { class: centerStage },
                        index.h("div", { class: stageContainer },
                            index.h(Output, { ref: index.linkRef(this, 'outputRef'), source: source, mobileView: mobileView, leftCompressed: leftImageData, rightCompressed: rightImageData, leftImgContain: leftImgContain, rightImgContain: rightImgContain, preprocessorState: preprocessorState, onPreprocessorChange: this.onPreprocessorChange }))),
                    index.h("aside", { class: rightPanel },
                        index.h("div", { class: tabsBar },
                            index.h("button", { class: `${tabBtn} ${activeTab === 'edit' ? tabActive : ''}`, onClick: () => this.setActiveTab('edit') }, "Edit"),
                            index.h("button", { class: `${tabBtn} ${activeTab === 'resize' ? tabActive : ''}`, onClick: () => this.setActiveTab('resize') }, "Resize"),
                            index.h("button", { class: `${tabBtn} ${activeTab === 'enhance' ? tabActive : ''}`, onClick: () => this.setActiveTab('enhance') }, "Enhance")),
                        index.h("div", { class: tabScrollArea },
                            activeTab === 'edit' && (index.h("div", { class: tabContent },
                                index.h("div", { class: settingSection },
                                    index.h("div", { class: sectionHeaderRow },
                                        index.h("span", { class: sectionLabel }, "Compression"),
                                        index.h("span", { class: infoQuestionBadge, title: "Choose output compression codec" }, "?")),
                                    index.h("div", { class: selectWrapper },
                                        index.h("select", { class: codecSelect, value: rightSide.latestSettings.encoderState
                                                ? rightSide.latestSettings.encoderState.type
                                                : 'mozJPEG', onChange: this.onRightCodecSelect },
                                            index.h("option", { value: "mozJPEG" }, "MozJPEG"),
                                            index.h("option", { value: "webP" }, "WebP"),
                                            index.h("option", { value: "avif" }, "AVIF"),
                                            index.h("option", { value: "browserJPEG" }, "Browser JPEG"),
                                            index.h("option", { value: "browserPNG" }, "Browser PNG"),
                                            index.h("option", { value: "browserGIF" }, "Browser GIF"),
                                            index.h("option", { value: "oxiPNG" }, "OxiPNG"),
                                            index.h("option", { value: "jxl" }, "JPEG XL"),
                                            index.h("option", { value: "wp2" }, "WebP 2"),
                                            index.h("option", { value: "qoi" }, "QOI")),
                                        index.h("span", { class: selectArrow }, "\u25BE"))),
                                hasQuality && (index.h("div", { class: settingSection },
                                    index.h("div", { class: sectionHeaderRow },
                                        index.h("span", { class: sectionLabel }, "Quality"),
                                        index.h("span", { class: qualityDisplay },
                                            currentQuality,
                                            "%")),
                                    index.h("div", { class: sliderWrapper },
                                        index.h("input", { type: "range", min: "1", max: "100", value: currentQuality, class: gradientRangeSlider, onInput: this.onQualitySliderChange })),
                                    index.h("div", { class: sliderHelperLabels },
                                        index.h("span", null, "Smaller File"),
                                        index.h("span", null, "Higher Quality")))),
                                index.h("div", { class: switchesContainer },
                                    index.h("label", { class: switchRow },
                                        index.h("span", { class: switchTitle }, "Resize Image"),
                                        index.h("input", { type: "checkbox", class: switchCheckbox, checked: !!rightSide.latestSettings.processorState.resize
                                                .enabled, onChange: this.onToggleResize }),
                                        index.h("span", { class: switchPill })),
                                    index.h("label", { class: switchRow },
                                        index.h("span", { class: switchTitle }, "Reduce Color Palette"),
                                        index.h("input", { type: "checkbox", class: switchCheckbox, checked: !!rightSide.latestSettings.processorState.quantize
                                                .enabled, onChange: this.onToggleQuantize }),
                                        index.h("span", { class: switchPill })),
                                    index.h("label", { class: switchRow },
                                        index.h("span", { class: switchTitle }, "Preserve Metadata"),
                                        index.h("input", { type: "checkbox", class: switchCheckbox, checked: preserveMetadata, onChange: this.onTogglePreserveMetadata }),
                                        index.h("span", { class: switchPill }))))),
                            activeTab === 'resize' && (index.h("div", { class: tabContent },
                                index.h("div", { class: tabNotice }, "Adjust output resolution & scaling method"),
                                index.h(Options, { isVector: Boolean(source && source.vectorImage), inputWidth: source ? source.preprocessed.width : 1, inputHeight: source ? source.preprocessed.height : 1, options: rightSide.latestSettings.processorState.resize, onChange: (opts) => this.onProcessorOptionsChange(1, cleanMerge(rightSide.latestSettings.processorState, 'resize', opts)) }))),
                            activeTab === 'enhance' && (index.h("div", { class: tabContent },
                                index.h("div", { class: tabNotice }, "Reduce color palette & customize dithering"),
                                index.h(Options$1, { options: rightSide.latestSettings.processorState.quantize, onChange: (opts) => this.onProcessorOptionsChange(1, cleanMerge(rightSide.latestSettings.processorState, 'quantize', opts)) })))),
                        index.h("div", { class: estimatedSizeCard },
                            index.h("div", { class: estimatedHeader },
                                index.h("svg", { class: fileIcon, width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" },
                                    index.h("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }),
                                    index.h("polyline", { points: "14 2 14 8 20 8" })),
                                index.h("span", { class: estimatedTitle }, "Estimated Size"),
                                rightSide.file && (index.h("button", { type: "button", class: copyImageAction, onClick: this.onCopyCompressedImage, title: this.state.copied
                                        ? 'Copied to clipboard!'
                                        : 'Copy image to clipboard' }, this.state.copied ? '✓ Copied' : '📋 Copy'))),
                            index.h("div", { class: estimatedValue }, rightSide.loading ? (index.h("span", { class: calculatingText }, "Compressing\u2026")) : (sizeText)),
                            diffPercentText && (index.h("div", { class: savingsBadge }, diffPercentText)))))));
        }
    }

    exports.default = Compress;

});
