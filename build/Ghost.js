(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.Ghost = {}));
}(this, (function (exports) { 'use strict';

	var after = (func, action) => {
	    return (...rest) => {
	        const result = func(...rest);
	        action();
	        return result;
	    };
	};

	var before = (func, action) => {
	    return (...rest) => {
	        action();
	        return func(...rest);
	    };
	};

	var debounce = (func, wait) => {
	    if (!wait) {
	        return func;
	    }
	    let id;
	    return (...rest) => {
	        return new Promise((resolve) => {
	            if (id !== undefined) {
	                clearTimeout(id);
	                id = undefined;
	            }
	            id = window.setTimeout(() => {
	                resolve(func(...rest));
	            }, wait);
	        });
	    };
	};

	var throttle = (func, wait) => {
	    let pre = Date.now();
	    let now;
	    return (...rest) => {
	        now = Date.now();
	        if (now - pre >= wait) {
	            func(...rest);
	            pre = Date.now();
	        }
	    };
	};

	exports.after = after;
	exports.before = before;
	exports.debounce = debounce;
	exports.throttle = throttle;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
