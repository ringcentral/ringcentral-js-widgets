"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.includes");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.string.includes");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorLogger = void 0;
var _core = require("@ringcentral-integration/core");
var Sentry = _interopRequireWildcard(require("@sentry/browser"));
var _tracing = require("@sentry/tracing");
var _di = require("../../lib/di");
var _dec, _class;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var DEFAULT_INTERCEPTED_BRANDS = ['3000.Brightspeed'];
var ErrorLogger = (_dec = (0, _di.Module)({
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
  _inherits(ErrorLogger, _RcModuleV);
  var _super = _createSuper(ErrorLogger);
  function ErrorLogger(deps) {
    var _this;
    _classCallCheck(this, ErrorLogger);
    _this = _super.call(this, {
      deps: deps
    });
    _this._sentryInitialized = false;
    _this.intercepted = void 0;
    if (deps.errorLoggerOptions) {
      _this._bootstrap(deps.errorLoggerOptions);
      Promise.resolve().then(function () {
        if (_this._sentryInitialized && _this._deps.accountInfo) {
          (0, _core.watch)(_assertThisInitialized(_this), function () {
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
  _createClass(ErrorLogger, [{
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
  }, {
    key: "interceptedBrands",
    get: function get() {
      var _this$_deps$errorLogg, _this$_deps$errorLogg2;
      return (_this$_deps$errorLogg = (_this$_deps$errorLogg2 = this._deps.errorLoggerOptions) === null || _this$_deps$errorLogg2 === void 0 ? void 0 : _this$_deps$errorLogg2.interceptedBrands) !== null && _this$_deps$errorLogg !== void 0 ? _this$_deps$errorLogg : DEFAULT_INTERCEPTED_BRANDS;
    }
  }]);
  return ErrorLogger;
}(_core.RcModuleV2)) || _class);
exports.ErrorLogger = ErrorLogger;
//# sourceMappingURL=ErrorLogger.js.map
