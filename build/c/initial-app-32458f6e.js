/**
 * Copyright 2021 Google Inc. All Rights Reserved.
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

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  const singleRequire = (uri, parentUri) => {
    uri = uri.startsWith(location.origin) ? uri : new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const link = document.createElement("link");
            link.rel = "preload";
            link.as = "script";
            link.href = uri;
            link.onload = () => {
              const script = document.createElement("script");
              script.src = uri;
              script.onload = resolve;
              document.head.appendChild(script);
            };
            document.head.appendChild(link);
          } else {
            self.nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = self.nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    // Note: Promise.resolve() is necessary to delay loading until all the
    // `define`s on the current page had a chance to execute first.
    // This allows to inline some deps on the main page.
    registry[uri] = Promise.resolve().then(() => Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    ))).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['require', 'exports'], function (require, exports) { 'use strict';

    var n,u,i,t,o,f={},e=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function s(n,l){for(var u in l)n[u]=l[u];return n}function a(n){var l=n.parentNode;l&&l.removeChild(n);}function h(n,l,u){var i,t,o,r=arguments,f={};for(o in l)"key"==o?i=l[o]:"ref"==o?t=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);if(null!=u&&(f.children=u),"function"==typeof n&&null!=n.defaultProps)for(o in n.defaultProps)void 0===f[o]&&(f[o]=n.defaultProps[o]);return v(n,f,i,t,null)}function v(l,u,i,t,o){var r={type:l,props:u,key:i,ref:t,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:o};return null==o&&(r.__v=r),null!=n.vnode&&n.vnode(r),r}function p(n){return n.children}function d(n,l){this.props=n,this.context=l;}function _(n,l){if(null==l)return n.__?_(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return "function"==typeof n.type?_(n):null}function w(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return w(n)}}function k(l){(!l.__d&&(l.__d=!0)&&u.push(l)&&!g.__r++||t!==n.debounceRendering)&&((t=n.debounceRendering)||i)(g);}function g(){for(var n;g.__r=u.length;)n=u.sort(function(n,l){return n.__v.__b-l.__v.__b}),u=[],n.some(function(n){var l,u,i,t,o,r,f;n.__d&&(r=(o=(l=n).__v).__e,(f=l.__P)&&(u=[],(i=s({},o)).__v=i,t=$(f,o,i,l.__n,void 0!==f.ownerSVGElement,null!=o.__h?[r]:null,u,null==r?_(o):r,o.__h),j(u,o),t!=r&&w(o)));});}function m(n,l,u,i,t,o,r,c,s,h){var y,d,w,k,g,m,b,A=i&&i.__k||e,P=A.length;for(s==f&&(s=null!=r?r[0]:P?_(i,0):null),u.__k=[],y=0;y<l.length;y++)if(null!=(k=u.__k[y]=null==(k=l[y])||"boolean"==typeof k?null:"string"==typeof k||"number"==typeof k?v(null,k,null,null,k):Array.isArray(k)?v(p,{children:k},null,null,null):null!=k.__e||null!=k.__c?v(k.type,k.props,k.key,null,k.__v):k)){if(k.__=u,k.__b=u.__b+1,null===(w=A[y])||w&&k.key==w.key&&k.type===w.type)A[y]=void 0;else for(d=0;d<P;d++){if((w=A[d])&&k.key==w.key&&k.type===w.type){A[d]=void 0;break}w=null;}g=$(n,k,w=w||f,t,o,r,c,s,h),(d=k.ref)&&w.ref!=d&&(b||(b=[]),w.ref&&b.push(w.ref,null,k),b.push(d,k.__c||g,k)),null!=g?(null==m&&(m=g),s=x(n,k,w,A,r,g,s),h||"option"!=u.type?"function"==typeof u.type&&(u.__d=s):n.value=""):s&&w.__e==s&&s.parentNode!=n&&(s=_(w));}if(u.__e=m,null!=r&&"function"!=typeof u.type)for(y=r.length;y--;)null!=r[y]&&a(r[y]);for(y=P;y--;)null!=A[y]&&L(A[y],A[y]);if(b)for(y=0;y<b.length;y++)I(b[y],b[++y],b[++y]);}function x(n,l,u,i,t,o,r){var f,e,c;if(void 0!==l.__d)f=l.__d,l.__d=void 0;else if(t==u||o!=r||null==o.parentNode)n:if(null==r||r.parentNode!==n)n.appendChild(o),f=null;else {for(e=r,c=0;(e=e.nextSibling)&&c<i.length;c+=2)if(e==o)break n;n.insertBefore(o,r),f=r;}return void 0!==f?f:o.nextSibling}function A(n,l,u,i,t){var o;for(o in u)"children"===o||"key"===o||o in l||C(n,o,null,u[o],i);for(o in l)t&&"function"!=typeof l[o]||"children"===o||"key"===o||"value"===o||"checked"===o||u[o]===l[o]||C(n,o,l[o],u[o],i);}function P(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]=null==u?"":"number"!=typeof u||c.test(l)?u:u+"px";}function C(n,l,u,i,t){var o,r,f;if(t&&"className"==l&&(l="class"),"style"===l)if("string"==typeof u)n.style.cssText=u;else {if("string"==typeof i&&(n.style.cssText=i=""),i)for(l in i)u&&l in u||P(n.style,l,"");if(u)for(l in u)i&&u[l]===i[l]||P(n.style,l,u[l]);}else "o"===l[0]&&"n"===l[1]?(o=l!==(l=l.replace(/Capture$/,"")),(r=l.toLowerCase())in n&&(l=r),l=l.slice(2),n.l||(n.l={}),n.l[l+o]=u,f=o?N:z,u?i||n.addEventListener(l,f,o):n.removeEventListener(l,f,o)):"list"!==l&&"tagName"!==l&&"form"!==l&&"type"!==l&&"size"!==l&&"download"!==l&&"href"!==l&&!t&&l in n?n[l]=null==u?"":u:"function"!=typeof u&&"dangerouslySetInnerHTML"!==l&&(l!==(l=l.replace(/xlink:?/,""))?null==u||!1===u?n.removeAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase()):n.setAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase(),u):null==u||!1===u&&!/^ar/.test(l)?n.removeAttribute(l):n.setAttribute(l,u));}function z(l){this.l[l.type+!1](n.event?n.event(l):l);}function N(l){this.l[l.type+!0](n.event?n.event(l):l);}function T(n,l,u){var i,t;for(i=0;i<n.__k.length;i++)(t=n.__k[i])&&(t.__=n,t.__e&&("function"==typeof t.type&&t.__k.length>1&&T(t,l,u),l=x(u,t,t,n.__k,null,t.__e,l),"function"==typeof n.type&&(n.__d=l)));}function $(l,u,i,t,o,r,f,e,c){var a,h,v,y,_,w,k,g,b,x,A,P=u.type;if(void 0!==u.constructor)return null;null!=i.__h&&(c=i.__h,e=u.__e=i.__e,u.__h=null,r=[e]),(a=n.__b)&&a(u);try{n:if("function"==typeof P){if(g=u.props,b=(a=P.contextType)&&t[a.__c],x=a?b?b.props.value:a.__:t,i.__c?k=(h=u.__c=i.__c).__=h.__E:("prototype"in P&&P.prototype.render?u.__c=h=new P(g,x):(u.__c=h=new d(g,x),h.constructor=P,h.render=M),b&&b.sub(h),h.props=g,h.state||(h.state={}),h.context=x,h.__n=t,v=h.__d=!0,h.__h=[]),null==h.__s&&(h.__s=h.state),null!=P.getDerivedStateFromProps&&(h.__s==h.state&&(h.__s=s({},h.__s)),s(h.__s,P.getDerivedStateFromProps(g,h.__s))),y=h.props,_=h.state,v)null==P.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),null!=h.componentDidMount&&h.__h.push(h.componentDidMount);else {if(null==P.getDerivedStateFromProps&&g!==y&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(g,x),!h.__e&&null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(g,h.__s,x)||u.__v===i.__v){h.props=g,h.state=h.__s,u.__v!==i.__v&&(h.__d=!1),h.__v=u,u.__e=i.__e,u.__k=i.__k,h.__h.length&&f.push(h),T(u,e,l);break n}null!=h.componentWillUpdate&&h.componentWillUpdate(g,h.__s,x),null!=h.componentDidUpdate&&h.__h.push(function(){h.componentDidUpdate(y,_,w);});}h.context=x,h.props=g,h.state=h.__s,(a=n.__r)&&a(u),h.__d=!1,h.__v=u,h.__P=l,a=h.render(h.props,h.state,h.context),h.state=h.__s,null!=h.getChildContext&&(t=s(s({},t),h.getChildContext())),v||null==h.getSnapshotBeforeUpdate||(w=h.getSnapshotBeforeUpdate(y,_)),A=null!=a&&a.type==p&&null==a.key?a.props.children:a,m(l,Array.isArray(A)?A:[A],u,i,t,o,r,f,e,c),h.base=u.__e,u.__h=null,h.__h.length&&f.push(h),k&&(h.__E=h.__=null),h.__e=!1;}else null==r&&u.__v===i.__v?(u.__k=i.__k,u.__e=i.__e):u.__e=H(i.__e,u,i,t,o,r,f,c);(a=n.diffed)&&a(u);}catch(l){u.__v=null,(c||null!=r)&&(u.__e=e,u.__h=!!c,r[r.indexOf(e)]=null),n.__e(l,u,i);}return u.__e}function j(l,u){n.__c&&n.__c(u,l),l.some(function(u){try{l=u.__h,u.__h=[],l.some(function(n){n.call(u);});}catch(l){n.__e(l,u.__v);}});}function H(n,l,u,i,t,o,r,c){var s,a,h,v,y,p=u.props,d=l.props;if(t="svg"===l.type||t,null!=o)for(s=0;s<o.length;s++)if(null!=(a=o[s])&&((null===l.type?3===a.nodeType:a.localName===l.type)||n==a)){n=a,o[s]=null;break}if(null==n){if(null===l.type)return document.createTextNode(d);n=t?document.createElementNS("http://www.w3.org/2000/svg",l.type):document.createElement(l.type,d.is&&{is:d.is}),o=null,c=!1;}if(null===l.type)p===d||c&&n.data===d||(n.data=d);else {if(null!=o&&(o=e.slice.call(n.childNodes)),h=(p=u.props||f).dangerouslySetInnerHTML,v=d.dangerouslySetInnerHTML,!c){if(null!=o)for(p={},y=0;y<n.attributes.length;y++)p[n.attributes[y].name]=n.attributes[y].value;(v||h)&&(v&&(h&&v.__html==h.__html||v.__html===n.innerHTML)||(n.innerHTML=v&&v.__html||""));}A(n,d,p,t,c),v?l.__k=[]:(s=l.props.children,m(n,Array.isArray(s)?s:[s],l,u,i,"foreignObject"!==l.type&&t,o,r,f,c)),c||("value"in d&&void 0!==(s=d.value)&&(s!==n.value||"progress"===l.type&&!s)&&C(n,"value",s,p.value,!1),"checked"in d&&void 0!==(s=d.checked)&&s!==n.checked&&C(n,"checked",s,p.checked,!1));}return n}function I(l,u,i){try{"function"==typeof l?l(u):l.current=u;}catch(l){n.__e(l,i);}}function L(l,u,i){var t,o,r;if(n.unmount&&n.unmount(l),(t=l.ref)&&(t.current&&t.current!==l.__e||I(t,null,u)),i||"function"==typeof l.type||(i=null!=(o=l.__e)),l.__e=l.__d=void 0,null!=(t=l.__c)){if(t.componentWillUnmount)try{t.componentWillUnmount();}catch(l){n.__e(l,u);}t.base=t.__P=null;}if(t=l.__k)for(r=0;r<t.length;r++)t[r]&&L(t[r],u,i);null!=o&&a(o);}function M(n,l,u){return this.constructor(n,u)}function O(l,u,i){var t,r,c;n.__&&n.__(l,u),r=(t=i===o)?null:i&&i.__k||u.__k,l=h(p,null,[l]),c=[],$(u,(t?u:i||u).__k=l,r||f,f,void 0!==u.ownerSVGElement,i&&!t?[i]:r?null:u.childNodes.length?e.slice.call(u.childNodes):null,c,i||f,t),j(c,l);}n={__e:function(n,l){for(var u,i,t,o=l.__h;l=l.__;)if((u=l.__c)&&!u.__)try{if((i=u.constructor)&&null!=i.getDerivedStateFromError&&(u.setState(i.getDerivedStateFromError(n)),t=u.__d),null!=u.componentDidCatch&&(u.componentDidCatch(n),t=u.__d),t)return l.__h=o,u.__E=u}catch(l){n=l;}throw n}},d.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=s({},this.state),"function"==typeof n&&(n=n(s({},u),this.props)),n&&s(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),k(this));},d.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),k(this));},d.prototype.render=p,u=[],i="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,g.__r=0,o=f,0;

    /** Creates a function ref that assigns its value to a given property of an object.
     *  @example
     *  // element is stored as `this.foo` when rendered.
     *  <div ref={linkRef(this, 'foo')} />
     */
    function linkRef(obj, name) {
        const refName = `$$ref_${name}`;
        let ref = obj[refName];
        if (!ref) {
            ref = obj[refName] = (c) => {
                obj[name] = c;
            };
        }
        return ref;
    }

    const app = "_app_13ky7_1";
    const drop = "_drop_13ky7_21";
    const appLoader = "_app-loader_13ky7_121";

    var css = "._app_13ky7_1{position:absolute;left:0;top:0;contain:strict}._app_13ky7_1,._drop_13ky7_21{width:100%;height:100%;overflow:hidden}._drop_13ky7_21{touch-action:none}._drop_13ky7_21:after{content:\"\";position:absolute;display:block;left:10px;top:10px;right:10px;bottom:10px;background-color:rgba(0,0,0,.1);border:2px dashed #fff;border-color:var(--pink);border-radius:10px;opacity:0;transform:scale(.95);transition:all .2s ease-in;transition-property:transform,opacity;pointer-events:none}._drop_13ky7_21.drop-valid:after{opacity:1;transform:scale(1);transition-timing-function:ease-out}._option-pair_13ky7_89{display:flex;justify-content:flex-end;width:100%;height:100%}._option-pair_13ky7_89._horizontal_13ky7_101{justify-content:space-between;align-items:flex-end}._option-pair_13ky7_89._vertical_13ky7_111{flex-direction:column}._app-loader_13ky7_121{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);--size:225px;--stroke-width:26px}";

    function appendCss(css) {
        if (false) return;
        const style = document.createElement('style');
        style.textContent = css;
        document.head.append(style);
      }

    appendCss(css);

    function t$1(t,e,i){const s=Array.from(t);let r;if(""===e)return r=s.filter(t=>"file"===t.kind),i?r:[r[0]];const n=e.toLowerCase().split(",").map(t=>t.split("/").map(t=>t.trim())).filter(t=>2===t.length);return r=r=s.filter(t=>{if("file"!==t.kind)return !1;const[e,i]=t.type.toLowerCase().split("/").map(t=>t.trim());for(const[t,s]of n)if(e===t&&("*"===s||i===s))return !0;return !1}),!1===i&&(r=[r[0]]),r}function e$1(e,i,s){const r=[];return t$1(e.items,i,s).forEach(t=>{const e=t.getAsFile();null!==e&&r.push(e);}),r}class i$1 extends Event{constructor(t,e){var s,r;super(t,e),(s=this)instanceof(r=i$1)||Object.setPrototypeOf(s,r.prototype),this._files=e.files,this._action=e.action;}get action(){return this._action}get files(){return this._files}}class s$1 extends HTMLElement{constructor(){super(),this._dragEnterCount=0,this._onDragEnter=this._onDragEnter.bind(this),this._onDragLeave=this._onDragLeave.bind(this),this._onDrop=this._onDrop.bind(this),this._onPaste=this._onPaste.bind(this),this.addEventListener("dragover",t=>t.preventDefault()),this.addEventListener("drop",this._onDrop),this.addEventListener("dragenter",this._onDragEnter),this.addEventListener("dragend",()=>this._reset()),this.addEventListener("dragleave",this._onDragLeave),this.addEventListener("paste",this._onPaste);}get accept(){return this.getAttribute("accept")||""}set accept(t){this.setAttribute("accept",t);}get multiple(){return this.getAttribute("multiple")}set multiple(t){this.setAttribute("multiple",t||"");}_onDragEnter(e){if(this._dragEnterCount+=1,this._dragEnterCount>1)return;if(null===e.dataTransfer)return void this.classList.add("drop-invalid");const i=t$1(e.dataTransfer.items,this.accept,null!==this.multiple);this.classList.add(!e.dataTransfer||!e.dataTransfer.items.length||void 0!==i[0]?"drop-valid":"drop-invalid");}_onDragLeave(){this._dragEnterCount-=1,0===this._dragEnterCount&&this._reset();}_onDrop(t){if(t.preventDefault(),null===t.dataTransfer)return;this._reset();const s=e$1(t.dataTransfer,this.accept,null!==this.multiple);void 0!==s&&this.dispatchEvent(new i$1("filedrop",{action:"drop",files:s}));}_onPaste(t){if(!t.clipboardData)return;const s=e$1(t.clipboardData,this.accept,void 0!==this.multiple);void 0!==s&&this.dispatchEvent(new i$1("filedrop",{action:"paste",files:s}));}_reset(){this._dragEnterCount=0,this.classList.remove("drop-valid"),this.classList.remove("drop-invalid");}}customElements.define("file-drop",s$1);

    const snackbar = "_snackbar_gd4zh_21";
    const text = "_text_gd4zh_109";
    const button = "_button_gd4zh_121";

    var css$1 = "snack-bar{display:block;position:fixed;left:0;bottom:0;width:100%;height:0;overflow:visible}._snackbar_gd4zh_21{position:fixed;display:flex;box-sizing:border-box;left:50%;bottom:24px;width:344px;margin-left:-172px;background:#2a2a2a;border-radius:2px;box-shadow:0 1px 4px rgba(0,0,0,.5);transform-origin:center;color:#eee;z-index:100;cursor:default;will-change:transform;animation:_snackbar-show_gd4zh_1 .3s ease 1 forwards}._snackbar_gd4zh_21[aria-hidden=true]{animation:_snackbar-hide_gd4zh_1 .3s ease 1 forwards}@keyframes _snackbar-show_gd4zh_1{0%{opacity:0;transform:scale(.5)}}@keyframes _snackbar-hide_gd4zh_1{to{opacity:0;transform:translateY(100%)}}@media (max-width:400px){._snackbar_gd4zh_21{width:100%;bottom:0;left:0;margin-left:0;border-radius:0}}._text_gd4zh_109{flex:1 1 auto;padding:16px;font-size:100%}._button_gd4zh_121{position:relative;flex:0 1 auto;padding:8px;height:100%;margin:auto 8px auto -8px;min-width:5em;background:none;border:none;border-radius:3px;color:#90ee90;font-weight:inherit;letter-spacing:.05em;font-size:100%;text-transform:uppercase;text-align:center;cursor:pointer;overflow:hidden;transition:background-color .2s ease;outline:none;text-decoration:none}._button_gd4zh_121:hover{background-color:rgba(0,0,0,.15)}._button_gd4zh_121:focus:before{content:\"\";position:absolute;left:50%;top:50%;width:120%;height:0;padding:0 0 120%;margin:-60% 0 0 -60%;background:hsla(0,0%,100%,.1);border-radius:50%;transform-origin:center;will-change:transform;animation:_focus-ring_gd4zh_1 .3s ease-out 1 forwards;pointer-events:none}@keyframes _focus-ring_gd4zh_1{0%{transform:scale(.01)}}";

    appendCss(css$1);

    // So it doesn't cause an error when running in node
    const HTMLEl = ( HTMLElement);
    function createSnack(message, options) {
        const { timeout = 0, actions = ['dismiss'] } = options;
        const el = document.createElement('div');
        el.className = snackbar;
        el.setAttribute('aria-live', 'assertive');
        el.setAttribute('aria-atomic', 'true');
        el.setAttribute('aria-hidden', 'false');
        const text$1 = document.createElement('div');
        text$1.className = text;
        text$1.textContent = message;
        el.appendChild(text$1);
        const result = new Promise((resolve) => {
            let timeoutId;
            // Add action buttons
            for (const action of actions) {
                const button$1 = document.createElement('button');
                button$1.className = button;
                button$1.textContent = action;
                button$1.addEventListener('click', () => {
                    clearTimeout(timeoutId);
                    resolve(action);
                });
                el.appendChild(button$1);
            }
            // Add timeout
            if (timeout) {
                timeoutId = self.setTimeout(() => resolve(''), timeout);
            }
        });
        return [el, result];
    }
    class SnackBarElement extends HTMLEl {
        constructor() {
            super(...arguments);
            this._snackbars = [];
            this._processingQueue = false;
        }
        /**
         * Show a snackbar. Returns a promise for the name of the action clicked, or an empty string if no
         * action is clicked.
         */
        showSnackbar(message, options = {}) {
            return new Promise((resolve) => {
                this._snackbars.push([message, options, resolve]);
                if (!this._processingQueue)
                    this._processQueue();
            });
        }
        async _processQueue() {
            this._processingQueue = true;
            while (this._snackbars[0]) {
                const [message, options, resolver] = this._snackbars[0];
                const [el, result] = createSnack(message, options);
                // Pass the result back to the original showSnackbar call.
                resolver(result);
                this.appendChild(el);
                // Wait for the user to click an action, or for the snack to timeout.
                await result;
                // Transition the snack away.
                el.setAttribute('aria-hidden', 'true');
                await new Promise((resolve) => {
                    el.addEventListener('animationend', () => resolve());
                });
                el.remove();
                this._snackbars.shift();
            }
            this._processingQueue = false;
        }
    }
    customElements.define('snack-bar', SnackBarElement);

    const spinnerCircle = "_spinner-circle_1x9ri_155";
    const spinnerGapPatch = "_spinner-gap-patch_1x9ri_195";
    const spinnerCircleClipper = "_spinner-circle-clipper_1x9ri_227";
    const spinnerLeft = "_spinner-left_1x9ri_245";
    const spinnerRight = "_spinner-right_1x9ri_257";
    const spinnerContainer = "_spinner-container_1x9ri_281";
    const spinnerLayer = "_spinner-layer_1x9ri_299";

    var css$2 = "@keyframes _spinner-left-spin_1x9ri_1{0%{transform:rotate(130deg)}50%{transform:rotate(-5deg)}to{transform:rotate(130deg)}}@keyframes _spinner-right-spin_1x9ri_1{0%{transform:rotate(-130deg)}50%{transform:rotate(5deg)}to{transform:rotate(-130deg)}}@keyframes _spinner-fade-out_1x9ri_1{to{opacity:0}}@keyframes _spinner-container-rotate_1x9ri_1{to{transform:rotate(1turn)}}@keyframes _spinner-fill-unfill-rotate_1x9ri_1{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}to{transform:rotate(3turn)}}loading-spinner{--size:28px;--color:#4285f4;--stroke-width:3px;--delay:300ms;pointer-events:none;display:inline-block;position:relative;width:var(--size);height:var(--size);border-color:var(--color)}loading-spinner ._spinner-circle_1x9ri_155{position:absolute;top:0;left:0;right:0;bottom:0;box-sizing:border-box;height:100%;width:200%;border:var(--stroke-width) solid;border-color:inherit;border-bottom-color:transparent!important;border-radius:50%}loading-spinner ._spinner-gap-patch_1x9ri_195{position:absolute;box-sizing:border-box;top:0;left:45%;width:10%;height:100%;overflow:hidden;border-color:inherit}loading-spinner ._spinner-gap-patch_1x9ri_195 ._spinner-circle_1x9ri_155{width:1000%;left:-450%}loading-spinner ._spinner-circle-clipper_1x9ri_227{display:inline-block;position:relative;width:50%;height:100%;overflow:hidden;border-color:inherit}loading-spinner ._spinner-left_1x9ri_245 ._spinner-circle_1x9ri_155{border-right-color:transparent!important;transform:rotate(129deg);animation:_spinner-left-spin_1x9ri_1 1333ms cubic-bezier(.4,0,.2,1) infinite both}loading-spinner ._spinner-right_1x9ri_257 ._spinner-circle_1x9ri_155{left:-100%;border-left-color:transparent!important;transform:rotate(-129deg);animation:_spinner-right-spin_1x9ri_1 1333ms cubic-bezier(.4,0,.2,1) infinite both}loading-spinner._spinner-fadeout_1x9ri_273{animation:_spinner-fade-out_1x9ri_1 .4s cubic-bezier(.4,0,.2,1) forwards}loading-spinner ._spinner-container_1x9ri_281{width:100%;height:100%;border-color:inherit;animation:_spinner-container-rotate_1x9ri_1 1568ms linear infinite}loading-spinner ._spinner-layer_1x9ri_299{position:absolute;width:100%;height:100%;border-color:inherit;animation:_spinner-fill-unfill-rotate_1x9ri_1 5332ms cubic-bezier(.4,0,.2,1) infinite both}";

    appendCss(css$2);

    // So it doesn't cause an error when running in node
    const HTMLEl$1 = ( HTMLElement);
    /**
     * A simple spinner. This custom element has no JS API. Just put it in the document, and it'll
     * spin. You can configure the following using CSS custom properties:
     *
     * --size: Size of the spinner element (it's always square). Default: 28px.
     * --color: Color of the spinner. Default: #4285f4.
     * --stroke-width: Width of the stroke of the spinner. Default: 3px.
     * --delay: Once the spinner enters the DOM, how long until it shows. This prevents the spinner
     *          appearing on the screen for short operations. Default: 300ms.
     */
    class LoadingSpinner extends HTMLEl$1 {
        constructor() {
            super(...arguments);
            this._delayTimeout = 0;
        }
        disconnectedCallback() {
            this.style.display = 'none';
            clearTimeout(this._delayTimeout);
        }
        connectedCallback() {
            this.style.display = 'none';
            // prettier-ignore
            this.innerHTML = '' +
                `<div class="${spinnerContainer}">` +
                `<div class="${spinnerLayer}">` +
                `<div class="${spinnerCircleClipper} ${spinnerLeft}">` +
                `<div class="${spinnerCircle}"></div>` +
                '</div>' +
                `<div class="${spinnerGapPatch}">` +
                `<div class="${spinnerCircle}"></div>` +
                '</div>' +
                `<div class="${spinnerCircleClipper} ${spinnerRight}">` +
                `<div class="${spinnerCircle}"></div>` +
                '</div>' +
                '</div>' +
                '</div>';
            const delayStr = getComputedStyle(this).getPropertyValue('--delay').trim();
            let delayNum = parseFloat(delayStr);
            // If seconds…
            if (/\ds$/.test(delayStr)) {
                // Convert to ms.
                delayNum *= 1000;
            }
            this._delayTimeout = self.setTimeout(() => {
                this.style.display = '';
            }, delayNum);
        }
    }
    customElements.define('loading-spinner', LoadingSpinner);

    var logo = "/c/logo-99b7d28c.svg";

    var largePhoto = "/c/demo-large-photo-a6b23f7b.jpg";

    var artwork = "/c/demo-artwork-c444f915.jpg";

    var deviceScreen = "/c/demo-device-screen-b9d088e8.png";

    var largePhotoIcon = "/c/icon-demo-large-photo-18da387a.jpg";

    var artworkIcon = "/c/icon-demo-artwork-9eba1655.jpg";

    var deviceScreenIcon = "/c/icon-demo-device-screen-5d52d8b9.jpg";

    var logoIcon = "/c/icon-demo-logo-326ed9b6.png";

    const intro = "_intro_1wp6t_1 abs-fill";
    const blobCanvas = "_blob-canvas_1wp6t_25 abs-fill";
    const hide = "_hide_1wp6t_41";
    const main = "_main_1wp6t_49";
    const heroHeader = "_hero-header_1wp6t_73";
    const heroTitle = "_hero-title_1wp6t_91";
    const titleWhite = "_title-white_1wp6t_111";
    const titleGradient = "_title-gradient_1wp6t_121";
    const titleUnderline = "_title-underline_1wp6t_135";
    const bulkBadgeBtn = "_bulk-badge-btn_1wp6t_151";
    const heroStage = "_hero-stage_1wp6t_201";
    const centralOrbContainer = "_central-orb-container_1wp6t_225";
    const orbOuterGlow = "_orb-outer-glow_1wp6t_253";
    const orbInnerSphere = "_orb-inner-sphere_1wp6t_281";
    const orbUploadButton = "_orb-upload-button_1wp6t_361 unbutton";
    const orbIconWrapper = "_orb-icon-wrapper_1wp6t_389";
    const orbIcon = "_orb-icon_1wp6t_389";
    const orbMainText = "_orb-main-text_1wp6t_429";
    const orbSubText = "_orb-sub-text_1wp6t_445";
    const orbPastePill = "_orb-paste-pill_1wp6t_461";
    const floatingCard = "_floating-card_1wp6t_495";
    const cardLeft = "_card-left_1wp6t_563";
    const cardRight = "_card-right_1wp6t_583";
    const cardIcon = "_card-icon_1wp6t_603";
    const cardLabel = "_card-label_1wp6t_631";
    const ambientDot = "_ambient-dot_1wp6t_645";
    const dot1 = "_dot-1_1wp6t_659";
    const dot2 = "_dot-2_1wp6t_677";
    const dot3 = "_dot-3_1wp6t_695";
    const dot4 = "_dot-4_1wp6t_713";
    const dot5 = "_dot-5_1wp6t_731";
    const installBtn = "_install-btn_1wp6t_1135 unbutton";

    const demos = [
        {
            description: 'Large photo',
            size: '2.8MB',
            filename: 'photo.jpg',
            url: largePhoto,
            iconUrl: largePhotoIcon,
        },
        {
            description: 'Artwork',
            size: '2.9MB',
            filename: 'art.jpg',
            url: artwork,
            iconUrl: artworkIcon,
        },
        {
            description: 'Device screen',
            size: '1.6MB',
            filename: 'pixel3.png',
            url: deviceScreen,
            iconUrl: deviceScreenIcon,
        },
        {
            description: 'SVG icon',
            size: '13KB',
            filename: 'squoosh.svg',
            url: logo,
            iconUrl: logoIcon,
        },
    ];
    const blobAnimImport =  matchMedia('(prefers-reduced-motion: reduce)').matches
        ? undefined
        : require('./blob-anim-414af942');
    const installButtonSource = 'introInstallButton-Purple';
     navigator.clipboard && navigator.clipboard.read;
    async function getImageClipboardItem(items) {
        for (const item of items) {
            const type = item.types.find((type) => type.startsWith('image/'));
            if (type)
                return item.getType(type);
        }
    }
    class Intro extends d {
        constructor() {
            super(...arguments);
            this.state = {
                showBlobSVG: true,
            };
            this.installingViaButton = false;
            this.onWindowPaste = (event) => {
                const clipEvent = event;
                const items = clipEvent.clipboardData && clipEvent.clipboardData.items;
                if (!items)
                    return;
                for (let i = 0; i < items.length; i++) {
                    if (items[i].type.startsWith('image/')) {
                        const file = items[i].getAsFile();
                        if (file) {
                            event.preventDefault();
                            const ext = file.type.split('/')[1] || 'png';
                            const namedFile = new File([file], `pasted-image.${ext}`, {
                                type: file.type,
                            });
                            this.props.onFile(namedFile);
                            return;
                        }
                    }
                }
            };
            this.onFileChange = (event) => {
                const fileInput = event.target;
                const fileList = fileInput.files;
                if (!fileList || fileList.length === 0)
                    return;
                const files = Array.from(fileList);
                if (this.fileInput) {
                    this.fileInput.value = '';
                }
                if (files.length > 1 && this.props.onFiles) {
                    this.props.onFiles(files);
                }
                else if (this.props.onFile && files[0]) {
                    this.props.onFile(files[0]);
                }
            };
            this.onOpenClick = () => {
                this.fileInput.click();
            };
            this.onDemoClick = async (index, event) => {
                try {
                    this.setState({ fetchingDemoIndex: index });
                    const demo = demos[index];
                    const blob = await fetch(demo.url).then((r) => r.blob());
                    const file = new File([blob], demo.filename, { type: blob.type });
                    this.props.onFile(file);
                }
                catch (err) {
                    this.setState({ fetchingDemoIndex: undefined });
                    this.props.showSnack("Couldn't fetch demo image");
                }
            };
            this.onBeforeInstallPromptEvent = (event) => {
                // Don't show the mini-infobar on mobile
                event.preventDefault();
                // Save the beforeinstallprompt event so it can be called later.
                this.setState({ beforeInstallEvent: event });
                // Log the event.
                const gaEventInfo = {
                    eventCategory: 'pwa-install',
                    eventAction: 'promo-shown',
                    nonInteraction: true,
                };
                ga('send', 'event', gaEventInfo);
            };
            this.onInstallClick = async (event) => {
                // Get the deferred beforeinstallprompt event
                const beforeInstallEvent = this.state.beforeInstallEvent;
                // If there's no deferred prompt, bail.
                if (!beforeInstallEvent)
                    return;
                this.installingViaButton = true;
                // Show the browser install prompt
                beforeInstallEvent.prompt();
                // Wait for the user to accept or dismiss the install prompt
                const { outcome } = await beforeInstallEvent.userChoice;
                // Send the analytics data
                const gaEventInfo = {
                    eventCategory: 'pwa-install',
                    eventAction: 'promo-clicked',
                    eventLabel: installButtonSource,
                    eventValue: outcome === 'accepted' ? 1 : 0,
                };
                ga('send', 'event', gaEventInfo);
                // If the prompt was dismissed, we aren't going to install via the button.
                if (outcome === 'dismissed') {
                    this.installingViaButton = false;
                }
            };
            this.onAppInstalled = () => {
                // We don't need the install button, if it's shown
                this.setState({ beforeInstallEvent: undefined });
                // Don't log analytics if page is not visible
                if (document.hidden)
                    return;
                // Try to get the install, if it's not set, use 'browser'
                const source = this.installingViaButton ? installButtonSource : 'browser';
                ga('send', 'event', 'pwa-install', 'installed', source);
                // Clear the install method property
                this.installingViaButton = false;
            };
            this.onPasteClick = async () => {
                let clipboardItems;
                try {
                    clipboardItems = await navigator.clipboard.read();
                }
                catch (err) {
                    this.props.showSnack(`No permission to access clipboard`);
                    return;
                }
                const blob = await getImageClipboardItem(clipboardItems);
                if (!blob) {
                    this.props.showSnack(`No image found in the clipboard`);
                    return;
                }
                const ext = blob.type.split('/')[1] || 'png';
                this.props.onFile(new File([blob], `pasted-image.${ext}`, { type: blob.type }));
            };
        }
        componentDidMount() {
            // Listen for beforeinstallprompt events, indicating Squoosh is installable.
            window.addEventListener('beforeinstallprompt', this.onBeforeInstallPromptEvent);
            // Listen for the appinstalled event, indicating Squoosh has been installed.
            window.addEventListener('appinstalled', this.onAppInstalled);
            // Global paste listener (Ctrl+V / Cmd+V anywhere on the page)
            window.addEventListener('paste', this.onWindowPaste);
            if (blobAnimImport) {
                blobAnimImport.then((module) => {
                    this.setState({
                        showBlobSVG: false,
                    }, () => module.startBlobAnim(this.blobCanvas));
                });
            }
        }
        componentWillUnmount() {
            window.removeEventListener('beforeinstallprompt', this.onBeforeInstallPromptEvent);
            window.removeEventListener('appinstalled', this.onAppInstalled);
            window.removeEventListener('paste', this.onWindowPaste);
        }
        render({}, { fetchingDemoIndex, beforeInstallEvent, showBlobSVG }) {
            return (h("div", { class: intro },
                h("input", { class: hide, ref: linkRef(this, 'fileInput'), type: "file", multiple: true, onChange: this.onFileChange }),
                h("div", { class: main },
                     (h("canvas", { ref: linkRef(this, 'blobCanvas'), class: blobCanvas })),
                    h("div", { class: heroHeader },
                        h("h1", { class: heroTitle },
                            h("span", { class: titleWhite }, "Zyro"),
                            ' ',
                            h("span", { class: titleGradient }, "Pro")),
                        h("div", { class: titleUnderline }),
                        this.props.onOpenBulk && (h("button", { type: "button", class: bulkBadgeBtn, onClick: this.props.onOpenBulk, title: "Batch optimize multiple images at once" },
                            h("svg", { viewBox: "0 0 24 24", width: "16", height: "16", fill: "currentColor" },
                                h("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" })),
                            "\u26A1 Bulk Image Optimize"))),
                    h("div", { class: heroStage },
                        h("div", { class: `${floatingCard} ${cardLeft}`, onClick: this.onOpenClick, title: "Select images from device" },
                            h("div", { class: cardIcon },
                                h("svg", { viewBox: "0 0 24 24" },
                                    h("path", { d: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" }))),
                            h("span", { class: cardLabel }, "Images")),
                        h("div", { class: `${floatingCard} ${cardRight}`, onClick: this.onPasteClick, title: "Paste image from clipboard" },
                            h("div", { class: cardIcon },
                                h("svg", { viewBox: "0 0 24 24" },
                                    h("path", { d: "M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" }))),
                            h("span", { class: cardLabel }, "Paste")),
                        h("div", { class: `${ambientDot} ${dot1}` }),
                        h("div", { class: `${ambientDot} ${dot2}` }),
                        h("div", { class: `${ambientDot} ${dot3}` }),
                        h("div", { class: `${ambientDot} ${dot4}` }),
                        h("div", { class: `${ambientDot} ${dot5}` }),
                        h("div", { class: centralOrbContainer },
                            h("div", { class: orbOuterGlow }),
                            h("div", { class: orbInnerSphere },
                                h("button", { type: "button", class: orbUploadButton, onClick: this.onOpenClick, "aria-label": "Upload image" },
                                    h("div", { class: orbIconWrapper },
                                        h("svg", { viewBox: "0 0 24 24", class: orbIcon },
                                            h("path", { d: "M19 7v3h-2V7h-3V5h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5a2 2 0 00-2 2v12c0 1.1.9 2 2 2h12a2 2 0 002-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z" }))),
                                    h("div", { class: orbMainText }, "Drop your image here"),
                                    h("div", { class: orbSubText },
                                        "or",
                                        ' ',
                                        h("span", { class: orbPastePill, onClick: (e) => {
                                                e.stopPropagation();
                                                this.onPasteClick();
                                            } }, "Paste"),
                                        ' ',
                                        "from clipboard")))))),
                beforeInstallEvent && (h("button", { class: installBtn, onClick: this.onInstallClick }, "Install"))));
        }
    }

    const ROUTE_EDITOR = '/editor';
    const ROUTE_BULK = '/bulk';
    const TITLE_HOME = 'Free Image Resizer & Compressor Online | Zyro Pro';
    const TITLE_BULK = 'Bulk Image Resizer & Compressor Online | Zyro Pro';
    const TITLE_EDITOR = 'Image Editor – Resize, Crop & Compress | Zyro Pro';
    const compressPromise = require('./Compress-b0ac2c35');
    const bulkPromise = require('./BulkOptimize-c3b71419');
    const swBridgePromise = require('./sw-bridge-32595990');
    class App extends d {
        constructor() {
            super();
            this.state = {
                awaitingShareTarget: new URL(location.href).searchParams.has('share-target'),
                isEditorOpen: false,
                isBulkOpen: location.pathname === ROUTE_BULK,
                file: undefined,
                bulkFiles: undefined,
                Compress: undefined,
                BulkOptimize: undefined,
            };
            this.updateTitle = (isEditorOpen, isBulkOpen, file) => {
                if (isBulkOpen) {
                    document.title = TITLE_BULK;
                }
                else if (isEditorOpen) {
                    document.title = file ? `${file.name} - ${TITLE_EDITOR}` : TITLE_EDITOR;
                }
                else {
                    document.title = TITLE_HOME;
                }
            };
            this.onFileDrop = ({ files }) => {
                if (!files || files.length === 0)
                    return;
                if (files.length > 1) {
                    this.openBulk(Array.from(files));
                }
                else {
                    const file = files[0];
                    this.openEditor(file);
                }
            };
            this.onIntroPickFile = (file) => {
                this.openEditor(file);
            };
            this.onIntroPickFiles = (files) => {
                if (files.length > 1) {
                    this.openBulk(files);
                }
                else if (files.length === 1) {
                    this.openEditor(files[0]);
                }
            };
            this.showSnack = (message, options = {}) => {
                if (!this.snackbar)
                    throw Error('Snackbar missing');
                return this.snackbar.showSnackbar(message, options);
            };
            this.onPopState = () => {
                const hasFile = Boolean(this.state.file);
                const isEditorOpen = location.pathname === ROUTE_EDITOR && hasFile;
                const isBulkOpen = location.pathname === ROUTE_BULK;
                if (location.pathname === ROUTE_EDITOR && !hasFile) {
                    history.replaceState(null, '', '/');
                }
                this.updateTitle(isEditorOpen, isBulkOpen, this.state.file);
                this.setState({ isEditorOpen, isBulkOpen });
            };
            this.openEditor = (file) => {
                const targetFile = file || this.state.file;
                if (!targetFile)
                    return;
                const editorURL = new URL(location.href);
                editorURL.pathname = ROUTE_EDITOR;
                if (location.pathname !== ROUTE_EDITOR) {
                    history.pushState(null, '', editorURL.href);
                }
                this.updateTitle(true, false, targetFile);
                this.setState({
                    isEditorOpen: true,
                    isBulkOpen: false,
                    file: targetFile,
                });
            };
            this.openBulk = (files) => {
                const bulkURL = new URL(location.href);
                bulkURL.pathname = ROUTE_BULK;
                if (location.pathname !== ROUTE_BULK) {
                    history.pushState(null, '', bulkURL.href);
                }
                this.updateTitle(false, true);
                this.setState({
                    isBulkOpen: true,
                    isEditorOpen: false,
                    bulkFiles: files && files.length > 0 ? files : this.state.file ? [this.state.file] : [],
                });
            };
            this.goHome = () => {
                const homeURL = new URL(location.href);
                homeURL.pathname = '/';
                if (location.pathname !== '/') {
                    history.pushState(null, '', homeURL.href);
                }
                this.updateTitle(false, false);
                this.setState({
                    isBulkOpen: false,
                    isEditorOpen: false,
                });
            };
            compressPromise
                .then((module) => {
                this.setState({ Compress: module.default });
            })
                .catch(() => {
                this.showSnack('Failed to load app');
            });
            bulkPromise
                .then((module) => {
                this.setState({ BulkOptimize: module.default });
            })
                .catch(() => {
                console.error('Failed to preload bulk module');
            });
            swBridgePromise.then(async ({ offliner, getSharedImage }) => {
                offliner(this.showSnack);
                if (!this.state.awaitingShareTarget)
                    return;
                const file = await getSharedImage();
                // Remove the ?share-target from the URL
                history.replaceState('', '', '/');
                this.openEditor(file);
                this.setState({ awaitingShareTarget: false });
            });
            document.body.addEventListener('gesturestart', (event) => {
                event.preventDefault();
            });
            if (location.pathname === ROUTE_EDITOR && !this.state.file) {
                history.replaceState(null, '', '/');
            }
            window.addEventListener('popstate', this.onPopState);
            this.updateTitle(this.state.isEditorOpen, this.state.isBulkOpen);
        }
        render({}, { file, bulkFiles, isEditorOpen, isBulkOpen, Compress, BulkOptimize, awaitingShareTarget }) {
            const showSpinner = awaitingShareTarget ||
                (isEditorOpen && !Compress) ||
                (isBulkOpen && !BulkOptimize);
            return (h("div", { class: app },
                h("file-drop", { onfiledrop: this.onFileDrop, class: drop, multiple: true },
                    showSpinner ? (h("loading-spinner", { class: appLoader })) : isBulkOpen ? (BulkOptimize && (h(BulkOptimize, { initialFiles: bulkFiles, showSnack: this.showSnack, onBackToSingle: (f) => this.openEditor(f), onHome: this.goHome }))) : isEditorOpen && file ? (Compress && (h(Compress, { file: file, showSnack: this.showSnack, onBack: this.goHome, onOpenBulk: () => this.openBulk([file]) }))) : (h(Intro, { onFile: this.onIntroPickFile, onFiles: this.onIntroPickFiles, onOpenBulk: () => this.openBulk(), showSnack: this.showSnack })),
                    h("snack-bar", { ref: linkRef(this, 'snackbar') }))));
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
    const root = document.getElementById('app');
    async function main$1() {
        await require('./debug-8a9f0072').then(function (n) { return n.debug; });
        O(h(App, null), root);
    }
    main$1();
    // Analytics
    {
        // Determine the current display mode.
        const displayMode = navigator.standalone ||
            window.matchMedia('(display-mode: standalone)').matches
            ? 'standalone'
            : 'browser';
        // Setup analytics
        window.ga = window.ga || ((...args) => (ga.q = ga.q || []).push(args));
        ga('create', 'UA-128752250-1', 'auto');
        ga('set', 'transport', 'beacon');
        ga('set', 'dimension1', displayMode);
        ga('send', 'pageview', '/index.html', { title: 'Zyro Pro' });
        // Load the GA script without keeping the browser spinner going.
        addEventListener('load', () => {
            const script = document.createElement('script');
            script.src = 'https://www.google-analytics.com/analytics.js';
            document.head.appendChild(script);
        });
    }

    exports.appendCss = appendCss;
    exports.centralOrbContainer = centralOrbContainer;
    exports.d = d;
    exports.h = h;
    exports.linkRef = linkRef;
    exports.p = p;

    Object.defineProperty(exports, '__esModule', { value: true });

});
