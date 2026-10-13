define(['require', 'exports', './initial-app-b9185c19', './comlink-f3ac916c'], function (require, exports, index, comlink) { 'use strict';

    var css = "._select_oa9oz_1{position:relative;width:100%}._builtin-select_oa9oz_6{background:rgba(30,41,59,.85);border:1px solid hsla(0,0%,100%,.12);border-radius:10px;font:inherit;font-size:14px;font-weight:500;padding:10px 32px 10px 14px;-webkit-appearance:none;-moz-appearance:none;color:#fff;width:100%;box-sizing:border-box;outline:none;cursor:pointer;transition:all .2s ease}._builtin-select_oa9oz_6:focus{border-color:#8b5cf6;box-shadow:0 0 0 2px rgba(139,92,246,.3)}._arrow_oa9oz_30{position:absolute;right:14px;top:50%;transform:translateY(-50%);fill:#94a3b8;width:10px;pointer-events:none}._large_oa9oz_40{padding:12px 35px 12px 14px}";

    index.appendCss(css);

    var css$1 = "._checkbox_1fzkh_1{display:inline-flex;align-items:center;justify-content:center;position:relative;--size:20px;cursor:pointer}._real-checkbox_1fzkh_10{position:absolute;top:0;left:0;opacity:0;pointer-events:none}._icon_1fzkh_18{display:block;width:var(--size);height:var(--size);fill:#64748b;transition:fill .2s}._checked_1fzkh_26{fill:#8b5cf6;filter:drop-shadow(0 0 6px rgba(139,92,246,.6))}._disabled_1fzkh_31{fill:hsla(0,0%,100%,.2)}";

    index.appendCss(css$1);

    var css$2 = "._range_ozfiq_1{position:relative;z-index:0;display:grid;grid-template-columns:1fr auto}._label-text_ozfiq_15{color:#fff}._range-wc-container_ozfiq_23{position:relative;z-index:1;grid-row:2/3;grid-column:1/3}._range-wc_ozfiq_23{width:100%}._text-input_ozfiq_45{grid-row:1/2;grid-column:2/3;text-align:right;background:transparent;color:inherit;font:inherit;border:none;padding:2px 5px;box-sizing:border-box;text-decoration:underline;text-decoration-style:dotted;text-decoration-color:var(--main-theme-color);text-underline-position:under;width:54px;position:relative;left:5px}._text-input_ozfiq_45:focus{background:#fff;color:#000}._text-input_ozfiq_45{-moz-appearance:textfield}._text-input_ozfiq_45::-webkit-inner-spin-button,._text-input_ozfiq_45::-webkit-outer-spin-button{-moz-appearance:none;-webkit-appearance:none;margin:0}";

    index.appendCss(css$2);

    /** Replace the contents of a canvas with the given data */
    function drawDataToCanvas(canvas, data) {
        const ctx = canvas.getContext('2d');
        if (!ctx)
            throw Error('Canvas not initialized');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(data, 0, 0);
    }
    /**
     * Encode some image data in a given format using the browser's encoders
     *
     * @param {ImageData} data
     * @param {string} type A mime type, eg image/jpeg.
     * @param {number} [quality] Between 0-1.
     */
    async function canvasEncode(data, type, quality) {
        const canvas = document.createElement('canvas');
        canvas.width = data.width;
        canvas.height = data.height;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            throw Error('Canvas not initialized');
        ctx.putImageData(data, 0, 0);
        let blob;
        if ('toBlob' in canvas) {
            blob = await new Promise((r) => canvas.toBlob(r, type, quality));
        }
        else {
            // Welcome to Edge.
            // TypeScript thinks `canvas` is 'never', so it needs casting.
            const dataUrl = canvas.toDataURL(type, quality);
            const result = /data:([^;]+);base64,(.*)$/.exec(dataUrl);
            if (!result)
                throw Error('Data URL reading failed');
            const outputType = result[1];
            const binaryStr = atob(result[2]);
            const data = new Uint8Array(binaryStr.length);
            for (let i = 0; i < data.length; i += 1) {
                data[i] = binaryStr.charCodeAt(i);
            }
            blob = new Blob([data], { type: outputType });
        }
        if (!blob)
            throw Error('Encoding failed');
        return blob;
    }
    function drawableToImageData(drawable, opts = {}) {
        const { width = drawable.width, height = drawable.height, sx = 0, sy = 0, sw = drawable.width, sh = drawable.height, } = opts;
        // Make canvas same size as image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        // Draw image onto canvas
        const ctx = canvas.getContext('2d');
        if (!ctx)
            throw new Error('Could not create canvas context');
        ctx.drawImage(drawable, sx, sy, sw, sh, 0, 0, width, height);
        return ctx.getImageData(0, 0, width, height);
    }
    function builtinResize(data, sx, sy, sw, sh, dw, dh, method) {
        const canvasSource = document.createElement('canvas');
        canvasSource.width = data.width;
        canvasSource.height = data.height;
        drawDataToCanvas(canvasSource, data);
        const canvasDest = document.createElement('canvas');
        canvasDest.width = dw;
        canvasDest.height = dh;
        const ctx = canvasDest.getContext('2d');
        if (!ctx)
            throw new Error('Could not create canvas context');
        if (method === 'pixelated') {
            ctx.imageSmoothingEnabled = false;
        }
        else {
            ctx.imageSmoothingQuality = method;
        }
        ctx.drawImage(canvasSource, sx, sy, sw, sh, 0, 0, dw, dh);
        return ctx.getImageData(0, 0, dw, dh);
    }
    /**
     * Test whether <canvas> can encode to a particular type.
     */
    async function canvasEncodeTest(mimeType) {
        try {
            const blob = await canvasEncode(new ImageData(1, 1), mimeType);
            // According to the spec, the blob should be null if the format isn't supported…
            if (!blob)
                return false;
            // …but Safari & Firefox fall back to PNG, so we need to check the mime type.
            return blob.type === mimeType;
        }
        catch (err) {
            return false;
        }
    }

    /**
     * Copyright 2020 Google Inc. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *     http://www.apache.org/licenses/LICENSE-2.0
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** If render engine is Safari */
    const isSafari = /Safari\//.test(navigator.userAgent) &&
        !/Chrom(e|ium)\//.test(navigator.userAgent);
    /**
     * Compare two objects, returning a boolean indicating if
     * they have the same properties and strictly equal values.
     */
    function shallowEqual(one, two) {
        for (const i in one)
            if (one[i] !== two[i])
                return false;
        for (const i in two)
            if (!(i in one))
                return false;
        return true;
    }
    async function decodeImage(url) {
        const img = new Image();
        img.decoding = 'async';
        img.src = url;
        const loaded = new Promise((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject(Error('Image loading error'));
        });
        if (img.decode) {
            // Nice off-thread way supported in Safari/Chrome.
            // Safari throws on decode if the source is SVG.
            // https://bugs.webkit.org/show_bug.cgi?id=188347
            await img.decode().catch(() => null);
        }
        // Always await loaded, as we may have bailed due to the Safari bug above.
        await loaded;
        return img;
    }
    /** Caches results from canDecodeImageType */
    const canDecodeCache = new Map();
    /**
     * Tests whether the browser supports a particular image mime type.
     *
     * @param type Mimetype
     * @example await canDecodeImageType('image/avif')
     */
    function canDecodeImageType(type) {
        if (!canDecodeCache.has(type)) {
            const resultPromise = (async () => {
                const picture = document.createElement('picture');
                const img = document.createElement('img');
                const source = document.createElement('source');
                source.srcset = 'data:,x';
                source.type = type;
                picture.append(source, img);
                // Wait a single microtick just for the `img.currentSrc` to get populated.
                await 0;
                // At this point `img.currentSrc` will contain "data:,x" if format is supported and ""
                // otherwise.
                return !!img.currentSrc;
            })();
            canDecodeCache.set(type, resultPromise);
        }
        return canDecodeCache.get(type);
    }
    function blobToArrayBuffer(blob) {
        return new Response(blob).arrayBuffer();
    }
    function blobToText(blob) {
        return new Response(blob).text();
    }
    const magicNumberMapInput = [
        [/^%PDF-/, 'application/pdf'],
        [/^GIF87a/, 'image/gif'],
        [/^GIF89a/, 'image/gif'],
        [/^\x89PNG\x0D\x0A\x1A\x0A/, 'image/png'],
        [/^\xFF\xD8\xFF/, 'image/jpeg'],
        [/^BM/, 'image/bmp'],
        [/^I I/, 'image/tiff'],
        [/^II*/, 'image/tiff'],
        [/^MM\x00*/, 'image/tiff'],
        [/^RIFF....WEBPVP8[LX ]/s, 'image/webp'],
        [/^\xF4\xFF\x6F/, 'image/webp2'],
        [/^\x00\x00\x00 ftypavif\x00\x00\x00\x00/, 'image/avif'],
        [/^\xff\x0a/, 'image/jxl'],
        [/^\x00\x00\x00\x0cJXL \x0d\x0a\x87\x0a/, 'image/jxl'],
        [/^qoif/, 'image/qoi'],
    ];
    const magicNumberToMimeType = new Map(magicNumberMapInput);
    async function sniffMimeType(blob) {
        const firstChunk = await blobToArrayBuffer(blob.slice(0, 16));
        const firstChunkString = Array.from(new Uint8Array(firstChunk))
            .map((v) => String.fromCodePoint(v))
            .join('');
        for (const [detector, mimeType] of magicNumberToMimeType) {
            if (detector.test(firstChunkString)) {
                return mimeType;
            }
        }
        return '';
    }
    async function blobToImg(blob) {
        const url = URL.createObjectURL(blob);
        try {
            return await decodeImage(url);
        }
        finally {
            URL.revokeObjectURL(url);
        }
    }
    async function builtinDecode(signal, blob) {
        assertSignal(signal);
        // Prefer createImageBitmap as it's the off-thread option for Firefox.
        const drawable = await abortable(signal, 'createImageBitmap' in self ? createImageBitmap(blob) : blobToImg(blob));
        return drawableToImageData(drawable);
    }
    /**
     * @param field An HTMLInputElement, but the casting is done here to tidy up onChange.
     * @param defaultVal Value to return if 'field' doesn't exist.
     */
    function inputFieldValueAsNumber(field, defaultVal = 0) {
        if (!field)
            return defaultVal;
        return Number(inputFieldValue(field));
    }
    /**
     * @param field An HTMLInputElement, but the casting is done here to tidy up onChange.
     * @param defaultVal Value to return if 'field' doesn't exist.
     */
    function inputFieldCheckedAsNumber(field, defaultVal = 0) {
        if (!field)
            return defaultVal;
        return Number(inputFieldChecked(field));
    }
    /**
     * @param field An HTMLInputElement, but the casting is done here to tidy up onChange.
     * @param defaultVal Value to return if 'field' doesn't exist.
     */
    function inputFieldChecked(field, defaultVal = false) {
        if (!field)
            return defaultVal;
        return field.checked;
    }
    /**
     * @param field An HTMLInputElement, but the casting is done here to tidy up onChange.
     * @param defaultVal Value to return if 'field' doesn't exist.
     */
    function inputFieldValue(field, defaultVal = '') {
        if (!field)
            return defaultVal;
        return field.value;
    }
    /**
     * Creates a promise that resolves when the user types the konami code.
     */
    function konami() {
        return new Promise((resolve) => {
            // Keycodes for: ↑ ↑ ↓ ↓ ← → ← → B A
            const expectedPattern = '38384040373937396665';
            let rollingPattern = '';
            const listener = (event) => {
                rollingPattern += event.keyCode;
                rollingPattern = rollingPattern.slice(-expectedPattern.length);
                if (rollingPattern === expectedPattern) {
                    window.removeEventListener('keydown', listener);
                    resolve();
                }
            };
            window.addEventListener('keydown', listener);
        });
    }
    async function transitionHeight(el, opts) {
        const { from = el.getBoundingClientRect().height, to = el.getBoundingClientRect().height, duration = 1000, easing = 'ease-in-out', } = opts;
        if (from === to || duration === 0) {
            el.style.height = to + 'px';
            return;
        }
        el.style.height = from + 'px';
        // Force a style calc so the browser picks up the start value.
        getComputedStyle(el).transform;
        el.style.transition = `height ${duration}ms ${easing}`;
        el.style.height = to + 'px';
        return new Promise((resolve) => {
            const listener = (event) => {
                if (event.target !== el)
                    return;
                el.style.transition = '';
                el.removeEventListener('transitionend', listener);
                el.removeEventListener('transitioncancel', listener);
                resolve();
            };
            el.addEventListener('transitionend', listener);
            el.addEventListener('transitioncancel', listener);
        });
    }
    /**
     * Simple event listener that prevents the default.
     */
    function preventDefault(event) {
        event.preventDefault();
    }
    /**
     * Throw an abort error if a signal is aborted.
     */
    function assertSignal(signal) {
        if (signal.aborted)
            throw new DOMException('AbortError', 'AbortError');
    }
    /**
     * Take a signal and promise, and returns a promise that rejects with an AbortError if the abort is
     * signalled, otherwise resolves with the promise.
     */
    async function abortable(signal, promise) {
        assertSignal(signal);
        return Promise.race([
            promise,
            new Promise((_, reject) => {
                signal.addEventListener('abort', () => reject(new DOMException('AbortError', 'AbortError')));
            }),
        ]);
    }

    const label = 'AVIF';
    const mimeType = 'image/avif';
    const extension = 'avif';
    const defaultOptions = {
        quality: 50,
        qualityAlpha: -1,
        denoiseLevel: 0,
        tileColsLog2: 0,
        tileRowsLog2: 0,
        speed: 6,
        subsample: 1,
        chromaDeltaQ: false,
        sharpness: 0,
        tune: 0 /* auto */,
        enableSharpYUV: false,
    };

    var avifEncoderMeta = /*#__PURE__*/Object.freeze({
        __proto__: null,
        label: label,
        mimeType: mimeType,
        extension: extension,
        defaultOptions: defaultOptions
    });

    const label$1 = 'Browser GIF';
    const mimeType$1 = 'image/gif';
    const extension$1 = 'gif';
    const defaultOptions$1 = {};

    var browserGIFEncoderMeta = /*#__PURE__*/Object.freeze({
        __proto__: null,
        label: label$1,
        mimeType: mimeType$1,
        extension: extension$1,
        defaultOptions: defaultOptions$1
    });

    const label$2 = 'Browser JPEG';
    const mimeType$2 = 'image/jpeg';
    const extension$2 = 'jpg';
    const defaultOptions$2 = { quality: 0.75 };

    var browserJPEGEncoderMeta = /*#__PURE__*/Object.freeze({
        __proto__: null,
        label: label$2,
        mimeType: mimeType$2,
        extension: extension$2,
        defaultOptions: defaultOptions$2
    });

    const label$3 = 'Browser PNG';
    const mimeType$3 = 'image/png';
    const extension$3 = 'png';
    const defaultOptions$3 = {};

    var browserPNGEncoderMeta = /*#__PURE__*/Object.freeze({
        __proto__: null,
        label: label$3,
        mimeType: mimeType$3,
        extension: extension$3,
        defaultOptions: defaultOptions$3
    });

    const label$4 = 'JPEG XL (beta)';
    const mimeType$4 = 'image/jxl';
    const extension$4 = 'jxl';
    const defaultOptions$4 = {
        effort: 7,
        quality: 75,
        progressive: false,
        epf: -1,
        lossyPalette: false,
        decodingSpeedTier: 0,
        photonNoiseIso: 0,
        lossyModular: false,
    };

    var jxlEncoderMeta = /*#__PURE__*/Object.freeze({
        __proto__: null,
        label: label$4,
        mimeType: mimeType$4,
        extension: extension$4,
        defaultOptions: defaultOptions$4
    });

    const label$5 = 'MozJPEG';
    const mimeType$5 = 'image/jpeg';
    const extension$5 = 'jpg';
    const defaultOptions$5 = {
        quality: 75,
        baseline: false,
        arithmetic: false,
        progressive: true,
        optimize_coding: true,
        smoothing: 0,
        color_space: 3 /* YCbCr */,
        quant_table: 3,
        trellis_multipass: false,
        trellis_opt_zero: false,
        trellis_opt_table: false,
        trellis_loops: 1,
        auto_subsample: true,
        chroma_subsample: 2,
        separate_chroma_quality: false,
        chroma_quality: 75,
    };

    var mozJPEGEncoderMeta = /*#__PURE__*/Object.freeze({
        __proto__: null,
        label: label$5,
        mimeType: mimeType$5,
        extension: extension$5,
        defaultOptions: defaultOptions$5
    });

    const label$6 = 'OxiPNG';
    const mimeType$6 = 'image/png';
    const extension$6 = 'png';
    const defaultOptions$6 = {
        level: 2,
        interlace: false,
    };

    var oxiPNGEncoderMeta = /*#__PURE__*/Object.freeze({
        __proto__: null,
        label: label$6,
        mimeType: mimeType$6,
        extension: extension$6,
        defaultOptions: defaultOptions$6
    });

    const label$7 = 'QOI';
    const mimeType$7 = 'image/qoi';
    const extension$7 = 'qoi';
    const defaultOptions$7 = {};

    var qoiEncoderMeta = /*#__PURE__*/Object.freeze({
        __proto__: null,
        label: label$7,
        mimeType: mimeType$7,
        extension: extension$7,
        defaultOptions: defaultOptions$7
    });

    const label$8 = 'WebP';
    const mimeType$8 = 'image/webp';
    const extension$8 = 'webp';
    // These come from struct WebPConfig in encode.h.
    const defaultOptions$8 = {
        quality: 75,
        target_size: 0,
        target_PSNR: 0,
        method: 4,
        sns_strength: 50,
        filter_strength: 60,
        filter_sharpness: 0,
        filter_type: 1,
        partitions: 0,
        segments: 4,
        pass: 1,
        show_compressed: 0,
        preprocessing: 0,
        autofilter: 0,
        partition_limit: 0,
        alpha_compression: 1,
        alpha_filtering: 1,
        alpha_quality: 100,
        lossless: 0,
        exact: 0,
        image_hint: 0,
        emulate_jpeg_size: 0,
        thread_level: 0,
        low_memory: 0,
        near_lossless: 100,
        use_delta_palette: 0,
        use_sharp_yuv: 0,
    };

    var webPEncoderMeta = /*#__PURE__*/Object.freeze({
        __proto__: null,
        label: label$8,
        mimeType: mimeType$8,
        extension: extension$8,
        defaultOptions: defaultOptions$8
    });

    const label$9 = 'WebP v2 (unstable)';
    const mimeType$9 = 'image/webp2';
    const extension$9 = 'wp2';
    const defaultOptions$9 = {
        quality: 75,
        alpha_quality: 75,
        effort: 5,
        pass: 1,
        sns: 50,
        uv_mode: 3 /* UVModeAuto */,
        csp_type: 0 /* kYCoCg */,
        error_diffusion: 0,
        use_random_matrix: false,
    };

    var wp2EncoderMeta = /*#__PURE__*/Object.freeze({
        __proto__: null,
        label: label$9,
        mimeType: mimeType$9,
        extension: extension$9,
        defaultOptions: defaultOptions$9
    });

    const optionsSection = "_options-section_1rb78_34";
    const optionTextFirst = "_option-text-first_1rb78_43";
    const optionToggle = "_option-toggle_1rb78_55";
    const optionReveal = "_option-reveal_1rb78_73 _option-toggle_1rb78_55";
    const optionOneCell = "_option-one-cell_1rb78_83";
    const textField = "_text-field_1rb78_100";

    const checkbox = "_checkbox_1fzkh_1";
    const realCheckbox = "_real-checkbox_1fzkh_10";
    const icon = "_icon_1fzkh_18";
    const checked = "_checked_1fzkh_26";
    const disabled = "_disabled_1fzkh_31";

    const Icon = (props) => (
    // @ts-ignore - TS bug https://github.com/microsoft/TypeScript/issues/16019
    index.h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", ...props }));
    const ToggleAliasingIcon = (props) => (index.h(Icon, { ...props },
        index.h("circle", { cx: "12", cy: "12", r: "8", fill: "none", stroke: "currentColor", "stroke-width": "2" })));
    const ToggleAliasingActiveIcon = (props) => (index.h(Icon, { ...props },
        index.h("path", { d: "M12 3h5v2h2v2h2v5h-2V9h-2V7h-2V5h-3V3M21 12v5h-2v2h-2v2h-5v-2h3v-2h2v-2h2v-3h2M12 21H7v-2H5v-2H3v-5h2v3h2v2h2v2h3v2M3 12V7h2V5h2V3h5v2H9v2H7v2H5v3H3" })));
    const ToggleBackgroundIcon = (props) => (index.h(Icon, { ...props },
        index.h("path", { d: "M3 13h2v-2H3v2zm0 4h2v-2H3v2zm2 4v-2H3c0 1.1.9 2 2 2zM3 9h2V7H3v2zm12 12h2v-2h-2v2zm4-18H9a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 12H9V5h10v10zm-8 6h2v-2h-2v2zm-4 0h2v-2H7v2z" })));
    const ToggleBackgroundActiveIcon = (props) => (index.h(Icon, { ...props },
        index.h("path", { d: "M9 7H7v2h2V7zm0 4H7v2h2v-2zm0-8a2 2 0 0 0-2 2h2V3zm4 12h-2v2h2v-2zm6-12v2h2a2 2 0 0 0-2-2zm-6 0h-2v2h2V3zM9 17v-2H7c0 1.1.9 2 2 2zm10-4h2v-2h-2v2zm0-4h2V7h-2v2zm0 8a2 2 0 0 0 2-2h-2v2zM5 7H3v12c0 1.1.9 2 2 2h12v-2H5V7zm10-2h2V3h-2v2zm0 12h2v-2h-2v2z" })));
    const RotateIcon = (props) => (index.h(Icon, { ...props },
        index.h("path", { d: "M15.6 5.5L11 1v3a8 8 0 0 0 0 16v-2a6 6 0 0 1 0-12v4l4.5-4.5zm4.3 5.5a8 8 0 0 0-1.6-3.9L17 8.5c.5.8.9 1.6 1 2.5h2zM13 17.9v2a8 8 0 0 0 3.9-1.6L15.5 17c-.8.5-1.6.9-2.5 1zm3.9-2.4l1.4 1.4A8 8 0 0 0 20 13h-2c-.1.9-.5 1.7-1 2.5z" })));
    const AddIcon = (props) => (index.h(Icon, { ...props },
        index.h("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" })));
    const RemoveIcon = (props) => (index.h(Icon, { ...props },
        index.h("path", { d: "M19 13H5v-2h14v2z" })));
    const UncheckedIcon = (props) => (index.h(Icon, { ...props },
        index.h("path", { d: "M21.3 2.7v18.6H2.7V2.7h18.6m0-2.7H2.7A2.7 2.7 0 0 0 0 2.7v18.6A2.7 2.7 0 0 0 2.7 24h18.6a2.7 2.7 0 0 0 2.7-2.7V2.7A2.7 2.7 0 0 0 21.3 0z" })));
    const CheckedIcon = (props) => (index.h(Icon, { ...props },
        index.h("path", { d: "M21.3 0H2.7A2.7 2.7 0 0 0 0 2.7v18.6A2.7 2.7 0 0 0 2.7 24h18.6a2.7 2.7 0 0 0 2.7-2.7V2.7A2.7 2.7 0 0 0 21.3 0zm-12 18.7L2.7 12l1.8-1.9L9.3 15 19.5 4.8l1.8 1.9z" })));
    const Arrow = () => (index.h("svg", { viewBox: "0 -1.95 9.8 9.8" },
        index.h("path", { d: "M8.2.2a1 1 0 011.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4A1 1 0 011.6.2l3.3 3.3L8.2.2z" })));
    const SplitOrientationIcon = () => (index.h("svg", { viewBox: "0 0 24 24" },
        index.h("path", { d: "M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm8 0H5v14h6V5zm2 0v14h6V5h-6z" })));
    const SplitOrientationVerticalIcon = () => (index.h("svg", { viewBox: "0 0 24 24" },
        index.h("path", { d: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm0 8V5H5v6h14zm0 2H5v6h14v-6z" })));
    const ResetZoomIcon = () => (index.h("svg", { viewBox: "0 0 24 24" },
        index.h("path", { d: "M12 4V1L8 5l4 4V6a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8zm-1 7h2v5h-2v-5zm0-3h2v2h-2V8z" })));
    const InfoIcon = () => (index.h("svg", { viewBox: "0 0 24 24" },
        index.h("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" })));

    class Checkbox extends index.d {
        render(props) {
            return (index.h("div", { class: checkbox },
                props.checked ? (props.disabled ? (index.h(CheckedIcon, { class: `${icon} ${disabled}` })) : (index.h(CheckedIcon, { class: `${icon} ${checked}` }))) : (index.h(UncheckedIcon, { class: icon })),
                index.h("input", { class: realCheckbox, type: "checkbox", ...props })));
        }
    }

    const childrenExiting = "_children-exiting_nmxuz_1";

    var css$3 = "._children-exiting_nmxuz_1>*{pointer-events:none}";

    index.appendCss(css$3);

    class Expander extends index.d {
        static getDerivedStateFromProps(props, state) {
            if (!props.children && state.children) {
                return { children: props.children, outgoingChildren: state.children };
            }
            if (props.children !== state.children) {
                return { children: props.children, outgoingChildren: undefined };
            }
            return null;
        }
        async componentDidUpdate(_, previousState) {
            let heightFrom;
            let heightTo;
            if (previousState.children && !this.state.children) {
                heightFrom = this.base.getBoundingClientRect().height;
                heightTo = 0;
            }
            else if (!previousState.children && this.state.children) {
                heightFrom = 0;
                heightTo = this.base.getBoundingClientRect().height;
            }
            else {
                return;
            }
            this.base.style.overflow = 'hidden';
            await transitionHeight(this.base, {
                duration: 300,
                from: heightFrom,
                to: heightTo,
            });
            // Unset the height & overflow, so element changes do the right thing.
            this.base.style.height = '';
            this.base.style.overflow = '';
            this.setState({ outgoingChildren: undefined });
        }
        render({}, { children, outgoingChildren }) {
            return (index.h("div", { class: outgoingChildren ? childrenExiting : '' }, outgoingChildren || children));
        }
    }

    const select = "_select_oa9oz_1";
    const builtinSelect = "_builtin-select_oa9oz_6";
    const arrow = "_arrow_oa9oz_30";
    const large = "_large_oa9oz_40";

    class Select extends index.d {
        render(props) {
            const { large: large$1, ...otherProps } = props;
            return (index.h("div", { class: select },
                index.h("select", { class: `${builtinSelect} ${large$1 ? large : ''}`, ...otherProps }),
                index.h("div", { class: arrow },
                    index.h(Arrow, null))));
        }
    }

    const range = "_range_ozfiq_1";
    const labelText = "_label-text_ozfiq_15";
    const rangeWcContainer = "_range-wc-container_ozfiq_23";
    const rangeWc = "_range-wc_ozfiq_23";
    const textInput = "_text-input_ozfiq_45";

    const input = "_input_r0fjl_59";
    const thumb = "_thumb_r0fjl_75";
    const thumbWrapper = "_thumb-wrapper_r0fjl_107";
    const valueDisplay = "_value-display_r0fjl_127";
    const touchActive = "_touch-active_r0fjl_203";

    var css$4 = "range-input{position:relative;display:flex;height:18px;width:130px;margin:2px;font:inherit;line-height:16px;overflow:visible}range-input[disabled]{filter:grayscale(1)}range-input:before{content:\"\";display:block;position:absolute;top:8px;left:0;width:100%;height:2px;border-radius:1px;background:linear-gradient(var(--main-theme-color),var(--main-theme-color)) 0/var(--value-percent,0) 100% no-repeat var(--medium-light-gray)}._input_r0fjl_59{position:relative;width:100%;padding:0;margin:0;opacity:0}._thumb_r0fjl_75{pointer-events:none;position:absolute;bottom:3px;left:0;margin-left:-6px;background:var(--main-theme-color);border-radius:50%;width:12px;height:12px}range-input:focus-within ._thumb_r0fjl_75{outline:2px solid #fff}._thumb-wrapper_r0fjl_107{position:absolute;left:6px;right:6px;bottom:0;height:0;overflow:visible;transform:translate(var(--value-percent,0))}._value-display_r0fjl_127{position:absolute;box-sizing:border-box;left:0;bottom:3px;width:32px;height:62px;text-align:center;padding:8px 3px 0;margin:0 0 0 -16px;transform-origin:50% 90%;opacity:.0001;transform:scale(.2);color:#fff;font:inherit;font-size:calc(100% - var(--value-width, 3)/5*0.2em);text-overflow:clip;text-shadow:0 -.5px 0 rgba(0,0,0,.4);transition:all .2s ease;transition-property:opacity,transform;will-change:transform;pointer-events:none;overflow:hidden}._value-display_r0fjl_127>svg{position:absolute;top:0;left:0;width:100%;height:100%;fill:var(--main-theme-color)}._value-display_r0fjl_127>span{position:relative}._touch-active_r0fjl_203+._thumb-wrapper_r0fjl_107 ._value-display_r0fjl_127{opacity:1;transform:scale(1)}._touch-active_r0fjl_203+._thumb-wrapper_r0fjl_107 ._thumb_r0fjl_75{box-shadow:0 1px 3px rgba(0,0,0,.5)}";

    index.appendCss(css$4);

    const RETARGETED_EVENTS = ['focus', 'blur'];
    const UPDATE_EVENTS = ['input', 'change'];
    const REFLECTED_PROPERTIES = [
        'name',
        'min',
        'max',
        'step',
        'value',
        'disabled',
    ];
    const REFLECTED_ATTRIBUTES = [
        'name',
        'min',
        'max',
        'step',
        'value',
        'disabled',
    ];
    function getPrecision(value) {
        const afterDecimal = value.split('.')[1];
        return afterDecimal ? afterDecimal.length : 0;
    }
    class RangeInputElement extends HTMLElement {
        constructor() {
            super();
            this._ignoreChange = false;
            this._retargetEvent = (event) => {
                event.stopImmediatePropagation();
                const retargetted = new Event(event.type, event);
                this.dispatchEvent(retargetted);
            };
            this._update = () => {
                // Not connected?
                if (!this._valueDisplay)
                    return;
                const value = Number(this.value) || 0;
                const min = Number(this.min) || 0;
                const max = Number(this.max) || 100;
                const percent = (100 * (value - min)) / (max - min);
                const displayValue = this._getDisplayValue(value);
                this._valueDisplay.textContent = displayValue;
                this.style.setProperty('--value-percent', percent + '%');
                this.style.setProperty('--value-width', '' + displayValue.length);
            };
            this._input = document.createElement('input');
            this._input.type = 'range';
            this._input.className = input;
            let activePointer;
            // Not using pointer-tracker here due to https://bugs.webkit.org/show_bug.cgi?id=219636.
            this.addEventListener('pointerdown', (event) => {
                if (activePointer)
                    return;
                activePointer = event.pointerId;
                this._input.classList.add(touchActive);
                const pointerUp = (event) => {
                    if (event.pointerId !== activePointer)
                        return;
                    activePointer = undefined;
                    this._input.classList.remove(touchActive);
                    window.removeEventListener('pointerup', pointerUp);
                    window.removeEventListener('pointercancel', pointerUp);
                };
                window.addEventListener('pointerup', pointerUp);
                window.addEventListener('pointercancel', pointerUp);
            });
            for (const event of RETARGETED_EVENTS) {
                this._input.addEventListener(event, this._retargetEvent, true);
            }
            for (const event of UPDATE_EVENTS) {
                this._input.addEventListener(event, this._update, true);
            }
        }
        static get observedAttributes() {
            return REFLECTED_ATTRIBUTES;
        }
        connectedCallback() {
            if (this.contains(this._input))
                return;
            this.innerHTML =
                `<div class="${thumbWrapper}">` +
                    `<div class="${thumb}"></div>` +
                    `<div class="${valueDisplay}"><svg width="32" height="62"><path d="M27.3 27.3C25 29.6 17 35.8 17 43v3c0 3 2.5 5 3.2 5.8a6 6 0 1 1-8.5 0C12.6 51 15 49 15 46v-3c0-7.2-8-13.4-10.3-15.7A16 16 0 0 1 16 0a16 16 0 0 1 11.3 27.3z"/></svg><span></span></div>` +
                    '</div>';
            this.insertBefore(this._input, this.firstChild);
            this._valueDisplay = this.querySelector('.' + valueDisplay + ' > span');
            // Set inline styles (this is useful when used with frameworks which might clear inline styles)
            this._update();
        }
        get labelPrecision() {
            return this.getAttribute('label-precision') || '';
        }
        set labelPrecision(precision) {
            this.setAttribute('label-precision', precision);
        }
        attributeChangedCallback(name, oldValue, newValue) {
            if (this._ignoreChange)
                return;
            if (newValue === null) {
                this._input.removeAttribute(name);
            }
            else {
                this._input.setAttribute(name, newValue);
            }
            this._reflectAttributes();
            this._update();
        }
        _getDisplayValue(value) {
            if (value >= 10000)
                return (value / 1000).toFixed(1) + 'k';
            const labelPrecision = Number(this.labelPrecision) || getPrecision(this.step) || 0;
            return labelPrecision
                ? value.toFixed(labelPrecision)
                : Math.round(value).toString();
        }
        _reflectAttributes() {
            this._ignoreChange = true;
            for (const attributeName of REFLECTED_ATTRIBUTES) {
                if (this._input.hasAttribute(attributeName)) {
                    this.setAttribute(attributeName, this._input.getAttribute(attributeName));
                }
                else {
                    this.removeAttribute(attributeName);
                }
            }
            this._ignoreChange = false;
        }
    }
    for (const prop of REFLECTED_PROPERTIES) {
        Object.defineProperty(RangeInputElement.prototype, prop, {
            get() {
                return this._input[prop];
            },
            set(val) {
                this._input[prop] = val;
                this._reflectAttributes();
                this._update();
            },
        });
    }
    customElements.define('range-input', RangeInputElement);

    class Range extends index.d {
        constructor() {
            super(...arguments);
            this.onTextInput = (event) => {
                const input = event.target;
                const value = input.value.trim();
                if (!value)
                    return;
                this.rangeWc.value = input.value;
                this.rangeWc.dispatchEvent(new InputEvent('input', {
                    bubbles: event.bubbles,
                }));
            };
            this.onTextFocus = () => {
                this.setState({ textFocused: true });
            };
            this.onTextBlur = () => {
                this.setState({ textFocused: false });
            };
        }
        render(props, state) {
            const { children, ...otherProps } = props;
            const { value, min, max, step } = props;
            const textValue = state.textFocused ? this.inputEl.value : value;
            return (index.h("label", { class: range },
                index.h("span", { class: labelText }, children),
                index.h("div", { class: rangeWcContainer },
                    index.h("range-input", { ref: index.linkRef(this, 'rangeWc'), class: rangeWc, ...otherProps })),
                index.h("input", { ref: index.linkRef(this, 'inputEl'), type: "number", class: textInput, value: textValue, min: min, max: max, step: step, onInput: this.onTextInput, onFocus: this.onTextFocus, onBlur: this.onTextBlur })));
        }
    }

    var t,r=(function(t,r){t.exports=function(t,r,e,n,o){for(r=r.split?r.split("."):r,n=0;n<r.length;n++)t=t?t[r[n]]:o;return t===o?e:t};}(t={path:void 0,exports:{},require:function(t,r){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}()}}),t.exports);function linkState(t,e,n){var o=e.split("."),u=t.__lsc||(t.__lsc={});return u[e+n]||(u[e+n]=function(e){for(var u=e&&e.target||this,i={},c=i,s="string"==typeof n?r(e,n):u&&u.nodeName?u.type.match(/^che|rad/)?u.checked:u.value:e,a=0;a<o.length-1;a++)c=c[o[a]]||(c[o[a]]=!a&&t.state[o[a]]||{});c[o[a]]=s,t.setState(i);})}

    const checkbox$1 = "_checkbox_18gq6_1";
    const arrow$1 = "_arrow_18gq6_11";
    const realCheckbox$1 = "_real-checkbox_18gq6_39";

    var css$5 = "._checkbox_18gq6_1{display:inline-block;position:relative}._arrow_18gq6_11{width:10px;height:10px;fill:var(--white);transition:transform .2s ease;transform:rotate(-90deg)}._arrow_18gq6_11 svg{width:100%;height:100%;display:block}._real-checkbox_18gq6_39{top:0;position:absolute;opacity:0;pointer-events:none}._real-checkbox_18gq6_39:checked+._arrow_18gq6_11{transform:none}";

    index.appendCss(css$5);

    class Revealer extends index.d {
        render(props) {
            return (index.h("div", { class: checkbox$1 },
                index.h("input", { class: realCheckbox$1, type: "checkbox", ...props }),
                index.h("div", { class: arrow$1 },
                    index.h(Arrow, null))));
        }
    }

    const encode = (signal, workerBridge, imageData, options) => workerBridge.avifEncode(signal, imageData, options);
    /**
     * AVIF quality ranges from 0 (worst) to 100 (lossless).
     * Since lossless is a separate checkbox, we cap user-inputted quality at 99
     *
     * AVIF speed ranges from 0 (slowest) to 10 (fastest).
     * We display it as 'effort' to the user since it conveys the speed-size tradeoff
     * much better: speed = 10 - effort
     */
    const MAX_QUALITY = 100;
    const MAX_EFFORT = 10;
    class Options extends index.d {
        constructor() {
            super(...arguments);
            // The rest of the defaults are set in getDerivedStateFromProps
            this.state = {
                showAdvanced: false,
            };
            this._inputChangeCallbacks = new Map();
            this._inputChange = (prop, type) => {
                // Cache the callback for performance
                if (!this._inputChangeCallbacks.has(prop)) {
                    this._inputChangeCallbacks.set(prop, (event) => {
                        const formEl = event.target;
                        const newVal = type === 'boolean'
                            ? 'checked' in formEl
                                ? formEl.checked
                                : !!formEl.value
                            : type === 'number'
                                ? Number(formEl.value)
                                : formEl.value;
                        const newState = {
                            [prop]: newVal,
                        };
                        const optionState = {
                            ...this.state,
                            ...newState,
                        };
                        const newOptions = {
                            quality: optionState.lossless ? MAX_QUALITY : optionState.quality,
                            qualityAlpha: optionState.lossless || !optionState.separateAlpha
                                ? -1 // Set qualityAlpha to quality
                                : optionState.alphaQuality,
                            // Always set to 4:4:4 if lossless
                            subsample: optionState.lossless ? 3 : optionState.subsample,
                            tileColsLog2: optionState.tileCols,
                            tileRowsLog2: optionState.tileRows,
                            speed: MAX_EFFORT - optionState.effort,
                            chromaDeltaQ: optionState.chromaDeltaQ,
                            sharpness: optionState.sharpness,
                            denoiseLevel: optionState.denoiseLevel,
                            tune: optionState.tune,
                            enableSharpYUV: optionState.enableSharpYUV,
                        };
                        // Updating options, so we don't recalculate in getDerivedStateFromProps.
                        newState.options = newOptions;
                        this.setState(
                        // It isn't clear to me why I have to cast this :)
                        newState);
                        this.props.onChange(newOptions);
                    });
                }
                return this._inputChangeCallbacks.get(prop);
            };
        }
        static getDerivedStateFromProps(props, state) {
            if (state.options && shallowEqual(state.options, props.options)) {
                return null;
            }
            const { options } = props;
            const lossless = options.quality === MAX_QUALITY &&
                (options.qualityAlpha == -1 || options.qualityAlpha == MAX_QUALITY) &&
                options.subsample == 3;
            const separateAlpha = options.qualityAlpha !== -1;
            // Create default form state from options
            return {
                options,
                lossless,
                quality: lossless ? defaultOptions.quality : options.quality,
                separateAlpha,
                alphaQuality: separateAlpha ? options.qualityAlpha : options.quality,
                subsample: options.subsample,
                tileRows: options.tileRowsLog2,
                tileCols: options.tileColsLog2,
                effort: MAX_EFFORT - options.speed,
                chromaDeltaQ: options.chromaDeltaQ,
                sharpness: options.sharpness,
                denoiseLevel: options.denoiseLevel,
                tune: options.tune,
                enableSharpYUV: options.enableSharpYUV,
            };
        }
        render(_, { effort, lossless, alphaQuality, separateAlpha, quality, showAdvanced, subsample, tileCols, tileRows, chromaDeltaQ, sharpness, denoiseLevel, tune, enableSharpYUV, }) {
            return (index.h("form", { class: optionsSection, onSubmit: preventDefault },
                index.h("label", { class: optionToggle },
                    "Lossless",
                    index.h(Checkbox, { checked: lossless, onChange: this._inputChange('lossless', 'boolean') })),
                index.h(Expander, null, !lossless && (index.h("div", { class: optionOneCell },
                    index.h(Range, { min: "0", max: MAX_QUALITY - 1, value: quality, onInput: this._inputChange('quality', 'number') }, "Quality:")))),
                index.h("label", { class: optionReveal },
                    index.h(Revealer, { checked: showAdvanced, onChange: linkState(this, 'showAdvanced') }),
                    "Advanced settings"),
                index.h(Expander, null, showAdvanced && (index.h("div", null,
                    index.h(Expander, null, !lossless && (index.h("div", null,
                        index.h("label", { class: optionTextFirst },
                            "Subsample chroma:",
                            index.h(Select, { value: subsample, onChange: this._inputChange('subsample', 'number') },
                                index.h("option", { value: "0" }, "4:0:0"),
                                index.h("option", { value: "1" }, "4:2:0"),
                                index.h("option", { value: "2" }, "4:2:2"),
                                index.h("option", { value: "3" }, "4:4:4"))),
                        index.h(Expander, null, subsample === 1 && (index.h("label", { class: optionToggle },
                            "Sharp YUV Downsampling",
                            index.h(Checkbox, { checked: enableSharpYUV, onChange: this._inputChange('enableSharpYUV', 'boolean') })))),
                        index.h("label", { class: optionToggle },
                            "Separate alpha quality",
                            index.h(Checkbox, { checked: separateAlpha, onChange: this._inputChange('separateAlpha', 'boolean') })),
                        index.h(Expander, null, separateAlpha && (index.h("div", { class: optionOneCell },
                            index.h(Range, { min: "0", max: MAX_QUALITY - 1, value: alphaQuality, onInput: this._inputChange('alphaQuality', 'number') }, "Alpha quality:")))),
                        index.h("label", { class: optionToggle },
                            "Extra chroma compression",
                            index.h(Checkbox, { checked: chromaDeltaQ, onChange: this._inputChange('chromaDeltaQ', 'boolean') })),
                        index.h("div", { class: optionOneCell },
                            index.h(Range, { min: "0", max: "7", value: sharpness, onInput: this._inputChange('sharpness', 'number') }, "Sharpness:")),
                        index.h("div", { class: optionOneCell },
                            index.h(Range, { min: "0", max: "50", value: denoiseLevel, onInput: this._inputChange('denoiseLevel', 'number') }, "Noise synthesis:")),
                        index.h("label", { class: optionTextFirst },
                            "Tuning:",
                            index.h(Select, { value: tune, onChange: this._inputChange('tune', 'number') },
                                index.h("option", { value: 0 /* auto */ }, "Auto"),
                                index.h("option", { value: 1 /* psnr */ }, "PSNR"),
                                index.h("option", { value: 2 /* ssim */ }, "SSIM")))))),
                    index.h("div", { class: optionOneCell },
                        index.h(Range, { min: "0", max: "6", value: tileRows, onInput: this._inputChange('tileRows', 'number') }, "Log2 of tile rows:")),
                    index.h("div", { class: optionOneCell },
                        index.h(Range, { min: "0", max: "6", value: tileCols, onInput: this._inputChange('tileCols', 'number') }, "Log2 of tile cols:"))))),
                index.h("div", { class: optionOneCell },
                    index.h(Range, { min: "0", max: MAX_EFFORT, value: effort, onInput: this._inputChange('effort', 'number') }, "Effort:"))));
        }
    }

    var avifEncoderEntry = /*#__PURE__*/Object.freeze({
        __proto__: null,
        encode: encode,
        Options: Options
    });

    const featureTest = () => canvasEncodeTest(mimeType$1);
    const encode$1 = (signal, workerBridge, imageData, options) => canvasEncode(imageData, mimeType$1);

    var browserGIFEncoderEntry = /*#__PURE__*/Object.freeze({
        __proto__: null,
        featureTest: featureTest,
        encode: encode$1
    });

    function qualityOption(opts = {}) {
        const { min = 0, max = 100, step = 1 } = opts;
        class QualityOptions extends index.d {
            constructor() {
                super(...arguments);
                this.onChange = (event) => {
                    const el = event.currentTarget;
                    this.props.onChange({ quality: Number(el.value) });
                };
            }
            render({ options }) {
                return (index.h("div", { class: optionsSection },
                    index.h("div", { class: optionOneCell },
                        index.h(Range, { name: "quality", min: min, max: max, step: step || 'any', value: options.quality, onInput: this.onChange }, "Quality:"))));
            }
        }
        return QualityOptions;
    }

    const encode$2 = (signal, workerBridge, imageData, options) => canvasEncode(imageData, mimeType$2, options.quality);
    const Options$1 = qualityOption({ min: 0, max: 1, step: 0.01 });

    var browserJPEGEncoderEntry = /*#__PURE__*/Object.freeze({
        __proto__: null,
        encode: encode$2,
        Options: Options$1
    });

    const encode$3 = (signal, workerBridge, imageData, options) => canvasEncode(imageData, mimeType$3);

    var browserPNGEncoderEntry = /*#__PURE__*/Object.freeze({
        __proto__: null,
        encode: encode$3
    });

    const encode$4 = (signal, workerBridge, imageData, options) => workerBridge.jxlEncode(signal, imageData, options);
    class Options$2 extends index.d {
        constructor() {
            super(...arguments);
            // The rest of the defaults are set in getDerivedStateFromProps
            this.state = {
                lossless: false,
            };
            this._inputChangeCallbacks = new Map();
            this._inputChange = (prop, type) => {
                // Cache the callback for performance
                if (!this._inputChangeCallbacks.has(prop)) {
                    this._inputChangeCallbacks.set(prop, (event) => {
                        const formEl = event.target;
                        const newVal = type === 'boolean'
                            ? 'checked' in formEl
                                ? formEl.checked
                                : !!formEl.value
                            : Number(formEl.value);
                        const newState = {
                            [prop]: newVal,
                        };
                        const optionState = {
                            ...this.state,
                            ...newState,
                        };
                        const newOptions = {
                            effort: optionState.effort,
                            quality: optionState.lossless ? 100 : optionState.quality,
                            progressive: optionState.progressive,
                            epf: optionState.autoEdgePreservingFilter
                                ? -1
                                : optionState.edgePreservingFilter,
                            lossyPalette: optionState.lossless ? optionState.slightLoss : false,
                            decodingSpeedTier: optionState.decodingSpeedTier,
                            photonNoiseIso: optionState.photonNoiseIso,
                            lossyModular: optionState.quality < 7 ? true : optionState.alternativeLossy,
                        };
                        // Updating options, so we don't recalculate in getDerivedStateFromProps.
                        newState.options = newOptions;
                        this.setState(newState);
                        this.props.onChange(newOptions);
                    });
                }
                return this._inputChangeCallbacks.get(prop);
            };
        }
        static getDerivedStateFromProps(props, state) {
            if (state.options && shallowEqual(state.options, props.options)) {
                return null;
            }
            const { options } = props;
            // Create default form state from options
            return {
                options,
                effort: options.effort,
                quality: options.quality,
                progressive: options.progressive,
                edgePreservingFilter: options.epf === -1 ? 2 : options.epf,
                lossless: options.quality === 100,
                slightLoss: options.lossyPalette,
                autoEdgePreservingFilter: options.epf === -1,
                decodingSpeedTier: options.decodingSpeedTier,
                photonNoiseIso: options.photonNoiseIso,
                alternativeLossy: options.lossyModular,
            };
        }
        render({}, { effort, quality, progressive, edgePreservingFilter, lossless, slightLoss, autoEdgePreservingFilter, decodingSpeedTier, photonNoiseIso, alternativeLossy, }) {
            // I'm rendering both lossy and lossless forms, as it becomes much easier when
            // gathering the data.
            return (index.h("form", { class: optionsSection, onSubmit: preventDefault },
                index.h("label", { class: optionToggle },
                    "Lossless",
                    index.h(Checkbox, { name: "lossless", checked: lossless, onChange: this._inputChange('lossless', 'boolean') })),
                index.h(Expander, null, lossless && (index.h("label", { class: optionToggle },
                    "Slight loss",
                    index.h(Checkbox, { name: "slightLoss", checked: slightLoss, onChange: this._inputChange('slightLoss', 'boolean') })))),
                index.h(Expander, null, !lossless && (index.h("div", null,
                    index.h("div", { class: optionOneCell },
                        index.h(Range, { min: "0", max: "99.9", step: "0.1", value: quality, onInput: this._inputChange('quality', 'number') }, "Quality:")),
                    index.h("label", { class: optionToggle },
                        "Alternative lossy mode",
                        index.h(Checkbox, { checked: quality < 7 ? true : alternativeLossy, disabled: quality < 7, onChange: this._inputChange('alternativeLossy', 'boolean') })),
                    index.h("label", { class: optionToggle },
                        "Auto edge filter",
                        index.h(Checkbox, { checked: autoEdgePreservingFilter, onChange: this._inputChange('autoEdgePreservingFilter', 'boolean') })),
                    index.h(Expander, null, !autoEdgePreservingFilter && (index.h("div", { class: optionOneCell },
                        index.h(Range, { min: "0", max: "3", value: edgePreservingFilter, onInput: this._inputChange('edgePreservingFilter', 'number') }, "Edge preserving filter:")))),
                    index.h("div", { class: optionOneCell },
                        index.h(Range, { min: "0", max: "4", value: decodingSpeedTier, onInput: this._inputChange('decodingSpeedTier', 'number') }, "Optimise for decoding speed (worse compression):")),
                    index.h("div", { class: optionOneCell },
                        index.h(Range, { min: "0", max: "50000", step: "100", value: photonNoiseIso, onInput: this._inputChange('photonNoiseIso', 'number') }, "Noise equivalent to ISO:"))))),
                index.h("label", { class: optionToggle },
                    "Progressive rendering",
                    index.h(Checkbox, { name: "progressive", checked: progressive, onChange: this._inputChange('progressive', 'boolean') })),
                index.h("div", { class: optionOneCell },
                    index.h(Range, { min: "1", max: "9", value: effort, onInput: this._inputChange('effort', 'number') }, "Effort:"))));
        }
    }

    var jxlEncoderEntry = /*#__PURE__*/Object.freeze({
        __proto__: null,
        encode: encode$4,
        Options: Options$2
    });

    function encode$5(signal, workerBridge, imageData, options) {
        return workerBridge.mozjpegEncode(signal, imageData, options);
    }
    class Options$3 extends index.d {
        constructor() {
            super(...arguments);
            this.state = {
                showAdvanced: false,
            };
            this.onChange = (event) => {
                const form = event.currentTarget.closest('form');
                const { options } = this.props;
                const newOptions = {
                    // Copy over options the form doesn't currently care about, eg arithmetic
                    ...this.props.options,
                    // And now stuff from the form:
                    // .checked
                    baseline: inputFieldChecked(form.baseline, options.baseline),
                    progressive: inputFieldChecked(form.progressive, options.progressive),
                    optimize_coding: inputFieldChecked(form.optimize_coding, options.optimize_coding),
                    trellis_multipass: inputFieldChecked(form.trellis_multipass, options.trellis_multipass),
                    trellis_opt_zero: inputFieldChecked(form.trellis_opt_zero, options.trellis_opt_zero),
                    trellis_opt_table: inputFieldChecked(form.trellis_opt_table, options.trellis_opt_table),
                    auto_subsample: inputFieldChecked(form.auto_subsample, options.auto_subsample),
                    separate_chroma_quality: inputFieldChecked(form.separate_chroma_quality, options.separate_chroma_quality),
                    // .value
                    quality: inputFieldValueAsNumber(form.quality, options.quality),
                    chroma_quality: inputFieldValueAsNumber(form.chroma_quality, options.chroma_quality),
                    chroma_subsample: inputFieldValueAsNumber(form.chroma_subsample, options.chroma_subsample),
                    smoothing: inputFieldValueAsNumber(form.smoothing, options.smoothing),
                    color_space: inputFieldValueAsNumber(form.color_space, options.color_space),
                    quant_table: inputFieldValueAsNumber(form.quant_table, options.quant_table),
                    trellis_loops: inputFieldValueAsNumber(form.trellis_loops, options.trellis_loops),
                };
                this.props.onChange(newOptions);
            };
        }
        render({ options }, { showAdvanced }) {
            // I'm rendering both lossy and lossless forms, as it becomes much easier when
            // gathering the data.
            return (index.h("form", { class: optionsSection, onSubmit: preventDefault },
                index.h("div", { class: optionOneCell },
                    index.h(Range, { name: "quality", min: "0", max: "100", value: options.quality, onInput: this.onChange }, "Quality:")),
                index.h("label", { class: optionReveal },
                    index.h(Revealer, { checked: showAdvanced, onChange: linkState(this, 'showAdvanced') }),
                    "Advanced settings"),
                index.h(Expander, null, showAdvanced ? (index.h("div", null,
                    index.h("label", { class: optionTextFirst },
                        "Channels:",
                        index.h(Select, { name: "color_space", value: options.color_space, onChange: this.onChange },
                            index.h("option", { value: 1 /* GRAYSCALE */ }, "Grayscale"),
                            index.h("option", { value: 2 /* RGB */ }, "RGB"),
                            index.h("option", { value: 3 /* YCbCr */ }, "YCbCr"))),
                    index.h(Expander, null, options.color_space === 3 /* YCbCr */ ? (index.h("div", null,
                        index.h("label", { class: optionToggle },
                            "Auto subsample chroma",
                            index.h(Checkbox, { name: "auto_subsample", checked: options.auto_subsample, onChange: this.onChange })),
                        index.h(Expander, null, options.auto_subsample ? null : (index.h("div", { class: optionOneCell },
                            index.h(Range, { name: "chroma_subsample", min: "1", max: "4", value: options.chroma_subsample, onInput: this.onChange }, "Subsample chroma by:")))),
                        index.h("label", { class: optionToggle },
                            "Separate chroma quality",
                            index.h(Checkbox, { name: "separate_chroma_quality", checked: options.separate_chroma_quality, onChange: this.onChange })),
                        index.h(Expander, null, options.separate_chroma_quality ? (index.h("div", { class: optionOneCell },
                            index.h(Range, { name: "chroma_quality", min: "0", max: "100", value: options.chroma_quality, onInput: this.onChange }, "Chroma quality:"))) : null))) : null),
                    index.h("label", { class: optionToggle },
                        "Pointless spec compliance",
                        index.h(Checkbox, { name: "baseline", checked: options.baseline, onChange: this.onChange })),
                    index.h(Expander, null, options.baseline ? null : (index.h("label", { class: optionToggle },
                        "Progressive rendering",
                        index.h(Checkbox, { name: "progressive", checked: options.progressive, onChange: this.onChange })))),
                    index.h(Expander, null, options.baseline ? (index.h("label", { class: optionToggle },
                        "Optimize Huffman table",
                        index.h(Checkbox, { name: "optimize_coding", checked: options.optimize_coding, onChange: this.onChange }))) : null),
                    index.h("div", { class: optionOneCell },
                        index.h(Range, { name: "smoothing", min: "0", max: "100", value: options.smoothing, onInput: this.onChange }, "Smoothing:")),
                    index.h("label", { class: optionTextFirst },
                        "Quantization:",
                        index.h(Select, { name: "quant_table", value: options.quant_table, onChange: this.onChange },
                            index.h("option", { value: "0" }, "JPEG Annex K"),
                            index.h("option", { value: "1" }, "Flat"),
                            index.h("option", { value: "2" }, "MSSIM-tuned Kodak"),
                            index.h("option", { value: "3" }, "ImageMagick"),
                            index.h("option", { value: "4" }, "PSNR-HVS-M-tuned Kodak"),
                            index.h("option", { value: "5" }, "Klein et al"),
                            index.h("option", { value: "6" }, "Watson et al"),
                            index.h("option", { value: "7" }, "Ahumada et al"),
                            index.h("option", { value: "8" }, "Peterson et al"))),
                    index.h("label", { class: optionToggle },
                        "Trellis multipass",
                        index.h(Checkbox, { name: "trellis_multipass", checked: options.trellis_multipass, onChange: this.onChange })),
                    index.h(Expander, null, options.trellis_multipass ? (index.h("label", { class: optionToggle },
                        "Optimize zero block runs",
                        index.h(Checkbox, { name: "trellis_opt_zero", checked: options.trellis_opt_zero, onChange: this.onChange }))) : null),
                    index.h("label", { class: optionToggle },
                        "Optimize after trellis quantization",
                        index.h(Checkbox, { name: "trellis_opt_table", checked: options.trellis_opt_table, onChange: this.onChange })),
                    index.h("div", { class: optionOneCell },
                        index.h(Range, { name: "trellis_loops", min: "1", max: "50", value: options.trellis_loops, onInput: this.onChange }, "Trellis quantization passes:")))) : null)));
        }
    }

    var mozJPEGEncoderEntry = /*#__PURE__*/Object.freeze({
        __proto__: null,
        encode: encode$5,
        Options: Options$3
    });

    async function encode$6(signal, workerBridge, imageData, options) {
        return workerBridge.oxipngEncode(signal, imageData, options);
    }
    class Options$4 extends index.d {
        constructor() {
            super(...arguments);
            this.onChange = (event) => {
                const form = event.currentTarget.closest('form');
                const options = {
                    level: inputFieldValueAsNumber(form.level),
                    interlace: inputFieldChecked(form.interlace),
                };
                this.props.onChange(options);
            };
        }
        render({ options }) {
            return (index.h("form", { class: optionsSection, onSubmit: preventDefault },
                index.h("label", { class: optionToggle },
                    "Interlace",
                    index.h(Checkbox, { name: "interlace", checked: options.interlace, onChange: this.onChange })),
                index.h("div", { class: optionOneCell },
                    index.h(Range, { name: "level", min: "0", max: "6", step: "1", value: options.level, onInput: this.onChange }, "Effort:"))));
        }
    }

    var oxiPNGEncoderEntry = /*#__PURE__*/Object.freeze({
        __proto__: null,
        encode: encode$6,
        Options: Options$4
    });

    function encode$7(signal, workerBridge, imageData, options) {
        return workerBridge.qoiEncode(signal, imageData, options);
    }

    var qoiEncoderEntry = /*#__PURE__*/Object.freeze({
        __proto__: null,
        encode: encode$7
    });

    const encode$8 = (signal, workerBridge, imageData, options) => workerBridge.webpEncode(signal, imageData, options);
    // From kLosslessPresets in config_enc.c
    // The format is [method, quality].
    const losslessPresets = [
        [0, 0],
        [1, 20],
        [2, 25],
        [3, 30],
        [3, 50],
        [4, 50],
        [4, 75],
        [4, 90],
        [5, 90],
        [6, 100],
    ];
    const losslessPresetDefault = 6;
    function determineLosslessQuality(quality, method) {
        const index = losslessPresets.findIndex(([presetMethod, presetQuality]) => presetMethod === method && presetQuality === quality);
        if (index !== -1)
            return index;
        // Quality doesn't match one of the presets.
        // This can happen when toggling 'lossless'.
        return losslessPresetDefault;
    }
    class Options$5 extends index.d {
        constructor() {
            super(...arguments);
            this.state = {
                showAdvanced: false,
            };
            this.onChange = (event) => {
                const form = event.currentTarget.closest('form');
                const lossless = inputFieldCheckedAsNumber(form.lossless);
                const { options } = this.props;
                const losslessPresetValue = inputFieldValueAsNumber(form.lossless_preset, determineLosslessQuality(options.quality, options.method));
                const newOptions = {
                    // Copy over options the form doesn't care about, eg emulate_jpeg_size
                    ...options,
                    // And now stuff from the form:
                    lossless,
                    // Special-cased inputs:
                    // In lossless mode, the quality is derived from the preset.
                    quality: lossless
                        ? losslessPresets[losslessPresetValue][1]
                        : inputFieldValueAsNumber(form.quality, options.quality),
                    // In lossless mode, the method is derived from the preset.
                    method: lossless
                        ? losslessPresets[losslessPresetValue][0]
                        : inputFieldValueAsNumber(form.method_input, options.method),
                    image_hint: inputFieldCheckedAsNumber(form.image_hint, options.image_hint)
                        ? 3 /* WEBP_HINT_GRAPH */
                        : 0 /* WEBP_HINT_DEFAULT */,
                    // .checked
                    exact: inputFieldCheckedAsNumber(form.exact, options.exact),
                    alpha_compression: inputFieldCheckedAsNumber(form.alpha_compression, options.alpha_compression),
                    autofilter: inputFieldCheckedAsNumber(form.autofilter, options.autofilter),
                    filter_type: inputFieldCheckedAsNumber(form.filter_type, options.filter_type),
                    use_sharp_yuv: inputFieldCheckedAsNumber(form.use_sharp_yuv, options.use_sharp_yuv),
                    // .value
                    near_lossless: 100 -
                        inputFieldValueAsNumber(form.near_lossless, 100 - options.near_lossless),
                    alpha_quality: inputFieldValueAsNumber(form.alpha_quality, options.alpha_quality),
                    alpha_filtering: inputFieldValueAsNumber(form.alpha_filtering, options.alpha_filtering),
                    sns_strength: inputFieldValueAsNumber(form.sns_strength, options.sns_strength),
                    filter_strength: inputFieldValueAsNumber(form.filter_strength, options.filter_strength),
                    filter_sharpness: 7 -
                        inputFieldValueAsNumber(form.filter_sharpness, 7 - options.filter_sharpness),
                    pass: inputFieldValueAsNumber(form.pass, options.pass),
                    preprocessing: inputFieldValueAsNumber(form.preprocessing, options.preprocessing),
                    segments: inputFieldValueAsNumber(form.segments, options.segments),
                    partitions: inputFieldValueAsNumber(form.partitions, options.partitions),
                };
                this.props.onChange(newOptions);
            };
        }
        _losslessSpecificOptions(options) {
            return (index.h("div", { key: "lossless" },
                index.h("div", { class: optionOneCell },
                    index.h(Range, { name: "lossless_preset", min: "0", max: "9", value: determineLosslessQuality(options.quality, options.method), onInput: this.onChange }, "Effort:")),
                index.h("div", { class: optionOneCell },
                    index.h(Range, { name: "near_lossless", min: "0", max: "100", value: '' + (100 - options.near_lossless), onInput: this.onChange }, "Slight loss:")),
                index.h("label", { class: optionToggle },
                    "Discrete tone image",
                    index.h(Checkbox, { name: "image_hint", checked: options.image_hint === 3 /* WEBP_HINT_GRAPH */, onChange: this.onChange }))));
        }
        _lossySpecificOptions(options) {
            const { showAdvanced } = this.state;
            return (index.h("div", { key: "lossy" },
                index.h("div", { class: optionOneCell },
                    index.h(Range, { name: "method_input", min: "0", max: "6", value: options.method, onInput: this.onChange }, "Effort:")),
                index.h("div", { class: optionOneCell },
                    index.h(Range, { name: "quality", min: "0", max: "100", step: "0.1", value: options.quality, onInput: this.onChange }, "Quality:")),
                index.h("label", { class: optionReveal },
                    index.h(Revealer, { checked: showAdvanced, onChange: linkState(this, 'showAdvanced') }),
                    "Advanced settings"),
                index.h(Expander, null, showAdvanced ? (index.h("div", null,
                    index.h("label", { class: optionToggle },
                        "Compress alpha",
                        index.h(Checkbox, { name: "alpha_compression", checked: !!options.alpha_compression, onChange: this.onChange })),
                    index.h("div", { class: optionOneCell },
                        index.h(Range, { name: "alpha_quality", min: "0", max: "100", value: options.alpha_quality, onInput: this.onChange }, "Alpha quality:")),
                    index.h("div", { class: optionOneCell },
                        index.h(Range, { name: "alpha_filtering", min: "0", max: "2", value: options.alpha_filtering, onInput: this.onChange }, "Alpha filter quality:")),
                    index.h("label", { class: optionToggle },
                        "Auto adjust filter strength",
                        index.h(Checkbox, { name: "autofilter", checked: !!options.autofilter, onChange: this.onChange })),
                    index.h(Expander, null, options.autofilter ? null : (index.h("div", { class: optionOneCell },
                        index.h(Range, { name: "filter_strength", min: "0", max: "100", value: options.filter_strength, onInput: this.onChange }, "Filter strength:")))),
                    index.h("label", { class: optionToggle },
                        "Strong filter",
                        index.h(Checkbox, { name: "filter_type", checked: !!options.filter_type, onChange: this.onChange })),
                    index.h("div", { class: optionOneCell },
                        index.h(Range, { name: "filter_sharpness", min: "0", max: "7", value: 7 - options.filter_sharpness, onInput: this.onChange }, "Filter sharpness:")),
                    index.h("label", { class: optionToggle },
                        "Sharp RGB\u2192YUV conversion",
                        index.h(Checkbox, { name: "use_sharp_yuv", checked: !!options.use_sharp_yuv, onChange: this.onChange })),
                    index.h("div", { class: optionOneCell },
                        index.h(Range, { name: "pass", min: "1", max: "10", value: options.pass, onInput: this.onChange }, "Passes:")),
                    index.h("div", { class: optionOneCell },
                        index.h(Range, { name: "sns_strength", min: "0", max: "100", value: options.sns_strength, onInput: this.onChange }, "Spatial noise shaping:")),
                    index.h("label", { class: optionTextFirst },
                        "Preprocess:",
                        index.h(Select, { name: "preprocessing", value: options.preprocessing, onChange: this.onChange },
                            index.h("option", { value: "0" }, "None"),
                            index.h("option", { value: "1" }, "Segment smooth"),
                            index.h("option", { value: "2" }, "Pseudo-random dithering"))),
                    index.h("div", { class: optionOneCell },
                        index.h(Range, { name: "segments", min: "1", max: "4", value: options.segments, onInput: this.onChange }, "Segments:")),
                    index.h("div", { class: optionOneCell },
                        index.h(Range, { name: "partitions", min: "0", max: "3", value: options.partitions, onInput: this.onChange }, "Partitions:")))) : null)));
        }
        render({ options }) {
            // I'm rendering both lossy and lossless forms, as it becomes much easier when
            // gathering the data.
            return (index.h("form", { class: optionsSection, onSubmit: preventDefault },
                index.h("label", { class: optionToggle },
                    "Lossless",
                    index.h(Checkbox, { name: "lossless", checked: !!options.lossless, onChange: this.onChange })),
                options.lossless
                    ? this._losslessSpecificOptions(options)
                    : this._lossySpecificOptions(options),
                index.h("label", { class: optionToggle },
                    "Preserve transparent data",
                    index.h(Checkbox, { name: "exact", checked: !!options.exact, onChange: this.onChange }))));
        }
    }

    var webPEncoderEntry = /*#__PURE__*/Object.freeze({
        __proto__: null,
        encode: encode$8,
        Options: Options$5
    });

    const encode$9 = (signal, workerBridge, imageData, options) => workerBridge.wp2Encode(signal, imageData, options);
    class Options$6 extends index.d {
        constructor() {
            super(...arguments);
            // Other state is set in getDerivedStateFromProps
            this.state = {
                lossless: false,
                slightLoss: 0,
                quality: defaultOptions$9.quality,
                showAdvanced: false,
            };
            this._inputChangeCallbacks = new Map();
            this._inputChange = (prop, type) => {
                // Cache the callback for performance
                if (!this._inputChangeCallbacks.has(prop)) {
                    this._inputChangeCallbacks.set(prop, (event) => {
                        const formEl = event.target;
                        const newVal = type === 'boolean'
                            ? 'checked' in formEl
                                ? formEl.checked
                                : !!formEl.value
                            : Number(formEl.value);
                        const newState = {
                            [prop]: newVal,
                        };
                        const optionState = {
                            ...this.state,
                            ...newState,
                        };
                        const newOptions = {
                            effort: optionState.effort,
                            quality: optionState.lossless
                                ? 100 - optionState.slightLoss
                                : optionState.quality,
                            alpha_quality: optionState.separateAlpha
                                ? optionState.alphaQuality
                                : optionState.quality,
                            pass: optionState.passes,
                            sns: optionState.sns,
                            uv_mode: optionState.uvMode,
                            csp_type: optionState.colorSpace,
                            error_diffusion: optionState.errorDiffusion,
                            use_random_matrix: optionState.useRandomMatrix,
                        };
                        // Updating options, so we don't recalculate in getDerivedStateFromProps.
                        newState.options = newOptions;
                        this.setState(newState);
                        this.props.onChange(newOptions);
                    });
                }
                return this._inputChangeCallbacks.get(prop);
            };
        }
        static getDerivedStateFromProps(props, state) {
            if (state.options && shallowEqual(state.options, props.options)) {
                return null;
            }
            const { options } = props;
            const modifyState = {
                options,
                effort: options.effort,
                alphaQuality: options.alpha_quality,
                passes: options.pass,
                sns: options.sns,
                uvMode: options.uv_mode,
                colorSpace: options.csp_type,
                errorDiffusion: options.error_diffusion,
                useRandomMatrix: options.use_random_matrix,
                separateAlpha: options.quality !== options.alpha_quality,
            };
            // If quality is > 95, it's lossless with slight loss
            if (options.quality > 95) {
                modifyState.lossless = true;
                modifyState.slightLoss = 100 - options.quality;
            }
            else {
                modifyState.quality = options.quality;
                modifyState.lossless = false;
            }
            return modifyState;
        }
        render({}, { effort, alphaQuality, passes, quality, sns, uvMode, lossless, slightLoss, colorSpace, errorDiffusion, useRandomMatrix, separateAlpha, showAdvanced, }) {
            return (index.h("form", { class: optionsSection, onSubmit: preventDefault },
                index.h("label", { class: optionToggle },
                    "Lossless",
                    index.h(Checkbox, { checked: lossless, onChange: this._inputChange('lossless', 'boolean') })),
                index.h(Expander, null, lossless && (index.h("div", { class: optionOneCell },
                    index.h(Range, { min: "0", max: "5", step: "0.1", value: slightLoss, onInput: this._inputChange('slightLoss', 'number') }, "Slight loss:")))),
                index.h(Expander, null, !lossless && (index.h("div", null,
                    index.h("div", { class: optionOneCell },
                        index.h(Range, { min: "0", max: "95", step: "0.1", value: quality, onInput: this._inputChange('quality', 'number') }, "Quality:")),
                    index.h("label", { class: optionToggle },
                        "Separate alpha quality",
                        index.h(Checkbox, { checked: separateAlpha, onChange: this._inputChange('separateAlpha', 'boolean') })),
                    index.h(Expander, null, separateAlpha && (index.h("div", { class: optionOneCell },
                        index.h(Range, { min: "0", max: "100", step: "1", value: alphaQuality, onInput: this._inputChange('alphaQuality', 'number') }, "Alpha Quality:")))),
                    index.h("label", { class: optionReveal },
                        index.h(Revealer, { checked: showAdvanced, onChange: linkState(this, 'showAdvanced') }),
                        "Advanced settings"),
                    index.h(Expander, null, showAdvanced && (index.h("div", null,
                        index.h("div", { class: optionOneCell },
                            index.h(Range, { min: "1", max: "10", step: "1", value: passes, onInput: this._inputChange('passes', 'number') }, "Passes:")),
                        index.h("div", { class: optionOneCell },
                            index.h(Range, { min: "0", max: "100", step: "1", value: sns, onInput: this._inputChange('sns', 'number') }, "Spatial noise shaping:")),
                        index.h("div", { class: optionOneCell },
                            index.h(Range, { min: "0", max: "100", step: "1", value: errorDiffusion, onInput: this._inputChange('errorDiffusion', 'number') }, "Error diffusion:")),
                        index.h("label", { class: optionTextFirst },
                            "Subsample chroma:",
                            index.h(Select, { value: uvMode, onInput: this._inputChange('uvMode', 'number') },
                                index.h("option", { value: 3 /* UVModeAuto */ }, "Auto"),
                                index.h("option", { value: 0 /* UVModeAdapt */ }, "Vary"),
                                index.h("option", { value: 1 /* UVMode420 */ }, "Half"),
                                index.h("option", { value: 2 /* UVMode444 */ }, "Off"))),
                        index.h("label", { class: optionTextFirst },
                            "Color space:",
                            index.h(Select, { value: colorSpace, onInput: this._inputChange('colorSpace', 'number') },
                                index.h("option", { value: 0 /* kYCoCg */ }, "YCoCg"),
                                index.h("option", { value: 1 /* kYCbCr */ }, "YCbCr"),
                                index.h("option", { value: 3 /* kYIQ */ }, "YIQ"))),
                        index.h("label", { class: optionToggle },
                            "Random matrix",
                            index.h(Checkbox, { checked: useRandomMatrix, onChange: this._inputChange('useRandomMatrix', 'boolean') })))))))),
                index.h("div", { class: optionOneCell },
                    index.h(Range, { min: "0", max: "9", step: "1", value: effort, onInput: this._inputChange('effort', 'number') }, "Effort:"))));
        }
    }

    var wp2EncoderEntry = /*#__PURE__*/Object.freeze({
        __proto__: null,
        encode: encode$9,
        Options: Options$6
    });

    const defaultOptions$a = {
        zx: 0,
        maxNumColors: 256,
        dither: 1.0,
    };

    /**
     * Copyright 2020 Google Inc. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *     http://www.apache.org/licenses/LICENSE-2.0
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const workerResizeMethods = [
        'triangle',
        'catrom',
        'mitchell',
        'lanczos3',
        'hqx',
    ];
    const defaultOptions$b = {
        // Width and height will always default to the image size.
        // This is set elsewhere.
        width: 1,
        height: 1,
        // This will be set to 'vector' if the input is SVG.
        method: 'lanczos3',
        fitMethod: 'stretch',
        premultiply: true,
        linearRGB: true,
    };

    const defaultOptions$c = {
        rotate: 0,
    };

    // This file is autogenerated by lib/feature-plugin.js
    const encoderMap = {
        avif: { meta: avifEncoderMeta, ...avifEncoderEntry },
        browserGIF: { meta: browserGIFEncoderMeta, ...browserGIFEncoderEntry },
        browserJPEG: { meta: browserJPEGEncoderMeta, ...browserJPEGEncoderEntry },
        browserPNG: { meta: browserPNGEncoderMeta, ...browserPNGEncoderEntry },
        jxl: { meta: jxlEncoderMeta, ...jxlEncoderEntry },
        mozJPEG: { meta: mozJPEGEncoderMeta, ...mozJPEGEncoderEntry },
        oxiPNG: { meta: oxiPNGEncoderMeta, ...oxiPNGEncoderEntry },
        qoi: { meta: qoiEncoderMeta, ...qoiEncoderEntry },
        webP: { meta: webPEncoderMeta, ...webPEncoderEntry },
        wp2: { meta: wp2EncoderMeta, ...wp2EncoderEntry },
    };
    const defaultProcessorState = {
        quantize: { enabled: false, ...defaultOptions$a },
        resize: { enabled: false, ...defaultOptions$b },
    };
    const defaultPreprocessorState = {
        rotate: defaultOptions$c,
    };

    // Based on https://www.npmjs.com/package/pretty-bytes
    // Modified so the units are returned separately.
    const UNITS = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    function prettyBytes(number) {
        const isNegative = number < 0;
        const prefix = isNegative ? '-' : '';
        if (isNegative)
            number = -number;
        if (number < 1)
            return { value: prefix + number, unit: UNITS[0] };
        const exponent = Math.min(Math.floor(Math.log10(number) / 3), UNITS.length - 1);
        return {
            unit: UNITS[exponent],
            value: prefix + (number / Math.pow(1000, exponent)).toPrecision(3),
        };
    }

    // This file is autogenerated by lib/feature-plugin.js
    const methodNames = [
        "avifDecode",
        "jxlDecode",
        "qoiDecode",
        "webpDecode",
        "wp2Decode",
        "avifEncode",
        "jxlEncode",
        "mozjpegEncode",
        "oxipngEncode",
        "qoiEncode",
        "webpEncode",
        "wp2Encode",
        "rotate",
        "quantize",
        "resize"
    ];

    var workerURL = "/c/features-worker-f83c76ce.js";

    /** How long the worker should be idle before terminating. */
    const workerTimeout = 10000;
    class WorkerBridge {
        constructor() {
            this._queue = Promise.resolve();
        }
        _terminateWorker() {
            if (!this._worker)
                return;
            this._worker.terminate();
            this._worker = undefined;
            this._workerApi = undefined;
        }
        _startWorker() {
            this._worker = new Worker(workerURL);
            this._workerApi = comlink.wrap(this._worker);
        }
    }
    for (const methodName of methodNames) {
        WorkerBridge.prototype[methodName] = function (signal, ...args) {
            this._queue = this._queue
                // Ignore any errors in the queue
                .catch(() => { })
                .then(async () => {
                if (signal.aborted)
                    throw new DOMException('AbortError', 'AbortError');
                clearTimeout(this._workerTimeout);
                if (!this._worker)
                    this._startWorker();
                const onAbort = () => this._terminateWorker();
                signal.addEventListener('abort', onAbort);
                return abortable(signal, 
                // @ts-ignore - TypeScript can't figure this out
                this._workerApi[methodName](...args)).finally(() => {
                    // No longer care about aborting - this task is complete.
                    signal.removeEventListener('abort', onAbort);
                    // Start a timer to clear up the worker.
                    this._workerTimeout = self.setTimeout(() => {
                        this._terminateWorker();
                    }, workerTimeout);
                });
            });
            return this._queue;
        };
    }

    exports.AddIcon = AddIcon;
    exports.Checkbox = Checkbox;
    exports.Expander = Expander;
    exports.InfoIcon = InfoIcon;
    exports.Range = Range;
    exports.RemoveIcon = RemoveIcon;
    exports.ResetZoomIcon = ResetZoomIcon;
    exports.RotateIcon = RotateIcon;
    exports.Select = Select;
    exports.SplitOrientationIcon = SplitOrientationIcon;
    exports.SplitOrientationVerticalIcon = SplitOrientationVerticalIcon;
    exports.ToggleAliasingActiveIcon = ToggleAliasingActiveIcon;
    exports.ToggleAliasingIcon = ToggleAliasingIcon;
    exports.ToggleBackgroundActiveIcon = ToggleBackgroundActiveIcon;
    exports.ToggleBackgroundIcon = ToggleBackgroundIcon;
    exports.WorkerBridge = WorkerBridge;
    exports.abortable = abortable;
    exports.assertSignal = assertSignal;
    exports.blobToImg = blobToImg;
    exports.blobToText = blobToText;
    exports.builtinDecode = builtinDecode;
    exports.builtinResize = builtinResize;
    exports.canDecodeImageType = canDecodeImageType;
    exports.defaultPreprocessorState = defaultPreprocessorState;
    exports.defaultProcessorState = defaultProcessorState;
    exports.drawDataToCanvas = drawDataToCanvas;
    exports.drawableToImageData = drawableToImageData;
    exports.encoderMap = encoderMap;
    exports.inputFieldChecked = inputFieldChecked;
    exports.inputFieldValue = inputFieldValue;
    exports.inputFieldValueAsNumber = inputFieldValueAsNumber;
    exports.isSafari = isSafari;
    exports.konami = konami;
    exports.linkState = linkState;
    exports.optionOneCell = optionOneCell;
    exports.optionTextFirst = optionTextFirst;
    exports.optionToggle = optionToggle;
    exports.optionsSection = optionsSection;
    exports.prettyBytes = prettyBytes;
    exports.preventDefault = preventDefault;
    exports.shallowEqual = shallowEqual;
    exports.sniffMimeType = sniffMimeType;
    exports.textField = textField;
    exports.transitionHeight = transitionHeight;
    exports.workerResizeMethods = workerResizeMethods;

});
