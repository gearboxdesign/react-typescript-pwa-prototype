/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export log */
/* harmony export (immutable) */ __webpack_exports__["a"] = info;
/* unused harmony export error */

// tslint:disable no-console
function log() {
    var content = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        content[_i] = arguments[_i];
    }
    return function (data) {
        console.log.apply(console, content.concat([data]));
        return data;
    };
}
function info() {
    var content = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        content[_i] = arguments[_i];
    }
    return function (data) {
        console.info.apply(console, content.concat([data]));
        return data;
    };
}
function error() {
    var content = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        content[_i] = arguments[_i];
    }
    return function (data) {
        console.error.apply(console, content.concat([data]));
        return data;
    };
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = validateResponse;

function validateResponse(response) {
    if (!response) {
        throw new Error('Response is undefined');
    }
    if (response.status >= 200 && response.status < 300 || response.status === 0) {
        return response;
    }
    throw new Error(response.statusText);
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_events_activate__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_events_install__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_events_intercept__ = __webpack_require__(5);

// tslint:disable no-console



var sw = self;
sw.addEventListener('install', __WEBPACK_IMPORTED_MODULE_1_events_install__["a" /* default */]);
sw.addEventListener('activate', __WEBPACK_IMPORTED_MODULE_0_events_activate__["a" /* default */]);
sw.addEventListener('fetch', __WEBPACK_IMPORTED_MODULE_2_events_intercept__["a" /* default */]);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = activate;

// tslint:disable no-console
var sw = self;
function activate(evt) {
    console.info('SW activated');
    evt.waitUntil(clearPreviousCaches()
        .then(function () { return sw.clients.claim(); }));
}
// TODO: Promise array contents type.
function clearPreviousCaches() {
    var cacheWhitelist = Object.values({"ASSET_CACHE":"asset-cache-5ad7fc50-e48f-11e7-b693-7f2d43cf24fa","API_CACHE":"api-cache-5ad7fc50-e48f-11e7-b693-7f2d43cf24fa","BASE_CACHE":"index-cache-5ad7fc50-e48f-11e7-b693-7f2d43cf24fa"});
    return caches.keys()
        .then(function (cacheKeys) {
        return Promise.all(cacheKeys.map(function (cacheKey) {
            if (!cacheWhitelist.includes(cacheKey)) {
                return caches.delete(cacheKey);
            }
        }));
    });
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = install;

// tslint:disable no-console
var sw = self;
function install(evt) {
    console.info('SW installed');
    evt.waitUntil(Promise.all([
        cacheBase(),
        cacheAssets()
    ])
        .then(function () { return sw.skipWaiting(); }));
}
function cacheBase() {
    return caches.open({"ASSET_CACHE":"asset-cache-5ad7fc50-e48f-11e7-b693-7f2d43cf24fa","API_CACHE":"api-cache-5ad7fc50-e48f-11e7-b693-7f2d43cf24fa","BASE_CACHE":"index-cache-5ad7fc50-e48f-11e7-b693-7f2d43cf24fa"}.BASE_CACHE)
        .then(function (cache) {
        cache.add('/');
    });
}
function cacheAssets() {
    return Promise.all([
        caches.open({"ASSET_CACHE":"asset-cache-5ad7fc50-e48f-11e7-b693-7f2d43cf24fa","API_CACHE":"api-cache-5ad7fc50-e48f-11e7-b693-7f2d43cf24fa","BASE_CACHE":"index-cache-5ad7fc50-e48f-11e7-b693-7f2d43cf24fa"}.ASSET_CACHE),
        fetch(/public/ + "asset-manifest.json").then(function (response) { return response.json(); })
    ])
        .then(function (_a) {
        var cache = _a[0], manifest = _a[1];
        cache.addAll(Object.values(manifest));
    });
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = intercept;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_strategies_fromCache__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_strategies_fromNetwork__ = __webpack_require__(8);

// tslint:disable no-console


var sw = self;
var SIDE_EFFECT_VERBS = ['POST', 'PUT', 'DELETE'];
function intercept(evt) {
    console.info('SW intercept', evt.request.url);
    var request = evt.request;
    // TODO: Review this flow.
    // NOTE: Since SW only has scope on this domain, external requests would be unaffected.
    // NOTE: Order is important here, consider with caution.
    var strategy = 
    // NOTE: Case - Request has a side effect, (i.e. POST, PUT or DELETE method).
    hasSideEffect(request) ? fetch(request) :
        // NOTE: Case - Request is directed towards the API.
        isAPIRequest(request) ? caches.open({"ASSET_CACHE":"asset-cache-5ad7fc50-e48f-11e7-b693-7f2d43cf24fa","API_CACHE":"api-cache-5ad7fc50-e48f-11e7-b693-7f2d43cf24fa","BASE_CACHE":"index-cache-5ad7fc50-e48f-11e7-b693-7f2d43cf24fa"}.API_CACHE)
            .then(function (cache) { return Object(__WEBPACK_IMPORTED_MODULE_1_strategies_fromNetwork__["a" /* default */])(evt, cache, { setCache: true }); })
            .catch(jsonErrorHandler) :
            // NOTE: Case - Request is for a static asset, (i.e. has an extension signifiying it is a file).
            isAsset(request) ? caches.open({"ASSET_CACHE":"asset-cache-5ad7fc50-e48f-11e7-b693-7f2d43cf24fa","API_CACHE":"api-cache-5ad7fc50-e48f-11e7-b693-7f2d43cf24fa","BASE_CACHE":"index-cache-5ad7fc50-e48f-11e7-b693-7f2d43cf24fa"}.ASSET_CACHE)
                .then(function (cache) { return Object(__WEBPACK_IMPORTED_MODULE_0_strategies_fromCache__["a" /* default */])(evt, cache); }) :
                // NOTE: Case - Request likely a standard route which must return the base route response.
                isRoute(request) ? caches.open({"ASSET_CACHE":"asset-cache-5ad7fc50-e48f-11e7-b693-7f2d43cf24fa","API_CACHE":"api-cache-5ad7fc50-e48f-11e7-b693-7f2d43cf24fa","BASE_CACHE":"index-cache-5ad7fc50-e48f-11e7-b693-7f2d43cf24fa"}.BASE_CACHE)
                    .then(function (cache) { return Object(__WEBPACK_IMPORTED_MODULE_0_strategies_fromCache__["a" /* default */])(evt, cache, { cacheKey: '/' }); }) :
                    // NOTE: Case - Default pass through of network request.
                    fetch(request);
    evt.respondWith(strategy);
}
function isRoute(req) {
    return !isAsset(req);
}
function isAsset(req) {
    // TODO: Test this RegEx for edge cases.
    return /(\.\w+)$/.test(req.url);
}
function isAPIRequest(req) {
    return /\/api\//.test(req.url);
}
function hasSideEffect(req) {
    return SIDE_EFFECT_VERBS.includes(req.method);
}
function jsonErrorHandler(error) {
    return new Response(JSON.stringify({
        errors: [navigator.onLine ? 'Not Found' : 'This resource is unavailable offline, please try again later.']
    }), {
        headers: { 'Content-Type': 'application/json' },
        status: 404,
        statusText: 'Not Found'
    });
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fromCache;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_logger__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lib_passThrough__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_strategies_lib_validateResponse__ = __webpack_require__(1);

// tslint:disable no-console



function fromCache(evt, cache, options) {
    if (options === void 0) { options = {
        cacheKey: false,
        updateCache: true
    }; }
    var request = evt.request, cacheKey = options.cacheKey || request;
    return cache.match(cacheKey)
        .then(__WEBPACK_IMPORTED_MODULE_2_strategies_lib_validateResponse__["a" /* default */])
        .then(__WEBPACK_IMPORTED_MODULE_0_lib_logger__["a" /* info */]('SW cached response'))
        .catch(function (error) {
        return fetch(request)
            .then(__WEBPACK_IMPORTED_MODULE_2_strategies_lib_validateResponse__["a" /* default */])
            .then(options.updateCache ? function (response) {
            cache.put(cacheKey, response.clone());
            __WEBPACK_IMPORTED_MODULE_0_lib_logger__["a" /* info */]('SW network response')(response);
            return response;
        } : __WEBPACK_IMPORTED_MODULE_1_lib_passThrough__["a" /* default */]);
    });
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

var passThrough = function (data) { return data; };
/* harmony default export */ __webpack_exports__["a"] = (passThrough);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fromNetwork;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_logger__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_strategies_lib_validateResponse__ = __webpack_require__(1);

// tslint:disable no-console


function fromNetwork(evt, cache, options) {
    if (options === void 0) { options = {
        setCache: false
    }; }
    var request = evt.request;
    return fetch(request)
        .then(function (response) {
        try {
            Object(__WEBPACK_IMPORTED_MODULE_1_strategies_lib_validateResponse__["a" /* default */])(response);
            if (options.setCache) {
                cache.put(request, response.clone());
                __WEBPACK_IMPORTED_MODULE_0_lib_logger__["a" /* info */]('SW network response')(response);
            }
            return response;
        }
        catch (error) {
            return cache.match(request)
                .then(__WEBPACK_IMPORTED_MODULE_1_strategies_lib_validateResponse__["a" /* default */])
                .then(__WEBPACK_IMPORTED_MODULE_0_lib_logger__["a" /* info */]('SW cached response'))
                .catch(function () {
                /**
                 * TODO: Consider whether or not this should ultimately reject with the response,
                 * 	This would mean the error handler would need to sniff the type, either a Response or Error
                 * 	and react accordingly, perhaps this would not best practice?
                 */
                // return Promise.reject(response);
                return response;
            });
        }
    });
}


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2Q2ZTI2M2Q2OGM3MDk0ZjRkY2MiLCJ3ZWJwYWNrOi8vLy4vc3cvbGliL2xvZ2dlci50cyIsIndlYnBhY2s6Ly8vLi9zdy9zdHJhdGVnaWVzL2xpYi92YWxpZGF0ZVJlc3BvbnNlLnRzIiwid2VicGFjazovLy8uL3N3L2luZGV4LnRzIiwid2VicGFjazovLy8uL3N3L2V2ZW50cy9hY3RpdmF0ZS50cyIsIndlYnBhY2s6Ly8vLi9zdy9ldmVudHMvaW5zdGFsbC50cyIsIndlYnBhY2s6Ly8vLi9zdy9ldmVudHMvaW50ZXJjZXB0LnRzIiwid2VicGFjazovLy8uL3N3L3N0cmF0ZWdpZXMvZnJvbUNhY2hlLnRzIiwid2VicGFjazovLy8uL3N3L2xpYi9wYXNzVGhyb3VnaC50cyIsIndlYnBhY2s6Ly8vLi9zdy9zdHJhdGVnaWVzL2Zyb21OZXR3b3JrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDN0RBLDRCQUE0QjtBQUN0QjtJQUFjLGlCQUFpQjtTQUFqQixVQUFpQixFQUFqQixxQkFBaUIsRUFBakIsSUFBaUI7UUFBakIsNEJBQWlCOztJQUVwQyxNQUFNLENBQUMsVUFBUyxJQUFXO1FBRTFCLE9BQU8sQ0FBQyxHQUFHLE9B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LENBQUMsZ0ZBQWdCLENBQUM7aUJBQ3RCLElBQUksQ0FBQyx3REFBVyxDQUFDLG9CQUFvQixDQUFDLENBQUM7aUJBQ3ZDLEtBQUssQ0FBQztnQkFFTjs7OzttQkFJRztnQkFDSCxtQ0FBbUM7Z0JBQ25DLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDakIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0YsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDIiwiZmlsZSI6InN3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgY2Q2ZTI2M2Q2OGM3MDk0ZjRkY2MiLCIvLyB0c2xpbnQ6ZGlzYWJsZSBuby1jb25zb2xlXG5leHBvcnQgZnVuY3Rpb24gbG9nKC4uLmNvbnRlbnQ6IGFueVtdKSB7XG5cblx0cmV0dXJuIDxURGF0YT4gKGRhdGE6IFREYXRhKTogVERhdGEgPT4ge1xuXG5cdFx0Y29uc29sZS5sb2coLi4uY29udGVudCwgZGF0YSk7XG5cblx0XHRyZXR1cm4gZGF0YTtcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluZm8oLi4uY29udGVudDogYW55W10pIHtcblxuXHRyZXR1cm4gPFREYXRhPiAoZGF0YTogVERhdGEpOiBURGF0YSA9PiB7XG5cblx0XHRjb25zb2xlLmluZm8oLi4uY29udGVudCwgZGF0YSk7XG5cblx0XHRyZXR1cm4gZGF0YTtcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVycm9yKC4uLmNvbnRlbnQ6IGFueVtdKSB7XG5cblx0cmV0dXJuIDxURGF0YT4gKGRhdGE6IFREYXRhKTogVERhdGEgPT4ge1xuXG5cdFx0Y29uc29sZS5lcnJvciguLi5jb250ZW50LCBkYXRhKTtcblxuXHRcdHJldHVybiBkYXRhO1xuXHR9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3cvbGliL2xvZ2dlci50cyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZhbGlkYXRlUmVzcG9uc2UocmVzcG9uc2U/OiBSZXNwb25zZSk6IFJlc3BvbnNlIHtcblxuXHRpZiAoIXJlc3BvbnNlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdSZXNwb25zZSBpcyB1bmRlZmluZWQnKTtcblx0fVxuXG5cdGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMjAwICYmIHJlc3BvbnNlLnN0YXR1cyA8IDMwMCB8fCByZXNwb25zZS5zdGF0dXMgPT09IDApIHtcblx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdH1cblxuXHR0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zdy9zdHJhdGVnaWVzL2xpYi92YWxpZGF0ZVJlc3BvbnNlLnRzIiwiLy8gdHNsaW50OmRpc2FibGUgbm8tY29uc29sZVxuaW1wb3J0IGFjdGl2YXRlIGZyb20gJ2V2ZW50cy9hY3RpdmF0ZSc7XG5pbXBvcnQgaW5zdGFsbCBmcm9tICdldmVudHMvaW5zdGFsbCc7XG5pbXBvcnQgaW50ZXJjZXB0IGZyb20gJ2V2ZW50cy9pbnRlcmNlcHQnO1xuXG5jb25zdCBzdyA9IHNlbGYgYXMgU2VydmljZVdvcmtlckdsb2JhbFNjb3BlO1xuXG5zdy5hZGRFdmVudExpc3RlbmVyKCdpbnN0YWxsJywgaW5zdGFsbCk7XG5zdy5hZGRFdmVudExpc3RlbmVyKCdhY3RpdmF0ZScsIGFjdGl2YXRlKTtcbnN3LmFkZEV2ZW50TGlzdGVuZXIoJ2ZldGNoJywgaW50ZXJjZXB0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3N3L2luZGV4LnRzIiwiLy8gdHNsaW50OmRpc2FibGUgbm8tY29uc29sZVxuY29uc3Qgc3cgPSBzZWxmIGFzIFNlcnZpY2VXb3JrZXJHbG9iYWxTY29wZTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWN0aXZhdGUoZXZ0OiBFeHRlbmRhYmxlRXZlbnQpIHtcblxuXHRjb25zb2xlLmluZm8oJ1NXIGFjdGl2YXRlZCcpO1xuXG5cdGV2dC53YWl0VW50aWwoY2xlYXJQcmV2aW91c0NhY2hlcygpXG5cdFx0LnRoZW4oKCkgPT4gc3cuY2xpZW50cy5jbGFpbSgpKVxuXHQpO1xufVxuXG4vLyBUT0RPOiBQcm9taXNlIGFycmF5IGNvbnRlbnRzIHR5cGUuXG5mdW5jdGlvbiBjbGVhclByZXZpb3VzQ2FjaGVzKCk6IFByb21pc2U8YW55W10+IHtcblxuXHRjb25zdCBjYWNoZVdoaXRlbGlzdDogc3RyaW5nW10gPSBPYmplY3QudmFsdWVzKENBQ0hFX05BTUVTKTtcblxuXHRyZXR1cm4gY2FjaGVzLmtleXMoKVxuXHRcdC50aGVuKChjYWNoZUtleXMpID0+IHtcblxuXHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKGNhY2hlS2V5cy5tYXAoKGNhY2hlS2V5KSA9PiB7XG5cblx0XHRcdFx0aWYgKCFjYWNoZVdoaXRlbGlzdC5pbmNsdWRlcyhjYWNoZUtleSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gY2FjaGVzLmRlbGV0ZShjYWNoZUtleSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pKTtcblx0XHR9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3N3L2V2ZW50cy9hY3RpdmF0ZS50cyIsIi8vIHRzbGludDpkaXNhYmxlIG5vLWNvbnNvbGVcbmNvbnN0IHN3ID0gc2VsZiBhcyBTZXJ2aWNlV29ya2VyR2xvYmFsU2NvcGU7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluc3RhbGwoZXZ0OiBFeHRlbmRhYmxlRXZlbnQpIHtcblxuXHRjb25zb2xlLmluZm8oJ1NXIGluc3RhbGxlZCcpO1xuXG5cdGV2dC53YWl0VW50aWwoXG5cdFx0UHJvbWlzZS5hbGwoW1xuXHRcdFx0Y2FjaGVCYXNlKCksXG5cdFx0XHRjYWNoZUFzc2V0cygpXG5cdFx0XSlcblx0XHQudGhlbigoKSA9PiBzdy5za2lwV2FpdGluZygpKVxuXHQpO1xufVxuXG5mdW5jdGlvbiBjYWNoZUJhc2UoKTogUHJvbWlzZTx2b2lkPiB7XG5cblx0cmV0dXJuIGNhY2hlcy5vcGVuKENBQ0hFX05BTUVTLkJBU0VfQ0FDSEUpXG5cdFx0LnRoZW4oKGNhY2hlKSA9PiB7XG5cdFx0XHRjYWNoZS5hZGQoJy8nKTtcblx0XHR9KTtcbn1cblxuZnVuY3Rpb24gY2FjaGVBc3NldHMoKTogUHJvbWlzZTx2b2lkPiB7XG5cblx0cmV0dXJuIFByb21pc2UuYWxsKFtcblx0XHRjYWNoZXMub3BlbihDQUNIRV9OQU1FUy5BU1NFVF9DQUNIRSksXG5cdFx0ZmV0Y2goYCR7IFBVQkxJQ19QQVRIIH1hc3NldC1tYW5pZmVzdC5qc29uYCkudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcblx0XSlcblx0LnRoZW4oKFtjYWNoZSwgbWFuaWZlc3RdKSA9PiB7XG5cdFx0Y2FjaGUuYWRkQWxsKE9iamVjdC52YWx1ZXMobWFuaWZlc3QpKTtcblx0fSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zdy9ldmVudHMvaW5zdGFsbC50cyIsIi8vIHRzbGludDpkaXNhYmxlIG5vLWNvbnNvbGVcbmltcG9ydCBmcm9tQ2FjaGUgZnJvbSAnc3RyYXRlZ2llcy9mcm9tQ2FjaGUnO1xuaW1wb3J0IGZyb21OZXR3b3JrIGZyb20gJ3N0cmF0ZWdpZXMvZnJvbU5ldHdvcmsnO1xuXG5jb25zdCBzdyA9IHNlbGYgYXMgU2VydmljZVdvcmtlckdsb2JhbFNjb3BlO1xuXG5jb25zdCBTSURFX0VGRkVDVF9WRVJCUzogc3RyaW5nW10gPSBbJ1BPU1QnLCAnUFVUJywgJ0RFTEVURSddO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbnRlcmNlcHQoZXZ0OiBGZXRjaEV2ZW50KSB7XG5cblx0Y29uc29sZS5pbmZvKCdTVyBpbnRlcmNlcHQnLCBldnQucmVxdWVzdC51cmwpO1xuXG5cdGNvbnN0IHsgcmVxdWVzdCB9ID0gZXZ0O1xuXG5cdC8vIFRPRE86IFJldmlldyB0aGlzIGZsb3cuXG5cdC8vIE5PVEU6IFNpbmNlIFNXIG9ubHkgaGFzIHNjb3BlIG9uIHRoaXMgZG9tYWluLCBleHRlcm5hbCByZXF1ZXN0cyB3b3VsZCBiZSB1bmFmZmVjdGVkLlxuXHQvLyBOT1RFOiBPcmRlciBpcyBpbXBvcnRhbnQgaGVyZSwgY29uc2lkZXIgd2l0aCBjYXV0aW9uLlxuXHRjb25zdCBzdHJhdGVneSA9XG5cdFx0Ly8gTk9URTogQ2FzZSAtIFJlcXVlc3QgaGFzIGEgc2lkZSBlZmZlY3QsIChpLmUuIFBPU1QsIFBVVCBvciBERUxFVEUgbWV0aG9kKS5cblx0XHRoYXNTaWRlRWZmZWN0KHJlcXVlc3QpID8gZmV0Y2gocmVxdWVzdCkgOlxuXHRcdC8vIE5PVEU6IENhc2UgLSBSZXF1ZXN0IGlzIGRpcmVjdGVkIHRvd2FyZHMgdGhlIEFQSS5cblx0XHRpc0FQSVJlcXVlc3QocmVxdWVzdCkgPyBjYWNoZXMub3BlbihDQUNIRV9OQU1FUy5BUElfQ0FDSEUpXG5cdFx0XHQudGhlbigoY2FjaGUpID0+IGZyb21OZXR3b3JrKGV2dCwgY2FjaGUsIHsgc2V0Q2FjaGU6IHRydWUgfSkpXG5cdFx0XHQvLyBOT1RFOiBDYXNlIC0gUmVxdWVzdCBjYW5ub3QgYmUgc2F0aXNpZmVkIGZyb20gbmV0d29yayBvciBjYWNoZS5cblx0XHRcdC5jYXRjaChqc29uRXJyb3JIYW5kbGVyKSA6XG5cdFx0Ly8gTk9URTogQ2FzZSAtIFJlcXVlc3QgaXMgZm9yIGEgc3RhdGljIGFzc2V0LCAoaS5lLiBoYXMgYW4gZXh0ZW5zaW9uIHNpZ25pZml5aW5nIGl0IGlzIGEgZmlsZSkuXG5cdFx0aXNBc3NldChyZXF1ZXN0KSA/IGNhY2hlcy5vcGVuKENBQ0hFX05BTUVTLkFTU0VUX0NBQ0hFKVxuXHRcdFx0LnRoZW4oKGNhY2hlKSA9PiBmcm9tQ2FjaGUoZXZ0LCBjYWNoZSkpIDpcblx0XHQvLyBOT1RFOiBDYXNlIC0gUmVxdWVzdCBsaWtlbHkgYSBzdGFuZGFyZCByb3V0ZSB3aGljaCBtdXN0IHJldHVybiB0aGUgYmFzZSByb3V0ZSByZXNwb25zZS5cblx0XHRpc1JvdXRlKHJlcXVlc3QpID8gY2FjaGVzLm9wZW4oQ0FDSEVfTkFNRVMuQkFTRV9DQUNIRSlcblx0XHRcdC50aGVuKChjYWNoZSkgPT4gZnJvbUNhY2hlKGV2dCwgY2FjaGUsIHsgY2FjaGVLZXk6ICcvJyB9KSkgOlxuXHRcdC8vIE5PVEU6IENhc2UgLSBEZWZhdWx0IHBhc3MgdGhyb3VnaCBvZiBuZXR3b3JrIHJlcXVlc3QuXG5cdFx0ZmV0Y2gocmVxdWVzdCk7XG5cblx0ZXZ0LnJlc3BvbmRXaXRoKHN0cmF0ZWd5KTtcbn1cblxuZnVuY3Rpb24gaXNSb3V0ZShyZXE6IFJlcXVlc3QpOiBib29sZWFuIHtcblx0cmV0dXJuICFpc0Fzc2V0KHJlcSk7XG59XG5cbmZ1bmN0aW9uIGlzQXNzZXQocmVxOiBSZXF1ZXN0KTogYm9vbGVhbiB7XG5cdC8vIFRPRE86IFRlc3QgdGhpcyBSZWdFeCBmb3IgZWRnZSBjYXNlcy5cblx0cmV0dXJuIC8oXFwuXFx3KykkLy50ZXN0KHJlcS51cmwpO1xufVxuXG5mdW5jdGlvbiBpc0FQSVJlcXVlc3QocmVxOiBSZXF1ZXN0KTogYm9vbGVhbiB7XG5cdHJldHVybiAvXFwvYXBpXFwvLy50ZXN0KHJlcS51cmwpO1xufVxuXG5mdW5jdGlvbiBoYXNTaWRlRWZmZWN0KHJlcTogUmVxdWVzdCk6IGJvb2xlYW4ge1xuXHRyZXR1cm4gU0lERV9FRkZFQ1RfVkVSQlMuaW5jbHVkZXMocmVxLm1ldGhvZCk7XG59XG5cbmZ1bmN0aW9uIGpzb25FcnJvckhhbmRsZXIoZXJyb3IpIHtcblxuXHRyZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHtcblx0XHRlcnJvcnM6IFtuYXZpZ2F0b3Iub25MaW5lID8gJ05vdCBGb3VuZCcgOiAnVGhpcyByZXNvdXJjZSBpcyB1bmF2YWlsYWJsZSBvZmZsaW5lLCBwbGVhc2UgdHJ5IGFnYWluIGxhdGVyLiddXG5cdH0pLCB7XG5cdFx0aGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG5cdFx0c3RhdHVzOiA0MDQsXG5cdFx0c3RhdHVzVGV4dDogJ05vdCBGb3VuZCdcblx0fSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zdy9ldmVudHMvaW50ZXJjZXB0LnRzIiwiLy8gdHNsaW50OmRpc2FibGUgbm8tY29uc29sZVxuaW1wb3J0ICogYXMgbG9nZ2VyIGZyb20gJ2xpYi9sb2dnZXInO1xuaW1wb3J0IHBhc3NUaHJvdWdoIGZyb20gJ2xpYi9wYXNzVGhyb3VnaCc7XG5pbXBvcnQgdmFsaWRhdGVSZXNwb25zZSBmcm9tICdzdHJhdGVnaWVzL2xpYi92YWxpZGF0ZVJlc3BvbnNlJztcblxuaW50ZXJmYWNlIElSZXF1ZXN0RnJvbUNhY2hlT3B0aW9ucyB7XG5cdHVwZGF0ZUNhY2hlPzogYm9vbGVhbjtcblx0Y2FjaGVLZXk/OiBib29sZWFuIHwgc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmcm9tQ2FjaGUoZXZ0OiBGZXRjaEV2ZW50LCBjYWNoZTogQ2FjaGUsIG9wdGlvbnM6IElSZXF1ZXN0RnJvbUNhY2hlT3B0aW9ucyA9IHtcblx0Y2FjaGVLZXk6IGZhbHNlLFxuXHR1cGRhdGVDYWNoZTogdHJ1ZVxufSk6IFByb21pc2U8UmVzcG9uc2U+IHtcblxuXHRjb25zdCB7IHJlcXVlc3QgfSA9IGV2dCxcblx0XHRjYWNoZUtleTogc3RyaW5nIHwgUmVxdWVzdCA9IG9wdGlvbnMuY2FjaGVLZXkgYXMgc3RyaW5nIHx8IHJlcXVlc3Q7XG5cblx0cmV0dXJuIGNhY2hlLm1hdGNoKGNhY2hlS2V5KVxuXHRcdC50aGVuKHZhbGlkYXRlUmVzcG9uc2UpXG5cdFx0LnRoZW4obG9nZ2VyLmluZm8oJ1NXIGNhY2hlZCByZXNwb25zZScpKVxuXHRcdC5jYXRjaCgoZXJyb3IpID0+IHtcblxuXHRcdFx0cmV0dXJuIGZldGNoKHJlcXVlc3QpXG5cdFx0XHRcdC50aGVuKHZhbGlkYXRlUmVzcG9uc2UpXG5cdFx0XHRcdC50aGVuKG9wdGlvbnMudXBkYXRlQ2FjaGUgPyAocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XG5cblx0XHRcdFx0XHRjYWNoZS5wdXQoY2FjaGVLZXksIHJlc3BvbnNlLmNsb25lKCkpO1xuXHRcdFx0XHRcdGxvZ2dlci5pbmZvKCdTVyBuZXR3b3JrIHJlc3BvbnNlJykocmVzcG9uc2UpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHRcdFx0XHR9IDogcGFzc1Rocm91Z2gpO1xuXHRcdH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3cvc3RyYXRlZ2llcy9mcm9tQ2FjaGUudHMiLCJjb25zdCBwYXNzVGhyb3VnaCA9IChkYXRhOiBhbnkpID0+IGRhdGE7XG5cbmV4cG9ydCBkZWZhdWx0IHBhc3NUaHJvdWdoO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3cvbGliL3Bhc3NUaHJvdWdoLnRzIiwiLy8gdHNsaW50OmRpc2FibGUgbm8tY29uc29sZVxuaW1wb3J0ICogYXMgbG9nZ2VyIGZyb20gJ2xpYi9sb2dnZXInO1xuaW1wb3J0IHBhc3NUaHJvdWdoIGZyb20gJ2xpYi9wYXNzVGhyb3VnaCc7XG5pbXBvcnQgdmFsaWRhdGVSZXNwb25zZSBmcm9tICdzdHJhdGVnaWVzL2xpYi92YWxpZGF0ZVJlc3BvbnNlJztcblxuaW50ZXJmYWNlIElSZXF1ZXN0RnJvbU5ldHdvcmtPcHRpb25zIHtcblx0c2V0Q2FjaGU6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZyb21OZXR3b3JrKGV2dDogRmV0Y2hFdmVudCwgY2FjaGU6IENhY2hlLCBvcHRpb25zOiBJUmVxdWVzdEZyb21OZXR3b3JrT3B0aW9ucyA9IHtcblx0c2V0Q2FjaGU6IGZhbHNlXG59KTogUHJvbWlzZTxSZXNwb25zZT4ge1xuXG5cdGNvbnN0IHsgcmVxdWVzdCB9ID0gZXZ0O1xuXG5cdHJldHVybiBmZXRjaChyZXF1ZXN0KVxuXHRcdC50aGVuKChyZXNwb25zZTogUmVzcG9uc2UpID0+IHtcblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dmFsaWRhdGVSZXNwb25zZShyZXNwb25zZSk7XG5cblx0XHRcdFx0aWYgKG9wdGlvbnMuc2V0Q2FjaGUpIHtcblxuXHRcdFx0XHRcdGNhY2hlLnB1dChyZXF1ZXN0LCByZXNwb25zZS5jbG9uZSgpKTtcblx0XHRcdFx0XHRsb2dnZXIuaW5mbygnU1cgbmV0d29yayByZXNwb25zZScpKHJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiByZXNwb25zZTtcblx0XHRcdH1cblx0XHRcdGNhdGNoIChlcnJvcikge1xuXG5cdFx0XHRcdHJldHVybiBjYWNoZS5tYXRjaChyZXF1ZXN0KVxuXHRcdFx0XHRcdC50aGVuKHZhbGlkYXRlUmVzcG9uc2UpXG5cdFx0XHRcdFx0LnRoZW4obG9nZ2VyLmluZm8oJ1NXIGNhY2hlZCByZXNwb25zZScpKVxuXHRcdFx0XHRcdC5jYXRjaCgoKSA9PiB7XG5cblx0XHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdFx0ICogVE9ETzogQ29uc2lkZXIgd2hldGhlciBvciBub3QgdGhpcyBzaG91bGQgdWx0aW1hdGVseSByZWplY3Qgd2l0aCB0aGUgcmVzcG9uc2UsXG5cdFx0XHRcdFx0XHQgKiBcdFRoaXMgd291bGQgbWVhbiB0aGUgZXJyb3IgaGFuZGxlciB3b3VsZCBuZWVkIHRvIHNuaWZmIHRoZSB0eXBlLCBlaXRoZXIgYSBSZXNwb25zZSBvciBFcnJvclxuXHRcdFx0XHRcdFx0ICogXHRhbmQgcmVhY3QgYWNjb3JkaW5nbHksIHBlcmhhcHMgdGhpcyB3b3VsZCBub3QgYmVzdCBwcmFjdGljZT9cblx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0Ly8gcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcblx0XHRcdFx0XHRcdHJldHVybiByZXNwb25zZTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3N3L3N0cmF0ZWdpZXMvZnJvbU5ldHdvcmsudHMiXSwic291cmNlUm9vdCI6IiJ9