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
require("core-js/modules/es.object.to-string.js");
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
require("core-js/modules/es.string.includes.js");
require("core-js/modules/web.timers.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _nextMicro = require("@ringcentral-integration/next-micro");
var Sentry = _interopRequireWildcard(require("@sentry/browser"));
var _tracing = require("@sentry/tracing");
var _AccountInfo = require("../AccountInfo");
var _Auth = require("../Auth");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;
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
var ignoreErrors = ['200 OK', 'Failed to fetch', 'Request Timeout', 'Service is overloaded', 'In order to call this API endpoint, user needs to have [ReadCallLog] permission for requested resource', 'INVALID_STATE_ERROR: Invalid status: 11', 'INVALID_STATE_ERROR: Invalid status: 1', 'rateLimiterErrorMessages-rateLimitReached',
// TODO: fix in JUNO repo with virtuoso
'ResizeObserver loop', 'Failed to sync full state from server port.', 'AbortError: The play() request was interrupted by a new load request', "Document's Permissions Policy does not allow setSinkId()",
// chrome error
'[executeScript] Cannot access contents of the page. Extension manifest must request permission to access the respective host.', '[executeScript] The extensions gallery cannot be scripted.', '[executeScript] Cannot access contents of url', '[executeScript] This page cannot be scripted due to an ExtensionsSettings policy.', '[executeScript] Cannot access a chrome'];
var DEFAULT_INTERCEPTED_BRANDS = ['3000.Brightspeed'];
var ErrorLogger = exports.ErrorLogger = (_dec = (0, _nextCore.injectable)({
  name: 'ErrorLogger'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.inject)('ErrorLoggerOptions')(target, undefined, 0);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('BrandConfig')(target, undefined, 1);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 2);
}, _dec5 = function _dec5(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof ErrorLoggerOptions === "undefined" ? Object : ErrorLoggerOptions, typeof BrandConfig === "undefined" ? Object : BrandConfig, typeof _Auth.Auth === "undefined" ? Object : _Auth.Auth, typeof _AccountInfo.AccountInfo === "undefined" ? Object : _AccountInfo.AccountInfo]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = /*#__PURE__*/function (_RcModule) {
  function ErrorLogger(_errorLoggerOptions, _brandConfig, _auth, _accountInfo) {
    var _this;
    _classCallCheck(this, ErrorLogger);
    _this = _callSuper(this, ErrorLogger);
    _this._errorLoggerOptions = _errorLoggerOptions;
    _this._brandConfig = _brandConfig;
    _this._auth = _auth;
    _this._accountInfo = _accountInfo;
    _this._sentryInitialized = false;
    _this._mfeSentry = void 0;
    _this._hub = void 0;
    _this.intercepted = void 0;
    if (_errorLoggerOptions) {
      _this._bootstrap(_errorLoggerOptions);
      if (_errorLoggerOptions.tags) {
        _this.setTags(_errorLoggerOptions.tags);
      }
      _this.initialize();
    }
    return _this;
  }
  _inherits(ErrorLogger, _RcModule);
  return _createClass(ErrorLogger, [{
    key: "_bootstrap",
    value: function _bootstrap(options) {
      var appVersion = options.appVersion,
        appRelease = options.appRelease,
        environment = options.environment,
        sentryConfig = options.sentryConfig;
      if (sentryConfig === null || sentryConfig === void 0 ? void 0 : sentryConfig.endpoint) {
        var _this$_brandConfig, _this$_brandConfig2;
        // init client
        this._init({
          dsn: sentryConfig.endpoint,
          sampleRate: sentryConfig.sampleRate,
          environment: environment,
          release: appRelease !== null && appRelease !== void 0 ? appRelease : appVersion,
          integrations: global.document ? [new _tracing.BrowserTracing()] : []
        });
        // set tags
        var appName = (_this$_brandConfig = this._brandConfig) === null || _this$_brandConfig === void 0 ? void 0 : _this$_brandConfig.appName;
        var appBrand = (_this$_brandConfig2 = this._brandConfig) === null || _this$_brandConfig2 === void 0 ? void 0 : _this$_brandConfig2.code;
        this.setTags(_objectSpread(_objectSpread({}, (0, _nextMicro.getMfeMeta)({
          onlyVersion: true,
          prefix: 'mfe.'
        })), {}, {
          'app.name': appName,
          'app.brand': appBrand,
          'app.version': appVersion
        }));
      }
    }
  }, {
    key: "_init",
    value: function _init(options) {
      var _this$_errorLoggerOpt,
        _ref,
        _this$_mfeSentry,
        _this2 = this;
      this._sentryInitialized = true;
      var initOptions = _objectSpread(_objectSpread({}, options), {}, {
        ignoreErrors: ignoreErrors
      });
      if ((_this$_errorLoggerOpt = this._errorLoggerOptions) === null || _this$_errorLoggerOpt === void 0 ? void 0 : _this$_errorLoggerOpt.initMfeSentry) {
        this._mfeSentry = this._errorLoggerOptions.initMfeSentry(initOptions);
      }
      var hub = (_ref = (_this$_mfeSentry = this._mfeSentry) === null || _this$_mfeSentry === void 0 ? void 0 : _this$_mfeSentry.hub) !== null && _ref !== void 0 ? _ref : Sentry.init(_objectSpread(_objectSpread({}, initOptions), {}, {
        beforeSend: function beforeSend(event) {
          if (_this2.intercepted) {
            return null;
          }
          return event;
        }
      }));
      this._hub = hub !== null && hub !== void 0 ? hub : Sentry.getCurrentHub();
    }
  }, {
    key: "hub",
    get: function get() {
      return this._hub;
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var _this3 = this;
      if (this._sentryInitialized && this._auth) {
        (0, _nextCore.watch)(this, function () {
          return _this3._auth.loggedIn;
        }, function (loggedIn) {
          if (loggedIn) {
            var _this3$_auth;
            // set user
            _this3.setUser({
              id: (_this3$_auth = _this3._auth) === null || _this3$_auth === void 0 ? void 0 : _this3$_auth.ownerId
            });
          }
        });
      }
      if (this._sentryInitialized && this._accountInfo) {
        (0, _nextCore.watch)(this, function () {
          return _this3._accountInfo.id;
        }, function (accountInfoId) {
          if (accountInfoId) {
            _this3.setTags({
              accountId: "".concat(accountInfoId)
            });
          }
        });
        (0, _nextCore.watch)(this, function () {
          return _this3._accountInfo.userBrandId;
        }, function (userBrandId) {
          if (userBrandId && _this3.interceptedBrands.includes(userBrandId)) {
            _this3.toggle({
              intercepted: true
            });
          } else {
            _this3.toggle({
              intercepted: false
            });
          }
        });
      }
    }
  }, {
    key: "interceptedBrands",
    get: function get() {
      var _this$_errorLoggerOpt2, _this$_errorLoggerOpt3;
      return (_this$_errorLoggerOpt2 = (_this$_errorLoggerOpt3 = this._errorLoggerOptions) === null || _this$_errorLoggerOpt3 === void 0 ? void 0 : _this$_errorLoggerOpt3.interceptedBrands) !== null && _this$_errorLoggerOpt2 !== void 0 ? _this$_errorLoggerOpt2 : DEFAULT_INTERCEPTED_BRANDS;
    }
  }, {
    key: "setUser",
    value: function setUser(user) {
      var _this$hub;
      if (this._mfeSentry) {
        this._mfeSentry.setUser(user);
        return;
      }
      (_this$hub = this.hub) === null || _this$hub === void 0 ? void 0 : _this$hub.configureScope(function (scope) {
        scope.setUser(user);
      });
    }
  }, {
    key: "setTags",
    value: function setTags(tags) {
      var _this$hub2;
      if (this._mfeSentry) {
        this._mfeSentry.setTags(tags);
        return;
      }
      (_this$hub2 = this.hub) === null || _this$hub2 === void 0 ? void 0 : _this$hub2.configureScope(function (scope) {
        scope.setTags(tags);
      });
    }
  }, {
    key: "toggle",
    value: function toggle(_ref2) {
      var intercepted = _ref2.intercepted;
      if (this._mfeSentry) {
        this._mfeSentry.setTags({
          intercepted: intercepted
        });
      } else {
        this.intercepted = intercepted;
      }
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
}(_nextCore.RcModule)) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=ErrorLogger.js.map
