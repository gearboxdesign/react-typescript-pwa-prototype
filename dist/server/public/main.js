webpackJsonp([0],{

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getAsyncState;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);


// tslint:disable-next-line max-line-length
function getAsyncState(action, state, mergeState) {
    if (mergeState === void 0) { mergeState = false; }
    var actionData = Object(__WEBPACK_IMPORTED_MODULE_0_lodash__["get"])(action, 'data', null), actionError = Object(__WEBPACK_IMPORTED_MODULE_0_lodash__["get"])(action, 'error', null), stateData = Object(__WEBPACK_IMPORTED_MODULE_0_lodash__["get"])(state, 'data', null), stateError = Object(__WEBPACK_IMPORTED_MODULE_0_lodash__["get"])(state, 'error', null);
    return {
        data: (actionData && (mergeState ? Object(__WEBPACK_IMPORTED_MODULE_0_lodash__["merge"])({}, stateData, actionData) : actionData)) || stateData,
        error: actionError || (actionData ? null : stateError),
        loading: !(actionData || actionError)
    };
}


/***/ }),

/***/ 270:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(273);
module.exports = __webpack_require__(298);


/***/ }),

/***/ 271:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 272:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_actions_actionCreators__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_containers_AppContainer__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_store_configureStore__ = __webpack_require__(293);







var serviceWorkerIsAvailable = Boolean('serviceWorker' in navigator) &&
    "true" === 'true', store = Object(__WEBPACK_IMPORTED_MODULE_5_store_configureStore__["a" /* default */])({
    appIsLoading: serviceWorkerIsAvailable
}), app = (__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_redux__["Provider"], { store: store },
    __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_containers_AppContainer__["a" /* default */], null)));
// NOTE: Render App
__WEBPACK_IMPORTED_MODULE_3_react_dom___default.a.render(app, document.getElementById('app'));
// TODO: Implement message relay which will trigger 'store.dispatch(loadApp(false)' once fetch intercepts are active.
if (serviceWorkerIsAvailable) {
    navigator.serviceWorker.register('/sw.js')
        .then(awaitServiceWorkerActivation)
        .then(function () { return store.dispatch(Object(__WEBPACK_IMPORTED_MODULE_0_actions_actionCreators__["b" /* loadApp */])(false)); })
        .catch(function serviceWorkerErrorHandler(error) {
        // TODO: Handle SW error.
    });
}
function awaitServiceWorkerActivation(registration) {
    return new Promise(function (resolve, reject) {
        var pendingServiceWorker = registration.installing;
        if (pendingServiceWorker) {
            var stateChangeListener_1 = function (evt) {
                if (evt.target.state === 'activated') {
                    pendingServiceWorker.removeEventListener('statechange', stateChangeListener_1);
                    return resolve(registration);
                }
            };
            pendingServiceWorker.addEventListener('statechange', stateChangeListener_1);
        }
        else {
            return resolve(registration);
        }
    });
}


/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fetchAction;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_fetchJSON__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_store_getAsyncState__ = __webpack_require__(119);



function fetchAction(dispatch, action) {
    return function (url, options) {
        if (options === void 0) { options = {}; }
        dispatchLoadingAction(dispatch, action);
        var promise = options.method === 'get' ?
            Object(__WEBPACK_IMPORTED_MODULE_0_lib_fetchJSON__["a" /* getJSON */])(url, options) :
            Object(__WEBPACK_IMPORTED_MODULE_0_lib_fetchJSON__["b" /* sendJSON */])(url, options);
        return promise
            .then(dispatchSuccessAction(dispatch, action))
            .catch(dispatchFailedAction(dispatch, action));
    };
}
function dispatchLoadingAction(dispatch, action) {
    return dispatch(Object.assign({}, action, Object(__WEBPACK_IMPORTED_MODULE_1_store_getAsyncState__["a" /* default */])()));
}
function dispatchSuccessAction(dispatch, action) {
    return function (data) {
        return dispatch(Object.assign({}, action, Object(__WEBPACK_IMPORTED_MODULE_1_store_getAsyncState__["a" /* default */])({ data: data })));
    };
}
function dispatchFailedAction(dispatch, action) {
    return function (error) {
        return dispatch(Object.assign({}, action, Object(__WEBPACK_IMPORTED_MODULE_1_store_getAsyncState__["a" /* default */])({ error: error })));
    };
}


/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getJSON;
/* harmony export (immutable) */ __webpack_exports__["b"] = sendJSON;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_errorFactory__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);



var HTTP_VERBS = {
    DELETE: 'delete',
    GET: 'get',
    POST: 'post',
    PUT: 'put'
};
var FETCH_DEFAULTS = {
    credentials: 'same-origin',
    mode: 'cors',
    redirect: 'follow'
};
function getJSON(url, options) {
    return request(url, Object(__WEBPACK_IMPORTED_MODULE_1_lodash__["merge"])({}, FETCH_DEFAULTS, {
        cache: 'default',
        headers: {
            Accept: 'application/json'
        },
        method: HTTP_VERBS.GET
    }, options));
}
function sendJSON(url, options) {
    return request(url, Object(__WEBPACK_IMPORTED_MODULE_1_lodash__["merge"])({}, FETCH_DEFAULTS, {
        headers: Object.assign({
            Accept: 'application/json'
        }, options.method && [HTTP_VERBS.POST, HTTP_VERBS.PUT].includes(options.method.toLowerCase()) && {
            'Content-Type': 'application/json'
        }),
        method: 'post'
    }, options));
}
function request(url, options) {
    return fetch(url, options).then(function (response) {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(Object(__WEBPACK_IMPORTED_MODULE_0_lib_errorFactory__["a" /* createHttpError */])(response.statusText, {
                errors: json.errors,
                status: response.status
            }));
        }, function (error) {
            return Promise.reject(Object(__WEBPACK_IMPORTED_MODULE_0_lib_errorFactory__["a" /* createHttpError */])("JSON Error: " + error.message));
        });
    }, function (error) {
        return Promise.reject(Object(__WEBPACK_IMPORTED_MODULE_0_lib_errorFactory__["a" /* createHttpError */])("Fetch Error: " + error.message));
    });
}


/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createHttpError;

function createHttpError(message, options) {
    if (options === void 0) { options = {}; }
    var status = options.status, errors = options.errors, error = new Error(message);
    if (status) {
        error.status = status;
    }
    if (errors) {
        error.errors = errors;
    }
    return error;
}


/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_App__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(30);



var mapStateToProps = function (state) {
    var appIsLoading = state.appIsLoading;
    return {
        appIsLoading: appIsLoading
    };
};
// tslint:disable-next-line max-line-length
/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps)(__WEBPACK_IMPORTED_MODULE_0_components_App__["a" /* default */]));


/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_Preloader__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_containers_MainContainer__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom__ = __webpack_require__(44);





var App = function (props) {
    var appIsLoading = props.appIsLoading;
    return appIsLoading ? __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_components_Preloader__["a" /* default */], null) : __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(AppRouter, null);
};
var AppRouter = function (props) {
    return (__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_router_dom__["BrowserRouter"], null,
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_containers_MainContainer__["a" /* default */], null)));
};
/* harmony default export */ __webpack_exports__["a"] = (App);


/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


var Preloader = function (props) {
    return (__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h1", null, "Loading")));
};
/* harmony default export */ __webpack_exports__["a"] = (Preloader);


/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_actions_actionCreators__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_Main__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router__ = __webpack_require__(7);

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};





var mapStateToProps = function (state) {
    var example = state.example, routeIsLoading = state.routeIsLoading;
    return {
        example: example,
        routeIsLoading: routeIsLoading
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        getExampleHandler: function () {
            return dispatch(Object(__WEBPACK_IMPORTED_MODULE_0_actions_actionCreators__["a" /* getExample */])());
        },
        loadRouteHandler: function (value) {
            return dispatch(Object(__WEBPACK_IMPORTED_MODULE_0_actions_actionCreators__["c" /* loadRoute */])(value));
        }
    };
};
var MainContainer = (function (_super) {
    __extends(MainContainer, _super);
    function MainContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainContainer.prototype.componentDidMount = function () {
        var _a = this.props, history = _a.history, getExampleHandler = _a.getExampleHandler;
        this.historyListener = history.listen(this.historyChangeHandler.bind(this));
        getExampleHandler();
    };
    MainContainer.prototype.componentWillUnmount = function () {
        // NOTE: Unsubscribes historyListener.
        this.historyListener();
    };
    MainContainer.prototype.historyChangeHandler = function (location) {
        var _a = this.props, currentLocation = _a.location, loadRouteHandler = _a.loadRouteHandler;
        if (location.pathname !== currentLocation.pathname) {
            loadRouteHandler(true);
        }
    };
    MainContainer.prototype.render = function () {
        var _a = this.props, loadRouteHandler = _a.loadRouteHandler, getExampleHandler = _a.getExampleHandler, restProps = __rest(_a, ["loadRouteHandler", "getExampleHandler"]);
        return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_components_Main__["a" /* default */], __assign({}, restProps));
    };
    return MainContainer;
}(__WEBPACK_IMPORTED_MODULE_2_react___default.a.Component));
// tslint:disable-next-line max-line-length
/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_4_react_router__["withRouter"])(Object(__WEBPACK_IMPORTED_MODULE_3_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(MainContainer)));


/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hoc_RouteError__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_routes__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_routes_config__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__styles_scss__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__styles_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__styles_scss__);

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};






var Main = function (props) {
    return (__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("main", { className: "main" },
        props.routeIsLoading && __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p", null, "Loading"),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["NavLink"], { to: "/" }, "Dashboard"),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["NavLink"], { to: "/monitoring/1" }, "Monitoring"),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["NavLink"], { to: "/admin" }, "Admin"),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["Switch"], null,
            __WEBPACK_IMPORTED_MODULE_4_routes_config__["a" /* default */].map(getRoute),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["Route"], { component: Object(__WEBPACK_IMPORTED_MODULE_0_hoc_RouteError__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_3_routes__["Error"], { status: 404 }) }))));
};
// TODO: Add correct type.
function getRoute(configProps) {
    var componentId = configProps.componentId, routeProps = __rest(configProps, ["componentId"]), component = componentId && __WEBPACK_IMPORTED_MODULE_3_routes__[componentId];
    if (!component) {
        throw new Error('Routes configuration is missing property "componentId"');
    }
    return (__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["Route"], __assign({ component: component, key: componentId }, routeProps)));
}
/* harmony default export */ __webpack_exports__["a"] = (Main);


/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_routes_Admin__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_routes_Dashboard__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_routes_Error__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_routes_Monitoring__ = __webpack_require__(290);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Admin", function() { return __WEBPACK_IMPORTED_MODULE_0_routes_Admin__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Dashboard", function() { return __WEBPACK_IMPORTED_MODULE_1_routes_Dashboard__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Error", function() { return __WEBPACK_IMPORTED_MODULE_2_routes_Error__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Monitoring", function() { return __WEBPACK_IMPORTED_MODULE_3_routes_Monitoring__["a"]; });








/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_AsyncComponent__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_hoc_RouteComponent__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_hoc_RouteError__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_routes_Error__ = __webpack_require__(42);

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};





var Admin = function (props) {
    return (__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_components_AsyncComponent__["a" /* default */]
    // TODO: Consider creating a utility component to avoid this repetition.
    , __assign({ 
        // TODO: Consider creating a utility component to avoid this repetition.
        errorComponent: Object(__WEBPACK_IMPORTED_MODULE_1_hoc_RouteComponent__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_2_hoc_RouteError__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_4_routes_Error__["a" /* default */], { status: 404 })), 
        // tslint:disable-next-line jsx-no-lambda
        getComponent: function () { return __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 299)); } }, props)));
};
/* harmony default export */ __webpack_exports__["a"] = (Admin);


/***/ }),

/***/ 284:
/***/ (function(module, exports, __webpack_require__) {

var _ = __webpack_require__(285).runInContext();
module.exports = __webpack_require__(286)(_, _);


/***/ }),

/***/ 285:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * @license
 * Lodash lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 */
;(function(){function n(n,t){return n.set(t[0],t[1]),n}function t(n,t){return n.add(t),n}function r(n,t,r){switch(r.length){case 0:return n.call(t);case 1:return n.call(t,r[0]);case 2:return n.call(t,r[0],r[1]);case 3:return n.call(t,r[0],r[1],r[2])}return n.apply(t,r)}function e(n,t,r,e){for(var u=-1,i=null==n?0:n.length;++u<i;){var o=n[u];t(e,o,r(o),n)}return e}function u(n,t){for(var r=-1,e=null==n?0:n.length;++r<e&&false!==t(n[r],r,n););return n}function i(n,t){for(var r=null==n?0:n.length;r--&&false!==t(n[r],r,n););
return n}function o(n,t){for(var r=-1,e=null==n?0:n.length;++r<e;)if(!t(n[r],r,n))return false;return true}function f(n,t){for(var r=-1,e=null==n?0:n.length,u=0,i=[];++r<e;){var o=n[r];t(o,r,n)&&(i[u++]=o)}return i}function c(n,t){return!(null==n||!n.length)&&-1<d(n,t,0)}function a(n,t,r){for(var e=-1,u=null==n?0:n.length;++e<u;)if(r(t,n[e]))return true;return false}function l(n,t){for(var r=-1,e=null==n?0:n.length,u=Array(e);++r<e;)u[r]=t(n[r],r,n);return u}function s(n,t){for(var r=-1,e=t.length,u=n.length;++r<e;)n[u+r]=t[r];
return n}function h(n,t,r,e){var u=-1,i=null==n?0:n.length;for(e&&i&&(r=n[++u]);++u<i;)r=t(r,n[u],u,n);return r}function p(n,t,r,e){var u=null==n?0:n.length;for(e&&u&&(r=n[--u]);u--;)r=t(r,n[u],u,n);return r}function _(n,t){for(var r=-1,e=null==n?0:n.length;++r<e;)if(t(n[r],r,n))return true;return false}function v(n,t,r){var e;return r(n,function(n,r,u){if(t(n,r,u))return e=r,false}),e}function g(n,t,r,e){var u=n.length;for(r+=e?1:-1;e?r--:++r<u;)if(t(n[r],r,n))return r;return-1}function d(n,t,r){if(t===t)n:{
--r;for(var e=n.length;++r<e;)if(n[r]===t){n=r;break n}n=-1}else n=g(n,b,r);return n}function y(n,t,r,e){--r;for(var u=n.length;++r<u;)if(e(n[r],t))return r;return-1}function b(n){return n!==n}function x(n,t){var r=null==n?0:n.length;return r?k(n,t)/r:P}function j(n){return function(t){return null==t?F:t[n]}}function w(n){return function(t){return null==n?F:n[t]}}function m(n,t,r,e,u){return u(n,function(n,u,i){r=e?(e=false,n):t(r,n,u,i)}),r}function A(n,t){var r=n.length;for(n.sort(t);r--;)n[r]=n[r].c;
return n}function k(n,t){for(var r,e=-1,u=n.length;++e<u;){var i=t(n[e]);i!==F&&(r=r===F?i:r+i)}return r}function E(n,t){for(var r=-1,e=Array(n);++r<n;)e[r]=t(r);return e}function O(n,t){return l(t,function(t){return[t,n[t]]})}function S(n){return function(t){return n(t)}}function I(n,t){return l(t,function(t){return n[t]})}function R(n,t){return n.has(t)}function z(n,t){for(var r=-1,e=n.length;++r<e&&-1<d(t,n[r],0););return r}function W(n,t){for(var r=n.length;r--&&-1<d(t,n[r],0););return r}function B(n){
return"\\"+Tn[n]}function L(n){var t=-1,r=Array(n.size);return n.forEach(function(n,e){r[++t]=[e,n]}),r}function U(n,t){return function(r){return n(t(r))}}function C(n,t){for(var r=-1,e=n.length,u=0,i=[];++r<e;){var o=n[r];o!==t&&"__lodash_placeholder__"!==o||(n[r]="__lodash_placeholder__",i[u++]=r)}return i}function D(n){var t=-1,r=Array(n.size);return n.forEach(function(n){r[++t]=n}),r}function M(n){var t=-1,r=Array(n.size);return n.forEach(function(n){r[++t]=[n,n]}),r}function T(n){if(Bn.test(n)){
for(var t=zn.lastIndex=0;zn.test(n);)++t;n=t}else n=tt(n);return n}function $(n){return Bn.test(n)?n.match(zn)||[]:n.split("")}var F,N=1/0,P=NaN,Z=[["ary",128],["bind",1],["bindKey",2],["curry",8],["curryRight",16],["flip",512],["partial",32],["partialRight",64],["rearg",256]],q=/\b__p\+='';/g,V=/\b(__p\+=)''\+/g,K=/(__e\(.*?\)|\b__t\))\+'';/g,G=/&(?:amp|lt|gt|quot|#39);/g,H=/[&<>"']/g,J=RegExp(G.source),Y=RegExp(H.source),Q=/<%-([\s\S]+?)%>/g,X=/<%([\s\S]+?)%>/g,nn=/<%=([\s\S]+?)%>/g,tn=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,rn=/^\w*$/,en=/^\./,un=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,on=/[\\^$.*+?()[\]{}|]/g,fn=RegExp(on.source),cn=/^\s+|\s+$/g,an=/^\s+/,ln=/\s+$/,sn=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,hn=/\{\n\/\* \[wrapped with (.+)\] \*/,pn=/,? & /,_n=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,vn=/\\(\\)?/g,gn=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,dn=/\w*$/,yn=/^[-+]0x[0-9a-f]+$/i,bn=/^0b[01]+$/i,xn=/^\[object .+?Constructor\]$/,jn=/^0o[0-7]+$/i,wn=/^(?:0|[1-9]\d*)$/,mn=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,An=/($^)/,kn=/['\n\r\u2028\u2029\\]/g,En="[\\ufe0e\\ufe0f]?(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?(?:\\u200d(?:[^\\ud800-\\udfff]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff])[\\ufe0e\\ufe0f]?(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?)*",On="(?:[\\u2700-\\u27bf]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff])"+En,Sn="(?:[^\\ud800-\\udfff][\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]?|[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\ud800-\\udfff])",In=RegExp("['\u2019]","g"),Rn=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]","g"),zn=RegExp("\\ud83c[\\udffb-\\udfff](?=\\ud83c[\\udffb-\\udfff])|"+Sn+En,"g"),Wn=RegExp(["[A-Z\\xc0-\\xd6\\xd8-\\xde]?[a-z\\xdf-\\xf6\\xf8-\\xff]+(?:['\u2019](?:d|ll|m|re|s|t|ve))?(?=[\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000]|[A-Z\\xc0-\\xd6\\xd8-\\xde]|$)|(?:[A-Z\\xc0-\\xd6\\xd8-\\xde]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?(?=[\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000]|[A-Z\\xc0-\\xd6\\xd8-\\xde](?:[a-z\\xdf-\\xf6\\xf8-\\xff]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])|$)|[A-Z\\xc0-\\xd6\\xd8-\\xde]?(?:[a-z\\xdf-\\xf6\\xf8-\\xff]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])+(?:['\u2019](?:d|ll|m|re|s|t|ve))?|[A-Z\\xc0-\\xd6\\xd8-\\xde]+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?|\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)|\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)|\\d+",On].join("|"),"g"),Bn=RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]"),Ln=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,Un="Array Buffer DataView Date Error Float32Array Float64Array Function Int8Array Int16Array Int32Array Map Math Object Promise RegExp Set String Symbol TypeError Uint8Array Uint8ClampedArray Uint16Array Uint32Array WeakMap _ clearTimeout isFinite parseInt setTimeout".split(" "),Cn={};
Cn["[object Float32Array]"]=Cn["[object Float64Array]"]=Cn["[object Int8Array]"]=Cn["[object Int16Array]"]=Cn["[object Int32Array]"]=Cn["[object Uint8Array]"]=Cn["[object Uint8ClampedArray]"]=Cn["[object Uint16Array]"]=Cn["[object Uint32Array]"]=true,Cn["[object Arguments]"]=Cn["[object Array]"]=Cn["[object ArrayBuffer]"]=Cn["[object Boolean]"]=Cn["[object DataView]"]=Cn["[object Date]"]=Cn["[object Error]"]=Cn["[object Function]"]=Cn["[object Map]"]=Cn["[object Number]"]=Cn["[object Object]"]=Cn["[object RegExp]"]=Cn["[object Set]"]=Cn["[object String]"]=Cn["[object WeakMap]"]=false;
var Dn={};Dn["[object Arguments]"]=Dn["[object Array]"]=Dn["[object ArrayBuffer]"]=Dn["[object DataView]"]=Dn["[object Boolean]"]=Dn["[object Date]"]=Dn["[object Float32Array]"]=Dn["[object Float64Array]"]=Dn["[object Int8Array]"]=Dn["[object Int16Array]"]=Dn["[object Int32Array]"]=Dn["[object Map]"]=Dn["[object Number]"]=Dn["[object Object]"]=Dn["[object RegExp]"]=Dn["[object Set]"]=Dn["[object String]"]=Dn["[object Symbol]"]=Dn["[object Uint8Array]"]=Dn["[object Uint8ClampedArray]"]=Dn["[object Uint16Array]"]=Dn["[object Uint32Array]"]=true,
Dn["[object Error]"]=Dn["[object Function]"]=Dn["[object WeakMap]"]=false;var Mn,Tn={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},$n=parseFloat,Fn=parseInt,Nn=typeof global=="object"&&global&&global.Object===Object&&global,Pn=typeof self=="object"&&self&&self.Object===Object&&self,Zn=Nn||Pn||Function("return this")(),qn=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Vn=qn&&typeof module=="object"&&module&&!module.nodeType&&module,Kn=Vn&&Vn.exports===qn,Gn=Kn&&Nn.process;
n:{try{Mn=Gn&&Gn.binding&&Gn.binding("util");break n}catch(n){}Mn=void 0}var Hn=Mn&&Mn.isArrayBuffer,Jn=Mn&&Mn.isDate,Yn=Mn&&Mn.isMap,Qn=Mn&&Mn.isRegExp,Xn=Mn&&Mn.isSet,nt=Mn&&Mn.isTypedArray,tt=j("length"),rt=w({"\xc0":"A","\xc1":"A","\xc2":"A","\xc3":"A","\xc4":"A","\xc5":"A","\xe0":"a","\xe1":"a","\xe2":"a","\xe3":"a","\xe4":"a","\xe5":"a","\xc7":"C","\xe7":"c","\xd0":"D","\xf0":"d","\xc8":"E","\xc9":"E","\xca":"E","\xcb":"E","\xe8":"e","\xe9":"e","\xea":"e","\xeb":"e","\xcc":"I","\xcd":"I","\xce":"I",
"\xcf":"I","\xec":"i","\xed":"i","\xee":"i","\xef":"i","\xd1":"N","\xf1":"n","\xd2":"O","\xd3":"O","\xd4":"O","\xd5":"O","\xd6":"O","\xd8":"O","\xf2":"o","\xf3":"o","\xf4":"o","\xf5":"o","\xf6":"o","\xf8":"o","\xd9":"U","\xda":"U","\xdb":"U","\xdc":"U","\xf9":"u","\xfa":"u","\xfb":"u","\xfc":"u","\xdd":"Y","\xfd":"y","\xff":"y","\xc6":"Ae","\xe6":"ae","\xde":"Th","\xfe":"th","\xdf":"ss","\u0100":"A","\u0102":"A","\u0104":"A","\u0101":"a","\u0103":"a","\u0105":"a","\u0106":"C","\u0108":"C","\u010a":"C",
"\u010c":"C","\u0107":"c","\u0109":"c","\u010b":"c","\u010d":"c","\u010e":"D","\u0110":"D","\u010f":"d","\u0111":"d","\u0112":"E","\u0114":"E","\u0116":"E","\u0118":"E","\u011a":"E","\u0113":"e","\u0115":"e","\u0117":"e","\u0119":"e","\u011b":"e","\u011c":"G","\u011e":"G","\u0120":"G","\u0122":"G","\u011d":"g","\u011f":"g","\u0121":"g","\u0123":"g","\u0124":"H","\u0126":"H","\u0125":"h","\u0127":"h","\u0128":"I","\u012a":"I","\u012c":"I","\u012e":"I","\u0130":"I","\u0129":"i","\u012b":"i","\u012d":"i",
"\u012f":"i","\u0131":"i","\u0134":"J","\u0135":"j","\u0136":"K","\u0137":"k","\u0138":"k","\u0139":"L","\u013b":"L","\u013d":"L","\u013f":"L","\u0141":"L","\u013a":"l","\u013c":"l","\u013e":"l","\u0140":"l","\u0142":"l","\u0143":"N","\u0145":"N","\u0147":"N","\u014a":"N","\u0144":"n","\u0146":"n","\u0148":"n","\u014b":"n","\u014c":"O","\u014e":"O","\u0150":"O","\u014d":"o","\u014f":"o","\u0151":"o","\u0154":"R","\u0156":"R","\u0158":"R","\u0155":"r","\u0157":"r","\u0159":"r","\u015a":"S","\u015c":"S",
"\u015e":"S","\u0160":"S","\u015b":"s","\u015d":"s","\u015f":"s","\u0161":"s","\u0162":"T","\u0164":"T","\u0166":"T","\u0163":"t","\u0165":"t","\u0167":"t","\u0168":"U","\u016a":"U","\u016c":"U","\u016e":"U","\u0170":"U","\u0172":"U","\u0169":"u","\u016b":"u","\u016d":"u","\u016f":"u","\u0171":"u","\u0173":"u","\u0174":"W","\u0175":"w","\u0176":"Y","\u0177":"y","\u0178":"Y","\u0179":"Z","\u017b":"Z","\u017d":"Z","\u017a":"z","\u017c":"z","\u017e":"z","\u0132":"IJ","\u0133":"ij","\u0152":"Oe","\u0153":"oe",
"\u0149":"'n","\u017f":"s"}),et=w({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}),ut=w({"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"}),it=function w(En){function On(n){if(xu(n)&&!af(n)&&!(n instanceof Mn)){if(n instanceof zn)return n;if(ci.call(n,"__wrapped__"))return Pe(n)}return new zn(n)}function Sn(){}function zn(n,t){this.__wrapped__=n,this.__actions__=[],this.__chain__=!!t,this.__index__=0,this.__values__=F}function Mn(n){this.__wrapped__=n,this.__actions__=[],this.__dir__=1,
this.__filtered__=false,this.__iteratees__=[],this.__takeCount__=4294967295,this.__views__=[]}function Tn(n){var t=-1,r=null==n?0:n.length;for(this.clear();++t<r;){var e=n[t];this.set(e[0],e[1])}}function Nn(n){var t=-1,r=null==n?0:n.length;for(this.clear();++t<r;){var e=n[t];this.set(e[0],e[1])}}function Pn(n){var t=-1,r=null==n?0:n.length;for(this.clear();++t<r;){var e=n[t];this.set(e[0],e[1])}}function qn(n){var t=-1,r=null==n?0:n.length;for(this.__data__=new Pn;++t<r;)this.add(n[t])}function Vn(n){
this.size=(this.__data__=new Nn(n)).size}function Gn(n,t){var r,e=af(n),u=!e&&cf(n),i=!e&&!u&&sf(n),o=!e&&!u&&!i&&gf(n),u=(e=e||u||i||o)?E(n.length,ri):[],f=u.length;for(r in n)!t&&!ci.call(n,r)||e&&("length"==r||i&&("offset"==r||"parent"==r)||o&&("buffer"==r||"byteLength"==r||"byteOffset"==r)||Re(r,f))||u.push(r);return u}function tt(n){var t=n.length;return t?n[cr(0,t-1)]:F}function ot(n,t){return Te(Mr(n),gt(t,0,n.length))}function ft(n){return Te(Mr(n))}function ct(n,t,r){(r===F||hu(n[t],r))&&(r!==F||t in n)||_t(n,t,r);
}function at(n,t,r){var e=n[t];ci.call(n,t)&&hu(e,r)&&(r!==F||t in n)||_t(n,t,r)}function lt(n,t){for(var r=n.length;r--;)if(hu(n[r][0],t))return r;return-1}function st(n,t,r,e){return oo(n,function(n,u,i){t(e,n,r(n),i)}),e}function ht(n,t){return n&&Tr(t,Lu(t),n)}function pt(n,t){return n&&Tr(t,Uu(t),n)}function _t(n,t,r){"__proto__"==t&&Ei?Ei(n,t,{configurable:true,enumerable:true,value:r,writable:true}):n[t]=r}function vt(n,t){for(var r=-1,e=t.length,u=Hu(e),i=null==n;++r<e;)u[r]=i?F:Wu(n,t[r]);return u;
}function gt(n,t,r){return n===n&&(r!==F&&(n=n<=r?n:r),t!==F&&(n=n>=t?n:t)),n}function dt(n,t,r,e,i,o){var f,c=1&t,a=2&t,l=4&t;if(r&&(f=i?r(n,e,i,o):r(n)),f!==F)return f;if(!bu(n))return n;if(e=af(n)){if(f=Ee(n),!c)return Mr(n,f)}else{var s=yo(n),h="[object Function]"==s||"[object GeneratorFunction]"==s;if(sf(n))return Wr(n,c);if("[object Object]"==s||"[object Arguments]"==s||h&&!i){if(f=a||h?{}:Oe(n),!c)return a?Fr(n,pt(f,n)):$r(n,ht(f,n))}else{if(!Dn[s])return i?n:{};f=Se(n,s,dt,c)}}if(o||(o=new Vn),
i=o.get(n))return i;o.set(n,f);var a=l?a?ye:de:a?Uu:Lu,p=e?F:a(n);return u(p||n,function(e,u){p&&(u=e,e=n[u]),at(f,u,dt(e,t,r,u,n,o))}),f}function yt(n){var t=Lu(n);return function(r){return bt(r,n,t)}}function bt(n,t,r){var e=r.length;if(null==n)return!e;for(n=ni(n);e--;){var u=r[e],i=t[u],o=n[u];if(o===F&&!(u in n)||!i(o))return false}return true}function xt(n,t,r){if(typeof n!="function")throw new ei("Expected a function");return jo(function(){n.apply(F,r)},t)}function jt(n,t,r,e){var u=-1,i=c,o=true,f=n.length,s=[],h=t.length;
if(!f)return s;r&&(t=l(t,S(r))),e?(i=a,o=false):200<=t.length&&(i=R,o=false,t=new qn(t));n:for(;++u<f;){var p=n[u],_=null==r?p:r(p),p=e||0!==p?p:0;if(o&&_===_){for(var v=h;v--;)if(t[v]===_)continue n;s.push(p)}else i(t,_,e)||s.push(p)}return s}function wt(n,t){var r=true;return oo(n,function(n,e,u){return r=!!t(n,e,u)}),r}function mt(n,t,r){for(var e=-1,u=n.length;++e<u;){var i=n[e],o=t(i);if(null!=o&&(f===F?o===o&&!Au(o):r(o,f)))var f=o,c=i}return c}function At(n,t){var r=[];return oo(n,function(n,e,u){
t(n,e,u)&&r.push(n)}),r}function kt(n,t,r,e,u){var i=-1,o=n.length;for(r||(r=Ie),u||(u=[]);++i<o;){var f=n[i];0<t&&r(f)?1<t?kt(f,t-1,r,e,u):s(u,f):e||(u[u.length]=f)}return u}function Et(n,t){return n&&co(n,t,Lu)}function Ot(n,t){return n&&ao(n,t,Lu)}function St(n,t){return f(t,function(t){return gu(n[t])})}function It(n,t){t=Rr(t,n);for(var r=0,e=t.length;null!=n&&r<e;)n=n[$e(t[r++])];return r&&r==e?n:F}function Rt(n,t,r){return t=t(n),af(n)?t:s(t,r(n))}function zt(n){if(null==n)n=n===F?"[object Undefined]":"[object Null]";else if(ki&&ki in ni(n)){
var t=ci.call(n,ki),r=n[ki];try{n[ki]=F;var e=true}catch(n){}var u=si.call(n);e&&(t?n[ki]=r:delete n[ki]),n=u}else n=si.call(n);return n}function Wt(n,t){return n>t}function Bt(n,t){return null!=n&&ci.call(n,t)}function Lt(n,t){return null!=n&&t in ni(n)}function Ut(n,t,r){for(var e=r?a:c,u=n[0].length,i=n.length,o=i,f=Hu(i),s=1/0,h=[];o--;){var p=n[o];o&&t&&(p=l(p,S(t))),s=Mi(p.length,s),f[o]=!r&&(t||120<=u&&120<=p.length)?new qn(o&&p):F}var p=n[0],_=-1,v=f[0];n:for(;++_<u&&h.length<s;){var g=p[_],d=t?t(g):g,g=r||0!==g?g:0;
if(v?!R(v,d):!e(h,d,r)){for(o=i;--o;){var y=f[o];if(y?!R(y,d):!e(n[o],d,r))continue n}v&&v.push(d),h.push(g)}}return h}function Ct(n,t,r){var e={};return Et(n,function(n,u,i){t(e,r(n),u,i)}),e}function Dt(n,t,e){return t=Rr(t,n),n=2>t.length?n:It(n,vr(t,0,-1)),t=null==n?n:n[$e(Ge(t))],null==t?F:r(t,n,e)}function Mt(n){return xu(n)&&"[object Arguments]"==zt(n)}function Tt(n){return xu(n)&&"[object ArrayBuffer]"==zt(n)}function $t(n){return xu(n)&&"[object Date]"==zt(n)}function Ft(n,t,r,e,u){if(n===t)t=true;else if(null==n||null==t||!xu(n)&&!xu(t))t=n!==n&&t!==t;else n:{
var i=af(n),o=af(t),f=i?"[object Array]":yo(n),c=o?"[object Array]":yo(t),f="[object Arguments]"==f?"[object Object]":f,c="[object Arguments]"==c?"[object Object]":c,a="[object Object]"==f,o="[object Object]"==c;if((c=f==c)&&sf(n)){if(!sf(t)){t=false;break n}i=true,a=false}if(c&&!a)u||(u=new Vn),t=i||gf(n)?_e(n,t,r,e,Ft,u):ve(n,t,f,r,e,Ft,u);else{if(!(1&r)&&(i=a&&ci.call(n,"__wrapped__"),f=o&&ci.call(t,"__wrapped__"),i||f)){n=i?n.value():n,t=f?t.value():t,u||(u=new Vn),t=Ft(n,t,r,e,u);break n}if(c)t:if(u||(u=new Vn),
i=1&r,f=de(n),o=f.length,c=de(t).length,o==c||i){for(a=o;a--;){var l=f[a];if(!(i?l in t:ci.call(t,l))){t=false;break t}}if((c=u.get(n))&&u.get(t))t=c==t;else{c=true,u.set(n,t),u.set(t,n);for(var s=i;++a<o;){var l=f[a],h=n[l],p=t[l];if(e)var _=i?e(p,h,l,t,n,u):e(h,p,l,n,t,u);if(_===F?h!==p&&!Ft(h,p,r,e,u):!_){c=false;break}s||(s="constructor"==l)}c&&!s&&(r=n.constructor,e=t.constructor,r!=e&&"constructor"in n&&"constructor"in t&&!(typeof r=="function"&&r instanceof r&&typeof e=="function"&&e instanceof e)&&(c=false)),
u.delete(n),u.delete(t),t=c}}else t=false;else t=false}}return t}function Nt(n){return xu(n)&&"[object Map]"==yo(n)}function Pt(n,t,r,e){var u=r.length,i=u,o=!e;if(null==n)return!i;for(n=ni(n);u--;){var f=r[u];if(o&&f[2]?f[1]!==n[f[0]]:!(f[0]in n))return false}for(;++u<i;){var f=r[u],c=f[0],a=n[c],l=f[1];if(o&&f[2]){if(a===F&&!(c in n))return false}else{if(f=new Vn,e)var s=e(a,l,c,n,t,f);if(s===F?!Ft(l,a,3,e,f):!s)return false}}return true}function Zt(n){return!(!bu(n)||li&&li in n)&&(gu(n)?_i:xn).test(Fe(n))}function qt(n){
return xu(n)&&"[object RegExp]"==zt(n)}function Vt(n){return xu(n)&&"[object Set]"==yo(n)}function Kt(n){return xu(n)&&yu(n.length)&&!!Cn[zt(n)]}function Gt(n){return typeof n=="function"?n:null==n?Nu:typeof n=="object"?af(n)?Xt(n[0],n[1]):Qt(n):Vu(n)}function Ht(n){if(!Le(n))return Ci(n);var t,r=[];for(t in ni(n))ci.call(n,t)&&"constructor"!=t&&r.push(t);return r}function Jt(n,t){return n<t}function Yt(n,t){var r=-1,e=pu(n)?Hu(n.length):[];return oo(n,function(n,u,i){e[++r]=t(n,u,i)}),e}function Qt(n){
var t=me(n);return 1==t.length&&t[0][2]?Ue(t[0][0],t[0][1]):function(r){return r===n||Pt(r,n,t)}}function Xt(n,t){return We(n)&&t===t&&!bu(t)?Ue($e(n),t):function(r){var e=Wu(r,n);return e===F&&e===t?Bu(r,n):Ft(t,e,3)}}function nr(n,t,r,e,u){n!==t&&co(t,function(i,o){if(bu(i)){u||(u=new Vn);var f=u,c=n[o],a=t[o],l=f.get(a);if(l)ct(n,o,l);else{var l=e?e(c,a,o+"",n,t,f):F,s=l===F;if(s){var h=af(a),p=!h&&sf(a),_=!h&&!p&&gf(a),l=a;h||p||_?af(c)?l=c:_u(c)?l=Mr(c):p?(s=false,l=Wr(a,true)):_?(s=false,l=Lr(a,true)):l=[]:wu(a)||cf(a)?(l=c,
cf(c)?l=Ru(c):(!bu(c)||r&&gu(c))&&(l=Oe(a))):s=false}s&&(f.set(a,l),nr(l,a,r,e,f),f.delete(a)),ct(n,o,l)}}else f=e?e(n[o],i,o+"",n,t,u):F,f===F&&(f=i),ct(n,o,f)},Uu)}function tr(n,t){var r=n.length;if(r)return t+=0>t?r:0,Re(t,r)?n[t]:F}function rr(n,t,r){var e=-1;return t=l(t.length?t:[Nu],S(je())),n=Yt(n,function(n){return{a:l(t,function(t){return t(n)}),b:++e,c:n}}),A(n,function(n,t){var e;n:{e=-1;for(var u=n.a,i=t.a,o=u.length,f=r.length;++e<o;){var c=Ur(u[e],i[e]);if(c){e=e>=f?c:c*("desc"==r[e]?-1:1);
break n}}e=n.b-t.b}return e})}function er(n,t){return ur(n,t,function(t,r){return Bu(n,r)})}function ur(n,t,r){for(var e=-1,u=t.length,i={};++e<u;){var o=t[e],f=It(n,o);r(f,o)&&pr(i,Rr(o,n),f)}return i}function ir(n){return function(t){return It(t,n)}}function or(n,t,r,e){var u=e?y:d,i=-1,o=t.length,f=n;for(n===t&&(t=Mr(t)),r&&(f=l(n,S(r)));++i<o;)for(var c=0,a=t[i],a=r?r(a):a;-1<(c=u(f,a,c,e));)f!==n&&wi.call(f,c,1),wi.call(n,c,1);return n}function fr(n,t){for(var r=n?t.length:0,e=r-1;r--;){var u=t[r];
if(r==e||u!==i){var i=u;Re(u)?wi.call(n,u,1):mr(n,u)}}}function cr(n,t){return n+zi(Fi()*(t-n+1))}function ar(n,t){var r="";if(!n||1>t||9007199254740991<t)return r;do t%2&&(r+=n),(t=zi(t/2))&&(n+=n);while(t);return r}function lr(n,t){return wo(Ce(n,t,Nu),n+"")}function sr(n){return tt(Du(n))}function hr(n,t){var r=Du(n);return Te(r,gt(t,0,r.length))}function pr(n,t,r,e){if(!bu(n))return n;t=Rr(t,n);for(var u=-1,i=t.length,o=i-1,f=n;null!=f&&++u<i;){var c=$e(t[u]),a=r;if(u!=o){var l=f[c],a=e?e(l,c,f):F;
a===F&&(a=bu(l)?l:Re(t[u+1])?[]:{})}at(f,c,a),f=f[c]}return n}function _r(n){return Te(Du(n))}function vr(n,t,r){var e=-1,u=n.length;for(0>t&&(t=-t>u?0:u+t),r=r>u?u:r,0>r&&(r+=u),u=t>r?0:r-t>>>0,t>>>=0,r=Hu(u);++e<u;)r[e]=n[e+t];return r}function gr(n,t){var r;return oo(n,function(n,e,u){return r=t(n,e,u),!r}),!!r}function dr(n,t,r){var e=0,u=null==n?e:n.length;if(typeof t=="number"&&t===t&&2147483647>=u){for(;e<u;){var i=e+u>>>1,o=n[i];null!==o&&!Au(o)&&(r?o<=t:o<t)?e=i+1:u=i}return u}return yr(n,t,Nu,r);
}function yr(n,t,r,e){t=r(t);for(var u=0,i=null==n?0:n.length,o=t!==t,f=null===t,c=Au(t),a=t===F;u<i;){var l=zi((u+i)/2),s=r(n[l]),h=s!==F,p=null===s,_=s===s,v=Au(s);(o?e||_:a?_&&(e||h):f?_&&h&&(e||!p):c?_&&h&&!p&&(e||!v):p||v?0:e?s<=t:s<t)?u=l+1:i=l}return Mi(i,4294967294)}function br(n,t){for(var r=-1,e=n.length,u=0,i=[];++r<e;){var o=n[r],f=t?t(o):o;if(!r||!hu(f,c)){var c=f;i[u++]=0===o?0:o}}return i}function xr(n){return typeof n=="number"?n:Au(n)?P:+n}function jr(n){if(typeof n=="string")return n;
if(af(n))return l(n,jr)+"";if(Au(n))return uo?uo.call(n):"";var t=n+"";return"0"==t&&1/n==-N?"-0":t}function wr(n,t,r){var e=-1,u=c,i=n.length,o=true,f=[],l=f;if(r)o=false,u=a;else if(200<=i){if(u=t?null:po(n))return D(u);o=false,u=R,l=new qn}else l=t?[]:f;n:for(;++e<i;){var s=n[e],h=t?t(s):s,s=r||0!==s?s:0;if(o&&h===h){for(var p=l.length;p--;)if(l[p]===h)continue n;t&&l.push(h),f.push(s)}else u(l,h,r)||(l!==f&&l.push(h),f.push(s))}return f}function mr(n,t){return t=Rr(t,n),n=2>t.length?n:It(n,vr(t,0,-1)),
null==n||delete n[$e(Ge(t))]}function Ar(n,t,r,e){for(var u=n.length,i=e?u:-1;(e?i--:++i<u)&&t(n[i],i,n););return r?vr(n,e?0:i,e?i+1:u):vr(n,e?i+1:0,e?u:i)}function kr(n,t){var r=n;return r instanceof Mn&&(r=r.value()),h(t,function(n,t){return t.func.apply(t.thisArg,s([n],t.args))},r)}function Er(n,t,r){var e=n.length;if(2>e)return e?wr(n[0]):[];for(var u=-1,i=Hu(e);++u<e;)for(var o=n[u],f=-1;++f<e;)f!=u&&(i[u]=jt(i[u]||o,n[f],t,r));return wr(kt(i,1),t,r)}function Or(n,t,r){for(var e=-1,u=n.length,i=t.length,o={};++e<u;)r(o,n[e],e<i?t[e]:F);
return o}function Sr(n){return _u(n)?n:[]}function Ir(n){return typeof n=="function"?n:Nu}function Rr(n,t){return af(n)?n:We(n,t)?[n]:mo(zu(n))}function zr(n,t,r){var e=n.length;return r=r===F?e:r,!t&&r>=e?n:vr(n,t,r)}function Wr(n,t){if(t)return n.slice();var r=n.length,r=yi?yi(r):new n.constructor(r);return n.copy(r),r}function Br(n){var t=new n.constructor(n.byteLength);return new di(t).set(new di(n)),t}function Lr(n,t){return new n.constructor(t?Br(n.buffer):n.buffer,n.byteOffset,n.length)}function Ur(n,t){
if(n!==t){var r=n!==F,e=null===n,u=n===n,i=Au(n),o=t!==F,f=null===t,c=t===t,a=Au(t);if(!f&&!a&&!i&&n>t||i&&o&&c&&!f&&!a||e&&o&&c||!r&&c||!u)return 1;if(!e&&!i&&!a&&n<t||a&&r&&u&&!e&&!i||f&&r&&u||!o&&u||!c)return-1}return 0}function Cr(n,t,r,e){var u=-1,i=n.length,o=r.length,f=-1,c=t.length,a=Di(i-o,0),l=Hu(c+a);for(e=!e;++f<c;)l[f]=t[f];for(;++u<o;)(e||u<i)&&(l[r[u]]=n[u]);for(;a--;)l[f++]=n[u++];return l}function Dr(n,t,r,e){var u=-1,i=n.length,o=-1,f=r.length,c=-1,a=t.length,l=Di(i-f,0),s=Hu(l+a);
for(e=!e;++u<l;)s[u]=n[u];for(l=u;++c<a;)s[l+c]=t[c];for(;++o<f;)(e||u<i)&&(s[l+r[o]]=n[u++]);return s}function Mr(n,t){var r=-1,e=n.length;for(t||(t=Hu(e));++r<e;)t[r]=n[r];return t}function Tr(n,t,r,e){var u=!r;r||(r={});for(var i=-1,o=t.length;++i<o;){var f=t[i],c=e?e(r[f],n[f],f,r,n):F;c===F&&(c=n[f]),u?_t(r,f,c):at(r,f,c)}return r}function $r(n,t){return Tr(n,vo(n),t)}function Fr(n,t){return Tr(n,go(n),t)}function Nr(n,t){return function(r,u){var i=af(r)?e:st,o=t?t():{};return i(r,n,je(u,2),o);
}}function Pr(n){return lr(function(t,r){var e=-1,u=r.length,i=1<u?r[u-1]:F,o=2<u?r[2]:F,i=3<n.length&&typeof i=="function"?(u--,i):F;for(o&&ze(r[0],r[1],o)&&(i=3>u?F:i,u=1),t=ni(t);++e<u;)(o=r[e])&&n(t,o,e,i);return t})}function Zr(n,t){return function(r,e){if(null==r)return r;if(!pu(r))return n(r,e);for(var u=r.length,i=t?u:-1,o=ni(r);(t?i--:++i<u)&&false!==e(o[i],i,o););return r}}function qr(n){return function(t,r,e){var u=-1,i=ni(t);e=e(t);for(var o=e.length;o--;){var f=e[n?o:++u];if(false===r(i[f],f,i))break;
}return t}}function Vr(n,t,r){function e(){return(this&&this!==Zn&&this instanceof e?i:n).apply(u?r:this,arguments)}var u=1&t,i=Hr(n);return e}function Kr(n){return function(t){t=zu(t);var r=Bn.test(t)?$(t):F,e=r?r[0]:t.charAt(0);return t=r?zr(r,1).join(""):t.slice(1),e[n]()+t}}function Gr(n){return function(t){return h($u(Tu(t).replace(In,"")),n,"")}}function Hr(n){return function(){var t=arguments;switch(t.length){case 0:return new n;case 1:return new n(t[0]);case 2:return new n(t[0],t[1]);case 3:
return new n(t[0],t[1],t[2]);case 4:return new n(t[0],t[1],t[2],t[3]);case 5:return new n(t[0],t[1],t[2],t[3],t[4]);case 6:return new n(t[0],t[1],t[2],t[3],t[4],t[5]);case 7:return new n(t[0],t[1],t[2],t[3],t[4],t[5],t[6])}var r=io(n.prototype),t=n.apply(r,t);return bu(t)?t:r}}function Jr(n,t,e){function u(){for(var o=arguments.length,f=Hu(o),c=o,a=xe(u);c--;)f[c]=arguments[c];return c=3>o&&f[0]!==a&&f[o-1]!==a?[]:C(f,a),o-=c.length,o<e?fe(n,t,Xr,u.placeholder,F,f,c,F,F,e-o):r(this&&this!==Zn&&this instanceof u?i:n,this,f);
}var i=Hr(n);return u}function Yr(n){return function(t,r,e){var u=ni(t);if(!pu(t)){var i=je(r,3);t=Lu(t),r=function(n){return i(u[n],n,u)}}return r=n(t,r,e),-1<r?u[i?t[r]:r]:F}}function Qr(n){return ge(function(t){var r=t.length,e=r,u=zn.prototype.thru;for(n&&t.reverse();e--;){var i=t[e];if(typeof i!="function")throw new ei("Expected a function");if(u&&!o&&"wrapper"==be(i))var o=new zn([],true)}for(e=o?e:r;++e<r;)var i=t[e],u=be(i),f="wrapper"==u?_o(i):F,o=f&&Be(f[0])&&424==f[1]&&!f[4].length&&1==f[9]?o[be(f[0])].apply(o,f[3]):1==i.length&&Be(i)?o[u]():o.thru(i);
return function(){var n=arguments,e=n[0];if(o&&1==n.length&&af(e))return o.plant(e).value();for(var u=0,n=r?t[u].apply(this,n):e;++u<r;)n=t[u].call(this,n);return n}})}function Xr(n,t,r,e,u,i,o,f,c,a){function l(){for(var d=arguments.length,y=Hu(d),b=d;b--;)y[b]=arguments[b];if(_){var x,j=xe(l),b=y.length;for(x=0;b--;)y[b]===j&&++x}if(e&&(y=Cr(y,e,u,_)),i&&(y=Dr(y,i,o,_)),d-=x,_&&d<a)return j=C(y,j),fe(n,t,Xr,l.placeholder,r,y,j,f,c,a-d);if(j=h?r:this,b=p?j[n]:n,d=y.length,f){x=y.length;for(var w=Mi(f.length,x),m=Mr(y);w--;){
var A=f[w];y[w]=Re(A,x)?m[A]:F}}else v&&1<d&&y.reverse();return s&&c<d&&(y.length=c),this&&this!==Zn&&this instanceof l&&(b=g||Hr(b)),b.apply(j,y)}var s=128&t,h=1&t,p=2&t,_=24&t,v=512&t,g=p?F:Hr(n);return l}function ne(n,t){return function(r,e){return Ct(r,n,t(e))}}function te(n,t){return function(r,e){var u;if(r===F&&e===F)return t;if(r!==F&&(u=r),e!==F){if(u===F)return e;typeof r=="string"||typeof e=="string"?(r=jr(r),e=jr(e)):(r=xr(r),e=xr(e)),u=n(r,e)}return u}}function re(n){return ge(function(t){
return t=l(t,S(je())),lr(function(e){var u=this;return n(t,function(n){return r(n,u,e)})})})}function ee(n,t){t=t===F?" ":jr(t);var r=t.length;return 2>r?r?ar(t,n):t:(r=ar(t,Ri(n/T(t))),Bn.test(t)?zr($(r),0,n).join(""):r.slice(0,n))}function ue(n,t,e,u){function i(){for(var t=-1,c=arguments.length,a=-1,l=u.length,s=Hu(l+c),h=this&&this!==Zn&&this instanceof i?f:n;++a<l;)s[a]=u[a];for(;c--;)s[a++]=arguments[++t];return r(h,o?e:this,s)}var o=1&t,f=Hr(n);return i}function ie(n){return function(t,r,e){
e&&typeof e!="number"&&ze(t,r,e)&&(r=e=F),t=Eu(t),r===F?(r=t,t=0):r=Eu(r),e=e===F?t<r?1:-1:Eu(e);var u=-1;r=Di(Ri((r-t)/(e||1)),0);for(var i=Hu(r);r--;)i[n?r:++u]=t,t+=e;return i}}function oe(n){return function(t,r){return typeof t=="string"&&typeof r=="string"||(t=Iu(t),r=Iu(r)),n(t,r)}}function fe(n,t,r,e,u,i,o,f,c,a){var l=8&t,s=l?o:F;o=l?F:o;var h=l?i:F;return i=l?F:i,t=(t|(l?32:64))&~(l?64:32),4&t||(t&=-4),u=[n,t,u,h,s,i,o,f,c,a],r=r.apply(F,u),Be(n)&&xo(r,u),r.placeholder=e,De(r,n,t)}function ce(n){
var t=Xu[n];return function(n,r){if(n=Iu(n),r=null==r?0:Mi(Ou(r),292)){var e=(zu(n)+"e").split("e"),e=t(e[0]+"e"+(+e[1]+r)),e=(zu(e)+"e").split("e");return+(e[0]+"e"+(+e[1]-r))}return t(n)}}function ae(n){return function(t){var r=yo(t);return"[object Map]"==r?L(t):"[object Set]"==r?M(t):O(t,n(t))}}function le(n,t,r,e,u,i,o,f){var c=2&t;if(!c&&typeof n!="function")throw new ei("Expected a function");var a=e?e.length:0;if(a||(t&=-97,e=u=F),o=o===F?o:Di(Ou(o),0),f=f===F?f:Ou(f),a-=u?u.length:0,64&t){
var l=e,s=u;e=u=F}var h=c?F:_o(n);return i=[n,t,r,e,u,l,s,i,o,f],h&&(r=i[1],n=h[1],t=r|n,e=128==n&&8==r||128==n&&256==r&&i[7].length<=h[8]||384==n&&h[7].length<=h[8]&&8==r,131>t||e)&&(1&n&&(i[2]=h[2],t|=1&r?0:4),(r=h[3])&&(e=i[3],i[3]=e?Cr(e,r,h[4]):r,i[4]=e?C(i[3],"__lodash_placeholder__"):h[4]),(r=h[5])&&(e=i[5],i[5]=e?Dr(e,r,h[6]):r,i[6]=e?C(i[5],"__lodash_placeholder__"):h[6]),(r=h[7])&&(i[7]=r),128&n&&(i[8]=null==i[8]?h[8]:Mi(i[8],h[8])),null==i[9]&&(i[9]=h[9]),i[0]=h[0],i[1]=t),n=i[0],t=i[1],
r=i[2],e=i[3],u=i[4],f=i[9]=i[9]===F?c?0:n.length:Di(i[9]-a,0),!f&&24&t&&(t&=-25),De((h?lo:xo)(t&&1!=t?8==t||16==t?Jr(n,t,f):32!=t&&33!=t||u.length?Xr.apply(F,i):ue(n,t,r,e):Vr(n,t,r),i),n,t)}function se(n,t,r,e){return n===F||hu(n,ii[r])&&!ci.call(e,r)?t:n}function he(n,t,r,e,u,i){return bu(n)&&bu(t)&&(i.set(t,n),nr(n,t,F,he,i),i.delete(t)),n}function pe(n){return wu(n)?F:n}function _e(n,t,r,e,u,i){var o=1&r,f=n.length,c=t.length;if(f!=c&&!(o&&c>f))return false;if((c=i.get(n))&&i.get(t))return c==t;var c=-1,a=true,l=2&r?new qn:F;
for(i.set(n,t),i.set(t,n);++c<f;){var s=n[c],h=t[c];if(e)var p=o?e(h,s,c,t,n,i):e(s,h,c,n,t,i);if(p!==F){if(p)continue;a=false;break}if(l){if(!_(t,function(n,t){if(!R(l,t)&&(s===n||u(s,n,r,e,i)))return l.push(t)})){a=false;break}}else if(s!==h&&!u(s,h,r,e,i)){a=false;break}}return i.delete(n),i.delete(t),a}function ve(n,t,r,e,u,i,o){switch(r){case"[object DataView]":if(n.byteLength!=t.byteLength||n.byteOffset!=t.byteOffset)break;n=n.buffer,t=t.buffer;case"[object ArrayBuffer]":if(n.byteLength!=t.byteLength||!i(new di(n),new di(t)))break;
return true;case"[object Boolean]":case"[object Date]":case"[object Number]":return hu(+n,+t);case"[object Error]":return n.name==t.name&&n.message==t.message;case"[object RegExp]":case"[object String]":return n==t+"";case"[object Map]":var f=L;case"[object Set]":if(f||(f=D),n.size!=t.size&&!(1&e))break;return(r=o.get(n))?r==t:(e|=2,o.set(n,t),t=_e(f(n),f(t),e,u,i,o),o.delete(n),t);case"[object Symbol]":if(eo)return eo.call(n)==eo.call(t)}return false}function ge(n){return wo(Ce(n,F,Ve),n+"")}function de(n){
return Rt(n,Lu,vo)}function ye(n){return Rt(n,Uu,go)}function be(n){for(var t=n.name+"",r=Ji[t],e=ci.call(Ji,t)?r.length:0;e--;){var u=r[e],i=u.func;if(null==i||i==n)return u.name}return t}function xe(n){return(ci.call(On,"placeholder")?On:n).placeholder}function je(){var n=On.iteratee||Pu,n=n===Pu?Gt:n;return arguments.length?n(arguments[0],arguments[1]):n}function we(n,t){var r=n.__data__,e=typeof t;return("string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t)?r[typeof t=="string"?"string":"hash"]:r.map;
}function me(n){for(var t=Lu(n),r=t.length;r--;){var e=t[r],u=n[e];t[r]=[e,u,u===u&&!bu(u)]}return t}function Ae(n,t){var r=null==n?F:n[t];return Zt(r)?r:F}function ke(n,t,r){t=Rr(t,n);for(var e=-1,u=t.length,i=false;++e<u;){var o=$e(t[e]);if(!(i=null!=n&&r(n,o)))break;n=n[o]}return i||++e!=u?i:(u=null==n?0:n.length,!!u&&yu(u)&&Re(o,u)&&(af(n)||cf(n)))}function Ee(n){var t=n.length,r=n.constructor(t);return t&&"string"==typeof n[0]&&ci.call(n,"index")&&(r.index=n.index,r.input=n.input),r}function Oe(n){
return typeof n.constructor!="function"||Le(n)?{}:io(bi(n))}function Se(r,e,u,i){var o=r.constructor;switch(e){case"[object ArrayBuffer]":return Br(r);case"[object Boolean]":case"[object Date]":return new o(+r);case"[object DataView]":return e=i?Br(r.buffer):r.buffer,new r.constructor(e,r.byteOffset,r.byteLength);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":
case"[object Uint16Array]":case"[object Uint32Array]":return Lr(r,i);case"[object Map]":return e=i?u(L(r),1):L(r),h(e,n,new r.constructor);case"[object Number]":case"[object String]":return new o(r);case"[object RegExp]":return e=new r.constructor(r.source,dn.exec(r)),e.lastIndex=r.lastIndex,e;case"[object Set]":return e=i?u(D(r),1):D(r),h(e,t,new r.constructor);case"[object Symbol]":return eo?ni(eo.call(r)):{}}}function Ie(n){return af(n)||cf(n)||!!(mi&&n&&n[mi])}function Re(n,t){return t=null==t?9007199254740991:t,
!!t&&(typeof n=="number"||wn.test(n))&&-1<n&&0==n%1&&n<t}function ze(n,t,r){if(!bu(r))return false;var e=typeof t;return!!("number"==e?pu(r)&&Re(t,r.length):"string"==e&&t in r)&&hu(r[t],n)}function We(n,t){if(af(n))return false;var r=typeof n;return!("number"!=r&&"symbol"!=r&&"boolean"!=r&&null!=n&&!Au(n))||(rn.test(n)||!tn.test(n)||null!=t&&n in ni(t))}function Be(n){var t=be(n),r=On[t];return typeof r=="function"&&t in Mn.prototype&&(n===r||(t=_o(r),!!t&&n===t[0]))}function Le(n){var t=n&&n.constructor;
return n===(typeof t=="function"&&t.prototype||ii)}function Ue(n,t){return function(r){return null!=r&&(r[n]===t&&(t!==F||n in ni(r)))}}function Ce(n,t,e){return t=Di(t===F?n.length-1:t,0),function(){for(var u=arguments,i=-1,o=Di(u.length-t,0),f=Hu(o);++i<o;)f[i]=u[t+i];for(i=-1,o=Hu(t+1);++i<t;)o[i]=u[i];return o[t]=e(f),r(n,this,o)}}function De(n,t,r){var e=t+"";t=wo;var u,i=Ne;return u=(u=e.match(hn))?u[1].split(pn):[],r=i(u,r),(i=r.length)&&(u=i-1,r[u]=(1<i?"& ":"")+r[u],r=r.join(2<i?", ":" "),
e=e.replace(sn,"{\n/* [wrapped with "+r+"] */\n")),t(n,e)}function Me(n){var t=0,r=0;return function(){var e=Ti(),u=16-(e-r);if(r=e,0<u){if(800<=++t)return arguments[0]}else t=0;return n.apply(F,arguments)}}function Te(n,t){var r=-1,e=n.length,u=e-1;for(t=t===F?e:t;++r<t;){var e=cr(r,u),i=n[e];n[e]=n[r],n[r]=i}return n.length=t,n}function $e(n){if(typeof n=="string"||Au(n))return n;var t=n+"";return"0"==t&&1/n==-N?"-0":t}function Fe(n){if(null!=n){try{return fi.call(n)}catch(n){}return n+""}return"";
}function Ne(n,t){return u(Z,function(r){var e="_."+r[0];t&r[1]&&!c(n,e)&&n.push(e)}),n.sort()}function Pe(n){if(n instanceof Mn)return n.clone();var t=new zn(n.__wrapped__,n.__chain__);return t.__actions__=Mr(n.__actions__),t.__index__=n.__index__,t.__values__=n.__values__,t}function Ze(n,t,r){var e=null==n?0:n.length;return e?(r=null==r?0:Ou(r),0>r&&(r=Di(e+r,0)),g(n,je(t,3),r)):-1}function qe(n,t,r){var e=null==n?0:n.length;if(!e)return-1;var u=e-1;return r!==F&&(u=Ou(r),u=0>r?Di(e+u,0):Mi(u,e-1)),
g(n,je(t,3),u,true)}function Ve(n){return(null==n?0:n.length)?kt(n,1):[]}function Ke(n){return n&&n.length?n[0]:F}function Ge(n){var t=null==n?0:n.length;return t?n[t-1]:F}function He(n,t){return n&&n.length&&t&&t.length?or(n,t):n}function Je(n){return null==n?n:Ni.call(n)}function Ye(n){if(!n||!n.length)return[];var t=0;return n=f(n,function(n){if(_u(n))return t=Di(n.length,t),true}),E(t,function(t){return l(n,j(t))})}function Qe(n,t){if(!n||!n.length)return[];var e=Ye(n);return null==t?e:l(e,function(n){
return r(t,F,n)})}function Xe(n){return n=On(n),n.__chain__=true,n}function nu(n,t){return t(n)}function tu(){return this}function ru(n,t){return(af(n)?u:oo)(n,je(t,3))}function eu(n,t){return(af(n)?i:fo)(n,je(t,3))}function uu(n,t){return(af(n)?l:Yt)(n,je(t,3))}function iu(n,t,r){return t=r?F:t,t=n&&null==t?n.length:t,le(n,128,F,F,F,F,t)}function ou(n,t){var r;if(typeof t!="function")throw new ei("Expected a function");return n=Ou(n),function(){return 0<--n&&(r=t.apply(this,arguments)),1>=n&&(t=F),
r}}function fu(n,t,r){return t=r?F:t,n=le(n,8,F,F,F,F,F,t),n.placeholder=fu.placeholder,n}function cu(n,t,r){return t=r?F:t,n=le(n,16,F,F,F,F,F,t),n.placeholder=cu.placeholder,n}function au(n,t,r){function e(t){var r=c,e=a;return c=a=F,_=t,s=n.apply(e,r)}function u(n){var r=n-p;return n-=_,p===F||r>=t||0>r||g&&n>=l}function i(){var n=Jo();if(u(n))return o(n);var r,e=jo;r=n-_,n=t-(n-p),r=g?Mi(n,l-r):n,h=e(i,r)}function o(n){return h=F,d&&c?e(n):(c=a=F,s)}function f(){var n=Jo(),r=u(n);if(c=arguments,
a=this,p=n,r){if(h===F)return _=n=p,h=jo(i,t),v?e(n):s;if(g)return h=jo(i,t),e(p)}return h===F&&(h=jo(i,t)),s}var c,a,l,s,h,p,_=0,v=false,g=false,d=true;if(typeof n!="function")throw new ei("Expected a function");return t=Iu(t)||0,bu(r)&&(v=!!r.leading,l=(g="maxWait"in r)?Di(Iu(r.maxWait)||0,t):l,d="trailing"in r?!!r.trailing:d),f.cancel=function(){h!==F&&ho(h),_=0,c=p=a=h=F},f.flush=function(){return h===F?s:o(Jo())},f}function lu(n,t){function r(){var e=arguments,u=t?t.apply(this,e):e[0],i=r.cache;return i.has(u)?i.get(u):(e=n.apply(this,e),
r.cache=i.set(u,e)||i,e)}if(typeof n!="function"||null!=t&&typeof t!="function")throw new ei("Expected a function");return r.cache=new(lu.Cache||Pn),r}function su(n){if(typeof n!="function")throw new ei("Expected a function");return function(){var t=arguments;switch(t.length){case 0:return!n.call(this);case 1:return!n.call(this,t[0]);case 2:return!n.call(this,t[0],t[1]);case 3:return!n.call(this,t[0],t[1],t[2])}return!n.apply(this,t)}}function hu(n,t){return n===t||n!==n&&t!==t}function pu(n){return null!=n&&yu(n.length)&&!gu(n);
}function _u(n){return xu(n)&&pu(n)}function vu(n){if(!xu(n))return false;var t=zt(n);return"[object Error]"==t||"[object DOMException]"==t||typeof n.message=="string"&&typeof n.name=="string"&&!wu(n)}function gu(n){return!!bu(n)&&(n=zt(n),"[object Function]"==n||"[object GeneratorFunction]"==n||"[object AsyncFunction]"==n||"[object Proxy]"==n)}function du(n){return typeof n=="number"&&n==Ou(n)}function yu(n){return typeof n=="number"&&-1<n&&0==n%1&&9007199254740991>=n}function bu(n){var t=typeof n;return null!=n&&("object"==t||"function"==t);
}function xu(n){return null!=n&&typeof n=="object"}function ju(n){return typeof n=="number"||xu(n)&&"[object Number]"==zt(n)}function wu(n){return!(!xu(n)||"[object Object]"!=zt(n))&&(n=bi(n),null===n||(n=ci.call(n,"constructor")&&n.constructor,typeof n=="function"&&n instanceof n&&fi.call(n)==hi))}function mu(n){return typeof n=="string"||!af(n)&&xu(n)&&"[object String]"==zt(n)}function Au(n){return typeof n=="symbol"||xu(n)&&"[object Symbol]"==zt(n)}function ku(n){if(!n)return[];if(pu(n))return mu(n)?$(n):Mr(n);
if(Ai&&n[Ai]){n=n[Ai]();for(var t,r=[];!(t=n.next()).done;)r.push(t.value);return r}return t=yo(n),("[object Map]"==t?L:"[object Set]"==t?D:Du)(n)}function Eu(n){return n?(n=Iu(n),n===N||n===-N?1.7976931348623157e308*(0>n?-1:1):n===n?n:0):0===n?n:0}function Ou(n){n=Eu(n);var t=n%1;return n===n?t?n-t:n:0}function Su(n){return n?gt(Ou(n),0,4294967295):0}function Iu(n){if(typeof n=="number")return n;if(Au(n))return P;if(bu(n)&&(n=typeof n.valueOf=="function"?n.valueOf():n,n=bu(n)?n+"":n),typeof n!="string")return 0===n?n:+n;
n=n.replace(cn,"");var t=bn.test(n);return t||jn.test(n)?Fn(n.slice(2),t?2:8):yn.test(n)?P:+n}function Ru(n){return Tr(n,Uu(n))}function zu(n){return null==n?"":jr(n)}function Wu(n,t,r){return n=null==n?F:It(n,t),n===F?r:n}function Bu(n,t){return null!=n&&ke(n,t,Lt)}function Lu(n){return pu(n)?Gn(n):Ht(n)}function Uu(n){if(pu(n))n=Gn(n,true);else if(bu(n)){var t,r=Le(n),e=[];for(t in n)("constructor"!=t||!r&&ci.call(n,t))&&e.push(t);n=e}else{if(t=[],null!=n)for(r in ni(n))t.push(r);n=t}return n}function Cu(n,t){
if(null==n)return{};var r=l(ye(n),function(n){return[n]});return t=je(t),ur(n,r,function(n,r){return t(n,r[0])})}function Du(n){return null==n?[]:I(n,Lu(n))}function Mu(n){return Nf(zu(n).toLowerCase())}function Tu(n){return(n=zu(n))&&n.replace(mn,rt).replace(Rn,"")}function $u(n,t,r){return n=zu(n),t=r?F:t,t===F?Ln.test(n)?n.match(Wn)||[]:n.match(_n)||[]:n.match(t)||[]}function Fu(n){return function(){return n}}function Nu(n){return n}function Pu(n){return Gt(typeof n=="function"?n:dt(n,1))}function Zu(n,t,r){
var e=Lu(t),i=St(t,e);null!=r||bu(t)&&(i.length||!e.length)||(r=t,t=n,n=this,i=St(t,Lu(t)));var o=!(bu(r)&&"chain"in r&&!r.chain),f=gu(n);return u(i,function(r){var e=t[r];n[r]=e,f&&(n.prototype[r]=function(){var t=this.__chain__;if(o||t){var r=n(this.__wrapped__);return(r.__actions__=Mr(this.__actions__)).push({func:e,args:arguments,thisArg:n}),r.__chain__=t,r}return e.apply(n,s([this.value()],arguments))})}),n}function qu(){}function Vu(n){return We(n)?j($e(n)):ir(n)}function Ku(){return[]}function Gu(){
return false}En=null==En?Zn:it.defaults(Zn.Object(),En,it.pick(Zn,Un));var Hu=En.Array,Ju=En.Date,Yu=En.Error,Qu=En.Function,Xu=En.Math,ni=En.Object,ti=En.RegExp,ri=En.String,ei=En.TypeError,ui=Hu.prototype,ii=ni.prototype,oi=En["__core-js_shared__"],fi=Qu.prototype.toString,ci=ii.hasOwnProperty,ai=0,li=function(){var n=/[^.]+$/.exec(oi&&oi.keys&&oi.keys.IE_PROTO||"");return n?"Symbol(src)_1."+n:""}(),si=ii.toString,hi=fi.call(ni),pi=Zn._,_i=ti("^"+fi.call(ci).replace(on,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),vi=Kn?En.Buffer:F,gi=En.Symbol,di=En.Uint8Array,yi=vi?vi.f:F,bi=U(ni.getPrototypeOf,ni),xi=ni.create,ji=ii.propertyIsEnumerable,wi=ui.splice,mi=gi?gi.isConcatSpreadable:F,Ai=gi?gi.iterator:F,ki=gi?gi.toStringTag:F,Ei=function(){
try{var n=Ae(ni,"defineProperty");return n({},"",{}),n}catch(n){}}(),Oi=En.clearTimeout!==Zn.clearTimeout&&En.clearTimeout,Si=Ju&&Ju.now!==Zn.Date.now&&Ju.now,Ii=En.setTimeout!==Zn.setTimeout&&En.setTimeout,Ri=Xu.ceil,zi=Xu.floor,Wi=ni.getOwnPropertySymbols,Bi=vi?vi.isBuffer:F,Li=En.isFinite,Ui=ui.join,Ci=U(ni.keys,ni),Di=Xu.max,Mi=Xu.min,Ti=Ju.now,$i=En.parseInt,Fi=Xu.random,Ni=ui.reverse,Pi=Ae(En,"DataView"),Zi=Ae(En,"Map"),qi=Ae(En,"Promise"),Vi=Ae(En,"Set"),Ki=Ae(En,"WeakMap"),Gi=Ae(ni,"create"),Hi=Ki&&new Ki,Ji={},Yi=Fe(Pi),Qi=Fe(Zi),Xi=Fe(qi),no=Fe(Vi),to=Fe(Ki),ro=gi?gi.prototype:F,eo=ro?ro.valueOf:F,uo=ro?ro.toString:F,io=function(){
function n(){}return function(t){return bu(t)?xi?xi(t):(n.prototype=t,t=new n,n.prototype=F,t):{}}}();On.templateSettings={escape:Q,evaluate:X,interpolate:nn,variable:"",imports:{_:On}},On.prototype=Sn.prototype,On.prototype.constructor=On,zn.prototype=io(Sn.prototype),zn.prototype.constructor=zn,Mn.prototype=io(Sn.prototype),Mn.prototype.constructor=Mn,Tn.prototype.clear=function(){this.__data__=Gi?Gi(null):{},this.size=0},Tn.prototype.delete=function(n){return n=this.has(n)&&delete this.__data__[n],
this.size-=n?1:0,n},Tn.prototype.get=function(n){var t=this.__data__;return Gi?(n=t[n],"__lodash_hash_undefined__"===n?F:n):ci.call(t,n)?t[n]:F},Tn.prototype.has=function(n){var t=this.__data__;return Gi?t[n]!==F:ci.call(t,n)},Tn.prototype.set=function(n,t){var r=this.__data__;return this.size+=this.has(n)?0:1,r[n]=Gi&&t===F?"__lodash_hash_undefined__":t,this},Nn.prototype.clear=function(){this.__data__=[],this.size=0},Nn.prototype.delete=function(n){var t=this.__data__;return n=lt(t,n),!(0>n)&&(n==t.length-1?t.pop():wi.call(t,n,1),
--this.size,true)},Nn.prototype.get=function(n){var t=this.__data__;return n=lt(t,n),0>n?F:t[n][1]},Nn.prototype.has=function(n){return-1<lt(this.__data__,n)},Nn.prototype.set=function(n,t){var r=this.__data__,e=lt(r,n);return 0>e?(++this.size,r.push([n,t])):r[e][1]=t,this},Pn.prototype.clear=function(){this.size=0,this.__data__={hash:new Tn,map:new(Zi||Nn),string:new Tn}},Pn.prototype.delete=function(n){return n=we(this,n).delete(n),this.size-=n?1:0,n},Pn.prototype.get=function(n){return we(this,n).get(n);
},Pn.prototype.has=function(n){return we(this,n).has(n)},Pn.prototype.set=function(n,t){var r=we(this,n),e=r.size;return r.set(n,t),this.size+=r.size==e?0:1,this},qn.prototype.add=qn.prototype.push=function(n){return this.__data__.set(n,"__lodash_hash_undefined__"),this},qn.prototype.has=function(n){return this.__data__.has(n)},Vn.prototype.clear=function(){this.__data__=new Nn,this.size=0},Vn.prototype.delete=function(n){var t=this.__data__;return n=t.delete(n),this.size=t.size,n},Vn.prototype.get=function(n){
return this.__data__.get(n)},Vn.prototype.has=function(n){return this.__data__.has(n)},Vn.prototype.set=function(n,t){var r=this.__data__;if(r instanceof Nn){var e=r.__data__;if(!Zi||199>e.length)return e.push([n,t]),this.size=++r.size,this;r=this.__data__=new Pn(e)}return r.set(n,t),this.size=r.size,this};var oo=Zr(Et),fo=Zr(Ot,true),co=qr(),ao=qr(true),lo=Hi?function(n,t){return Hi.set(n,t),n}:Nu,so=Ei?function(n,t){return Ei(n,"toString",{configurable:true,enumerable:false,value:Fu(t),writable:true})}:Nu,ho=Oi||function(n){
return Zn.clearTimeout(n)},po=Vi&&1/D(new Vi([,-0]))[1]==N?function(n){return new Vi(n)}:qu,_o=Hi?function(n){return Hi.get(n)}:qu,vo=Wi?function(n){return null==n?[]:(n=ni(n),f(Wi(n),function(t){return ji.call(n,t)}))}:Ku,go=Wi?function(n){for(var t=[];n;)s(t,vo(n)),n=bi(n);return t}:Ku,yo=zt;(Pi&&"[object DataView]"!=yo(new Pi(new ArrayBuffer(1)))||Zi&&"[object Map]"!=yo(new Zi)||qi&&"[object Promise]"!=yo(qi.resolve())||Vi&&"[object Set]"!=yo(new Vi)||Ki&&"[object WeakMap]"!=yo(new Ki))&&(yo=function(n){
var t=zt(n);if(n=(n="[object Object]"==t?n.constructor:F)?Fe(n):"")switch(n){case Yi:return"[object DataView]";case Qi:return"[object Map]";case Xi:return"[object Promise]";case no:return"[object Set]";case to:return"[object WeakMap]"}return t});var bo=oi?gu:Gu,xo=Me(lo),jo=Ii||function(n,t){return Zn.setTimeout(n,t)},wo=Me(so),mo=function(n){n=lu(n,function(n){return 500===t.size&&t.clear(),n});var t=n.cache;return n}(function(n){var t=[];return en.test(n)&&t.push(""),n.replace(un,function(n,r,e,u){
t.push(e?u.replace(vn,"$1"):r||n)}),t}),Ao=lr(function(n,t){return _u(n)?jt(n,kt(t,1,_u,true)):[]}),ko=lr(function(n,t){var r=Ge(t);return _u(r)&&(r=F),_u(n)?jt(n,kt(t,1,_u,true),je(r,2)):[]}),Eo=lr(function(n,t){var r=Ge(t);return _u(r)&&(r=F),_u(n)?jt(n,kt(t,1,_u,true),F,r):[]}),Oo=lr(function(n){var t=l(n,Sr);return t.length&&t[0]===n[0]?Ut(t):[]}),So=lr(function(n){var t=Ge(n),r=l(n,Sr);return t===Ge(r)?t=F:r.pop(),r.length&&r[0]===n[0]?Ut(r,je(t,2)):[]}),Io=lr(function(n){var t=Ge(n),r=l(n,Sr);return(t=typeof t=="function"?t:F)&&r.pop(),
r.length&&r[0]===n[0]?Ut(r,F,t):[]}),Ro=lr(He),zo=ge(function(n,t){var r=null==n?0:n.length,e=vt(n,t);return fr(n,l(t,function(n){return Re(n,r)?+n:n}).sort(Ur)),e}),Wo=lr(function(n){return wr(kt(n,1,_u,true))}),Bo=lr(function(n){var t=Ge(n);return _u(t)&&(t=F),wr(kt(n,1,_u,true),je(t,2))}),Lo=lr(function(n){var t=Ge(n),t=typeof t=="function"?t:F;return wr(kt(n,1,_u,true),F,t)}),Uo=lr(function(n,t){return _u(n)?jt(n,t):[]}),Co=lr(function(n){return Er(f(n,_u))}),Do=lr(function(n){var t=Ge(n);return _u(t)&&(t=F),
Er(f(n,_u),je(t,2))}),Mo=lr(function(n){var t=Ge(n),t=typeof t=="function"?t:F;return Er(f(n,_u),F,t)}),To=lr(Ye),$o=lr(function(n){var t=n.length,t=1<t?n[t-1]:F,t=typeof t=="function"?(n.pop(),t):F;return Qe(n,t)}),Fo=ge(function(n){function t(t){return vt(t,n)}var r=n.length,e=r?n[0]:0,u=this.__wrapped__;return!(1<r||this.__actions__.length)&&u instanceof Mn&&Re(e)?(u=u.slice(e,+e+(r?1:0)),u.__actions__.push({func:nu,args:[t],thisArg:F}),new zn(u,this.__chain__).thru(function(n){return r&&!n.length&&n.push(F),
n})):this.thru(t)}),No=Nr(function(n,t,r){ci.call(n,r)?++n[r]:_t(n,r,1)}),Po=Yr(Ze),Zo=Yr(qe),qo=Nr(function(n,t,r){ci.call(n,r)?n[r].push(t):_t(n,r,[t])}),Vo=lr(function(n,t,e){var u=-1,i=typeof t=="function",o=pu(n)?Hu(n.length):[];return oo(n,function(n){o[++u]=i?r(t,n,e):Dt(n,t,e)}),o}),Ko=Nr(function(n,t,r){_t(n,r,t)}),Go=Nr(function(n,t,r){n[r?0:1].push(t)},function(){return[[],[]]}),Ho=lr(function(n,t){if(null==n)return[];var r=t.length;return 1<r&&ze(n,t[0],t[1])?t=[]:2<r&&ze(t[0],t[1],t[2])&&(t=[t[0]]),
rr(n,kt(t,1),[])}),Jo=Si||function(){return Zn.Date.now()},Yo=lr(function(n,t,r){var e=1;if(r.length)var u=C(r,xe(Yo)),e=32|e;return le(n,e,t,r,u)}),Qo=lr(function(n,t,r){var e=3;if(r.length)var u=C(r,xe(Qo)),e=32|e;return le(t,e,n,r,u)}),Xo=lr(function(n,t){return xt(n,1,t)}),nf=lr(function(n,t,r){return xt(n,Iu(t)||0,r)});lu.Cache=Pn;var tf=lr(function(n,t){t=1==t.length&&af(t[0])?l(t[0],S(je())):l(kt(t,1),S(je()));var e=t.length;return lr(function(u){for(var i=-1,o=Mi(u.length,e);++i<o;)u[i]=t[i].call(this,u[i]);
return r(n,this,u)})}),rf=lr(function(n,t){return le(n,32,F,t,C(t,xe(rf)))}),ef=lr(function(n,t){return le(n,64,F,t,C(t,xe(ef)))}),uf=ge(function(n,t){return le(n,256,F,F,F,t)}),of=oe(Wt),ff=oe(function(n,t){return n>=t}),cf=Mt(function(){return arguments}())?Mt:function(n){return xu(n)&&ci.call(n,"callee")&&!ji.call(n,"callee")},af=Hu.isArray,lf=Hn?S(Hn):Tt,sf=Bi||Gu,hf=Jn?S(Jn):$t,pf=Yn?S(Yn):Nt,_f=Qn?S(Qn):qt,vf=Xn?S(Xn):Vt,gf=nt?S(nt):Kt,df=oe(Jt),yf=oe(function(n,t){return n<=t}),bf=Pr(function(n,t){
if(Le(t)||pu(t))Tr(t,Lu(t),n);else for(var r in t)ci.call(t,r)&&at(n,r,t[r])}),xf=Pr(function(n,t){Tr(t,Uu(t),n)}),jf=Pr(function(n,t,r,e){Tr(t,Uu(t),n,e)}),wf=Pr(function(n,t,r,e){Tr(t,Lu(t),n,e)}),mf=ge(vt),Af=lr(function(n){return n.push(F,se),r(jf,F,n)}),kf=lr(function(n){return n.push(F,he),r(Rf,F,n)}),Ef=ne(function(n,t,r){n[t]=r},Fu(Nu)),Of=ne(function(n,t,r){ci.call(n,t)?n[t].push(r):n[t]=[r]},je),Sf=lr(Dt),If=Pr(function(n,t,r){nr(n,t,r)}),Rf=Pr(function(n,t,r,e){nr(n,t,r,e)}),zf=ge(function(n,t){
var r={};if(null==n)return r;var e=false;t=l(t,function(t){return t=Rr(t,n),e||(e=1<t.length),t}),Tr(n,ye(n),r),e&&(r=dt(r,7,pe));for(var u=t.length;u--;)mr(r,t[u]);return r}),Wf=ge(function(n,t){return null==n?{}:er(n,t)}),Bf=ae(Lu),Lf=ae(Uu),Uf=Gr(function(n,t,r){return t=t.toLowerCase(),n+(r?Mu(t):t)}),Cf=Gr(function(n,t,r){return n+(r?"-":"")+t.toLowerCase()}),Df=Gr(function(n,t,r){return n+(r?" ":"")+t.toLowerCase()}),Mf=Kr("toLowerCase"),Tf=Gr(function(n,t,r){return n+(r?"_":"")+t.toLowerCase();
}),$f=Gr(function(n,t,r){return n+(r?" ":"")+Nf(t)}),Ff=Gr(function(n,t,r){return n+(r?" ":"")+t.toUpperCase()}),Nf=Kr("toUpperCase"),Pf=lr(function(n,t){try{return r(n,F,t)}catch(n){return vu(n)?n:new Yu(n)}}),Zf=ge(function(n,t){return u(t,function(t){t=$e(t),_t(n,t,Yo(n[t],n))}),n}),qf=Qr(),Vf=Qr(true),Kf=lr(function(n,t){return function(r){return Dt(r,n,t)}}),Gf=lr(function(n,t){return function(r){return Dt(n,r,t)}}),Hf=re(l),Jf=re(o),Yf=re(_),Qf=ie(),Xf=ie(true),nc=te(function(n,t){return n+t},0),tc=ce("ceil"),rc=te(function(n,t){
return n/t},1),ec=ce("floor"),uc=te(function(n,t){return n*t},1),ic=ce("round"),oc=te(function(n,t){return n-t},0);return On.after=function(n,t){if(typeof t!="function")throw new ei("Expected a function");return n=Ou(n),function(){if(1>--n)return t.apply(this,arguments)}},On.ary=iu,On.assign=bf,On.assignIn=xf,On.assignInWith=jf,On.assignWith=wf,On.at=mf,On.before=ou,On.bind=Yo,On.bindAll=Zf,On.bindKey=Qo,On.castArray=function(){if(!arguments.length)return[];var n=arguments[0];return af(n)?n:[n]},
On.chain=Xe,On.chunk=function(n,t,r){if(t=(r?ze(n,t,r):t===F)?1:Di(Ou(t),0),r=null==n?0:n.length,!r||1>t)return[];for(var e=0,u=0,i=Hu(Ri(r/t));e<r;)i[u++]=vr(n,e,e+=t);return i},On.compact=function(n){for(var t=-1,r=null==n?0:n.length,e=0,u=[];++t<r;){var i=n[t];i&&(u[e++]=i)}return u},On.concat=function(){var n=arguments.length;if(!n)return[];for(var t=Hu(n-1),r=arguments[0];n--;)t[n-1]=arguments[n];return s(af(r)?Mr(r):[r],kt(t,1))},On.cond=function(n){var t=null==n?0:n.length,e=je();return n=t?l(n,function(n){
if("function"!=typeof n[1])throw new ei("Expected a function");return[e(n[0]),n[1]]}):[],lr(function(e){for(var u=-1;++u<t;){var i=n[u];if(r(i[0],this,e))return r(i[1],this,e)}})},On.conforms=function(n){return yt(dt(n,1))},On.constant=Fu,On.countBy=No,On.create=function(n,t){var r=io(n);return null==t?r:ht(r,t)},On.curry=fu,On.curryRight=cu,On.debounce=au,On.defaults=Af,On.defaultsDeep=kf,On.defer=Xo,On.delay=nf,On.difference=Ao,On.differenceBy=ko,On.differenceWith=Eo,On.drop=function(n,t,r){var e=null==n?0:n.length;
return e?(t=r||t===F?1:Ou(t),vr(n,0>t?0:t,e)):[]},On.dropRight=function(n,t,r){var e=null==n?0:n.length;return e?(t=r||t===F?1:Ou(t),t=e-t,vr(n,0,0>t?0:t)):[]},On.dropRightWhile=function(n,t){return n&&n.length?Ar(n,je(t,3),true,true):[]},On.dropWhile=function(n,t){return n&&n.length?Ar(n,je(t,3),true):[]},On.fill=function(n,t,r,e){var u=null==n?0:n.length;if(!u)return[];for(r&&typeof r!="number"&&ze(n,t,r)&&(r=0,e=u),u=n.length,r=Ou(r),0>r&&(r=-r>u?0:u+r),e=e===F||e>u?u:Ou(e),0>e&&(e+=u),e=r>e?0:Su(e);r<e;)n[r++]=t;
return n},On.filter=function(n,t){return(af(n)?f:At)(n,je(t,3))},On.flatMap=function(n,t){return kt(uu(n,t),1)},On.flatMapDeep=function(n,t){return kt(uu(n,t),N)},On.flatMapDepth=function(n,t,r){return r=r===F?1:Ou(r),kt(uu(n,t),r)},On.flatten=Ve,On.flattenDeep=function(n){return(null==n?0:n.length)?kt(n,N):[]},On.flattenDepth=function(n,t){return null!=n&&n.length?(t=t===F?1:Ou(t),kt(n,t)):[]},On.flip=function(n){return le(n,512)},On.flow=qf,On.flowRight=Vf,On.fromPairs=function(n){for(var t=-1,r=null==n?0:n.length,e={};++t<r;){
var u=n[t];e[u[0]]=u[1]}return e},On.functions=function(n){return null==n?[]:St(n,Lu(n))},On.functionsIn=function(n){return null==n?[]:St(n,Uu(n))},On.groupBy=qo,On.initial=function(n){return(null==n?0:n.length)?vr(n,0,-1):[]},On.intersection=Oo,On.intersectionBy=So,On.intersectionWith=Io,On.invert=Ef,On.invertBy=Of,On.invokeMap=Vo,On.iteratee=Pu,On.keyBy=Ko,On.keys=Lu,On.keysIn=Uu,On.map=uu,On.mapKeys=function(n,t){var r={};return t=je(t,3),Et(n,function(n,e,u){_t(r,t(n,e,u),n)}),r},On.mapValues=function(n,t){
var r={};return t=je(t,3),Et(n,function(n,e,u){_t(r,e,t(n,e,u))}),r},On.matches=function(n){return Qt(dt(n,1))},On.matchesProperty=function(n,t){return Xt(n,dt(t,1))},On.memoize=lu,On.merge=If,On.mergeWith=Rf,On.method=Kf,On.methodOf=Gf,On.mixin=Zu,On.negate=su,On.nthArg=function(n){return n=Ou(n),lr(function(t){return tr(t,n)})},On.omit=zf,On.omitBy=function(n,t){return Cu(n,su(je(t)))},On.once=function(n){return ou(2,n)},On.orderBy=function(n,t,r,e){return null==n?[]:(af(t)||(t=null==t?[]:[t]),
r=e?F:r,af(r)||(r=null==r?[]:[r]),rr(n,t,r))},On.over=Hf,On.overArgs=tf,On.overEvery=Jf,On.overSome=Yf,On.partial=rf,On.partialRight=ef,On.partition=Go,On.pick=Wf,On.pickBy=Cu,On.property=Vu,On.propertyOf=function(n){return function(t){return null==n?F:It(n,t)}},On.pull=Ro,On.pullAll=He,On.pullAllBy=function(n,t,r){return n&&n.length&&t&&t.length?or(n,t,je(r,2)):n},On.pullAllWith=function(n,t,r){return n&&n.length&&t&&t.length?or(n,t,F,r):n},On.pullAt=zo,On.range=Qf,On.rangeRight=Xf,On.rearg=uf,On.reject=function(n,t){
return(af(n)?f:At)(n,su(je(t,3)))},On.remove=function(n,t){var r=[];if(!n||!n.length)return r;var e=-1,u=[],i=n.length;for(t=je(t,3);++e<i;){var o=n[e];t(o,e,n)&&(r.push(o),u.push(e))}return fr(n,u),r},On.rest=function(n,t){if(typeof n!="function")throw new ei("Expected a function");return t=t===F?t:Ou(t),lr(n,t)},On.reverse=Je,On.sampleSize=function(n,t,r){return t=(r?ze(n,t,r):t===F)?1:Ou(t),(af(n)?ot:hr)(n,t)},On.set=function(n,t,r){return null==n?n:pr(n,t,r)},On.setWith=function(n,t,r,e){return e=typeof e=="function"?e:F,
null==n?n:pr(n,t,r,e)},On.shuffle=function(n){return(af(n)?ft:_r)(n)},On.slice=function(n,t,r){var e=null==n?0:n.length;return e?(r&&typeof r!="number"&&ze(n,t,r)?(t=0,r=e):(t=null==t?0:Ou(t),r=r===F?e:Ou(r)),vr(n,t,r)):[]},On.sortBy=Ho,On.sortedUniq=function(n){return n&&n.length?br(n):[]},On.sortedUniqBy=function(n,t){return n&&n.length?br(n,je(t,2)):[]},On.split=function(n,t,r){return r&&typeof r!="number"&&ze(n,t,r)&&(t=r=F),r=r===F?4294967295:r>>>0,r?(n=zu(n))&&(typeof t=="string"||null!=t&&!_f(t))&&(t=jr(t),
!t&&Bn.test(n))?zr($(n),0,r):n.split(t,r):[]},On.spread=function(n,t){if(typeof n!="function")throw new ei("Expected a function");return t=null==t?0:Di(Ou(t),0),lr(function(e){var u=e[t];return e=zr(e,0,t),u&&s(e,u),r(n,this,e)})},On.tail=function(n){var t=null==n?0:n.length;return t?vr(n,1,t):[]},On.take=function(n,t,r){return n&&n.length?(t=r||t===F?1:Ou(t),vr(n,0,0>t?0:t)):[]},On.takeRight=function(n,t,r){var e=null==n?0:n.length;return e?(t=r||t===F?1:Ou(t),t=e-t,vr(n,0>t?0:t,e)):[]},On.takeRightWhile=function(n,t){
return n&&n.length?Ar(n,je(t,3),false,true):[]},On.takeWhile=function(n,t){return n&&n.length?Ar(n,je(t,3)):[]},On.tap=function(n,t){return t(n),n},On.throttle=function(n,t,r){var e=true,u=true;if(typeof n!="function")throw new ei("Expected a function");return bu(r)&&(e="leading"in r?!!r.leading:e,u="trailing"in r?!!r.trailing:u),au(n,t,{leading:e,maxWait:t,trailing:u})},On.thru=nu,On.toArray=ku,On.toPairs=Bf,On.toPairsIn=Lf,On.toPath=function(n){return af(n)?l(n,$e):Au(n)?[n]:Mr(mo(zu(n)))},On.toPlainObject=Ru,
On.transform=function(n,t,r){var e=af(n),i=e||sf(n)||gf(n);if(t=je(t,4),null==r){var o=n&&n.constructor;r=i?e?new o:[]:bu(n)&&gu(o)?io(bi(n)):{}}return(i?u:Et)(n,function(n,e,u){return t(r,n,e,u)}),r},On.unary=function(n){return iu(n,1)},On.union=Wo,On.unionBy=Bo,On.unionWith=Lo,On.uniq=function(n){return n&&n.length?wr(n):[]},On.uniqBy=function(n,t){return n&&n.length?wr(n,je(t,2)):[]},On.uniqWith=function(n,t){return t=typeof t=="function"?t:F,n&&n.length?wr(n,F,t):[]},On.unset=function(n,t){return null==n||mr(n,t);
},On.unzip=Ye,On.unzipWith=Qe,On.update=function(n,t,r){return null==n?n:pr(n,t,Ir(r)(It(n,t)),void 0)},On.updateWith=function(n,t,r,e){return e=typeof e=="function"?e:F,null!=n&&(n=pr(n,t,Ir(r)(It(n,t)),e)),n},On.values=Du,On.valuesIn=function(n){return null==n?[]:I(n,Uu(n))},On.without=Uo,On.words=$u,On.wrap=function(n,t){return rf(Ir(t),n)},On.xor=Co,On.xorBy=Do,On.xorWith=Mo,On.zip=To,On.zipObject=function(n,t){return Or(n||[],t||[],at)},On.zipObjectDeep=function(n,t){return Or(n||[],t||[],pr);
},On.zipWith=$o,On.entries=Bf,On.entriesIn=Lf,On.extend=xf,On.extendWith=jf,Zu(On,On),On.add=nc,On.attempt=Pf,On.camelCase=Uf,On.capitalize=Mu,On.ceil=tc,On.clamp=function(n,t,r){return r===F&&(r=t,t=F),r!==F&&(r=Iu(r),r=r===r?r:0),t!==F&&(t=Iu(t),t=t===t?t:0),gt(Iu(n),t,r)},On.clone=function(n){return dt(n,4)},On.cloneDeep=function(n){return dt(n,5)},On.cloneDeepWith=function(n,t){return t=typeof t=="function"?t:F,dt(n,5,t)},On.cloneWith=function(n,t){return t=typeof t=="function"?t:F,dt(n,4,t)},
On.conformsTo=function(n,t){return null==t||bt(n,t,Lu(t))},On.deburr=Tu,On.defaultTo=function(n,t){return null==n||n!==n?t:n},On.divide=rc,On.endsWith=function(n,t,r){n=zu(n),t=jr(t);var e=n.length,e=r=r===F?e:gt(Ou(r),0,e);return r-=t.length,0<=r&&n.slice(r,e)==t},On.eq=hu,On.escape=function(n){return(n=zu(n))&&Y.test(n)?n.replace(H,et):n},On.escapeRegExp=function(n){return(n=zu(n))&&fn.test(n)?n.replace(on,"\\$&"):n},On.every=function(n,t,r){var e=af(n)?o:wt;return r&&ze(n,t,r)&&(t=F),e(n,je(t,3));
},On.find=Po,On.findIndex=Ze,On.findKey=function(n,t){return v(n,je(t,3),Et)},On.findLast=Zo,On.findLastIndex=qe,On.findLastKey=function(n,t){return v(n,je(t,3),Ot)},On.floor=ec,On.forEach=ru,On.forEachRight=eu,On.forIn=function(n,t){return null==n?n:co(n,je(t,3),Uu)},On.forInRight=function(n,t){return null==n?n:ao(n,je(t,3),Uu)},On.forOwn=function(n,t){return n&&Et(n,je(t,3))},On.forOwnRight=function(n,t){return n&&Ot(n,je(t,3))},On.get=Wu,On.gt=of,On.gte=ff,On.has=function(n,t){return null!=n&&ke(n,t,Bt);
},On.hasIn=Bu,On.head=Ke,On.identity=Nu,On.includes=function(n,t,r,e){return n=pu(n)?n:Du(n),r=r&&!e?Ou(r):0,e=n.length,0>r&&(r=Di(e+r,0)),mu(n)?r<=e&&-1<n.indexOf(t,r):!!e&&-1<d(n,t,r)},On.indexOf=function(n,t,r){var e=null==n?0:n.length;return e?(r=null==r?0:Ou(r),0>r&&(r=Di(e+r,0)),d(n,t,r)):-1},On.inRange=function(n,t,r){return t=Eu(t),r===F?(r=t,t=0):r=Eu(r),n=Iu(n),n>=Mi(t,r)&&n<Di(t,r)},On.invoke=Sf,On.isArguments=cf,On.isArray=af,On.isArrayBuffer=lf,On.isArrayLike=pu,On.isArrayLikeObject=_u,
On.isBoolean=function(n){return true===n||false===n||xu(n)&&"[object Boolean]"==zt(n)},On.isBuffer=sf,On.isDate=hf,On.isElement=function(n){return xu(n)&&1===n.nodeType&&!wu(n)},On.isEmpty=function(n){if(null==n)return true;if(pu(n)&&(af(n)||typeof n=="string"||typeof n.splice=="function"||sf(n)||gf(n)||cf(n)))return!n.length;var t=yo(n);if("[object Map]"==t||"[object Set]"==t)return!n.size;if(Le(n))return!Ht(n).length;for(var r in n)if(ci.call(n,r))return false;return true},On.isEqual=function(n,t){return Ft(n,t);
},On.isEqualWith=function(n,t,r){var e=(r=typeof r=="function"?r:F)?r(n,t):F;return e===F?Ft(n,t,F,r):!!e},On.isError=vu,On.isFinite=function(n){return typeof n=="number"&&Li(n)},On.isFunction=gu,On.isInteger=du,On.isLength=yu,On.isMap=pf,On.isMatch=function(n,t){return n===t||Pt(n,t,me(t))},On.isMatchWith=function(n,t,r){return r=typeof r=="function"?r:F,Pt(n,t,me(t),r)},On.isNaN=function(n){return ju(n)&&n!=+n},On.isNative=function(n){if(bo(n))throw new Yu("Unsupported core-js use. Try https://npms.io/search?q=ponyfill.");
return Zt(n)},On.isNil=function(n){return null==n},On.isNull=function(n){return null===n},On.isNumber=ju,On.isObject=bu,On.isObjectLike=xu,On.isPlainObject=wu,On.isRegExp=_f,On.isSafeInteger=function(n){return du(n)&&-9007199254740991<=n&&9007199254740991>=n},On.isSet=vf,On.isString=mu,On.isSymbol=Au,On.isTypedArray=gf,On.isUndefined=function(n){return n===F},On.isWeakMap=function(n){return xu(n)&&"[object WeakMap]"==yo(n)},On.isWeakSet=function(n){return xu(n)&&"[object WeakSet]"==zt(n)},On.join=function(n,t){
return null==n?"":Ui.call(n,t)},On.kebabCase=Cf,On.last=Ge,On.lastIndexOf=function(n,t,r){var e=null==n?0:n.length;if(!e)return-1;var u=e;if(r!==F&&(u=Ou(r),u=0>u?Di(e+u,0):Mi(u,e-1)),t===t){for(r=u+1;r--&&n[r]!==t;);n=r}else n=g(n,b,u,true);return n},On.lowerCase=Df,On.lowerFirst=Mf,On.lt=df,On.lte=yf,On.max=function(n){return n&&n.length?mt(n,Nu,Wt):F},On.maxBy=function(n,t){return n&&n.length?mt(n,je(t,2),Wt):F},On.mean=function(n){return x(n,Nu)},On.meanBy=function(n,t){return x(n,je(t,2))},On.min=function(n){
return n&&n.length?mt(n,Nu,Jt):F},On.minBy=function(n,t){return n&&n.length?mt(n,je(t,2),Jt):F},On.stubArray=Ku,On.stubFalse=Gu,On.stubObject=function(){return{}},On.stubString=function(){return""},On.stubTrue=function(){return true},On.multiply=uc,On.nth=function(n,t){return n&&n.length?tr(n,Ou(t)):F},On.noConflict=function(){return Zn._===this&&(Zn._=pi),this},On.noop=qu,On.now=Jo,On.pad=function(n,t,r){n=zu(n);var e=(t=Ou(t))?T(n):0;return!t||e>=t?n:(t=(t-e)/2,ee(zi(t),r)+n+ee(Ri(t),r))},On.padEnd=function(n,t,r){
n=zu(n);var e=(t=Ou(t))?T(n):0;return t&&e<t?n+ee(t-e,r):n},On.padStart=function(n,t,r){n=zu(n);var e=(t=Ou(t))?T(n):0;return t&&e<t?ee(t-e,r)+n:n},On.parseInt=function(n,t,r){return r||null==t?t=0:t&&(t=+t),$i(zu(n).replace(an,""),t||0)},On.random=function(n,t,r){if(r&&typeof r!="boolean"&&ze(n,t,r)&&(t=r=F),r===F&&(typeof t=="boolean"?(r=t,t=F):typeof n=="boolean"&&(r=n,n=F)),n===F&&t===F?(n=0,t=1):(n=Eu(n),t===F?(t=n,n=0):t=Eu(t)),n>t){var e=n;n=t,t=e}return r||n%1||t%1?(r=Fi(),Mi(n+r*(t-n+$n("1e-"+((r+"").length-1))),t)):cr(n,t);
},On.reduce=function(n,t,r){var e=af(n)?h:m,u=3>arguments.length;return e(n,je(t,4),r,u,oo)},On.reduceRight=function(n,t,r){var e=af(n)?p:m,u=3>arguments.length;return e(n,je(t,4),r,u,fo)},On.repeat=function(n,t,r){return t=(r?ze(n,t,r):t===F)?1:Ou(t),ar(zu(n),t)},On.replace=function(){var n=arguments,t=zu(n[0]);return 3>n.length?t:t.replace(n[1],n[2])},On.result=function(n,t,r){t=Rr(t,n);var e=-1,u=t.length;for(u||(u=1,n=F);++e<u;){var i=null==n?F:n[$e(t[e])];i===F&&(e=u,i=r),n=gu(i)?i.call(n):i;
}return n},On.round=ic,On.runInContext=w,On.sample=function(n){return(af(n)?tt:sr)(n)},On.size=function(n){if(null==n)return 0;if(pu(n))return mu(n)?T(n):n.length;var t=yo(n);return"[object Map]"==t||"[object Set]"==t?n.size:Ht(n).length},On.snakeCase=Tf,On.some=function(n,t,r){var e=af(n)?_:gr;return r&&ze(n,t,r)&&(t=F),e(n,je(t,3))},On.sortedIndex=function(n,t){return dr(n,t)},On.sortedIndexBy=function(n,t,r){return yr(n,t,je(r,2))},On.sortedIndexOf=function(n,t){var r=null==n?0:n.length;if(r){
var e=dr(n,t);if(e<r&&hu(n[e],t))return e}return-1},On.sortedLastIndex=function(n,t){return dr(n,t,true)},On.sortedLastIndexBy=function(n,t,r){return yr(n,t,je(r,2),true)},On.sortedLastIndexOf=function(n,t){if(null==n?0:n.length){var r=dr(n,t,true)-1;if(hu(n[r],t))return r}return-1},On.startCase=$f,On.startsWith=function(n,t,r){return n=zu(n),r=null==r?0:gt(Ou(r),0,n.length),t=jr(t),n.slice(r,r+t.length)==t},On.subtract=oc,On.sum=function(n){return n&&n.length?k(n,Nu):0},On.sumBy=function(n,t){return n&&n.length?k(n,je(t,2)):0;
},On.template=function(n,t,r){var e=On.templateSettings;r&&ze(n,t,r)&&(t=F),n=zu(n),t=jf({},t,e,se),r=jf({},t.imports,e.imports,se);var u,i,o=Lu(r),f=I(r,o),c=0;r=t.interpolate||An;var a="__p+='";r=ti((t.escape||An).source+"|"+r.source+"|"+(r===nn?gn:An).source+"|"+(t.evaluate||An).source+"|$","g");var l="sourceURL"in t?"//# sourceURL="+t.sourceURL+"\n":"";if(n.replace(r,function(t,r,e,o,f,l){return e||(e=o),a+=n.slice(c,l).replace(kn,B),r&&(u=true,a+="'+__e("+r+")+'"),f&&(i=true,a+="';"+f+";\n__p+='"),
e&&(a+="'+((__t=("+e+"))==null?'':__t)+'"),c=l+t.length,t}),a+="';",(t=t.variable)||(a="with(obj){"+a+"}"),a=(i?a.replace(q,""):a).replace(V,"$1").replace(K,"$1;"),a="function("+(t||"obj")+"){"+(t?"":"obj||(obj={});")+"var __t,__p=''"+(u?",__e=_.escape":"")+(i?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+a+"return __p}",t=Pf(function(){return Qu(o,l+"return "+a).apply(F,f)}),t.source=a,vu(t))throw t;return t},On.times=function(n,t){if(n=Ou(n),1>n||9007199254740991<n)return[];
var r=4294967295,e=Mi(n,4294967295);for(t=je(t),n-=4294967295,e=E(e,t);++r<n;)t(r);return e},On.toFinite=Eu,On.toInteger=Ou,On.toLength=Su,On.toLower=function(n){return zu(n).toLowerCase()},On.toNumber=Iu,On.toSafeInteger=function(n){return n?gt(Ou(n),-9007199254740991,9007199254740991):0===n?n:0},On.toString=zu,On.toUpper=function(n){return zu(n).toUpperCase()},On.trim=function(n,t,r){return(n=zu(n))&&(r||t===F)?n.replace(cn,""):n&&(t=jr(t))?(n=$(n),r=$(t),t=z(n,r),r=W(n,r)+1,zr(n,t,r).join("")):n;
},On.trimEnd=function(n,t,r){return(n=zu(n))&&(r||t===F)?n.replace(ln,""):n&&(t=jr(t))?(n=$(n),t=W(n,$(t))+1,zr(n,0,t).join("")):n},On.trimStart=function(n,t,r){return(n=zu(n))&&(r||t===F)?n.replace(an,""):n&&(t=jr(t))?(n=$(n),t=z(n,$(t)),zr(n,t).join("")):n},On.truncate=function(n,t){var r=30,e="...";if(bu(t))var u="separator"in t?t.separator:u,r="length"in t?Ou(t.length):r,e="omission"in t?jr(t.omission):e;n=zu(n);var i=n.length;if(Bn.test(n))var o=$(n),i=o.length;if(r>=i)return n;if(i=r-T(e),1>i)return e;
if(r=o?zr(o,0,i).join(""):n.slice(0,i),u===F)return r+e;if(o&&(i+=r.length-i),_f(u)){if(n.slice(i).search(u)){var f=r;for(u.global||(u=ti(u.source,zu(dn.exec(u))+"g")),u.lastIndex=0;o=u.exec(f);)var c=o.index;r=r.slice(0,c===F?i:c)}}else n.indexOf(jr(u),i)!=i&&(u=r.lastIndexOf(u),-1<u&&(r=r.slice(0,u)));return r+e},On.unescape=function(n){return(n=zu(n))&&J.test(n)?n.replace(G,ut):n},On.uniqueId=function(n){var t=++ai;return zu(n)+t},On.upperCase=Ff,On.upperFirst=Nf,On.each=ru,On.eachRight=eu,On.first=Ke,
Zu(On,function(){var n={};return Et(On,function(t,r){ci.call(On.prototype,r)||(n[r]=t)}),n}(),{chain:false}),On.VERSION="4.17.4",u("bind bindKey curry curryRight partial partialRight".split(" "),function(n){On[n].placeholder=On}),u(["drop","take"],function(n,t){Mn.prototype[n]=function(r){r=r===F?1:Di(Ou(r),0);var e=this.__filtered__&&!t?new Mn(this):this.clone();return e.__filtered__?e.__takeCount__=Mi(r,e.__takeCount__):e.__views__.push({size:Mi(r,4294967295),type:n+(0>e.__dir__?"Right":"")}),e},Mn.prototype[n+"Right"]=function(t){
return this.reverse()[n](t).reverse()}}),u(["filter","map","takeWhile"],function(n,t){var r=t+1,e=1==r||3==r;Mn.prototype[n]=function(n){var t=this.clone();return t.__iteratees__.push({iteratee:je(n,3),type:r}),t.__filtered__=t.__filtered__||e,t}}),u(["head","last"],function(n,t){var r="take"+(t?"Right":"");Mn.prototype[n]=function(){return this[r](1).value()[0]}}),u(["initial","tail"],function(n,t){var r="drop"+(t?"":"Right");Mn.prototype[n]=function(){return this.__filtered__?new Mn(this):this[r](1);
}}),Mn.prototype.compact=function(){return this.filter(Nu)},Mn.prototype.find=function(n){return this.filter(n).head()},Mn.prototype.findLast=function(n){return this.reverse().find(n)},Mn.prototype.invokeMap=lr(function(n,t){return typeof n=="function"?new Mn(this):this.map(function(r){return Dt(r,n,t)})}),Mn.prototype.reject=function(n){return this.filter(su(je(n)))},Mn.prototype.slice=function(n,t){n=Ou(n);var r=this;return r.__filtered__&&(0<n||0>t)?new Mn(r):(0>n?r=r.takeRight(-n):n&&(r=r.drop(n)),
t!==F&&(t=Ou(t),r=0>t?r.dropRight(-t):r.take(t-n)),r)},Mn.prototype.takeRightWhile=function(n){return this.reverse().takeWhile(n).reverse()},Mn.prototype.toArray=function(){return this.take(4294967295)},Et(Mn.prototype,function(n,t){var r=/^(?:filter|find|map|reject)|While$/.test(t),e=/^(?:head|last)$/.test(t),u=On[e?"take"+("last"==t?"Right":""):t],i=e||/^find/.test(t);u&&(On.prototype[t]=function(){function t(n){return n=u.apply(On,s([n],f)),e&&h?n[0]:n}var o=this.__wrapped__,f=e?[1]:arguments,c=o instanceof Mn,a=f[0],l=c||af(o);
l&&r&&typeof a=="function"&&1!=a.length&&(c=l=false);var h=this.__chain__,p=!!this.__actions__.length,a=i&&!h,c=c&&!p;return!i&&l?(o=c?o:new Mn(this),o=n.apply(o,f),o.__actions__.push({func:nu,args:[t],thisArg:F}),new zn(o,h)):a&&c?n.apply(this,f):(o=this.thru(t),a?e?o.value()[0]:o.value():o)})}),u("pop push shift sort splice unshift".split(" "),function(n){var t=ui[n],r=/^(?:push|sort|unshift)$/.test(n)?"tap":"thru",e=/^(?:pop|shift)$/.test(n);On.prototype[n]=function(){var n=arguments;if(e&&!this.__chain__){
var u=this.value();return t.apply(af(u)?u:[],n)}return this[r](function(r){return t.apply(af(r)?r:[],n)})}}),Et(Mn.prototype,function(n,t){var r=On[t];if(r){var e=r.name+"";(Ji[e]||(Ji[e]=[])).push({name:t,func:r})}}),Ji[Xr(F,2).name]=[{name:"wrapper",func:F}],Mn.prototype.clone=function(){var n=new Mn(this.__wrapped__);return n.__actions__=Mr(this.__actions__),n.__dir__=this.__dir__,n.__filtered__=this.__filtered__,n.__iteratees__=Mr(this.__iteratees__),n.__takeCount__=this.__takeCount__,n.__views__=Mr(this.__views__),
n},Mn.prototype.reverse=function(){if(this.__filtered__){var n=new Mn(this);n.__dir__=-1,n.__filtered__=true}else n=this.clone(),n.__dir__*=-1;return n},Mn.prototype.value=function(){var n,t=this.__wrapped__.value(),r=this.__dir__,e=af(t),u=0>r,i=e?t.length:0;n=i;for(var o=this.__views__,f=0,c=-1,a=o.length;++c<a;){var l=o[c],s=l.size;switch(l.type){case"drop":f+=s;break;case"dropRight":n-=s;break;case"take":n=Mi(n,f+s);break;case"takeRight":f=Di(f,n-s)}}if(n={start:f,end:n},o=n.start,f=n.end,n=f-o,
o=u?f:o-1,f=this.__iteratees__,c=f.length,a=0,l=Mi(n,this.__takeCount__),!e||!u&&i==n&&l==n)return kr(t,this.__actions__);e=[];n:for(;n--&&a<l;){for(o+=r,u=-1,i=t[o];++u<c;){var h=f[u],s=h.type,h=(0,h.iteratee)(i);if(2==s)i=h;else if(!h){if(1==s)continue n;break n}}e[a++]=i}return e},On.prototype.at=Fo,On.prototype.chain=function(){return Xe(this)},On.prototype.commit=function(){return new zn(this.value(),this.__chain__)},On.prototype.next=function(){this.__values__===F&&(this.__values__=ku(this.value()));
var n=this.__index__>=this.__values__.length;return{done:n,value:n?F:this.__values__[this.__index__++]}},On.prototype.plant=function(n){for(var t,r=this;r instanceof Sn;){var e=Pe(r);e.__index__=0,e.__values__=F,t?u.__wrapped__=e:t=e;var u=e,r=r.__wrapped__}return u.__wrapped__=n,t},On.prototype.reverse=function(){var n=this.__wrapped__;return n instanceof Mn?(this.__actions__.length&&(n=new Mn(this)),n=n.reverse(),n.__actions__.push({func:nu,args:[Je],thisArg:F}),new zn(n,this.__chain__)):this.thru(Je);
},On.prototype.toJSON=On.prototype.valueOf=On.prototype.value=function(){return kr(this.__wrapped__,this.__actions__)},On.prototype.first=On.prototype.head,Ai&&(On.prototype[Ai]=tu),On}(); true?(Zn._=it, !(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return it}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))):Vn?((Vn.exports=it)._=it,qn._=it):Zn._=it}).call(this);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23), __webpack_require__(46)(module)))

/***/ }),

/***/ 286:
/***/ (function(module, exports, __webpack_require__) {

var mapping = __webpack_require__(287),
    fallbackHolder = __webpack_require__(288);

/** Built-in value reference. */
var push = Array.prototype.push;

/**
 * Creates a function, with an arity of `n`, that invokes `func` with the
 * arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} n The arity of the new function.
 * @returns {Function} Returns the new function.
 */
function baseArity(func, n) {
  return n == 2
    ? function(a, b) { return func.apply(undefined, arguments); }
    : function(a) { return func.apply(undefined, arguments); };
}

/**
 * Creates a function that invokes `func`, with up to `n` arguments, ignoring
 * any additional arguments.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @param {number} n The arity cap.
 * @returns {Function} Returns the new function.
 */
function baseAry(func, n) {
  return n == 2
    ? function(a, b) { return func(a, b); }
    : function(a) { return func(a); };
}

/**
 * Creates a clone of `array`.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the cloned array.
 */
function cloneArray(array) {
  var length = array ? array.length : 0,
      result = Array(length);

  while (length--) {
    result[length] = array[length];
  }
  return result;
}

/**
 * Creates a function that clones a given object using the assignment `func`.
 *
 * @private
 * @param {Function} func The assignment function.
 * @returns {Function} Returns the new cloner function.
 */
function createCloner(func) {
  return function(object) {
    return func({}, object);
  };
}

/**
 * A specialized version of `_.spread` which flattens the spread array into
 * the arguments of the invoked `func`.
 *
 * @private
 * @param {Function} func The function to spread arguments over.
 * @param {number} start The start position of the spread.
 * @returns {Function} Returns the new function.
 */
function flatSpread(func, start) {
  return function() {
    var length = arguments.length,
        lastIndex = length - 1,
        args = Array(length);

    while (length--) {
      args[length] = arguments[length];
    }
    var array = args[start],
        otherArgs = args.slice(0, start);

    if (array) {
      push.apply(otherArgs, array);
    }
    if (start != lastIndex) {
      push.apply(otherArgs, args.slice(start + 1));
    }
    return func.apply(this, otherArgs);
  };
}

/**
 * Creates a function that wraps `func` and uses `cloner` to clone the first
 * argument it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} cloner The function to clone arguments.
 * @returns {Function} Returns the new immutable function.
 */
function wrapImmutable(func, cloner) {
  return function() {
    var length = arguments.length;
    if (!length) {
      return;
    }
    var args = Array(length);
    while (length--) {
      args[length] = arguments[length];
    }
    var result = args[0] = cloner.apply(undefined, args);
    func.apply(undefined, args);
    return result;
  };
}

/**
 * The base implementation of `convert` which accepts a `util` object of methods
 * required to perform conversions.
 *
 * @param {Object} util The util object.
 * @param {string} name The name of the function to convert.
 * @param {Function} func The function to convert.
 * @param {Object} [options] The options object.
 * @param {boolean} [options.cap=true] Specify capping iteratee arguments.
 * @param {boolean} [options.curry=true] Specify currying.
 * @param {boolean} [options.fixed=true] Specify fixed arity.
 * @param {boolean} [options.immutable=true] Specify immutable operations.
 * @param {boolean} [options.rearg=true] Specify rearranging arguments.
 * @returns {Function|Object} Returns the converted function or object.
 */
function baseConvert(util, name, func, options) {
  var setPlaceholder,
      isLib = typeof name == 'function',
      isObj = name === Object(name);

  if (isObj) {
    options = func;
    func = name;
    name = undefined;
  }
  if (func == null) {
    throw new TypeError;
  }
  options || (options = {});

  var config = {
    'cap': 'cap' in options ? options.cap : true,
    'curry': 'curry' in options ? options.curry : true,
    'fixed': 'fixed' in options ? options.fixed : true,
    'immutable': 'immutable' in options ? options.immutable : true,
    'rearg': 'rearg' in options ? options.rearg : true
  };

  var forceCurry = ('curry' in options) && options.curry,
      forceFixed = ('fixed' in options) && options.fixed,
      forceRearg = ('rearg' in options) && options.rearg,
      placeholder = isLib ? func : fallbackHolder,
      pristine = isLib ? func.runInContext() : undefined;

  var helpers = isLib ? func : {
    'ary': util.ary,
    'assign': util.assign,
    'clone': util.clone,
    'curry': util.curry,
    'forEach': util.forEach,
    'isArray': util.isArray,
    'isFunction': util.isFunction,
    'iteratee': util.iteratee,
    'keys': util.keys,
    'rearg': util.rearg,
    'toInteger': util.toInteger,
    'toPath': util.toPath
  };

  var ary = helpers.ary,
      assign = helpers.assign,
      clone = helpers.clone,
      curry = helpers.curry,
      each = helpers.forEach,
      isArray = helpers.isArray,
      isFunction = helpers.isFunction,
      keys = helpers.keys,
      rearg = helpers.rearg,
      toInteger = helpers.toInteger,
      toPath = helpers.toPath;

  var aryMethodKeys = keys(mapping.aryMethod);

  var wrappers = {
    'castArray': function(castArray) {
      return function() {
        var value = arguments[0];
        return isArray(value)
          ? castArray(cloneArray(value))
          : castArray.apply(undefined, arguments);
      };
    },
    'iteratee': function(iteratee) {
      return function() {
        var func = arguments[0],
            arity = arguments[1],
            result = iteratee(func, arity),
            length = result.length;

        if (config.cap && typeof arity == 'number') {
          arity = arity > 2 ? (arity - 2) : 1;
          return (length && length <= arity) ? result : baseAry(result, arity);
        }
        return result;
      };
    },
    'mixin': function(mixin) {
      return function(source) {
        var func = this;
        if (!isFunction(func)) {
          return mixin(func, Object(source));
        }
        var pairs = [];
        each(keys(source), function(key) {
          if (isFunction(source[key])) {
            pairs.push([key, func.prototype[key]]);
          }
        });

        mixin(func, Object(source));

        each(pairs, function(pair) {
          var value = pair[1];
          if (isFunction(value)) {
            func.prototype[pair[0]] = value;
          } else {
            delete func.prototype[pair[0]];
          }
        });
        return func;
      };
    },
    'nthArg': function(nthArg) {
      return function(n) {
        var arity = n < 0 ? 1 : (toInteger(n) + 1);
        return curry(nthArg(n), arity);
      };
    },
    'rearg': function(rearg) {
      return function(func, indexes) {
        var arity = indexes ? indexes.length : 0;
        return curry(rearg(func, indexes), arity);
      };
    },
    'runInContext': function(runInContext) {
      return function(context) {
        return baseConvert(util, runInContext(context), options);
      };
    }
  };

  /*--------------------------------------------------------------------------*/

  /**
   * Casts `func` to a function with an arity capped iteratee if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @returns {Function} Returns the cast function.
   */
  function castCap(name, func) {
    if (config.cap) {
      var indexes = mapping.iterateeRearg[name];
      if (indexes) {
        return iterateeRearg(func, indexes);
      }
      var n = !isLib && mapping.iterateeAry[name];
      if (n) {
        return iterateeAry(func, n);
      }
    }
    return func;
  }

  /**
   * Casts `func` to a curried function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity of `func`.
   * @returns {Function} Returns the cast function.
   */
  function castCurry(name, func, n) {
    return (forceCurry || (config.curry && n > 1))
      ? curry(func, n)
      : func;
  }

  /**
   * Casts `func` to a fixed arity function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity cap.
   * @returns {Function} Returns the cast function.
   */
  function castFixed(name, func, n) {
    if (config.fixed && (forceFixed || !mapping.skipFixed[name])) {
      var data = mapping.methodSpread[name],
          start = data && data.start;

      return start  === undefined ? ary(func, n) : flatSpread(func, start);
    }
    return func;
  }

  /**
   * Casts `func` to an rearged function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity of `func`.
   * @returns {Function} Returns the cast function.
   */
  function castRearg(name, func, n) {
    return (config.rearg && n > 1 && (forceRearg || !mapping.skipRearg[name]))
      ? rearg(func, mapping.methodRearg[name] || mapping.aryRearg[n])
      : func;
  }

  /**
   * Creates a clone of `object` by `path`.
   *
   * @private
   * @param {Object} object The object to clone.
   * @param {Array|string} path The path to clone by.
   * @returns {Object} Returns the cloned object.
   */
  function cloneByPath(object, path) {
    path = toPath(path);

    var index = -1,
        length = path.length,
        lastIndex = length - 1,
        result = clone(Object(object)),
        nested = result;

    while (nested != null && ++index < length) {
      var key = path[index],
          value = nested[key];

      if (value != null) {
        nested[path[index]] = clone(index == lastIndex ? value : Object(value));
      }
      nested = nested[key];
    }
    return result;
  }

  /**
   * Converts `lodash` to an immutable auto-curried iteratee-first data-last
   * version with conversion `options` applied.
   *
   * @param {Object} [options] The options object. See `baseConvert` for more details.
   * @returns {Function} Returns the converted `lodash`.
   */
  function convertLib(options) {
    return _.runInContext.convert(options)(undefined);
  }

  /**
   * Create a converter function for `func` of `name`.
   *
   * @param {string} name The name of the function to convert.
   * @param {Function} func The function to convert.
   * @returns {Function} Returns the new converter function.
   */
  function createConverter(name, func) {
    var realName = mapping.aliasToReal[name] || name,
        methodName = mapping.remap[realName] || realName,
        oldOptions = options;

    return function(options) {
      var newUtil = isLib ? pristine : helpers,
          newFunc = isLib ? pristine[methodName] : func,
          newOptions = assign(assign({}, oldOptions), options);

      return baseConvert(newUtil, realName, newFunc, newOptions);
    };
  }

  /**
   * Creates a function that wraps `func` to invoke its iteratee, with up to `n`
   * arguments, ignoring any additional arguments.
   *
   * @private
   * @param {Function} func The function to cap iteratee arguments for.
   * @param {number} n The arity cap.
   * @returns {Function} Returns the new function.
   */
  function iterateeAry(func, n) {
    return overArg(func, function(func) {
      return typeof func == 'function' ? baseAry(func, n) : func;
    });
  }

  /**
   * Creates a function that wraps `func` to invoke its iteratee with arguments
   * arranged according to the specified `indexes` where the argument value at
   * the first index is provided as the first argument, the argument value at
   * the second index is provided as the second argument, and so on.
   *
   * @private
   * @param {Function} func The function to rearrange iteratee arguments for.
   * @param {number[]} indexes The arranged argument indexes.
   * @returns {Function} Returns the new function.
   */
  function iterateeRearg(func, indexes) {
    return overArg(func, function(func) {
      var n = indexes.length;
      return baseArity(rearg(baseAry(func, n), indexes), n);
    });
  }

  /**
   * Creates a function that invokes `func` with its first argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function() {
      var length = arguments.length;
      if (!length) {
        return func();
      }
      var args = Array(length);
      while (length--) {
        args[length] = arguments[length];
      }
      var index = config.rearg ? 0 : (length - 1);
      args[index] = transform(args[index]);
      return func.apply(undefined, args);
    };
  }

  /**
   * Creates a function that wraps `func` and applys the conversions
   * rules by `name`.
   *
   * @private
   * @param {string} name The name of the function to wrap.
   * @param {Function} func The function to wrap.
   * @returns {Function} Returns the converted function.
   */
  function wrap(name, func) {
    var result,
        realName = mapping.aliasToReal[name] || name,
        wrapped = func,
        wrapper = wrappers[realName];

    if (wrapper) {
      wrapped = wrapper(func);
    }
    else if (config.immutable) {
      if (mapping.mutate.array[realName]) {
        wrapped = wrapImmutable(func, cloneArray);
      }
      else if (mapping.mutate.object[realName]) {
        wrapped = wrapImmutable(func, createCloner(func));
      }
      else if (mapping.mutate.set[realName]) {
        wrapped = wrapImmutable(func, cloneByPath);
      }
    }
    each(aryMethodKeys, function(aryKey) {
      each(mapping.aryMethod[aryKey], function(otherName) {
        if (realName == otherName) {
          var data = mapping.methodSpread[realName],
              afterRearg = data && data.afterRearg;

          result = afterRearg
            ? castFixed(realName, castRearg(realName, wrapped, aryKey), aryKey)
            : castRearg(realName, castFixed(realName, wrapped, aryKey), aryKey);

          result = castCap(realName, result);
          result = castCurry(realName, result, aryKey);
          return false;
        }
      });
      return !result;
    });

    result || (result = wrapped);
    if (result == func) {
      result = forceCurry ? curry(result, 1) : function() {
        return func.apply(this, arguments);
      };
    }
    result.convert = createConverter(realName, func);
    if (mapping.placeholder[realName]) {
      setPlaceholder = true;
      result.placeholder = func.placeholder = placeholder;
    }
    return result;
  }

  /*--------------------------------------------------------------------------*/

  if (!isObj) {
    return wrap(name, func);
  }
  var _ = func;

  // Convert methods by ary cap.
  var pairs = [];
  each(aryMethodKeys, function(aryKey) {
    each(mapping.aryMethod[aryKey], function(key) {
      var func = _[mapping.remap[key] || key];
      if (func) {
        pairs.push([key, wrap(key, func)]);
      }
    });
  });

  // Convert remaining methods.
  each(keys(_), function(key) {
    var func = _[key];
    if (typeof func == 'function') {
      var length = pairs.length;
      while (length--) {
        if (pairs[length][0] == key) {
          return;
        }
      }
      func.convert = createConverter(key, func);
      pairs.push([key, func]);
    }
  });

  // Assign to `_` leaving `_.prototype` unchanged to allow chaining.
  each(pairs, function(pair) {
    _[pair[0]] = pair[1];
  });

  _.convert = convertLib;
  if (setPlaceholder) {
    _.placeholder = placeholder;
  }
  // Assign aliases.
  each(keys(_), function(key) {
    each(mapping.realToAlias[key] || [], function(alias) {
      _[alias] = _[key];
    });
  });

  return _;
}

module.exports = baseConvert;


/***/ }),

/***/ 287:
/***/ (function(module, exports) {

/** Used to map aliases to their real names. */
exports.aliasToReal = {

  // Lodash aliases.
  'each': 'forEach',
  'eachRight': 'forEachRight',
  'entries': 'toPairs',
  'entriesIn': 'toPairsIn',
  'extend': 'assignIn',
  'extendAll': 'assignInAll',
  'extendAllWith': 'assignInAllWith',
  'extendWith': 'assignInWith',
  'first': 'head',

  // Methods that are curried variants of others.
  'conforms': 'conformsTo',
  'matches': 'isMatch',
  'property': 'get',

  // Ramda aliases.
  '__': 'placeholder',
  'F': 'stubFalse',
  'T': 'stubTrue',
  'all': 'every',
  'allPass': 'overEvery',
  'always': 'constant',
  'any': 'some',
  'anyPass': 'overSome',
  'apply': 'spread',
  'assoc': 'set',
  'assocPath': 'set',
  'complement': 'negate',
  'compose': 'flowRight',
  'contains': 'includes',
  'dissoc': 'unset',
  'dissocPath': 'unset',
  'dropLast': 'dropRight',
  'dropLastWhile': 'dropRightWhile',
  'equals': 'isEqual',
  'identical': 'eq',
  'indexBy': 'keyBy',
  'init': 'initial',
  'invertObj': 'invert',
  'juxt': 'over',
  'omitAll': 'omit',
  'nAry': 'ary',
  'path': 'get',
  'pathEq': 'matchesProperty',
  'pathOr': 'getOr',
  'paths': 'at',
  'pickAll': 'pick',
  'pipe': 'flow',
  'pluck': 'map',
  'prop': 'get',
  'propEq': 'matchesProperty',
  'propOr': 'getOr',
  'props': 'at',
  'symmetricDifference': 'xor',
  'symmetricDifferenceBy': 'xorBy',
  'symmetricDifferenceWith': 'xorWith',
  'takeLast': 'takeRight',
  'takeLastWhile': 'takeRightWhile',
  'unapply': 'rest',
  'unnest': 'flatten',
  'useWith': 'overArgs',
  'where': 'conformsTo',
  'whereEq': 'isMatch',
  'zipObj': 'zipObject'
};

/** Used to map ary to method names. */
exports.aryMethod = {
  '1': [
    'assignAll', 'assignInAll', 'attempt', 'castArray', 'ceil', 'create',
    'curry', 'curryRight', 'defaultsAll', 'defaultsDeepAll', 'floor', 'flow',
    'flowRight', 'fromPairs', 'invert', 'iteratee', 'memoize', 'method', 'mergeAll',
    'methodOf', 'mixin', 'nthArg', 'over', 'overEvery', 'overSome','rest', 'reverse',
    'round', 'runInContext', 'spread', 'template', 'trim', 'trimEnd', 'trimStart',
    'uniqueId', 'words', 'zipAll'
  ],
  '2': [
    'add', 'after', 'ary', 'assign', 'assignAllWith', 'assignIn', 'assignInAllWith',
    'at', 'before', 'bind', 'bindAll', 'bindKey', 'chunk', 'cloneDeepWith',
    'cloneWith', 'concat', 'conformsTo', 'countBy', 'curryN', 'curryRightN',
    'debounce', 'defaults', 'defaultsDeep', 'defaultTo', 'delay', 'difference',
    'divide', 'drop', 'dropRight', 'dropRightWhile', 'dropWhile', 'endsWith', 'eq',
    'every', 'filter', 'find', 'findIndex', 'findKey', 'findLast', 'findLastIndex',
    'findLastKey', 'flatMap', 'flatMapDeep', 'flattenDepth', 'forEach',
    'forEachRight', 'forIn', 'forInRight', 'forOwn', 'forOwnRight', 'get',
    'groupBy', 'gt', 'gte', 'has', 'hasIn', 'includes', 'indexOf', 'intersection',
    'invertBy', 'invoke', 'invokeMap', 'isEqual', 'isMatch', 'join', 'keyBy',
    'lastIndexOf', 'lt', 'lte', 'map', 'mapKeys', 'mapValues', 'matchesProperty',
    'maxBy', 'meanBy', 'merge', 'mergeAllWith', 'minBy', 'multiply', 'nth', 'omit',
    'omitBy', 'overArgs', 'pad', 'padEnd', 'padStart', 'parseInt', 'partial',
    'partialRight', 'partition', 'pick', 'pickBy', 'propertyOf', 'pull', 'pullAll',
    'pullAt', 'random', 'range', 'rangeRight', 'rearg', 'reject', 'remove',
    'repeat', 'restFrom', 'result', 'sampleSize', 'some', 'sortBy', 'sortedIndex',
    'sortedIndexOf', 'sortedLastIndex', 'sortedLastIndexOf', 'sortedUniqBy',
    'split', 'spreadFrom', 'startsWith', 'subtract', 'sumBy', 'take', 'takeRight',
    'takeRightWhile', 'takeWhile', 'tap', 'throttle', 'thru', 'times', 'trimChars',
    'trimCharsEnd', 'trimCharsStart', 'truncate', 'union', 'uniqBy', 'uniqWith',
    'unset', 'unzipWith', 'without', 'wrap', 'xor', 'zip', 'zipObject',
    'zipObjectDeep'
  ],
  '3': [
    'assignInWith', 'assignWith', 'clamp', 'differenceBy', 'differenceWith',
    'findFrom', 'findIndexFrom', 'findLastFrom', 'findLastIndexFrom', 'getOr',
    'includesFrom', 'indexOfFrom', 'inRange', 'intersectionBy', 'intersectionWith',
    'invokeArgs', 'invokeArgsMap', 'isEqualWith', 'isMatchWith', 'flatMapDepth',
    'lastIndexOfFrom', 'mergeWith', 'orderBy', 'padChars', 'padCharsEnd',
    'padCharsStart', 'pullAllBy', 'pullAllWith', 'rangeStep', 'rangeStepRight',
    'reduce', 'reduceRight', 'replace', 'set', 'slice', 'sortedIndexBy',
    'sortedLastIndexBy', 'transform', 'unionBy', 'unionWith', 'update', 'xorBy',
    'xorWith', 'zipWith'
  ],
  '4': [
    'fill', 'setWith', 'updateWith'
  ]
};

/** Used to map ary to rearg configs. */
exports.aryRearg = {
  '2': [1, 0],
  '3': [2, 0, 1],
  '4': [3, 2, 0, 1]
};

/** Used to map method names to their iteratee ary. */
exports.iterateeAry = {
  'dropRightWhile': 1,
  'dropWhile': 1,
  'every': 1,
  'filter': 1,
  'find': 1,
  'findFrom': 1,
  'findIndex': 1,
  'findIndexFrom': 1,
  'findKey': 1,
  'findLast': 1,
  'findLastFrom': 1,
  'findLastIndex': 1,
  'findLastIndexFrom': 1,
  'findLastKey': 1,
  'flatMap': 1,
  'flatMapDeep': 1,
  'flatMapDepth': 1,
  'forEach': 1,
  'forEachRight': 1,
  'forIn': 1,
  'forInRight': 1,
  'forOwn': 1,
  'forOwnRight': 1,
  'map': 1,
  'mapKeys': 1,
  'mapValues': 1,
  'partition': 1,
  'reduce': 2,
  'reduceRight': 2,
  'reject': 1,
  'remove': 1,
  'some': 1,
  'takeRightWhile': 1,
  'takeWhile': 1,
  'times': 1,
  'transform': 2
};

/** Used to map method names to iteratee rearg configs. */
exports.iterateeRearg = {
  'mapKeys': [1],
  'reduceRight': [1, 0]
};

/** Used to map method names to rearg configs. */
exports.methodRearg = {
  'assignInAllWith': [1, 0],
  'assignInWith': [1, 2, 0],
  'assignAllWith': [1, 0],
  'assignWith': [1, 2, 0],
  'differenceBy': [1, 2, 0],
  'differenceWith': [1, 2, 0],
  'getOr': [2, 1, 0],
  'intersectionBy': [1, 2, 0],
  'intersectionWith': [1, 2, 0],
  'isEqualWith': [1, 2, 0],
  'isMatchWith': [2, 1, 0],
  'mergeAllWith': [1, 0],
  'mergeWith': [1, 2, 0],
  'padChars': [2, 1, 0],
  'padCharsEnd': [2, 1, 0],
  'padCharsStart': [2, 1, 0],
  'pullAllBy': [2, 1, 0],
  'pullAllWith': [2, 1, 0],
  'rangeStep': [1, 2, 0],
  'rangeStepRight': [1, 2, 0],
  'setWith': [3, 1, 2, 0],
  'sortedIndexBy': [2, 1, 0],
  'sortedLastIndexBy': [2, 1, 0],
  'unionBy': [1, 2, 0],
  'unionWith': [1, 2, 0],
  'updateWith': [3, 1, 2, 0],
  'xorBy': [1, 2, 0],
  'xorWith': [1, 2, 0],
  'zipWith': [1, 2, 0]
};

/** Used to map method names to spread configs. */
exports.methodSpread = {
  'assignAll': { 'start': 0 },
  'assignAllWith': { 'start': 0 },
  'assignInAll': { 'start': 0 },
  'assignInAllWith': { 'start': 0 },
  'defaultsAll': { 'start': 0 },
  'defaultsDeepAll': { 'start': 0 },
  'invokeArgs': { 'start': 2 },
  'invokeArgsMap': { 'start': 2 },
  'mergeAll': { 'start': 0 },
  'mergeAllWith': { 'start': 0 },
  'partial': { 'start': 1 },
  'partialRight': { 'start': 1 },
  'without': { 'start': 1 },
  'zipAll': { 'start': 0 }
};

/** Used to identify methods which mutate arrays or objects. */
exports.mutate = {
  'array': {
    'fill': true,
    'pull': true,
    'pullAll': true,
    'pullAllBy': true,
    'pullAllWith': true,
    'pullAt': true,
    'remove': true,
    'reverse': true
  },
  'object': {
    'assign': true,
    'assignAll': true,
    'assignAllWith': true,
    'assignIn': true,
    'assignInAll': true,
    'assignInAllWith': true,
    'assignInWith': true,
    'assignWith': true,
    'defaults': true,
    'defaultsAll': true,
    'defaultsDeep': true,
    'defaultsDeepAll': true,
    'merge': true,
    'mergeAll': true,
    'mergeAllWith': true,
    'mergeWith': true,
  },
  'set': {
    'set': true,
    'setWith': true,
    'unset': true,
    'update': true,
    'updateWith': true
  }
};

/** Used to track methods with placeholder support */
exports.placeholder = {
  'bind': true,
  'bindKey': true,
  'curry': true,
  'curryRight': true,
  'partial': true,
  'partialRight': true
};

/** Used to map real names to their aliases. */
exports.realToAlias = (function() {
  var hasOwnProperty = Object.prototype.hasOwnProperty,
      object = exports.aliasToReal,
      result = {};

  for (var key in object) {
    var value = object[key];
    if (hasOwnProperty.call(result, value)) {
      result[value].push(key);
    } else {
      result[value] = [key];
    }
  }
  return result;
}());

/** Used to map method names to other names. */
exports.remap = {
  'assignAll': 'assign',
  'assignAllWith': 'assignWith',
  'assignInAll': 'assignIn',
  'assignInAllWith': 'assignInWith',
  'curryN': 'curry',
  'curryRightN': 'curryRight',
  'defaultsAll': 'defaults',
  'defaultsDeepAll': 'defaultsDeep',
  'findFrom': 'find',
  'findIndexFrom': 'findIndex',
  'findLastFrom': 'findLast',
  'findLastIndexFrom': 'findLastIndex',
  'getOr': 'get',
  'includesFrom': 'includes',
  'indexOfFrom': 'indexOf',
  'invokeArgs': 'invoke',
  'invokeArgsMap': 'invokeMap',
  'lastIndexOfFrom': 'lastIndexOf',
  'mergeAll': 'merge',
  'mergeAllWith': 'mergeWith',
  'padChars': 'pad',
  'padCharsEnd': 'padEnd',
  'padCharsStart': 'padStart',
  'propertyOf': 'get',
  'rangeStep': 'range',
  'rangeStepRight': 'rangeRight',
  'restFrom': 'rest',
  'spreadFrom': 'spread',
  'trimChars': 'trim',
  'trimCharsEnd': 'trimEnd',
  'trimCharsStart': 'trimStart',
  'zipAll': 'zip'
};

/** Used to track methods that skip fixing their arity. */
exports.skipFixed = {
  'castArray': true,
  'flow': true,
  'flowRight': true,
  'iteratee': true,
  'mixin': true,
  'rearg': true,
  'runInContext': true
};

/** Used to track methods that skip rearranging arguments. */
exports.skipRearg = {
  'add': true,
  'assign': true,
  'assignIn': true,
  'bind': true,
  'bindKey': true,
  'concat': true,
  'difference': true,
  'divide': true,
  'eq': true,
  'gt': true,
  'gte': true,
  'isEqual': true,
  'lt': true,
  'lte': true,
  'matchesProperty': true,
  'merge': true,
  'multiply': true,
  'overArgs': true,
  'partial': true,
  'partialRight': true,
  'propertyOf': true,
  'random': true,
  'range': true,
  'rangeRight': true,
  'subtract': true,
  'zip': true,
  'zipObject': true,
  'zipObjectDeep': true
};


/***/ }),

/***/ 288:
/***/ (function(module, exports) {

/**
 * The default argument placeholder value for methods.
 *
 * @type {Object}
 */
module.exports = {};


/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_AsyncComponent__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_hoc_RouteComponent__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_hoc_RouteError__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_routes_Error__ = __webpack_require__(42);

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};





var Dashboard = function (props) {
    return (__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_components_AsyncComponent__["a" /* default */]
    // TODO: Consider creating a utility component to avoid this repetition.
    , __assign({ 
        // TODO: Consider creating a utility component to avoid this repetition.
        errorComponent: Object(__WEBPACK_IMPORTED_MODULE_1_hoc_RouteComponent__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_2_hoc_RouteError__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_4_routes_Error__["a" /* default */], { status: 404 })), 
        // tslint:disable-next-line jsx-no-lambda
        getComponent: function () { return __webpack_require__.e/* import() */(2).then(__webpack_require__.bind(null, 300)); } }, props)));
};
/* harmony default export */ __webpack_exports__["a"] = (Dashboard);


/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_AsyncComponent__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_hoc_RouteComponent__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_hoc_RouteError__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_routes_Error__ = __webpack_require__(42);

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};





var Monitoring = function (props) {
    return (__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_components_AsyncComponent__["a" /* default */]
    // TODO: Consider creating a utility component to avoid this repetition.
    , __assign({ 
        // TODO: Consider creating a utility component to avoid this repetition.
        errorComponent: Object(__WEBPACK_IMPORTED_MODULE_1_hoc_RouteComponent__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_2_hoc_RouteError__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_4_routes_Error__["a" /* default */], { status: 404 })), 
        // tslint:disable-next-line jsx-no-lambda
        getComponent: function () { return __webpack_require__.e/* import() */(3).then(__webpack_require__.bind(null, 301)); } }, props)));
};
/* harmony default export */ __webpack_exports__["a"] = (Monitoring);


/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

var ROUTES = [{
        componentId: 'Dashboard',
        exact: true,
        path: '/',
    },
    {
        componentId: 'Monitoring',
        path: '/monitoring/:id'
    },
    {
        componentId: 'Admin',
        path: '/admin'
    }];
/* harmony default export */ __webpack_exports__["a"] = (ROUTES);


/***/ }),

/***/ 292:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reducers_appIsLoadingReducer__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reducers_exampleReducer__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reducers_routeIsLoadingReducer__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_redux_logger__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_redux_logger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_redux_logger__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_redux_thunk__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_redux_thunk__);







var dev = "development" === 'development';
// tslint:disable-next-line max-line-length
var configureStore = function (initialState, initialReducers) {
    if (initialState === void 0) { initialState = {}; }
    if (initialReducers === void 0) { initialReducers = {}; }
    var reducers = Object.assign({
        appIsLoading: __WEBPACK_IMPORTED_MODULE_0_reducers_appIsLoadingReducer__["a" /* default */],
        example: __WEBPACK_IMPORTED_MODULE_1_reducers_exampleReducer__["a" /* default */],
        routeIsLoading: __WEBPACK_IMPORTED_MODULE_2_reducers_routeIsLoadingReducer__["a" /* default */]
    }, initialReducers);
    var middleware = [__WEBPACK_IMPORTED_MODULE_5_redux_thunk___default.a];
    if (dev) {
        middleware.push(Object(__WEBPACK_IMPORTED_MODULE_4_redux_logger__["createLogger"])());
    }
    return Object(__WEBPACK_IMPORTED_MODULE_3_redux__["createStore"])(Object(__WEBPACK_IMPORTED_MODULE_3_redux__["combineReducers"])(reducers), initialState, __WEBPACK_IMPORTED_MODULE_3_redux__["applyMiddleware"].apply(void 0, middleware));
};
/* harmony default export */ __webpack_exports__["a"] = (configureStore);


/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_actions_actionTypes__ = __webpack_require__(40);


var INITIAL_STATE = false;
// tslint:disable-next-line max-line-length
var appIsLoadingReducer = function (state, action) {
    if (state === void 0) { state = INITIAL_STATE; }
    var type = action.type, value = action.value;
    switch (type) {
        case __WEBPACK_IMPORTED_MODULE_0_actions_actionTypes__["a" /* default */].AppIsLoading: {
            return value;
        }
        default: {
            return state;
        }
    }
};
/* harmony default export */ __webpack_exports__["a"] = (appIsLoadingReducer);


/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_actions_actionTypes__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_store_getAsyncState__ = __webpack_require__(119);



var INITIAL_STATE = null;
// tslint:disable-next-line max-line-length
var exampleReducer = function (state, action) {
    if (state === void 0) { state = INITIAL_STATE; }
    var type = action.type;
    switch (type) {
        case __WEBPACK_IMPORTED_MODULE_0_actions_actionTypes__["a" /* default */].GetExample: {
            return Object(__WEBPACK_IMPORTED_MODULE_1_store_getAsyncState__["a" /* default */])(action, state);
        }
        default: {
            return state;
        }
    }
};
/* harmony default export */ __webpack_exports__["a"] = (exampleReducer);


/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_actions_actionTypes__ = __webpack_require__(40);


var INITIAL_STATE = false;
// tslint:disable-next-line max-line-length
var routeIsLoadingReducer = function (state, action) {
    if (state === void 0) { state = INITIAL_STATE; }
    var type = action.type, value = action.value;
    switch (type) {
        case __WEBPACK_IMPORTED_MODULE_0_actions_actionTypes__["a" /* default */].RouteIsLoading: {
            return value;
        }
        default: {
            return state;
        }
    }
};
/* harmony default export */ __webpack_exports__["a"] = (routeIsLoadingReducer);


/***/ }),

/***/ 297:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {!function(e,t){ true?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.reduxLogger=e.reduxLogger||{})}(this,function(e){"use strict";function t(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}function r(e,t){Object.defineProperty(this,"kind",{value:e,enumerable:!0}),t&&t.length&&Object.defineProperty(this,"path",{value:t,enumerable:!0})}function n(e,t,r){n.super_.call(this,"E",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0}),Object.defineProperty(this,"rhs",{value:r,enumerable:!0})}function o(e,t){o.super_.call(this,"N",e),Object.defineProperty(this,"rhs",{value:t,enumerable:!0})}function i(e,t){i.super_.call(this,"D",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0})}function a(e,t,r){a.super_.call(this,"A",e),Object.defineProperty(this,"index",{value:t,enumerable:!0}),Object.defineProperty(this,"item",{value:r,enumerable:!0})}function f(e,t,r){var n=e.slice((r||t)+1||e.length);return e.length=t<0?e.length+t:t,e.push.apply(e,n),e}function u(e){var t="undefined"==typeof e?"undefined":N(e);return"object"!==t?t:e===Math?"math":null===e?"null":Array.isArray(e)?"array":"[object Date]"===Object.prototype.toString.call(e)?"date":"function"==typeof e.toString&&/^\/.*\//.test(e.toString())?"regexp":"object"}function l(e,t,r,c,s,d,p){s=s||[],p=p||[];var g=s.slice(0);if("undefined"!=typeof d){if(c){if("function"==typeof c&&c(g,d))return;if("object"===("undefined"==typeof c?"undefined":N(c))){if(c.prefilter&&c.prefilter(g,d))return;if(c.normalize){var h=c.normalize(g,d,e,t);h&&(e=h[0],t=h[1])}}}g.push(d)}"regexp"===u(e)&&"regexp"===u(t)&&(e=e.toString(),t=t.toString());var y="undefined"==typeof e?"undefined":N(e),v="undefined"==typeof t?"undefined":N(t),b="undefined"!==y||p&&p[p.length-1].lhs&&p[p.length-1].lhs.hasOwnProperty(d),m="undefined"!==v||p&&p[p.length-1].rhs&&p[p.length-1].rhs.hasOwnProperty(d);if(!b&&m)r(new o(g,t));else if(!m&&b)r(new i(g,e));else if(u(e)!==u(t))r(new n(g,e,t));else if("date"===u(e)&&e-t!==0)r(new n(g,e,t));else if("object"===y&&null!==e&&null!==t)if(p.filter(function(t){return t.lhs===e}).length)e!==t&&r(new n(g,e,t));else{if(p.push({lhs:e,rhs:t}),Array.isArray(e)){var w;e.length;for(w=0;w<e.length;w++)w>=t.length?r(new a(g,w,new i(void 0,e[w]))):l(e[w],t[w],r,c,g,w,p);for(;w<t.length;)r(new a(g,w,new o(void 0,t[w++])))}else{var x=Object.keys(e),S=Object.keys(t);x.forEach(function(n,o){var i=S.indexOf(n);i>=0?(l(e[n],t[n],r,c,g,n,p),S=f(S,i)):l(e[n],void 0,r,c,g,n,p)}),S.forEach(function(e){l(void 0,t[e],r,c,g,e,p)})}p.length=p.length-1}else e!==t&&("number"===y&&isNaN(e)&&isNaN(t)||r(new n(g,e,t)))}function c(e,t,r,n){return n=n||[],l(e,t,function(e){e&&n.push(e)},r),n.length?n:void 0}function s(e,t,r){if(r.path&&r.path.length){var n,o=e[t],i=r.path.length-1;for(n=0;n<i;n++)o=o[r.path[n]];switch(r.kind){case"A":s(o[r.path[n]],r.index,r.item);break;case"D":delete o[r.path[n]];break;case"E":case"N":o[r.path[n]]=r.rhs}}else switch(r.kind){case"A":s(e[t],r.index,r.item);break;case"D":e=f(e,t);break;case"E":case"N":e[t]=r.rhs}return e}function d(e,t,r){if(e&&t&&r&&r.kind){for(var n=e,o=-1,i=r.path?r.path.length-1:0;++o<i;)"undefined"==typeof n[r.path[o]]&&(n[r.path[o]]="number"==typeof r.path[o]?[]:{}),n=n[r.path[o]];switch(r.kind){case"A":s(r.path?n[r.path[o]]:n,r.index,r.item);break;case"D":delete n[r.path[o]];break;case"E":case"N":n[r.path[o]]=r.rhs}}}function p(e,t,r){if(r.path&&r.path.length){var n,o=e[t],i=r.path.length-1;for(n=0;n<i;n++)o=o[r.path[n]];switch(r.kind){case"A":p(o[r.path[n]],r.index,r.item);break;case"D":o[r.path[n]]=r.lhs;break;case"E":o[r.path[n]]=r.lhs;break;case"N":delete o[r.path[n]]}}else switch(r.kind){case"A":p(e[t],r.index,r.item);break;case"D":e[t]=r.lhs;break;case"E":e[t]=r.lhs;break;case"N":e=f(e,t)}return e}function g(e,t,r){if(e&&t&&r&&r.kind){var n,o,i=e;for(o=r.path.length-1,n=0;n<o;n++)"undefined"==typeof i[r.path[n]]&&(i[r.path[n]]={}),i=i[r.path[n]];switch(r.kind){case"A":p(i[r.path[n]],r.index,r.item);break;case"D":i[r.path[n]]=r.lhs;break;case"E":i[r.path[n]]=r.lhs;break;case"N":delete i[r.path[n]]}}}function h(e,t,r){if(e&&t){var n=function(n){r&&!r(e,t,n)||d(e,t,n)};l(e,t,n)}}function y(e){return"color: "+F[e].color+"; font-weight: bold"}function v(e){var t=e.kind,r=e.path,n=e.lhs,o=e.rhs,i=e.index,a=e.item;switch(t){case"E":return[r.join("."),n,"→",o];case"N":return[r.join("."),o];case"D":return[r.join(".")];case"A":return[r.join(".")+"["+i+"]",a];default:return[]}}function b(e,t,r,n){var o=c(e,t);try{n?r.groupCollapsed("diff"):r.group("diff")}catch(e){r.log("diff")}o?o.forEach(function(e){var t=e.kind,n=v(e);r.log.apply(r,["%c "+F[t].text,y(t)].concat(P(n)))}):r.log("—— no diff ——");try{r.groupEnd()}catch(e){r.log("—— diff end —— ")}}function m(e,t,r,n){switch("undefined"==typeof e?"undefined":N(e)){case"object":return"function"==typeof e[n]?e[n].apply(e,P(r)):e[n];case"function":return e(t);default:return e}}function w(e){var t=e.timestamp,r=e.duration;return function(e,n,o){var i=["action"];return i.push("%c"+String(e.type)),t&&i.push("%c@ "+n),r&&i.push("%c(in "+o.toFixed(2)+" ms)"),i.join(" ")}}function x(e,t){var r=t.logger,n=t.actionTransformer,o=t.titleFormatter,i=void 0===o?w(t):o,a=t.collapsed,f=t.colors,u=t.level,l=t.diff,c="undefined"==typeof t.titleFormatter;e.forEach(function(o,s){var d=o.started,p=o.startedTime,g=o.action,h=o.prevState,y=o.error,v=o.took,w=o.nextState,x=e[s+1];x&&(w=x.prevState,v=x.started-d);var S=n(g),k="function"==typeof a?a(function(){return w},g,o):a,j=D(p),E=f.title?"color: "+f.title(S)+";":"",A=["color: gray; font-weight: lighter;"];A.push(E),t.timestamp&&A.push("color: gray; font-weight: lighter;"),t.duration&&A.push("color: gray; font-weight: lighter;");var O=i(S,j,v);try{k?f.title&&c?r.groupCollapsed.apply(r,["%c "+O].concat(A)):r.groupCollapsed(O):f.title&&c?r.group.apply(r,["%c "+O].concat(A)):r.group(O)}catch(e){r.log(O)}var N=m(u,S,[h],"prevState"),P=m(u,S,[S],"action"),C=m(u,S,[y,h],"error"),F=m(u,S,[w],"nextState");if(N)if(f.prevState){var L="color: "+f.prevState(h)+"; font-weight: bold";r[N]("%c prev state",L,h)}else r[N]("prev state",h);if(P)if(f.action){var T="color: "+f.action(S)+"; font-weight: bold";r[P]("%c action    ",T,S)}else r[P]("action    ",S);if(y&&C)if(f.error){var M="color: "+f.error(y,h)+"; font-weight: bold;";r[C]("%c error     ",M,y)}else r[C]("error     ",y);if(F)if(f.nextState){var _="color: "+f.nextState(w)+"; font-weight: bold";r[F]("%c next state",_,w)}else r[F]("next state",w);l&&b(h,w,r,k);try{r.groupEnd()}catch(e){r.log("—— log end ——")}})}function S(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object.assign({},L,e),r=t.logger,n=t.stateTransformer,o=t.errorTransformer,i=t.predicate,a=t.logErrors,f=t.diffPredicate;if("undefined"==typeof r)return function(){return function(e){return function(t){return e(t)}}};if(e.getState&&e.dispatch)return console.error("[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"),function(){return function(e){return function(t){return e(t)}}};var u=[];return function(e){var r=e.getState;return function(e){return function(l){if("function"==typeof i&&!i(r,l))return e(l);var c={};u.push(c),c.started=O.now(),c.startedTime=new Date,c.prevState=n(r()),c.action=l;var s=void 0;if(a)try{s=e(l)}catch(e){c.error=o(e)}else s=e(l);c.took=O.now()-c.started,c.nextState=n(r());var d=t.diff&&"function"==typeof f?f(r,l):t.diff;if(x(u,Object.assign({},t,{diff:d})),u.length=0,c.error)throw c.error;return s}}}}var k,j,E=function(e,t){return new Array(t+1).join(e)},A=function(e,t){return E("0",t-e.toString().length)+e},D=function(e){return A(e.getHours(),2)+":"+A(e.getMinutes(),2)+":"+A(e.getSeconds(),2)+"."+A(e.getMilliseconds(),3)},O="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance:Date,N="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},P=function(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)},C=[];k="object"===("undefined"==typeof global?"undefined":N(global))&&global?global:"undefined"!=typeof window?window:{},j=k.DeepDiff,j&&C.push(function(){"undefined"!=typeof j&&k.DeepDiff===c&&(k.DeepDiff=j,j=void 0)}),t(n,r),t(o,r),t(i,r),t(a,r),Object.defineProperties(c,{diff:{value:c,enumerable:!0},observableDiff:{value:l,enumerable:!0},applyDiff:{value:h,enumerable:!0},applyChange:{value:d,enumerable:!0},revertChange:{value:g,enumerable:!0},isConflict:{value:function(){return"undefined"!=typeof j},enumerable:!0},noConflict:{value:function(){return C&&(C.forEach(function(e){e()}),C=null),c},enumerable:!0}});var F={E:{color:"#2196F3",text:"CHANGED:"},N:{color:"#4CAF50",text:"ADDED:"},D:{color:"#F44336",text:"DELETED:"},A:{color:"#2196F3",text:"ARRAY:"}},L={level:"log",logger:console,logErrors:!0,collapsed:void 0,predicate:void 0,duration:!1,timestamp:!0,stateTransformer:function(e){return e},actionTransformer:function(e){return e},errorTransformer:function(e){return e},colors:{title:function(){return"inherit"},prevState:function(){return"#9E9E9E"},action:function(){return"#03A9F4"},nextState:function(){return"#4CAF50"},error:function(){return"#F20404"}},diff:!1,diffPredicate:void 0,transformer:void 0},T=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.dispatch,r=e.getState;return"function"==typeof t||"function"==typeof r?S()({dispatch:t,getState:r}):void console.error("\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n")};e.defaults=L,e.createLogger=S,e.logger=T,e.default=T,Object.defineProperty(e,"__esModule",{value:!0})});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ }),

/***/ 298:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "manifest.json";

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

var ActionTypes;
(function (ActionTypes) {
    ActionTypes["AppIsLoading"] = "AppIsLoading";
    ActionTypes["GetExample"] = "GetExample";
    ActionTypes["RouteIsLoading"] = "RouteIsLoading";
})(ActionTypes || (ActionTypes = {}));
/* harmony default export */ __webpack_exports__["a"] = (ActionTypes);


/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = RouteErrorHOC;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

// tslint:disable-next-line max-line-length
// NOTE: 'options' parameter is used to pass on override properties which should match the IRouteErrorProps interface.
function RouteErrorHOC(Component, options) {
    var RouteError = function (props) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Component, __assign({}, Object.assign({}, props, options)));
    };
    var componentName = Component.displayName || Component.name || 'Component';
    Component.displayName = "routeError(" + componentName + ")";
    Component.wrappedComponent = Component;
    return RouteError;
}


/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


var Error = function (props) {
    console.log(navigator.onLine);
    return (__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "error" },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h1", null,
            "Error ",
            props.status)));
};
/* harmony default export */ __webpack_exports__["a"] = (Error);


/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = RouteComponentHOC;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_actions_actionCreators__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(30);

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};



var mapDispatchToProps = function (dispatch) {
    return {
        loadRouteHandler: function (value) {
            return dispatch(Object(__WEBPACK_IMPORTED_MODULE_0_actions_actionCreators__["c" /* loadRoute */])(value));
        }
    };
};
// tslint:disable-next-line max-line-length
function RouteComponentHOC(Component) {
    var RouteComponent = (function (_super) {
        __extends(RouteComponent, _super);
        function RouteComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RouteComponent.prototype.componentDidMount = function () {
            var loadRouteHandler = this.props.loadRouteHandler;
            loadRouteHandler(false);
        };
        RouteComponent.prototype.render = function () {
            var _a = this.props, loadRouteHandler = _a.loadRouteHandler, restProps = __rest(_a, ["loadRouteHandler"]);
            return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(Component, __assign({}, restProps));
        };
        return RouteComponent;
    }(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Component));
    var componentName = Component.displayName || Component.name || 'Component';
    Component.displayName = "routeComponent(" + componentName + ")";
    Component.wrappedComponent = Component;
    return Object(__WEBPACK_IMPORTED_MODULE_2_react_redux__["connect"])(null, mapDispatchToProps)(RouteComponent);
}


/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = loadApp;
/* harmony export (immutable) */ __webpack_exports__["c"] = loadRoute;
/* harmony export (immutable) */ __webpack_exports__["a"] = getExample;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_actions_actionTypes__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_actions_fetchAction__ = __webpack_require__(274);



function loadApp(value) {
    return {
        type: __WEBPACK_IMPORTED_MODULE_0_actions_actionTypes__["a" /* default */].AppIsLoading,
        value: value
    };
}
function loadRoute(value) {
    return {
        type: __WEBPACK_IMPORTED_MODULE_0_actions_actionTypes__["a" /* default */].RouteIsLoading,
        value: value
    };
}
function getExample() {
    return function (dispatch) {
        var action = {
            type: __WEBPACK_IMPORTED_MODULE_0_actions_actionTypes__["a" /* default */].GetExample
        };
        return Object(__WEBPACK_IMPORTED_MODULE_1_actions_fetchAction__["a" /* default */])(dispatch, action)("/api/example", {
            method: 'get'
        });
    };
}


/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_fp__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_fp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};


var AsyncComponent = (function (_super) {
    __extends(AsyncComponent, _super);
    function AsyncComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            Component: null
        };
        return _this;
    }
    AsyncComponent.prototype.componentWillMount = function () {
        this.loadComponent();
    };
    AsyncComponent.prototype.loadComponent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, getComponent, _b, successHandler, _c, errorHandler, module, error_1, errStr;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this.props, getComponent = _a.getComponent, _b = _a.successHandler, successHandler = _b === void 0 ? __WEBPACK_IMPORTED_MODULE_0_lodash_fp__["noop"] : _b, _c = _a.errorHandler, errorHandler = _c === void 0 ? __WEBPACK_IMPORTED_MODULE_0_lodash_fp__["noop"] : _c;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, getComponent()];
                    case 2:
                        module = _d.sent();
                        this.setState({ Component: module.default }, successHandler);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _d.sent();
                        errStr = error_1.toString();
                        this.setState({ errors: [errStr] }, errorHandler.bind(null, errStr));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AsyncComponent.prototype.render = function () {
        var _a = this.state, Component = _a.Component, errors = _a.errors, _b = this.props, ErrorComponent = _b.errorComponent, getComponent = _b.getComponent, successHandler = _b.successHandler, errorHandler = _b.errorHandler, restProps = __rest(_b, ["errorComponent", "getComponent", "successHandler", "errorHandler"]);
        // TODO: Replace with external components.
        return Component ?
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(Component, __assign({}, restProps)) : errors ?
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(ErrorComponent, { errors: errors }) :
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", null, "Loading");
    };
    return AsyncComponent;
}(__WEBPACK_IMPORTED_MODULE_1_react___default.a.PureComponent));
/* harmony default export */ __webpack_exports__["a"] = (AsyncComponent);


/***/ })

},[270]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jbGllbnQvc3RvcmUvZ2V0QXN5bmNTdGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzP2UxNTMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3N0eWxlcy9tYWluLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2luZGV4LnRzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYWN0aW9ucy9mZXRjaEFjdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvbGliL2ZldGNoSlNPTi50cyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvbGliL2Vycm9yRmFjdG9yeS50cyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9BcHBDb250YWluZXIudHN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0FwcC9pbmRleC50c3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvUHJlbG9hZGVyL2luZGV4LnRzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9NYWluQ29udGFpbmVyLnRzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9NYWluL2luZGV4LnRzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcm91dGVzL2luZGV4LnRzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcm91dGVzL0FkbWluLnRzeCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL2ZwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvbG9kYXNoLm1pbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL2ZwL19iYXNlQ29udmVydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL2ZwL19tYXBwaW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvZnAvcGxhY2Vob2xkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JvdXRlcy9EYXNoYm9hcmQudHN4Iiwid2VicGFjazovLy8uL2NsaWVudC9yb3V0ZXMvTW9uaXRvcmluZy50c3giLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL3JvdXRlcy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvTWFpbi9zdHlsZXMuc2Nzcz9lYTBkIiwid2VicGFjazovLy8uL2NsaWVudC9zdG9yZS9jb25maWd1cmVTdG9yZS50cyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcmVkdWNlcnMvYXBwSXNMb2FkaW5nUmVkdWNlci50cyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcmVkdWNlcnMvZXhhbXBsZVJlZHVjZXIudHMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL3JvdXRlSXNMb2FkaW5nUmVkdWNlci50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVkdXgtbG9nZ2VyL2Rpc3QvcmVkdXgtbG9nZ2VyLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9tYW5pZmVzdC5qc29uIiwid2VicGFjazovLy8uL2NsaWVudC9hY3Rpb25zL2FjdGlvblR5cGVzLnRzIiwid2VicGFjazovLy8uL2NsaWVudC9ob2MvUm91dGVFcnJvci50c3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JvdXRlcy9FcnJvci50c3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hvYy9Sb3V0ZUNvbXBvbmVudC50c3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FjdGlvbnMvYWN0aW9uQ3JlYXRvcnMudHMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvQXN5bmNDb21wb25lbnQvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFb0M7QUFFcEMsMkNBQTJDO0FBQzdCLHVCQUFvQyxNQUEwQyxFQUFFLEtBQXNDLEVBQUUsVUFBMkI7SUFBM0IsK0NBQTJCO0lBRWhLLElBQU0sVUFBVSxHQUFHLG1EQUFHLENBQUMs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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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ImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVE9ETzogQ29uc2lkZXIgY2hhbmdpbmcgdG8gbG9kYXNoL2ZwIHZhcmllbnQuXG5pbXBvcnQgeyBJQXN5bmNBY3Rpb24gfSBmcm9tICdhY3Rpb25zJztcbmltcG9ydCB7IGdldCwgbWVyZ2UgfSBmcm9tICdsb2Rhc2gnO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxpbmUtbGVuZ3RoXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRBc3luY1N0YXRlPFRBc3luY0RhdGE+KGFjdGlvbj86IFBhcnRpYWw8SUFzeW5jQWN0aW9uPFRBc3luY0RhdGE+Piwgc3RhdGU/OiBJQXN5bmNTdGF0ZTxUQXN5bmNEYXRhPiB8IG51bGwsIG1lcmdlU3RhdGU6IGJvb2xlYW4gPSBmYWxzZSk6IElBc3luY1N0YXRlPFRBc3luY0RhdGE+IHtcblxuXHRjb25zdCBhY3Rpb25EYXRhID0gZ2V0KGFjdGlvbiwgJ2RhdGEnLCBudWxsKSxcblx0XHRhY3Rpb25FcnJvciA9IGdldChhY3Rpb24sICdlcnJvcicsIG51bGwpLFxuXHRcdHN0YXRlRGF0YSA9IGdldChzdGF0ZSwgJ2RhdGEnLCBudWxsKSxcblx0XHRzdGF0ZUVycm9yID0gZ2V0KHN0YXRlLCAnZXJyb3InLCBudWxsKTtcblxuXHRyZXR1cm4ge1xuXHRcdGRhdGE6IChhY3Rpb25EYXRhICYmIChtZXJnZVN0YXRlID8gbWVyZ2Uoe30sIHN0YXRlRGF0YSwgYWN0aW9uRGF0YSkgOiBhY3Rpb25EYXRhKSkgfHwgc3RhdGVEYXRhLFxuXHRcdGVycm9yOiBhY3Rpb25FcnJvciB8fCAoYWN0aW9uRGF0YSA/IG51bGwgOiBzdGF0ZUVycm9yKSxcblx0XHRsb2FkaW5nOiAhKGFjdGlvbkRhdGEgfHwgYWN0aW9uRXJyb3IpXG5cdH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3RvcmUvZ2V0QXN5bmNTdGF0ZS50cyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzXG4vLyBtb2R1bGUgaWQgPSAyNzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NsaWVudC9zdHlsZXMvbWFpbi5zY3NzXG4vLyBtb2R1bGUgaWQgPSAyNzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgbG9hZEFwcCB9IGZyb20gJ2FjdGlvbnMvYWN0aW9uQ3JlYXRvcnMnO1xuaW1wb3J0IEFwcENvbnRhaW5lciBmcm9tICdjb250YWluZXJzL0FwcENvbnRhaW5lcic7XG5pbXBvcnQgeyBwYXJ0aWFsIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBJU3RvcmVTdGF0ZSB9IGZyb20gJ3N0b3JlJztcbmltcG9ydCBjb25maWd1cmVTdG9yZSBmcm9tICdzdG9yZS9jb25maWd1cmVTdG9yZSc7XG5cbmludGVyZmFjZSBJU2VydmljZVdvcmtlclN0YXRlQ2hhbmdlRXZlbnQgZXh0ZW5kcyBFdmVudCB7XG5cdHRhcmdldDogSVNlcnZpY2VXb3JrZXJTdGF0ZUNoYW5nZUV2ZW50VGFyZ2V0O1xufVxuXG5pbnRlcmZhY2UgSVNlcnZpY2VXb3JrZXJTdGF0ZUNoYW5nZUV2ZW50VGFyZ2V0IGV4dGVuZHMgRXZlbnRUYXJnZXQge1xuXHRzdGF0ZTogc3RyaW5nO1xufVxuXG5jb25zdCBzZXJ2aWNlV29ya2VySXNBdmFpbGFibGU6IGJvb2xlYW4gPSBCb29sZWFuKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpICYmXG5cdHByb2Nlc3MuZW52LlNFUlZJQ0VfV09SS0VSX0VOQUJMRUQgPT09ICd0cnVlJyxcblx0c3RvcmU6IFN0b3JlPElTdG9yZVN0YXRlPiA9IGNvbmZpZ3VyZVN0b3JlKHtcblx0XHRhcHBJc0xvYWRpbmc6IHNlcnZpY2VXb3JrZXJJc0F2YWlsYWJsZVxuXHR9KSxcblx0YXBwID0gKFxuXHRcdDxQcm92aWRlciBzdG9yZT17IHN0b3JlIH0+XG5cdFx0XHQ8QXBwQ29udGFpbmVyIC8+XG5cdFx0PC9Qcm92aWRlcj5cblx0KTtcblxuLy8gTk9URTogUmVuZGVyIEFwcFxuUmVhY3RET00ucmVuZGVyKGFwcCwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTtcblxuLy8gVE9ETzogSW1wbGVtZW50IG1lc3NhZ2UgcmVsYXkgd2hpY2ggd2lsbCB0cmlnZ2VyICdzdG9yZS5kaXNwYXRjaChsb2FkQXBwKGZhbHNlKScgb25jZSBmZXRjaCBpbnRlcmNlcHRzIGFyZSBhY3RpdmUuXG5pZiAoc2VydmljZVdvcmtlcklzQXZhaWxhYmxlKSB7XG5cblx0bmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoJy9zdy5qcycpXG5cdFx0LnRoZW4oYXdhaXRTZXJ2aWNlV29ya2VyQWN0aXZhdGlvbilcblx0XHQudGhlbigoKSA9PiBzdG9yZS5kaXNwYXRjaChsb2FkQXBwKGZhbHNlKSkpXG5cdFx0LmNhdGNoKGZ1bmN0aW9uIHNlcnZpY2VXb3JrZXJFcnJvckhhbmRsZXIoZXJyb3I6IEVycm9yKSB7XG5cdFx0XHQvLyBUT0RPOiBIYW5kbGUgU1cgZXJyb3IuXG5cdFx0fSk7XG59XG5cbmZ1bmN0aW9uIGF3YWl0U2VydmljZVdvcmtlckFjdGl2YXRpb24ocmVnaXN0cmF0aW9uOiBTZXJ2aWNlV29ya2VyUmVnaXN0cmF0aW9uKTogUHJvbWlzZTxTZXJ2aWNlV29ya2VyUmVnaXN0cmF0aW9uPiB7XG5cblx0cmV0dXJuIG5ldyBQcm9taXNlICgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cblx0XHRjb25zdCBwZW5kaW5nU2VydmljZVdvcmtlcjogU2VydmljZVdvcmtlciB8IG51bGwgPSByZWdpc3RyYXRpb24uaW5zdGFsbGluZztcblxuXHRcdGlmIChwZW5kaW5nU2VydmljZVdvcmtlcikge1xuXG5cdFx0XHRjb25zdCBzdGF0ZUNoYW5nZUxpc3RlbmVyOiBFdmVudExpc3RlbmVyID0gKGV2dDogSVNlcnZpY2VXb3JrZXJTdGF0ZUNoYW5nZUV2ZW50KSA9PiB7XG5cblx0XHRcdFx0aWYgKGV2dC50YXJnZXQuc3RhdGUgPT09ICdhY3RpdmF0ZWQnKSB7XG5cdFx0XHRcdFx0cGVuZGluZ1NlcnZpY2VXb3JrZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignc3RhdGVjaGFuZ2UnLCBzdGF0ZUNoYW5nZUxpc3RlbmVyKTtcblx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZShyZWdpc3RyYXRpb24pO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHRwZW5kaW5nU2VydmljZVdvcmtlci5hZGRFdmVudExpc3RlbmVyKCdzdGF0ZWNoYW5nZScsIHN0YXRlQ2hhbmdlTGlzdGVuZXIpO1xuXHRcdH1cblx0XHQvLyBOT1RFOiBPdGhlcndpc2UgYXNzdW1lIHJlZ2lzdHJhdGlvbiBpcyBhY3RpdmUgb3Igd2FpdGluZyBpbiB3aGljaCBjYXNlIHRoZSBhcHBsaWNhdGlvbiBjYW4gYmUgcmFuLlxuXHRcdGVsc2Uge1xuXHRcdFx0cmV0dXJuIHJlc29sdmUocmVnaXN0cmF0aW9uKTtcblx0XHR9XG5cdH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2luZGV4LnRzeCIsImltcG9ydCB7IElBc3luY0FjdGlvbiB9IGZyb20gJ2FjdGlvbnMnO1xuaW1wb3J0IHsgZ2V0SlNPTiwgc2VuZEpTT04gfSBmcm9tICdsaWIvZmV0Y2hKU09OJztcbmltcG9ydCB7IGdldCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBBY3Rpb24sIERpc3BhdGNoIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgSVN0b3JlU3RhdGUgfSBmcm9tICdzdG9yZSc7XG5pbXBvcnQgZ2V0QXN5bmNTdGF0ZSBmcm9tICdzdG9yZS9nZXRBc3luY1N0YXRlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmV0Y2hBY3Rpb248VEFzeW5jRGF0YT4oZGlzcGF0Y2g6IERpc3BhdGNoPElTdG9yZVN0YXRlPiwgYWN0aW9uOiBBY3Rpb24pIHtcblxuXHRyZXR1cm4gKHVybDogc3RyaW5nLCBvcHRpb25zOiBSZXF1ZXN0SW5pdCA9IHt9KTogUHJvbWlzZTxJQXN5bmNBY3Rpb248VEFzeW5jRGF0YT4+ID0+IHtcblxuXHRcdGRpc3BhdGNoTG9hZGluZ0FjdGlvbihkaXNwYXRjaCwgYWN0aW9uKTtcblxuXHRcdGNvbnN0IHByb21pc2UgPSBvcHRpb25zLm1ldGhvZCA9PT0gJ2dldCcgP1xuXHRcdFx0Z2V0SlNPTjxUQXN5bmNEYXRhPih1cmwsIG9wdGlvbnMpIDpcblx0XHRcdHNlbmRKU09OPFRBc3luY0RhdGE+KHVybCwgb3B0aW9ucyk7XG5cblx0XHRyZXR1cm4gcHJvbWlzZVxuXHRcdFx0LnRoZW4oZGlzcGF0Y2hTdWNjZXNzQWN0aW9uPFRBc3luY0RhdGE+KGRpc3BhdGNoLCBhY3Rpb24pKVxuXHRcdFx0LmNhdGNoKGRpc3BhdGNoRmFpbGVkQWN0aW9uKGRpc3BhdGNoLCBhY3Rpb24pKTtcblx0fTtcbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2hMb2FkaW5nQWN0aW9uKGRpc3BhdGNoOiBEaXNwYXRjaDxJU3RvcmVTdGF0ZT4sIGFjdGlvbjogQWN0aW9uKTogSUFzeW5jQWN0aW9uIHtcblxuXHRyZXR1cm4gZGlzcGF0Y2goT2JqZWN0LmFzc2lnbih7fSwgYWN0aW9uLCBnZXRBc3luY1N0YXRlKCkpKTtcbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2hTdWNjZXNzQWN0aW9uPFRBc3luY0RhdGE+KGRpc3BhdGNoOiBEaXNwYXRjaDxJU3RvcmVTdGF0ZT4sIGFjdGlvbjogQWN0aW9uKSB7XG5cblx0cmV0dXJuIChkYXRhOiBUQXN5bmNEYXRhKTogSUFzeW5jQWN0aW9uPFRBc3luY0RhdGE+ID0+IHtcblx0XHRyZXR1cm4gZGlzcGF0Y2goT2JqZWN0LmFzc2lnbih7fSwgYWN0aW9uLCBnZXRBc3luY1N0YXRlPFRBc3luY0RhdGE+KHsgZGF0YSB9KSkpO1xuXHR9O1xufVxuXG5mdW5jdGlvbiBkaXNwYXRjaEZhaWxlZEFjdGlvbihkaXNwYXRjaDogRGlzcGF0Y2g8SVN0b3JlU3RhdGU+LCBhY3Rpb246IEFjdGlvbikge1xuXG5cdHJldHVybiAoZXJyb3I6IElIVFRQRXJyb3IpOiBJQXN5bmNBY3Rpb24gPT4ge1xuXHRcdHJldHVybiBkaXNwYXRjaChPYmplY3QuYXNzaWduKHt9LCBhY3Rpb24sIGdldEFzeW5jU3RhdGUoeyBlcnJvciB9KSkpO1xuXHR9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FjdGlvbnMvZmV0Y2hBY3Rpb24udHMiLCJpbXBvcnQgeyBjcmVhdGVIdHRwRXJyb3IgfSBmcm9tICdsaWIvZXJyb3JGYWN0b3J5JztcbmltcG9ydCB7IG1lcmdlIH0gZnJvbSAnbG9kYXNoJztcblxuY29uc3QgSFRUUF9WRVJCUyA9IHtcblx0REVMRVRFOiAnZGVsZXRlJyxcblx0R0VUOiAnZ2V0Jyxcblx0UE9TVDogJ3Bvc3QnLFxuXHRQVVQ6ICdwdXQnXG59O1xuXG5jb25zdCBGRVRDSF9ERUZBVUxUUzogUGFydGlhbDxSZXF1ZXN0SW5pdD4gPSB7XG5cdGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuXHRtb2RlOiAnY29ycycsXG5cdHJlZGlyZWN0OiAnZm9sbG93J1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEpTT048VEFzeW5jRGF0YT4odXJsOiBzdHJpbmcsIG9wdGlvbnM6IFJlcXVlc3RJbml0KTogUHJvbWlzZTxUQXN5bmNEYXRhPiB7XG5cblx0cmV0dXJuIHJlcXVlc3Q8VEFzeW5jRGF0YT4odXJsLCBtZXJnZSh7fSwgRkVUQ0hfREVGQVVMVFMsIHtcblx0XHRjYWNoZTogJ2RlZmF1bHQnLFxuXHRcdGhlYWRlcnM6IHtcblx0XHRcdEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nXG5cdFx0fSxcblx0XHRtZXRob2Q6IEhUVFBfVkVSQlMuR0VUXG5cdH0sIG9wdGlvbnMpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlbmRKU09OPFRBc3luY0RhdGE+KHVybDogc3RyaW5nLCBvcHRpb25zOiBSZXF1ZXN0SW5pdCk6IFByb21pc2U8VEFzeW5jRGF0YT4ge1xuXG5cdHJldHVybiByZXF1ZXN0PFRBc3luY0RhdGE+KHVybCwgbWVyZ2Uoe30sIEZFVENIX0RFRkFVTFRTLCB7XG5cdFx0aGVhZGVyczogT2JqZWN0LmFzc2lnbih7XG5cdFx0XHRBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJ1xuXHRcdH0sIG9wdGlvbnMubWV0aG9kICYmIFtIVFRQX1ZFUkJTLlBPU1QsIEhUVFBfVkVSQlMuUFVUXS5pbmNsdWRlcyhvcHRpb25zLm1ldGhvZC50b0xvd2VyQ2FzZSgpKSAmJiB7XG5cdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG5cdFx0fSksXG5cdFx0bWV0aG9kOiAncG9zdCdcblx0fSwgb3B0aW9ucykpO1xufVxuXG5mdW5jdGlvbiByZXF1ZXN0PFRBc3luY0RhdGE+KHVybDogc3RyaW5nLCBvcHRpb25zOiBSZXF1ZXN0SW5pdCk6IFByb21pc2U8VEFzeW5jRGF0YT4ge1xuXG5cdHJldHVybiBmZXRjaCh1cmwsIG9wdGlvbnMpLnRoZW4oKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4ge1xuXG5cdFx0cmV0dXJuIHJlc3BvbnNlLmpzb24oKS50aGVuKChqc29uOiBhbnkpID0+IHtcblxuXHRcdFx0cmV0dXJuIHJlc3BvbnNlLm9rID8ganNvbiA6IFByb21pc2UucmVqZWN0KGNyZWF0ZUh0dHBFcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0LCB7XG5cdFx0XHRcdGVycm9yczoganNvbi5lcnJvcnMsXG5cdFx0XHRcdHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG5cdFx0XHR9KSk7XG5cblx0XHR9LCAoZXJyb3I6IEVycm9yKSA9PiB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoY3JlYXRlSHR0cEVycm9yKGBKU09OIEVycm9yOiAkeyBlcnJvci5tZXNzYWdlIH1gKSk7XG5cdFx0fSk7XG5cblx0fSwgKGVycm9yOiBFcnJvcikgPT4ge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChjcmVhdGVIdHRwRXJyb3IoYEZldGNoIEVycm9yOiAkeyBlcnJvci5tZXNzYWdlIH1gKSk7XG5cdH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2xpYi9mZXRjaEpTT04udHMiLCJpbnRlcmZhY2UgSUhUVFBFcnJvck9wdGlvbnMge1xuXHRlcnJvcnM/OiBzdHJpbmdbXTtcblx0c3RhdHVzPzogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSHR0cEVycm9yKG1lc3NhZ2U6IHN0cmluZywgb3B0aW9uczogSUhUVFBFcnJvck9wdGlvbnMgPSB7fSk6IElIVFRQRXJyb3Ige1xuXG5cdGNvbnN0IHsgc3RhdHVzLCBlcnJvcnMgfSA9IG9wdGlvbnMsXG5cdFx0ZXJyb3I6IElIVFRQRXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG5cblx0aWYgKHN0YXR1cykge1xuXHRcdGVycm9yLnN0YXR1cyA9IHN0YXR1cztcblx0fVxuXG5cdGlmIChlcnJvcnMpIHtcblx0XHRlcnJvci5lcnJvcnMgPSBlcnJvcnM7XG5cdH1cblxuXHRyZXR1cm4gZXJyb3I7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zaGFyZWQvbGliL2Vycm9yRmFjdG9yeS50cyIsImltcG9ydCB7IElzTG9hZGluZ1N0YXRlIH0gZnJvbSAnYWN0aW9ucyc7XG5pbXBvcnQgQXBwLCB7IElBcHBQcm9wcyB9IGZyb20gJ2NvbXBvbmVudHMvQXBwJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgSVN0b3JlU3RhdGUgfSBmcm9tICdzdG9yZSc7XG5cbmV4cG9ydCB0eXBlIElBcHBDb250YWluZXJQcm9wcyA9IElCYXNlUHJvcHMgJiBJTWFwU3RhdGVUb1Byb3BzO1xuXG5pbnRlcmZhY2UgSUJhc2VQcm9wcyB7fVxuXG5pbnRlcmZhY2UgSU1hcFN0YXRlVG9Qcm9wcyB7XG5cdGFwcElzTG9hZGluZzogSXNMb2FkaW5nU3RhdGU7XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZTogSVN0b3JlU3RhdGUpOiBJTWFwU3RhdGVUb1Byb3BzID0+IHtcblxuXHRjb25zdCB7IGFwcElzTG9hZGluZyB9ID0gc3RhdGU7XG5cblx0cmV0dXJuIHtcblx0XHRhcHBJc0xvYWRpbmdcblx0fTtcbn07XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBtYXgtbGluZS1sZW5ndGhcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3Q8SU1hcFN0YXRlVG9Qcm9wcywgbnVsbCwgSUJhc2VQcm9wcyAmIElBcHBQcm9wcz4obWFwU3RhdGVUb1Byb3BzKShBcHApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQXBwQ29udGFpbmVyLnRzeCIsImltcG9ydCBQcmVsb2FkZXIgZnJvbSAnY29tcG9uZW50cy9QcmVsb2FkZXInO1xuaW1wb3J0IHsgSUFwcENvbnRhaW5lclByb3BzIH0gZnJvbSAnY29udGFpbmVycy9BcHBDb250YWluZXInO1xuaW1wb3J0IE1haW5Db250YWluZXIgZnJvbSAnY29udGFpbmVycy9NYWluQ29udGFpbmVyJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCcm93c2VyUm91dGVyIGFzIFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5leHBvcnQgaW50ZXJmYWNlIElBcHBQcm9wcyB7fVxuXG5jb25zdCBBcHA6IFJlYWN0LlNGQzxJQXBwUHJvcHMgJiBJQXBwQ29udGFpbmVyUHJvcHM+ID0gKHByb3BzKSA9PiB7XG5cblx0Y29uc3QgeyBhcHBJc0xvYWRpbmcgfSA9IHByb3BzO1xuXG5cdHJldHVybiBhcHBJc0xvYWRpbmcgPyA8UHJlbG9hZGVyIC8+IDogPEFwcFJvdXRlciAvPjtcbn07XG5cbmNvbnN0IEFwcFJvdXRlcjogUmVhY3QuU0ZDID0gKHByb3BzKSA9PiB7XG5cblx0cmV0dXJuIChcblx0XHQ8Um91dGVyPlxuXHRcdFx0PE1haW5Db250YWluZXIgLz5cblx0XHQ8L1JvdXRlcj5cblx0KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFwcDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0FwcC9pbmRleC50c3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUm91dGVDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByZWxvYWRlclByb3BzIHt9XG5cbmNvbnN0IFByZWxvYWRlcjogUmVhY3QuU0ZDPElQcmVsb2FkZXJQcm9wcz4gPSAocHJvcHMpID0+IHtcblxuXHRyZXR1cm4gKFxuXHRcdDxkaXY+XG5cdFx0XHQ8aDE+TG9hZGluZzwvaDE+XG5cdFx0PC9kaXY+XG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQcmVsb2FkZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9QcmVsb2FkZXIvaW5kZXgudHN4IiwiaW1wb3J0IHsgSUxvYWRBY3Rpb24sIElzTG9hZGluZ1N0YXRlIH0gZnJvbSAnYWN0aW9ucyc7XG5pbXBvcnQgeyBnZXRFeGFtcGxlLCBsb2FkUm91dGUgfSBmcm9tICdhY3Rpb25zL2FjdGlvbkNyZWF0b3JzJztcbmltcG9ydCBNYWluLCB7IElNYWluUHJvcHMgfSBmcm9tICdjb21wb25lbnRzL01haW4nO1xuaW1wb3J0IEhpc3RvcnkgZnJvbSAnaGlzdG9yeSc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IFJvdXRlQ29tcG9uZW50UHJvcHMsIHdpdGhSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHsgSUFzeW5jRXhhbXBsZVN0YXRlIH0gZnJvbSAncmVkdWNlcnMvZXhhbXBsZVJlZHVjZXInO1xuaW1wb3J0IHsgRGlzcGF0Y2ggfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBJU3RvcmVTdGF0ZSB9IGZyb20gJ3N0b3JlJztcblxuZXhwb3J0IHR5cGUgSU1haW5Db250YWluZXJQcm9wcyA9IElCYXNlUHJvcHMgJiBJTWFwU3RhdGVUb1Byb3BzO1xuXG5pbnRlcmZhY2UgSUJhc2VQcm9wcyB7fVxuXG5pbnRlcmZhY2UgSU1hcFN0YXRlVG9Qcm9wcyB7XG5cdGV4YW1wbGU6IElBc3luY0V4YW1wbGVTdGF0ZTtcblx0cm91dGVJc0xvYWRpbmc6IElzTG9hZGluZ1N0YXRlO1xufVxuXG5pbnRlcmZhY2UgSU1hcERpc3BhdGNoVG9Qcm9wcyB7XG5cdGdldEV4YW1wbGVIYW5kbGVyOiAoKSA9PiBQcm9taXNlPElBc3luY0V4YW1wbGVTdGF0ZT47XG5cdGxvYWRSb3V0ZUhhbmRsZXI6ICh2YWx1ZTogSXNMb2FkaW5nU3RhdGUpID0+IElMb2FkQWN0aW9uO1xufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGU6IElTdG9yZVN0YXRlKTogSU1hcFN0YXRlVG9Qcm9wcyA9PiB7XG5cblx0Y29uc3QgeyBleGFtcGxlLCByb3V0ZUlzTG9hZGluZyB9ID0gc3RhdGU7XG5cblx0cmV0dXJuIHtcblx0XHRleGFtcGxlLFxuXHRcdHJvdXRlSXNMb2FkaW5nXG5cdH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2g6IERpc3BhdGNoPElTdG9yZVN0YXRlPik6IElNYXBEaXNwYXRjaFRvUHJvcHMgPT4ge1xuXG5cdHJldHVybiB7XG5cdFx0Z2V0RXhhbXBsZUhhbmRsZXI6ICgpID0+IHtcblx0XHRcdHJldHVybiBkaXNwYXRjaChnZXRFeGFtcGxlKCkpO1xuXHRcdH0sXG5cdFx0bG9hZFJvdXRlSGFuZGxlcjogKHZhbHVlKSA9PiB7XG5cdFx0XHRyZXR1cm4gZGlzcGF0Y2gobG9hZFJvdXRlKHZhbHVlKSk7XG5cdFx0fVxuXHR9O1xufTtcblxuY2xhc3MgTWFpbkNvbnRhaW5lciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxJTWFpbkNvbnRhaW5lclByb3BzICYgSU1hcERpc3BhdGNoVG9Qcm9wcyAmIElNYWluUHJvcHM+IHtcblxuXHRwcml2YXRlIGhpc3RvcnlMaXN0ZW5lcjogSGlzdG9yeS5VbnJlZ2lzdGVyQ2FsbGJhY2s7XG5cblx0cHVibGljIGNvbXBvbmVudERpZE1vdW50KCkge1xuXG5cdFx0Y29uc3QgeyBoaXN0b3J5LCBnZXRFeGFtcGxlSGFuZGxlciB9ID0gdGhpcy5wcm9wcztcblxuXHRcdHRoaXMuaGlzdG9yeUxpc3RlbmVyID0gaGlzdG9yeS5saXN0ZW4odGhpcy5oaXN0b3J5Q2hhbmdlSGFuZGxlci5iaW5kKHRoaXMpKTtcblxuXHRcdGdldEV4YW1wbGVIYW5kbGVyKCk7XG5cdH1cblxuXHRwdWJsaWMgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG5cblx0XHQvLyBOT1RFOiBVbnN1YnNjcmliZXMgaGlzdG9yeUxpc3RlbmVyLlxuXHRcdHRoaXMuaGlzdG9yeUxpc3RlbmVyKCk7XG5cdH1cblxuXHRwcml2YXRlIGhpc3RvcnlDaGFuZ2VIYW5kbGVyKGxvY2F0aW9uOiBIaXN0b3J5LkxvY2F0aW9uKSB7XG5cblx0XHRjb25zdCB7IGxvY2F0aW9uOiBjdXJyZW50TG9jYXRpb24sIGxvYWRSb3V0ZUhhbmRsZXIgfSA9IHRoaXMucHJvcHM7XG5cblx0XHRpZiAobG9jYXRpb24ucGF0aG5hbWUgIT09IGN1cnJlbnRMb2NhdGlvbi5wYXRobmFtZSkge1xuXHRcdFx0bG9hZFJvdXRlSGFuZGxlcih0cnVlKTtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgcmVuZGVyKCkge1xuXG5cdFx0Y29uc3QgeyBsb2FkUm91dGVIYW5kbGVyLCBnZXRFeGFtcGxlSGFuZGxlciwgLi4ucmVzdFByb3BzIH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0cmV0dXJuIDxNYWluIHsgLi4ucmVzdFByb3BzIH0gLz47XG5cdH1cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG1heC1saW5lLWxlbmd0aFxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihjb25uZWN0PElNYXBTdGF0ZVRvUHJvcHMsIElNYXBEaXNwYXRjaFRvUHJvcHMsIElCYXNlUHJvcHMgJiBJTWFpblByb3BzPihtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoTWFpbkNvbnRhaW5lcikpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvTWFpbkNvbnRhaW5lci50c3giLCJpbXBvcnQgeyBJTWFpbkNvbnRhaW5lclByb3BzIH0gZnJvbSAnY29udGFpbmVycy9NYWluQ29udGFpbmVyJztcbmltcG9ydCBIaXN0b3J5IGZyb20gJ2hpc3RvcnknO1xuaW1wb3J0IFJvdXRlRXJyb3IgZnJvbSAnaG9jL1JvdXRlRXJyb3InO1xuaW1wb3J0IFJlYWN0LCB7IFJlYWN0RWxlbWVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFJvdXRlQ29tcG9uZW50UHJvcHMsIFJvdXRlUHJvcHMgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHsgTmF2TGluaywgUmVkaXJlY3QsIFJvdXRlLCBTd2l0Y2ggfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCAqIGFzIHJvdXRlcyBmcm9tICdyb3V0ZXMnO1xuaW1wb3J0IHJvdXRlQ29uZmlnLCB7IElQYXJ0aWFsUm91dGVQcm9wcyB9IGZyb20gJ3JvdXRlcy9jb25maWcnO1xuaW1wb3J0ICcuL3N0eWxlcy5zY3NzJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWFpblByb3BzIGV4dGVuZHMgUm91dGVDb21wb25lbnRQcm9wczxhbnk+IHt9XG5cbmNvbnN0IE1haW46IFJlYWN0LlNGQzxJTWFpblByb3BzICYgSU1haW5Db250YWluZXJQcm9wcz4gPSAocHJvcHMpID0+IHtcblxuXHRyZXR1cm4gKFxuXHRcdDxtYWluIGNsYXNzTmFtZT1cIm1haW5cIj5cblx0XHRcdHsgcHJvcHMucm91dGVJc0xvYWRpbmcgJiYgPHA+TG9hZGluZzwvcD4gfVxuXHRcdFx0PE5hdkxpbmsgdG89XCIvXCI+RGFzaGJvYXJkPC9OYXZMaW5rPlxuXHRcdFx0PE5hdkxpbmsgdG89XCIvbW9uaXRvcmluZy8xXCI+TW9uaXRvcmluZzwvTmF2TGluaz5cblx0XHRcdDxOYXZMaW5rIHRvPVwiL2FkbWluXCI+QWRtaW48L05hdkxpbms+XG5cdFx0XHQ8U3dpdGNoPlxuXHRcdFx0XHR7IHJvdXRlQ29uZmlnLm1hcChnZXRSb3V0ZSkgfVxuXHRcdFx0XHQ8Um91dGUgY29tcG9uZW50PXsgUm91dGVFcnJvcihyb3V0ZXMuRXJyb3IsIHsgc3RhdHVzOiA0MDQgfSkgfSAvPlxuXHRcdFx0PC9Td2l0Y2g+XG5cdFx0PC9tYWluPlxuXHQpO1xufTtcblxuLy8gVE9ETzogQWRkIGNvcnJlY3QgdHlwZS5cbmZ1bmN0aW9uIGdldFJvdXRlKGNvbmZpZ1Byb3BzOiBJUGFydGlhbFJvdXRlUHJvcHMpOiBSZWFjdEVsZW1lbnQ8Um91dGVQcm9wcz4ge1xuXG5cdGNvbnN0IHsgY29tcG9uZW50SWQsIC4uLnJvdXRlUHJvcHMgfSA9IGNvbmZpZ1Byb3BzLFxuXHRcdGNvbXBvbmVudCA9IGNvbXBvbmVudElkICYmIHJvdXRlc1tjb21wb25lbnRJZF07XG5cblx0aWYgKCFjb21wb25lbnQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1JvdXRlcyBjb25maWd1cmF0aW9uIGlzIG1pc3NpbmcgcHJvcGVydHkgXCJjb21wb25lbnRJZFwiJyk7XG5cdH1cblxuXHRyZXR1cm4gKFxuXHRcdDxSb3V0ZVxuXHRcdFx0Y29tcG9uZW50PXsgY29tcG9uZW50IH1cblx0XHRcdGtleT17IGNvbXBvbmVudElkIH1cblx0XHRcdHsgLi4ucm91dGVQcm9wcyB9XG5cdFx0Lz5cblx0KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFpbjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL01haW4vaW5kZXgudHN4IiwiaW1wb3J0IEFkbWluIGZyb20gJ3JvdXRlcy9BZG1pbic7XG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJ3JvdXRlcy9EYXNoYm9hcmQnO1xuaW1wb3J0IEVycm9yIGZyb20gJ3JvdXRlcy9FcnJvcic7XG5pbXBvcnQgTW9uaXRvcmluZyBmcm9tICdyb3V0ZXMvTW9uaXRvcmluZyc7XG5cbmV4cG9ydCB7XG5cdEFkbWluLFxuXHREYXNoYm9hcmQsXG5cdEVycm9yLFxuXHRNb25pdG9yaW5nXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JvdXRlcy9pbmRleC50c3giLCJpbXBvcnQgeyBJQWRtaW5Qcm9wcyB9IGZyb20gJ2NvbXBvbmVudHMvQWRtaW4nO1xuaW1wb3J0IEFzeW5jQ29tcG9uZW50IGZyb20gJ2NvbXBvbmVudHMvQXN5bmNDb21wb25lbnQnO1xuaW1wb3J0IFJvdXRlQ29tcG9uZW50IGZyb20gJ2hvYy9Sb3V0ZUNvbXBvbmVudCc7XG5pbXBvcnQgUm91dGVFcnJvciBmcm9tICdob2MvUm91dGVFcnJvcic7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUm91dGVDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgRXJyb3JSb3V0ZSBmcm9tICdyb3V0ZXMvRXJyb3InO1xuXG5jb25zdCBBZG1pbjogUmVhY3QuU0ZDPElBZG1pblByb3BzPiA9IChwcm9wcykgPT4ge1xuXG5cdHJldHVybiAoXG5cdFx0PEFzeW5jQ29tcG9uZW50XG5cdFx0XHQvLyBUT0RPOiBDb25zaWRlciBjcmVhdGluZyBhIHV0aWxpdHkgY29tcG9uZW50IHRvIGF2b2lkIHRoaXMgcmVwZXRpdGlvbi5cblx0XHRcdGVycm9yQ29tcG9uZW50PXsgUm91dGVDb21wb25lbnQoUm91dGVFcnJvcihFcnJvclJvdXRlLCB7IHN0YXR1czogNDA0IH0pKSB9XG5cdFx0XHQvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUganN4LW5vLWxhbWJkYVxuXHRcdFx0Z2V0Q29tcG9uZW50PXsgKCkgPT4gaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6IFwiYWRtaW5cIiAqLyAnY29tcG9uZW50cy9BZG1pbicpIH1cblx0XHRcdHsgLi4ucHJvcHMgfVxuXHRcdC8+XG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBZG1pbjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9yb3V0ZXMvQWRtaW4udHN4IiwidmFyIF8gPSByZXF1aXJlKCcuL2xvZGFzaC5taW4nKS5ydW5JbkNvbnRleHQoKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mcC9fYmFzZUNvbnZlcnQnKShfLCBfKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9mcC5qc1xuLy8gbW9kdWxlIGlkID0gMjg0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIExvZGFzaCBsb2Rhc2guY29tL2xpY2Vuc2UgfCBVbmRlcnNjb3JlLmpzIDEuOC4zIHVuZGVyc2NvcmVqcy5vcmcvTElDRU5TRVxuICovXG47KGZ1bmN0aW9uKCl7ZnVuY3Rpb24gbihuLHQpe3JldHVybiBuLnNldCh0WzBdLHRbMV0pLG59ZnVuY3Rpb24gdChuLHQpe3JldHVybiBuLmFkZCh0KSxufWZ1bmN0aW9uIHIobix0LHIpe3N3aXRjaChyLmxlbmd0aCl7Y2FzZSAwOnJldHVybiBuLmNhbGwodCk7Y2FzZSAxOnJldHVybiBuLmNhbGwodCxyWzBdKTtjYXNlIDI6cmV0dXJuIG4uY2FsbCh0LHJbMF0sclsxXSk7Y2FzZSAzOnJldHVybiBuLmNhbGwodCxyWzBdLHJbMV0sclsyXSl9cmV0dXJuIG4uYXBwbHkodCxyKX1mdW5jdGlvbiBlKG4sdCxyLGUpe2Zvcih2YXIgdT0tMSxpPW51bGw9PW4/MDpuLmxlbmd0aDsrK3U8aTspe3ZhciBvPW5bdV07dChlLG8scihvKSxuKX1yZXR1cm4gZX1mdW5jdGlvbiB1KG4sdCl7Zm9yKHZhciByPS0xLGU9bnVsbD09bj8wOm4ubGVuZ3RoOysrcjxlJiZmYWxzZSE9PXQobltyXSxyLG4pOyk7cmV0dXJuIG59ZnVuY3Rpb24gaShuLHQpe2Zvcih2YXIgcj1udWxsPT1uPzA6bi5sZW5ndGg7ci0tJiZmYWxzZSE9PXQobltyXSxyLG4pOyk7XG5yZXR1cm4gbn1mdW5jdGlvbiBvKG4sdCl7Zm9yKHZhciByPS0xLGU9bnVsbD09bj8wOm4ubGVuZ3RoOysrcjxlOylpZighdChuW3JdLHIsbikpcmV0dXJuIGZhbHNlO3JldHVybiB0cnVlfWZ1bmN0aW9uIGYobix0KXtmb3IodmFyIHI9LTEsZT1udWxsPT1uPzA6bi5sZW5ndGgsdT0wLGk9W107KytyPGU7KXt2YXIgbz1uW3JdO3QobyxyLG4pJiYoaVt1KytdPW8pfXJldHVybiBpfWZ1bmN0aW9uIGMobix0KXtyZXR1cm4hKG51bGw9PW58fCFuLmxlbmd0aCkmJi0xPGQobix0LDApfWZ1bmN0aW9uIGEobix0LHIpe2Zvcih2YXIgZT0tMSx1PW51bGw9PW4/MDpuLmxlbmd0aDsrK2U8dTspaWYocih0LG5bZV0pKXJldHVybiB0cnVlO3JldHVybiBmYWxzZX1mdW5jdGlvbiBsKG4sdCl7Zm9yKHZhciByPS0xLGU9bnVsbD09bj8wOm4ubGVuZ3RoLHU9QXJyYXkoZSk7KytyPGU7KXVbcl09dChuW3JdLHIsbik7cmV0dXJuIHV9ZnVuY3Rpb24gcyhuLHQpe2Zvcih2YXIgcj0tMSxlPXQubGVuZ3RoLHU9bi5sZW5ndGg7KytyPGU7KW5bdStyXT10W3JdO1xucmV0dXJuIG59ZnVuY3Rpb24gaChuLHQscixlKXt2YXIgdT0tMSxpPW51bGw9PW4/MDpuLmxlbmd0aDtmb3IoZSYmaSYmKHI9blsrK3VdKTsrK3U8aTspcj10KHIsblt1XSx1LG4pO3JldHVybiByfWZ1bmN0aW9uIHAobix0LHIsZSl7dmFyIHU9bnVsbD09bj8wOm4ubGVuZ3RoO2ZvcihlJiZ1JiYocj1uWy0tdV0pO3UtLTspcj10KHIsblt1XSx1LG4pO3JldHVybiByfWZ1bmN0aW9uIF8obix0KXtmb3IodmFyIHI9LTEsZT1udWxsPT1uPzA6bi5sZW5ndGg7KytyPGU7KWlmKHQobltyXSxyLG4pKXJldHVybiB0cnVlO3JldHVybiBmYWxzZX1mdW5jdGlvbiB2KG4sdCxyKXt2YXIgZTtyZXR1cm4gcihuLGZ1bmN0aW9uKG4scix1KXtpZih0KG4scix1KSlyZXR1cm4gZT1yLGZhbHNlfSksZX1mdW5jdGlvbiBnKG4sdCxyLGUpe3ZhciB1PW4ubGVuZ3RoO2ZvcihyKz1lPzE6LTE7ZT9yLS06KytyPHU7KWlmKHQobltyXSxyLG4pKXJldHVybiByO3JldHVybi0xfWZ1bmN0aW9uIGQobix0LHIpe2lmKHQ9PT10KW46e1xuLS1yO2Zvcih2YXIgZT1uLmxlbmd0aDsrK3I8ZTspaWYobltyXT09PXQpe249cjticmVhayBufW49LTF9ZWxzZSBuPWcobixiLHIpO3JldHVybiBufWZ1bmN0aW9uIHkobix0LHIsZSl7LS1yO2Zvcih2YXIgdT1uLmxlbmd0aDsrK3I8dTspaWYoZShuW3JdLHQpKXJldHVybiByO3JldHVybi0xfWZ1bmN0aW9uIGIobil7cmV0dXJuIG4hPT1ufWZ1bmN0aW9uIHgobix0KXt2YXIgcj1udWxsPT1uPzA6bi5sZW5ndGg7cmV0dXJuIHI/ayhuLHQpL3I6UH1mdW5jdGlvbiBqKG4pe3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gbnVsbD09dD9GOnRbbl19fWZ1bmN0aW9uIHcobil7cmV0dXJuIGZ1bmN0aW9uKHQpe3JldHVybiBudWxsPT1uP0Y6blt0XX19ZnVuY3Rpb24gbShuLHQscixlLHUpe3JldHVybiB1KG4sZnVuY3Rpb24obix1LGkpe3I9ZT8oZT1mYWxzZSxuKTp0KHIsbix1LGkpfSkscn1mdW5jdGlvbiBBKG4sdCl7dmFyIHI9bi5sZW5ndGg7Zm9yKG4uc29ydCh0KTtyLS07KW5bcl09bltyXS5jO1xucmV0dXJuIG59ZnVuY3Rpb24gayhuLHQpe2Zvcih2YXIgcixlPS0xLHU9bi5sZW5ndGg7KytlPHU7KXt2YXIgaT10KG5bZV0pO2khPT1GJiYocj1yPT09Rj9pOnIraSl9cmV0dXJuIHJ9ZnVuY3Rpb24gRShuLHQpe2Zvcih2YXIgcj0tMSxlPUFycmF5KG4pOysrcjxuOyllW3JdPXQocik7cmV0dXJuIGV9ZnVuY3Rpb24gTyhuLHQpe3JldHVybiBsKHQsZnVuY3Rpb24odCl7cmV0dXJuW3Qsblt0XV19KX1mdW5jdGlvbiBTKG4pe3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gbih0KX19ZnVuY3Rpb24gSShuLHQpe3JldHVybiBsKHQsZnVuY3Rpb24odCl7cmV0dXJuIG5bdF19KX1mdW5jdGlvbiBSKG4sdCl7cmV0dXJuIG4uaGFzKHQpfWZ1bmN0aW9uIHoobix0KXtmb3IodmFyIHI9LTEsZT1uLmxlbmd0aDsrK3I8ZSYmLTE8ZCh0LG5bcl0sMCk7KTtyZXR1cm4gcn1mdW5jdGlvbiBXKG4sdCl7Zm9yKHZhciByPW4ubGVuZ3RoO3ItLSYmLTE8ZCh0LG5bcl0sMCk7KTtyZXR1cm4gcn1mdW5jdGlvbiBCKG4pe1xucmV0dXJuXCJcXFxcXCIrVG5bbl19ZnVuY3Rpb24gTChuKXt2YXIgdD0tMSxyPUFycmF5KG4uc2l6ZSk7cmV0dXJuIG4uZm9yRWFjaChmdW5jdGlvbihuLGUpe3JbKyt0XT1bZSxuXX0pLHJ9ZnVuY3Rpb24gVShuLHQpe3JldHVybiBmdW5jdGlvbihyKXtyZXR1cm4gbih0KHIpKX19ZnVuY3Rpb24gQyhuLHQpe2Zvcih2YXIgcj0tMSxlPW4ubGVuZ3RoLHU9MCxpPVtdOysrcjxlOyl7dmFyIG89bltyXTtvIT09dCYmXCJfX2xvZGFzaF9wbGFjZWhvbGRlcl9fXCIhPT1vfHwobltyXT1cIl9fbG9kYXNoX3BsYWNlaG9sZGVyX19cIixpW3UrK109cil9cmV0dXJuIGl9ZnVuY3Rpb24gRChuKXt2YXIgdD0tMSxyPUFycmF5KG4uc2l6ZSk7cmV0dXJuIG4uZm9yRWFjaChmdW5jdGlvbihuKXtyWysrdF09bn0pLHJ9ZnVuY3Rpb24gTShuKXt2YXIgdD0tMSxyPUFycmF5KG4uc2l6ZSk7cmV0dXJuIG4uZm9yRWFjaChmdW5jdGlvbihuKXtyWysrdF09W24sbl19KSxyfWZ1bmN0aW9uIFQobil7aWYoQm4udGVzdChuKSl7XG5mb3IodmFyIHQ9em4ubGFzdEluZGV4PTA7em4udGVzdChuKTspKyt0O249dH1lbHNlIG49dHQobik7cmV0dXJuIG59ZnVuY3Rpb24gJChuKXtyZXR1cm4gQm4udGVzdChuKT9uLm1hdGNoKHpuKXx8W106bi5zcGxpdChcIlwiKX12YXIgRixOPTEvMCxQPU5hTixaPVtbXCJhcnlcIiwxMjhdLFtcImJpbmRcIiwxXSxbXCJiaW5kS2V5XCIsMl0sW1wiY3VycnlcIiw4XSxbXCJjdXJyeVJpZ2h0XCIsMTZdLFtcImZsaXBcIiw1MTJdLFtcInBhcnRpYWxcIiwzMl0sW1wicGFydGlhbFJpZ2h0XCIsNjRdLFtcInJlYXJnXCIsMjU2XV0scT0vXFxiX19wXFwrPScnOy9nLFY9L1xcYihfX3BcXCs9KScnXFwrL2csSz0vKF9fZVxcKC4qP1xcKXxcXGJfX3RcXCkpXFwrJyc7L2csRz0vJig/OmFtcHxsdHxndHxxdW90fCMzOSk7L2csSD0vWyY8PlwiJ10vZyxKPVJlZ0V4cChHLnNvdXJjZSksWT1SZWdFeHAoSC5zb3VyY2UpLFE9LzwlLShbXFxzXFxTXSs/KSU+L2csWD0vPCUoW1xcc1xcU10rPyklPi9nLG5uPS88JT0oW1xcc1xcU10rPyklPi9nLHRuPS9cXC58XFxbKD86W15bXFxdXSp8KFtcIiddKSg/Oig/IVxcMSlbXlxcXFxdfFxcXFwuKSo/XFwxKVxcXS8scm49L15cXHcqJC8sZW49L15cXC4vLHVuPS9bXi5bXFxdXSt8XFxbKD86KC0/XFxkKyg/OlxcLlxcZCspPyl8KFtcIiddKSgoPzooPyFcXDIpW15cXFxcXXxcXFxcLikqPylcXDIpXFxdfCg/PSg/OlxcLnxcXFtcXF0pKD86XFwufFxcW1xcXXwkKSkvZyxvbj0vW1xcXFxeJC4qKz8oKVtcXF17fXxdL2csZm49UmVnRXhwKG9uLnNvdXJjZSksY249L15cXHMrfFxccyskL2csYW49L15cXHMrLyxsbj0vXFxzKyQvLHNuPS9cXHsoPzpcXG5cXC9cXCogXFxbd3JhcHBlZCB3aXRoIC4rXFxdIFxcKlxcLyk/XFxuPy8saG49L1xce1xcblxcL1xcKiBcXFt3cmFwcGVkIHdpdGggKC4rKVxcXSBcXCovLHBuPS8sPyAmIC8sX249L1teXFx4MDAtXFx4MmZcXHgzYS1cXHg0MFxceDViLVxceDYwXFx4N2ItXFx4N2ZdKy9nLHZuPS9cXFxcKFxcXFwpPy9nLGduPS9cXCRcXHsoW15cXFxcfV0qKD86XFxcXC5bXlxcXFx9XSopKilcXH0vZyxkbj0vXFx3KiQvLHluPS9eWy0rXTB4WzAtOWEtZl0rJC9pLGJuPS9eMGJbMDFdKyQvaSx4bj0vXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvLGpuPS9eMG9bMC03XSskL2ksd249L14oPzowfFsxLTldXFxkKikkLyxtbj0vW1xceGMwLVxceGQ2XFx4ZDgtXFx4ZjZcXHhmOC1cXHhmZlxcdTAxMDAtXFx1MDE3Zl0vZyxBbj0vKCReKS8sa249L1snXFxuXFxyXFx1MjAyOFxcdTIwMjlcXFxcXS9nLEVuPVwiW1xcXFx1ZmUwZVxcXFx1ZmUwZl0/KD86W1xcXFx1MDMwMC1cXFxcdTAzNmZcXFxcdWZlMjAtXFxcXHVmZTJmXFxcXHUyMGQwLVxcXFx1MjBmZl18XFxcXHVkODNjW1xcXFx1ZGZmYi1cXFxcdWRmZmZdKT8oPzpcXFxcdTIwMGQoPzpbXlxcXFx1ZDgwMC1cXFxcdWRmZmZdfCg/OlxcXFx1ZDgzY1tcXFxcdWRkZTYtXFxcXHVkZGZmXSl7Mn18W1xcXFx1ZDgwMC1cXFxcdWRiZmZdW1xcXFx1ZGMwMC1cXFxcdWRmZmZdKVtcXFxcdWZlMGVcXFxcdWZlMGZdPyg/OltcXFxcdTAzMDAtXFxcXHUwMzZmXFxcXHVmZTIwLVxcXFx1ZmUyZlxcXFx1MjBkMC1cXFxcdTIwZmZdfFxcXFx1ZDgzY1tcXFxcdWRmZmItXFxcXHVkZmZmXSk/KSpcIixPbj1cIig/OltcXFxcdTI3MDAtXFxcXHUyN2JmXXwoPzpcXFxcdWQ4M2NbXFxcXHVkZGU2LVxcXFx1ZGRmZl0pezJ9fFtcXFxcdWQ4MDAtXFxcXHVkYmZmXVtcXFxcdWRjMDAtXFxcXHVkZmZmXSlcIitFbixTbj1cIig/OlteXFxcXHVkODAwLVxcXFx1ZGZmZl1bXFxcXHUwMzAwLVxcXFx1MDM2ZlxcXFx1ZmUyMC1cXFxcdWZlMmZcXFxcdTIwZDAtXFxcXHUyMGZmXT98W1xcXFx1MDMwMC1cXFxcdTAzNmZcXFxcdWZlMjAtXFxcXHVmZTJmXFxcXHUyMGQwLVxcXFx1MjBmZl18KD86XFxcXHVkODNjW1xcXFx1ZGRlNi1cXFxcdWRkZmZdKXsyfXxbXFxcXHVkODAwLVxcXFx1ZGJmZl1bXFxcXHVkYzAwLVxcXFx1ZGZmZl18W1xcXFx1ZDgwMC1cXFxcdWRmZmZdKVwiLEluPVJlZ0V4cChcIlsnXFx1MjAxOV1cIixcImdcIiksUm49UmVnRXhwKFwiW1xcXFx1MDMwMC1cXFxcdTAzNmZcXFxcdWZlMjAtXFxcXHVmZTJmXFxcXHUyMGQwLVxcXFx1MjBmZl1cIixcImdcIiksem49UmVnRXhwKFwiXFxcXHVkODNjW1xcXFx1ZGZmYi1cXFxcdWRmZmZdKD89XFxcXHVkODNjW1xcXFx1ZGZmYi1cXFxcdWRmZmZdKXxcIitTbitFbixcImdcIiksV249UmVnRXhwKFtcIltBLVpcXFxceGMwLVxcXFx4ZDZcXFxceGQ4LVxcXFx4ZGVdP1thLXpcXFxceGRmLVxcXFx4ZjZcXFxceGY4LVxcXFx4ZmZdKyg/OlsnXFx1MjAxOV0oPzpkfGxsfG18cmV8c3x0fHZlKSk/KD89W1xcXFx4YWNcXFxceGIxXFxcXHhkN1xcXFx4ZjdcXFxceDAwLVxcXFx4MmZcXFxceDNhLVxcXFx4NDBcXFxceDViLVxcXFx4NjBcXFxceDdiLVxcXFx4YmZcXFxcdTIwMDAtXFxcXHUyMDZmIFxcXFx0XFxcXHgwYlxcXFxmXFxcXHhhMFxcXFx1ZmVmZlxcXFxuXFxcXHJcXFxcdTIwMjhcXFxcdTIwMjlcXFxcdTE2ODBcXFxcdTE4MGVcXFxcdTIwMDBcXFxcdTIwMDFcXFxcdTIwMDJcXFxcdTIwMDNcXFxcdTIwMDRcXFxcdTIwMDVcXFxcdTIwMDZcXFxcdTIwMDdcXFxcdTIwMDhcXFxcdTIwMDlcXFxcdTIwMGFcXFxcdTIwMmZcXFxcdTIwNWZcXFxcdTMwMDBdfFtBLVpcXFxceGMwLVxcXFx4ZDZcXFxceGQ4LVxcXFx4ZGVdfCQpfCg/OltBLVpcXFxceGMwLVxcXFx4ZDZcXFxceGQ4LVxcXFx4ZGVdfFteXFxcXHVkODAwLVxcXFx1ZGZmZlxcXFx4YWNcXFxceGIxXFxcXHhkN1xcXFx4ZjdcXFxceDAwLVxcXFx4MmZcXFxceDNhLVxcXFx4NDBcXFxceDViLVxcXFx4NjBcXFxceDdiLVxcXFx4YmZcXFxcdTIwMDAtXFxcXHUyMDZmIFxcXFx0XFxcXHgwYlxcXFxmXFxcXHhhMFxcXFx1ZmVmZlxcXFxuXFxcXHJcXFxcdTIwMjhcXFxcdTIwMjlcXFxcdTE2ODBcXFxcdTE4MGVcXFxcdTIwMDBcXFxcdTIwMDFcXFxcdTIwMDJcXFxcdTIwMDNcXFxcdTIwMDRcXFxcdTIwMDVcXFxcdTIwMDZcXFxcdTIwMDdcXFxcdTIwMDhcXFxcdTIwMDlcXFxcdTIwMGFcXFxcdTIwMmZcXFxcdTIwNWZcXFxcdTMwMDBcXFxcZCtcXFxcdTI3MDAtXFxcXHUyN2JmYS16XFxcXHhkZi1cXFxceGY2XFxcXHhmOC1cXFxceGZmQS1aXFxcXHhjMC1cXFxceGQ2XFxcXHhkOC1cXFxceGRlXSkrKD86WydcXHUyMDE5XSg/OkR8TEx8TXxSRXxTfFR8VkUpKT8oPz1bXFxcXHhhY1xcXFx4YjFcXFxceGQ3XFxcXHhmN1xcXFx4MDAtXFxcXHgyZlxcXFx4M2EtXFxcXHg0MFxcXFx4NWItXFxcXHg2MFxcXFx4N2ItXFxcXHhiZlxcXFx1MjAwMC1cXFxcdTIwNmYgXFxcXHRcXFxceDBiXFxcXGZcXFxceGEwXFxcXHVmZWZmXFxcXG5cXFxcclxcXFx1MjAyOFxcXFx1MjAyOVxcXFx1MTY4MFxcXFx1MTgwZVxcXFx1MjAwMFxcXFx1MjAwMVxcXFx1MjAwMlxcXFx1MjAwM1xcXFx1MjAwNFxcXFx1MjAwNVxcXFx1MjAwNlxcXFx1MjAwN1xcXFx1MjAwOFxcXFx1MjAwOVxcXFx1MjAwYVxcXFx1MjAyZlxcXFx1MjA1ZlxcXFx1MzAwMF18W0EtWlxcXFx4YzAtXFxcXHhkNlxcXFx4ZDgtXFxcXHhkZV0oPzpbYS16XFxcXHhkZi1cXFxceGY2XFxcXHhmOC1cXFxceGZmXXxbXlxcXFx1ZDgwMC1cXFxcdWRmZmZcXFxceGFjXFxcXHhiMVxcXFx4ZDdcXFxceGY3XFxcXHgwMC1cXFxceDJmXFxcXHgzYS1cXFxceDQwXFxcXHg1Yi1cXFxceDYwXFxcXHg3Yi1cXFxceGJmXFxcXHUyMDAwLVxcXFx1MjA2ZiBcXFxcdFxcXFx4MGJcXFxcZlxcXFx4YTBcXFxcdWZlZmZcXFxcblxcXFxyXFxcXHUyMDI4XFxcXHUyMDI5XFxcXHUxNjgwXFxcXHUxODBlXFxcXHUyMDAwXFxcXHUyMDAxXFxcXHUyMDAyXFxcXHUyMDAzXFxcXHUyMDA0XFxcXHUyMDA1XFxcXHUyMDA2XFxcXHUyMDA3XFxcXHUyMDA4XFxcXHUyMDA5XFxcXHUyMDBhXFxcXHUyMDJmXFxcXHUyMDVmXFxcXHUzMDAwXFxcXGQrXFxcXHUyNzAwLVxcXFx1MjdiZmEtelxcXFx4ZGYtXFxcXHhmNlxcXFx4ZjgtXFxcXHhmZkEtWlxcXFx4YzAtXFxcXHhkNlxcXFx4ZDgtXFxcXHhkZV0pfCQpfFtBLVpcXFxceGMwLVxcXFx4ZDZcXFxceGQ4LVxcXFx4ZGVdPyg/OlthLXpcXFxceGRmLVxcXFx4ZjZcXFxceGY4LVxcXFx4ZmZdfFteXFxcXHVkODAwLVxcXFx1ZGZmZlxcXFx4YWNcXFxceGIxXFxcXHhkN1xcXFx4ZjdcXFxceDAwLVxcXFx4MmZcXFxceDNhLVxcXFx4NDBcXFxceDViLVxcXFx4NjBcXFxceDdiLVxcXFx4YmZcXFxcdTIwMDAtXFxcXHUyMDZmIFxcXFx0XFxcXHgwYlxcXFxmXFxcXHhhMFxcXFx1ZmVmZlxcXFxuXFxcXHJcXFxcdTIwMjhcXFxcdTIwMjlcXFxcdTE2ODBcXFxcdTE4MGVcXFxcdTIwMDBcXFxcdTIwMDFcXFxcdTIwMDJcXFxcdTIwMDNcXFxcdTIwMDRcXFxcdTIwMDVcXFxcdTIwMDZcXFxcdTIwMDdcXFxcdTIwMDhcXFxcdTIwMDlcXFxcdTIwMGFcXFxcdTIwMmZcXFxcdTIwNWZcXFxcdTMwMDBcXFxcZCtcXFxcdTI3MDAtXFxcXHUyN2JmYS16XFxcXHhkZi1cXFxceGY2XFxcXHhmOC1cXFxceGZmQS1aXFxcXHhjMC1cXFxceGQ2XFxcXHhkOC1cXFxceGRlXSkrKD86WydcXHUyMDE5XSg/OmR8bGx8bXxyZXxzfHR8dmUpKT98W0EtWlxcXFx4YzAtXFxcXHhkNlxcXFx4ZDgtXFxcXHhkZV0rKD86WydcXHUyMDE5XSg/OkR8TEx8TXxSRXxTfFR8VkUpKT98XFxcXGQqKD86KD86MVNUfDJORHwzUkR8KD8hWzEyM10pXFxcXGRUSClcXFxcYil8XFxcXGQqKD86KD86MXN0fDJuZHwzcmR8KD8hWzEyM10pXFxcXGR0aClcXFxcYil8XFxcXGQrXCIsT25dLmpvaW4oXCJ8XCIpLFwiZ1wiKSxCbj1SZWdFeHAoXCJbXFxcXHUyMDBkXFxcXHVkODAwLVxcXFx1ZGZmZlxcXFx1MDMwMC1cXFxcdTAzNmZcXFxcdWZlMjAtXFxcXHVmZTJmXFxcXHUyMGQwLVxcXFx1MjBmZlxcXFx1ZmUwZVxcXFx1ZmUwZl1cIiksTG49L1thLXpdW0EtWl18W0EtWl17Mix9W2Etel18WzAtOV1bYS16QS1aXXxbYS16QS1aXVswLTldfFteYS16QS1aMC05IF0vLFVuPVwiQXJyYXkgQnVmZmVyIERhdGFWaWV3IERhdGUgRXJyb3IgRmxvYXQzMkFycmF5IEZsb2F0NjRBcnJheSBGdW5jdGlvbiBJbnQ4QXJyYXkgSW50MTZBcnJheSBJbnQzMkFycmF5IE1hcCBNYXRoIE9iamVjdCBQcm9taXNlIFJlZ0V4cCBTZXQgU3RyaW5nIFN5bWJvbCBUeXBlRXJyb3IgVWludDhBcnJheSBVaW50OENsYW1wZWRBcnJheSBVaW50MTZBcnJheSBVaW50MzJBcnJheSBXZWFrTWFwIF8gY2xlYXJUaW1lb3V0IGlzRmluaXRlIHBhcnNlSW50IHNldFRpbWVvdXRcIi5zcGxpdChcIiBcIiksQ249e307XG5DbltcIltvYmplY3QgRmxvYXQzMkFycmF5XVwiXT1DbltcIltvYmplY3QgRmxvYXQ2NEFycmF5XVwiXT1DbltcIltvYmplY3QgSW50OEFycmF5XVwiXT1DbltcIltvYmplY3QgSW50MTZBcnJheV1cIl09Q25bXCJbb2JqZWN0IEludDMyQXJyYXldXCJdPUNuW1wiW29iamVjdCBVaW50OEFycmF5XVwiXT1DbltcIltvYmplY3QgVWludDhDbGFtcGVkQXJyYXldXCJdPUNuW1wiW29iamVjdCBVaW50MTZBcnJheV1cIl09Q25bXCJbb2JqZWN0IFVpbnQzMkFycmF5XVwiXT10cnVlLENuW1wiW29iamVjdCBBcmd1bWVudHNdXCJdPUNuW1wiW29iamVjdCBBcnJheV1cIl09Q25bXCJbb2JqZWN0IEFycmF5QnVmZmVyXVwiXT1DbltcIltvYmplY3QgQm9vbGVhbl1cIl09Q25bXCJbb2JqZWN0IERhdGFWaWV3XVwiXT1DbltcIltvYmplY3QgRGF0ZV1cIl09Q25bXCJbb2JqZWN0IEVycm9yXVwiXT1DbltcIltvYmplY3QgRnVuY3Rpb25dXCJdPUNuW1wiW29iamVjdCBNYXBdXCJdPUNuW1wiW29iamVjdCBOdW1iZXJdXCJdPUNuW1wiW29iamVjdCBPYmplY3RdXCJdPUNuW1wiW29iamVjdCBSZWdFeHBdXCJdPUNuW1wiW29iamVjdCBTZXRdXCJdPUNuW1wiW29iamVjdCBTdHJpbmddXCJdPUNuW1wiW29iamVjdCBXZWFrTWFwXVwiXT1mYWxzZTtcbnZhciBEbj17fTtEbltcIltvYmplY3QgQXJndW1lbnRzXVwiXT1EbltcIltvYmplY3QgQXJyYXldXCJdPURuW1wiW29iamVjdCBBcnJheUJ1ZmZlcl1cIl09RG5bXCJbb2JqZWN0IERhdGFWaWV3XVwiXT1EbltcIltvYmplY3QgQm9vbGVhbl1cIl09RG5bXCJbb2JqZWN0IERhdGVdXCJdPURuW1wiW29iamVjdCBGbG9hdDMyQXJyYXldXCJdPURuW1wiW29iamVjdCBGbG9hdDY0QXJyYXldXCJdPURuW1wiW29iamVjdCBJbnQ4QXJyYXldXCJdPURuW1wiW29iamVjdCBJbnQxNkFycmF5XVwiXT1EbltcIltvYmplY3QgSW50MzJBcnJheV1cIl09RG5bXCJbb2JqZWN0IE1hcF1cIl09RG5bXCJbb2JqZWN0IE51bWJlcl1cIl09RG5bXCJbb2JqZWN0IE9iamVjdF1cIl09RG5bXCJbb2JqZWN0IFJlZ0V4cF1cIl09RG5bXCJbb2JqZWN0IFNldF1cIl09RG5bXCJbb2JqZWN0IFN0cmluZ11cIl09RG5bXCJbb2JqZWN0IFN5bWJvbF1cIl09RG5bXCJbb2JqZWN0IFVpbnQ4QXJyYXldXCJdPURuW1wiW29iamVjdCBVaW50OENsYW1wZWRBcnJheV1cIl09RG5bXCJbb2JqZWN0IFVpbnQxNkFycmF5XVwiXT1EbltcIltvYmplY3QgVWludDMyQXJyYXldXCJdPXRydWUsXG5EbltcIltvYmplY3QgRXJyb3JdXCJdPURuW1wiW29iamVjdCBGdW5jdGlvbl1cIl09RG5bXCJbb2JqZWN0IFdlYWtNYXBdXCJdPWZhbHNlO3ZhciBNbixUbj17XCJcXFxcXCI6XCJcXFxcXCIsXCInXCI6XCInXCIsXCJcXG5cIjpcIm5cIixcIlxcclwiOlwiclwiLFwiXFx1MjAyOFwiOlwidTIwMjhcIixcIlxcdTIwMjlcIjpcInUyMDI5XCJ9LCRuPXBhcnNlRmxvYXQsRm49cGFyc2VJbnQsTm49dHlwZW9mIGdsb2JhbD09XCJvYmplY3RcIiYmZ2xvYmFsJiZnbG9iYWwuT2JqZWN0PT09T2JqZWN0JiZnbG9iYWwsUG49dHlwZW9mIHNlbGY9PVwib2JqZWN0XCImJnNlbGYmJnNlbGYuT2JqZWN0PT09T2JqZWN0JiZzZWxmLFpuPU5ufHxQbnx8RnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpLHFuPXR5cGVvZiBleHBvcnRzPT1cIm9iamVjdFwiJiZleHBvcnRzJiYhZXhwb3J0cy5ub2RlVHlwZSYmZXhwb3J0cyxWbj1xbiYmdHlwZW9mIG1vZHVsZT09XCJvYmplY3RcIiYmbW9kdWxlJiYhbW9kdWxlLm5vZGVUeXBlJiZtb2R1bGUsS249Vm4mJlZuLmV4cG9ydHM9PT1xbixHbj1LbiYmTm4ucHJvY2Vzcztcbm46e3RyeXtNbj1HbiYmR24uYmluZGluZyYmR24uYmluZGluZyhcInV0aWxcIik7YnJlYWsgbn1jYXRjaChuKXt9TW49dm9pZCAwfXZhciBIbj1NbiYmTW4uaXNBcnJheUJ1ZmZlcixKbj1NbiYmTW4uaXNEYXRlLFluPU1uJiZNbi5pc01hcCxRbj1NbiYmTW4uaXNSZWdFeHAsWG49TW4mJk1uLmlzU2V0LG50PU1uJiZNbi5pc1R5cGVkQXJyYXksdHQ9aihcImxlbmd0aFwiKSxydD13KHtcIlxceGMwXCI6XCJBXCIsXCJcXHhjMVwiOlwiQVwiLFwiXFx4YzJcIjpcIkFcIixcIlxceGMzXCI6XCJBXCIsXCJcXHhjNFwiOlwiQVwiLFwiXFx4YzVcIjpcIkFcIixcIlxceGUwXCI6XCJhXCIsXCJcXHhlMVwiOlwiYVwiLFwiXFx4ZTJcIjpcImFcIixcIlxceGUzXCI6XCJhXCIsXCJcXHhlNFwiOlwiYVwiLFwiXFx4ZTVcIjpcImFcIixcIlxceGM3XCI6XCJDXCIsXCJcXHhlN1wiOlwiY1wiLFwiXFx4ZDBcIjpcIkRcIixcIlxceGYwXCI6XCJkXCIsXCJcXHhjOFwiOlwiRVwiLFwiXFx4YzlcIjpcIkVcIixcIlxceGNhXCI6XCJFXCIsXCJcXHhjYlwiOlwiRVwiLFwiXFx4ZThcIjpcImVcIixcIlxceGU5XCI6XCJlXCIsXCJcXHhlYVwiOlwiZVwiLFwiXFx4ZWJcIjpcImVcIixcIlxceGNjXCI6XCJJXCIsXCJcXHhjZFwiOlwiSVwiLFwiXFx4Y2VcIjpcIklcIixcblwiXFx4Y2ZcIjpcIklcIixcIlxceGVjXCI6XCJpXCIsXCJcXHhlZFwiOlwiaVwiLFwiXFx4ZWVcIjpcImlcIixcIlxceGVmXCI6XCJpXCIsXCJcXHhkMVwiOlwiTlwiLFwiXFx4ZjFcIjpcIm5cIixcIlxceGQyXCI6XCJPXCIsXCJcXHhkM1wiOlwiT1wiLFwiXFx4ZDRcIjpcIk9cIixcIlxceGQ1XCI6XCJPXCIsXCJcXHhkNlwiOlwiT1wiLFwiXFx4ZDhcIjpcIk9cIixcIlxceGYyXCI6XCJvXCIsXCJcXHhmM1wiOlwib1wiLFwiXFx4ZjRcIjpcIm9cIixcIlxceGY1XCI6XCJvXCIsXCJcXHhmNlwiOlwib1wiLFwiXFx4ZjhcIjpcIm9cIixcIlxceGQ5XCI6XCJVXCIsXCJcXHhkYVwiOlwiVVwiLFwiXFx4ZGJcIjpcIlVcIixcIlxceGRjXCI6XCJVXCIsXCJcXHhmOVwiOlwidVwiLFwiXFx4ZmFcIjpcInVcIixcIlxceGZiXCI6XCJ1XCIsXCJcXHhmY1wiOlwidVwiLFwiXFx4ZGRcIjpcIllcIixcIlxceGZkXCI6XCJ5XCIsXCJcXHhmZlwiOlwieVwiLFwiXFx4YzZcIjpcIkFlXCIsXCJcXHhlNlwiOlwiYWVcIixcIlxceGRlXCI6XCJUaFwiLFwiXFx4ZmVcIjpcInRoXCIsXCJcXHhkZlwiOlwic3NcIixcIlxcdTAxMDBcIjpcIkFcIixcIlxcdTAxMDJcIjpcIkFcIixcIlxcdTAxMDRcIjpcIkFcIixcIlxcdTAxMDFcIjpcImFcIixcIlxcdTAxMDNcIjpcImFcIixcIlxcdTAxMDVcIjpcImFcIixcIlxcdTAxMDZcIjpcIkNcIixcIlxcdTAxMDhcIjpcIkNcIixcIlxcdTAxMGFcIjpcIkNcIixcblwiXFx1MDEwY1wiOlwiQ1wiLFwiXFx1MDEwN1wiOlwiY1wiLFwiXFx1MDEwOVwiOlwiY1wiLFwiXFx1MDEwYlwiOlwiY1wiLFwiXFx1MDEwZFwiOlwiY1wiLFwiXFx1MDEwZVwiOlwiRFwiLFwiXFx1MDExMFwiOlwiRFwiLFwiXFx1MDEwZlwiOlwiZFwiLFwiXFx1MDExMVwiOlwiZFwiLFwiXFx1MDExMlwiOlwiRVwiLFwiXFx1MDExNFwiOlwiRVwiLFwiXFx1MDExNlwiOlwiRVwiLFwiXFx1MDExOFwiOlwiRVwiLFwiXFx1MDExYVwiOlwiRVwiLFwiXFx1MDExM1wiOlwiZVwiLFwiXFx1MDExNVwiOlwiZVwiLFwiXFx1MDExN1wiOlwiZVwiLFwiXFx1MDExOVwiOlwiZVwiLFwiXFx1MDExYlwiOlwiZVwiLFwiXFx1MDExY1wiOlwiR1wiLFwiXFx1MDExZVwiOlwiR1wiLFwiXFx1MDEyMFwiOlwiR1wiLFwiXFx1MDEyMlwiOlwiR1wiLFwiXFx1MDExZFwiOlwiZ1wiLFwiXFx1MDExZlwiOlwiZ1wiLFwiXFx1MDEyMVwiOlwiZ1wiLFwiXFx1MDEyM1wiOlwiZ1wiLFwiXFx1MDEyNFwiOlwiSFwiLFwiXFx1MDEyNlwiOlwiSFwiLFwiXFx1MDEyNVwiOlwiaFwiLFwiXFx1MDEyN1wiOlwiaFwiLFwiXFx1MDEyOFwiOlwiSVwiLFwiXFx1MDEyYVwiOlwiSVwiLFwiXFx1MDEyY1wiOlwiSVwiLFwiXFx1MDEyZVwiOlwiSVwiLFwiXFx1MDEzMFwiOlwiSVwiLFwiXFx1MDEyOVwiOlwiaVwiLFwiXFx1MDEyYlwiOlwiaVwiLFwiXFx1MDEyZFwiOlwiaVwiLFxuXCJcXHUwMTJmXCI6XCJpXCIsXCJcXHUwMTMxXCI6XCJpXCIsXCJcXHUwMTM0XCI6XCJKXCIsXCJcXHUwMTM1XCI6XCJqXCIsXCJcXHUwMTM2XCI6XCJLXCIsXCJcXHUwMTM3XCI6XCJrXCIsXCJcXHUwMTM4XCI6XCJrXCIsXCJcXHUwMTM5XCI6XCJMXCIsXCJcXHUwMTNiXCI6XCJMXCIsXCJcXHUwMTNkXCI6XCJMXCIsXCJcXHUwMTNmXCI6XCJMXCIsXCJcXHUwMTQxXCI6XCJMXCIsXCJcXHUwMTNhXCI6XCJsXCIsXCJcXHUwMTNjXCI6XCJsXCIsXCJcXHUwMTNlXCI6XCJsXCIsXCJcXHUwMTQwXCI6XCJsXCIsXCJcXHUwMTQyXCI6XCJsXCIsXCJcXHUwMTQzXCI6XCJOXCIsXCJcXHUwMTQ1XCI6XCJOXCIsXCJcXHUwMTQ3XCI6XCJOXCIsXCJcXHUwMTRhXCI6XCJOXCIsXCJcXHUwMTQ0XCI6XCJuXCIsXCJcXHUwMTQ2XCI6XCJuXCIsXCJcXHUwMTQ4XCI6XCJuXCIsXCJcXHUwMTRiXCI6XCJuXCIsXCJcXHUwMTRjXCI6XCJPXCIsXCJcXHUwMTRlXCI6XCJPXCIsXCJcXHUwMTUwXCI6XCJPXCIsXCJcXHUwMTRkXCI6XCJvXCIsXCJcXHUwMTRmXCI6XCJvXCIsXCJcXHUwMTUxXCI6XCJvXCIsXCJcXHUwMTU0XCI6XCJSXCIsXCJcXHUwMTU2XCI6XCJSXCIsXCJcXHUwMTU4XCI6XCJSXCIsXCJcXHUwMTU1XCI6XCJyXCIsXCJcXHUwMTU3XCI6XCJyXCIsXCJcXHUwMTU5XCI6XCJyXCIsXCJcXHUwMTVhXCI6XCJTXCIsXCJcXHUwMTVjXCI6XCJTXCIsXG5cIlxcdTAxNWVcIjpcIlNcIixcIlxcdTAxNjBcIjpcIlNcIixcIlxcdTAxNWJcIjpcInNcIixcIlxcdTAxNWRcIjpcInNcIixcIlxcdTAxNWZcIjpcInNcIixcIlxcdTAxNjFcIjpcInNcIixcIlxcdTAxNjJcIjpcIlRcIixcIlxcdTAxNjRcIjpcIlRcIixcIlxcdTAxNjZcIjpcIlRcIixcIlxcdTAxNjNcIjpcInRcIixcIlxcdTAxNjVcIjpcInRcIixcIlxcdTAxNjdcIjpcInRcIixcIlxcdTAxNjhcIjpcIlVcIixcIlxcdTAxNmFcIjpcIlVcIixcIlxcdTAxNmNcIjpcIlVcIixcIlxcdTAxNmVcIjpcIlVcIixcIlxcdTAxNzBcIjpcIlVcIixcIlxcdTAxNzJcIjpcIlVcIixcIlxcdTAxNjlcIjpcInVcIixcIlxcdTAxNmJcIjpcInVcIixcIlxcdTAxNmRcIjpcInVcIixcIlxcdTAxNmZcIjpcInVcIixcIlxcdTAxNzFcIjpcInVcIixcIlxcdTAxNzNcIjpcInVcIixcIlxcdTAxNzRcIjpcIldcIixcIlxcdTAxNzVcIjpcIndcIixcIlxcdTAxNzZcIjpcIllcIixcIlxcdTAxNzdcIjpcInlcIixcIlxcdTAxNzhcIjpcIllcIixcIlxcdTAxNzlcIjpcIlpcIixcIlxcdTAxN2JcIjpcIlpcIixcIlxcdTAxN2RcIjpcIlpcIixcIlxcdTAxN2FcIjpcInpcIixcIlxcdTAxN2NcIjpcInpcIixcIlxcdTAxN2VcIjpcInpcIixcIlxcdTAxMzJcIjpcIklKXCIsXCJcXHUwMTMzXCI6XCJpalwiLFwiXFx1MDE1MlwiOlwiT2VcIixcIlxcdTAxNTNcIjpcIm9lXCIsXG5cIlxcdTAxNDlcIjpcIiduXCIsXCJcXHUwMTdmXCI6XCJzXCJ9KSxldD13KHtcIiZcIjpcIiZhbXA7XCIsXCI8XCI6XCImbHQ7XCIsXCI+XCI6XCImZ3Q7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJ1wiOlwiJiMzOTtcIn0pLHV0PXcoe1wiJmFtcDtcIjpcIiZcIixcIiZsdDtcIjpcIjxcIixcIiZndDtcIjpcIj5cIixcIiZxdW90O1wiOidcIicsXCImIzM5O1wiOlwiJ1wifSksaXQ9ZnVuY3Rpb24gdyhFbil7ZnVuY3Rpb24gT24obil7aWYoeHUobikmJiFhZihuKSYmIShuIGluc3RhbmNlb2YgTW4pKXtpZihuIGluc3RhbmNlb2Ygem4pcmV0dXJuIG47aWYoY2kuY2FsbChuLFwiX193cmFwcGVkX19cIikpcmV0dXJuIFBlKG4pfXJldHVybiBuZXcgem4obil9ZnVuY3Rpb24gU24oKXt9ZnVuY3Rpb24gem4obix0KXt0aGlzLl9fd3JhcHBlZF9fPW4sdGhpcy5fX2FjdGlvbnNfXz1bXSx0aGlzLl9fY2hhaW5fXz0hIXQsdGhpcy5fX2luZGV4X189MCx0aGlzLl9fdmFsdWVzX189Rn1mdW5jdGlvbiBNbihuKXt0aGlzLl9fd3JhcHBlZF9fPW4sdGhpcy5fX2FjdGlvbnNfXz1bXSx0aGlzLl9fZGlyX189MSxcbnRoaXMuX19maWx0ZXJlZF9fPWZhbHNlLHRoaXMuX19pdGVyYXRlZXNfXz1bXSx0aGlzLl9fdGFrZUNvdW50X189NDI5NDk2NzI5NSx0aGlzLl9fdmlld3NfXz1bXX1mdW5jdGlvbiBUbihuKXt2YXIgdD0tMSxyPW51bGw9PW4/MDpuLmxlbmd0aDtmb3IodGhpcy5jbGVhcigpOysrdDxyOyl7dmFyIGU9blt0XTt0aGlzLnNldChlWzBdLGVbMV0pfX1mdW5jdGlvbiBObihuKXt2YXIgdD0tMSxyPW51bGw9PW4/MDpuLmxlbmd0aDtmb3IodGhpcy5jbGVhcigpOysrdDxyOyl7dmFyIGU9blt0XTt0aGlzLnNldChlWzBdLGVbMV0pfX1mdW5jdGlvbiBQbihuKXt2YXIgdD0tMSxyPW51bGw9PW4/MDpuLmxlbmd0aDtmb3IodGhpcy5jbGVhcigpOysrdDxyOyl7dmFyIGU9blt0XTt0aGlzLnNldChlWzBdLGVbMV0pfX1mdW5jdGlvbiBxbihuKXt2YXIgdD0tMSxyPW51bGw9PW4/MDpuLmxlbmd0aDtmb3IodGhpcy5fX2RhdGFfXz1uZXcgUG47Kyt0PHI7KXRoaXMuYWRkKG5bdF0pfWZ1bmN0aW9uIFZuKG4pe1xudGhpcy5zaXplPSh0aGlzLl9fZGF0YV9fPW5ldyBObihuKSkuc2l6ZX1mdW5jdGlvbiBHbihuLHQpe3ZhciByLGU9YWYobiksdT0hZSYmY2YobiksaT0hZSYmIXUmJnNmKG4pLG89IWUmJiF1JiYhaSYmZ2YobiksdT0oZT1lfHx1fHxpfHxvKT9FKG4ubGVuZ3RoLHJpKTpbXSxmPXUubGVuZ3RoO2ZvcihyIGluIG4pIXQmJiFjaS5jYWxsKG4scil8fGUmJihcImxlbmd0aFwiPT1yfHxpJiYoXCJvZmZzZXRcIj09cnx8XCJwYXJlbnRcIj09cil8fG8mJihcImJ1ZmZlclwiPT1yfHxcImJ5dGVMZW5ndGhcIj09cnx8XCJieXRlT2Zmc2V0XCI9PXIpfHxSZShyLGYpKXx8dS5wdXNoKHIpO3JldHVybiB1fWZ1bmN0aW9uIHR0KG4pe3ZhciB0PW4ubGVuZ3RoO3JldHVybiB0P25bY3IoMCx0LTEpXTpGfWZ1bmN0aW9uIG90KG4sdCl7cmV0dXJuIFRlKE1yKG4pLGd0KHQsMCxuLmxlbmd0aCkpfWZ1bmN0aW9uIGZ0KG4pe3JldHVybiBUZShNcihuKSl9ZnVuY3Rpb24gY3Qobix0LHIpeyhyPT09Rnx8aHUoblt0XSxyKSkmJihyIT09Rnx8dCBpbiBuKXx8X3Qobix0LHIpO1xufWZ1bmN0aW9uIGF0KG4sdCxyKXt2YXIgZT1uW3RdO2NpLmNhbGwobix0KSYmaHUoZSxyKSYmKHIhPT1GfHx0IGluIG4pfHxfdChuLHQscil9ZnVuY3Rpb24gbHQobix0KXtmb3IodmFyIHI9bi5sZW5ndGg7ci0tOylpZihodShuW3JdWzBdLHQpKXJldHVybiByO3JldHVybi0xfWZ1bmN0aW9uIHN0KG4sdCxyLGUpe3JldHVybiBvbyhuLGZ1bmN0aW9uKG4sdSxpKXt0KGUsbixyKG4pLGkpfSksZX1mdW5jdGlvbiBodChuLHQpe3JldHVybiBuJiZUcih0LEx1KHQpLG4pfWZ1bmN0aW9uIHB0KG4sdCl7cmV0dXJuIG4mJlRyKHQsVXUodCksbil9ZnVuY3Rpb24gX3Qobix0LHIpe1wiX19wcm90b19fXCI9PXQmJkVpP0VpKG4sdCx7Y29uZmlndXJhYmxlOnRydWUsZW51bWVyYWJsZTp0cnVlLHZhbHVlOnIsd3JpdGFibGU6dHJ1ZX0pOm5bdF09cn1mdW5jdGlvbiB2dChuLHQpe2Zvcih2YXIgcj0tMSxlPXQubGVuZ3RoLHU9SHUoZSksaT1udWxsPT1uOysrcjxlOyl1W3JdPWk/RjpXdShuLHRbcl0pO3JldHVybiB1O1xufWZ1bmN0aW9uIGd0KG4sdCxyKXtyZXR1cm4gbj09PW4mJihyIT09RiYmKG49bjw9cj9uOnIpLHQhPT1GJiYobj1uPj10P246dCkpLG59ZnVuY3Rpb24gZHQobix0LHIsZSxpLG8pe3ZhciBmLGM9MSZ0LGE9MiZ0LGw9NCZ0O2lmKHImJihmPWk/cihuLGUsaSxvKTpyKG4pKSxmIT09RilyZXR1cm4gZjtpZighYnUobikpcmV0dXJuIG47aWYoZT1hZihuKSl7aWYoZj1FZShuKSwhYylyZXR1cm4gTXIobixmKX1lbHNle3ZhciBzPXlvKG4pLGg9XCJbb2JqZWN0IEZ1bmN0aW9uXVwiPT1zfHxcIltvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dXCI9PXM7aWYoc2YobikpcmV0dXJuIFdyKG4sYyk7aWYoXCJbb2JqZWN0IE9iamVjdF1cIj09c3x8XCJbb2JqZWN0IEFyZ3VtZW50c11cIj09c3x8aCYmIWkpe2lmKGY9YXx8aD97fTpPZShuKSwhYylyZXR1cm4gYT9GcihuLHB0KGYsbikpOiRyKG4saHQoZixuKSl9ZWxzZXtpZighRG5bc10pcmV0dXJuIGk/bjp7fTtmPVNlKG4scyxkdCxjKX19aWYob3x8KG89bmV3IFZuKSxcbmk9by5nZXQobikpcmV0dXJuIGk7by5zZXQobixmKTt2YXIgYT1sP2E/eWU6ZGU6YT9VdTpMdSxwPWU/RjphKG4pO3JldHVybiB1KHB8fG4sZnVuY3Rpb24oZSx1KXtwJiYodT1lLGU9blt1XSksYXQoZix1LGR0KGUsdCxyLHUsbixvKSl9KSxmfWZ1bmN0aW9uIHl0KG4pe3ZhciB0PUx1KG4pO3JldHVybiBmdW5jdGlvbihyKXtyZXR1cm4gYnQocixuLHQpfX1mdW5jdGlvbiBidChuLHQscil7dmFyIGU9ci5sZW5ndGg7aWYobnVsbD09bilyZXR1cm4hZTtmb3Iobj1uaShuKTtlLS07KXt2YXIgdT1yW2VdLGk9dFt1XSxvPW5bdV07aWYobz09PUYmJiEodSBpbiBuKXx8IWkobykpcmV0dXJuIGZhbHNlfXJldHVybiB0cnVlfWZ1bmN0aW9uIHh0KG4sdCxyKXtpZih0eXBlb2YgbiE9XCJmdW5jdGlvblwiKXRocm93IG5ldyBlaShcIkV4cGVjdGVkIGEgZnVuY3Rpb25cIik7cmV0dXJuIGpvKGZ1bmN0aW9uKCl7bi5hcHBseShGLHIpfSx0KX1mdW5jdGlvbiBqdChuLHQscixlKXt2YXIgdT0tMSxpPWMsbz10cnVlLGY9bi5sZW5ndGgscz1bXSxoPXQubGVuZ3RoO1xuaWYoIWYpcmV0dXJuIHM7ciYmKHQ9bCh0LFMocikpKSxlPyhpPWEsbz1mYWxzZSk6MjAwPD10Lmxlbmd0aCYmKGk9UixvPWZhbHNlLHQ9bmV3IHFuKHQpKTtuOmZvcig7Kyt1PGY7KXt2YXIgcD1uW3VdLF89bnVsbD09cj9wOnIocCkscD1lfHwwIT09cD9wOjA7aWYobyYmXz09PV8pe2Zvcih2YXIgdj1oO3YtLTspaWYodFt2XT09PV8pY29udGludWUgbjtzLnB1c2gocCl9ZWxzZSBpKHQsXyxlKXx8cy5wdXNoKHApfXJldHVybiBzfWZ1bmN0aW9uIHd0KG4sdCl7dmFyIHI9dHJ1ZTtyZXR1cm4gb28obixmdW5jdGlvbihuLGUsdSl7cmV0dXJuIHI9ISF0KG4sZSx1KX0pLHJ9ZnVuY3Rpb24gbXQobix0LHIpe2Zvcih2YXIgZT0tMSx1PW4ubGVuZ3RoOysrZTx1Oyl7dmFyIGk9bltlXSxvPXQoaSk7aWYobnVsbCE9byYmKGY9PT1GP289PT1vJiYhQXUobyk6cihvLGYpKSl2YXIgZj1vLGM9aX1yZXR1cm4gY31mdW5jdGlvbiBBdChuLHQpe3ZhciByPVtdO3JldHVybiBvbyhuLGZ1bmN0aW9uKG4sZSx1KXtcbnQobixlLHUpJiZyLnB1c2gobil9KSxyfWZ1bmN0aW9uIGt0KG4sdCxyLGUsdSl7dmFyIGk9LTEsbz1uLmxlbmd0aDtmb3Iocnx8KHI9SWUpLHV8fCh1PVtdKTsrK2k8bzspe3ZhciBmPW5baV07MDx0JiZyKGYpPzE8dD9rdChmLHQtMSxyLGUsdSk6cyh1LGYpOmV8fCh1W3UubGVuZ3RoXT1mKX1yZXR1cm4gdX1mdW5jdGlvbiBFdChuLHQpe3JldHVybiBuJiZjbyhuLHQsTHUpfWZ1bmN0aW9uIE90KG4sdCl7cmV0dXJuIG4mJmFvKG4sdCxMdSl9ZnVuY3Rpb24gU3Qobix0KXtyZXR1cm4gZih0LGZ1bmN0aW9uKHQpe3JldHVybiBndShuW3RdKX0pfWZ1bmN0aW9uIEl0KG4sdCl7dD1Scih0LG4pO2Zvcih2YXIgcj0wLGU9dC5sZW5ndGg7bnVsbCE9biYmcjxlOyluPW5bJGUodFtyKytdKV07cmV0dXJuIHImJnI9PWU/bjpGfWZ1bmN0aW9uIFJ0KG4sdCxyKXtyZXR1cm4gdD10KG4pLGFmKG4pP3Q6cyh0LHIobikpfWZ1bmN0aW9uIHp0KG4pe2lmKG51bGw9PW4pbj1uPT09Rj9cIltvYmplY3QgVW5kZWZpbmVkXVwiOlwiW29iamVjdCBOdWxsXVwiO2Vsc2UgaWYoa2kmJmtpIGluIG5pKG4pKXtcbnZhciB0PWNpLmNhbGwobixraSkscj1uW2tpXTt0cnl7bltraV09Rjt2YXIgZT10cnVlfWNhdGNoKG4pe312YXIgdT1zaS5jYWxsKG4pO2UmJih0P25ba2ldPXI6ZGVsZXRlIG5ba2ldKSxuPXV9ZWxzZSBuPXNpLmNhbGwobik7cmV0dXJuIG59ZnVuY3Rpb24gV3Qobix0KXtyZXR1cm4gbj50fWZ1bmN0aW9uIEJ0KG4sdCl7cmV0dXJuIG51bGwhPW4mJmNpLmNhbGwobix0KX1mdW5jdGlvbiBMdChuLHQpe3JldHVybiBudWxsIT1uJiZ0IGluIG5pKG4pfWZ1bmN0aW9uIFV0KG4sdCxyKXtmb3IodmFyIGU9cj9hOmMsdT1uWzBdLmxlbmd0aCxpPW4ubGVuZ3RoLG89aSxmPUh1KGkpLHM9MS8wLGg9W107by0tOyl7dmFyIHA9bltvXTtvJiZ0JiYocD1sKHAsUyh0KSkpLHM9TWkocC5sZW5ndGgscyksZltvXT0hciYmKHR8fDEyMDw9dSYmMTIwPD1wLmxlbmd0aCk/bmV3IHFuKG8mJnApOkZ9dmFyIHA9blswXSxfPS0xLHY9ZlswXTtuOmZvcig7KytfPHUmJmgubGVuZ3RoPHM7KXt2YXIgZz1wW19dLGQ9dD90KGcpOmcsZz1yfHwwIT09Zz9nOjA7XG5pZih2PyFSKHYsZCk6IWUoaCxkLHIpKXtmb3Iobz1pOy0tbzspe3ZhciB5PWZbb107aWYoeT8hUih5LGQpOiFlKG5bb10sZCxyKSljb250aW51ZSBufXYmJnYucHVzaChkKSxoLnB1c2goZyl9fXJldHVybiBofWZ1bmN0aW9uIEN0KG4sdCxyKXt2YXIgZT17fTtyZXR1cm4gRXQobixmdW5jdGlvbihuLHUsaSl7dChlLHIobiksdSxpKX0pLGV9ZnVuY3Rpb24gRHQobix0LGUpe3JldHVybiB0PVJyKHQsbiksbj0yPnQubGVuZ3RoP246SXQobix2cih0LDAsLTEpKSx0PW51bGw9PW4/bjpuWyRlKEdlKHQpKV0sbnVsbD09dD9GOnIodCxuLGUpfWZ1bmN0aW9uIE10KG4pe3JldHVybiB4dShuKSYmXCJbb2JqZWN0IEFyZ3VtZW50c11cIj09enQobil9ZnVuY3Rpb24gVHQobil7cmV0dXJuIHh1KG4pJiZcIltvYmplY3QgQXJyYXlCdWZmZXJdXCI9PXp0KG4pfWZ1bmN0aW9uICR0KG4pe3JldHVybiB4dShuKSYmXCJbb2JqZWN0IERhdGVdXCI9PXp0KG4pfWZ1bmN0aW9uIEZ0KG4sdCxyLGUsdSl7aWYobj09PXQpdD10cnVlO2Vsc2UgaWYobnVsbD09bnx8bnVsbD09dHx8IXh1KG4pJiYheHUodCkpdD1uIT09biYmdCE9PXQ7ZWxzZSBuOntcbnZhciBpPWFmKG4pLG89YWYodCksZj1pP1wiW29iamVjdCBBcnJheV1cIjp5byhuKSxjPW8/XCJbb2JqZWN0IEFycmF5XVwiOnlvKHQpLGY9XCJbb2JqZWN0IEFyZ3VtZW50c11cIj09Zj9cIltvYmplY3QgT2JqZWN0XVwiOmYsYz1cIltvYmplY3QgQXJndW1lbnRzXVwiPT1jP1wiW29iamVjdCBPYmplY3RdXCI6YyxhPVwiW29iamVjdCBPYmplY3RdXCI9PWYsbz1cIltvYmplY3QgT2JqZWN0XVwiPT1jO2lmKChjPWY9PWMpJiZzZihuKSl7aWYoIXNmKHQpKXt0PWZhbHNlO2JyZWFrIG59aT10cnVlLGE9ZmFsc2V9aWYoYyYmIWEpdXx8KHU9bmV3IFZuKSx0PWl8fGdmKG4pP19lKG4sdCxyLGUsRnQsdSk6dmUobix0LGYscixlLEZ0LHUpO2Vsc2V7aWYoISgxJnIpJiYoaT1hJiZjaS5jYWxsKG4sXCJfX3dyYXBwZWRfX1wiKSxmPW8mJmNpLmNhbGwodCxcIl9fd3JhcHBlZF9fXCIpLGl8fGYpKXtuPWk/bi52YWx1ZSgpOm4sdD1mP3QudmFsdWUoKTp0LHV8fCh1PW5ldyBWbiksdD1GdChuLHQscixlLHUpO2JyZWFrIG59aWYoYyl0OmlmKHV8fCh1PW5ldyBWbiksXG5pPTEmcixmPWRlKG4pLG89Zi5sZW5ndGgsYz1kZSh0KS5sZW5ndGgsbz09Y3x8aSl7Zm9yKGE9bzthLS07KXt2YXIgbD1mW2FdO2lmKCEoaT9sIGluIHQ6Y2kuY2FsbCh0LGwpKSl7dD1mYWxzZTticmVhayB0fX1pZigoYz11LmdldChuKSkmJnUuZ2V0KHQpKXQ9Yz09dDtlbHNle2M9dHJ1ZSx1LnNldChuLHQpLHUuc2V0KHQsbik7Zm9yKHZhciBzPWk7KythPG87KXt2YXIgbD1mW2FdLGg9bltsXSxwPXRbbF07aWYoZSl2YXIgXz1pP2UocCxoLGwsdCxuLHUpOmUoaCxwLGwsbix0LHUpO2lmKF89PT1GP2ghPT1wJiYhRnQoaCxwLHIsZSx1KTohXyl7Yz1mYWxzZTticmVha31zfHwocz1cImNvbnN0cnVjdG9yXCI9PWwpfWMmJiFzJiYocj1uLmNvbnN0cnVjdG9yLGU9dC5jb25zdHJ1Y3RvcixyIT1lJiZcImNvbnN0cnVjdG9yXCJpbiBuJiZcImNvbnN0cnVjdG9yXCJpbiB0JiYhKHR5cGVvZiByPT1cImZ1bmN0aW9uXCImJnIgaW5zdGFuY2VvZiByJiZ0eXBlb2YgZT09XCJmdW5jdGlvblwiJiZlIGluc3RhbmNlb2YgZSkmJihjPWZhbHNlKSksXG51LmRlbGV0ZShuKSx1LmRlbGV0ZSh0KSx0PWN9fWVsc2UgdD1mYWxzZTtlbHNlIHQ9ZmFsc2V9fXJldHVybiB0fWZ1bmN0aW9uIE50KG4pe3JldHVybiB4dShuKSYmXCJbb2JqZWN0IE1hcF1cIj09eW8obil9ZnVuY3Rpb24gUHQobix0LHIsZSl7dmFyIHU9ci5sZW5ndGgsaT11LG89IWU7aWYobnVsbD09bilyZXR1cm4haTtmb3Iobj1uaShuKTt1LS07KXt2YXIgZj1yW3VdO2lmKG8mJmZbMl0/ZlsxXSE9PW5bZlswXV06IShmWzBdaW4gbikpcmV0dXJuIGZhbHNlfWZvcig7Kyt1PGk7KXt2YXIgZj1yW3VdLGM9ZlswXSxhPW5bY10sbD1mWzFdO2lmKG8mJmZbMl0pe2lmKGE9PT1GJiYhKGMgaW4gbikpcmV0dXJuIGZhbHNlfWVsc2V7aWYoZj1uZXcgVm4sZSl2YXIgcz1lKGEsbCxjLG4sdCxmKTtpZihzPT09Rj8hRnQobCxhLDMsZSxmKTohcylyZXR1cm4gZmFsc2V9fXJldHVybiB0cnVlfWZ1bmN0aW9uIFp0KG4pe3JldHVybiEoIWJ1KG4pfHxsaSYmbGkgaW4gbikmJihndShuKT9faTp4bikudGVzdChGZShuKSl9ZnVuY3Rpb24gcXQobil7XG5yZXR1cm4geHUobikmJlwiW29iamVjdCBSZWdFeHBdXCI9PXp0KG4pfWZ1bmN0aW9uIFZ0KG4pe3JldHVybiB4dShuKSYmXCJbb2JqZWN0IFNldF1cIj09eW8obil9ZnVuY3Rpb24gS3Qobil7cmV0dXJuIHh1KG4pJiZ5dShuLmxlbmd0aCkmJiEhQ25benQobildfWZ1bmN0aW9uIEd0KG4pe3JldHVybiB0eXBlb2Ygbj09XCJmdW5jdGlvblwiP246bnVsbD09bj9OdTp0eXBlb2Ygbj09XCJvYmplY3RcIj9hZihuKT9YdChuWzBdLG5bMV0pOlF0KG4pOlZ1KG4pfWZ1bmN0aW9uIEh0KG4pe2lmKCFMZShuKSlyZXR1cm4gQ2kobik7dmFyIHQscj1bXTtmb3IodCBpbiBuaShuKSljaS5jYWxsKG4sdCkmJlwiY29uc3RydWN0b3JcIiE9dCYmci5wdXNoKHQpO3JldHVybiByfWZ1bmN0aW9uIEp0KG4sdCl7cmV0dXJuIG48dH1mdW5jdGlvbiBZdChuLHQpe3ZhciByPS0xLGU9cHUobik/SHUobi5sZW5ndGgpOltdO3JldHVybiBvbyhuLGZ1bmN0aW9uKG4sdSxpKXtlWysrcl09dChuLHUsaSl9KSxlfWZ1bmN0aW9uIFF0KG4pe1xudmFyIHQ9bWUobik7cmV0dXJuIDE9PXQubGVuZ3RoJiZ0WzBdWzJdP1VlKHRbMF1bMF0sdFswXVsxXSk6ZnVuY3Rpb24ocil7cmV0dXJuIHI9PT1ufHxQdChyLG4sdCl9fWZ1bmN0aW9uIFh0KG4sdCl7cmV0dXJuIFdlKG4pJiZ0PT09dCYmIWJ1KHQpP1VlKCRlKG4pLHQpOmZ1bmN0aW9uKHIpe3ZhciBlPVd1KHIsbik7cmV0dXJuIGU9PT1GJiZlPT09dD9CdShyLG4pOkZ0KHQsZSwzKX19ZnVuY3Rpb24gbnIobix0LHIsZSx1KXtuIT09dCYmY28odCxmdW5jdGlvbihpLG8pe2lmKGJ1KGkpKXt1fHwodT1uZXcgVm4pO3ZhciBmPXUsYz1uW29dLGE9dFtvXSxsPWYuZ2V0KGEpO2lmKGwpY3QobixvLGwpO2Vsc2V7dmFyIGw9ZT9lKGMsYSxvK1wiXCIsbix0LGYpOkYscz1sPT09RjtpZihzKXt2YXIgaD1hZihhKSxwPSFoJiZzZihhKSxfPSFoJiYhcCYmZ2YoYSksbD1hO2h8fHB8fF8/YWYoYyk/bD1jOl91KGMpP2w9TXIoYyk6cD8ocz1mYWxzZSxsPVdyKGEsdHJ1ZSkpOl8/KHM9ZmFsc2UsbD1McihhLHRydWUpKTpsPVtdOnd1KGEpfHxjZihhKT8obD1jLFxuY2YoYyk/bD1SdShjKTooIWJ1KGMpfHxyJiZndShjKSkmJihsPU9lKGEpKSk6cz1mYWxzZX1zJiYoZi5zZXQoYSxsKSxucihsLGEscixlLGYpLGYuZGVsZXRlKGEpKSxjdChuLG8sbCl9fWVsc2UgZj1lP2UobltvXSxpLG8rXCJcIixuLHQsdSk6RixmPT09RiYmKGY9aSksY3QobixvLGYpfSxVdSl9ZnVuY3Rpb24gdHIobix0KXt2YXIgcj1uLmxlbmd0aDtpZihyKXJldHVybiB0Kz0wPnQ/cjowLFJlKHQscik/blt0XTpGfWZ1bmN0aW9uIHJyKG4sdCxyKXt2YXIgZT0tMTtyZXR1cm4gdD1sKHQubGVuZ3RoP3Q6W051XSxTKGplKCkpKSxuPVl0KG4sZnVuY3Rpb24obil7cmV0dXJue2E6bCh0LGZ1bmN0aW9uKHQpe3JldHVybiB0KG4pfSksYjorK2UsYzpufX0pLEEobixmdW5jdGlvbihuLHQpe3ZhciBlO246e2U9LTE7Zm9yKHZhciB1PW4uYSxpPXQuYSxvPXUubGVuZ3RoLGY9ci5sZW5ndGg7KytlPG87KXt2YXIgYz1Vcih1W2VdLGlbZV0pO2lmKGMpe2U9ZT49Zj9jOmMqKFwiZGVzY1wiPT1yW2VdPy0xOjEpO1xuYnJlYWsgbn19ZT1uLmItdC5ifXJldHVybiBlfSl9ZnVuY3Rpb24gZXIobix0KXtyZXR1cm4gdXIobix0LGZ1bmN0aW9uKHQscil7cmV0dXJuIEJ1KG4scil9KX1mdW5jdGlvbiB1cihuLHQscil7Zm9yKHZhciBlPS0xLHU9dC5sZW5ndGgsaT17fTsrK2U8dTspe3ZhciBvPXRbZV0sZj1JdChuLG8pO3IoZixvKSYmcHIoaSxScihvLG4pLGYpfXJldHVybiBpfWZ1bmN0aW9uIGlyKG4pe3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gSXQodCxuKX19ZnVuY3Rpb24gb3Iobix0LHIsZSl7dmFyIHU9ZT95OmQsaT0tMSxvPXQubGVuZ3RoLGY9bjtmb3Iobj09PXQmJih0PU1yKHQpKSxyJiYoZj1sKG4sUyhyKSkpOysraTxvOylmb3IodmFyIGM9MCxhPXRbaV0sYT1yP3IoYSk6YTstMTwoYz11KGYsYSxjLGUpKTspZiE9PW4mJndpLmNhbGwoZixjLDEpLHdpLmNhbGwobixjLDEpO3JldHVybiBufWZ1bmN0aW9uIGZyKG4sdCl7Zm9yKHZhciByPW4/dC5sZW5ndGg6MCxlPXItMTtyLS07KXt2YXIgdT10W3JdO1xuaWYocj09ZXx8dSE9PWkpe3ZhciBpPXU7UmUodSk/d2kuY2FsbChuLHUsMSk6bXIobix1KX19fWZ1bmN0aW9uIGNyKG4sdCl7cmV0dXJuIG4remkoRmkoKSoodC1uKzEpKX1mdW5jdGlvbiBhcihuLHQpe3ZhciByPVwiXCI7aWYoIW58fDE+dHx8OTAwNzE5OTI1NDc0MDk5MTx0KXJldHVybiByO2RvIHQlMiYmKHIrPW4pLCh0PXppKHQvMikpJiYobis9bik7d2hpbGUodCk7cmV0dXJuIHJ9ZnVuY3Rpb24gbHIobix0KXtyZXR1cm4gd28oQ2Uobix0LE51KSxuK1wiXCIpfWZ1bmN0aW9uIHNyKG4pe3JldHVybiB0dChEdShuKSl9ZnVuY3Rpb24gaHIobix0KXt2YXIgcj1EdShuKTtyZXR1cm4gVGUocixndCh0LDAsci5sZW5ndGgpKX1mdW5jdGlvbiBwcihuLHQscixlKXtpZighYnUobikpcmV0dXJuIG47dD1Scih0LG4pO2Zvcih2YXIgdT0tMSxpPXQubGVuZ3RoLG89aS0xLGY9bjtudWxsIT1mJiYrK3U8aTspe3ZhciBjPSRlKHRbdV0pLGE9cjtpZih1IT1vKXt2YXIgbD1mW2NdLGE9ZT9lKGwsYyxmKTpGO1xuYT09PUYmJihhPWJ1KGwpP2w6UmUodFt1KzFdKT9bXTp7fSl9YXQoZixjLGEpLGY9ZltjXX1yZXR1cm4gbn1mdW5jdGlvbiBfcihuKXtyZXR1cm4gVGUoRHUobikpfWZ1bmN0aW9uIHZyKG4sdCxyKXt2YXIgZT0tMSx1PW4ubGVuZ3RoO2ZvcigwPnQmJih0PS10PnU/MDp1K3QpLHI9cj51P3U6ciwwPnImJihyKz11KSx1PXQ+cj8wOnItdD4+PjAsdD4+Pj0wLHI9SHUodSk7KytlPHU7KXJbZV09bltlK3RdO3JldHVybiByfWZ1bmN0aW9uIGdyKG4sdCl7dmFyIHI7cmV0dXJuIG9vKG4sZnVuY3Rpb24obixlLHUpe3JldHVybiByPXQobixlLHUpLCFyfSksISFyfWZ1bmN0aW9uIGRyKG4sdCxyKXt2YXIgZT0wLHU9bnVsbD09bj9lOm4ubGVuZ3RoO2lmKHR5cGVvZiB0PT1cIm51bWJlclwiJiZ0PT09dCYmMjE0NzQ4MzY0Nz49dSl7Zm9yKDtlPHU7KXt2YXIgaT1lK3U+Pj4xLG89bltpXTtudWxsIT09byYmIUF1KG8pJiYocj9vPD10Om88dCk/ZT1pKzE6dT1pfXJldHVybiB1fXJldHVybiB5cihuLHQsTnUscik7XG59ZnVuY3Rpb24geXIobix0LHIsZSl7dD1yKHQpO2Zvcih2YXIgdT0wLGk9bnVsbD09bj8wOm4ubGVuZ3RoLG89dCE9PXQsZj1udWxsPT09dCxjPUF1KHQpLGE9dD09PUY7dTxpOyl7dmFyIGw9emkoKHUraSkvMikscz1yKG5bbF0pLGg9cyE9PUYscD1udWxsPT09cyxfPXM9PT1zLHY9QXUocyk7KG8/ZXx8XzphP18mJihlfHxoKTpmP18mJmgmJihlfHwhcCk6Yz9fJiZoJiYhcCYmKGV8fCF2KTpwfHx2PzA6ZT9zPD10OnM8dCk/dT1sKzE6aT1sfXJldHVybiBNaShpLDQyOTQ5NjcyOTQpfWZ1bmN0aW9uIGJyKG4sdCl7Zm9yKHZhciByPS0xLGU9bi5sZW5ndGgsdT0wLGk9W107KytyPGU7KXt2YXIgbz1uW3JdLGY9dD90KG8pOm87aWYoIXJ8fCFodShmLGMpKXt2YXIgYz1mO2lbdSsrXT0wPT09bz8wOm99fXJldHVybiBpfWZ1bmN0aW9uIHhyKG4pe3JldHVybiB0eXBlb2Ygbj09XCJudW1iZXJcIj9uOkF1KG4pP1A6K259ZnVuY3Rpb24ganIobil7aWYodHlwZW9mIG49PVwic3RyaW5nXCIpcmV0dXJuIG47XG5pZihhZihuKSlyZXR1cm4gbChuLGpyKStcIlwiO2lmKEF1KG4pKXJldHVybiB1bz91by5jYWxsKG4pOlwiXCI7dmFyIHQ9bitcIlwiO3JldHVyblwiMFwiPT10JiYxL249PS1OP1wiLTBcIjp0fWZ1bmN0aW9uIHdyKG4sdCxyKXt2YXIgZT0tMSx1PWMsaT1uLmxlbmd0aCxvPXRydWUsZj1bXSxsPWY7aWYocilvPWZhbHNlLHU9YTtlbHNlIGlmKDIwMDw9aSl7aWYodT10P251bGw6cG8obikpcmV0dXJuIEQodSk7bz1mYWxzZSx1PVIsbD1uZXcgcW59ZWxzZSBsPXQ/W106ZjtuOmZvcig7KytlPGk7KXt2YXIgcz1uW2VdLGg9dD90KHMpOnMscz1yfHwwIT09cz9zOjA7aWYobyYmaD09PWgpe2Zvcih2YXIgcD1sLmxlbmd0aDtwLS07KWlmKGxbcF09PT1oKWNvbnRpbnVlIG47dCYmbC5wdXNoKGgpLGYucHVzaChzKX1lbHNlIHUobCxoLHIpfHwobCE9PWYmJmwucHVzaChoKSxmLnB1c2gocykpfXJldHVybiBmfWZ1bmN0aW9uIG1yKG4sdCl7cmV0dXJuIHQ9UnIodCxuKSxuPTI+dC5sZW5ndGg/bjpJdChuLHZyKHQsMCwtMSkpLFxubnVsbD09bnx8ZGVsZXRlIG5bJGUoR2UodCkpXX1mdW5jdGlvbiBBcihuLHQscixlKXtmb3IodmFyIHU9bi5sZW5ndGgsaT1lP3U6LTE7KGU/aS0tOisraTx1KSYmdChuW2ldLGksbik7KTtyZXR1cm4gcj92cihuLGU/MDppLGU/aSsxOnUpOnZyKG4sZT9pKzE6MCxlP3U6aSl9ZnVuY3Rpb24ga3Iobix0KXt2YXIgcj1uO3JldHVybiByIGluc3RhbmNlb2YgTW4mJihyPXIudmFsdWUoKSksaCh0LGZ1bmN0aW9uKG4sdCl7cmV0dXJuIHQuZnVuYy5hcHBseSh0LnRoaXNBcmcscyhbbl0sdC5hcmdzKSl9LHIpfWZ1bmN0aW9uIEVyKG4sdCxyKXt2YXIgZT1uLmxlbmd0aDtpZigyPmUpcmV0dXJuIGU/d3IoblswXSk6W107Zm9yKHZhciB1PS0xLGk9SHUoZSk7Kyt1PGU7KWZvcih2YXIgbz1uW3VdLGY9LTE7KytmPGU7KWYhPXUmJihpW3VdPWp0KGlbdV18fG8sbltmXSx0LHIpKTtyZXR1cm4gd3Ioa3QoaSwxKSx0LHIpfWZ1bmN0aW9uIE9yKG4sdCxyKXtmb3IodmFyIGU9LTEsdT1uLmxlbmd0aCxpPXQubGVuZ3RoLG89e307KytlPHU7KXIobyxuW2VdLGU8aT90W2VdOkYpO1xucmV0dXJuIG99ZnVuY3Rpb24gU3Iobil7cmV0dXJuIF91KG4pP246W119ZnVuY3Rpb24gSXIobil7cmV0dXJuIHR5cGVvZiBuPT1cImZ1bmN0aW9uXCI/bjpOdX1mdW5jdGlvbiBScihuLHQpe3JldHVybiBhZihuKT9uOldlKG4sdCk/W25dOm1vKHp1KG4pKX1mdW5jdGlvbiB6cihuLHQscil7dmFyIGU9bi5sZW5ndGg7cmV0dXJuIHI9cj09PUY/ZTpyLCF0JiZyPj1lP246dnIobix0LHIpfWZ1bmN0aW9uIFdyKG4sdCl7aWYodClyZXR1cm4gbi5zbGljZSgpO3ZhciByPW4ubGVuZ3RoLHI9eWk/eWkocik6bmV3IG4uY29uc3RydWN0b3Iocik7cmV0dXJuIG4uY29weShyKSxyfWZ1bmN0aW9uIEJyKG4pe3ZhciB0PW5ldyBuLmNvbnN0cnVjdG9yKG4uYnl0ZUxlbmd0aCk7cmV0dXJuIG5ldyBkaSh0KS5zZXQobmV3IGRpKG4pKSx0fWZ1bmN0aW9uIExyKG4sdCl7cmV0dXJuIG5ldyBuLmNvbnN0cnVjdG9yKHQ/QnIobi5idWZmZXIpOm4uYnVmZmVyLG4uYnl0ZU9mZnNldCxuLmxlbmd0aCl9ZnVuY3Rpb24gVXIobix0KXtcbmlmKG4hPT10KXt2YXIgcj1uIT09RixlPW51bGw9PT1uLHU9bj09PW4saT1BdShuKSxvPXQhPT1GLGY9bnVsbD09PXQsYz10PT09dCxhPUF1KHQpO2lmKCFmJiYhYSYmIWkmJm4+dHx8aSYmbyYmYyYmIWYmJiFhfHxlJiZvJiZjfHwhciYmY3x8IXUpcmV0dXJuIDE7aWYoIWUmJiFpJiYhYSYmbjx0fHxhJiZyJiZ1JiYhZSYmIWl8fGYmJnImJnV8fCFvJiZ1fHwhYylyZXR1cm4tMX1yZXR1cm4gMH1mdW5jdGlvbiBDcihuLHQscixlKXt2YXIgdT0tMSxpPW4ubGVuZ3RoLG89ci5sZW5ndGgsZj0tMSxjPXQubGVuZ3RoLGE9RGkoaS1vLDApLGw9SHUoYythKTtmb3IoZT0hZTsrK2Y8YzspbFtmXT10W2ZdO2Zvcig7Kyt1PG87KShlfHx1PGkpJiYobFtyW3VdXT1uW3VdKTtmb3IoO2EtLTspbFtmKytdPW5bdSsrXTtyZXR1cm4gbH1mdW5jdGlvbiBEcihuLHQscixlKXt2YXIgdT0tMSxpPW4ubGVuZ3RoLG89LTEsZj1yLmxlbmd0aCxjPS0xLGE9dC5sZW5ndGgsbD1EaShpLWYsMCkscz1IdShsK2EpO1xuZm9yKGU9IWU7Kyt1PGw7KXNbdV09blt1XTtmb3IobD11OysrYzxhOylzW2wrY109dFtjXTtmb3IoOysrbzxmOykoZXx8dTxpKSYmKHNbbCtyW29dXT1uW3UrK10pO3JldHVybiBzfWZ1bmN0aW9uIE1yKG4sdCl7dmFyIHI9LTEsZT1uLmxlbmd0aDtmb3IodHx8KHQ9SHUoZSkpOysrcjxlOyl0W3JdPW5bcl07cmV0dXJuIHR9ZnVuY3Rpb24gVHIobix0LHIsZSl7dmFyIHU9IXI7cnx8KHI9e30pO2Zvcih2YXIgaT0tMSxvPXQubGVuZ3RoOysraTxvOyl7dmFyIGY9dFtpXSxjPWU/ZShyW2ZdLG5bZl0sZixyLG4pOkY7Yz09PUYmJihjPW5bZl0pLHU/X3QocixmLGMpOmF0KHIsZixjKX1yZXR1cm4gcn1mdW5jdGlvbiAkcihuLHQpe3JldHVybiBUcihuLHZvKG4pLHQpfWZ1bmN0aW9uIEZyKG4sdCl7cmV0dXJuIFRyKG4sZ28obiksdCl9ZnVuY3Rpb24gTnIobix0KXtyZXR1cm4gZnVuY3Rpb24ocix1KXt2YXIgaT1hZihyKT9lOnN0LG89dD90KCk6e307cmV0dXJuIGkocixuLGplKHUsMiksbyk7XG59fWZ1bmN0aW9uIFByKG4pe3JldHVybiBscihmdW5jdGlvbih0LHIpe3ZhciBlPS0xLHU9ci5sZW5ndGgsaT0xPHU/clt1LTFdOkYsbz0yPHU/clsyXTpGLGk9MzxuLmxlbmd0aCYmdHlwZW9mIGk9PVwiZnVuY3Rpb25cIj8odS0tLGkpOkY7Zm9yKG8mJnplKHJbMF0sclsxXSxvKSYmKGk9Mz51P0Y6aSx1PTEpLHQ9bmkodCk7KytlPHU7KShvPXJbZV0pJiZuKHQsbyxlLGkpO3JldHVybiB0fSl9ZnVuY3Rpb24gWnIobix0KXtyZXR1cm4gZnVuY3Rpb24ocixlKXtpZihudWxsPT1yKXJldHVybiByO2lmKCFwdShyKSlyZXR1cm4gbihyLGUpO2Zvcih2YXIgdT1yLmxlbmd0aCxpPXQ/dTotMSxvPW5pKHIpOyh0P2ktLTorK2k8dSkmJmZhbHNlIT09ZShvW2ldLGksbyk7KTtyZXR1cm4gcn19ZnVuY3Rpb24gcXIobil7cmV0dXJuIGZ1bmN0aW9uKHQscixlKXt2YXIgdT0tMSxpPW5pKHQpO2U9ZSh0KTtmb3IodmFyIG89ZS5sZW5ndGg7by0tOyl7dmFyIGY9ZVtuP286Kyt1XTtpZihmYWxzZT09PXIoaVtmXSxmLGkpKWJyZWFrO1xufXJldHVybiB0fX1mdW5jdGlvbiBWcihuLHQscil7ZnVuY3Rpb24gZSgpe3JldHVybih0aGlzJiZ0aGlzIT09Wm4mJnRoaXMgaW5zdGFuY2VvZiBlP2k6bikuYXBwbHkodT9yOnRoaXMsYXJndW1lbnRzKX12YXIgdT0xJnQsaT1IcihuKTtyZXR1cm4gZX1mdW5jdGlvbiBLcihuKXtyZXR1cm4gZnVuY3Rpb24odCl7dD16dSh0KTt2YXIgcj1Cbi50ZXN0KHQpPyQodCk6RixlPXI/clswXTp0LmNoYXJBdCgwKTtyZXR1cm4gdD1yP3pyKHIsMSkuam9pbihcIlwiKTp0LnNsaWNlKDEpLGVbbl0oKSt0fX1mdW5jdGlvbiBHcihuKXtyZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIGgoJHUoVHUodCkucmVwbGFjZShJbixcIlwiKSksbixcIlwiKX19ZnVuY3Rpb24gSHIobil7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzO3N3aXRjaCh0Lmxlbmd0aCl7Y2FzZSAwOnJldHVybiBuZXcgbjtjYXNlIDE6cmV0dXJuIG5ldyBuKHRbMF0pO2Nhc2UgMjpyZXR1cm4gbmV3IG4odFswXSx0WzFdKTtjYXNlIDM6XG5yZXR1cm4gbmV3IG4odFswXSx0WzFdLHRbMl0pO2Nhc2UgNDpyZXR1cm4gbmV3IG4odFswXSx0WzFdLHRbMl0sdFszXSk7Y2FzZSA1OnJldHVybiBuZXcgbih0WzBdLHRbMV0sdFsyXSx0WzNdLHRbNF0pO2Nhc2UgNjpyZXR1cm4gbmV3IG4odFswXSx0WzFdLHRbMl0sdFszXSx0WzRdLHRbNV0pO2Nhc2UgNzpyZXR1cm4gbmV3IG4odFswXSx0WzFdLHRbMl0sdFszXSx0WzRdLHRbNV0sdFs2XSl9dmFyIHI9aW8obi5wcm90b3R5cGUpLHQ9bi5hcHBseShyLHQpO3JldHVybiBidSh0KT90OnJ9fWZ1bmN0aW9uIEpyKG4sdCxlKXtmdW5jdGlvbiB1KCl7Zm9yKHZhciBvPWFyZ3VtZW50cy5sZW5ndGgsZj1IdShvKSxjPW8sYT14ZSh1KTtjLS07KWZbY109YXJndW1lbnRzW2NdO3JldHVybiBjPTM+byYmZlswXSE9PWEmJmZbby0xXSE9PWE/W106QyhmLGEpLG8tPWMubGVuZ3RoLG88ZT9mZShuLHQsWHIsdS5wbGFjZWhvbGRlcixGLGYsYyxGLEYsZS1vKTpyKHRoaXMmJnRoaXMhPT1abiYmdGhpcyBpbnN0YW5jZW9mIHU/aTpuLHRoaXMsZik7XG59dmFyIGk9SHIobik7cmV0dXJuIHV9ZnVuY3Rpb24gWXIobil7cmV0dXJuIGZ1bmN0aW9uKHQscixlKXt2YXIgdT1uaSh0KTtpZighcHUodCkpe3ZhciBpPWplKHIsMyk7dD1MdSh0KSxyPWZ1bmN0aW9uKG4pe3JldHVybiBpKHVbbl0sbix1KX19cmV0dXJuIHI9bih0LHIsZSksLTE8cj91W2k/dFtyXTpyXTpGfX1mdW5jdGlvbiBRcihuKXtyZXR1cm4gZ2UoZnVuY3Rpb24odCl7dmFyIHI9dC5sZW5ndGgsZT1yLHU9em4ucHJvdG90eXBlLnRocnU7Zm9yKG4mJnQucmV2ZXJzZSgpO2UtLTspe3ZhciBpPXRbZV07aWYodHlwZW9mIGkhPVwiZnVuY3Rpb25cIil0aHJvdyBuZXcgZWkoXCJFeHBlY3RlZCBhIGZ1bmN0aW9uXCIpO2lmKHUmJiFvJiZcIndyYXBwZXJcIj09YmUoaSkpdmFyIG89bmV3IHpuKFtdLHRydWUpfWZvcihlPW8/ZTpyOysrZTxyOyl2YXIgaT10W2VdLHU9YmUoaSksZj1cIndyYXBwZXJcIj09dT9fbyhpKTpGLG89ZiYmQmUoZlswXSkmJjQyND09ZlsxXSYmIWZbNF0ubGVuZ3RoJiYxPT1mWzldP29bYmUoZlswXSldLmFwcGx5KG8sZlszXSk6MT09aS5sZW5ndGgmJkJlKGkpP29bdV0oKTpvLnRocnUoaSk7XG5yZXR1cm4gZnVuY3Rpb24oKXt2YXIgbj1hcmd1bWVudHMsZT1uWzBdO2lmKG8mJjE9PW4ubGVuZ3RoJiZhZihlKSlyZXR1cm4gby5wbGFudChlKS52YWx1ZSgpO2Zvcih2YXIgdT0wLG49cj90W3VdLmFwcGx5KHRoaXMsbik6ZTsrK3U8cjspbj10W3VdLmNhbGwodGhpcyxuKTtyZXR1cm4gbn19KX1mdW5jdGlvbiBYcihuLHQscixlLHUsaSxvLGYsYyxhKXtmdW5jdGlvbiBsKCl7Zm9yKHZhciBkPWFyZ3VtZW50cy5sZW5ndGgseT1IdShkKSxiPWQ7Yi0tOyl5W2JdPWFyZ3VtZW50c1tiXTtpZihfKXt2YXIgeCxqPXhlKGwpLGI9eS5sZW5ndGg7Zm9yKHg9MDtiLS07KXlbYl09PT1qJiYrK3h9aWYoZSYmKHk9Q3IoeSxlLHUsXykpLGkmJih5PURyKHksaSxvLF8pKSxkLT14LF8mJmQ8YSlyZXR1cm4gaj1DKHksaiksZmUobix0LFhyLGwucGxhY2Vob2xkZXIscix5LGosZixjLGEtZCk7aWYoaj1oP3I6dGhpcyxiPXA/altuXTpuLGQ9eS5sZW5ndGgsZil7eD15Lmxlbmd0aDtmb3IodmFyIHc9TWkoZi5sZW5ndGgseCksbT1Ncih5KTt3LS07KXtcbnZhciBBPWZbd107eVt3XT1SZShBLHgpP21bQV06Rn19ZWxzZSB2JiYxPGQmJnkucmV2ZXJzZSgpO3JldHVybiBzJiZjPGQmJih5Lmxlbmd0aD1jKSx0aGlzJiZ0aGlzIT09Wm4mJnRoaXMgaW5zdGFuY2VvZiBsJiYoYj1nfHxIcihiKSksYi5hcHBseShqLHkpfXZhciBzPTEyOCZ0LGg9MSZ0LHA9MiZ0LF89MjQmdCx2PTUxMiZ0LGc9cD9GOkhyKG4pO3JldHVybiBsfWZ1bmN0aW9uIG5lKG4sdCl7cmV0dXJuIGZ1bmN0aW9uKHIsZSl7cmV0dXJuIEN0KHIsbix0KGUpKX19ZnVuY3Rpb24gdGUobix0KXtyZXR1cm4gZnVuY3Rpb24ocixlKXt2YXIgdTtpZihyPT09RiYmZT09PUYpcmV0dXJuIHQ7aWYociE9PUYmJih1PXIpLGUhPT1GKXtpZih1PT09RilyZXR1cm4gZTt0eXBlb2Ygcj09XCJzdHJpbmdcInx8dHlwZW9mIGU9PVwic3RyaW5nXCI/KHI9anIociksZT1qcihlKSk6KHI9eHIociksZT14cihlKSksdT1uKHIsZSl9cmV0dXJuIHV9fWZ1bmN0aW9uIHJlKG4pe3JldHVybiBnZShmdW5jdGlvbih0KXtcbnJldHVybiB0PWwodCxTKGplKCkpKSxscihmdW5jdGlvbihlKXt2YXIgdT10aGlzO3JldHVybiBuKHQsZnVuY3Rpb24obil7cmV0dXJuIHIobix1LGUpfSl9KX0pfWZ1bmN0aW9uIGVlKG4sdCl7dD10PT09Rj9cIiBcIjpqcih0KTt2YXIgcj10Lmxlbmd0aDtyZXR1cm4gMj5yP3I/YXIodCxuKTp0OihyPWFyKHQsUmkobi9UKHQpKSksQm4udGVzdCh0KT96cigkKHIpLDAsbikuam9pbihcIlwiKTpyLnNsaWNlKDAsbikpfWZ1bmN0aW9uIHVlKG4sdCxlLHUpe2Z1bmN0aW9uIGkoKXtmb3IodmFyIHQ9LTEsYz1hcmd1bWVudHMubGVuZ3RoLGE9LTEsbD11Lmxlbmd0aCxzPUh1KGwrYyksaD10aGlzJiZ0aGlzIT09Wm4mJnRoaXMgaW5zdGFuY2VvZiBpP2Y6bjsrK2E8bDspc1thXT11W2FdO2Zvcig7Yy0tOylzW2ErK109YXJndW1lbnRzWysrdF07cmV0dXJuIHIoaCxvP2U6dGhpcyxzKX12YXIgbz0xJnQsZj1IcihuKTtyZXR1cm4gaX1mdW5jdGlvbiBpZShuKXtyZXR1cm4gZnVuY3Rpb24odCxyLGUpe1xuZSYmdHlwZW9mIGUhPVwibnVtYmVyXCImJnplKHQscixlKSYmKHI9ZT1GKSx0PUV1KHQpLHI9PT1GPyhyPXQsdD0wKTpyPUV1KHIpLGU9ZT09PUY/dDxyPzE6LTE6RXUoZSk7dmFyIHU9LTE7cj1EaShSaSgoci10KS8oZXx8MSkpLDApO2Zvcih2YXIgaT1IdShyKTtyLS07KWlbbj9yOisrdV09dCx0Kz1lO3JldHVybiBpfX1mdW5jdGlvbiBvZShuKXtyZXR1cm4gZnVuY3Rpb24odCxyKXtyZXR1cm4gdHlwZW9mIHQ9PVwic3RyaW5nXCImJnR5cGVvZiByPT1cInN0cmluZ1wifHwodD1JdSh0KSxyPUl1KHIpKSxuKHQscil9fWZ1bmN0aW9uIGZlKG4sdCxyLGUsdSxpLG8sZixjLGEpe3ZhciBsPTgmdCxzPWw/bzpGO289bD9GOm87dmFyIGg9bD9pOkY7cmV0dXJuIGk9bD9GOmksdD0odHwobD8zMjo2NCkpJn4obD82NDozMiksNCZ0fHwodCY9LTQpLHU9W24sdCx1LGgscyxpLG8sZixjLGFdLHI9ci5hcHBseShGLHUpLEJlKG4pJiZ4byhyLHUpLHIucGxhY2Vob2xkZXI9ZSxEZShyLG4sdCl9ZnVuY3Rpb24gY2Uobil7XG52YXIgdD1YdVtuXTtyZXR1cm4gZnVuY3Rpb24obixyKXtpZihuPUl1KG4pLHI9bnVsbD09cj8wOk1pKE91KHIpLDI5Mikpe3ZhciBlPSh6dShuKStcImVcIikuc3BsaXQoXCJlXCIpLGU9dChlWzBdK1wiZVwiKygrZVsxXStyKSksZT0oenUoZSkrXCJlXCIpLnNwbGl0KFwiZVwiKTtyZXR1cm4rKGVbMF0rXCJlXCIrKCtlWzFdLXIpKX1yZXR1cm4gdChuKX19ZnVuY3Rpb24gYWUobil7cmV0dXJuIGZ1bmN0aW9uKHQpe3ZhciByPXlvKHQpO3JldHVyblwiW29iamVjdCBNYXBdXCI9PXI/TCh0KTpcIltvYmplY3QgU2V0XVwiPT1yP00odCk6Tyh0LG4odCkpfX1mdW5jdGlvbiBsZShuLHQscixlLHUsaSxvLGYpe3ZhciBjPTImdDtpZighYyYmdHlwZW9mIG4hPVwiZnVuY3Rpb25cIil0aHJvdyBuZXcgZWkoXCJFeHBlY3RlZCBhIGZ1bmN0aW9uXCIpO3ZhciBhPWU/ZS5sZW5ndGg6MDtpZihhfHwodCY9LTk3LGU9dT1GKSxvPW89PT1GP286RGkoT3UobyksMCksZj1mPT09Rj9mOk91KGYpLGEtPXU/dS5sZW5ndGg6MCw2NCZ0KXtcbnZhciBsPWUscz11O2U9dT1GfXZhciBoPWM/RjpfbyhuKTtyZXR1cm4gaT1bbix0LHIsZSx1LGwscyxpLG8sZl0saCYmKHI9aVsxXSxuPWhbMV0sdD1yfG4sZT0xMjg9PW4mJjg9PXJ8fDEyOD09biYmMjU2PT1yJiZpWzddLmxlbmd0aDw9aFs4XXx8Mzg0PT1uJiZoWzddLmxlbmd0aDw9aFs4XSYmOD09ciwxMzE+dHx8ZSkmJigxJm4mJihpWzJdPWhbMl0sdHw9MSZyPzA6NCksKHI9aFszXSkmJihlPWlbM10saVszXT1lP0NyKGUscixoWzRdKTpyLGlbNF09ZT9DKGlbM10sXCJfX2xvZGFzaF9wbGFjZWhvbGRlcl9fXCIpOmhbNF0pLChyPWhbNV0pJiYoZT1pWzVdLGlbNV09ZT9EcihlLHIsaFs2XSk6cixpWzZdPWU/QyhpWzVdLFwiX19sb2Rhc2hfcGxhY2Vob2xkZXJfX1wiKTpoWzZdKSwocj1oWzddKSYmKGlbN109ciksMTI4Jm4mJihpWzhdPW51bGw9PWlbOF0/aFs4XTpNaShpWzhdLGhbOF0pKSxudWxsPT1pWzldJiYoaVs5XT1oWzldKSxpWzBdPWhbMF0saVsxXT10KSxuPWlbMF0sdD1pWzFdLFxucj1pWzJdLGU9aVszXSx1PWlbNF0sZj1pWzldPWlbOV09PT1GP2M/MDpuLmxlbmd0aDpEaShpWzldLWEsMCksIWYmJjI0JnQmJih0Jj0tMjUpLERlKChoP2xvOnhvKSh0JiYxIT10Pzg9PXR8fDE2PT10P0pyKG4sdCxmKTozMiE9dCYmMzMhPXR8fHUubGVuZ3RoP1hyLmFwcGx5KEYsaSk6dWUobix0LHIsZSk6VnIobix0LHIpLGkpLG4sdCl9ZnVuY3Rpb24gc2Uobix0LHIsZSl7cmV0dXJuIG49PT1GfHxodShuLGlpW3JdKSYmIWNpLmNhbGwoZSxyKT90Om59ZnVuY3Rpb24gaGUobix0LHIsZSx1LGkpe3JldHVybiBidShuKSYmYnUodCkmJihpLnNldCh0LG4pLG5yKG4sdCxGLGhlLGkpLGkuZGVsZXRlKHQpKSxufWZ1bmN0aW9uIHBlKG4pe3JldHVybiB3dShuKT9GOm59ZnVuY3Rpb24gX2Uobix0LHIsZSx1LGkpe3ZhciBvPTEmcixmPW4ubGVuZ3RoLGM9dC5sZW5ndGg7aWYoZiE9YyYmIShvJiZjPmYpKXJldHVybiBmYWxzZTtpZigoYz1pLmdldChuKSkmJmkuZ2V0KHQpKXJldHVybiBjPT10O3ZhciBjPS0xLGE9dHJ1ZSxsPTImcj9uZXcgcW46RjtcbmZvcihpLnNldChuLHQpLGkuc2V0KHQsbik7KytjPGY7KXt2YXIgcz1uW2NdLGg9dFtjXTtpZihlKXZhciBwPW8/ZShoLHMsYyx0LG4saSk6ZShzLGgsYyxuLHQsaSk7aWYocCE9PUYpe2lmKHApY29udGludWU7YT1mYWxzZTticmVha31pZihsKXtpZighXyh0LGZ1bmN0aW9uKG4sdCl7aWYoIVIobCx0KSYmKHM9PT1ufHx1KHMsbixyLGUsaSkpKXJldHVybiBsLnB1c2godCl9KSl7YT1mYWxzZTticmVha319ZWxzZSBpZihzIT09aCYmIXUocyxoLHIsZSxpKSl7YT1mYWxzZTticmVha319cmV0dXJuIGkuZGVsZXRlKG4pLGkuZGVsZXRlKHQpLGF9ZnVuY3Rpb24gdmUobix0LHIsZSx1LGksbyl7c3dpdGNoKHIpe2Nhc2VcIltvYmplY3QgRGF0YVZpZXddXCI6aWYobi5ieXRlTGVuZ3RoIT10LmJ5dGVMZW5ndGh8fG4uYnl0ZU9mZnNldCE9dC5ieXRlT2Zmc2V0KWJyZWFrO249bi5idWZmZXIsdD10LmJ1ZmZlcjtjYXNlXCJbb2JqZWN0IEFycmF5QnVmZmVyXVwiOmlmKG4uYnl0ZUxlbmd0aCE9dC5ieXRlTGVuZ3RofHwhaShuZXcgZGkobiksbmV3IGRpKHQpKSlicmVhaztcbnJldHVybiB0cnVlO2Nhc2VcIltvYmplY3QgQm9vbGVhbl1cIjpjYXNlXCJbb2JqZWN0IERhdGVdXCI6Y2FzZVwiW29iamVjdCBOdW1iZXJdXCI6cmV0dXJuIGh1KCtuLCt0KTtjYXNlXCJbb2JqZWN0IEVycm9yXVwiOnJldHVybiBuLm5hbWU9PXQubmFtZSYmbi5tZXNzYWdlPT10Lm1lc3NhZ2U7Y2FzZVwiW29iamVjdCBSZWdFeHBdXCI6Y2FzZVwiW29iamVjdCBTdHJpbmddXCI6cmV0dXJuIG49PXQrXCJcIjtjYXNlXCJbb2JqZWN0IE1hcF1cIjp2YXIgZj1MO2Nhc2VcIltvYmplY3QgU2V0XVwiOmlmKGZ8fChmPUQpLG4uc2l6ZSE9dC5zaXplJiYhKDEmZSkpYnJlYWs7cmV0dXJuKHI9by5nZXQobikpP3I9PXQ6KGV8PTIsby5zZXQobix0KSx0PV9lKGYobiksZih0KSxlLHUsaSxvKSxvLmRlbGV0ZShuKSx0KTtjYXNlXCJbb2JqZWN0IFN5bWJvbF1cIjppZihlbylyZXR1cm4gZW8uY2FsbChuKT09ZW8uY2FsbCh0KX1yZXR1cm4gZmFsc2V9ZnVuY3Rpb24gZ2Uobil7cmV0dXJuIHdvKENlKG4sRixWZSksbitcIlwiKX1mdW5jdGlvbiBkZShuKXtcbnJldHVybiBSdChuLEx1LHZvKX1mdW5jdGlvbiB5ZShuKXtyZXR1cm4gUnQobixVdSxnbyl9ZnVuY3Rpb24gYmUobil7Zm9yKHZhciB0PW4ubmFtZStcIlwiLHI9SmlbdF0sZT1jaS5jYWxsKEppLHQpP3IubGVuZ3RoOjA7ZS0tOyl7dmFyIHU9cltlXSxpPXUuZnVuYztpZihudWxsPT1pfHxpPT1uKXJldHVybiB1Lm5hbWV9cmV0dXJuIHR9ZnVuY3Rpb24geGUobil7cmV0dXJuKGNpLmNhbGwoT24sXCJwbGFjZWhvbGRlclwiKT9PbjpuKS5wbGFjZWhvbGRlcn1mdW5jdGlvbiBqZSgpe3ZhciBuPU9uLml0ZXJhdGVlfHxQdSxuPW49PT1QdT9HdDpuO3JldHVybiBhcmd1bWVudHMubGVuZ3RoP24oYXJndW1lbnRzWzBdLGFyZ3VtZW50c1sxXSk6bn1mdW5jdGlvbiB3ZShuLHQpe3ZhciByPW4uX19kYXRhX18sZT10eXBlb2YgdDtyZXR1cm4oXCJzdHJpbmdcIj09ZXx8XCJudW1iZXJcIj09ZXx8XCJzeW1ib2xcIj09ZXx8XCJib29sZWFuXCI9PWU/XCJfX3Byb3RvX19cIiE9PXQ6bnVsbD09PXQpP3JbdHlwZW9mIHQ9PVwic3RyaW5nXCI/XCJzdHJpbmdcIjpcImhhc2hcIl06ci5tYXA7XG59ZnVuY3Rpb24gbWUobil7Zm9yKHZhciB0PUx1KG4pLHI9dC5sZW5ndGg7ci0tOyl7dmFyIGU9dFtyXSx1PW5bZV07dFtyXT1bZSx1LHU9PT11JiYhYnUodSldfXJldHVybiB0fWZ1bmN0aW9uIEFlKG4sdCl7dmFyIHI9bnVsbD09bj9GOm5bdF07cmV0dXJuIFp0KHIpP3I6Rn1mdW5jdGlvbiBrZShuLHQscil7dD1Scih0LG4pO2Zvcih2YXIgZT0tMSx1PXQubGVuZ3RoLGk9ZmFsc2U7KytlPHU7KXt2YXIgbz0kZSh0W2VdKTtpZighKGk9bnVsbCE9biYmcihuLG8pKSlicmVhaztuPW5bb119cmV0dXJuIGl8fCsrZSE9dT9pOih1PW51bGw9PW4/MDpuLmxlbmd0aCwhIXUmJnl1KHUpJiZSZShvLHUpJiYoYWYobil8fGNmKG4pKSl9ZnVuY3Rpb24gRWUobil7dmFyIHQ9bi5sZW5ndGgscj1uLmNvbnN0cnVjdG9yKHQpO3JldHVybiB0JiZcInN0cmluZ1wiPT10eXBlb2YgblswXSYmY2kuY2FsbChuLFwiaW5kZXhcIikmJihyLmluZGV4PW4uaW5kZXgsci5pbnB1dD1uLmlucHV0KSxyfWZ1bmN0aW9uIE9lKG4pe1xucmV0dXJuIHR5cGVvZiBuLmNvbnN0cnVjdG9yIT1cImZ1bmN0aW9uXCJ8fExlKG4pP3t9OmlvKGJpKG4pKX1mdW5jdGlvbiBTZShyLGUsdSxpKXt2YXIgbz1yLmNvbnN0cnVjdG9yO3N3aXRjaChlKXtjYXNlXCJbb2JqZWN0IEFycmF5QnVmZmVyXVwiOnJldHVybiBCcihyKTtjYXNlXCJbb2JqZWN0IEJvb2xlYW5dXCI6Y2FzZVwiW29iamVjdCBEYXRlXVwiOnJldHVybiBuZXcgbygrcik7Y2FzZVwiW29iamVjdCBEYXRhVmlld11cIjpyZXR1cm4gZT1pP0JyKHIuYnVmZmVyKTpyLmJ1ZmZlcixuZXcgci5jb25zdHJ1Y3RvcihlLHIuYnl0ZU9mZnNldCxyLmJ5dGVMZW5ndGgpO2Nhc2VcIltvYmplY3QgRmxvYXQzMkFycmF5XVwiOmNhc2VcIltvYmplY3QgRmxvYXQ2NEFycmF5XVwiOmNhc2VcIltvYmplY3QgSW50OEFycmF5XVwiOmNhc2VcIltvYmplY3QgSW50MTZBcnJheV1cIjpjYXNlXCJbb2JqZWN0IEludDMyQXJyYXldXCI6Y2FzZVwiW29iamVjdCBVaW50OEFycmF5XVwiOmNhc2VcIltvYmplY3QgVWludDhDbGFtcGVkQXJyYXldXCI6XG5jYXNlXCJbb2JqZWN0IFVpbnQxNkFycmF5XVwiOmNhc2VcIltvYmplY3QgVWludDMyQXJyYXldXCI6cmV0dXJuIExyKHIsaSk7Y2FzZVwiW29iamVjdCBNYXBdXCI6cmV0dXJuIGU9aT91KEwociksMSk6TChyKSxoKGUsbixuZXcgci5jb25zdHJ1Y3Rvcik7Y2FzZVwiW29iamVjdCBOdW1iZXJdXCI6Y2FzZVwiW29iamVjdCBTdHJpbmddXCI6cmV0dXJuIG5ldyBvKHIpO2Nhc2VcIltvYmplY3QgUmVnRXhwXVwiOnJldHVybiBlPW5ldyByLmNvbnN0cnVjdG9yKHIuc291cmNlLGRuLmV4ZWMocikpLGUubGFzdEluZGV4PXIubGFzdEluZGV4LGU7Y2FzZVwiW29iamVjdCBTZXRdXCI6cmV0dXJuIGU9aT91KEQociksMSk6RChyKSxoKGUsdCxuZXcgci5jb25zdHJ1Y3Rvcik7Y2FzZVwiW29iamVjdCBTeW1ib2xdXCI6cmV0dXJuIGVvP25pKGVvLmNhbGwocikpOnt9fX1mdW5jdGlvbiBJZShuKXtyZXR1cm4gYWYobil8fGNmKG4pfHwhIShtaSYmbiYmblttaV0pfWZ1bmN0aW9uIFJlKG4sdCl7cmV0dXJuIHQ9bnVsbD09dD85MDA3MTk5MjU0NzQwOTkxOnQsXG4hIXQmJih0eXBlb2Ygbj09XCJudW1iZXJcInx8d24udGVzdChuKSkmJi0xPG4mJjA9PW4lMSYmbjx0fWZ1bmN0aW9uIHplKG4sdCxyKXtpZighYnUocikpcmV0dXJuIGZhbHNlO3ZhciBlPXR5cGVvZiB0O3JldHVybiEhKFwibnVtYmVyXCI9PWU/cHUocikmJlJlKHQsci5sZW5ndGgpOlwic3RyaW5nXCI9PWUmJnQgaW4gcikmJmh1KHJbdF0sbil9ZnVuY3Rpb24gV2Uobix0KXtpZihhZihuKSlyZXR1cm4gZmFsc2U7dmFyIHI9dHlwZW9mIG47cmV0dXJuIShcIm51bWJlclwiIT1yJiZcInN5bWJvbFwiIT1yJiZcImJvb2xlYW5cIiE9ciYmbnVsbCE9biYmIUF1KG4pKXx8KHJuLnRlc3Qobil8fCF0bi50ZXN0KG4pfHxudWxsIT10JiZuIGluIG5pKHQpKX1mdW5jdGlvbiBCZShuKXt2YXIgdD1iZShuKSxyPU9uW3RdO3JldHVybiB0eXBlb2Ygcj09XCJmdW5jdGlvblwiJiZ0IGluIE1uLnByb3RvdHlwZSYmKG49PT1yfHwodD1fbyhyKSwhIXQmJm49PT10WzBdKSl9ZnVuY3Rpb24gTGUobil7dmFyIHQ9biYmbi5jb25zdHJ1Y3RvcjtcbnJldHVybiBuPT09KHR5cGVvZiB0PT1cImZ1bmN0aW9uXCImJnQucHJvdG90eXBlfHxpaSl9ZnVuY3Rpb24gVWUobix0KXtyZXR1cm4gZnVuY3Rpb24ocil7cmV0dXJuIG51bGwhPXImJihyW25dPT09dCYmKHQhPT1GfHxuIGluIG5pKHIpKSl9fWZ1bmN0aW9uIENlKG4sdCxlKXtyZXR1cm4gdD1EaSh0PT09Rj9uLmxlbmd0aC0xOnQsMCksZnVuY3Rpb24oKXtmb3IodmFyIHU9YXJndW1lbnRzLGk9LTEsbz1EaSh1Lmxlbmd0aC10LDApLGY9SHUobyk7KytpPG87KWZbaV09dVt0K2ldO2ZvcihpPS0xLG89SHUodCsxKTsrK2k8dDspb1tpXT11W2ldO3JldHVybiBvW3RdPWUoZikscihuLHRoaXMsbyl9fWZ1bmN0aW9uIERlKG4sdCxyKXt2YXIgZT10K1wiXCI7dD13bzt2YXIgdSxpPU5lO3JldHVybiB1PSh1PWUubWF0Y2goaG4pKT91WzFdLnNwbGl0KHBuKTpbXSxyPWkodSxyKSwoaT1yLmxlbmd0aCkmJih1PWktMSxyW3VdPSgxPGk/XCImIFwiOlwiXCIpK3JbdV0scj1yLmpvaW4oMjxpP1wiLCBcIjpcIiBcIiksXG5lPWUucmVwbGFjZShzbixcIntcXG4vKiBbd3JhcHBlZCB3aXRoIFwiK3IrXCJdICovXFxuXCIpKSx0KG4sZSl9ZnVuY3Rpb24gTWUobil7dmFyIHQ9MCxyPTA7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIGU9VGkoKSx1PTE2LShlLXIpO2lmKHI9ZSwwPHUpe2lmKDgwMDw9Kyt0KXJldHVybiBhcmd1bWVudHNbMF19ZWxzZSB0PTA7cmV0dXJuIG4uYXBwbHkoRixhcmd1bWVudHMpfX1mdW5jdGlvbiBUZShuLHQpe3ZhciByPS0xLGU9bi5sZW5ndGgsdT1lLTE7Zm9yKHQ9dD09PUY/ZTp0Oysrcjx0Oyl7dmFyIGU9Y3Iocix1KSxpPW5bZV07bltlXT1uW3JdLG5bcl09aX1yZXR1cm4gbi5sZW5ndGg9dCxufWZ1bmN0aW9uICRlKG4pe2lmKHR5cGVvZiBuPT1cInN0cmluZ1wifHxBdShuKSlyZXR1cm4gbjt2YXIgdD1uK1wiXCI7cmV0dXJuXCIwXCI9PXQmJjEvbj09LU4/XCItMFwiOnR9ZnVuY3Rpb24gRmUobil7aWYobnVsbCE9bil7dHJ5e3JldHVybiBmaS5jYWxsKG4pfWNhdGNoKG4pe31yZXR1cm4gbitcIlwifXJldHVyblwiXCI7XG59ZnVuY3Rpb24gTmUobix0KXtyZXR1cm4gdShaLGZ1bmN0aW9uKHIpe3ZhciBlPVwiXy5cIityWzBdO3QmclsxXSYmIWMobixlKSYmbi5wdXNoKGUpfSksbi5zb3J0KCl9ZnVuY3Rpb24gUGUobil7aWYobiBpbnN0YW5jZW9mIE1uKXJldHVybiBuLmNsb25lKCk7dmFyIHQ9bmV3IHpuKG4uX193cmFwcGVkX18sbi5fX2NoYWluX18pO3JldHVybiB0Ll9fYWN0aW9uc19fPU1yKG4uX19hY3Rpb25zX18pLHQuX19pbmRleF9fPW4uX19pbmRleF9fLHQuX192YWx1ZXNfXz1uLl9fdmFsdWVzX18sdH1mdW5jdGlvbiBaZShuLHQscil7dmFyIGU9bnVsbD09bj8wOm4ubGVuZ3RoO3JldHVybiBlPyhyPW51bGw9PXI/MDpPdShyKSwwPnImJihyPURpKGUrciwwKSksZyhuLGplKHQsMykscikpOi0xfWZ1bmN0aW9uIHFlKG4sdCxyKXt2YXIgZT1udWxsPT1uPzA6bi5sZW5ndGg7aWYoIWUpcmV0dXJuLTE7dmFyIHU9ZS0xO3JldHVybiByIT09RiYmKHU9T3UociksdT0wPnI/RGkoZSt1LDApOk1pKHUsZS0xKSksXG5nKG4samUodCwzKSx1LHRydWUpfWZ1bmN0aW9uIFZlKG4pe3JldHVybihudWxsPT1uPzA6bi5sZW5ndGgpP2t0KG4sMSk6W119ZnVuY3Rpb24gS2Uobil7cmV0dXJuIG4mJm4ubGVuZ3RoP25bMF06Rn1mdW5jdGlvbiBHZShuKXt2YXIgdD1udWxsPT1uPzA6bi5sZW5ndGg7cmV0dXJuIHQ/blt0LTFdOkZ9ZnVuY3Rpb24gSGUobix0KXtyZXR1cm4gbiYmbi5sZW5ndGgmJnQmJnQubGVuZ3RoP29yKG4sdCk6bn1mdW5jdGlvbiBKZShuKXtyZXR1cm4gbnVsbD09bj9uOk5pLmNhbGwobil9ZnVuY3Rpb24gWWUobil7aWYoIW58fCFuLmxlbmd0aClyZXR1cm5bXTt2YXIgdD0wO3JldHVybiBuPWYobixmdW5jdGlvbihuKXtpZihfdShuKSlyZXR1cm4gdD1EaShuLmxlbmd0aCx0KSx0cnVlfSksRSh0LGZ1bmN0aW9uKHQpe3JldHVybiBsKG4saih0KSl9KX1mdW5jdGlvbiBRZShuLHQpe2lmKCFufHwhbi5sZW5ndGgpcmV0dXJuW107dmFyIGU9WWUobik7cmV0dXJuIG51bGw9PXQ/ZTpsKGUsZnVuY3Rpb24obil7XG5yZXR1cm4gcih0LEYsbil9KX1mdW5jdGlvbiBYZShuKXtyZXR1cm4gbj1PbihuKSxuLl9fY2hhaW5fXz10cnVlLG59ZnVuY3Rpb24gbnUobix0KXtyZXR1cm4gdChuKX1mdW5jdGlvbiB0dSgpe3JldHVybiB0aGlzfWZ1bmN0aW9uIHJ1KG4sdCl7cmV0dXJuKGFmKG4pP3U6b28pKG4samUodCwzKSl9ZnVuY3Rpb24gZXUobix0KXtyZXR1cm4oYWYobik/aTpmbykobixqZSh0LDMpKX1mdW5jdGlvbiB1dShuLHQpe3JldHVybihhZihuKT9sOll0KShuLGplKHQsMykpfWZ1bmN0aW9uIGl1KG4sdCxyKXtyZXR1cm4gdD1yP0Y6dCx0PW4mJm51bGw9PXQ/bi5sZW5ndGg6dCxsZShuLDEyOCxGLEYsRixGLHQpfWZ1bmN0aW9uIG91KG4sdCl7dmFyIHI7aWYodHlwZW9mIHQhPVwiZnVuY3Rpb25cIil0aHJvdyBuZXcgZWkoXCJFeHBlY3RlZCBhIGZ1bmN0aW9uXCIpO3JldHVybiBuPU91KG4pLGZ1bmN0aW9uKCl7cmV0dXJuIDA8LS1uJiYocj10LmFwcGx5KHRoaXMsYXJndW1lbnRzKSksMT49biYmKHQ9RiksXG5yfX1mdW5jdGlvbiBmdShuLHQscil7cmV0dXJuIHQ9cj9GOnQsbj1sZShuLDgsRixGLEYsRixGLHQpLG4ucGxhY2Vob2xkZXI9ZnUucGxhY2Vob2xkZXIsbn1mdW5jdGlvbiBjdShuLHQscil7cmV0dXJuIHQ9cj9GOnQsbj1sZShuLDE2LEYsRixGLEYsRix0KSxuLnBsYWNlaG9sZGVyPWN1LnBsYWNlaG9sZGVyLG59ZnVuY3Rpb24gYXUobix0LHIpe2Z1bmN0aW9uIGUodCl7dmFyIHI9YyxlPWE7cmV0dXJuIGM9YT1GLF89dCxzPW4uYXBwbHkoZSxyKX1mdW5jdGlvbiB1KG4pe3ZhciByPW4tcDtyZXR1cm4gbi09XyxwPT09Rnx8cj49dHx8MD5yfHxnJiZuPj1sfWZ1bmN0aW9uIGkoKXt2YXIgbj1KbygpO2lmKHUobikpcmV0dXJuIG8obik7dmFyIHIsZT1qbztyPW4tXyxuPXQtKG4tcCkscj1nP01pKG4sbC1yKTpuLGg9ZShpLHIpfWZ1bmN0aW9uIG8obil7cmV0dXJuIGg9RixkJiZjP2Uobik6KGM9YT1GLHMpfWZ1bmN0aW9uIGYoKXt2YXIgbj1KbygpLHI9dShuKTtpZihjPWFyZ3VtZW50cyxcbmE9dGhpcyxwPW4scil7aWYoaD09PUYpcmV0dXJuIF89bj1wLGg9am8oaSx0KSx2P2Uobik6cztpZihnKXJldHVybiBoPWpvKGksdCksZShwKX1yZXR1cm4gaD09PUYmJihoPWpvKGksdCkpLHN9dmFyIGMsYSxsLHMsaCxwLF89MCx2PWZhbHNlLGc9ZmFsc2UsZD10cnVlO2lmKHR5cGVvZiBuIT1cImZ1bmN0aW9uXCIpdGhyb3cgbmV3IGVpKFwiRXhwZWN0ZWQgYSBmdW5jdGlvblwiKTtyZXR1cm4gdD1JdSh0KXx8MCxidShyKSYmKHY9ISFyLmxlYWRpbmcsbD0oZz1cIm1heFdhaXRcImluIHIpP0RpKEl1KHIubWF4V2FpdCl8fDAsdCk6bCxkPVwidHJhaWxpbmdcImluIHI/ISFyLnRyYWlsaW5nOmQpLGYuY2FuY2VsPWZ1bmN0aW9uKCl7aCE9PUYmJmhvKGgpLF89MCxjPXA9YT1oPUZ9LGYuZmx1c2g9ZnVuY3Rpb24oKXtyZXR1cm4gaD09PUY/czpvKEpvKCkpfSxmfWZ1bmN0aW9uIGx1KG4sdCl7ZnVuY3Rpb24gcigpe3ZhciBlPWFyZ3VtZW50cyx1PXQ/dC5hcHBseSh0aGlzLGUpOmVbMF0saT1yLmNhY2hlO3JldHVybiBpLmhhcyh1KT9pLmdldCh1KTooZT1uLmFwcGx5KHRoaXMsZSksXG5yLmNhY2hlPWkuc2V0KHUsZSl8fGksZSl9aWYodHlwZW9mIG4hPVwiZnVuY3Rpb25cInx8bnVsbCE9dCYmdHlwZW9mIHQhPVwiZnVuY3Rpb25cIil0aHJvdyBuZXcgZWkoXCJFeHBlY3RlZCBhIGZ1bmN0aW9uXCIpO3JldHVybiByLmNhY2hlPW5ldyhsdS5DYWNoZXx8UG4pLHJ9ZnVuY3Rpb24gc3Uobil7aWYodHlwZW9mIG4hPVwiZnVuY3Rpb25cIil0aHJvdyBuZXcgZWkoXCJFeHBlY3RlZCBhIGZ1bmN0aW9uXCIpO3JldHVybiBmdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cztzd2l0Y2godC5sZW5ndGgpe2Nhc2UgMDpyZXR1cm4hbi5jYWxsKHRoaXMpO2Nhc2UgMTpyZXR1cm4hbi5jYWxsKHRoaXMsdFswXSk7Y2FzZSAyOnJldHVybiFuLmNhbGwodGhpcyx0WzBdLHRbMV0pO2Nhc2UgMzpyZXR1cm4hbi5jYWxsKHRoaXMsdFswXSx0WzFdLHRbMl0pfXJldHVybiFuLmFwcGx5KHRoaXMsdCl9fWZ1bmN0aW9uIGh1KG4sdCl7cmV0dXJuIG49PT10fHxuIT09biYmdCE9PXR9ZnVuY3Rpb24gcHUobil7cmV0dXJuIG51bGwhPW4mJnl1KG4ubGVuZ3RoKSYmIWd1KG4pO1xufWZ1bmN0aW9uIF91KG4pe3JldHVybiB4dShuKSYmcHUobil9ZnVuY3Rpb24gdnUobil7aWYoIXh1KG4pKXJldHVybiBmYWxzZTt2YXIgdD16dChuKTtyZXR1cm5cIltvYmplY3QgRXJyb3JdXCI9PXR8fFwiW29iamVjdCBET01FeGNlcHRpb25dXCI9PXR8fHR5cGVvZiBuLm1lc3NhZ2U9PVwic3RyaW5nXCImJnR5cGVvZiBuLm5hbWU9PVwic3RyaW5nXCImJiF3dShuKX1mdW5jdGlvbiBndShuKXtyZXR1cm4hIWJ1KG4pJiYobj16dChuKSxcIltvYmplY3QgRnVuY3Rpb25dXCI9PW58fFwiW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl1cIj09bnx8XCJbb2JqZWN0IEFzeW5jRnVuY3Rpb25dXCI9PW58fFwiW29iamVjdCBQcm94eV1cIj09bil9ZnVuY3Rpb24gZHUobil7cmV0dXJuIHR5cGVvZiBuPT1cIm51bWJlclwiJiZuPT1PdShuKX1mdW5jdGlvbiB5dShuKXtyZXR1cm4gdHlwZW9mIG49PVwibnVtYmVyXCImJi0xPG4mJjA9PW4lMSYmOTAwNzE5OTI1NDc0MDk5MT49bn1mdW5jdGlvbiBidShuKXt2YXIgdD10eXBlb2YgbjtyZXR1cm4gbnVsbCE9biYmKFwib2JqZWN0XCI9PXR8fFwiZnVuY3Rpb25cIj09dCk7XG59ZnVuY3Rpb24geHUobil7cmV0dXJuIG51bGwhPW4mJnR5cGVvZiBuPT1cIm9iamVjdFwifWZ1bmN0aW9uIGp1KG4pe3JldHVybiB0eXBlb2Ygbj09XCJudW1iZXJcInx8eHUobikmJlwiW29iamVjdCBOdW1iZXJdXCI9PXp0KG4pfWZ1bmN0aW9uIHd1KG4pe3JldHVybiEoIXh1KG4pfHxcIltvYmplY3QgT2JqZWN0XVwiIT16dChuKSkmJihuPWJpKG4pLG51bGw9PT1ufHwobj1jaS5jYWxsKG4sXCJjb25zdHJ1Y3RvclwiKSYmbi5jb25zdHJ1Y3Rvcix0eXBlb2Ygbj09XCJmdW5jdGlvblwiJiZuIGluc3RhbmNlb2YgbiYmZmkuY2FsbChuKT09aGkpKX1mdW5jdGlvbiBtdShuKXtyZXR1cm4gdHlwZW9mIG49PVwic3RyaW5nXCJ8fCFhZihuKSYmeHUobikmJlwiW29iamVjdCBTdHJpbmddXCI9PXp0KG4pfWZ1bmN0aW9uIEF1KG4pe3JldHVybiB0eXBlb2Ygbj09XCJzeW1ib2xcInx8eHUobikmJlwiW29iamVjdCBTeW1ib2xdXCI9PXp0KG4pfWZ1bmN0aW9uIGt1KG4pe2lmKCFuKXJldHVybltdO2lmKHB1KG4pKXJldHVybiBtdShuKT8kKG4pOk1yKG4pO1xuaWYoQWkmJm5bQWldKXtuPW5bQWldKCk7Zm9yKHZhciB0LHI9W107ISh0PW4ubmV4dCgpKS5kb25lOylyLnB1c2godC52YWx1ZSk7cmV0dXJuIHJ9cmV0dXJuIHQ9eW8obiksKFwiW29iamVjdCBNYXBdXCI9PXQ/TDpcIltvYmplY3QgU2V0XVwiPT10P0Q6RHUpKG4pfWZ1bmN0aW9uIEV1KG4pe3JldHVybiBuPyhuPUl1KG4pLG49PT1OfHxuPT09LU4/MS43OTc2OTMxMzQ4NjIzMTU3ZTMwOCooMD5uPy0xOjEpOm49PT1uP246MCk6MD09PW4/bjowfWZ1bmN0aW9uIE91KG4pe249RXUobik7dmFyIHQ9biUxO3JldHVybiBuPT09bj90P24tdDpuOjB9ZnVuY3Rpb24gU3Uobil7cmV0dXJuIG4/Z3QoT3UobiksMCw0Mjk0OTY3Mjk1KTowfWZ1bmN0aW9uIEl1KG4pe2lmKHR5cGVvZiBuPT1cIm51bWJlclwiKXJldHVybiBuO2lmKEF1KG4pKXJldHVybiBQO2lmKGJ1KG4pJiYobj10eXBlb2Ygbi52YWx1ZU9mPT1cImZ1bmN0aW9uXCI/bi52YWx1ZU9mKCk6bixuPWJ1KG4pP24rXCJcIjpuKSx0eXBlb2YgbiE9XCJzdHJpbmdcIilyZXR1cm4gMD09PW4/bjorbjtcbm49bi5yZXBsYWNlKGNuLFwiXCIpO3ZhciB0PWJuLnRlc3Qobik7cmV0dXJuIHR8fGpuLnRlc3Qobik/Rm4obi5zbGljZSgyKSx0PzI6OCk6eW4udGVzdChuKT9QOitufWZ1bmN0aW9uIFJ1KG4pe3JldHVybiBUcihuLFV1KG4pKX1mdW5jdGlvbiB6dShuKXtyZXR1cm4gbnVsbD09bj9cIlwiOmpyKG4pfWZ1bmN0aW9uIFd1KG4sdCxyKXtyZXR1cm4gbj1udWxsPT1uP0Y6SXQobix0KSxuPT09Rj9yOm59ZnVuY3Rpb24gQnUobix0KXtyZXR1cm4gbnVsbCE9biYma2Uobix0LEx0KX1mdW5jdGlvbiBMdShuKXtyZXR1cm4gcHUobik/R24obik6SHQobil9ZnVuY3Rpb24gVXUobil7aWYocHUobikpbj1HbihuLHRydWUpO2Vsc2UgaWYoYnUobikpe3ZhciB0LHI9TGUobiksZT1bXTtmb3IodCBpbiBuKShcImNvbnN0cnVjdG9yXCIhPXR8fCFyJiZjaS5jYWxsKG4sdCkpJiZlLnB1c2godCk7bj1lfWVsc2V7aWYodD1bXSxudWxsIT1uKWZvcihyIGluIG5pKG4pKXQucHVzaChyKTtuPXR9cmV0dXJuIG59ZnVuY3Rpb24gQ3Uobix0KXtcbmlmKG51bGw9PW4pcmV0dXJue307dmFyIHI9bCh5ZShuKSxmdW5jdGlvbihuKXtyZXR1cm5bbl19KTtyZXR1cm4gdD1qZSh0KSx1cihuLHIsZnVuY3Rpb24obixyKXtyZXR1cm4gdChuLHJbMF0pfSl9ZnVuY3Rpb24gRHUobil7cmV0dXJuIG51bGw9PW4/W106SShuLEx1KG4pKX1mdW5jdGlvbiBNdShuKXtyZXR1cm4gTmYoenUobikudG9Mb3dlckNhc2UoKSl9ZnVuY3Rpb24gVHUobil7cmV0dXJuKG49enUobikpJiZuLnJlcGxhY2UobW4scnQpLnJlcGxhY2UoUm4sXCJcIil9ZnVuY3Rpb24gJHUobix0LHIpe3JldHVybiBuPXp1KG4pLHQ9cj9GOnQsdD09PUY/TG4udGVzdChuKT9uLm1hdGNoKFduKXx8W106bi5tYXRjaChfbil8fFtdOm4ubWF0Y2godCl8fFtdfWZ1bmN0aW9uIEZ1KG4pe3JldHVybiBmdW5jdGlvbigpe3JldHVybiBufX1mdW5jdGlvbiBOdShuKXtyZXR1cm4gbn1mdW5jdGlvbiBQdShuKXtyZXR1cm4gR3QodHlwZW9mIG49PVwiZnVuY3Rpb25cIj9uOmR0KG4sMSkpfWZ1bmN0aW9uIFp1KG4sdCxyKXtcbnZhciBlPUx1KHQpLGk9U3QodCxlKTtudWxsIT1yfHxidSh0KSYmKGkubGVuZ3RofHwhZS5sZW5ndGgpfHwocj10LHQ9bixuPXRoaXMsaT1TdCh0LEx1KHQpKSk7dmFyIG89IShidShyKSYmXCJjaGFpblwiaW4gciYmIXIuY2hhaW4pLGY9Z3Uobik7cmV0dXJuIHUoaSxmdW5jdGlvbihyKXt2YXIgZT10W3JdO25bcl09ZSxmJiYobi5wcm90b3R5cGVbcl09ZnVuY3Rpb24oKXt2YXIgdD10aGlzLl9fY2hhaW5fXztpZihvfHx0KXt2YXIgcj1uKHRoaXMuX193cmFwcGVkX18pO3JldHVybihyLl9fYWN0aW9uc19fPU1yKHRoaXMuX19hY3Rpb25zX18pKS5wdXNoKHtmdW5jOmUsYXJnczphcmd1bWVudHMsdGhpc0FyZzpufSksci5fX2NoYWluX189dCxyfXJldHVybiBlLmFwcGx5KG4scyhbdGhpcy52YWx1ZSgpXSxhcmd1bWVudHMpKX0pfSksbn1mdW5jdGlvbiBxdSgpe31mdW5jdGlvbiBWdShuKXtyZXR1cm4gV2Uobik/aigkZShuKSk6aXIobil9ZnVuY3Rpb24gS3UoKXtyZXR1cm5bXX1mdW5jdGlvbiBHdSgpe1xucmV0dXJuIGZhbHNlfUVuPW51bGw9PUVuP1puOml0LmRlZmF1bHRzKFpuLk9iamVjdCgpLEVuLGl0LnBpY2soWm4sVW4pKTt2YXIgSHU9RW4uQXJyYXksSnU9RW4uRGF0ZSxZdT1Fbi5FcnJvcixRdT1Fbi5GdW5jdGlvbixYdT1Fbi5NYXRoLG5pPUVuLk9iamVjdCx0aT1Fbi5SZWdFeHAscmk9RW4uU3RyaW5nLGVpPUVuLlR5cGVFcnJvcix1aT1IdS5wcm90b3R5cGUsaWk9bmkucHJvdG90eXBlLG9pPUVuW1wiX19jb3JlLWpzX3NoYXJlZF9fXCJdLGZpPVF1LnByb3RvdHlwZS50b1N0cmluZyxjaT1paS5oYXNPd25Qcm9wZXJ0eSxhaT0wLGxpPWZ1bmN0aW9uKCl7dmFyIG49L1teLl0rJC8uZXhlYyhvaSYmb2kua2V5cyYmb2kua2V5cy5JRV9QUk9UT3x8XCJcIik7cmV0dXJuIG4/XCJTeW1ib2woc3JjKV8xLlwiK246XCJcIn0oKSxzaT1paS50b1N0cmluZyxoaT1maS5jYWxsKG5pKSxwaT1abi5fLF9pPXRpKFwiXlwiK2ZpLmNhbGwoY2kpLnJlcGxhY2Uob24sXCJcXFxcJCZcIikucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZyxcIiQxLio/XCIpK1wiJFwiKSx2aT1Lbj9Fbi5CdWZmZXI6RixnaT1Fbi5TeW1ib2wsZGk9RW4uVWludDhBcnJheSx5aT12aT92aS5mOkYsYmk9VShuaS5nZXRQcm90b3R5cGVPZixuaSkseGk9bmkuY3JlYXRlLGppPWlpLnByb3BlcnR5SXNFbnVtZXJhYmxlLHdpPXVpLnNwbGljZSxtaT1naT9naS5pc0NvbmNhdFNwcmVhZGFibGU6RixBaT1naT9naS5pdGVyYXRvcjpGLGtpPWdpP2dpLnRvU3RyaW5nVGFnOkYsRWk9ZnVuY3Rpb24oKXtcbnRyeXt2YXIgbj1BZShuaSxcImRlZmluZVByb3BlcnR5XCIpO3JldHVybiBuKHt9LFwiXCIse30pLG59Y2F0Y2gobil7fX0oKSxPaT1Fbi5jbGVhclRpbWVvdXQhPT1abi5jbGVhclRpbWVvdXQmJkVuLmNsZWFyVGltZW91dCxTaT1KdSYmSnUubm93IT09Wm4uRGF0ZS5ub3cmJkp1Lm5vdyxJaT1Fbi5zZXRUaW1lb3V0IT09Wm4uc2V0VGltZW91dCYmRW4uc2V0VGltZW91dCxSaT1YdS5jZWlsLHppPVh1LmZsb29yLFdpPW5pLmdldE93blByb3BlcnR5U3ltYm9scyxCaT12aT92aS5pc0J1ZmZlcjpGLExpPUVuLmlzRmluaXRlLFVpPXVpLmpvaW4sQ2k9VShuaS5rZXlzLG5pKSxEaT1YdS5tYXgsTWk9WHUubWluLFRpPUp1Lm5vdywkaT1Fbi5wYXJzZUludCxGaT1YdS5yYW5kb20sTmk9dWkucmV2ZXJzZSxQaT1BZShFbixcIkRhdGFWaWV3XCIpLFppPUFlKEVuLFwiTWFwXCIpLHFpPUFlKEVuLFwiUHJvbWlzZVwiKSxWaT1BZShFbixcIlNldFwiKSxLaT1BZShFbixcIldlYWtNYXBcIiksR2k9QWUobmksXCJjcmVhdGVcIiksSGk9S2kmJm5ldyBLaSxKaT17fSxZaT1GZShQaSksUWk9RmUoWmkpLFhpPUZlKHFpKSxubz1GZShWaSksdG89RmUoS2kpLHJvPWdpP2dpLnByb3RvdHlwZTpGLGVvPXJvP3JvLnZhbHVlT2Y6Rix1bz1ybz9yby50b1N0cmluZzpGLGlvPWZ1bmN0aW9uKCl7XG5mdW5jdGlvbiBuKCl7fXJldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gYnUodCk/eGk/eGkodCk6KG4ucHJvdG90eXBlPXQsdD1uZXcgbixuLnByb3RvdHlwZT1GLHQpOnt9fX0oKTtPbi50ZW1wbGF0ZVNldHRpbmdzPXtlc2NhcGU6USxldmFsdWF0ZTpYLGludGVycG9sYXRlOm5uLHZhcmlhYmxlOlwiXCIsaW1wb3J0czp7XzpPbn19LE9uLnByb3RvdHlwZT1Tbi5wcm90b3R5cGUsT24ucHJvdG90eXBlLmNvbnN0cnVjdG9yPU9uLHpuLnByb3RvdHlwZT1pbyhTbi5wcm90b3R5cGUpLHpuLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj16bixNbi5wcm90b3R5cGU9aW8oU24ucHJvdG90eXBlKSxNbi5wcm90b3R5cGUuY29uc3RydWN0b3I9TW4sVG4ucHJvdG90eXBlLmNsZWFyPWZ1bmN0aW9uKCl7dGhpcy5fX2RhdGFfXz1HaT9HaShudWxsKTp7fSx0aGlzLnNpemU9MH0sVG4ucHJvdG90eXBlLmRlbGV0ZT1mdW5jdGlvbihuKXtyZXR1cm4gbj10aGlzLmhhcyhuKSYmZGVsZXRlIHRoaXMuX19kYXRhX19bbl0sXG50aGlzLnNpemUtPW4/MTowLG59LFRuLnByb3RvdHlwZS5nZXQ9ZnVuY3Rpb24obil7dmFyIHQ9dGhpcy5fX2RhdGFfXztyZXR1cm4gR2k/KG49dFtuXSxcIl9fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX19cIj09PW4/RjpuKTpjaS5jYWxsKHQsbik/dFtuXTpGfSxUbi5wcm90b3R5cGUuaGFzPWZ1bmN0aW9uKG4pe3ZhciB0PXRoaXMuX19kYXRhX187cmV0dXJuIEdpP3Rbbl0hPT1GOmNpLmNhbGwodCxuKX0sVG4ucHJvdG90eXBlLnNldD1mdW5jdGlvbihuLHQpe3ZhciByPXRoaXMuX19kYXRhX187cmV0dXJuIHRoaXMuc2l6ZSs9dGhpcy5oYXMobik/MDoxLHJbbl09R2kmJnQ9PT1GP1wiX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfX1wiOnQsdGhpc30sTm4ucHJvdG90eXBlLmNsZWFyPWZ1bmN0aW9uKCl7dGhpcy5fX2RhdGFfXz1bXSx0aGlzLnNpemU9MH0sTm4ucHJvdG90eXBlLmRlbGV0ZT1mdW5jdGlvbihuKXt2YXIgdD10aGlzLl9fZGF0YV9fO3JldHVybiBuPWx0KHQsbiksISgwPm4pJiYobj09dC5sZW5ndGgtMT90LnBvcCgpOndpLmNhbGwodCxuLDEpLFxuLS10aGlzLnNpemUsdHJ1ZSl9LE5uLnByb3RvdHlwZS5nZXQ9ZnVuY3Rpb24obil7dmFyIHQ9dGhpcy5fX2RhdGFfXztyZXR1cm4gbj1sdCh0LG4pLDA+bj9GOnRbbl1bMV19LE5uLnByb3RvdHlwZS5oYXM9ZnVuY3Rpb24obil7cmV0dXJuLTE8bHQodGhpcy5fX2RhdGFfXyxuKX0sTm4ucHJvdG90eXBlLnNldD1mdW5jdGlvbihuLHQpe3ZhciByPXRoaXMuX19kYXRhX18sZT1sdChyLG4pO3JldHVybiAwPmU/KCsrdGhpcy5zaXplLHIucHVzaChbbix0XSkpOnJbZV1bMV09dCx0aGlzfSxQbi5wcm90b3R5cGUuY2xlYXI9ZnVuY3Rpb24oKXt0aGlzLnNpemU9MCx0aGlzLl9fZGF0YV9fPXtoYXNoOm5ldyBUbixtYXA6bmV3KFppfHxObiksc3RyaW5nOm5ldyBUbn19LFBuLnByb3RvdHlwZS5kZWxldGU9ZnVuY3Rpb24obil7cmV0dXJuIG49d2UodGhpcyxuKS5kZWxldGUobiksdGhpcy5zaXplLT1uPzE6MCxufSxQbi5wcm90b3R5cGUuZ2V0PWZ1bmN0aW9uKG4pe3JldHVybiB3ZSh0aGlzLG4pLmdldChuKTtcbn0sUG4ucHJvdG90eXBlLmhhcz1mdW5jdGlvbihuKXtyZXR1cm4gd2UodGhpcyxuKS5oYXMobil9LFBuLnByb3RvdHlwZS5zZXQ9ZnVuY3Rpb24obix0KXt2YXIgcj13ZSh0aGlzLG4pLGU9ci5zaXplO3JldHVybiByLnNldChuLHQpLHRoaXMuc2l6ZSs9ci5zaXplPT1lPzA6MSx0aGlzfSxxbi5wcm90b3R5cGUuYWRkPXFuLnByb3RvdHlwZS5wdXNoPWZ1bmN0aW9uKG4pe3JldHVybiB0aGlzLl9fZGF0YV9fLnNldChuLFwiX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfX1wiKSx0aGlzfSxxbi5wcm90b3R5cGUuaGFzPWZ1bmN0aW9uKG4pe3JldHVybiB0aGlzLl9fZGF0YV9fLmhhcyhuKX0sVm4ucHJvdG90eXBlLmNsZWFyPWZ1bmN0aW9uKCl7dGhpcy5fX2RhdGFfXz1uZXcgTm4sdGhpcy5zaXplPTB9LFZuLnByb3RvdHlwZS5kZWxldGU9ZnVuY3Rpb24obil7dmFyIHQ9dGhpcy5fX2RhdGFfXztyZXR1cm4gbj10LmRlbGV0ZShuKSx0aGlzLnNpemU9dC5zaXplLG59LFZuLnByb3RvdHlwZS5nZXQ9ZnVuY3Rpb24obil7XG5yZXR1cm4gdGhpcy5fX2RhdGFfXy5nZXQobil9LFZuLnByb3RvdHlwZS5oYXM9ZnVuY3Rpb24obil7cmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKG4pfSxWbi5wcm90b3R5cGUuc2V0PWZ1bmN0aW9uKG4sdCl7dmFyIHI9dGhpcy5fX2RhdGFfXztpZihyIGluc3RhbmNlb2YgTm4pe3ZhciBlPXIuX19kYXRhX187aWYoIVppfHwxOTk+ZS5sZW5ndGgpcmV0dXJuIGUucHVzaChbbix0XSksdGhpcy5zaXplPSsrci5zaXplLHRoaXM7cj10aGlzLl9fZGF0YV9fPW5ldyBQbihlKX1yZXR1cm4gci5zZXQobix0KSx0aGlzLnNpemU9ci5zaXplLHRoaXN9O3ZhciBvbz1acihFdCksZm89WnIoT3QsdHJ1ZSksY289cXIoKSxhbz1xcih0cnVlKSxsbz1IaT9mdW5jdGlvbihuLHQpe3JldHVybiBIaS5zZXQobix0KSxufTpOdSxzbz1FaT9mdW5jdGlvbihuLHQpe3JldHVybiBFaShuLFwidG9TdHJpbmdcIix7Y29uZmlndXJhYmxlOnRydWUsZW51bWVyYWJsZTpmYWxzZSx2YWx1ZTpGdSh0KSx3cml0YWJsZTp0cnVlfSl9Ok51LGhvPU9pfHxmdW5jdGlvbihuKXtcbnJldHVybiBabi5jbGVhclRpbWVvdXQobil9LHBvPVZpJiYxL0QobmV3IFZpKFssLTBdKSlbMV09PU4/ZnVuY3Rpb24obil7cmV0dXJuIG5ldyBWaShuKX06cXUsX289SGk/ZnVuY3Rpb24obil7cmV0dXJuIEhpLmdldChuKX06cXUsdm89V2k/ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/W106KG49bmkobiksZihXaShuKSxmdW5jdGlvbih0KXtyZXR1cm4gamkuY2FsbChuLHQpfSkpfTpLdSxnbz1XaT9mdW5jdGlvbihuKXtmb3IodmFyIHQ9W107bjspcyh0LHZvKG4pKSxuPWJpKG4pO3JldHVybiB0fTpLdSx5bz16dDsoUGkmJlwiW29iamVjdCBEYXRhVmlld11cIiE9eW8obmV3IFBpKG5ldyBBcnJheUJ1ZmZlcigxKSkpfHxaaSYmXCJbb2JqZWN0IE1hcF1cIiE9eW8obmV3IFppKXx8cWkmJlwiW29iamVjdCBQcm9taXNlXVwiIT15byhxaS5yZXNvbHZlKCkpfHxWaSYmXCJbb2JqZWN0IFNldF1cIiE9eW8obmV3IFZpKXx8S2kmJlwiW29iamVjdCBXZWFrTWFwXVwiIT15byhuZXcgS2kpKSYmKHlvPWZ1bmN0aW9uKG4pe1xudmFyIHQ9enQobik7aWYobj0obj1cIltvYmplY3QgT2JqZWN0XVwiPT10P24uY29uc3RydWN0b3I6Rik/RmUobik6XCJcIilzd2l0Y2gobil7Y2FzZSBZaTpyZXR1cm5cIltvYmplY3QgRGF0YVZpZXddXCI7Y2FzZSBRaTpyZXR1cm5cIltvYmplY3QgTWFwXVwiO2Nhc2UgWGk6cmV0dXJuXCJbb2JqZWN0IFByb21pc2VdXCI7Y2FzZSBubzpyZXR1cm5cIltvYmplY3QgU2V0XVwiO2Nhc2UgdG86cmV0dXJuXCJbb2JqZWN0IFdlYWtNYXBdXCJ9cmV0dXJuIHR9KTt2YXIgYm89b2k/Z3U6R3UseG89TWUobG8pLGpvPUlpfHxmdW5jdGlvbihuLHQpe3JldHVybiBabi5zZXRUaW1lb3V0KG4sdCl9LHdvPU1lKHNvKSxtbz1mdW5jdGlvbihuKXtuPWx1KG4sZnVuY3Rpb24obil7cmV0dXJuIDUwMD09PXQuc2l6ZSYmdC5jbGVhcigpLG59KTt2YXIgdD1uLmNhY2hlO3JldHVybiBufShmdW5jdGlvbihuKXt2YXIgdD1bXTtyZXR1cm4gZW4udGVzdChuKSYmdC5wdXNoKFwiXCIpLG4ucmVwbGFjZSh1bixmdW5jdGlvbihuLHIsZSx1KXtcbnQucHVzaChlP3UucmVwbGFjZSh2bixcIiQxXCIpOnJ8fG4pfSksdH0pLEFvPWxyKGZ1bmN0aW9uKG4sdCl7cmV0dXJuIF91KG4pP2p0KG4sa3QodCwxLF91LHRydWUpKTpbXX0pLGtvPWxyKGZ1bmN0aW9uKG4sdCl7dmFyIHI9R2UodCk7cmV0dXJuIF91KHIpJiYocj1GKSxfdShuKT9qdChuLGt0KHQsMSxfdSx0cnVlKSxqZShyLDIpKTpbXX0pLEVvPWxyKGZ1bmN0aW9uKG4sdCl7dmFyIHI9R2UodCk7cmV0dXJuIF91KHIpJiYocj1GKSxfdShuKT9qdChuLGt0KHQsMSxfdSx0cnVlKSxGLHIpOltdfSksT289bHIoZnVuY3Rpb24obil7dmFyIHQ9bChuLFNyKTtyZXR1cm4gdC5sZW5ndGgmJnRbMF09PT1uWzBdP1V0KHQpOltdfSksU289bHIoZnVuY3Rpb24obil7dmFyIHQ9R2Uobikscj1sKG4sU3IpO3JldHVybiB0PT09R2Uocik/dD1GOnIucG9wKCksci5sZW5ndGgmJnJbMF09PT1uWzBdP1V0KHIsamUodCwyKSk6W119KSxJbz1scihmdW5jdGlvbihuKXt2YXIgdD1HZShuKSxyPWwobixTcik7cmV0dXJuKHQ9dHlwZW9mIHQ9PVwiZnVuY3Rpb25cIj90OkYpJiZyLnBvcCgpLFxuci5sZW5ndGgmJnJbMF09PT1uWzBdP1V0KHIsRix0KTpbXX0pLFJvPWxyKEhlKSx6bz1nZShmdW5jdGlvbihuLHQpe3ZhciByPW51bGw9PW4/MDpuLmxlbmd0aCxlPXZ0KG4sdCk7cmV0dXJuIGZyKG4sbCh0LGZ1bmN0aW9uKG4pe3JldHVybiBSZShuLHIpPytuOm59KS5zb3J0KFVyKSksZX0pLFdvPWxyKGZ1bmN0aW9uKG4pe3JldHVybiB3cihrdChuLDEsX3UsdHJ1ZSkpfSksQm89bHIoZnVuY3Rpb24obil7dmFyIHQ9R2Uobik7cmV0dXJuIF91KHQpJiYodD1GKSx3cihrdChuLDEsX3UsdHJ1ZSksamUodCwyKSl9KSxMbz1scihmdW5jdGlvbihuKXt2YXIgdD1HZShuKSx0PXR5cGVvZiB0PT1cImZ1bmN0aW9uXCI/dDpGO3JldHVybiB3cihrdChuLDEsX3UsdHJ1ZSksRix0KX0pLFVvPWxyKGZ1bmN0aW9uKG4sdCl7cmV0dXJuIF91KG4pP2p0KG4sdCk6W119KSxDbz1scihmdW5jdGlvbihuKXtyZXR1cm4gRXIoZihuLF91KSl9KSxEbz1scihmdW5jdGlvbihuKXt2YXIgdD1HZShuKTtyZXR1cm4gX3UodCkmJih0PUYpLFxuRXIoZihuLF91KSxqZSh0LDIpKX0pLE1vPWxyKGZ1bmN0aW9uKG4pe3ZhciB0PUdlKG4pLHQ9dHlwZW9mIHQ9PVwiZnVuY3Rpb25cIj90OkY7cmV0dXJuIEVyKGYobixfdSksRix0KX0pLFRvPWxyKFllKSwkbz1scihmdW5jdGlvbihuKXt2YXIgdD1uLmxlbmd0aCx0PTE8dD9uW3QtMV06Rix0PXR5cGVvZiB0PT1cImZ1bmN0aW9uXCI/KG4ucG9wKCksdCk6RjtyZXR1cm4gUWUobix0KX0pLEZvPWdlKGZ1bmN0aW9uKG4pe2Z1bmN0aW9uIHQodCl7cmV0dXJuIHZ0KHQsbil9dmFyIHI9bi5sZW5ndGgsZT1yP25bMF06MCx1PXRoaXMuX193cmFwcGVkX187cmV0dXJuISgxPHJ8fHRoaXMuX19hY3Rpb25zX18ubGVuZ3RoKSYmdSBpbnN0YW5jZW9mIE1uJiZSZShlKT8odT11LnNsaWNlKGUsK2UrKHI/MTowKSksdS5fX2FjdGlvbnNfXy5wdXNoKHtmdW5jOm51LGFyZ3M6W3RdLHRoaXNBcmc6Rn0pLG5ldyB6bih1LHRoaXMuX19jaGFpbl9fKS50aHJ1KGZ1bmN0aW9uKG4pe3JldHVybiByJiYhbi5sZW5ndGgmJm4ucHVzaChGKSxcbm59KSk6dGhpcy50aHJ1KHQpfSksTm89TnIoZnVuY3Rpb24obix0LHIpe2NpLmNhbGwobixyKT8rK25bcl06X3QobixyLDEpfSksUG89WXIoWmUpLFpvPVlyKHFlKSxxbz1OcihmdW5jdGlvbihuLHQscil7Y2kuY2FsbChuLHIpP25bcl0ucHVzaCh0KTpfdChuLHIsW3RdKX0pLFZvPWxyKGZ1bmN0aW9uKG4sdCxlKXt2YXIgdT0tMSxpPXR5cGVvZiB0PT1cImZ1bmN0aW9uXCIsbz1wdShuKT9IdShuLmxlbmd0aCk6W107cmV0dXJuIG9vKG4sZnVuY3Rpb24obil7b1srK3VdPWk/cih0LG4sZSk6RHQobix0LGUpfSksb30pLEtvPU5yKGZ1bmN0aW9uKG4sdCxyKXtfdChuLHIsdCl9KSxHbz1OcihmdW5jdGlvbihuLHQscil7bltyPzA6MV0ucHVzaCh0KX0sZnVuY3Rpb24oKXtyZXR1cm5bW10sW11dfSksSG89bHIoZnVuY3Rpb24obix0KXtpZihudWxsPT1uKXJldHVybltdO3ZhciByPXQubGVuZ3RoO3JldHVybiAxPHImJnplKG4sdFswXSx0WzFdKT90PVtdOjI8ciYmemUodFswXSx0WzFdLHRbMl0pJiYodD1bdFswXV0pLFxucnIobixrdCh0LDEpLFtdKX0pLEpvPVNpfHxmdW5jdGlvbigpe3JldHVybiBabi5EYXRlLm5vdygpfSxZbz1scihmdW5jdGlvbihuLHQscil7dmFyIGU9MTtpZihyLmxlbmd0aCl2YXIgdT1DKHIseGUoWW8pKSxlPTMyfGU7cmV0dXJuIGxlKG4sZSx0LHIsdSl9KSxRbz1scihmdW5jdGlvbihuLHQscil7dmFyIGU9MztpZihyLmxlbmd0aCl2YXIgdT1DKHIseGUoUW8pKSxlPTMyfGU7cmV0dXJuIGxlKHQsZSxuLHIsdSl9KSxYbz1scihmdW5jdGlvbihuLHQpe3JldHVybiB4dChuLDEsdCl9KSxuZj1scihmdW5jdGlvbihuLHQscil7cmV0dXJuIHh0KG4sSXUodCl8fDAscil9KTtsdS5DYWNoZT1Qbjt2YXIgdGY9bHIoZnVuY3Rpb24obix0KXt0PTE9PXQubGVuZ3RoJiZhZih0WzBdKT9sKHRbMF0sUyhqZSgpKSk6bChrdCh0LDEpLFMoamUoKSkpO3ZhciBlPXQubGVuZ3RoO3JldHVybiBscihmdW5jdGlvbih1KXtmb3IodmFyIGk9LTEsbz1NaSh1Lmxlbmd0aCxlKTsrK2k8bzspdVtpXT10W2ldLmNhbGwodGhpcyx1W2ldKTtcbnJldHVybiByKG4sdGhpcyx1KX0pfSkscmY9bHIoZnVuY3Rpb24obix0KXtyZXR1cm4gbGUobiwzMixGLHQsQyh0LHhlKHJmKSkpfSksZWY9bHIoZnVuY3Rpb24obix0KXtyZXR1cm4gbGUobiw2NCxGLHQsQyh0LHhlKGVmKSkpfSksdWY9Z2UoZnVuY3Rpb24obix0KXtyZXR1cm4gbGUobiwyNTYsRixGLEYsdCl9KSxvZj1vZShXdCksZmY9b2UoZnVuY3Rpb24obix0KXtyZXR1cm4gbj49dH0pLGNmPU10KGZ1bmN0aW9uKCl7cmV0dXJuIGFyZ3VtZW50c30oKSk/TXQ6ZnVuY3Rpb24obil7cmV0dXJuIHh1KG4pJiZjaS5jYWxsKG4sXCJjYWxsZWVcIikmJiFqaS5jYWxsKG4sXCJjYWxsZWVcIil9LGFmPUh1LmlzQXJyYXksbGY9SG4/UyhIbik6VHQsc2Y9Qml8fEd1LGhmPUpuP1MoSm4pOiR0LHBmPVluP1MoWW4pOk50LF9mPVFuP1MoUW4pOnF0LHZmPVhuP1MoWG4pOlZ0LGdmPW50P1MobnQpOkt0LGRmPW9lKEp0KSx5Zj1vZShmdW5jdGlvbihuLHQpe3JldHVybiBuPD10fSksYmY9UHIoZnVuY3Rpb24obix0KXtcbmlmKExlKHQpfHxwdSh0KSlUcih0LEx1KHQpLG4pO2Vsc2UgZm9yKHZhciByIGluIHQpY2kuY2FsbCh0LHIpJiZhdChuLHIsdFtyXSl9KSx4Zj1QcihmdW5jdGlvbihuLHQpe1RyKHQsVXUodCksbil9KSxqZj1QcihmdW5jdGlvbihuLHQscixlKXtUcih0LFV1KHQpLG4sZSl9KSx3Zj1QcihmdW5jdGlvbihuLHQscixlKXtUcih0LEx1KHQpLG4sZSl9KSxtZj1nZSh2dCksQWY9bHIoZnVuY3Rpb24obil7cmV0dXJuIG4ucHVzaChGLHNlKSxyKGpmLEYsbil9KSxrZj1scihmdW5jdGlvbihuKXtyZXR1cm4gbi5wdXNoKEYsaGUpLHIoUmYsRixuKX0pLEVmPW5lKGZ1bmN0aW9uKG4sdCxyKXtuW3RdPXJ9LEZ1KE51KSksT2Y9bmUoZnVuY3Rpb24obix0LHIpe2NpLmNhbGwobix0KT9uW3RdLnB1c2gocik6blt0XT1bcl19LGplKSxTZj1scihEdCksSWY9UHIoZnVuY3Rpb24obix0LHIpe25yKG4sdCxyKX0pLFJmPVByKGZ1bmN0aW9uKG4sdCxyLGUpe25yKG4sdCxyLGUpfSksemY9Z2UoZnVuY3Rpb24obix0KXtcbnZhciByPXt9O2lmKG51bGw9PW4pcmV0dXJuIHI7dmFyIGU9ZmFsc2U7dD1sKHQsZnVuY3Rpb24odCl7cmV0dXJuIHQ9UnIodCxuKSxlfHwoZT0xPHQubGVuZ3RoKSx0fSksVHIobix5ZShuKSxyKSxlJiYocj1kdChyLDcscGUpKTtmb3IodmFyIHU9dC5sZW5ndGg7dS0tOyltcihyLHRbdV0pO3JldHVybiByfSksV2Y9Z2UoZnVuY3Rpb24obix0KXtyZXR1cm4gbnVsbD09bj97fTplcihuLHQpfSksQmY9YWUoTHUpLExmPWFlKFV1KSxVZj1HcihmdW5jdGlvbihuLHQscil7cmV0dXJuIHQ9dC50b0xvd2VyQ2FzZSgpLG4rKHI/TXUodCk6dCl9KSxDZj1HcihmdW5jdGlvbihuLHQscil7cmV0dXJuIG4rKHI/XCItXCI6XCJcIikrdC50b0xvd2VyQ2FzZSgpfSksRGY9R3IoZnVuY3Rpb24obix0LHIpe3JldHVybiBuKyhyP1wiIFwiOlwiXCIpK3QudG9Mb3dlckNhc2UoKX0pLE1mPUtyKFwidG9Mb3dlckNhc2VcIiksVGY9R3IoZnVuY3Rpb24obix0LHIpe3JldHVybiBuKyhyP1wiX1wiOlwiXCIpK3QudG9Mb3dlckNhc2UoKTtcbn0pLCRmPUdyKGZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gbisocj9cIiBcIjpcIlwiKStOZih0KX0pLEZmPUdyKGZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gbisocj9cIiBcIjpcIlwiKSt0LnRvVXBwZXJDYXNlKCl9KSxOZj1LcihcInRvVXBwZXJDYXNlXCIpLFBmPWxyKGZ1bmN0aW9uKG4sdCl7dHJ5e3JldHVybiByKG4sRix0KX1jYXRjaChuKXtyZXR1cm4gdnUobik/bjpuZXcgWXUobil9fSksWmY9Z2UoZnVuY3Rpb24obix0KXtyZXR1cm4gdSh0LGZ1bmN0aW9uKHQpe3Q9JGUodCksX3Qobix0LFlvKG5bdF0sbikpfSksbn0pLHFmPVFyKCksVmY9UXIodHJ1ZSksS2Y9bHIoZnVuY3Rpb24obix0KXtyZXR1cm4gZnVuY3Rpb24ocil7cmV0dXJuIER0KHIsbix0KX19KSxHZj1scihmdW5jdGlvbihuLHQpe3JldHVybiBmdW5jdGlvbihyKXtyZXR1cm4gRHQobixyLHQpfX0pLEhmPXJlKGwpLEpmPXJlKG8pLFlmPXJlKF8pLFFmPWllKCksWGY9aWUodHJ1ZSksbmM9dGUoZnVuY3Rpb24obix0KXtyZXR1cm4gbit0fSwwKSx0Yz1jZShcImNlaWxcIikscmM9dGUoZnVuY3Rpb24obix0KXtcbnJldHVybiBuL3R9LDEpLGVjPWNlKFwiZmxvb3JcIiksdWM9dGUoZnVuY3Rpb24obix0KXtyZXR1cm4gbip0fSwxKSxpYz1jZShcInJvdW5kXCIpLG9jPXRlKGZ1bmN0aW9uKG4sdCl7cmV0dXJuIG4tdH0sMCk7cmV0dXJuIE9uLmFmdGVyPWZ1bmN0aW9uKG4sdCl7aWYodHlwZW9mIHQhPVwiZnVuY3Rpb25cIil0aHJvdyBuZXcgZWkoXCJFeHBlY3RlZCBhIGZ1bmN0aW9uXCIpO3JldHVybiBuPU91KG4pLGZ1bmN0aW9uKCl7aWYoMT4tLW4pcmV0dXJuIHQuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0sT24uYXJ5PWl1LE9uLmFzc2lnbj1iZixPbi5hc3NpZ25Jbj14ZixPbi5hc3NpZ25JbldpdGg9amYsT24uYXNzaWduV2l0aD13ZixPbi5hdD1tZixPbi5iZWZvcmU9b3UsT24uYmluZD1ZbyxPbi5iaW5kQWxsPVpmLE9uLmJpbmRLZXk9UW8sT24uY2FzdEFycmF5PWZ1bmN0aW9uKCl7aWYoIWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuW107dmFyIG49YXJndW1lbnRzWzBdO3JldHVybiBhZihuKT9uOltuXX0sXG5Pbi5jaGFpbj1YZSxPbi5jaHVuaz1mdW5jdGlvbihuLHQscil7aWYodD0ocj96ZShuLHQscik6dD09PUYpPzE6RGkoT3UodCksMCkscj1udWxsPT1uPzA6bi5sZW5ndGgsIXJ8fDE+dClyZXR1cm5bXTtmb3IodmFyIGU9MCx1PTAsaT1IdShSaShyL3QpKTtlPHI7KWlbdSsrXT12cihuLGUsZSs9dCk7cmV0dXJuIGl9LE9uLmNvbXBhY3Q9ZnVuY3Rpb24obil7Zm9yKHZhciB0PS0xLHI9bnVsbD09bj8wOm4ubGVuZ3RoLGU9MCx1PVtdOysrdDxyOyl7dmFyIGk9blt0XTtpJiYodVtlKytdPWkpfXJldHVybiB1fSxPbi5jb25jYXQ9ZnVuY3Rpb24oKXt2YXIgbj1hcmd1bWVudHMubGVuZ3RoO2lmKCFuKXJldHVybltdO2Zvcih2YXIgdD1IdShuLTEpLHI9YXJndW1lbnRzWzBdO24tLTspdFtuLTFdPWFyZ3VtZW50c1tuXTtyZXR1cm4gcyhhZihyKT9NcihyKTpbcl0sa3QodCwxKSl9LE9uLmNvbmQ9ZnVuY3Rpb24obil7dmFyIHQ9bnVsbD09bj8wOm4ubGVuZ3RoLGU9amUoKTtyZXR1cm4gbj10P2wobixmdW5jdGlvbihuKXtcbmlmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIG5bMV0pdGhyb3cgbmV3IGVpKFwiRXhwZWN0ZWQgYSBmdW5jdGlvblwiKTtyZXR1cm5bZShuWzBdKSxuWzFdXX0pOltdLGxyKGZ1bmN0aW9uKGUpe2Zvcih2YXIgdT0tMTsrK3U8dDspe3ZhciBpPW5bdV07aWYocihpWzBdLHRoaXMsZSkpcmV0dXJuIHIoaVsxXSx0aGlzLGUpfX0pfSxPbi5jb25mb3Jtcz1mdW5jdGlvbihuKXtyZXR1cm4geXQoZHQobiwxKSl9LE9uLmNvbnN0YW50PUZ1LE9uLmNvdW50Qnk9Tm8sT24uY3JlYXRlPWZ1bmN0aW9uKG4sdCl7dmFyIHI9aW8obik7cmV0dXJuIG51bGw9PXQ/cjpodChyLHQpfSxPbi5jdXJyeT1mdSxPbi5jdXJyeVJpZ2h0PWN1LE9uLmRlYm91bmNlPWF1LE9uLmRlZmF1bHRzPUFmLE9uLmRlZmF1bHRzRGVlcD1rZixPbi5kZWZlcj1YbyxPbi5kZWxheT1uZixPbi5kaWZmZXJlbmNlPUFvLE9uLmRpZmZlcmVuY2VCeT1rbyxPbi5kaWZmZXJlbmNlV2l0aD1FbyxPbi5kcm9wPWZ1bmN0aW9uKG4sdCxyKXt2YXIgZT1udWxsPT1uPzA6bi5sZW5ndGg7XG5yZXR1cm4gZT8odD1yfHx0PT09Rj8xOk91KHQpLHZyKG4sMD50PzA6dCxlKSk6W119LE9uLmRyb3BSaWdodD1mdW5jdGlvbihuLHQscil7dmFyIGU9bnVsbD09bj8wOm4ubGVuZ3RoO3JldHVybiBlPyh0PXJ8fHQ9PT1GPzE6T3UodCksdD1lLXQsdnIobiwwLDA+dD8wOnQpKTpbXX0sT24uZHJvcFJpZ2h0V2hpbGU9ZnVuY3Rpb24obix0KXtyZXR1cm4gbiYmbi5sZW5ndGg/QXIobixqZSh0LDMpLHRydWUsdHJ1ZSk6W119LE9uLmRyb3BXaGlsZT1mdW5jdGlvbihuLHQpe3JldHVybiBuJiZuLmxlbmd0aD9BcihuLGplKHQsMyksdHJ1ZSk6W119LE9uLmZpbGw9ZnVuY3Rpb24obix0LHIsZSl7dmFyIHU9bnVsbD09bj8wOm4ubGVuZ3RoO2lmKCF1KXJldHVybltdO2ZvcihyJiZ0eXBlb2YgciE9XCJudW1iZXJcIiYmemUobix0LHIpJiYocj0wLGU9dSksdT1uLmxlbmd0aCxyPU91KHIpLDA+ciYmKHI9LXI+dT8wOnUrciksZT1lPT09Rnx8ZT51P3U6T3UoZSksMD5lJiYoZSs9dSksZT1yPmU/MDpTdShlKTtyPGU7KW5bcisrXT10O1xucmV0dXJuIG59LE9uLmZpbHRlcj1mdW5jdGlvbihuLHQpe3JldHVybihhZihuKT9mOkF0KShuLGplKHQsMykpfSxPbi5mbGF0TWFwPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIGt0KHV1KG4sdCksMSl9LE9uLmZsYXRNYXBEZWVwPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIGt0KHV1KG4sdCksTil9LE9uLmZsYXRNYXBEZXB0aD1mdW5jdGlvbihuLHQscil7cmV0dXJuIHI9cj09PUY/MTpPdShyKSxrdCh1dShuLHQpLHIpfSxPbi5mbGF0dGVuPVZlLE9uLmZsYXR0ZW5EZWVwPWZ1bmN0aW9uKG4pe3JldHVybihudWxsPT1uPzA6bi5sZW5ndGgpP2t0KG4sTik6W119LE9uLmZsYXR0ZW5EZXB0aD1mdW5jdGlvbihuLHQpe3JldHVybiBudWxsIT1uJiZuLmxlbmd0aD8odD10PT09Rj8xOk91KHQpLGt0KG4sdCkpOltdfSxPbi5mbGlwPWZ1bmN0aW9uKG4pe3JldHVybiBsZShuLDUxMil9LE9uLmZsb3c9cWYsT24uZmxvd1JpZ2h0PVZmLE9uLmZyb21QYWlycz1mdW5jdGlvbihuKXtmb3IodmFyIHQ9LTEscj1udWxsPT1uPzA6bi5sZW5ndGgsZT17fTsrK3Q8cjspe1xudmFyIHU9blt0XTtlW3VbMF1dPXVbMV19cmV0dXJuIGV9LE9uLmZ1bmN0aW9ucz1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bj9bXTpTdChuLEx1KG4pKX0sT24uZnVuY3Rpb25zSW49ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/W106U3QobixVdShuKSl9LE9uLmdyb3VwQnk9cW8sT24uaW5pdGlhbD1mdW5jdGlvbihuKXtyZXR1cm4obnVsbD09bj8wOm4ubGVuZ3RoKT92cihuLDAsLTEpOltdfSxPbi5pbnRlcnNlY3Rpb249T28sT24uaW50ZXJzZWN0aW9uQnk9U28sT24uaW50ZXJzZWN0aW9uV2l0aD1JbyxPbi5pbnZlcnQ9RWYsT24uaW52ZXJ0Qnk9T2YsT24uaW52b2tlTWFwPVZvLE9uLml0ZXJhdGVlPVB1LE9uLmtleUJ5PUtvLE9uLmtleXM9THUsT24ua2V5c0luPVV1LE9uLm1hcD11dSxPbi5tYXBLZXlzPWZ1bmN0aW9uKG4sdCl7dmFyIHI9e307cmV0dXJuIHQ9amUodCwzKSxFdChuLGZ1bmN0aW9uKG4sZSx1KXtfdChyLHQobixlLHUpLG4pfSkscn0sT24ubWFwVmFsdWVzPWZ1bmN0aW9uKG4sdCl7XG52YXIgcj17fTtyZXR1cm4gdD1qZSh0LDMpLEV0KG4sZnVuY3Rpb24obixlLHUpe190KHIsZSx0KG4sZSx1KSl9KSxyfSxPbi5tYXRjaGVzPWZ1bmN0aW9uKG4pe3JldHVybiBRdChkdChuLDEpKX0sT24ubWF0Y2hlc1Byb3BlcnR5PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIFh0KG4sZHQodCwxKSl9LE9uLm1lbW9pemU9bHUsT24ubWVyZ2U9SWYsT24ubWVyZ2VXaXRoPVJmLE9uLm1ldGhvZD1LZixPbi5tZXRob2RPZj1HZixPbi5taXhpbj1adSxPbi5uZWdhdGU9c3UsT24ubnRoQXJnPWZ1bmN0aW9uKG4pe3JldHVybiBuPU91KG4pLGxyKGZ1bmN0aW9uKHQpe3JldHVybiB0cih0LG4pfSl9LE9uLm9taXQ9emYsT24ub21pdEJ5PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIEN1KG4sc3UoamUodCkpKX0sT24ub25jZT1mdW5jdGlvbihuKXtyZXR1cm4gb3UoMixuKX0sT24ub3JkZXJCeT1mdW5jdGlvbihuLHQscixlKXtyZXR1cm4gbnVsbD09bj9bXTooYWYodCl8fCh0PW51bGw9PXQ/W106W3RdKSxcbnI9ZT9GOnIsYWYocil8fChyPW51bGw9PXI/W106W3JdKSxycihuLHQscikpfSxPbi5vdmVyPUhmLE9uLm92ZXJBcmdzPXRmLE9uLm92ZXJFdmVyeT1KZixPbi5vdmVyU29tZT1ZZixPbi5wYXJ0aWFsPXJmLE9uLnBhcnRpYWxSaWdodD1lZixPbi5wYXJ0aXRpb249R28sT24ucGljaz1XZixPbi5waWNrQnk9Q3UsT24ucHJvcGVydHk9VnUsT24ucHJvcGVydHlPZj1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIG51bGw9PW4/RjpJdChuLHQpfX0sT24ucHVsbD1SbyxPbi5wdWxsQWxsPUhlLE9uLnB1bGxBbGxCeT1mdW5jdGlvbihuLHQscil7cmV0dXJuIG4mJm4ubGVuZ3RoJiZ0JiZ0Lmxlbmd0aD9vcihuLHQsamUociwyKSk6bn0sT24ucHVsbEFsbFdpdGg9ZnVuY3Rpb24obix0LHIpe3JldHVybiBuJiZuLmxlbmd0aCYmdCYmdC5sZW5ndGg/b3Iobix0LEYscik6bn0sT24ucHVsbEF0PXpvLE9uLnJhbmdlPVFmLE9uLnJhbmdlUmlnaHQ9WGYsT24ucmVhcmc9dWYsT24ucmVqZWN0PWZ1bmN0aW9uKG4sdCl7XG5yZXR1cm4oYWYobik/ZjpBdCkobixzdShqZSh0LDMpKSl9LE9uLnJlbW92ZT1mdW5jdGlvbihuLHQpe3ZhciByPVtdO2lmKCFufHwhbi5sZW5ndGgpcmV0dXJuIHI7dmFyIGU9LTEsdT1bXSxpPW4ubGVuZ3RoO2Zvcih0PWplKHQsMyk7KytlPGk7KXt2YXIgbz1uW2VdO3QobyxlLG4pJiYoci5wdXNoKG8pLHUucHVzaChlKSl9cmV0dXJuIGZyKG4sdSkscn0sT24ucmVzdD1mdW5jdGlvbihuLHQpe2lmKHR5cGVvZiBuIT1cImZ1bmN0aW9uXCIpdGhyb3cgbmV3IGVpKFwiRXhwZWN0ZWQgYSBmdW5jdGlvblwiKTtyZXR1cm4gdD10PT09Rj90Ok91KHQpLGxyKG4sdCl9LE9uLnJldmVyc2U9SmUsT24uc2FtcGxlU2l6ZT1mdW5jdGlvbihuLHQscil7cmV0dXJuIHQ9KHI/emUobix0LHIpOnQ9PT1GKT8xOk91KHQpLChhZihuKT9vdDpocikobix0KX0sT24uc2V0PWZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gbnVsbD09bj9uOnByKG4sdCxyKX0sT24uc2V0V2l0aD1mdW5jdGlvbihuLHQscixlKXtyZXR1cm4gZT10eXBlb2YgZT09XCJmdW5jdGlvblwiP2U6Rixcbm51bGw9PW4/bjpwcihuLHQscixlKX0sT24uc2h1ZmZsZT1mdW5jdGlvbihuKXtyZXR1cm4oYWYobik/ZnQ6X3IpKG4pfSxPbi5zbGljZT1mdW5jdGlvbihuLHQscil7dmFyIGU9bnVsbD09bj8wOm4ubGVuZ3RoO3JldHVybiBlPyhyJiZ0eXBlb2YgciE9XCJudW1iZXJcIiYmemUobix0LHIpPyh0PTAscj1lKToodD1udWxsPT10PzA6T3UodCkscj1yPT09Rj9lOk91KHIpKSx2cihuLHQscikpOltdfSxPbi5zb3J0Qnk9SG8sT24uc29ydGVkVW5pcT1mdW5jdGlvbihuKXtyZXR1cm4gbiYmbi5sZW5ndGg/YnIobik6W119LE9uLnNvcnRlZFVuaXFCeT1mdW5jdGlvbihuLHQpe3JldHVybiBuJiZuLmxlbmd0aD9icihuLGplKHQsMikpOltdfSxPbi5zcGxpdD1mdW5jdGlvbihuLHQscil7cmV0dXJuIHImJnR5cGVvZiByIT1cIm51bWJlclwiJiZ6ZShuLHQscikmJih0PXI9Rikscj1yPT09Rj80Mjk0OTY3Mjk1OnI+Pj4wLHI/KG49enUobikpJiYodHlwZW9mIHQ9PVwic3RyaW5nXCJ8fG51bGwhPXQmJiFfZih0KSkmJih0PWpyKHQpLFxuIXQmJkJuLnRlc3QobikpP3pyKCQobiksMCxyKTpuLnNwbGl0KHQscik6W119LE9uLnNwcmVhZD1mdW5jdGlvbihuLHQpe2lmKHR5cGVvZiBuIT1cImZ1bmN0aW9uXCIpdGhyb3cgbmV3IGVpKFwiRXhwZWN0ZWQgYSBmdW5jdGlvblwiKTtyZXR1cm4gdD1udWxsPT10PzA6RGkoT3UodCksMCksbHIoZnVuY3Rpb24oZSl7dmFyIHU9ZVt0XTtyZXR1cm4gZT16cihlLDAsdCksdSYmcyhlLHUpLHIobix0aGlzLGUpfSl9LE9uLnRhaWw9ZnVuY3Rpb24obil7dmFyIHQ9bnVsbD09bj8wOm4ubGVuZ3RoO3JldHVybiB0P3ZyKG4sMSx0KTpbXX0sT24udGFrZT1mdW5jdGlvbihuLHQscil7cmV0dXJuIG4mJm4ubGVuZ3RoPyh0PXJ8fHQ9PT1GPzE6T3UodCksdnIobiwwLDA+dD8wOnQpKTpbXX0sT24udGFrZVJpZ2h0PWZ1bmN0aW9uKG4sdCxyKXt2YXIgZT1udWxsPT1uPzA6bi5sZW5ndGg7cmV0dXJuIGU/KHQ9cnx8dD09PUY/MTpPdSh0KSx0PWUtdCx2cihuLDA+dD8wOnQsZSkpOltdfSxPbi50YWtlUmlnaHRXaGlsZT1mdW5jdGlvbihuLHQpe1xucmV0dXJuIG4mJm4ubGVuZ3RoP0FyKG4samUodCwzKSxmYWxzZSx0cnVlKTpbXX0sT24udGFrZVdoaWxlPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG4mJm4ubGVuZ3RoP0FyKG4samUodCwzKSk6W119LE9uLnRhcD1mdW5jdGlvbihuLHQpe3JldHVybiB0KG4pLG59LE9uLnRocm90dGxlPWZ1bmN0aW9uKG4sdCxyKXt2YXIgZT10cnVlLHU9dHJ1ZTtpZih0eXBlb2YgbiE9XCJmdW5jdGlvblwiKXRocm93IG5ldyBlaShcIkV4cGVjdGVkIGEgZnVuY3Rpb25cIik7cmV0dXJuIGJ1KHIpJiYoZT1cImxlYWRpbmdcImluIHI/ISFyLmxlYWRpbmc6ZSx1PVwidHJhaWxpbmdcImluIHI/ISFyLnRyYWlsaW5nOnUpLGF1KG4sdCx7bGVhZGluZzplLG1heFdhaXQ6dCx0cmFpbGluZzp1fSl9LE9uLnRocnU9bnUsT24udG9BcnJheT1rdSxPbi50b1BhaXJzPUJmLE9uLnRvUGFpcnNJbj1MZixPbi50b1BhdGg9ZnVuY3Rpb24obil7cmV0dXJuIGFmKG4pP2wobiwkZSk6QXUobik/W25dOk1yKG1vKHp1KG4pKSl9LE9uLnRvUGxhaW5PYmplY3Q9UnUsXG5Pbi50cmFuc2Zvcm09ZnVuY3Rpb24obix0LHIpe3ZhciBlPWFmKG4pLGk9ZXx8c2Yobil8fGdmKG4pO2lmKHQ9amUodCw0KSxudWxsPT1yKXt2YXIgbz1uJiZuLmNvbnN0cnVjdG9yO3I9aT9lP25ldyBvOltdOmJ1KG4pJiZndShvKT9pbyhiaShuKSk6e319cmV0dXJuKGk/dTpFdCkobixmdW5jdGlvbihuLGUsdSl7cmV0dXJuIHQocixuLGUsdSl9KSxyfSxPbi51bmFyeT1mdW5jdGlvbihuKXtyZXR1cm4gaXUobiwxKX0sT24udW5pb249V28sT24udW5pb25CeT1CbyxPbi51bmlvbldpdGg9TG8sT24udW5pcT1mdW5jdGlvbihuKXtyZXR1cm4gbiYmbi5sZW5ndGg/d3Iobik6W119LE9uLnVuaXFCeT1mdW5jdGlvbihuLHQpe3JldHVybiBuJiZuLmxlbmd0aD93cihuLGplKHQsMikpOltdfSxPbi51bmlxV2l0aD1mdW5jdGlvbihuLHQpe3JldHVybiB0PXR5cGVvZiB0PT1cImZ1bmN0aW9uXCI/dDpGLG4mJm4ubGVuZ3RoP3dyKG4sRix0KTpbXX0sT24udW5zZXQ9ZnVuY3Rpb24obix0KXtyZXR1cm4gbnVsbD09bnx8bXIobix0KTtcbn0sT24udW56aXA9WWUsT24udW56aXBXaXRoPVFlLE9uLnVwZGF0ZT1mdW5jdGlvbihuLHQscil7cmV0dXJuIG51bGw9PW4/bjpwcihuLHQsSXIocikoSXQobix0KSksdm9pZCAwKX0sT24udXBkYXRlV2l0aD1mdW5jdGlvbihuLHQscixlKXtyZXR1cm4gZT10eXBlb2YgZT09XCJmdW5jdGlvblwiP2U6RixudWxsIT1uJiYobj1wcihuLHQsSXIocikoSXQobix0KSksZSkpLG59LE9uLnZhbHVlcz1EdSxPbi52YWx1ZXNJbj1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bj9bXTpJKG4sVXUobikpfSxPbi53aXRob3V0PVVvLE9uLndvcmRzPSR1LE9uLndyYXA9ZnVuY3Rpb24obix0KXtyZXR1cm4gcmYoSXIodCksbil9LE9uLnhvcj1DbyxPbi54b3JCeT1EbyxPbi54b3JXaXRoPU1vLE9uLnppcD1UbyxPbi56aXBPYmplY3Q9ZnVuY3Rpb24obix0KXtyZXR1cm4gT3Iobnx8W10sdHx8W10sYXQpfSxPbi56aXBPYmplY3REZWVwPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIE9yKG58fFtdLHR8fFtdLHByKTtcbn0sT24uemlwV2l0aD0kbyxPbi5lbnRyaWVzPUJmLE9uLmVudHJpZXNJbj1MZixPbi5leHRlbmQ9eGYsT24uZXh0ZW5kV2l0aD1qZixadShPbixPbiksT24uYWRkPW5jLE9uLmF0dGVtcHQ9UGYsT24uY2FtZWxDYXNlPVVmLE9uLmNhcGl0YWxpemU9TXUsT24uY2VpbD10YyxPbi5jbGFtcD1mdW5jdGlvbihuLHQscil7cmV0dXJuIHI9PT1GJiYocj10LHQ9RiksciE9PUYmJihyPUl1KHIpLHI9cj09PXI/cjowKSx0IT09RiYmKHQ9SXUodCksdD10PT09dD90OjApLGd0KEl1KG4pLHQscil9LE9uLmNsb25lPWZ1bmN0aW9uKG4pe3JldHVybiBkdChuLDQpfSxPbi5jbG9uZURlZXA9ZnVuY3Rpb24obil7cmV0dXJuIGR0KG4sNSl9LE9uLmNsb25lRGVlcFdpdGg9ZnVuY3Rpb24obix0KXtyZXR1cm4gdD10eXBlb2YgdD09XCJmdW5jdGlvblwiP3Q6RixkdChuLDUsdCl9LE9uLmNsb25lV2l0aD1mdW5jdGlvbihuLHQpe3JldHVybiB0PXR5cGVvZiB0PT1cImZ1bmN0aW9uXCI/dDpGLGR0KG4sNCx0KX0sXG5Pbi5jb25mb3Jtc1RvPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG51bGw9PXR8fGJ0KG4sdCxMdSh0KSl9LE9uLmRlYnVycj1UdSxPbi5kZWZhdWx0VG89ZnVuY3Rpb24obix0KXtyZXR1cm4gbnVsbD09bnx8biE9PW4/dDpufSxPbi5kaXZpZGU9cmMsT24uZW5kc1dpdGg9ZnVuY3Rpb24obix0LHIpe249enUobiksdD1qcih0KTt2YXIgZT1uLmxlbmd0aCxlPXI9cj09PUY/ZTpndChPdShyKSwwLGUpO3JldHVybiByLT10Lmxlbmd0aCwwPD1yJiZuLnNsaWNlKHIsZSk9PXR9LE9uLmVxPWh1LE9uLmVzY2FwZT1mdW5jdGlvbihuKXtyZXR1cm4obj16dShuKSkmJlkudGVzdChuKT9uLnJlcGxhY2UoSCxldCk6bn0sT24uZXNjYXBlUmVnRXhwPWZ1bmN0aW9uKG4pe3JldHVybihuPXp1KG4pKSYmZm4udGVzdChuKT9uLnJlcGxhY2Uob24sXCJcXFxcJCZcIik6bn0sT24uZXZlcnk9ZnVuY3Rpb24obix0LHIpe3ZhciBlPWFmKG4pP286d3Q7cmV0dXJuIHImJnplKG4sdCxyKSYmKHQ9RiksZShuLGplKHQsMykpO1xufSxPbi5maW5kPVBvLE9uLmZpbmRJbmRleD1aZSxPbi5maW5kS2V5PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIHYobixqZSh0LDMpLEV0KX0sT24uZmluZExhc3Q9Wm8sT24uZmluZExhc3RJbmRleD1xZSxPbi5maW5kTGFzdEtleT1mdW5jdGlvbihuLHQpe3JldHVybiB2KG4samUodCwzKSxPdCl9LE9uLmZsb29yPWVjLE9uLmZvckVhY2g9cnUsT24uZm9yRWFjaFJpZ2h0PWV1LE9uLmZvckluPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG51bGw9PW4/bjpjbyhuLGplKHQsMyksVXUpfSxPbi5mb3JJblJpZ2h0PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG51bGw9PW4/bjphbyhuLGplKHQsMyksVXUpfSxPbi5mb3JPd249ZnVuY3Rpb24obix0KXtyZXR1cm4gbiYmRXQobixqZSh0LDMpKX0sT24uZm9yT3duUmlnaHQ9ZnVuY3Rpb24obix0KXtyZXR1cm4gbiYmT3QobixqZSh0LDMpKX0sT24uZ2V0PVd1LE9uLmd0PW9mLE9uLmd0ZT1mZixPbi5oYXM9ZnVuY3Rpb24obix0KXtyZXR1cm4gbnVsbCE9biYma2Uobix0LEJ0KTtcbn0sT24uaGFzSW49QnUsT24uaGVhZD1LZSxPbi5pZGVudGl0eT1OdSxPbi5pbmNsdWRlcz1mdW5jdGlvbihuLHQscixlKXtyZXR1cm4gbj1wdShuKT9uOkR1KG4pLHI9ciYmIWU/T3Uocik6MCxlPW4ubGVuZ3RoLDA+ciYmKHI9RGkoZStyLDApKSxtdShuKT9yPD1lJiYtMTxuLmluZGV4T2YodCxyKTohIWUmJi0xPGQobix0LHIpfSxPbi5pbmRleE9mPWZ1bmN0aW9uKG4sdCxyKXt2YXIgZT1udWxsPT1uPzA6bi5sZW5ndGg7cmV0dXJuIGU/KHI9bnVsbD09cj8wOk91KHIpLDA+ciYmKHI9RGkoZStyLDApKSxkKG4sdCxyKSk6LTF9LE9uLmluUmFuZ2U9ZnVuY3Rpb24obix0LHIpe3JldHVybiB0PUV1KHQpLHI9PT1GPyhyPXQsdD0wKTpyPUV1KHIpLG49SXUobiksbj49TWkodCxyKSYmbjxEaSh0LHIpfSxPbi5pbnZva2U9U2YsT24uaXNBcmd1bWVudHM9Y2YsT24uaXNBcnJheT1hZixPbi5pc0FycmF5QnVmZmVyPWxmLE9uLmlzQXJyYXlMaWtlPXB1LE9uLmlzQXJyYXlMaWtlT2JqZWN0PV91LFxuT24uaXNCb29sZWFuPWZ1bmN0aW9uKG4pe3JldHVybiB0cnVlPT09bnx8ZmFsc2U9PT1ufHx4dShuKSYmXCJbb2JqZWN0IEJvb2xlYW5dXCI9PXp0KG4pfSxPbi5pc0J1ZmZlcj1zZixPbi5pc0RhdGU9aGYsT24uaXNFbGVtZW50PWZ1bmN0aW9uKG4pe3JldHVybiB4dShuKSYmMT09PW4ubm9kZVR5cGUmJiF3dShuKX0sT24uaXNFbXB0eT1mdW5jdGlvbihuKXtpZihudWxsPT1uKXJldHVybiB0cnVlO2lmKHB1KG4pJiYoYWYobil8fHR5cGVvZiBuPT1cInN0cmluZ1wifHx0eXBlb2Ygbi5zcGxpY2U9PVwiZnVuY3Rpb25cInx8c2Yobil8fGdmKG4pfHxjZihuKSkpcmV0dXJuIW4ubGVuZ3RoO3ZhciB0PXlvKG4pO2lmKFwiW29iamVjdCBNYXBdXCI9PXR8fFwiW29iamVjdCBTZXRdXCI9PXQpcmV0dXJuIW4uc2l6ZTtpZihMZShuKSlyZXR1cm4hSHQobikubGVuZ3RoO2Zvcih2YXIgciBpbiBuKWlmKGNpLmNhbGwobixyKSlyZXR1cm4gZmFsc2U7cmV0dXJuIHRydWV9LE9uLmlzRXF1YWw9ZnVuY3Rpb24obix0KXtyZXR1cm4gRnQobix0KTtcbn0sT24uaXNFcXVhbFdpdGg9ZnVuY3Rpb24obix0LHIpe3ZhciBlPShyPXR5cGVvZiByPT1cImZ1bmN0aW9uXCI/cjpGKT9yKG4sdCk6RjtyZXR1cm4gZT09PUY/RnQobix0LEYscik6ISFlfSxPbi5pc0Vycm9yPXZ1LE9uLmlzRmluaXRlPWZ1bmN0aW9uKG4pe3JldHVybiB0eXBlb2Ygbj09XCJudW1iZXJcIiYmTGkobil9LE9uLmlzRnVuY3Rpb249Z3UsT24uaXNJbnRlZ2VyPWR1LE9uLmlzTGVuZ3RoPXl1LE9uLmlzTWFwPXBmLE9uLmlzTWF0Y2g9ZnVuY3Rpb24obix0KXtyZXR1cm4gbj09PXR8fFB0KG4sdCxtZSh0KSl9LE9uLmlzTWF0Y2hXaXRoPWZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gcj10eXBlb2Ygcj09XCJmdW5jdGlvblwiP3I6RixQdChuLHQsbWUodCkscil9LE9uLmlzTmFOPWZ1bmN0aW9uKG4pe3JldHVybiBqdShuKSYmbiE9K259LE9uLmlzTmF0aXZlPWZ1bmN0aW9uKG4pe2lmKGJvKG4pKXRocm93IG5ldyBZdShcIlVuc3VwcG9ydGVkIGNvcmUtanMgdXNlLiBUcnkgaHR0cHM6Ly9ucG1zLmlvL3NlYXJjaD9xPXBvbnlmaWxsLlwiKTtcbnJldHVybiBadChuKX0sT24uaXNOaWw9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW59LE9uLmlzTnVsbD1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09PW59LE9uLmlzTnVtYmVyPWp1LE9uLmlzT2JqZWN0PWJ1LE9uLmlzT2JqZWN0TGlrZT14dSxPbi5pc1BsYWluT2JqZWN0PXd1LE9uLmlzUmVnRXhwPV9mLE9uLmlzU2FmZUludGVnZXI9ZnVuY3Rpb24obil7cmV0dXJuIGR1KG4pJiYtOTAwNzE5OTI1NDc0MDk5MTw9biYmOTAwNzE5OTI1NDc0MDk5MT49bn0sT24uaXNTZXQ9dmYsT24uaXNTdHJpbmc9bXUsT24uaXNTeW1ib2w9QXUsT24uaXNUeXBlZEFycmF5PWdmLE9uLmlzVW5kZWZpbmVkPWZ1bmN0aW9uKG4pe3JldHVybiBuPT09Rn0sT24uaXNXZWFrTWFwPWZ1bmN0aW9uKG4pe3JldHVybiB4dShuKSYmXCJbb2JqZWN0IFdlYWtNYXBdXCI9PXlvKG4pfSxPbi5pc1dlYWtTZXQ9ZnVuY3Rpb24obil7cmV0dXJuIHh1KG4pJiZcIltvYmplY3QgV2Vha1NldF1cIj09enQobil9LE9uLmpvaW49ZnVuY3Rpb24obix0KXtcbnJldHVybiBudWxsPT1uP1wiXCI6VWkuY2FsbChuLHQpfSxPbi5rZWJhYkNhc2U9Q2YsT24ubGFzdD1HZSxPbi5sYXN0SW5kZXhPZj1mdW5jdGlvbihuLHQscil7dmFyIGU9bnVsbD09bj8wOm4ubGVuZ3RoO2lmKCFlKXJldHVybi0xO3ZhciB1PWU7aWYociE9PUYmJih1PU91KHIpLHU9MD51P0RpKGUrdSwwKTpNaSh1LGUtMSkpLHQ9PT10KXtmb3Iocj11KzE7ci0tJiZuW3JdIT09dDspO249cn1lbHNlIG49ZyhuLGIsdSx0cnVlKTtyZXR1cm4gbn0sT24ubG93ZXJDYXNlPURmLE9uLmxvd2VyRmlyc3Q9TWYsT24ubHQ9ZGYsT24ubHRlPXlmLE9uLm1heD1mdW5jdGlvbihuKXtyZXR1cm4gbiYmbi5sZW5ndGg/bXQobixOdSxXdCk6Rn0sT24ubWF4Qnk9ZnVuY3Rpb24obix0KXtyZXR1cm4gbiYmbi5sZW5ndGg/bXQobixqZSh0LDIpLFd0KTpGfSxPbi5tZWFuPWZ1bmN0aW9uKG4pe3JldHVybiB4KG4sTnUpfSxPbi5tZWFuQnk9ZnVuY3Rpb24obix0KXtyZXR1cm4geChuLGplKHQsMikpfSxPbi5taW49ZnVuY3Rpb24obil7XG5yZXR1cm4gbiYmbi5sZW5ndGg/bXQobixOdSxKdCk6Rn0sT24ubWluQnk9ZnVuY3Rpb24obix0KXtyZXR1cm4gbiYmbi5sZW5ndGg/bXQobixqZSh0LDIpLEp0KTpGfSxPbi5zdHViQXJyYXk9S3UsT24uc3R1YkZhbHNlPUd1LE9uLnN0dWJPYmplY3Q9ZnVuY3Rpb24oKXtyZXR1cm57fX0sT24uc3R1YlN0cmluZz1mdW5jdGlvbigpe3JldHVyblwiXCJ9LE9uLnN0dWJUcnVlPWZ1bmN0aW9uKCl7cmV0dXJuIHRydWV9LE9uLm11bHRpcGx5PXVjLE9uLm50aD1mdW5jdGlvbihuLHQpe3JldHVybiBuJiZuLmxlbmd0aD90cihuLE91KHQpKTpGfSxPbi5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIFpuLl89PT10aGlzJiYoWm4uXz1waSksdGhpc30sT24ubm9vcD1xdSxPbi5ub3c9Sm8sT24ucGFkPWZ1bmN0aW9uKG4sdCxyKXtuPXp1KG4pO3ZhciBlPSh0PU91KHQpKT9UKG4pOjA7cmV0dXJuIXR8fGU+PXQ/bjoodD0odC1lKS8yLGVlKHppKHQpLHIpK24rZWUoUmkodCkscikpfSxPbi5wYWRFbmQ9ZnVuY3Rpb24obix0LHIpe1xubj16dShuKTt2YXIgZT0odD1PdSh0KSk/VChuKTowO3JldHVybiB0JiZlPHQ/bitlZSh0LWUscik6bn0sT24ucGFkU3RhcnQ9ZnVuY3Rpb24obix0LHIpe249enUobik7dmFyIGU9KHQ9T3UodCkpP1Qobik6MDtyZXR1cm4gdCYmZTx0P2VlKHQtZSxyKStuOm59LE9uLnBhcnNlSW50PWZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gcnx8bnVsbD09dD90PTA6dCYmKHQ9K3QpLCRpKHp1KG4pLnJlcGxhY2UoYW4sXCJcIiksdHx8MCl9LE9uLnJhbmRvbT1mdW5jdGlvbihuLHQscil7aWYociYmdHlwZW9mIHIhPVwiYm9vbGVhblwiJiZ6ZShuLHQscikmJih0PXI9Rikscj09PUYmJih0eXBlb2YgdD09XCJib29sZWFuXCI/KHI9dCx0PUYpOnR5cGVvZiBuPT1cImJvb2xlYW5cIiYmKHI9bixuPUYpKSxuPT09RiYmdD09PUY/KG49MCx0PTEpOihuPUV1KG4pLHQ9PT1GPyh0PW4sbj0wKTp0PUV1KHQpKSxuPnQpe3ZhciBlPW47bj10LHQ9ZX1yZXR1cm4gcnx8biUxfHx0JTE/KHI9RmkoKSxNaShuK3IqKHQtbiskbihcIjFlLVwiKygocitcIlwiKS5sZW5ndGgtMSkpKSx0KSk6Y3Iobix0KTtcbn0sT24ucmVkdWNlPWZ1bmN0aW9uKG4sdCxyKXt2YXIgZT1hZihuKT9oOm0sdT0zPmFyZ3VtZW50cy5sZW5ndGg7cmV0dXJuIGUobixqZSh0LDQpLHIsdSxvbyl9LE9uLnJlZHVjZVJpZ2h0PWZ1bmN0aW9uKG4sdCxyKXt2YXIgZT1hZihuKT9wOm0sdT0zPmFyZ3VtZW50cy5sZW5ndGg7cmV0dXJuIGUobixqZSh0LDQpLHIsdSxmbyl9LE9uLnJlcGVhdD1mdW5jdGlvbihuLHQscil7cmV0dXJuIHQ9KHI/emUobix0LHIpOnQ9PT1GKT8xOk91KHQpLGFyKHp1KG4pLHQpfSxPbi5yZXBsYWNlPWZ1bmN0aW9uKCl7dmFyIG49YXJndW1lbnRzLHQ9enUoblswXSk7cmV0dXJuIDM+bi5sZW5ndGg/dDp0LnJlcGxhY2UoblsxXSxuWzJdKX0sT24ucmVzdWx0PWZ1bmN0aW9uKG4sdCxyKXt0PVJyKHQsbik7dmFyIGU9LTEsdT10Lmxlbmd0aDtmb3IodXx8KHU9MSxuPUYpOysrZTx1Oyl7dmFyIGk9bnVsbD09bj9GOm5bJGUodFtlXSldO2k9PT1GJiYoZT11LGk9ciksbj1ndShpKT9pLmNhbGwobik6aTtcbn1yZXR1cm4gbn0sT24ucm91bmQ9aWMsT24ucnVuSW5Db250ZXh0PXcsT24uc2FtcGxlPWZ1bmN0aW9uKG4pe3JldHVybihhZihuKT90dDpzcikobil9LE9uLnNpemU9ZnVuY3Rpb24obil7aWYobnVsbD09bilyZXR1cm4gMDtpZihwdShuKSlyZXR1cm4gbXUobik/VChuKTpuLmxlbmd0aDt2YXIgdD15byhuKTtyZXR1cm5cIltvYmplY3QgTWFwXVwiPT10fHxcIltvYmplY3QgU2V0XVwiPT10P24uc2l6ZTpIdChuKS5sZW5ndGh9LE9uLnNuYWtlQ2FzZT1UZixPbi5zb21lPWZ1bmN0aW9uKG4sdCxyKXt2YXIgZT1hZihuKT9fOmdyO3JldHVybiByJiZ6ZShuLHQscikmJih0PUYpLGUobixqZSh0LDMpKX0sT24uc29ydGVkSW5kZXg9ZnVuY3Rpb24obix0KXtyZXR1cm4gZHIobix0KX0sT24uc29ydGVkSW5kZXhCeT1mdW5jdGlvbihuLHQscil7cmV0dXJuIHlyKG4sdCxqZShyLDIpKX0sT24uc29ydGVkSW5kZXhPZj1mdW5jdGlvbihuLHQpe3ZhciByPW51bGw9PW4/MDpuLmxlbmd0aDtpZihyKXtcbnZhciBlPWRyKG4sdCk7aWYoZTxyJiZodShuW2VdLHQpKXJldHVybiBlfXJldHVybi0xfSxPbi5zb3J0ZWRMYXN0SW5kZXg9ZnVuY3Rpb24obix0KXtyZXR1cm4gZHIobix0LHRydWUpfSxPbi5zb3J0ZWRMYXN0SW5kZXhCeT1mdW5jdGlvbihuLHQscil7cmV0dXJuIHlyKG4sdCxqZShyLDIpLHRydWUpfSxPbi5zb3J0ZWRMYXN0SW5kZXhPZj1mdW5jdGlvbihuLHQpe2lmKG51bGw9PW4/MDpuLmxlbmd0aCl7dmFyIHI9ZHIobix0LHRydWUpLTE7aWYoaHUobltyXSx0KSlyZXR1cm4gcn1yZXR1cm4tMX0sT24uc3RhcnRDYXNlPSRmLE9uLnN0YXJ0c1dpdGg9ZnVuY3Rpb24obix0LHIpe3JldHVybiBuPXp1KG4pLHI9bnVsbD09cj8wOmd0KE91KHIpLDAsbi5sZW5ndGgpLHQ9anIodCksbi5zbGljZShyLHIrdC5sZW5ndGgpPT10fSxPbi5zdWJ0cmFjdD1vYyxPbi5zdW09ZnVuY3Rpb24obil7cmV0dXJuIG4mJm4ubGVuZ3RoP2sobixOdSk6MH0sT24uc3VtQnk9ZnVuY3Rpb24obix0KXtyZXR1cm4gbiYmbi5sZW5ndGg/ayhuLGplKHQsMikpOjA7XG59LE9uLnRlbXBsYXRlPWZ1bmN0aW9uKG4sdCxyKXt2YXIgZT1Pbi50ZW1wbGF0ZVNldHRpbmdzO3ImJnplKG4sdCxyKSYmKHQ9Riksbj16dShuKSx0PWpmKHt9LHQsZSxzZSkscj1qZih7fSx0LmltcG9ydHMsZS5pbXBvcnRzLHNlKTt2YXIgdSxpLG89THUociksZj1JKHIsbyksYz0wO3I9dC5pbnRlcnBvbGF0ZXx8QW47dmFyIGE9XCJfX3ArPSdcIjtyPXRpKCh0LmVzY2FwZXx8QW4pLnNvdXJjZStcInxcIityLnNvdXJjZStcInxcIisocj09PW5uP2duOkFuKS5zb3VyY2UrXCJ8XCIrKHQuZXZhbHVhdGV8fEFuKS5zb3VyY2UrXCJ8JFwiLFwiZ1wiKTt2YXIgbD1cInNvdXJjZVVSTFwiaW4gdD9cIi8vIyBzb3VyY2VVUkw9XCIrdC5zb3VyY2VVUkwrXCJcXG5cIjpcIlwiO2lmKG4ucmVwbGFjZShyLGZ1bmN0aW9uKHQscixlLG8sZixsKXtyZXR1cm4gZXx8KGU9byksYSs9bi5zbGljZShjLGwpLnJlcGxhY2Uoa24sQiksciYmKHU9dHJ1ZSxhKz1cIicrX19lKFwiK3IrXCIpKydcIiksZiYmKGk9dHJ1ZSxhKz1cIic7XCIrZitcIjtcXG5fX3ArPSdcIiksXG5lJiYoYSs9XCInKygoX190PShcIitlK1wiKSk9PW51bGw/Jyc6X190KSsnXCIpLGM9bCt0Lmxlbmd0aCx0fSksYSs9XCInO1wiLCh0PXQudmFyaWFibGUpfHwoYT1cIndpdGgob2JqKXtcIithK1wifVwiKSxhPShpP2EucmVwbGFjZShxLFwiXCIpOmEpLnJlcGxhY2UoVixcIiQxXCIpLnJlcGxhY2UoSyxcIiQxO1wiKSxhPVwiZnVuY3Rpb24oXCIrKHR8fFwib2JqXCIpK1wiKXtcIisodD9cIlwiOlwib2JqfHwob2JqPXt9KTtcIikrXCJ2YXIgX190LF9fcD0nJ1wiKyh1P1wiLF9fZT1fLmVzY2FwZVwiOlwiXCIpKyhpP1wiLF9faj1BcnJheS5wcm90b3R5cGUuam9pbjtmdW5jdGlvbiBwcmludCgpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKX1cIjpcIjtcIikrYStcInJldHVybiBfX3B9XCIsdD1QZihmdW5jdGlvbigpe3JldHVybiBRdShvLGwrXCJyZXR1cm4gXCIrYSkuYXBwbHkoRixmKX0pLHQuc291cmNlPWEsdnUodCkpdGhyb3cgdDtyZXR1cm4gdH0sT24udGltZXM9ZnVuY3Rpb24obix0KXtpZihuPU91KG4pLDE+bnx8OTAwNzE5OTI1NDc0MDk5MTxuKXJldHVybltdO1xudmFyIHI9NDI5NDk2NzI5NSxlPU1pKG4sNDI5NDk2NzI5NSk7Zm9yKHQ9amUodCksbi09NDI5NDk2NzI5NSxlPUUoZSx0KTsrK3I8bjspdChyKTtyZXR1cm4gZX0sT24udG9GaW5pdGU9RXUsT24udG9JbnRlZ2VyPU91LE9uLnRvTGVuZ3RoPVN1LE9uLnRvTG93ZXI9ZnVuY3Rpb24obil7cmV0dXJuIHp1KG4pLnRvTG93ZXJDYXNlKCl9LE9uLnRvTnVtYmVyPUl1LE9uLnRvU2FmZUludGVnZXI9ZnVuY3Rpb24obil7cmV0dXJuIG4/Z3QoT3UobiksLTkwMDcxOTkyNTQ3NDA5OTEsOTAwNzE5OTI1NDc0MDk5MSk6MD09PW4/bjowfSxPbi50b1N0cmluZz16dSxPbi50b1VwcGVyPWZ1bmN0aW9uKG4pe3JldHVybiB6dShuKS50b1VwcGVyQ2FzZSgpfSxPbi50cmltPWZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4obj16dShuKSkmJihyfHx0PT09Rik/bi5yZXBsYWNlKGNuLFwiXCIpOm4mJih0PWpyKHQpKT8obj0kKG4pLHI9JCh0KSx0PXoobixyKSxyPVcobixyKSsxLHpyKG4sdCxyKS5qb2luKFwiXCIpKTpuO1xufSxPbi50cmltRW5kPWZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4obj16dShuKSkmJihyfHx0PT09Rik/bi5yZXBsYWNlKGxuLFwiXCIpOm4mJih0PWpyKHQpKT8obj0kKG4pLHQ9VyhuLCQodCkpKzEsenIobiwwLHQpLmpvaW4oXCJcIikpOm59LE9uLnRyaW1TdGFydD1mdW5jdGlvbihuLHQscil7cmV0dXJuKG49enUobikpJiYocnx8dD09PUYpP24ucmVwbGFjZShhbixcIlwiKTpuJiYodD1qcih0KSk/KG49JChuKSx0PXoobiwkKHQpKSx6cihuLHQpLmpvaW4oXCJcIikpOm59LE9uLnRydW5jYXRlPWZ1bmN0aW9uKG4sdCl7dmFyIHI9MzAsZT1cIi4uLlwiO2lmKGJ1KHQpKXZhciB1PVwic2VwYXJhdG9yXCJpbiB0P3Quc2VwYXJhdG9yOnUscj1cImxlbmd0aFwiaW4gdD9PdSh0Lmxlbmd0aCk6cixlPVwib21pc3Npb25cImluIHQ/anIodC5vbWlzc2lvbik6ZTtuPXp1KG4pO3ZhciBpPW4ubGVuZ3RoO2lmKEJuLnRlc3QobikpdmFyIG89JChuKSxpPW8ubGVuZ3RoO2lmKHI+PWkpcmV0dXJuIG47aWYoaT1yLVQoZSksMT5pKXJldHVybiBlO1xuaWYocj1vP3pyKG8sMCxpKS5qb2luKFwiXCIpOm4uc2xpY2UoMCxpKSx1PT09RilyZXR1cm4gcitlO2lmKG8mJihpKz1yLmxlbmd0aC1pKSxfZih1KSl7aWYobi5zbGljZShpKS5zZWFyY2godSkpe3ZhciBmPXI7Zm9yKHUuZ2xvYmFsfHwodT10aSh1LnNvdXJjZSx6dShkbi5leGVjKHUpKStcImdcIikpLHUubGFzdEluZGV4PTA7bz11LmV4ZWMoZik7KXZhciBjPW8uaW5kZXg7cj1yLnNsaWNlKDAsYz09PUY/aTpjKX19ZWxzZSBuLmluZGV4T2YoanIodSksaSkhPWkmJih1PXIubGFzdEluZGV4T2YodSksLTE8dSYmKHI9ci5zbGljZSgwLHUpKSk7cmV0dXJuIHIrZX0sT24udW5lc2NhcGU9ZnVuY3Rpb24obil7cmV0dXJuKG49enUobikpJiZKLnRlc3Qobik/bi5yZXBsYWNlKEcsdXQpOm59LE9uLnVuaXF1ZUlkPWZ1bmN0aW9uKG4pe3ZhciB0PSsrYWk7cmV0dXJuIHp1KG4pK3R9LE9uLnVwcGVyQ2FzZT1GZixPbi51cHBlckZpcnN0PU5mLE9uLmVhY2g9cnUsT24uZWFjaFJpZ2h0PWV1LE9uLmZpcnN0PUtlLFxuWnUoT24sZnVuY3Rpb24oKXt2YXIgbj17fTtyZXR1cm4gRXQoT24sZnVuY3Rpb24odCxyKXtjaS5jYWxsKE9uLnByb3RvdHlwZSxyKXx8KG5bcl09dCl9KSxufSgpLHtjaGFpbjpmYWxzZX0pLE9uLlZFUlNJT049XCI0LjE3LjRcIix1KFwiYmluZCBiaW5kS2V5IGN1cnJ5IGN1cnJ5UmlnaHQgcGFydGlhbCBwYXJ0aWFsUmlnaHRcIi5zcGxpdChcIiBcIiksZnVuY3Rpb24obil7T25bbl0ucGxhY2Vob2xkZXI9T259KSx1KFtcImRyb3BcIixcInRha2VcIl0sZnVuY3Rpb24obix0KXtNbi5wcm90b3R5cGVbbl09ZnVuY3Rpb24ocil7cj1yPT09Rj8xOkRpKE91KHIpLDApO3ZhciBlPXRoaXMuX19maWx0ZXJlZF9fJiYhdD9uZXcgTW4odGhpcyk6dGhpcy5jbG9uZSgpO3JldHVybiBlLl9fZmlsdGVyZWRfXz9lLl9fdGFrZUNvdW50X189TWkocixlLl9fdGFrZUNvdW50X18pOmUuX192aWV3c19fLnB1c2goe3NpemU6TWkociw0Mjk0OTY3Mjk1KSx0eXBlOm4rKDA+ZS5fX2Rpcl9fP1wiUmlnaHRcIjpcIlwiKX0pLGV9LE1uLnByb3RvdHlwZVtuK1wiUmlnaHRcIl09ZnVuY3Rpb24odCl7XG5yZXR1cm4gdGhpcy5yZXZlcnNlKClbbl0odCkucmV2ZXJzZSgpfX0pLHUoW1wiZmlsdGVyXCIsXCJtYXBcIixcInRha2VXaGlsZVwiXSxmdW5jdGlvbihuLHQpe3ZhciByPXQrMSxlPTE9PXJ8fDM9PXI7TW4ucHJvdG90eXBlW25dPWZ1bmN0aW9uKG4pe3ZhciB0PXRoaXMuY2xvbmUoKTtyZXR1cm4gdC5fX2l0ZXJhdGVlc19fLnB1c2goe2l0ZXJhdGVlOmplKG4sMyksdHlwZTpyfSksdC5fX2ZpbHRlcmVkX189dC5fX2ZpbHRlcmVkX198fGUsdH19KSx1KFtcImhlYWRcIixcImxhc3RcIl0sZnVuY3Rpb24obix0KXt2YXIgcj1cInRha2VcIisodD9cIlJpZ2h0XCI6XCJcIik7TW4ucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXNbcl0oMSkudmFsdWUoKVswXX19KSx1KFtcImluaXRpYWxcIixcInRhaWxcIl0sZnVuY3Rpb24obix0KXt2YXIgcj1cImRyb3BcIisodD9cIlwiOlwiUmlnaHRcIik7TW4ucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX19maWx0ZXJlZF9fP25ldyBNbih0aGlzKTp0aGlzW3JdKDEpO1xufX0pLE1uLnByb3RvdHlwZS5jb21wYWN0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZmlsdGVyKE51KX0sTW4ucHJvdG90eXBlLmZpbmQ9ZnVuY3Rpb24obil7cmV0dXJuIHRoaXMuZmlsdGVyKG4pLmhlYWQoKX0sTW4ucHJvdG90eXBlLmZpbmRMYXN0PWZ1bmN0aW9uKG4pe3JldHVybiB0aGlzLnJldmVyc2UoKS5maW5kKG4pfSxNbi5wcm90b3R5cGUuaW52b2tlTWFwPWxyKGZ1bmN0aW9uKG4sdCl7cmV0dXJuIHR5cGVvZiBuPT1cImZ1bmN0aW9uXCI/bmV3IE1uKHRoaXMpOnRoaXMubWFwKGZ1bmN0aW9uKHIpe3JldHVybiBEdChyLG4sdCl9KX0pLE1uLnByb3RvdHlwZS5yZWplY3Q9ZnVuY3Rpb24obil7cmV0dXJuIHRoaXMuZmlsdGVyKHN1KGplKG4pKSl9LE1uLnByb3RvdHlwZS5zbGljZT1mdW5jdGlvbihuLHQpe249T3Uobik7dmFyIHI9dGhpcztyZXR1cm4gci5fX2ZpbHRlcmVkX18mJigwPG58fDA+dCk/bmV3IE1uKHIpOigwPm4/cj1yLnRha2VSaWdodCgtbik6biYmKHI9ci5kcm9wKG4pKSxcbnQhPT1GJiYodD1PdSh0KSxyPTA+dD9yLmRyb3BSaWdodCgtdCk6ci50YWtlKHQtbikpLHIpfSxNbi5wcm90b3R5cGUudGFrZVJpZ2h0V2hpbGU9ZnVuY3Rpb24obil7cmV0dXJuIHRoaXMucmV2ZXJzZSgpLnRha2VXaGlsZShuKS5yZXZlcnNlKCl9LE1uLnByb3RvdHlwZS50b0FycmF5PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudGFrZSg0Mjk0OTY3Mjk1KX0sRXQoTW4ucHJvdG90eXBlLGZ1bmN0aW9uKG4sdCl7dmFyIHI9L14oPzpmaWx0ZXJ8ZmluZHxtYXB8cmVqZWN0KXxXaGlsZSQvLnRlc3QodCksZT0vXig/OmhlYWR8bGFzdCkkLy50ZXN0KHQpLHU9T25bZT9cInRha2VcIisoXCJsYXN0XCI9PXQ/XCJSaWdodFwiOlwiXCIpOnRdLGk9ZXx8L15maW5kLy50ZXN0KHQpO3UmJihPbi5wcm90b3R5cGVbdF09ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KG4pe3JldHVybiBuPXUuYXBwbHkoT24scyhbbl0sZikpLGUmJmg/blswXTpufXZhciBvPXRoaXMuX193cmFwcGVkX18sZj1lP1sxXTphcmd1bWVudHMsYz1vIGluc3RhbmNlb2YgTW4sYT1mWzBdLGw9Y3x8YWYobyk7XG5sJiZyJiZ0eXBlb2YgYT09XCJmdW5jdGlvblwiJiYxIT1hLmxlbmd0aCYmKGM9bD1mYWxzZSk7dmFyIGg9dGhpcy5fX2NoYWluX18scD0hIXRoaXMuX19hY3Rpb25zX18ubGVuZ3RoLGE9aSYmIWgsYz1jJiYhcDtyZXR1cm4haSYmbD8obz1jP286bmV3IE1uKHRoaXMpLG89bi5hcHBseShvLGYpLG8uX19hY3Rpb25zX18ucHVzaCh7ZnVuYzpudSxhcmdzOlt0XSx0aGlzQXJnOkZ9KSxuZXcgem4obyxoKSk6YSYmYz9uLmFwcGx5KHRoaXMsZik6KG89dGhpcy50aHJ1KHQpLGE/ZT9vLnZhbHVlKClbMF06by52YWx1ZSgpOm8pfSl9KSx1KFwicG9wIHB1c2ggc2hpZnQgc29ydCBzcGxpY2UgdW5zaGlmdFwiLnNwbGl0KFwiIFwiKSxmdW5jdGlvbihuKXt2YXIgdD11aVtuXSxyPS9eKD86cHVzaHxzb3J0fHVuc2hpZnQpJC8udGVzdChuKT9cInRhcFwiOlwidGhydVwiLGU9L14oPzpwb3B8c2hpZnQpJC8udGVzdChuKTtPbi5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXt2YXIgbj1hcmd1bWVudHM7aWYoZSYmIXRoaXMuX19jaGFpbl9fKXtcbnZhciB1PXRoaXMudmFsdWUoKTtyZXR1cm4gdC5hcHBseShhZih1KT91OltdLG4pfXJldHVybiB0aGlzW3JdKGZ1bmN0aW9uKHIpe3JldHVybiB0LmFwcGx5KGFmKHIpP3I6W10sbil9KX19KSxFdChNbi5wcm90b3R5cGUsZnVuY3Rpb24obix0KXt2YXIgcj1Pblt0XTtpZihyKXt2YXIgZT1yLm5hbWUrXCJcIjsoSmlbZV18fChKaVtlXT1bXSkpLnB1c2goe25hbWU6dCxmdW5jOnJ9KX19KSxKaVtYcihGLDIpLm5hbWVdPVt7bmFtZTpcIndyYXBwZXJcIixmdW5jOkZ9XSxNbi5wcm90b3R5cGUuY2xvbmU9ZnVuY3Rpb24oKXt2YXIgbj1uZXcgTW4odGhpcy5fX3dyYXBwZWRfXyk7cmV0dXJuIG4uX19hY3Rpb25zX189TXIodGhpcy5fX2FjdGlvbnNfXyksbi5fX2Rpcl9fPXRoaXMuX19kaXJfXyxuLl9fZmlsdGVyZWRfXz10aGlzLl9fZmlsdGVyZWRfXyxuLl9faXRlcmF0ZWVzX189TXIodGhpcy5fX2l0ZXJhdGVlc19fKSxuLl9fdGFrZUNvdW50X189dGhpcy5fX3Rha2VDb3VudF9fLG4uX192aWV3c19fPU1yKHRoaXMuX192aWV3c19fKSxcbm59LE1uLnByb3RvdHlwZS5yZXZlcnNlPWZ1bmN0aW9uKCl7aWYodGhpcy5fX2ZpbHRlcmVkX18pe3ZhciBuPW5ldyBNbih0aGlzKTtuLl9fZGlyX189LTEsbi5fX2ZpbHRlcmVkX189dHJ1ZX1lbHNlIG49dGhpcy5jbG9uZSgpLG4uX19kaXJfXyo9LTE7cmV0dXJuIG59LE1uLnByb3RvdHlwZS52YWx1ZT1mdW5jdGlvbigpe3ZhciBuLHQ9dGhpcy5fX3dyYXBwZWRfXy52YWx1ZSgpLHI9dGhpcy5fX2Rpcl9fLGU9YWYodCksdT0wPnIsaT1lP3QubGVuZ3RoOjA7bj1pO2Zvcih2YXIgbz10aGlzLl9fdmlld3NfXyxmPTAsYz0tMSxhPW8ubGVuZ3RoOysrYzxhOyl7dmFyIGw9b1tjXSxzPWwuc2l6ZTtzd2l0Y2gobC50eXBlKXtjYXNlXCJkcm9wXCI6Zis9czticmVhaztjYXNlXCJkcm9wUmlnaHRcIjpuLT1zO2JyZWFrO2Nhc2VcInRha2VcIjpuPU1pKG4sZitzKTticmVhaztjYXNlXCJ0YWtlUmlnaHRcIjpmPURpKGYsbi1zKX19aWYobj17c3RhcnQ6ZixlbmQ6bn0sbz1uLnN0YXJ0LGY9bi5lbmQsbj1mLW8sXG5vPXU/ZjpvLTEsZj10aGlzLl9faXRlcmF0ZWVzX18sYz1mLmxlbmd0aCxhPTAsbD1NaShuLHRoaXMuX190YWtlQ291bnRfXyksIWV8fCF1JiZpPT1uJiZsPT1uKXJldHVybiBrcih0LHRoaXMuX19hY3Rpb25zX18pO2U9W107bjpmb3IoO24tLSYmYTxsOyl7Zm9yKG8rPXIsdT0tMSxpPXRbb107Kyt1PGM7KXt2YXIgaD1mW3VdLHM9aC50eXBlLGg9KDAsaC5pdGVyYXRlZSkoaSk7aWYoMj09cylpPWg7ZWxzZSBpZighaCl7aWYoMT09cyljb250aW51ZSBuO2JyZWFrIG59fWVbYSsrXT1pfXJldHVybiBlfSxPbi5wcm90b3R5cGUuYXQ9Rm8sT24ucHJvdG90eXBlLmNoYWluPWZ1bmN0aW9uKCl7cmV0dXJuIFhlKHRoaXMpfSxPbi5wcm90b3R5cGUuY29tbWl0PWZ1bmN0aW9uKCl7cmV0dXJuIG5ldyB6bih0aGlzLnZhbHVlKCksdGhpcy5fX2NoYWluX18pfSxPbi5wcm90b3R5cGUubmV4dD1mdW5jdGlvbigpe3RoaXMuX192YWx1ZXNfXz09PUYmJih0aGlzLl9fdmFsdWVzX189a3UodGhpcy52YWx1ZSgpKSk7XG52YXIgbj10aGlzLl9faW5kZXhfXz49dGhpcy5fX3ZhbHVlc19fLmxlbmd0aDtyZXR1cm57ZG9uZTpuLHZhbHVlOm4/Rjp0aGlzLl9fdmFsdWVzX19bdGhpcy5fX2luZGV4X18rK119fSxPbi5wcm90b3R5cGUucGxhbnQ9ZnVuY3Rpb24obil7Zm9yKHZhciB0LHI9dGhpcztyIGluc3RhbmNlb2YgU247KXt2YXIgZT1QZShyKTtlLl9faW5kZXhfXz0wLGUuX192YWx1ZXNfXz1GLHQ/dS5fX3dyYXBwZWRfXz1lOnQ9ZTt2YXIgdT1lLHI9ci5fX3dyYXBwZWRfX31yZXR1cm4gdS5fX3dyYXBwZWRfXz1uLHR9LE9uLnByb3RvdHlwZS5yZXZlcnNlPWZ1bmN0aW9uKCl7dmFyIG49dGhpcy5fX3dyYXBwZWRfXztyZXR1cm4gbiBpbnN0YW5jZW9mIE1uPyh0aGlzLl9fYWN0aW9uc19fLmxlbmd0aCYmKG49bmV3IE1uKHRoaXMpKSxuPW4ucmV2ZXJzZSgpLG4uX19hY3Rpb25zX18ucHVzaCh7ZnVuYzpudSxhcmdzOltKZV0sdGhpc0FyZzpGfSksbmV3IHpuKG4sdGhpcy5fX2NoYWluX18pKTp0aGlzLnRocnUoSmUpO1xufSxPbi5wcm90b3R5cGUudG9KU09OPU9uLnByb3RvdHlwZS52YWx1ZU9mPU9uLnByb3RvdHlwZS52YWx1ZT1mdW5jdGlvbigpe3JldHVybiBrcih0aGlzLl9fd3JhcHBlZF9fLHRoaXMuX19hY3Rpb25zX18pfSxPbi5wcm90b3R5cGUuZmlyc3Q9T24ucHJvdG90eXBlLmhlYWQsQWkmJihPbi5wcm90b3R5cGVbQWldPXR1KSxPbn0oKTt0eXBlb2YgZGVmaW5lPT1cImZ1bmN0aW9uXCImJnR5cGVvZiBkZWZpbmUuYW1kPT1cIm9iamVjdFwiJiZkZWZpbmUuYW1kPyhabi5fPWl0LCBkZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gaXR9KSk6Vm4/KChWbi5leHBvcnRzPWl0KS5fPWl0LHFuLl89aXQpOlpuLl89aXR9KS5jYWxsKHRoaXMpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9sb2Rhc2gubWluLmpzXG4vLyBtb2R1bGUgaWQgPSAyODVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIG1hcHBpbmcgPSByZXF1aXJlKCcuL19tYXBwaW5nJyksXG4gICAgZmFsbGJhY2tIb2xkZXIgPSByZXF1aXJlKCcuL3BsYWNlaG9sZGVyJyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2UuICovXG52YXIgcHVzaCA9IEFycmF5LnByb3RvdHlwZS5wdXNoO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiwgd2l0aCBhbiBhcml0eSBvZiBgbmAsIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCB0aGVcbiAqIGFyZ3VtZW50cyBpdCByZWNlaXZlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBhcml0eSBvZiB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VBcml0eShmdW5jLCBuKSB7XG4gIHJldHVybiBuID09IDJcbiAgICA/IGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGZ1bmMuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpOyB9XG4gICAgOiBmdW5jdGlvbihhKSB7IHJldHVybiBmdW5jLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTsgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCwgd2l0aCB1cCB0byBgbmAgYXJndW1lbnRzLCBpZ25vcmluZ1xuICogYW55IGFkZGl0aW9uYWwgYXJndW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjYXAgYXJndW1lbnRzIGZvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBhcml0eSBjYXAuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZUFyeShmdW5jLCBuKSB7XG4gIHJldHVybiBuID09IDJcbiAgICA/IGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGZ1bmMoYSwgYik7IH1cbiAgICA6IGZ1bmN0aW9uKGEpIHsgcmV0dXJuIGZ1bmMoYSk7IH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY2xvbmVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBjbG9uZUFycmF5KGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDAsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIHJlc3VsdFtsZW5ndGhdID0gYXJyYXlbbGVuZ3RoXTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGNsb25lcyBhIGdpdmVuIG9iamVjdCB1c2luZyB0aGUgYXNzaWdubWVudCBgZnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGFzc2lnbm1lbnQgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjbG9uZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNsb25lcihmdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gZnVuYyh7fSwgb2JqZWN0KTtcbiAgfTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uc3ByZWFkYCB3aGljaCBmbGF0dGVucyB0aGUgc3ByZWFkIGFycmF5IGludG9cbiAqIHRoZSBhcmd1bWVudHMgb2YgdGhlIGludm9rZWQgYGZ1bmNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBzcHJlYWQgYXJndW1lbnRzIG92ZXIuXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgVGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZSBzcHJlYWQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gZmxhdFNwcmVhZChmdW5jLCBzdGFydCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG4gICAgICAgIGxhc3RJbmRleCA9IGxlbmd0aCAtIDEsXG4gICAgICAgIGFyZ3MgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICBhcmdzW2xlbmd0aF0gPSBhcmd1bWVudHNbbGVuZ3RoXTtcbiAgICB9XG4gICAgdmFyIGFycmF5ID0gYXJnc1tzdGFydF0sXG4gICAgICAgIG90aGVyQXJncyA9IGFyZ3Muc2xpY2UoMCwgc3RhcnQpO1xuXG4gICAgaWYgKGFycmF5KSB7XG4gICAgICBwdXNoLmFwcGx5KG90aGVyQXJncywgYXJyYXkpO1xuICAgIH1cbiAgICBpZiAoc3RhcnQgIT0gbGFzdEluZGV4KSB7XG4gICAgICBwdXNoLmFwcGx5KG90aGVyQXJncywgYXJncy5zbGljZShzdGFydCArIDEpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgb3RoZXJBcmdzKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCB3cmFwcyBgZnVuY2AgYW5kIHVzZXMgYGNsb25lcmAgdG8gY2xvbmUgdGhlIGZpcnN0XG4gKiBhcmd1bWVudCBpdCByZWNlaXZlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb25lciBUaGUgZnVuY3Rpb24gdG8gY2xvbmUgYXJndW1lbnRzLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgaW1tdXRhYmxlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiB3cmFwSW1tdXRhYmxlKGZ1bmMsIGNsb25lcikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKCFsZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGFyZ3MgPSBBcnJheShsZW5ndGgpO1xuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgYXJnc1tsZW5ndGhdID0gYXJndW1lbnRzW2xlbmd0aF07XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBhcmdzWzBdID0gY2xvbmVyLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgZnVuYy5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGNvbnZlcnRgIHdoaWNoIGFjY2VwdHMgYSBgdXRpbGAgb2JqZWN0IG9mIG1ldGhvZHNcbiAqIHJlcXVpcmVkIHRvIHBlcmZvcm0gY29udmVyc2lvbnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHV0aWwgVGhlIHV0aWwgb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIHRvIGNvbnZlcnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjb252ZXJ0LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmNhcD10cnVlXSBTcGVjaWZ5IGNhcHBpbmcgaXRlcmF0ZWUgYXJndW1lbnRzLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5jdXJyeT10cnVlXSBTcGVjaWZ5IGN1cnJ5aW5nLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5maXhlZD10cnVlXSBTcGVjaWZ5IGZpeGVkIGFyaXR5LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5pbW11dGFibGU9dHJ1ZV0gU3BlY2lmeSBpbW11dGFibGUgb3BlcmF0aW9ucy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucmVhcmc9dHJ1ZV0gU3BlY2lmeSByZWFycmFuZ2luZyBhcmd1bWVudHMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb258T2JqZWN0fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgZnVuY3Rpb24gb3Igb2JqZWN0LlxuICovXG5mdW5jdGlvbiBiYXNlQ29udmVydCh1dGlsLCBuYW1lLCBmdW5jLCBvcHRpb25zKSB7XG4gIHZhciBzZXRQbGFjZWhvbGRlcixcbiAgICAgIGlzTGliID0gdHlwZW9mIG5hbWUgPT0gJ2Z1bmN0aW9uJyxcbiAgICAgIGlzT2JqID0gbmFtZSA9PT0gT2JqZWN0KG5hbWUpO1xuXG4gIGlmIChpc09iaikge1xuICAgIG9wdGlvbnMgPSBmdW5jO1xuICAgIGZ1bmMgPSBuYW1lO1xuICAgIG5hbWUgPSB1bmRlZmluZWQ7XG4gIH1cbiAgaWYgKGZ1bmMgPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3I7XG4gIH1cbiAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcblxuICB2YXIgY29uZmlnID0ge1xuICAgICdjYXAnOiAnY2FwJyBpbiBvcHRpb25zID8gb3B0aW9ucy5jYXAgOiB0cnVlLFxuICAgICdjdXJyeSc6ICdjdXJyeScgaW4gb3B0aW9ucyA/IG9wdGlvbnMuY3VycnkgOiB0cnVlLFxuICAgICdmaXhlZCc6ICdmaXhlZCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuZml4ZWQgOiB0cnVlLFxuICAgICdpbW11dGFibGUnOiAnaW1tdXRhYmxlJyBpbiBvcHRpb25zID8gb3B0aW9ucy5pbW11dGFibGUgOiB0cnVlLFxuICAgICdyZWFyZyc6ICdyZWFyZycgaW4gb3B0aW9ucyA/IG9wdGlvbnMucmVhcmcgOiB0cnVlXG4gIH07XG5cbiAgdmFyIGZvcmNlQ3VycnkgPSAoJ2N1cnJ5JyBpbiBvcHRpb25zKSAmJiBvcHRpb25zLmN1cnJ5LFxuICAgICAgZm9yY2VGaXhlZCA9ICgnZml4ZWQnIGluIG9wdGlvbnMpICYmIG9wdGlvbnMuZml4ZWQsXG4gICAgICBmb3JjZVJlYXJnID0gKCdyZWFyZycgaW4gb3B0aW9ucykgJiYgb3B0aW9ucy5yZWFyZyxcbiAgICAgIHBsYWNlaG9sZGVyID0gaXNMaWIgPyBmdW5jIDogZmFsbGJhY2tIb2xkZXIsXG4gICAgICBwcmlzdGluZSA9IGlzTGliID8gZnVuYy5ydW5JbkNvbnRleHQoKSA6IHVuZGVmaW5lZDtcblxuICB2YXIgaGVscGVycyA9IGlzTGliID8gZnVuYyA6IHtcbiAgICAnYXJ5JzogdXRpbC5hcnksXG4gICAgJ2Fzc2lnbic6IHV0aWwuYXNzaWduLFxuICAgICdjbG9uZSc6IHV0aWwuY2xvbmUsXG4gICAgJ2N1cnJ5JzogdXRpbC5jdXJyeSxcbiAgICAnZm9yRWFjaCc6IHV0aWwuZm9yRWFjaCxcbiAgICAnaXNBcnJheSc6IHV0aWwuaXNBcnJheSxcbiAgICAnaXNGdW5jdGlvbic6IHV0aWwuaXNGdW5jdGlvbixcbiAgICAnaXRlcmF0ZWUnOiB1dGlsLml0ZXJhdGVlLFxuICAgICdrZXlzJzogdXRpbC5rZXlzLFxuICAgICdyZWFyZyc6IHV0aWwucmVhcmcsXG4gICAgJ3RvSW50ZWdlcic6IHV0aWwudG9JbnRlZ2VyLFxuICAgICd0b1BhdGgnOiB1dGlsLnRvUGF0aFxuICB9O1xuXG4gIHZhciBhcnkgPSBoZWxwZXJzLmFyeSxcbiAgICAgIGFzc2lnbiA9IGhlbHBlcnMuYXNzaWduLFxuICAgICAgY2xvbmUgPSBoZWxwZXJzLmNsb25lLFxuICAgICAgY3VycnkgPSBoZWxwZXJzLmN1cnJ5LFxuICAgICAgZWFjaCA9IGhlbHBlcnMuZm9yRWFjaCxcbiAgICAgIGlzQXJyYXkgPSBoZWxwZXJzLmlzQXJyYXksXG4gICAgICBpc0Z1bmN0aW9uID0gaGVscGVycy5pc0Z1bmN0aW9uLFxuICAgICAga2V5cyA9IGhlbHBlcnMua2V5cyxcbiAgICAgIHJlYXJnID0gaGVscGVycy5yZWFyZyxcbiAgICAgIHRvSW50ZWdlciA9IGhlbHBlcnMudG9JbnRlZ2VyLFxuICAgICAgdG9QYXRoID0gaGVscGVycy50b1BhdGg7XG5cbiAgdmFyIGFyeU1ldGhvZEtleXMgPSBrZXlzKG1hcHBpbmcuYXJ5TWV0aG9kKTtcblxuICB2YXIgd3JhcHBlcnMgPSB7XG4gICAgJ2Nhc3RBcnJheSc6IGZ1bmN0aW9uKGNhc3RBcnJheSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBhcmd1bWVudHNbMF07XG4gICAgICAgIHJldHVybiBpc0FycmF5KHZhbHVlKVxuICAgICAgICAgID8gY2FzdEFycmF5KGNsb25lQXJyYXkodmFsdWUpKVxuICAgICAgICAgIDogY2FzdEFycmF5LmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfSxcbiAgICAnaXRlcmF0ZWUnOiBmdW5jdGlvbihpdGVyYXRlZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZnVuYyA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgIGFyaXR5ID0gYXJndW1lbnRzWzFdLFxuICAgICAgICAgICAgcmVzdWx0ID0gaXRlcmF0ZWUoZnVuYywgYXJpdHkpLFxuICAgICAgICAgICAgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aDtcblxuICAgICAgICBpZiAoY29uZmlnLmNhcCAmJiB0eXBlb2YgYXJpdHkgPT0gJ251bWJlcicpIHtcbiAgICAgICAgICBhcml0eSA9IGFyaXR5ID4gMiA/IChhcml0eSAtIDIpIDogMTtcbiAgICAgICAgICByZXR1cm4gKGxlbmd0aCAmJiBsZW5ndGggPD0gYXJpdHkpID8gcmVzdWx0IDogYmFzZUFyeShyZXN1bHQsIGFyaXR5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfTtcbiAgICB9LFxuICAgICdtaXhpbic6IGZ1bmN0aW9uKG1peGluKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oc291cmNlKSB7XG4gICAgICAgIHZhciBmdW5jID0gdGhpcztcbiAgICAgICAgaWYgKCFpc0Z1bmN0aW9uKGZ1bmMpKSB7XG4gICAgICAgICAgcmV0dXJuIG1peGluKGZ1bmMsIE9iamVjdChzb3VyY2UpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGFpcnMgPSBbXTtcbiAgICAgICAgZWFjaChrZXlzKHNvdXJjZSksIGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHNvdXJjZVtrZXldKSkge1xuICAgICAgICAgICAgcGFpcnMucHVzaChba2V5LCBmdW5jLnByb3RvdHlwZVtrZXldXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBtaXhpbihmdW5jLCBPYmplY3Qoc291cmNlKSk7XG5cbiAgICAgICAgZWFjaChwYWlycywgZnVuY3Rpb24ocGFpcikge1xuICAgICAgICAgIHZhciB2YWx1ZSA9IHBhaXJbMV07XG4gICAgICAgICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICAgICAgICBmdW5jLnByb3RvdHlwZVtwYWlyWzBdXSA9IHZhbHVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgZnVuYy5wcm90b3R5cGVbcGFpclswXV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZ1bmM7XG4gICAgICB9O1xuICAgIH0sXG4gICAgJ250aEFyZyc6IGZ1bmN0aW9uKG50aEFyZykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgdmFyIGFyaXR5ID0gbiA8IDAgPyAxIDogKHRvSW50ZWdlcihuKSArIDEpO1xuICAgICAgICByZXR1cm4gY3VycnkobnRoQXJnKG4pLCBhcml0eSk7XG4gICAgICB9O1xuICAgIH0sXG4gICAgJ3JlYXJnJzogZnVuY3Rpb24ocmVhcmcpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihmdW5jLCBpbmRleGVzKSB7XG4gICAgICAgIHZhciBhcml0eSA9IGluZGV4ZXMgPyBpbmRleGVzLmxlbmd0aCA6IDA7XG4gICAgICAgIHJldHVybiBjdXJyeShyZWFyZyhmdW5jLCBpbmRleGVzKSwgYXJpdHkpO1xuICAgICAgfTtcbiAgICB9LFxuICAgICdydW5JbkNvbnRleHQnOiBmdW5jdGlvbihydW5JbkNvbnRleHQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBiYXNlQ29udmVydCh1dGlsLCBydW5JbkNvbnRleHQoY29udGV4dCksIG9wdGlvbnMpO1xuICAgICAgfTtcbiAgICB9XG4gIH07XG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgLyoqXG4gICAqIENhc3RzIGBmdW5jYCB0byBhIGZ1bmN0aW9uIHdpdGggYW4gYXJpdHkgY2FwcGVkIGl0ZXJhdGVlIGlmIG5lZWRlZC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIHRvIGluc3BlY3QuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGluc3BlY3QuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY2FzdCBmdW5jdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGNhc3RDYXAobmFtZSwgZnVuYykge1xuICAgIGlmIChjb25maWcuY2FwKSB7XG4gICAgICB2YXIgaW5kZXhlcyA9IG1hcHBpbmcuaXRlcmF0ZWVSZWFyZ1tuYW1lXTtcbiAgICAgIGlmIChpbmRleGVzKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRlZVJlYXJnKGZ1bmMsIGluZGV4ZXMpO1xuICAgICAgfVxuICAgICAgdmFyIG4gPSAhaXNMaWIgJiYgbWFwcGluZy5pdGVyYXRlZUFyeVtuYW1lXTtcbiAgICAgIGlmIChuKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRlZUFyeShmdW5jLCBuKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZ1bmM7XG4gIH1cblxuICAvKipcbiAgICogQ2FzdHMgYGZ1bmNgIHRvIGEgY3VycmllZCBmdW5jdGlvbiBpZiBuZWVkZWQuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvbiB0byBpbnNwZWN0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnNwZWN0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgYXJpdHkgb2YgYGZ1bmNgLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGNhc3QgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBjYXN0Q3VycnkobmFtZSwgZnVuYywgbikge1xuICAgIHJldHVybiAoZm9yY2VDdXJyeSB8fCAoY29uZmlnLmN1cnJ5ICYmIG4gPiAxKSlcbiAgICAgID8gY3VycnkoZnVuYywgbilcbiAgICAgIDogZnVuYztcbiAgfVxuXG4gIC8qKlxuICAgKiBDYXN0cyBgZnVuY2AgdG8gYSBmaXhlZCBhcml0eSBmdW5jdGlvbiBpZiBuZWVkZWQuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvbiB0byBpbnNwZWN0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnNwZWN0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgYXJpdHkgY2FwLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGNhc3QgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBjYXN0Rml4ZWQobmFtZSwgZnVuYywgbikge1xuICAgIGlmIChjb25maWcuZml4ZWQgJiYgKGZvcmNlRml4ZWQgfHwgIW1hcHBpbmcuc2tpcEZpeGVkW25hbWVdKSkge1xuICAgICAgdmFyIGRhdGEgPSBtYXBwaW5nLm1ldGhvZFNwcmVhZFtuYW1lXSxcbiAgICAgICAgICBzdGFydCA9IGRhdGEgJiYgZGF0YS5zdGFydDtcblxuICAgICAgcmV0dXJuIHN0YXJ0ICA9PT0gdW5kZWZpbmVkID8gYXJ5KGZ1bmMsIG4pIDogZmxhdFNwcmVhZChmdW5jLCBzdGFydCk7XG4gICAgfVxuICAgIHJldHVybiBmdW5jO1xuICB9XG5cbiAgLyoqXG4gICAqIENhc3RzIGBmdW5jYCB0byBhbiByZWFyZ2VkIGZ1bmN0aW9uIGlmIG5lZWRlZC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIHRvIGluc3BlY3QuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGluc3BlY3QuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBhcml0eSBvZiBgZnVuY2AuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY2FzdCBmdW5jdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGNhc3RSZWFyZyhuYW1lLCBmdW5jLCBuKSB7XG4gICAgcmV0dXJuIChjb25maWcucmVhcmcgJiYgbiA+IDEgJiYgKGZvcmNlUmVhcmcgfHwgIW1hcHBpbmcuc2tpcFJlYXJnW25hbWVdKSlcbiAgICAgID8gcmVhcmcoZnVuYywgbWFwcGluZy5tZXRob2RSZWFyZ1tuYW1lXSB8fCBtYXBwaW5nLmFyeVJlYXJnW25dKVxuICAgICAgOiBmdW5jO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgb2JqZWN0YCBieSBgcGF0aGAuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjbG9uZS5cbiAgICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gY2xvbmUgYnkuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBvYmplY3QuXG4gICAqL1xuICBmdW5jdGlvbiBjbG9uZUJ5UGF0aChvYmplY3QsIHBhdGgpIHtcbiAgICBwYXRoID0gdG9QYXRoKHBhdGgpO1xuXG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoLFxuICAgICAgICBsYXN0SW5kZXggPSBsZW5ndGggLSAxLFxuICAgICAgICByZXN1bHQgPSBjbG9uZShPYmplY3Qob2JqZWN0KSksXG4gICAgICAgIG5lc3RlZCA9IHJlc3VsdDtcblxuICAgIHdoaWxlIChuZXN0ZWQgIT0gbnVsbCAmJiArK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIga2V5ID0gcGF0aFtpbmRleF0sXG4gICAgICAgICAgdmFsdWUgPSBuZXN0ZWRba2V5XTtcblxuICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgbmVzdGVkW3BhdGhbaW5kZXhdXSA9IGNsb25lKGluZGV4ID09IGxhc3RJbmRleCA/IHZhbHVlIDogT2JqZWN0KHZhbHVlKSk7XG4gICAgICB9XG4gICAgICBuZXN0ZWQgPSBuZXN0ZWRba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBgbG9kYXNoYCB0byBhbiBpbW11dGFibGUgYXV0by1jdXJyaWVkIGl0ZXJhdGVlLWZpcnN0IGRhdGEtbGFzdFxuICAgKiB2ZXJzaW9uIHdpdGggY29udmVyc2lvbiBgb3B0aW9uc2AgYXBwbGllZC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBUaGUgb3B0aW9ucyBvYmplY3QuIFNlZSBgYmFzZUNvbnZlcnRgIGZvciBtb3JlIGRldGFpbHMuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY29udmVydGVkIGBsb2Rhc2hgLlxuICAgKi9cbiAgZnVuY3Rpb24gY29udmVydExpYihvcHRpb25zKSB7XG4gICAgcmV0dXJuIF8ucnVuSW5Db250ZXh0LmNvbnZlcnQob3B0aW9ucykodW5kZWZpbmVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBjb252ZXJ0ZXIgZnVuY3Rpb24gZm9yIGBmdW5jYCBvZiBgbmFtZWAuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvbiB0byBjb252ZXJ0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjb252ZXJ0LlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjb252ZXJ0ZXIgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVDb252ZXJ0ZXIobmFtZSwgZnVuYykge1xuICAgIHZhciByZWFsTmFtZSA9IG1hcHBpbmcuYWxpYXNUb1JlYWxbbmFtZV0gfHwgbmFtZSxcbiAgICAgICAgbWV0aG9kTmFtZSA9IG1hcHBpbmcucmVtYXBbcmVhbE5hbWVdIHx8IHJlYWxOYW1lLFxuICAgICAgICBvbGRPcHRpb25zID0gb3B0aW9ucztcblxuICAgIHJldHVybiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICB2YXIgbmV3VXRpbCA9IGlzTGliID8gcHJpc3RpbmUgOiBoZWxwZXJzLFxuICAgICAgICAgIG5ld0Z1bmMgPSBpc0xpYiA/IHByaXN0aW5lW21ldGhvZE5hbWVdIDogZnVuYyxcbiAgICAgICAgICBuZXdPcHRpb25zID0gYXNzaWduKGFzc2lnbih7fSwgb2xkT3B0aW9ucyksIG9wdGlvbnMpO1xuXG4gICAgICByZXR1cm4gYmFzZUNvbnZlcnQobmV3VXRpbCwgcmVhbE5hbWUsIG5ld0Z1bmMsIG5ld09wdGlvbnMpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgd3JhcHMgYGZ1bmNgIHRvIGludm9rZSBpdHMgaXRlcmF0ZWUsIHdpdGggdXAgdG8gYG5gXG4gICAqIGFyZ3VtZW50cywgaWdub3JpbmcgYW55IGFkZGl0aW9uYWwgYXJndW1lbnRzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjYXAgaXRlcmF0ZWUgYXJndW1lbnRzIGZvci5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIGFyaXR5IGNhcC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBpdGVyYXRlZUFyeShmdW5jLCBuKSB7XG4gICAgcmV0dXJuIG92ZXJBcmcoZnVuYywgZnVuY3Rpb24oZnVuYykge1xuICAgICAgcmV0dXJuIHR5cGVvZiBmdW5jID09ICdmdW5jdGlvbicgPyBiYXNlQXJ5KGZ1bmMsIG4pIDogZnVuYztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCB3cmFwcyBgZnVuY2AgdG8gaW52b2tlIGl0cyBpdGVyYXRlZSB3aXRoIGFyZ3VtZW50c1xuICAgKiBhcnJhbmdlZCBhY2NvcmRpbmcgdG8gdGhlIHNwZWNpZmllZCBgaW5kZXhlc2Agd2hlcmUgdGhlIGFyZ3VtZW50IHZhbHVlIGF0XG4gICAqIHRoZSBmaXJzdCBpbmRleCBpcyBwcm92aWRlZCBhcyB0aGUgZmlyc3QgYXJndW1lbnQsIHRoZSBhcmd1bWVudCB2YWx1ZSBhdFxuICAgKiB0aGUgc2Vjb25kIGluZGV4IGlzIHByb3ZpZGVkIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQsIGFuZCBzbyBvbi5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcmVhcnJhbmdlIGl0ZXJhdGVlIGFyZ3VtZW50cyBmb3IuXG4gICAqIEBwYXJhbSB7bnVtYmVyW119IGluZGV4ZXMgVGhlIGFycmFuZ2VkIGFyZ3VtZW50IGluZGV4ZXMuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gaXRlcmF0ZWVSZWFyZyhmdW5jLCBpbmRleGVzKSB7XG4gICAgcmV0dXJuIG92ZXJBcmcoZnVuYywgZnVuY3Rpb24oZnVuYykge1xuICAgICAgdmFyIG4gPSBpbmRleGVzLmxlbmd0aDtcbiAgICAgIHJldHVybiBiYXNlQXJpdHkocmVhcmcoYmFzZUFyeShmdW5jLCBuKSwgaW5kZXhlcyksIG4pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGZpcnN0IGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgaWYgKCFsZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMoKTtcbiAgICAgIH1cbiAgICAgIHZhciBhcmdzID0gQXJyYXkobGVuZ3RoKTtcbiAgICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICBhcmdzW2xlbmd0aF0gPSBhcmd1bWVudHNbbGVuZ3RoXTtcbiAgICAgIH1cbiAgICAgIHZhciBpbmRleCA9IGNvbmZpZy5yZWFyZyA/IDAgOiAobGVuZ3RoIC0gMSk7XG4gICAgICBhcmdzW2luZGV4XSA9IHRyYW5zZm9ybShhcmdzW2luZGV4XSk7XG4gICAgICByZXR1cm4gZnVuYy5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgd3JhcHMgYGZ1bmNgIGFuZCBhcHBseXMgdGhlIGNvbnZlcnNpb25zXG4gICAqIHJ1bGVzIGJ5IGBuYW1lYC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY29udmVydGVkIGZ1bmN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gd3JhcChuYW1lLCBmdW5jKSB7XG4gICAgdmFyIHJlc3VsdCxcbiAgICAgICAgcmVhbE5hbWUgPSBtYXBwaW5nLmFsaWFzVG9SZWFsW25hbWVdIHx8IG5hbWUsXG4gICAgICAgIHdyYXBwZWQgPSBmdW5jLFxuICAgICAgICB3cmFwcGVyID0gd3JhcHBlcnNbcmVhbE5hbWVdO1xuXG4gICAgaWYgKHdyYXBwZXIpIHtcbiAgICAgIHdyYXBwZWQgPSB3cmFwcGVyKGZ1bmMpO1xuICAgIH1cbiAgICBlbHNlIGlmIChjb25maWcuaW1tdXRhYmxlKSB7XG4gICAgICBpZiAobWFwcGluZy5tdXRhdGUuYXJyYXlbcmVhbE5hbWVdKSB7XG4gICAgICAgIHdyYXBwZWQgPSB3cmFwSW1tdXRhYmxlKGZ1bmMsIGNsb25lQXJyYXkpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAobWFwcGluZy5tdXRhdGUub2JqZWN0W3JlYWxOYW1lXSkge1xuICAgICAgICB3cmFwcGVkID0gd3JhcEltbXV0YWJsZShmdW5jLCBjcmVhdGVDbG9uZXIoZnVuYykpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAobWFwcGluZy5tdXRhdGUuc2V0W3JlYWxOYW1lXSkge1xuICAgICAgICB3cmFwcGVkID0gd3JhcEltbXV0YWJsZShmdW5jLCBjbG9uZUJ5UGF0aCk7XG4gICAgICB9XG4gICAgfVxuICAgIGVhY2goYXJ5TWV0aG9kS2V5cywgZnVuY3Rpb24oYXJ5S2V5KSB7XG4gICAgICBlYWNoKG1hcHBpbmcuYXJ5TWV0aG9kW2FyeUtleV0sIGZ1bmN0aW9uKG90aGVyTmFtZSkge1xuICAgICAgICBpZiAocmVhbE5hbWUgPT0gb3RoZXJOYW1lKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSBtYXBwaW5nLm1ldGhvZFNwcmVhZFtyZWFsTmFtZV0sXG4gICAgICAgICAgICAgIGFmdGVyUmVhcmcgPSBkYXRhICYmIGRhdGEuYWZ0ZXJSZWFyZztcblxuICAgICAgICAgIHJlc3VsdCA9IGFmdGVyUmVhcmdcbiAgICAgICAgICAgID8gY2FzdEZpeGVkKHJlYWxOYW1lLCBjYXN0UmVhcmcocmVhbE5hbWUsIHdyYXBwZWQsIGFyeUtleSksIGFyeUtleSlcbiAgICAgICAgICAgIDogY2FzdFJlYXJnKHJlYWxOYW1lLCBjYXN0Rml4ZWQocmVhbE5hbWUsIHdyYXBwZWQsIGFyeUtleSksIGFyeUtleSk7XG5cbiAgICAgICAgICByZXN1bHQgPSBjYXN0Q2FwKHJlYWxOYW1lLCByZXN1bHQpO1xuICAgICAgICAgIHJlc3VsdCA9IGNhc3RDdXJyeShyZWFsTmFtZSwgcmVzdWx0LCBhcnlLZXkpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gIXJlc3VsdDtcbiAgICB9KTtcblxuICAgIHJlc3VsdCB8fCAocmVzdWx0ID0gd3JhcHBlZCk7XG4gICAgaWYgKHJlc3VsdCA9PSBmdW5jKSB7XG4gICAgICByZXN1bHQgPSBmb3JjZUN1cnJ5ID8gY3VycnkocmVzdWx0LCAxKSA6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICB9XG4gICAgcmVzdWx0LmNvbnZlcnQgPSBjcmVhdGVDb252ZXJ0ZXIocmVhbE5hbWUsIGZ1bmMpO1xuICAgIGlmIChtYXBwaW5nLnBsYWNlaG9sZGVyW3JlYWxOYW1lXSkge1xuICAgICAgc2V0UGxhY2Vob2xkZXIgPSB0cnVlO1xuICAgICAgcmVzdWx0LnBsYWNlaG9sZGVyID0gZnVuYy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgaWYgKCFpc09iaikge1xuICAgIHJldHVybiB3cmFwKG5hbWUsIGZ1bmMpO1xuICB9XG4gIHZhciBfID0gZnVuYztcblxuICAvLyBDb252ZXJ0IG1ldGhvZHMgYnkgYXJ5IGNhcC5cbiAgdmFyIHBhaXJzID0gW107XG4gIGVhY2goYXJ5TWV0aG9kS2V5cywgZnVuY3Rpb24oYXJ5S2V5KSB7XG4gICAgZWFjaChtYXBwaW5nLmFyeU1ldGhvZFthcnlLZXldLCBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHZhciBmdW5jID0gX1ttYXBwaW5nLnJlbWFwW2tleV0gfHwga2V5XTtcbiAgICAgIGlmIChmdW5jKSB7XG4gICAgICAgIHBhaXJzLnB1c2goW2tleSwgd3JhcChrZXksIGZ1bmMpXSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIENvbnZlcnQgcmVtYWluaW5nIG1ldGhvZHMuXG4gIGVhY2goa2V5cyhfKSwgZnVuY3Rpb24oa2V5KSB7XG4gICAgdmFyIGZ1bmMgPSBfW2tleV07XG4gICAgaWYgKHR5cGVvZiBmdW5jID09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhciBsZW5ndGggPSBwYWlycy5sZW5ndGg7XG4gICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgaWYgKHBhaXJzW2xlbmd0aF1bMF0gPT0ga2V5KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmdW5jLmNvbnZlcnQgPSBjcmVhdGVDb252ZXJ0ZXIoa2V5LCBmdW5jKTtcbiAgICAgIHBhaXJzLnB1c2goW2tleSwgZnVuY10pO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gQXNzaWduIHRvIGBfYCBsZWF2aW5nIGBfLnByb3RvdHlwZWAgdW5jaGFuZ2VkIHRvIGFsbG93IGNoYWluaW5nLlxuICBlYWNoKHBhaXJzLCBmdW5jdGlvbihwYWlyKSB7XG4gICAgX1twYWlyWzBdXSA9IHBhaXJbMV07XG4gIH0pO1xuXG4gIF8uY29udmVydCA9IGNvbnZlcnRMaWI7XG4gIGlmIChzZXRQbGFjZWhvbGRlcikge1xuICAgIF8ucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgfVxuICAvLyBBc3NpZ24gYWxpYXNlcy5cbiAgZWFjaChrZXlzKF8pLCBmdW5jdGlvbihrZXkpIHtcbiAgICBlYWNoKG1hcHBpbmcucmVhbFRvQWxpYXNba2V5XSB8fCBbXSwgZnVuY3Rpb24oYWxpYXMpIHtcbiAgICAgIF9bYWxpYXNdID0gX1trZXldO1xuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gXztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQ29udmVydDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9mcC9fYmFzZUNvbnZlcnQuanNcbi8vIG1vZHVsZSBpZCA9IDI4NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogVXNlZCB0byBtYXAgYWxpYXNlcyB0byB0aGVpciByZWFsIG5hbWVzLiAqL1xuZXhwb3J0cy5hbGlhc1RvUmVhbCA9IHtcblxuICAvLyBMb2Rhc2ggYWxpYXNlcy5cbiAgJ2VhY2gnOiAnZm9yRWFjaCcsXG4gICdlYWNoUmlnaHQnOiAnZm9yRWFjaFJpZ2h0JyxcbiAgJ2VudHJpZXMnOiAndG9QYWlycycsXG4gICdlbnRyaWVzSW4nOiAndG9QYWlyc0luJyxcbiAgJ2V4dGVuZCc6ICdhc3NpZ25JbicsXG4gICdleHRlbmRBbGwnOiAnYXNzaWduSW5BbGwnLFxuICAnZXh0ZW5kQWxsV2l0aCc6ICdhc3NpZ25JbkFsbFdpdGgnLFxuICAnZXh0ZW5kV2l0aCc6ICdhc3NpZ25JbldpdGgnLFxuICAnZmlyc3QnOiAnaGVhZCcsXG5cbiAgLy8gTWV0aG9kcyB0aGF0IGFyZSBjdXJyaWVkIHZhcmlhbnRzIG9mIG90aGVycy5cbiAgJ2NvbmZvcm1zJzogJ2NvbmZvcm1zVG8nLFxuICAnbWF0Y2hlcyc6ICdpc01hdGNoJyxcbiAgJ3Byb3BlcnR5JzogJ2dldCcsXG5cbiAgLy8gUmFtZGEgYWxpYXNlcy5cbiAgJ19fJzogJ3BsYWNlaG9sZGVyJyxcbiAgJ0YnOiAnc3R1YkZhbHNlJyxcbiAgJ1QnOiAnc3R1YlRydWUnLFxuICAnYWxsJzogJ2V2ZXJ5JyxcbiAgJ2FsbFBhc3MnOiAnb3ZlckV2ZXJ5JyxcbiAgJ2Fsd2F5cyc6ICdjb25zdGFudCcsXG4gICdhbnknOiAnc29tZScsXG4gICdhbnlQYXNzJzogJ292ZXJTb21lJyxcbiAgJ2FwcGx5JzogJ3NwcmVhZCcsXG4gICdhc3NvYyc6ICdzZXQnLFxuICAnYXNzb2NQYXRoJzogJ3NldCcsXG4gICdjb21wbGVtZW50JzogJ25lZ2F0ZScsXG4gICdjb21wb3NlJzogJ2Zsb3dSaWdodCcsXG4gICdjb250YWlucyc6ICdpbmNsdWRlcycsXG4gICdkaXNzb2MnOiAndW5zZXQnLFxuICAnZGlzc29jUGF0aCc6ICd1bnNldCcsXG4gICdkcm9wTGFzdCc6ICdkcm9wUmlnaHQnLFxuICAnZHJvcExhc3RXaGlsZSc6ICdkcm9wUmlnaHRXaGlsZScsXG4gICdlcXVhbHMnOiAnaXNFcXVhbCcsXG4gICdpZGVudGljYWwnOiAnZXEnLFxuICAnaW5kZXhCeSc6ICdrZXlCeScsXG4gICdpbml0JzogJ2luaXRpYWwnLFxuICAnaW52ZXJ0T2JqJzogJ2ludmVydCcsXG4gICdqdXh0JzogJ292ZXInLFxuICAnb21pdEFsbCc6ICdvbWl0JyxcbiAgJ25BcnknOiAnYXJ5JyxcbiAgJ3BhdGgnOiAnZ2V0JyxcbiAgJ3BhdGhFcSc6ICdtYXRjaGVzUHJvcGVydHknLFxuICAncGF0aE9yJzogJ2dldE9yJyxcbiAgJ3BhdGhzJzogJ2F0JyxcbiAgJ3BpY2tBbGwnOiAncGljaycsXG4gICdwaXBlJzogJ2Zsb3cnLFxuICAncGx1Y2snOiAnbWFwJyxcbiAgJ3Byb3AnOiAnZ2V0JyxcbiAgJ3Byb3BFcSc6ICdtYXRjaGVzUHJvcGVydHknLFxuICAncHJvcE9yJzogJ2dldE9yJyxcbiAgJ3Byb3BzJzogJ2F0JyxcbiAgJ3N5bW1ldHJpY0RpZmZlcmVuY2UnOiAneG9yJyxcbiAgJ3N5bW1ldHJpY0RpZmZlcmVuY2VCeSc6ICd4b3JCeScsXG4gICdzeW1tZXRyaWNEaWZmZXJlbmNlV2l0aCc6ICd4b3JXaXRoJyxcbiAgJ3Rha2VMYXN0JzogJ3Rha2VSaWdodCcsXG4gICd0YWtlTGFzdFdoaWxlJzogJ3Rha2VSaWdodFdoaWxlJyxcbiAgJ3VuYXBwbHknOiAncmVzdCcsXG4gICd1bm5lc3QnOiAnZmxhdHRlbicsXG4gICd1c2VXaXRoJzogJ292ZXJBcmdzJyxcbiAgJ3doZXJlJzogJ2NvbmZvcm1zVG8nLFxuICAnd2hlcmVFcSc6ICdpc01hdGNoJyxcbiAgJ3ppcE9iaic6ICd6aXBPYmplY3QnXG59O1xuXG4vKiogVXNlZCB0byBtYXAgYXJ5IHRvIG1ldGhvZCBuYW1lcy4gKi9cbmV4cG9ydHMuYXJ5TWV0aG9kID0ge1xuICAnMSc6IFtcbiAgICAnYXNzaWduQWxsJywgJ2Fzc2lnbkluQWxsJywgJ2F0dGVtcHQnLCAnY2FzdEFycmF5JywgJ2NlaWwnLCAnY3JlYXRlJyxcbiAgICAnY3VycnknLCAnY3VycnlSaWdodCcsICdkZWZhdWx0c0FsbCcsICdkZWZhdWx0c0RlZXBBbGwnLCAnZmxvb3InLCAnZmxvdycsXG4gICAgJ2Zsb3dSaWdodCcsICdmcm9tUGFpcnMnLCAnaW52ZXJ0JywgJ2l0ZXJhdGVlJywgJ21lbW9pemUnLCAnbWV0aG9kJywgJ21lcmdlQWxsJyxcbiAgICAnbWV0aG9kT2YnLCAnbWl4aW4nLCAnbnRoQXJnJywgJ292ZXInLCAnb3ZlckV2ZXJ5JywgJ292ZXJTb21lJywncmVzdCcsICdyZXZlcnNlJyxcbiAgICAncm91bmQnLCAncnVuSW5Db250ZXh0JywgJ3NwcmVhZCcsICd0ZW1wbGF0ZScsICd0cmltJywgJ3RyaW1FbmQnLCAndHJpbVN0YXJ0JyxcbiAgICAndW5pcXVlSWQnLCAnd29yZHMnLCAnemlwQWxsJ1xuICBdLFxuICAnMic6IFtcbiAgICAnYWRkJywgJ2FmdGVyJywgJ2FyeScsICdhc3NpZ24nLCAnYXNzaWduQWxsV2l0aCcsICdhc3NpZ25JbicsICdhc3NpZ25JbkFsbFdpdGgnLFxuICAgICdhdCcsICdiZWZvcmUnLCAnYmluZCcsICdiaW5kQWxsJywgJ2JpbmRLZXknLCAnY2h1bmsnLCAnY2xvbmVEZWVwV2l0aCcsXG4gICAgJ2Nsb25lV2l0aCcsICdjb25jYXQnLCAnY29uZm9ybXNUbycsICdjb3VudEJ5JywgJ2N1cnJ5TicsICdjdXJyeVJpZ2h0TicsXG4gICAgJ2RlYm91bmNlJywgJ2RlZmF1bHRzJywgJ2RlZmF1bHRzRGVlcCcsICdkZWZhdWx0VG8nLCAnZGVsYXknLCAnZGlmZmVyZW5jZScsXG4gICAgJ2RpdmlkZScsICdkcm9wJywgJ2Ryb3BSaWdodCcsICdkcm9wUmlnaHRXaGlsZScsICdkcm9wV2hpbGUnLCAnZW5kc1dpdGgnLCAnZXEnLFxuICAgICdldmVyeScsICdmaWx0ZXInLCAnZmluZCcsICdmaW5kSW5kZXgnLCAnZmluZEtleScsICdmaW5kTGFzdCcsICdmaW5kTGFzdEluZGV4JyxcbiAgICAnZmluZExhc3RLZXknLCAnZmxhdE1hcCcsICdmbGF0TWFwRGVlcCcsICdmbGF0dGVuRGVwdGgnLCAnZm9yRWFjaCcsXG4gICAgJ2ZvckVhY2hSaWdodCcsICdmb3JJbicsICdmb3JJblJpZ2h0JywgJ2Zvck93bicsICdmb3JPd25SaWdodCcsICdnZXQnLFxuICAgICdncm91cEJ5JywgJ2d0JywgJ2d0ZScsICdoYXMnLCAnaGFzSW4nLCAnaW5jbHVkZXMnLCAnaW5kZXhPZicsICdpbnRlcnNlY3Rpb24nLFxuICAgICdpbnZlcnRCeScsICdpbnZva2UnLCAnaW52b2tlTWFwJywgJ2lzRXF1YWwnLCAnaXNNYXRjaCcsICdqb2luJywgJ2tleUJ5JyxcbiAgICAnbGFzdEluZGV4T2YnLCAnbHQnLCAnbHRlJywgJ21hcCcsICdtYXBLZXlzJywgJ21hcFZhbHVlcycsICdtYXRjaGVzUHJvcGVydHknLFxuICAgICdtYXhCeScsICdtZWFuQnknLCAnbWVyZ2UnLCAnbWVyZ2VBbGxXaXRoJywgJ21pbkJ5JywgJ211bHRpcGx5JywgJ250aCcsICdvbWl0JyxcbiAgICAnb21pdEJ5JywgJ292ZXJBcmdzJywgJ3BhZCcsICdwYWRFbmQnLCAncGFkU3RhcnQnLCAncGFyc2VJbnQnLCAncGFydGlhbCcsXG4gICAgJ3BhcnRpYWxSaWdodCcsICdwYXJ0aXRpb24nLCAncGljaycsICdwaWNrQnknLCAncHJvcGVydHlPZicsICdwdWxsJywgJ3B1bGxBbGwnLFxuICAgICdwdWxsQXQnLCAncmFuZG9tJywgJ3JhbmdlJywgJ3JhbmdlUmlnaHQnLCAncmVhcmcnLCAncmVqZWN0JywgJ3JlbW92ZScsXG4gICAgJ3JlcGVhdCcsICdyZXN0RnJvbScsICdyZXN1bHQnLCAnc2FtcGxlU2l6ZScsICdzb21lJywgJ3NvcnRCeScsICdzb3J0ZWRJbmRleCcsXG4gICAgJ3NvcnRlZEluZGV4T2YnLCAnc29ydGVkTGFzdEluZGV4JywgJ3NvcnRlZExhc3RJbmRleE9mJywgJ3NvcnRlZFVuaXFCeScsXG4gICAgJ3NwbGl0JywgJ3NwcmVhZEZyb20nLCAnc3RhcnRzV2l0aCcsICdzdWJ0cmFjdCcsICdzdW1CeScsICd0YWtlJywgJ3Rha2VSaWdodCcsXG4gICAgJ3Rha2VSaWdodFdoaWxlJywgJ3Rha2VXaGlsZScsICd0YXAnLCAndGhyb3R0bGUnLCAndGhydScsICd0aW1lcycsICd0cmltQ2hhcnMnLFxuICAgICd0cmltQ2hhcnNFbmQnLCAndHJpbUNoYXJzU3RhcnQnLCAndHJ1bmNhdGUnLCAndW5pb24nLCAndW5pcUJ5JywgJ3VuaXFXaXRoJyxcbiAgICAndW5zZXQnLCAndW56aXBXaXRoJywgJ3dpdGhvdXQnLCAnd3JhcCcsICd4b3InLCAnemlwJywgJ3ppcE9iamVjdCcsXG4gICAgJ3ppcE9iamVjdERlZXAnXG4gIF0sXG4gICczJzogW1xuICAgICdhc3NpZ25JbldpdGgnLCAnYXNzaWduV2l0aCcsICdjbGFtcCcsICdkaWZmZXJlbmNlQnknLCAnZGlmZmVyZW5jZVdpdGgnLFxuICAgICdmaW5kRnJvbScsICdmaW5kSW5kZXhGcm9tJywgJ2ZpbmRMYXN0RnJvbScsICdmaW5kTGFzdEluZGV4RnJvbScsICdnZXRPcicsXG4gICAgJ2luY2x1ZGVzRnJvbScsICdpbmRleE9mRnJvbScsICdpblJhbmdlJywgJ2ludGVyc2VjdGlvbkJ5JywgJ2ludGVyc2VjdGlvbldpdGgnLFxuICAgICdpbnZva2VBcmdzJywgJ2ludm9rZUFyZ3NNYXAnLCAnaXNFcXVhbFdpdGgnLCAnaXNNYXRjaFdpdGgnLCAnZmxhdE1hcERlcHRoJyxcbiAgICAnbGFzdEluZGV4T2ZGcm9tJywgJ21lcmdlV2l0aCcsICdvcmRlckJ5JywgJ3BhZENoYXJzJywgJ3BhZENoYXJzRW5kJyxcbiAgICAncGFkQ2hhcnNTdGFydCcsICdwdWxsQWxsQnknLCAncHVsbEFsbFdpdGgnLCAncmFuZ2VTdGVwJywgJ3JhbmdlU3RlcFJpZ2h0JyxcbiAgICAncmVkdWNlJywgJ3JlZHVjZVJpZ2h0JywgJ3JlcGxhY2UnLCAnc2V0JywgJ3NsaWNlJywgJ3NvcnRlZEluZGV4QnknLFxuICAgICdzb3J0ZWRMYXN0SW5kZXhCeScsICd0cmFuc2Zvcm0nLCAndW5pb25CeScsICd1bmlvbldpdGgnLCAndXBkYXRlJywgJ3hvckJ5JyxcbiAgICAneG9yV2l0aCcsICd6aXBXaXRoJ1xuICBdLFxuICAnNCc6IFtcbiAgICAnZmlsbCcsICdzZXRXaXRoJywgJ3VwZGF0ZVdpdGgnXG4gIF1cbn07XG5cbi8qKiBVc2VkIHRvIG1hcCBhcnkgdG8gcmVhcmcgY29uZmlncy4gKi9cbmV4cG9ydHMuYXJ5UmVhcmcgPSB7XG4gICcyJzogWzEsIDBdLFxuICAnMyc6IFsyLCAwLCAxXSxcbiAgJzQnOiBbMywgMiwgMCwgMV1cbn07XG5cbi8qKiBVc2VkIHRvIG1hcCBtZXRob2QgbmFtZXMgdG8gdGhlaXIgaXRlcmF0ZWUgYXJ5LiAqL1xuZXhwb3J0cy5pdGVyYXRlZUFyeSA9IHtcbiAgJ2Ryb3BSaWdodFdoaWxlJzogMSxcbiAgJ2Ryb3BXaGlsZSc6IDEsXG4gICdldmVyeSc6IDEsXG4gICdmaWx0ZXInOiAxLFxuICAnZmluZCc6IDEsXG4gICdmaW5kRnJvbSc6IDEsXG4gICdmaW5kSW5kZXgnOiAxLFxuICAnZmluZEluZGV4RnJvbSc6IDEsXG4gICdmaW5kS2V5JzogMSxcbiAgJ2ZpbmRMYXN0JzogMSxcbiAgJ2ZpbmRMYXN0RnJvbSc6IDEsXG4gICdmaW5kTGFzdEluZGV4JzogMSxcbiAgJ2ZpbmRMYXN0SW5kZXhGcm9tJzogMSxcbiAgJ2ZpbmRMYXN0S2V5JzogMSxcbiAgJ2ZsYXRNYXAnOiAxLFxuICAnZmxhdE1hcERlZXAnOiAxLFxuICAnZmxhdE1hcERlcHRoJzogMSxcbiAgJ2ZvckVhY2gnOiAxLFxuICAnZm9yRWFjaFJpZ2h0JzogMSxcbiAgJ2ZvckluJzogMSxcbiAgJ2ZvckluUmlnaHQnOiAxLFxuICAnZm9yT3duJzogMSxcbiAgJ2Zvck93blJpZ2h0JzogMSxcbiAgJ21hcCc6IDEsXG4gICdtYXBLZXlzJzogMSxcbiAgJ21hcFZhbHVlcyc6IDEsXG4gICdwYXJ0aXRpb24nOiAxLFxuICAncmVkdWNlJzogMixcbiAgJ3JlZHVjZVJpZ2h0JzogMixcbiAgJ3JlamVjdCc6IDEsXG4gICdyZW1vdmUnOiAxLFxuICAnc29tZSc6IDEsXG4gICd0YWtlUmlnaHRXaGlsZSc6IDEsXG4gICd0YWtlV2hpbGUnOiAxLFxuICAndGltZXMnOiAxLFxuICAndHJhbnNmb3JtJzogMlxufTtcblxuLyoqIFVzZWQgdG8gbWFwIG1ldGhvZCBuYW1lcyB0byBpdGVyYXRlZSByZWFyZyBjb25maWdzLiAqL1xuZXhwb3J0cy5pdGVyYXRlZVJlYXJnID0ge1xuICAnbWFwS2V5cyc6IFsxXSxcbiAgJ3JlZHVjZVJpZ2h0JzogWzEsIDBdXG59O1xuXG4vKiogVXNlZCB0byBtYXAgbWV0aG9kIG5hbWVzIHRvIHJlYXJnIGNvbmZpZ3MuICovXG5leHBvcnRzLm1ldGhvZFJlYXJnID0ge1xuICAnYXNzaWduSW5BbGxXaXRoJzogWzEsIDBdLFxuICAnYXNzaWduSW5XaXRoJzogWzEsIDIsIDBdLFxuICAnYXNzaWduQWxsV2l0aCc6IFsxLCAwXSxcbiAgJ2Fzc2lnbldpdGgnOiBbMSwgMiwgMF0sXG4gICdkaWZmZXJlbmNlQnknOiBbMSwgMiwgMF0sXG4gICdkaWZmZXJlbmNlV2l0aCc6IFsxLCAyLCAwXSxcbiAgJ2dldE9yJzogWzIsIDEsIDBdLFxuICAnaW50ZXJzZWN0aW9uQnknOiBbMSwgMiwgMF0sXG4gICdpbnRlcnNlY3Rpb25XaXRoJzogWzEsIDIsIDBdLFxuICAnaXNFcXVhbFdpdGgnOiBbMSwgMiwgMF0sXG4gICdpc01hdGNoV2l0aCc6IFsyLCAxLCAwXSxcbiAgJ21lcmdlQWxsV2l0aCc6IFsxLCAwXSxcbiAgJ21lcmdlV2l0aCc6IFsxLCAyLCAwXSxcbiAgJ3BhZENoYXJzJzogWzIsIDEsIDBdLFxuICAncGFkQ2hhcnNFbmQnOiBbMiwgMSwgMF0sXG4gICdwYWRDaGFyc1N0YXJ0JzogWzIsIDEsIDBdLFxuICAncHVsbEFsbEJ5JzogWzIsIDEsIDBdLFxuICAncHVsbEFsbFdpdGgnOiBbMiwgMSwgMF0sXG4gICdyYW5nZVN0ZXAnOiBbMSwgMiwgMF0sXG4gICdyYW5nZVN0ZXBSaWdodCc6IFsxLCAyLCAwXSxcbiAgJ3NldFdpdGgnOiBbMywgMSwgMiwgMF0sXG4gICdzb3J0ZWRJbmRleEJ5JzogWzIsIDEsIDBdLFxuICAnc29ydGVkTGFzdEluZGV4QnknOiBbMiwgMSwgMF0sXG4gICd1bmlvbkJ5JzogWzEsIDIsIDBdLFxuICAndW5pb25XaXRoJzogWzEsIDIsIDBdLFxuICAndXBkYXRlV2l0aCc6IFszLCAxLCAyLCAwXSxcbiAgJ3hvckJ5JzogWzEsIDIsIDBdLFxuICAneG9yV2l0aCc6IFsxLCAyLCAwXSxcbiAgJ3ppcFdpdGgnOiBbMSwgMiwgMF1cbn07XG5cbi8qKiBVc2VkIHRvIG1hcCBtZXRob2QgbmFtZXMgdG8gc3ByZWFkIGNvbmZpZ3MuICovXG5leHBvcnRzLm1ldGhvZFNwcmVhZCA9IHtcbiAgJ2Fzc2lnbkFsbCc6IHsgJ3N0YXJ0JzogMCB9LFxuICAnYXNzaWduQWxsV2l0aCc6IHsgJ3N0YXJ0JzogMCB9LFxuICAnYXNzaWduSW5BbGwnOiB7ICdzdGFydCc6IDAgfSxcbiAgJ2Fzc2lnbkluQWxsV2l0aCc6IHsgJ3N0YXJ0JzogMCB9LFxuICAnZGVmYXVsdHNBbGwnOiB7ICdzdGFydCc6IDAgfSxcbiAgJ2RlZmF1bHRzRGVlcEFsbCc6IHsgJ3N0YXJ0JzogMCB9LFxuICAnaW52b2tlQXJncyc6IHsgJ3N0YXJ0JzogMiB9LFxuICAnaW52b2tlQXJnc01hcCc6IHsgJ3N0YXJ0JzogMiB9LFxuICAnbWVyZ2VBbGwnOiB7ICdzdGFydCc6IDAgfSxcbiAgJ21lcmdlQWxsV2l0aCc6IHsgJ3N0YXJ0JzogMCB9LFxuICAncGFydGlhbCc6IHsgJ3N0YXJ0JzogMSB9LFxuICAncGFydGlhbFJpZ2h0JzogeyAnc3RhcnQnOiAxIH0sXG4gICd3aXRob3V0JzogeyAnc3RhcnQnOiAxIH0sXG4gICd6aXBBbGwnOiB7ICdzdGFydCc6IDAgfVxufTtcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgbWV0aG9kcyB3aGljaCBtdXRhdGUgYXJyYXlzIG9yIG9iamVjdHMuICovXG5leHBvcnRzLm11dGF0ZSA9IHtcbiAgJ2FycmF5Jzoge1xuICAgICdmaWxsJzogdHJ1ZSxcbiAgICAncHVsbCc6IHRydWUsXG4gICAgJ3B1bGxBbGwnOiB0cnVlLFxuICAgICdwdWxsQWxsQnknOiB0cnVlLFxuICAgICdwdWxsQWxsV2l0aCc6IHRydWUsXG4gICAgJ3B1bGxBdCc6IHRydWUsXG4gICAgJ3JlbW92ZSc6IHRydWUsXG4gICAgJ3JldmVyc2UnOiB0cnVlXG4gIH0sXG4gICdvYmplY3QnOiB7XG4gICAgJ2Fzc2lnbic6IHRydWUsXG4gICAgJ2Fzc2lnbkFsbCc6IHRydWUsXG4gICAgJ2Fzc2lnbkFsbFdpdGgnOiB0cnVlLFxuICAgICdhc3NpZ25Jbic6IHRydWUsXG4gICAgJ2Fzc2lnbkluQWxsJzogdHJ1ZSxcbiAgICAnYXNzaWduSW5BbGxXaXRoJzogdHJ1ZSxcbiAgICAnYXNzaWduSW5XaXRoJzogdHJ1ZSxcbiAgICAnYXNzaWduV2l0aCc6IHRydWUsXG4gICAgJ2RlZmF1bHRzJzogdHJ1ZSxcbiAgICAnZGVmYXVsdHNBbGwnOiB0cnVlLFxuICAgICdkZWZhdWx0c0RlZXAnOiB0cnVlLFxuICAgICdkZWZhdWx0c0RlZXBBbGwnOiB0cnVlLFxuICAgICdtZXJnZSc6IHRydWUsXG4gICAgJ21lcmdlQWxsJzogdHJ1ZSxcbiAgICAnbWVyZ2VBbGxXaXRoJzogdHJ1ZSxcbiAgICAnbWVyZ2VXaXRoJzogdHJ1ZSxcbiAgfSxcbiAgJ3NldCc6IHtcbiAgICAnc2V0JzogdHJ1ZSxcbiAgICAnc2V0V2l0aCc6IHRydWUsXG4gICAgJ3Vuc2V0JzogdHJ1ZSxcbiAgICAndXBkYXRlJzogdHJ1ZSxcbiAgICAndXBkYXRlV2l0aCc6IHRydWVcbiAgfVxufTtcblxuLyoqIFVzZWQgdG8gdHJhY2sgbWV0aG9kcyB3aXRoIHBsYWNlaG9sZGVyIHN1cHBvcnQgKi9cbmV4cG9ydHMucGxhY2Vob2xkZXIgPSB7XG4gICdiaW5kJzogdHJ1ZSxcbiAgJ2JpbmRLZXknOiB0cnVlLFxuICAnY3VycnknOiB0cnVlLFxuICAnY3VycnlSaWdodCc6IHRydWUsXG4gICdwYXJ0aWFsJzogdHJ1ZSxcbiAgJ3BhcnRpYWxSaWdodCc6IHRydWVcbn07XG5cbi8qKiBVc2VkIHRvIG1hcCByZWFsIG5hbWVzIHRvIHRoZWlyIGFsaWFzZXMuICovXG5leHBvcnRzLnJlYWxUb0FsaWFzID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LFxuICAgICAgb2JqZWN0ID0gZXhwb3J0cy5hbGlhc1RvUmVhbCxcbiAgICAgIHJlc3VsdCA9IHt9O1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChyZXN1bHQsIHZhbHVlKSkge1xuICAgICAgcmVzdWx0W3ZhbHVlXS5wdXNoKGtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFt2YWx1ZV0gPSBba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0oKSk7XG5cbi8qKiBVc2VkIHRvIG1hcCBtZXRob2QgbmFtZXMgdG8gb3RoZXIgbmFtZXMuICovXG5leHBvcnRzLnJlbWFwID0ge1xuICAnYXNzaWduQWxsJzogJ2Fzc2lnbicsXG4gICdhc3NpZ25BbGxXaXRoJzogJ2Fzc2lnbldpdGgnLFxuICAnYXNzaWduSW5BbGwnOiAnYXNzaWduSW4nLFxuICAnYXNzaWduSW5BbGxXaXRoJzogJ2Fzc2lnbkluV2l0aCcsXG4gICdjdXJyeU4nOiAnY3VycnknLFxuICAnY3VycnlSaWdodE4nOiAnY3VycnlSaWdodCcsXG4gICdkZWZhdWx0c0FsbCc6ICdkZWZhdWx0cycsXG4gICdkZWZhdWx0c0RlZXBBbGwnOiAnZGVmYXVsdHNEZWVwJyxcbiAgJ2ZpbmRGcm9tJzogJ2ZpbmQnLFxuICAnZmluZEluZGV4RnJvbSc6ICdmaW5kSW5kZXgnLFxuICAnZmluZExhc3RGcm9tJzogJ2ZpbmRMYXN0JyxcbiAgJ2ZpbmRMYXN0SW5kZXhGcm9tJzogJ2ZpbmRMYXN0SW5kZXgnLFxuICAnZ2V0T3InOiAnZ2V0JyxcbiAgJ2luY2x1ZGVzRnJvbSc6ICdpbmNsdWRlcycsXG4gICdpbmRleE9mRnJvbSc6ICdpbmRleE9mJyxcbiAgJ2ludm9rZUFyZ3MnOiAnaW52b2tlJyxcbiAgJ2ludm9rZUFyZ3NNYXAnOiAnaW52b2tlTWFwJyxcbiAgJ2xhc3RJbmRleE9mRnJvbSc6ICdsYXN0SW5kZXhPZicsXG4gICdtZXJnZUFsbCc6ICdtZXJnZScsXG4gICdtZXJnZUFsbFdpdGgnOiAnbWVyZ2VXaXRoJyxcbiAgJ3BhZENoYXJzJzogJ3BhZCcsXG4gICdwYWRDaGFyc0VuZCc6ICdwYWRFbmQnLFxuICAncGFkQ2hhcnNTdGFydCc6ICdwYWRTdGFydCcsXG4gICdwcm9wZXJ0eU9mJzogJ2dldCcsXG4gICdyYW5nZVN0ZXAnOiAncmFuZ2UnLFxuICAncmFuZ2VTdGVwUmlnaHQnOiAncmFuZ2VSaWdodCcsXG4gICdyZXN0RnJvbSc6ICdyZXN0JyxcbiAgJ3NwcmVhZEZyb20nOiAnc3ByZWFkJyxcbiAgJ3RyaW1DaGFycyc6ICd0cmltJyxcbiAgJ3RyaW1DaGFyc0VuZCc6ICd0cmltRW5kJyxcbiAgJ3RyaW1DaGFyc1N0YXJ0JzogJ3RyaW1TdGFydCcsXG4gICd6aXBBbGwnOiAnemlwJ1xufTtcblxuLyoqIFVzZWQgdG8gdHJhY2sgbWV0aG9kcyB0aGF0IHNraXAgZml4aW5nIHRoZWlyIGFyaXR5LiAqL1xuZXhwb3J0cy5za2lwRml4ZWQgPSB7XG4gICdjYXN0QXJyYXknOiB0cnVlLFxuICAnZmxvdyc6IHRydWUsXG4gICdmbG93UmlnaHQnOiB0cnVlLFxuICAnaXRlcmF0ZWUnOiB0cnVlLFxuICAnbWl4aW4nOiB0cnVlLFxuICAncmVhcmcnOiB0cnVlLFxuICAncnVuSW5Db250ZXh0JzogdHJ1ZVxufTtcblxuLyoqIFVzZWQgdG8gdHJhY2sgbWV0aG9kcyB0aGF0IHNraXAgcmVhcnJhbmdpbmcgYXJndW1lbnRzLiAqL1xuZXhwb3J0cy5za2lwUmVhcmcgPSB7XG4gICdhZGQnOiB0cnVlLFxuICAnYXNzaWduJzogdHJ1ZSxcbiAgJ2Fzc2lnbkluJzogdHJ1ZSxcbiAgJ2JpbmQnOiB0cnVlLFxuICAnYmluZEtleSc6IHRydWUsXG4gICdjb25jYXQnOiB0cnVlLFxuICAnZGlmZmVyZW5jZSc6IHRydWUsXG4gICdkaXZpZGUnOiB0cnVlLFxuICAnZXEnOiB0cnVlLFxuICAnZ3QnOiB0cnVlLFxuICAnZ3RlJzogdHJ1ZSxcbiAgJ2lzRXF1YWwnOiB0cnVlLFxuICAnbHQnOiB0cnVlLFxuICAnbHRlJzogdHJ1ZSxcbiAgJ21hdGNoZXNQcm9wZXJ0eSc6IHRydWUsXG4gICdtZXJnZSc6IHRydWUsXG4gICdtdWx0aXBseSc6IHRydWUsXG4gICdvdmVyQXJncyc6IHRydWUsXG4gICdwYXJ0aWFsJzogdHJ1ZSxcbiAgJ3BhcnRpYWxSaWdodCc6IHRydWUsXG4gICdwcm9wZXJ0eU9mJzogdHJ1ZSxcbiAgJ3JhbmRvbSc6IHRydWUsXG4gICdyYW5nZSc6IHRydWUsXG4gICdyYW5nZVJpZ2h0JzogdHJ1ZSxcbiAgJ3N1YnRyYWN0JzogdHJ1ZSxcbiAgJ3ppcCc6IHRydWUsXG4gICd6aXBPYmplY3QnOiB0cnVlLFxuICAnemlwT2JqZWN0RGVlcCc6IHRydWVcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvZnAvX21hcHBpbmcuanNcbi8vIG1vZHVsZSBpZCA9IDI4N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIFRoZSBkZWZhdWx0IGFyZ3VtZW50IHBsYWNlaG9sZGVyIHZhbHVlIGZvciBtZXRob2RzLlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0ge307XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvZnAvcGxhY2Vob2xkZXIuanNcbi8vIG1vZHVsZSBpZCA9IDI4OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgQXN5bmNDb21wb25lbnQgZnJvbSAnY29tcG9uZW50cy9Bc3luY0NvbXBvbmVudCc7XG5pbXBvcnQgeyBJRGFzaGJvYXJkUHJvcHMgfSBmcm9tICdjb21wb25lbnRzL0Rhc2hib2FyZCc7XG5pbXBvcnQgUm91dGVDb21wb25lbnQgZnJvbSAnaG9jL1JvdXRlQ29tcG9uZW50JztcbmltcG9ydCBSb3V0ZUVycm9yIGZyb20gJ2hvYy9Sb3V0ZUVycm9yJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBSb3V0ZUNvbXBvbmVudFByb3BzIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCBFcnJvclJvdXRlIGZyb20gJ3JvdXRlcy9FcnJvcic7XG5cbmNvbnN0IERhc2hib2FyZDogUmVhY3QuU0ZDPElEYXNoYm9hcmRQcm9wcz4gPSAocHJvcHMpID0+IHtcblxuXHRyZXR1cm4gKFxuXHRcdDxBc3luY0NvbXBvbmVudFxuXHRcdFx0Ly8gVE9ETzogQ29uc2lkZXIgY3JlYXRpbmcgYSB1dGlsaXR5IGNvbXBvbmVudCB0byBhdm9pZCB0aGlzIHJlcGV0aXRpb24uXG5cdFx0XHRlcnJvckNvbXBvbmVudD17IFJvdXRlQ29tcG9uZW50KFJvdXRlRXJyb3IoRXJyb3JSb3V0ZSwgeyBzdGF0dXM6IDQwNCB9KSkgfVxuXHRcdFx0Ly8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIGpzeC1uby1sYW1iZGFcblx0XHRcdGdldENvbXBvbmVudD17ICgpID0+IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiBcImRhc2hib2FyZFwiICovICdjb21wb25lbnRzL0Rhc2hib2FyZCcpIH1cblx0XHRcdHsgLi4ucHJvcHMgfVxuXHRcdC8+XG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEYXNoYm9hcmQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcm91dGVzL0Rhc2hib2FyZC50c3giLCJpbXBvcnQgQXN5bmNDb21wb25lbnQgZnJvbSAnY29tcG9uZW50cy9Bc3luY0NvbXBvbmVudCc7XG5pbXBvcnQgeyBJTW9uaXRvcmluZ1Byb3BzIH0gZnJvbSAnY29tcG9uZW50cy9Nb25pdG9yaW5nJztcbmltcG9ydCBSb3V0ZUNvbXBvbmVudCBmcm9tICdob2MvUm91dGVDb21wb25lbnQnO1xuaW1wb3J0IFJvdXRlRXJyb3IgZnJvbSAnaG9jL1JvdXRlRXJyb3InO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFJvdXRlQ29tcG9uZW50UHJvcHMgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IEVycm9yUm91dGUgZnJvbSAncm91dGVzL0Vycm9yJztcblxuY29uc3QgTW9uaXRvcmluZzogUmVhY3QuU0ZDPElNb25pdG9yaW5nUHJvcHM+ID0gKHByb3BzKSA9PiB7XG5cblx0cmV0dXJuIChcblx0XHQ8QXN5bmNDb21wb25lbnRcblx0XHRcdC8vIFRPRE86IENvbnNpZGVyIGNyZWF0aW5nIGEgdXRpbGl0eSBjb21wb25lbnQgdG8gYXZvaWQgdGhpcyByZXBldGl0aW9uLlxuXHRcdFx0ZXJyb3JDb21wb25lbnQ9eyBSb3V0ZUNvbXBvbmVudChSb3V0ZUVycm9yKEVycm9yUm91dGUsIHsgc3RhdHVzOiA0MDQgfSkpIH1cblx0XHRcdC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBqc3gtbm8tbGFtYmRhXG5cdFx0XHRnZXRDb21wb25lbnQ9eyAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJtb25pdG9yaW5nXCIgKi8gJ2NvbXBvbmVudHMvTW9uaXRvcmluZycpIH1cblx0XHRcdHsgLi4ucHJvcHMgfVxuXHRcdC8+XG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNb25pdG9yaW5nO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JvdXRlcy9Nb25pdG9yaW5nLnRzeCIsImltcG9ydCB7IFJvdXRlUHJvcHMgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuXG5leHBvcnQgdHlwZSBJUGFydGlhbFJvdXRlUHJvcHMgPSBSb3V0ZVByb3BzICYge1xuXHRjb21wb25lbnRJZD86IHN0cmluZ1xufTtcblxuY29uc3QgUk9VVEVTOiBJUGFydGlhbFJvdXRlUHJvcHNbXSA9IFt7XG5cdGNvbXBvbmVudElkOiAnRGFzaGJvYXJkJyxcblx0ZXhhY3Q6IHRydWUsXG5cdHBhdGg6ICcvJyxcbn0sXG57XG5cdGNvbXBvbmVudElkOiAnTW9uaXRvcmluZycsXG5cdHBhdGg6ICcvbW9uaXRvcmluZy86aWQnXG59LFxue1xuXHRjb21wb25lbnRJZDogJ0FkbWluJyxcblx0cGF0aDogJy9hZG1pbidcbn1dO1xuXG5leHBvcnQgZGVmYXVsdCBST1VURVM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zaGFyZWQvcm91dGVzL2NvbmZpZy50cyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jbGllbnQvY29tcG9uZW50cy9NYWluL3N0eWxlcy5zY3NzXG4vLyBtb2R1bGUgaWQgPSAyOTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGFwcElzTG9hZGluZyBmcm9tICdyZWR1Y2Vycy9hcHBJc0xvYWRpbmdSZWR1Y2VyJztcbmltcG9ydCBleGFtcGxlIGZyb20gJ3JlZHVjZXJzL2V4YW1wbGVSZWR1Y2VyJztcbmltcG9ydCByb3V0ZUlzTG9hZGluZyBmcm9tICdyZWR1Y2Vycy9yb3V0ZUlzTG9hZGluZ1JlZHVjZXInO1xuaW1wb3J0IHsgYXBwbHlNaWRkbGV3YXJlLCBjb21iaW5lUmVkdWNlcnMsIGNyZWF0ZVN0b3JlLCBNaWRkbGV3YXJlLCBSZWR1Y2Vyc01hcE9iamVjdCwgU3RvcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tICdyZWR1eC1sb2dnZXInO1xuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJztcbmltcG9ydCB7IElTdG9yZVN0YXRlIH0gZnJvbSAnc3RvcmUnO1xuXG5jb25zdCBkZXY6IGJvb2xlYW4gPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JztcblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG1heC1saW5lLWxlbmd0aFxuY29uc3QgY29uZmlndXJlU3RvcmUgPSAoaW5pdGlhbFN0YXRlOiBQYXJ0aWFsPElTdG9yZVN0YXRlPiA9IHt9LCBpbml0aWFsUmVkdWNlcnM6IFJlZHVjZXJzTWFwT2JqZWN0ID0ge30pOiBTdG9yZTxJU3RvcmVTdGF0ZT4gPT4ge1xuXG5cdGNvbnN0IHJlZHVjZXJzOiBSZWR1Y2Vyc01hcE9iamVjdCA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdGFwcElzTG9hZGluZyxcblx0XHRleGFtcGxlLFxuXHRcdHJvdXRlSXNMb2FkaW5nXG5cdH0sIGluaXRpYWxSZWR1Y2Vycyk7XG5cblx0Y29uc3QgbWlkZGxld2FyZTogTWlkZGxld2FyZVtdID0gW3RodW5rXTtcblxuXHRpZiAoZGV2KSB7XG5cdFx0bWlkZGxld2FyZS5wdXNoKGNyZWF0ZUxvZ2dlcigpKTtcblx0fVxuXG5cdHJldHVybiBjcmVhdGVTdG9yZShcblx0XHRjb21iaW5lUmVkdWNlcnM8SVN0b3JlU3RhdGU+KHJlZHVjZXJzKSxcblx0XHRpbml0aWFsU3RhdGUgYXMgSVN0b3JlU3RhdGUsXG5cdFx0YXBwbHlNaWRkbGV3YXJlKC4uLm1pZGRsZXdhcmUpXG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWd1cmVTdG9yZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zdG9yZS9jb25maWd1cmVTdG9yZS50cyIsImltcG9ydCB7IElMb2FkQWN0aW9uLCBJc0xvYWRpbmdTdGF0ZSB9IGZyb20gJ2FjdGlvbnMnO1xuaW1wb3J0IEFjdGlvblR5cGVzIGZyb20gJ2FjdGlvbnMvYWN0aW9uVHlwZXMnO1xuaW1wb3J0IHsgUmVkdWNlciB9IGZyb20gJ3JlZHV4JztcblxuY29uc3QgSU5JVElBTF9TVEFURTogSXNMb2FkaW5nU3RhdGUgPSBmYWxzZTtcblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG1heC1saW5lLWxlbmd0aFxuY29uc3QgYXBwSXNMb2FkaW5nUmVkdWNlcjogUmVkdWNlcjxJc0xvYWRpbmdTdGF0ZT4gPSAoc3RhdGU6IElzTG9hZGluZ1N0YXRlID0gSU5JVElBTF9TVEFURSwgYWN0aW9uOiBJTG9hZEFjdGlvbik6IElzTG9hZGluZ1N0YXRlID0+IHtcblxuXHRjb25zdCB7IHR5cGUsIHZhbHVlIH0gPSBhY3Rpb247XG5cblx0c3dpdGNoICh0eXBlKSB7XG5cblx0XHRjYXNlIEFjdGlvblR5cGVzLkFwcElzTG9hZGluZzoge1xuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH1cblx0XHRkZWZhdWx0OiB7XG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhcHBJc0xvYWRpbmdSZWR1Y2VyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JlZHVjZXJzL2FwcElzTG9hZGluZ1JlZHVjZXIudHMiLCJpbXBvcnQgeyBJQXN5bmNBY3Rpb24gfSBmcm9tICdhY3Rpb25zJztcbmltcG9ydCBBY3Rpb25UeXBlcyBmcm9tICdhY3Rpb25zL2FjdGlvblR5cGVzJztcbmltcG9ydCB7IFJlZHVjZXIgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgZ2V0QXN5bmNTdGF0ZSBmcm9tICdzdG9yZS9nZXRBc3luY1N0YXRlJztcblxuZXhwb3J0IGludGVyZmFjZSBJRXhhbXBsZVN0YXRlIHtcblx0aWQ6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgSUFzeW5jRXhhbXBsZVN0YXRlID0gSUFzeW5jU3RhdGU8SUV4YW1wbGVTdGF0ZT4gfCBudWxsO1xuXG5jb25zdCBJTklUSUFMX1NUQVRFOiBJQXN5bmNFeGFtcGxlU3RhdGUgPSBudWxsO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxpbmUtbGVuZ3RoXG5jb25zdCBleGFtcGxlUmVkdWNlcjogUmVkdWNlcjxJQXN5bmNFeGFtcGxlU3RhdGU+ID0gKHN0YXRlOiBJQXN5bmNFeGFtcGxlU3RhdGUgPSBJTklUSUFMX1NUQVRFLCBhY3Rpb246IElBc3luY0FjdGlvbjxJRXhhbXBsZVN0YXRlPik6IElBc3luY0V4YW1wbGVTdGF0ZSA9PiB7XG5cblx0Y29uc3QgeyB0eXBlIH0gPSBhY3Rpb247XG5cblx0c3dpdGNoICh0eXBlKSB7XG5cblx0XHRjYXNlIEFjdGlvblR5cGVzLkdldEV4YW1wbGU6IHtcblx0XHRcdHJldHVybiBnZXRBc3luY1N0YXRlPElFeGFtcGxlU3RhdGU+KGFjdGlvbiwgc3RhdGUpO1xuXHRcdH1cblx0XHRkZWZhdWx0OiB7XG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBleGFtcGxlUmVkdWNlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9yZWR1Y2Vycy9leGFtcGxlUmVkdWNlci50cyIsImltcG9ydCB7IElMb2FkQWN0aW9uLCBJc0xvYWRpbmdTdGF0ZSB9IGZyb20gJ2FjdGlvbnMnO1xuaW1wb3J0IEFjdGlvblR5cGVzIGZyb20gJ2FjdGlvbnMvYWN0aW9uVHlwZXMnO1xuaW1wb3J0IHsgUmVkdWNlciB9IGZyb20gJ3JlZHV4JztcblxuY29uc3QgSU5JVElBTF9TVEFURTogSXNMb2FkaW5nU3RhdGUgPSBmYWxzZTtcblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG1heC1saW5lLWxlbmd0aFxuY29uc3Qgcm91dGVJc0xvYWRpbmdSZWR1Y2VyOiBSZWR1Y2VyPElzTG9hZGluZ1N0YXRlPiA9IChzdGF0ZTogSXNMb2FkaW5nU3RhdGUgPSBJTklUSUFMX1NUQVRFLCBhY3Rpb246IElMb2FkQWN0aW9uKTogSXNMb2FkaW5nU3RhdGUgPT4ge1xuXG5cdGNvbnN0IHsgdHlwZSwgdmFsdWUgfSA9IGFjdGlvbjtcblxuXHRzd2l0Y2ggKHR5cGUpIHtcblxuXHRcdGNhc2UgQWN0aW9uVHlwZXMuUm91dGVJc0xvYWRpbmc6IHtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9XG5cdFx0ZGVmYXVsdDoge1xuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVJc0xvYWRpbmdSZWR1Y2VyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JlZHVjZXJzL3JvdXRlSXNMb2FkaW5nUmVkdWNlci50cyIsIiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP3QoZXhwb3J0cyk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXCJleHBvcnRzXCJdLHQpOnQoZS5yZWR1eExvZ2dlcj1lLnJlZHV4TG9nZ2VyfHx7fSl9KHRoaXMsZnVuY3Rpb24oZSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdChlLHQpe2Uuc3VwZXJfPXQsZS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZSh0LnByb3RvdHlwZSx7Y29uc3RydWN0b3I6e3ZhbHVlOmUsZW51bWVyYWJsZTohMSx3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9fSl9ZnVuY3Rpb24gcihlLHQpe09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwia2luZFwiLHt2YWx1ZTplLGVudW1lcmFibGU6ITB9KSx0JiZ0Lmxlbmd0aCYmT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJwYXRoXCIse3ZhbHVlOnQsZW51bWVyYWJsZTohMH0pfWZ1bmN0aW9uIG4oZSx0LHIpe24uc3VwZXJfLmNhbGwodGhpcyxcIkVcIixlKSxPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyxcImxoc1wiLHt2YWx1ZTp0LGVudW1lcmFibGU6ITB9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyxcInJoc1wiLHt2YWx1ZTpyLGVudW1lcmFibGU6ITB9KX1mdW5jdGlvbiBvKGUsdCl7by5zdXBlcl8uY2FsbCh0aGlzLFwiTlwiLGUpLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwicmhzXCIse3ZhbHVlOnQsZW51bWVyYWJsZTohMH0pfWZ1bmN0aW9uIGkoZSx0KXtpLnN1cGVyXy5jYWxsKHRoaXMsXCJEXCIsZSksT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJsaHNcIix7dmFsdWU6dCxlbnVtZXJhYmxlOiEwfSl9ZnVuY3Rpb24gYShlLHQscil7YS5zdXBlcl8uY2FsbCh0aGlzLFwiQVwiLGUpLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwiaW5kZXhcIix7dmFsdWU6dCxlbnVtZXJhYmxlOiEwfSksT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJpdGVtXCIse3ZhbHVlOnIsZW51bWVyYWJsZTohMH0pfWZ1bmN0aW9uIGYoZSx0LHIpe3ZhciBuPWUuc2xpY2UoKHJ8fHQpKzF8fGUubGVuZ3RoKTtyZXR1cm4gZS5sZW5ndGg9dDwwP2UubGVuZ3RoK3Q6dCxlLnB1c2guYXBwbHkoZSxuKSxlfWZ1bmN0aW9uIHUoZSl7dmFyIHQ9XCJ1bmRlZmluZWRcIj09dHlwZW9mIGU/XCJ1bmRlZmluZWRcIjpOKGUpO3JldHVyblwib2JqZWN0XCIhPT10P3Q6ZT09PU1hdGg/XCJtYXRoXCI6bnVsbD09PWU/XCJudWxsXCI6QXJyYXkuaXNBcnJheShlKT9cImFycmF5XCI6XCJbb2JqZWN0IERhdGVdXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSk/XCJkYXRlXCI6XCJmdW5jdGlvblwiPT10eXBlb2YgZS50b1N0cmluZyYmL15cXC8uKlxcLy8udGVzdChlLnRvU3RyaW5nKCkpP1wicmVnZXhwXCI6XCJvYmplY3RcIn1mdW5jdGlvbiBsKGUsdCxyLGMscyxkLHApe3M9c3x8W10scD1wfHxbXTt2YXIgZz1zLnNsaWNlKDApO2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBkKXtpZihjKXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBjJiZjKGcsZCkpcmV0dXJuO2lmKFwib2JqZWN0XCI9PT0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIGM/XCJ1bmRlZmluZWRcIjpOKGMpKSl7aWYoYy5wcmVmaWx0ZXImJmMucHJlZmlsdGVyKGcsZCkpcmV0dXJuO2lmKGMubm9ybWFsaXplKXt2YXIgaD1jLm5vcm1hbGl6ZShnLGQsZSx0KTtoJiYoZT1oWzBdLHQ9aFsxXSl9fX1nLnB1c2goZCl9XCJyZWdleHBcIj09PXUoZSkmJlwicmVnZXhwXCI9PT11KHQpJiYoZT1lLnRvU3RyaW5nKCksdD10LnRvU3RyaW5nKCkpO3ZhciB5PVwidW5kZWZpbmVkXCI9PXR5cGVvZiBlP1widW5kZWZpbmVkXCI6TihlKSx2PVwidW5kZWZpbmVkXCI9PXR5cGVvZiB0P1widW5kZWZpbmVkXCI6Tih0KSxiPVwidW5kZWZpbmVkXCIhPT15fHxwJiZwW3AubGVuZ3RoLTFdLmxocyYmcFtwLmxlbmd0aC0xXS5saHMuaGFzT3duUHJvcGVydHkoZCksbT1cInVuZGVmaW5lZFwiIT09dnx8cCYmcFtwLmxlbmd0aC0xXS5yaHMmJnBbcC5sZW5ndGgtMV0ucmhzLmhhc093blByb3BlcnR5KGQpO2lmKCFiJiZtKXIobmV3IG8oZyx0KSk7ZWxzZSBpZighbSYmYilyKG5ldyBpKGcsZSkpO2Vsc2UgaWYodShlKSE9PXUodCkpcihuZXcgbihnLGUsdCkpO2Vsc2UgaWYoXCJkYXRlXCI9PT11KGUpJiZlLXQhPT0wKXIobmV3IG4oZyxlLHQpKTtlbHNlIGlmKFwib2JqZWN0XCI9PT15JiZudWxsIT09ZSYmbnVsbCE9PXQpaWYocC5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuIHQubGhzPT09ZX0pLmxlbmd0aCllIT09dCYmcihuZXcgbihnLGUsdCkpO2Vsc2V7aWYocC5wdXNoKHtsaHM6ZSxyaHM6dH0pLEFycmF5LmlzQXJyYXkoZSkpe3ZhciB3O2UubGVuZ3RoO2Zvcih3PTA7dzxlLmxlbmd0aDt3Kyspdz49dC5sZW5ndGg/cihuZXcgYShnLHcsbmV3IGkodm9pZCAwLGVbd10pKSk6bChlW3ddLHRbd10scixjLGcsdyxwKTtmb3IoO3c8dC5sZW5ndGg7KXIobmV3IGEoZyx3LG5ldyBvKHZvaWQgMCx0W3crK10pKSl9ZWxzZXt2YXIgeD1PYmplY3Qua2V5cyhlKSxTPU9iamVjdC5rZXlzKHQpO3guZm9yRWFjaChmdW5jdGlvbihuLG8pe3ZhciBpPVMuaW5kZXhPZihuKTtpPj0wPyhsKGVbbl0sdFtuXSxyLGMsZyxuLHApLFM9ZihTLGkpKTpsKGVbbl0sdm9pZCAwLHIsYyxnLG4scCl9KSxTLmZvckVhY2goZnVuY3Rpb24oZSl7bCh2b2lkIDAsdFtlXSxyLGMsZyxlLHApfSl9cC5sZW5ndGg9cC5sZW5ndGgtMX1lbHNlIGUhPT10JiYoXCJudW1iZXJcIj09PXkmJmlzTmFOKGUpJiZpc05hTih0KXx8cihuZXcgbihnLGUsdCkpKX1mdW5jdGlvbiBjKGUsdCxyLG4pe3JldHVybiBuPW58fFtdLGwoZSx0LGZ1bmN0aW9uKGUpe2UmJm4ucHVzaChlKX0sciksbi5sZW5ndGg/bjp2b2lkIDB9ZnVuY3Rpb24gcyhlLHQscil7aWYoci5wYXRoJiZyLnBhdGgubGVuZ3RoKXt2YXIgbixvPWVbdF0saT1yLnBhdGgubGVuZ3RoLTE7Zm9yKG49MDtuPGk7bisrKW89b1tyLnBhdGhbbl1dO3N3aXRjaChyLmtpbmQpe2Nhc2VcIkFcIjpzKG9bci5wYXRoW25dXSxyLmluZGV4LHIuaXRlbSk7YnJlYWs7Y2FzZVwiRFwiOmRlbGV0ZSBvW3IucGF0aFtuXV07YnJlYWs7Y2FzZVwiRVwiOmNhc2VcIk5cIjpvW3IucGF0aFtuXV09ci5yaHN9fWVsc2Ugc3dpdGNoKHIua2luZCl7Y2FzZVwiQVwiOnMoZVt0XSxyLmluZGV4LHIuaXRlbSk7YnJlYWs7Y2FzZVwiRFwiOmU9ZihlLHQpO2JyZWFrO2Nhc2VcIkVcIjpjYXNlXCJOXCI6ZVt0XT1yLnJoc31yZXR1cm4gZX1mdW5jdGlvbiBkKGUsdCxyKXtpZihlJiZ0JiZyJiZyLmtpbmQpe2Zvcih2YXIgbj1lLG89LTEsaT1yLnBhdGg/ci5wYXRoLmxlbmd0aC0xOjA7KytvPGk7KVwidW5kZWZpbmVkXCI9PXR5cGVvZiBuW3IucGF0aFtvXV0mJihuW3IucGF0aFtvXV09XCJudW1iZXJcIj09dHlwZW9mIHIucGF0aFtvXT9bXTp7fSksbj1uW3IucGF0aFtvXV07c3dpdGNoKHIua2luZCl7Y2FzZVwiQVwiOnMoci5wYXRoP25bci5wYXRoW29dXTpuLHIuaW5kZXgsci5pdGVtKTticmVhaztjYXNlXCJEXCI6ZGVsZXRlIG5bci5wYXRoW29dXTticmVhaztjYXNlXCJFXCI6Y2FzZVwiTlwiOm5bci5wYXRoW29dXT1yLnJoc319fWZ1bmN0aW9uIHAoZSx0LHIpe2lmKHIucGF0aCYmci5wYXRoLmxlbmd0aCl7dmFyIG4sbz1lW3RdLGk9ci5wYXRoLmxlbmd0aC0xO2ZvcihuPTA7bjxpO24rKylvPW9bci5wYXRoW25dXTtzd2l0Y2goci5raW5kKXtjYXNlXCJBXCI6cChvW3IucGF0aFtuXV0sci5pbmRleCxyLml0ZW0pO2JyZWFrO2Nhc2VcIkRcIjpvW3IucGF0aFtuXV09ci5saHM7YnJlYWs7Y2FzZVwiRVwiOm9bci5wYXRoW25dXT1yLmxoczticmVhaztjYXNlXCJOXCI6ZGVsZXRlIG9bci5wYXRoW25dXX19ZWxzZSBzd2l0Y2goci5raW5kKXtjYXNlXCJBXCI6cChlW3RdLHIuaW5kZXgsci5pdGVtKTticmVhaztjYXNlXCJEXCI6ZVt0XT1yLmxoczticmVhaztjYXNlXCJFXCI6ZVt0XT1yLmxoczticmVhaztjYXNlXCJOXCI6ZT1mKGUsdCl9cmV0dXJuIGV9ZnVuY3Rpb24gZyhlLHQscil7aWYoZSYmdCYmciYmci5raW5kKXt2YXIgbixvLGk9ZTtmb3Iobz1yLnBhdGgubGVuZ3RoLTEsbj0wO248bztuKyspXCJ1bmRlZmluZWRcIj09dHlwZW9mIGlbci5wYXRoW25dXSYmKGlbci5wYXRoW25dXT17fSksaT1pW3IucGF0aFtuXV07c3dpdGNoKHIua2luZCl7Y2FzZVwiQVwiOnAoaVtyLnBhdGhbbl1dLHIuaW5kZXgsci5pdGVtKTticmVhaztjYXNlXCJEXCI6aVtyLnBhdGhbbl1dPXIubGhzO2JyZWFrO2Nhc2VcIkVcIjppW3IucGF0aFtuXV09ci5saHM7YnJlYWs7Y2FzZVwiTlwiOmRlbGV0ZSBpW3IucGF0aFtuXV19fX1mdW5jdGlvbiBoKGUsdCxyKXtpZihlJiZ0KXt2YXIgbj1mdW5jdGlvbihuKXtyJiYhcihlLHQsbil8fGQoZSx0LG4pfTtsKGUsdCxuKX19ZnVuY3Rpb24geShlKXtyZXR1cm5cImNvbG9yOiBcIitGW2VdLmNvbG9yK1wiOyBmb250LXdlaWdodDogYm9sZFwifWZ1bmN0aW9uIHYoZSl7dmFyIHQ9ZS5raW5kLHI9ZS5wYXRoLG49ZS5saHMsbz1lLnJocyxpPWUuaW5kZXgsYT1lLml0ZW07c3dpdGNoKHQpe2Nhc2VcIkVcIjpyZXR1cm5bci5qb2luKFwiLlwiKSxuLFwi4oaSXCIsb107Y2FzZVwiTlwiOnJldHVybltyLmpvaW4oXCIuXCIpLG9dO2Nhc2VcIkRcIjpyZXR1cm5bci5qb2luKFwiLlwiKV07Y2FzZVwiQVwiOnJldHVybltyLmpvaW4oXCIuXCIpK1wiW1wiK2krXCJdXCIsYV07ZGVmYXVsdDpyZXR1cm5bXX19ZnVuY3Rpb24gYihlLHQscixuKXt2YXIgbz1jKGUsdCk7dHJ5e24/ci5ncm91cENvbGxhcHNlZChcImRpZmZcIik6ci5ncm91cChcImRpZmZcIil9Y2F0Y2goZSl7ci5sb2coXCJkaWZmXCIpfW8/by5mb3JFYWNoKGZ1bmN0aW9uKGUpe3ZhciB0PWUua2luZCxuPXYoZSk7ci5sb2cuYXBwbHkocixbXCIlYyBcIitGW3RdLnRleHQseSh0KV0uY29uY2F0KFAobikpKX0pOnIubG9nKFwi4oCU4oCUIG5vIGRpZmYg4oCU4oCUXCIpO3RyeXtyLmdyb3VwRW5kKCl9Y2F0Y2goZSl7ci5sb2coXCLigJTigJQgZGlmZiBlbmQg4oCU4oCUIFwiKX19ZnVuY3Rpb24gbShlLHQscixuKXtzd2l0Y2goXCJ1bmRlZmluZWRcIj09dHlwZW9mIGU/XCJ1bmRlZmluZWRcIjpOKGUpKXtjYXNlXCJvYmplY3RcIjpyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBlW25dP2Vbbl0uYXBwbHkoZSxQKHIpKTplW25dO2Nhc2VcImZ1bmN0aW9uXCI6cmV0dXJuIGUodCk7ZGVmYXVsdDpyZXR1cm4gZX19ZnVuY3Rpb24gdyhlKXt2YXIgdD1lLnRpbWVzdGFtcCxyPWUuZHVyYXRpb247cmV0dXJuIGZ1bmN0aW9uKGUsbixvKXt2YXIgaT1bXCJhY3Rpb25cIl07cmV0dXJuIGkucHVzaChcIiVjXCIrU3RyaW5nKGUudHlwZSkpLHQmJmkucHVzaChcIiVjQCBcIituKSxyJiZpLnB1c2goXCIlYyhpbiBcIitvLnRvRml4ZWQoMikrXCIgbXMpXCIpLGkuam9pbihcIiBcIil9fWZ1bmN0aW9uIHgoZSx0KXt2YXIgcj10LmxvZ2dlcixuPXQuYWN0aW9uVHJhbnNmb3JtZXIsbz10LnRpdGxlRm9ybWF0dGVyLGk9dm9pZCAwPT09bz93KHQpOm8sYT10LmNvbGxhcHNlZCxmPXQuY29sb3JzLHU9dC5sZXZlbCxsPXQuZGlmZixjPVwidW5kZWZpbmVkXCI9PXR5cGVvZiB0LnRpdGxlRm9ybWF0dGVyO2UuZm9yRWFjaChmdW5jdGlvbihvLHMpe3ZhciBkPW8uc3RhcnRlZCxwPW8uc3RhcnRlZFRpbWUsZz1vLmFjdGlvbixoPW8ucHJldlN0YXRlLHk9by5lcnJvcix2PW8udG9vayx3PW8ubmV4dFN0YXRlLHg9ZVtzKzFdO3gmJih3PXgucHJldlN0YXRlLHY9eC5zdGFydGVkLWQpO3ZhciBTPW4oZyksaz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBhP2EoZnVuY3Rpb24oKXtyZXR1cm4gd30sZyxvKTphLGo9RChwKSxFPWYudGl0bGU/XCJjb2xvcjogXCIrZi50aXRsZShTKStcIjtcIjpcIlwiLEE9W1wiY29sb3I6IGdyYXk7IGZvbnQtd2VpZ2h0OiBsaWdodGVyO1wiXTtBLnB1c2goRSksdC50aW1lc3RhbXAmJkEucHVzaChcImNvbG9yOiBncmF5OyBmb250LXdlaWdodDogbGlnaHRlcjtcIiksdC5kdXJhdGlvbiYmQS5wdXNoKFwiY29sb3I6IGdyYXk7IGZvbnQtd2VpZ2h0OiBsaWdodGVyO1wiKTt2YXIgTz1pKFMsaix2KTt0cnl7az9mLnRpdGxlJiZjP3IuZ3JvdXBDb2xsYXBzZWQuYXBwbHkocixbXCIlYyBcIitPXS5jb25jYXQoQSkpOnIuZ3JvdXBDb2xsYXBzZWQoTyk6Zi50aXRsZSYmYz9yLmdyb3VwLmFwcGx5KHIsW1wiJWMgXCIrT10uY29uY2F0KEEpKTpyLmdyb3VwKE8pfWNhdGNoKGUpe3IubG9nKE8pfXZhciBOPW0odSxTLFtoXSxcInByZXZTdGF0ZVwiKSxQPW0odSxTLFtTXSxcImFjdGlvblwiKSxDPW0odSxTLFt5LGhdLFwiZXJyb3JcIiksRj1tKHUsUyxbd10sXCJuZXh0U3RhdGVcIik7aWYoTilpZihmLnByZXZTdGF0ZSl7dmFyIEw9XCJjb2xvcjogXCIrZi5wcmV2U3RhdGUoaCkrXCI7IGZvbnQtd2VpZ2h0OiBib2xkXCI7cltOXShcIiVjIHByZXYgc3RhdGVcIixMLGgpfWVsc2UgcltOXShcInByZXYgc3RhdGVcIixoKTtpZihQKWlmKGYuYWN0aW9uKXt2YXIgVD1cImNvbG9yOiBcIitmLmFjdGlvbihTKStcIjsgZm9udC13ZWlnaHQ6IGJvbGRcIjtyW1BdKFwiJWMgYWN0aW9uICAgIFwiLFQsUyl9ZWxzZSByW1BdKFwiYWN0aW9uICAgIFwiLFMpO2lmKHkmJkMpaWYoZi5lcnJvcil7dmFyIE09XCJjb2xvcjogXCIrZi5lcnJvcih5LGgpK1wiOyBmb250LXdlaWdodDogYm9sZDtcIjtyW0NdKFwiJWMgZXJyb3IgICAgIFwiLE0seSl9ZWxzZSByW0NdKFwiZXJyb3IgICAgIFwiLHkpO2lmKEYpaWYoZi5uZXh0U3RhdGUpe3ZhciBfPVwiY29sb3I6IFwiK2YubmV4dFN0YXRlKHcpK1wiOyBmb250LXdlaWdodDogYm9sZFwiO3JbRl0oXCIlYyBuZXh0IHN0YXRlXCIsXyx3KX1lbHNlIHJbRl0oXCJuZXh0IHN0YXRlXCIsdyk7bCYmYihoLHcscixrKTt0cnl7ci5ncm91cEVuZCgpfWNhdGNoKGUpe3IubG9nKFwi4oCU4oCUIGxvZyBlbmQg4oCU4oCUXCIpfX0pfWZ1bmN0aW9uIFMoKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06e30sdD1PYmplY3QuYXNzaWduKHt9LEwsZSkscj10LmxvZ2dlcixuPXQuc3RhdGVUcmFuc2Zvcm1lcixvPXQuZXJyb3JUcmFuc2Zvcm1lcixpPXQucHJlZGljYXRlLGE9dC5sb2dFcnJvcnMsZj10LmRpZmZQcmVkaWNhdGU7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIHIpcmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gZSh0KX19fTtpZihlLmdldFN0YXRlJiZlLmRpc3BhdGNoKXJldHVybiBjb25zb2xlLmVycm9yKFwiW3JlZHV4LWxvZ2dlcl0gcmVkdXgtbG9nZ2VyIG5vdCBpbnN0YWxsZWQuIE1ha2Ugc3VyZSB0byBwYXNzIGxvZ2dlciBpbnN0YW5jZSBhcyBtaWRkbGV3YXJlOlxcbi8vIExvZ2dlciB3aXRoIGRlZmF1bHQgb3B0aW9uc1xcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3JlZHV4LWxvZ2dlcidcXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFxcbiAgcmVkdWNlcixcXG4gIGFwcGx5TWlkZGxld2FyZShsb2dnZXIpXFxuKVxcbi8vIE9yIHlvdSBjYW4gY3JlYXRlIHlvdXIgb3duIGxvZ2dlciB3aXRoIGN1c3RvbSBvcHRpb25zIGh0dHA6Ly9iaXQubHkvcmVkdXgtbG9nZ2VyLW9wdGlvbnNcXG5pbXBvcnQgY3JlYXRlTG9nZ2VyIGZyb20gJ3JlZHV4LWxvZ2dlcidcXG5jb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoe1xcbiAgLy8gLi4ub3B0aW9uc1xcbn0pO1xcbmNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoXFxuICByZWR1Y2VyLFxcbiAgYXBwbHlNaWRkbGV3YXJlKGxvZ2dlcilcXG4pXFxuXCIpLGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gZSh0KX19fTt2YXIgdT1bXTtyZXR1cm4gZnVuY3Rpb24oZSl7dmFyIHI9ZS5nZXRTdGF0ZTtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKGwpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGkmJiFpKHIsbCkpcmV0dXJuIGUobCk7dmFyIGM9e307dS5wdXNoKGMpLGMuc3RhcnRlZD1PLm5vdygpLGMuc3RhcnRlZFRpbWU9bmV3IERhdGUsYy5wcmV2U3RhdGU9bihyKCkpLGMuYWN0aW9uPWw7dmFyIHM9dm9pZCAwO2lmKGEpdHJ5e3M9ZShsKX1jYXRjaChlKXtjLmVycm9yPW8oZSl9ZWxzZSBzPWUobCk7Yy50b29rPU8ubm93KCktYy5zdGFydGVkLGMubmV4dFN0YXRlPW4ocigpKTt2YXIgZD10LmRpZmYmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGY/ZihyLGwpOnQuZGlmZjtpZih4KHUsT2JqZWN0LmFzc2lnbih7fSx0LHtkaWZmOmR9KSksdS5sZW5ndGg9MCxjLmVycm9yKXRocm93IGMuZXJyb3I7cmV0dXJuIHN9fX19dmFyIGssaixFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIG5ldyBBcnJheSh0KzEpLmpvaW4oZSl9LEE9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gRShcIjBcIix0LWUudG9TdHJpbmcoKS5sZW5ndGgpK2V9LEQ9ZnVuY3Rpb24oZSl7cmV0dXJuIEEoZS5nZXRIb3VycygpLDIpK1wiOlwiK0EoZS5nZXRNaW51dGVzKCksMikrXCI6XCIrQShlLmdldFNlY29uZHMoKSwyKStcIi5cIitBKGUuZ2V0TWlsbGlzZWNvbmRzKCksMyl9LE89XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHBlcmZvcm1hbmNlJiZudWxsIT09cGVyZm9ybWFuY2UmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHBlcmZvcm1hbmNlLm5vdz9wZXJmb3JtYW5jZTpEYXRlLE49XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKGUpe3JldHVybiB0eXBlb2YgZX06ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmZS5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmZSE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgZX0sUD1mdW5jdGlvbihlKXtpZihBcnJheS5pc0FycmF5KGUpKXtmb3IodmFyIHQ9MCxyPUFycmF5KGUubGVuZ3RoKTt0PGUubGVuZ3RoO3QrKylyW3RdPWVbdF07cmV0dXJuIHJ9cmV0dXJuIEFycmF5LmZyb20oZSl9LEM9W107az1cIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiBnbG9iYWw/XCJ1bmRlZmluZWRcIjpOKGdsb2JhbCkpJiZnbG9iYWw/Z2xvYmFsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGo9ay5EZWVwRGlmZixqJiZDLnB1c2goZnVuY3Rpb24oKXtcInVuZGVmaW5lZFwiIT10eXBlb2YgaiYmay5EZWVwRGlmZj09PWMmJihrLkRlZXBEaWZmPWosaj12b2lkIDApfSksdChuLHIpLHQobyxyKSx0KGksciksdChhLHIpLE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGMse2RpZmY6e3ZhbHVlOmMsZW51bWVyYWJsZTohMH0sb2JzZXJ2YWJsZURpZmY6e3ZhbHVlOmwsZW51bWVyYWJsZTohMH0sYXBwbHlEaWZmOnt2YWx1ZTpoLGVudW1lcmFibGU6ITB9LGFwcGx5Q2hhbmdlOnt2YWx1ZTpkLGVudW1lcmFibGU6ITB9LHJldmVydENoYW5nZTp7dmFsdWU6ZyxlbnVtZXJhYmxlOiEwfSxpc0NvbmZsaWN0Ont2YWx1ZTpmdW5jdGlvbigpe3JldHVyblwidW5kZWZpbmVkXCIhPXR5cGVvZiBqfSxlbnVtZXJhYmxlOiEwfSxub0NvbmZsaWN0Ont2YWx1ZTpmdW5jdGlvbigpe3JldHVybiBDJiYoQy5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UoKX0pLEM9bnVsbCksY30sZW51bWVyYWJsZTohMH19KTt2YXIgRj17RTp7Y29sb3I6XCIjMjE5NkYzXCIsdGV4dDpcIkNIQU5HRUQ6XCJ9LE46e2NvbG9yOlwiIzRDQUY1MFwiLHRleHQ6XCJBRERFRDpcIn0sRDp7Y29sb3I6XCIjRjQ0MzM2XCIsdGV4dDpcIkRFTEVURUQ6XCJ9LEE6e2NvbG9yOlwiIzIxOTZGM1wiLHRleHQ6XCJBUlJBWTpcIn19LEw9e2xldmVsOlwibG9nXCIsbG9nZ2VyOmNvbnNvbGUsbG9nRXJyb3JzOiEwLGNvbGxhcHNlZDp2b2lkIDAscHJlZGljYXRlOnZvaWQgMCxkdXJhdGlvbjohMSx0aW1lc3RhbXA6ITAsc3RhdGVUcmFuc2Zvcm1lcjpmdW5jdGlvbihlKXtyZXR1cm4gZX0sYWN0aW9uVHJhbnNmb3JtZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIGV9LGVycm9yVHJhbnNmb3JtZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIGV9LGNvbG9yczp7dGl0bGU6ZnVuY3Rpb24oKXtyZXR1cm5cImluaGVyaXRcIn0scHJldlN0YXRlOmZ1bmN0aW9uKCl7cmV0dXJuXCIjOUU5RTlFXCJ9LGFjdGlvbjpmdW5jdGlvbigpe3JldHVyblwiIzAzQTlGNFwifSxuZXh0U3RhdGU6ZnVuY3Rpb24oKXtyZXR1cm5cIiM0Q0FGNTBcIn0sZXJyb3I6ZnVuY3Rpb24oKXtyZXR1cm5cIiNGMjA0MDRcIn19LGRpZmY6ITEsZGlmZlByZWRpY2F0ZTp2b2lkIDAsdHJhbnNmb3JtZXI6dm9pZCAwfSxUPWZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnt9LHQ9ZS5kaXNwYXRjaCxyPWUuZ2V0U3RhdGU7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgdHx8XCJmdW5jdGlvblwiPT10eXBlb2Ygcj9TKCkoe2Rpc3BhdGNoOnQsZ2V0U3RhdGU6cn0pOnZvaWQgY29uc29sZS5lcnJvcihcIlxcbltyZWR1eC1sb2dnZXIgdjNdIEJSRUFLSU5HIENIQU5HRVxcbltyZWR1eC1sb2dnZXIgdjNdIFNpbmNlIDMuMC4wIHJlZHV4LWxvZ2dlciBleHBvcnRzIGJ5IGRlZmF1bHQgbG9nZ2VyIHdpdGggZGVmYXVsdCBzZXR0aW5ncy5cXG5bcmVkdXgtbG9nZ2VyIHYzXSBDaGFuZ2VcXG5bcmVkdXgtbG9nZ2VyIHYzXSBpbXBvcnQgY3JlYXRlTG9nZ2VyIGZyb20gJ3JlZHV4LWxvZ2dlcidcXG5bcmVkdXgtbG9nZ2VyIHYzXSB0b1xcbltyZWR1eC1sb2dnZXIgdjNdIGltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gJ3JlZHV4LWxvZ2dlcidcXG5cIil9O2UuZGVmYXVsdHM9TCxlLmNyZWF0ZUxvZ2dlcj1TLGUubG9nZ2VyPVQsZS5kZWZhdWx0PVQsT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSl9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlZHV4LWxvZ2dlci9kaXN0L3JlZHV4LWxvZ2dlci5qc1xuLy8gbW9kdWxlIGlkID0gMjk3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIm1hbmlmZXN0Lmpzb25cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NsaWVudC9tYW5pZmVzdC5qc29uXG4vLyBtb2R1bGUgaWQgPSAyOThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZW51bSBBY3Rpb25UeXBlcyB7XG5cdEFwcElzTG9hZGluZyA9ICdBcHBJc0xvYWRpbmcnLFxuXHRHZXRFeGFtcGxlID0gJ0dldEV4YW1wbGUnLFxuXHRSb3V0ZUlzTG9hZGluZyA9ICdSb3V0ZUlzTG9hZGluZydcbn1cblxuZXhwb3J0IGRlZmF1bHQgQWN0aW9uVHlwZXM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvYWN0aW9ucy9hY3Rpb25UeXBlcy50cyIsImltcG9ydCB7IEhPQ0NvbXBvbmVudFR5cGUgfSBmcm9tICdob2MnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGludGVyZmFjZSBJUm91dGVFcnJvclByb3BzIHtcblx0ZXJyb3JzPzogc3RyaW5nW107XG5cdHN0YXR1czogbnVtYmVyO1xufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxpbmUtbGVuZ3RoXG4vLyBOT1RFOiAnb3B0aW9ucycgcGFyYW1ldGVyIGlzIHVzZWQgdG8gcGFzcyBvbiBvdmVycmlkZSBwcm9wZXJ0aWVzIHdoaWNoIHNob3VsZCBtYXRjaCB0aGUgSVJvdXRlRXJyb3JQcm9wcyBpbnRlcmZhY2UuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSb3V0ZUVycm9ySE9DPFRDb21wb25lbnRQcm9wcz4oQ29tcG9uZW50OiBIT0NDb21wb25lbnRUeXBlPFRDb21wb25lbnRQcm9wcyAmIElSb3V0ZUVycm9yUHJvcHM+LCBvcHRpb25zOiBJUm91dGVFcnJvclByb3BzKSB7XG5cblx0Y29uc3QgUm91dGVFcnJvcjogUmVhY3QuU0ZDPFRDb21wb25lbnRQcm9wcyAmIElSb3V0ZUVycm9yUHJvcHM+ID0gKHByb3BzKSA9PiB7XG5cblx0XHRyZXR1cm4gPENvbXBvbmVudCB7IC4uLk9iamVjdC5hc3NpZ24oe30sIHByb3BzLCBvcHRpb25zKSB9IC8+O1xuXHR9O1xuXG5cdGNvbnN0IGNvbXBvbmVudE5hbWUgPSBDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9uZW50Lm5hbWUgfHwgJ0NvbXBvbmVudCc7XG5cblx0Q29tcG9uZW50LmRpc3BsYXlOYW1lID0gYHJvdXRlRXJyb3IoJHsgY29tcG9uZW50TmFtZSB9KWA7XG5cdENvbXBvbmVudC53cmFwcGVkQ29tcG9uZW50ID0gQ29tcG9uZW50O1xuXG5cdHJldHVybiBSb3V0ZUVycm9yO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2hvYy9Sb3V0ZUVycm9yLnRzeCIsImltcG9ydCBBc3luY0NvbXBvbmVudCBmcm9tICdjb21wb25lbnRzL0FzeW5jQ29tcG9uZW50JztcbmltcG9ydCB7IElSb3V0ZUVycm9yUHJvcHMgfSBmcm9tICdob2MvUm91dGVFcnJvcic7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUm91dGVDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5cbi8vIE5PVEU6IFJvdXRlQ29tcG9uZW50UHJvcHM8KFJPVVRFX1BBUkFNRVRFUlMpPlxuZXhwb3J0IGludGVyZmFjZSBJRXJyb3JQcm9wcyBleHRlbmRzIFJvdXRlQ29tcG9uZW50UHJvcHM8e30+IHt9XG5cbmNvbnN0IEVycm9yOiBSZWFjdC5TRkM8SUVycm9yUHJvcHMgJiBJUm91dGVFcnJvclByb3BzPiA9IChwcm9wcykgPT4ge1xuXG5cdGNvbnNvbGUubG9nKG5hdmlnYXRvci5vbkxpbmUpO1xuXG5cdHJldHVybiAoXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJlcnJvclwiPlxuXHRcdFx0PGgxPkVycm9yIHsgcHJvcHMuc3RhdHVzIH08L2gxPlxuXHRcdDwvZGl2PlxuXHQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXJyb3I7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcm91dGVzL0Vycm9yLnRzeCIsImltcG9ydCB7IElMb2FkQWN0aW9uLCBJc0xvYWRpbmdTdGF0ZSB9IGZyb20gJ2FjdGlvbnMnO1xuaW1wb3J0IHsgbG9hZFJvdXRlIH0gZnJvbSAnYWN0aW9ucy9hY3Rpb25DcmVhdG9ycyc7XG5pbXBvcnQgSGlzdG9yeSBmcm9tICdoaXN0b3J5JztcbmltcG9ydCB7IEhPQ0NvbXBvbmVudFR5cGUgfSBmcm9tICdob2MnO1xuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgUm91dGVDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgeyBEaXNwYXRjaCB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IElTdG9yZVN0YXRlIH0gZnJvbSAnc3RvcmUnO1xuXG5leHBvcnQgdHlwZSBJUm91dGVDb21wb25lbnRQcm9wcyA9IElCYXNlUHJvcHMgJiBJTWFwRGlzcGF0Y2hUb1Byb3BzO1xuXG5pbnRlcmZhY2UgSUJhc2VQcm9wcyB7fVxuXG5pbnRlcmZhY2UgSU1hcERpc3BhdGNoVG9Qcm9wcyB7XG5cdGxvYWRSb3V0ZUhhbmRsZXI6ICh2YWx1ZTogSXNMb2FkaW5nU3RhdGUpID0+IElMb2FkQWN0aW9uO1xufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2g6IERpc3BhdGNoPElTdG9yZVN0YXRlPik6IElNYXBEaXNwYXRjaFRvUHJvcHMgPT4ge1xuXG5cdHJldHVybiB7XG5cdFx0bG9hZFJvdXRlSGFuZGxlcjogKHZhbHVlKSA9PiB7XG5cdFx0XHRyZXR1cm4gZGlzcGF0Y2gobG9hZFJvdXRlKHZhbHVlKSk7XG5cdFx0fVxuXHR9O1xufTtcblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG1heC1saW5lLWxlbmd0aFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUm91dGVDb21wb25lbnRIT0M8VENvbXBvbmVudFByb3BzPihDb21wb25lbnQ6IEhPQ0NvbXBvbmVudFR5cGU8VENvbXBvbmVudFByb3BzICYgSVJvdXRlQ29tcG9uZW50UHJvcHM+KSB7XG5cblx0Y2xhc3MgUm91dGVDb21wb25lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8VENvbXBvbmVudFByb3BzICYgSVJvdXRlQ29tcG9uZW50UHJvcHM+IHtcblxuXHRcdHB1YmxpYyBjb21wb25lbnREaWRNb3VudCgpIHtcblxuXHRcdFx0Y29uc3QgeyBsb2FkUm91dGVIYW5kbGVyIH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0XHRsb2FkUm91dGVIYW5kbGVyKGZhbHNlKTtcblx0XHR9XG5cblx0XHRwdWJsaWMgcmVuZGVyKCkge1xuXG5cdFx0XHRjb25zdCB7IGxvYWRSb3V0ZUhhbmRsZXIsIC4uLnJlc3RQcm9wcyB9ID0gdGhpcy5wcm9wcyBhcyBhbnk7XG5cblx0XHRcdHJldHVybiA8Q29tcG9uZW50IHsgLi4ucmVzdFByb3BzIH0gLz47XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgY29tcG9uZW50TmFtZSA9IENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnQubmFtZSB8fCAnQ29tcG9uZW50JztcblxuXHRDb21wb25lbnQuZGlzcGxheU5hbWUgPSBgcm91dGVDb21wb25lbnQoJHsgY29tcG9uZW50TmFtZSB9KWA7XG5cdENvbXBvbmVudC53cmFwcGVkQ29tcG9uZW50ID0gQ29tcG9uZW50O1xuXG5cdHJldHVybiBjb25uZWN0PG51bGwsIElNYXBEaXNwYXRjaFRvUHJvcHMsIElCYXNlUHJvcHMgJiBUQ29tcG9uZW50UHJvcHM+KG51bGwsIG1hcERpc3BhdGNoVG9Qcm9wcykoUm91dGVDb21wb25lbnQpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2hvYy9Sb3V0ZUNvbXBvbmVudC50c3giLCJpbXBvcnQgeyBJTG9hZEFjdGlvbiwgSXNMb2FkaW5nU3RhdGUgfSBmcm9tICdhY3Rpb25zJztcbmltcG9ydCBBY3Rpb25UeXBlcyBmcm9tICdhY3Rpb25zL2FjdGlvblR5cGVzJztcbmltcG9ydCBmZXRjaEFjdGlvbiBmcm9tICdhY3Rpb25zL2ZldGNoQWN0aW9uJztcbmltcG9ydCB7IElFeGFtcGxlU3RhdGUgfSBmcm9tICdyZWR1Y2Vycy9leGFtcGxlUmVkdWNlcic7XG5pbXBvcnQgeyBBY3Rpb24sIERpc3BhdGNoIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgVGh1bmtBY3Rpb24gfSBmcm9tICdyZWR1eC10aHVuayc7XG5pbXBvcnQgeyBJU3RvcmVTdGF0ZSB9IGZyb20gJ3N0b3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRBcHAodmFsdWU6IElzTG9hZGluZ1N0YXRlKTogSUxvYWRBY3Rpb24ge1xuXG5cdHJldHVybiB7XG5cdFx0dHlwZTogQWN0aW9uVHlwZXMuQXBwSXNMb2FkaW5nLFxuXHRcdHZhbHVlXG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkUm91dGUodmFsdWU6IElzTG9hZGluZ1N0YXRlKTogSUxvYWRBY3Rpb24ge1xuXG5cdHJldHVybiB7XG5cdFx0dHlwZTogQWN0aW9uVHlwZXMuUm91dGVJc0xvYWRpbmcsXG5cdFx0dmFsdWVcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEV4YW1wbGUoKTogVGh1bmtBY3Rpb248UHJvbWlzZTxJQXN5bmNTdGF0ZTxJRXhhbXBsZVN0YXRlPj4sIElTdG9yZVN0YXRlLCB2b2lkPiB7XG5cblx0cmV0dXJuIChkaXNwYXRjaDogRGlzcGF0Y2g8SVN0b3JlU3RhdGU+KSA9PiB7XG5cblx0XHRjb25zdCBhY3Rpb246IEFjdGlvbiA9IHtcblx0XHRcdHR5cGU6IEFjdGlvblR5cGVzLkdldEV4YW1wbGVcblx0XHR9O1xuXG5cdFx0cmV0dXJuIGZldGNoQWN0aW9uPElFeGFtcGxlU3RhdGU+KGRpc3BhdGNoLCBhY3Rpb24pKGAvYXBpL2V4YW1wbGVgLCB7XG5cdFx0XHRtZXRob2Q6ICdnZXQnXG5cdFx0fSk7XG5cdH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvYWN0aW9ucy9hY3Rpb25DcmVhdG9ycy50cyIsImltcG9ydCB7IG5vb3AgfSBmcm9tICdsb2Rhc2gvZnAnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW50ZXJmYWNlIElNb2R1bGUge1xuXHRkZWZhdWx0OiBhbnk7XG59XG5cbmludGVyZmFjZSBJQXN5bmNDb21wb25lbnRQcm9wcyB7XG5cdGdldENvbXBvbmVudDogKCkgPT4gUHJvbWlzZTxJTW9kdWxlPjtcblx0ZXJyb3JDb21wb25lbnQ6IFJlYWN0LkNvbXBvbmVudFR5cGU8eyBlcnJvcnM/OiBzdHJpbmdbXSB9Pjtcblx0c3VjY2Vzc0hhbmRsZXI/OiAoKSA9PiB2b2lkO1xuXHRlcnJvckhhbmRsZXI/OiAoZXJyb3I6IHN0cmluZykgPT4gdm9pZDtcbn1cblxuaW50ZXJmYWNlIElBc3luY0NvbXBvbmVudFN0YXRlIHtcblx0Q29tcG9uZW50OiBSZWFjdC5Db21wb25lbnRUeXBlIHwgbnVsbDtcblx0ZXJyb3JzPzogc3RyaW5nW107XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFzeW5jQ29tcG9uZW50IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudDxJQXN5bmNDb21wb25lbnRQcm9wcywgSUFzeW5jQ29tcG9uZW50U3RhdGU+ICB7XG5cblx0cHVibGljIHN0YXRlOiBJQXN5bmNDb21wb25lbnRTdGF0ZSA9IHtcblx0XHRDb21wb25lbnQ6IG51bGxcblx0fTtcblxuXHRwdWJsaWMgY29tcG9uZW50V2lsbE1vdW50KCkge1xuXG5cdFx0dGhpcy5sb2FkQ29tcG9uZW50KCk7XG5cdH1cblxuXHRwcml2YXRlIGFzeW5jIGxvYWRDb21wb25lbnQoKSB7XG5cblx0XHRjb25zdCB7IGdldENvbXBvbmVudCwgc3VjY2Vzc0hhbmRsZXIgPSBub29wLCBlcnJvckhhbmRsZXIgPSBub29wIH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IG1vZHVsZSA9IGF3YWl0IGdldENvbXBvbmVudCgpO1xuXG5cdFx0XHR0aGlzLnNldFN0YXRlKHsgQ29tcG9uZW50OiBtb2R1bGUuZGVmYXVsdCB9LCBzdWNjZXNzSGFuZGxlcik7XG5cdFx0fVxuXHRcdGNhdGNoIChlcnJvcikge1xuXG5cdFx0XHRjb25zdCBlcnJTdHIgPSBlcnJvci50b1N0cmluZygpO1xuXG5cdFx0XHR0aGlzLnNldFN0YXRlKHsgZXJyb3JzOiBbZXJyU3RyXSB9LCBlcnJvckhhbmRsZXIuYmluZChudWxsLCBlcnJTdHIpKTtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgcmVuZGVyKCkge1xuXG5cdFx0Y29uc3QgeyBDb21wb25lbnQsIGVycm9ycyB9ID0gdGhpcy5zdGF0ZSxcblx0XHRcdHsgZXJyb3JDb21wb25lbnQ6IEVycm9yQ29tcG9uZW50LCBnZXRDb21wb25lbnQsIHN1Y2Nlc3NIYW5kbGVyLCBlcnJvckhhbmRsZXIsIC4uLnJlc3RQcm9wcyB9ID0gdGhpcy5wcm9wcztcblxuXHRcdC8vIFRPRE86IFJlcGxhY2Ugd2l0aCBleHRlcm5hbCBjb21wb25lbnRzLlxuXHRcdHJldHVybiBDb21wb25lbnQgP1xuXHRcdFx0PENvbXBvbmVudCB7IC4uLnJlc3RQcm9wcyB9IC8+IDogZXJyb3JzID9cblx0XHRcdDxFcnJvckNvbXBvbmVudCBlcnJvcnM9eyBlcnJvcnMgfSAvPiA6XG5cdFx0XHQ8ZGl2PkxvYWRpbmc8L2Rpdj47XG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0FzeW5jQ29tcG9uZW50L2luZGV4LnRzeCJdLCJzb3VyY2VSb290IjoiIn0=