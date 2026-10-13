define(['exports'], function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn) {
	  var module = { exports: {} };
		return fn(module, module.exports), module.exports;
	}

	function commonjsRequire (target) {
		throw new Error('Could not dynamically require "' + target + '". Please configure the dynamicRequireTargets option of @rollup/plugin-commonjs appropriately for this require call to behave properly.');
	}

	exports.commonjsGlobal = commonjsGlobal;
	exports.commonjsRequire = commonjsRequire;
	exports.createCommonjsModule = createCommonjsModule;

});
