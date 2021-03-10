(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Ghost = {}));
}(this, (function (exports) { 'use strict';

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */

	function __values(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	}

	function __read(o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	}

	function __spreadArray(to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	}

	var after = (function (func, action) {
	    var args = [];
	    for (var _i = 2; _i < arguments.length; _i++) {
	        args[_i - 2] = arguments[_i];
	    }
	    return function () {
	        var rest = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            rest[_i] = arguments[_i];
	        }
	        var result = func.apply(void 0, __spreadArray([], __read(rest)));
	        action.apply(void 0, __spreadArray([], __read(args)));
	        return result;
	    };
	});

	var before = (function (func, action) {
	    var args = [];
	    for (var _i = 2; _i < arguments.length; _i++) {
	        args[_i - 2] = arguments[_i];
	    }
	    return function () {
	        var rest = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            rest[_i] = arguments[_i];
	        }
	        action.apply(void 0, __spreadArray([], __read(args)));
	        return func.apply(void 0, __spreadArray([], __read(rest)));
	    };
	});

	var curry = (function (func) {
	    var args = [];
	    var fn = function () {
	        var e_1, _a;
	        var rest = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            rest[_i] = arguments[_i];
	        }
	        if (rest.length) {
	            try {
	                for (var rest_1 = __values(rest), rest_1_1 = rest_1.next(); !rest_1_1.done; rest_1_1 = rest_1.next()) {
	                    var item = rest_1_1.value;
	                    args.push(item);
	                }
	            }
	            catch (e_1_1) { e_1 = { error: e_1_1 }; }
	            finally {
	                try {
	                    if (rest_1_1 && !rest_1_1.done && (_a = rest_1.return)) _a.call(rest_1);
	                }
	                finally { if (e_1) throw e_1.error; }
	            }
	            return fn;
	        }
	        else {
	            return func.apply(void 0, __spreadArray([], __read(args)));
	        }
	    };
	    return fn;
	});

	var debounce = (function (func, wait) {
	    if (!wait) {
	        return func;
	    }
	    var id;
	    return function () {
	        var rest = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            rest[_i] = arguments[_i];
	        }
	        return new Promise(function (resolve) {
	            if (id !== undefined) {
	                clearTimeout(id);
	                id = undefined;
	            }
	            id = window.setTimeout(function () {
	                resolve(func.apply(void 0, __spreadArray([], __read(rest))));
	            }, wait);
	        });
	    };
	});

	var set = new Set();
	var deep = function (obj) {
	    var propNames = Object.getOwnPropertyNames(obj);
	    propNames.forEach(function (name) {
	        var prop = obj[name];
	        if (typeof prop === "object" && prop !== null && !set.has(prop)) {
	            set.add(prop);
	            deep(prop);
	        }
	    });
	    return Object.freeze(obj);
	};
	var freezeDeep = function (obj) {
	    set.clear();
	    return deep(obj);
	};

	var SINGLETON_KEY = Symbol("single key");
	var singleton = function (classTarget) {
	    return new Proxy(classTarget, {
	        construct: function (target, argumentsList, newTarget) {
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

	var throttle = (function (func, wait) {
	    var pre = Date.now();
	    var now;
	    return function () {
	        var rest = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            rest[_i] = arguments[_i];
	        }
	        now = Date.now();
	        if (now - pre >= wait) {
	            func.apply(void 0, __spreadArray([], __read(rest)));
	            pre = Date.now();
	        }
	    };
	});

	exports.after = after;
	exports.before = before;
	exports.curry = curry;
	exports.debounce = debounce;
	exports.freezeDeep = freezeDeep;
	exports.singleton = singleton;
	exports.throttle = throttle;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=Ghost.legacy.js.map
