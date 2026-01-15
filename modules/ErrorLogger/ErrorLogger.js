"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorLogger = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/web.timers.js");
var _core = require("@ringcentral-integration/core");
var Sentry = _interopRequireWildcard(require("@sentry/browser"));
var _tracing = require("@sentry/tracing");
var _di = require("../../lib/di");
var _dec, _class;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var DEFAULT_INTERCEPTED_BRANDS = ['3000.Brightspeed'];
var ErrorLogger = exports.ErrorLogger = (_dec = (0, _di.Module)({
  name: 'ErrorLogger',
  deps: ['BrandConfig', {
    dep: 'Auth',
    optional: true
  }, {
    dep: 'AccountInfo',
    optional: true
  }, {
    dep: 'ErrorLoggerOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcModuleV) {
  function ErrorLogger(deps) {
    var _this;
    _classCallCheck(this, ErrorLogger);
    _this = _callSuper(this, ErrorLogger, [{
      deps: deps
    }]);
    _this._sentryInitialized = false;
    _this.intercepted = void 0;
    if (deps.errorLoggerOptions) {
      _this._bootstrap(deps.errorLoggerOptions);
      Promise.resolve().then(function () {
        if (_this._sentryInitialized && _this._deps.accountInfo) {
          (0, _core.watch)(_this, function () {
            var _this$_deps$accountIn;
            return (_this$_deps$accountIn = _this._deps.accountInfo) === null || _this$_deps$accountIn === void 0 ? void 0 : _this$_deps$accountIn.userBrandId;
          }, function (userBrandId) {
            if (userBrandId && _this.interceptedBrands.includes(userBrandId)) {
              _this.toggle({
                intercepted: true
              });
            } else {
              _this.toggle({
                intercepted: false
              });
            }
          });
        }
      });
    }
    return _this;
  }
  _inherits(ErrorLogger, _RcModuleV);
  return _createClass(ErrorLogger, [{
    key: "_bootstrap",
    value: function _bootstrap(options) {
      var appVersion = options.appVersion,
        appRelease = options.appRelease,
        environment = options.environment,
        sentryConfig = options.sentryConfig;
      if (sentryConfig === null || sentryConfig === void 0 ? void 0 : sentryConfig.endpoint) {
        // init client
        this._init({
          dsn: sentryConfig.endpoint,
          sampleRate: sentryConfig.sampleRate,
          environment: environment,
          release: appRelease !== null && appRelease !== void 0 ? appRelease : appVersion,
          integrations: [new _tracing.BrowserTracing()]
        });
        // set tags
        var appName = this._deps.brandConfig.appName;
        var appBrand = this._deps.brandConfig.code;
        this.setTags({
          'app.name': appName,
          'app.brand': appBrand,
          'app.version': appVersion !== null && appVersion !== void 0 ? appVersion : ''
        });
      }
    }
  }, {
    key: "_init",
    value: function _init(options) {
      var _this2 = this;
      Sentry.init(_objectSpread(_objectSpread({}, options), {}, {
        ignoreErrors: ['200 OK', 'Failed to fetch', 'Request Timeout', 'Service is overloaded', 'In order to call this API endpoint, user needs to have [ReadCallLog] permission for requested resource', 'INVALID_STATE_ERROR: Invalid status: 11', 'INVALID_STATE_ERROR: Invalid status: 1', 'rateLimiterErrorMessages-rateLimitReached',
        // chrome error
        '[executeScript] Cannot access contents of the page. Extension manifest must request permission to access the respective host.', '[executeScript] The extensions gallery cannot be scripted.', '[executeScript] Cannot access contents of url', '[executeScript] This page cannot be scripted due to an ExtensionsSettings policy.', '[executeScript] Cannot access a chrome'],
        beforeSend: function beforeSend(event) {
          if (_this2.intercepted) {
            return null;
          }
          return event;
        }
      }));
      this._sentryInitialized = true;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this3 = this;
      if (this._sentryInitialized && this._deps.auth) {
        (0, _core.watch)(this, function () {
          var _this3$_deps$auth;
          return (_this3$_deps$auth = _this3._deps.auth) === null || _this3$_deps$auth === void 0 ? void 0 : _this3$_deps$auth.loggedIn;
        }, function (loggedIn) {
          if (loggedIn) {
            var _this3$_deps$auth2;
            // set user
            _this3.setUser({
              id: (_this3$_deps$auth2 = _this3._deps.auth) === null || _this3$_deps$auth2 === void 0 ? void 0 : _this3$_deps$auth2.ownerId
            });
          }
        });
      }
    }
  }, {
    key: "interceptedBrands",
    get: function get() {
      var _this$_deps$errorLogg, _this$_deps$errorLogg2;
      return (_this$_deps$errorLogg = (_this$_deps$errorLogg2 = this._deps.errorLoggerOptions) === null || _this$_deps$errorLogg2 === void 0 ? void 0 : _this$_deps$errorLogg2.interceptedBrands) !== null && _this$_deps$errorLogg !== void 0 ? _this$_deps$errorLogg : DEFAULT_INTERCEPTED_BRANDS;
    }
  }, {
    key: "toggle",
    value: function toggle(_ref) {
      var intercepted = _ref.intercepted;
      this.intercepted = intercepted;
    }
  }, {
    key: "setUser",
    value: function setUser(user) {
      Sentry.configureScope(function (scope) {
        scope.setUser(user);
      });
    }
  }, {
    key: "setTags",
    value: function setTags(tags) {
      Sentry.configureScope(function (scope) {
        scope.setTags(tags);
      });
    }
  }, {
    key: "log",
    value: function log(message, level) {
      var eventId = Sentry.captureMessage(message, level);
      return eventId;
    }
  }, {
    key: "logError",
    value: function logError(error) {
      var eventId = Sentry.captureException(error);
      return eventId;
    }
  }, {
    key: "test",
    value: function test() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '[ErrorLogger] test';
      var eventId = this.log(message, 'debug');
      return eventId;
    }
  }, {
    key: "testError",
    value: function testError() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '[ErrorLogger] test error';
      // To support test with devtool console, throw error within a new thread by using setTimeout
      setTimeout(function () {
        throw new Error(message);
      }, 0);
    }
  }]);
}(_core.RcModuleV2)) || _class);
//# sourceMappingURL=ErrorLogger.js.map
