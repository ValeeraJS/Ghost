(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Ghost = {}));
}(this, (function (exports) { 'use strict';

	var after = (func, action, ...args) => {
	    return (...rest) => {
	        const result = func(...rest);
	        action(...args);
	        return result;
	    };
	};

	var before = (func, action, ...args) => {
	    return (...rest) => {
	        action(...args);
	        return func(...rest);
	    };
	};

	var curry = (func) => {
	    const args = [];
	    const fn = (...rest) => {
	        if (rest.length) {
	            for (const item of rest) {
	                args.push(item);
	            }
	            return fn;
	        }
	        else {
	            return func(...args);
	        }
	    };
	    return fn;
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

	const set = new Set();
	const deep = (obj) => {
	    const propNames = Object.getOwnPropertyNames(obj);
	    propNames.forEach((name) => {
	        const prop = obj[name];
	        if (typeof prop === "object" && prop !== null && !set.has(prop)) {
	            set.add(prop);
	            deep(prop);
	        }
	    });
	    return Object.freeze(obj);
	};
	const freezeDeep = (obj) => {
	    set.clear();
	    return deep(obj);
	};

	const SINGLETON_KEY = Symbol("single key");
	const singleton = (classTarget) => {
	    return new Proxy(classTarget, {
	        construct(target, argumentsList, newTarget) {
	            if (target.prototype !== newTarget.prototype) {
	                return Reflect.construct(target, argumentsList, newTarget);
	            }
	            if (!target[SINGLETON_KEY]) {
	                target[SINGLETON_KEY] = Reflect.construct(target, argumentsList, newTarget);
	            }
	            return target[SINGLETON_KEY];
	        }
	    });
	};
	singleton.INSTANCE = SINGLETON_KEY;

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
	exports.curry = curry;
	exports.debounce = debounce;
	exports.freezeDeep = freezeDeep;
	exports.singleton = singleton;
	exports.throttle = throttle;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=Ghost.js.map
