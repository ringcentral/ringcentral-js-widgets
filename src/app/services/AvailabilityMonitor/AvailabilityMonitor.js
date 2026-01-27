"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STATUS_END_POINT = exports.HEALTH_CHECK_INTERVAL = exports.AvailabilityMonitor = void 0;
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.number.is-nan.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.parse-float.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.timers.js");
var _debounceThrottle = require("@ringcentral-integration/commons/lib/debounce-throttle");
var _validateIsOffline = _interopRequireDefault(require("@ringcentral-integration/commons/lib/validateIsOffline"));
var _nextCore = require("@ringcentral-integration/next-core");
var _ramda = require("ramda");
var _Auth = require("../Auth");
var _Client = require("../Client");
var _Environment = require("../Environment");
var _availabilityMonitorHelper = require("./availabilityMonitorHelper");
var _errorMessages = require("./errorMessages");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
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
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var HEALTH_CHECK_INTERVAL = exports.HEALTH_CHECK_INTERVAL = 60 * 1000;
var STATUS_END_POINT = exports.STATUS_END_POINT = '/restapi/v1.0/status';
var DEFAULT_TIME = 0;
var SHARED_STATE_EXPIRATION = 12 * 60 * 60 * 1000;
var AvailabilityMonitor = exports.AvailabilityMonitor = (_dec = (0, _nextCore.injectable)({
  name: 'AvailabilityMonitor'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('Prefix')(target, undefined, 2);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('TabManager')(target, undefined, 3);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 4);
}, _dec5 = function _dec5(target, key) {
  return (0, _nextCore.optional)('AvailabilityMonitorOptions')(target, undefined, 5);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _Auth.Auth === "undefined" ? Object : _Auth.Auth, typeof _Client.Client === "undefined" ? Object : _Client.Client, String, Object, typeof _Environment.Environment === "undefined" ? Object : _Environment.Environment, typeof AvailabilityMonitorOptions === "undefined" ? Object : AvailabilityMonitorOptions]), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", []), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", []), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", []), _dec12 = Reflect.metadata("design:type", Function), _dec13 = Reflect.metadata("design:paramtypes", []), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", []), _dec16 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec17 = (0, _nextCore.computed)(function (that) {
  return [that.sharedStates];
}), _dec18 = Reflect.metadata("design:type", Function), _dec19 = Reflect.metadata("design:paramtypes", []), _dec20 = (0, _nextCore.computed)(function (that) {
  return [that.sharedStates];
}), _dec21 = Reflect.metadata("design:type", Function), _dec22 = Reflect.metadata("design:paramtypes", []), _dec23 = Reflect.metadata("design:type", Function), _dec24 = Reflect.metadata("design:paramtypes", []), _dec25 = Reflect.metadata("design:type", Function), _dec26 = Reflect.metadata("design:paramtypes", []), _dec27 = Reflect.metadata("design:type", Function), _dec28 = Reflect.metadata("design:paramtypes", [String, typeof Omit === "undefined" ? Object : Omit]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function AvailabilityMonitor(_auth, _client, _prefix, _tabManager, _environment, _availabilityMonitorOptions) {
    var _this$_availabilityMo, _this$_availabilityMo2;
    var _this;
    _classCallCheck(this, AvailabilityMonitor);
    _this = _callSuper(this, AvailabilityMonitor);
    _this._auth = _auth;
    _this._client = _client;
    _this._prefix = _prefix;
    _this._tabManager = _tabManager;
    _this._environment = _environment;
    _this._availabilityMonitorOptions = _availabilityMonitorOptions;
    _this._enabled = (_this$_availabilityMo = (_this$_availabilityMo2 = _this._availabilityMonitorOptions) === null || _this$_availabilityMo2 === void 0 ? void 0 : _this$_availabilityMo2.enabled) !== null && _this$_availabilityMo !== void 0 ? _this$_availabilityMo : false;
    _this._randomTime = DEFAULT_TIME;
    _this._limitedTimeout = null;
    _this._normalTimeout = null;
    _this._promise = null;
    _this._healthRetryTime = HEALTH_CHECK_INTERVAL;
    _this._unbindHandlers = null;
    /**
     * When App is in Limited Mode and Status check met a non-503 error
     */
    _initializerDefineProperty(_this, "hasLimitedStatusError", _descriptor, _this);
    _initializerDefineProperty(_this, "isLimitedMode", _descriptor2, _this);
    _initializerDefineProperty(_this, "isVoIPOnlyMode", _descriptor3, _this);
    _this._beforeRequestHandler = function (params) {
      if (!_this.isLimitedAvailabilityMode || !_this._enabled) {
        return;
      }
      var requestUrl = (0, _ramda.pathOr)(null, ['_request', 'url'], params);
      var requestMethod = (0, _ramda.pathOr)(null, ['_request', 'method'], params);
      if (!requestUrl || !requestMethod) {
        return;
      }

      // In the limited availability mode, should not block status check api
      // or highly availability api.
      if ((0, _availabilityMonitorHelper.extractUrl)({
        url: requestUrl
      }) === STATUS_END_POINT || (0, _availabilityMonitorHelper.isHAEnabledAPI)({
        url: requestUrl,
        method: requestMethod
      })) {
        return;
      }
      throw new Error(_errorMessages.errorMessages.serviceLimited);
    };
    /**
     * Check if app can enter LA mode.
     * If this module is not enabled, just return.
     *
     */
    _this._requestErrorHandler = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(error) {
        var requestUrl, extractedUrl, headers, retryAfter;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return _this.attachErrorResponse(error);
            case 1:
              requestUrl = (0, _ramda.pathOr)('', ['request', 'url'], error);
              extractedUrl = (0, _availabilityMonitorHelper.extractUrl)({
                url: requestUrl
              }); // If app is in Limited Mode and staus API met a status which is not 200 nor 503
              if (!(_this.isLimitedAvailabilityMode && extractedUrl === STATUS_END_POINT && !(0, _availabilityMonitorHelper.isHAError)(error))) {
                _context.n = 2;
                break;
              }
              if (!_this.hasLimitedStatusError) {
                _this.setLimitedModeStatusError();
              }
              return _context.a(2);
            case 2:
              if (!(!(0, _availabilityMonitorHelper.isHAError)(error) || !_this._enabled)) {
                _context.n = 3;
                break;
              }
              return _context.a(2);
            case 3:
              headers = (0, _ramda.pathOr)({}, ['response', 'headers'], error);
              retryAfter = _this._retrieveRetryAfter(headers);
              if (retryAfter > 0) {
                // Retry-After unit is secons, make it mili-secons
                _this._healthRetryTime = retryAfter * 1000;
              } else {
                _this._healthRetryTime = HEALTH_CHECK_INTERVAL;
              }
              _this._switchToLimitedMode();
              _this._retry();
            case 4:
              return _context.a(2);
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
    _this._refreshErrorHandler = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(error) {
        var isOffline, platform, RES_STATUS, refreshTokenValid, _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              isOffline = (0, _validateIsOffline["default"])(error.message);
              platform = _this._client.service.platform();
              RES_STATUS = error.response && error.response.status || null;
              _t = isOffline || Number(RES_STATUS) >= 500;
              if (!_t) {
                _context2.n = 2;
                break;
              }
              _context2.n = 1;
              return platform.auth().refreshTokenValid();
            case 1:
              _t = _context2.v;
            case 2:
              refreshTokenValid = _t;
              if (refreshTokenValid) {
                _this._switchToVoIPOnlyMode();
              }
            case 3:
              return _context2.a(2);
          }
        }, _callee2);
      }));
      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();
    _this._refreshSuccessHandler = function () {
      if (_this.isVoIPOnlyMode) {
        _this.setVoIPOnlyReset();
      }
      _this._clearLimitedTimeout();
    };
    _this._switchToVoIPOnlyMode = function () {
      if (_this.isVoIPOnlyMode) {
        return;
      }
      _this._healthRetryTime = HEALTH_CHECK_INTERVAL;
      _this.setVoIPOnlyMode();
      _this._retry();
    };
    _this._switchToNormalMode = function () {
      if (!_this.isLimitedAvailabilityMode) {
        return;
      }
      _this.setNormalMode();
      _this._clearLimitedTimeout();
      _this._clearNormalTimeout();
    };
    /**
     * Health check with status API
     */
    _this.healthCheck = (0, _debounceThrottle.promisedThrottle)({
      fn: function fn() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                return _context3.a(2, _this2._healthCheck({
                  manual: true
                }));
            }
          }, _callee3);
        }))();
      }
    });
    /**
     * Custom storage with localStorage in synchronous way
     * ! Be aware that these states are shared across multiple tabs !
     */
    _initializerDefineProperty(_this, "sharedStates", _descriptor4, _this);
    _this._sharedStatesKey = void 0;
    _this._currentTabKeys = [];
    return _this;
  }
  _inherits(AvailabilityMonitor, _RcModule);
  return _createClass(AvailabilityMonitor, [{
    key: "setLimitedModeStatusError",
    value: function setLimitedModeStatusError() {
      this.hasLimitedStatusError = true;
    }
  }, {
    key: "setNormalMode",
    value: function setNormalMode() {
      this.hasLimitedStatusError = false;
      this.isLimitedMode = false;
      this.isVoIPOnlyMode = false;
    }
  }, {
    key: "setLimitedMode",
    value: function setLimitedMode() {
      this.isLimitedMode = true;
    }
  }, {
    key: "setVoIPOnlyMode",
    value: function setVoIPOnlyMode() {
      this.isVoIPOnlyMode = true;
    }
  }, {
    key: "setVoIPOnlyReset",
    value: function setVoIPOnlyReset() {
      this.isVoIPOnlyMode = false;
    }
  }, {
    key: "onInit",
    value: function onInit() {
      this._bindHandlers();
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this3 = this;
      this._initLocalStorage();
      (0, _nextCore.watch)(this, function () {
        var _this3$_environment;
        return (_this3$_environment = _this3._environment) === null || _this3$_environment === void 0 ? void 0 : _this3$_environment.changeCounter;
      }, function () {
        var _this3$_environment2;
        if (_this3.ready && ((_this3$_environment2 = _this3._environment) === null || _this3$_environment2 === void 0 ? void 0 : _this3$_environment2.ready)) {
          _this3._bindHandlers();
        }
      });
    }
  }, {
    key: "_bindHandlers",
    value: function _bindHandlers() {
      var _this4 = this;
      if (this._unbindHandlers) {
        this._unbindHandlers();
      }
      var client = this._client.service.client();
      var platform = this._client.service.platform();

      // TODO: in other modules, when they catch error first check if app is in HA mode.
      client.on(client.events.beforeRequest, this._beforeRequestHandler);
      client.on(client.events.requestError, this._requestErrorHandler);
      platform.addListener(platform.events.loginSuccess, this._switchToNormalMode);
      platform.addListener(platform.events.logoutSuccess, this._switchToNormalMode);
      platform.addListener(platform.events.logoutError, this._switchToNormalMode);
      platform.addListener(platform.events.refreshError, this._refreshErrorHandler);
      platform.addListener(platform.events.refreshSuccess, this._refreshSuccessHandler);
      this._unbindHandlers = function () {
        client.removeListener(client.events.beforeRequest, _this4._beforeRequestHandler);
        client.removeListener(client.events.requestError, _this4._requestErrorHandler);
        platform.removeListener(platform.events.loginSuccess, _this4._switchToNormalMode);
        platform.removeListener(platform.events.logoutSuccess, _this4._switchToNormalMode);
        platform.removeListener(platform.events.logoutError, _this4._switchToNormalMode);
        platform.removeListener(platform.events.refreshError, _this4._refreshErrorHandler);
        platform.removeListener(platform.events.refreshSuccess, _this4._refreshSuccessHandler);
        _this4._unbindHandlers = null;
      };
    }
  }, {
    key: "_retrieveRetryAfter",
    value:
    /**
     * Retrieve retry after value from response headers
     */
    function _retrieveRetryAfter(headers) {
      try {
        var retryAfter = parseFloat("".concat(headers.get('Retry-After') || -1));
        return Number.isNaN(retryAfter) ? -1 : retryAfter;
      } catch (error) {
        return -1;
      }
    }
  }, {
    key: "_switchToLimitedMode",
    value: function _switchToLimitedMode() {
      if (this.isLimitedMode) {
        return;
      }
      this.setLimitedMode();
    }
  }, {
    key: "_clearLimitedTimeout",
    value: function _clearLimitedTimeout() {
      if (this._limitedTimeout) {
        clearTimeout(this._limitedTimeout);
        this._limitedTimeout = null;
      }
    }
  }, {
    key: "_clearNormalTimeout",
    value: function _clearNormalTimeout() {
      if (this._normalTimeout) {
        clearTimeout(this._normalTimeout);
        this._normalTimeout = null;
      }
    }
  }, {
    key: "_getStatus",
    value: function () {
      var _getStatus2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var res;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return this._client.service.platform().get('/restapi/v1.0/status', null, {
                skipAuthCheck: true,
                headers: {
                  Authorization: "Bearer ".concat(this._auth.accessToken)
                }
              });
            case 1:
              res = _context4.v;
              return _context4.a(2, res);
          }
        }, _callee4, this);
      }));
      function _getStatus() {
        return _getStatus2.apply(this, arguments);
      }
      return _getStatus;
    }()
  }, {
    key: "_retry",
    value: function _retry() {
      var _this5 = this;
      if (!this._limitedTimeout) {
        this._limitedTimeout = setTimeout(function () {
          _this5._clearLimitedTimeout();
          _this5._healthCheck();
        }, this._healthRetryTime);
      }
    }

    /**
     * Inner method of health checking
     */
  }, {
    key: "_healthCheck",
    value: (function () {
      var _healthCheck2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var _this6 = this;
        var _ref3,
          _ref3$manual,
          manual,
          response,
          _args5 = arguments,
          _t2;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _ref3 = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {}, _ref3$manual = _ref3.manual, manual = _ref3$manual === void 0 ? false : _ref3$manual;
              if (!this._promise) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2);
            case 1:
              _context5.p = 1;
              this._promise = this._getStatus();
              _context5.n = 2;
              return this._promise;
            case 2:
              response = _context5.v;
              if (!(!response || response.status !== 200)) {
                _context5.n = 3;
                break;
              }
              return _context5.a(2);
            case 3:
              _context5.n = 5;
              break;
            case 4:
              _context5.p = 4;
              _t2 = _context5.v;
              console.error('error from request of /restapi/v1.0/status.');
              return _context5.a(2);
            case 5:
              _context5.p = 5;
              this._promise = null;
              return _context5.f(5);
            case 6:
              if (!manual) {
                _context5.n = 7;
                break;
              }
              this._clearNormalTimeout();
              this._switchToNormalMode();
              return _context5.a(2);
            case 7:
              // In the described situation Client Application should follow an "Exponential Backoff" approach:
              // The retries exponentially increase the waiting time up to a certain threshold.
              // The idea is that if the server is down temporarily,
              // it is not overwhelmed with requests hitting at the same time when it comes back up.
              //
              // Reference: https://wiki_domain/display/PLAT/Error+Handling+Guidelines+for+API+Clients

              this._randomTime = this._randomTime || (0, _availabilityMonitorHelper.generateRandomNumber)(); // Generate random seconds (1 ~ 121)
              this._normalTimeout = setTimeout(function () {
                _this6._clearNormalTimeout();
                _this6._switchToNormalMode();
              }, this._randomTime * 1000);
            case 8:
              return _context5.a(2);
          }
        }, _callee5, this, [[1, 4, 5, 6]]);
      }));
      function _healthCheck() {
        return _healthCheck2.apply(this, arguments);
      }
      return _healthCheck;
    }())
  }, {
    key: "checkIfHAError",
    value: (
    /**
     * Check if the error is Survival Mode error,
     * Or if app is already in Survival Mode and current request is blocked with an error.
     */
    function () {
      var _checkIfHAError = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(error) {
        var errMessage;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              errMessage = (0, _ramda.pathOr)(null, ['message'], error);
              _context6.n = 1;
              return this.attachErrorResponse(error);
            case 1:
              return _context6.a(2, (0, _availabilityMonitorHelper.isHAError)(error) || errMessage === _errorMessages.errorMessages.serviceLimited);
          }
        }, _callee6, this);
      }));
      function checkIfHAError(_x3) {
        return _checkIfHAError.apply(this, arguments);
      }
      return checkIfHAError;
    }())
  }, {
    key: "attachErrorResponse",
    value: function () {
      var _attachErrorResponse = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(error) {
        var response, _t3;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              response = error.response;
              if (!(response && !response._json)) {
                _context7.n = 4;
                break;
              }
              _context7.p = 1;
              _context7.n = 2;
              return response.clone().json();
            case 2:
              response._json = _context7.v;
              _context7.n = 4;
              break;
            case 3:
              _context7.p = 3;
              _t3 = _context7.v;
              // ignore response json error
              console.error('error from response.json()', {
                error: error,
                err: _t3
              });
            case 4:
              return _context7.a(2);
          }
        }, _callee7, null, [[1, 3]]);
      }));
      function attachErrorResponse(_x4) {
        return _attachErrorResponse.apply(this, arguments);
      }
      return attachErrorResponse;
    }()
    /**
     * Is App in limited mode
     */
  }, {
    key: "isLimitedAvailabilityMode",
    get: function get() {
      return this.isLimitedMode || this.isVoIPOnlyMode;
    }
  }, {
    key: "hasCallSession",
    get: function get() {
      var _this7 = this;
      return Object.keys(this.sharedStates).some(function (key) {
        return _this7.sharedStates[key].hasCallSession;
      });
    }
  }, {
    key: "hasWebSocketReady",
    get: function get() {
      var _this8 = this;
      return Object.keys(this.sharedStates).some(function (key) {
        return _this8.sharedStates[key].webSocketReady;
      });
    }
  }, {
    key: "_writeSharedStates",
    value: function _writeSharedStates() {
      var _global$localStorage;
      var json = JSON.stringify(this.sharedStates);
      (_global$localStorage = global.localStorage) === null || _global$localStorage === void 0 ? void 0 : _global$localStorage.setItem(this._sharedStatesKey, json);
    }
  }, {
    key: "_retrieveSharedStates",
    value: function _retrieveSharedStates() {
      var _global$localStorage2;
      var json = (_global$localStorage2 = global.localStorage) === null || _global$localStorage2 === void 0 ? void 0 : _global$localStorage2.getItem(this._sharedStatesKey);
      this.sharedStates = JSON.parse(json !== null && json !== void 0 ? json : '{}');
    }

    // TODO: ensure that still working in worker context
  }, {
    key: "_initLocalStorage",
    value: function _initLocalStorage() {
      var _this9 = this;
      this._sharedStatesKey = "".concat(this._prefix, "-AvailabilityMonitor-sharedStates");
      if (global.localStorage) {
        var isUnloading;
        this._retrieveSharedStates();
        global.addEventListener('storage', function (ev) {
          if (!isUnloading && ev.key === _this9._sharedStatesKey) {
            _this9._retrieveSharedStates();
          }
        });
        global.addEventListener('pagehide', function () {
          isUnloading = true;
          _this9._unloadSharedStates();
        });
      }
    }
  }, {
    key: "_unloadSharedStates",
    value: function _unloadSharedStates() {
      var _this0 = this;
      var states = _objectSpread({}, this.sharedStates);

      // unload base on cached keys
      this._currentTabKeys.forEach(function (key) {
        delete states[key];
      });
      this._currentTabKeys = [];

      // unload base on tabId
      if (this._tabManager) {
        Object.keys(states).forEach(function (key) {
          if (states[key].tabId === _this0._tabManager.id) {
            delete states[key];
          }
        });
      }

      // clean
      states = this._cleanSharedStates(states);

      // write
      this.sharedStates = states;
      this._writeSharedStates();
    }
  }, {
    key: "_cleanSharedStates",
    value: function _cleanSharedStates(states) {
      var _this1 = this;
      Object.keys(states).forEach(function (key) {
        var state = states[key];
        if (
        // timestamp expired
        Date.now() - state.timestamp > SHARED_STATE_EXPIRATION ||
        // tabs expired/closed
        state.tabId && _this1._tabManager && !_this1._tabManager.actualTabIds.includes(state.tabId)) {
          delete states[key];
        }
      });
      return states;
    }
  }, {
    key: "setSharedState",
    value: function setSharedState(key, state) {
      var states = _objectSpread({}, this.sharedStates);

      // update
      if (state) {
        var _this$_tabManager;
        var current = states[key];
        states[key] = _objectSpread(_objectSpread(_objectSpread({}, current), state), {}, {
          timestamp: Date.now(),
          tabId: (_this$_tabManager = this._tabManager) === null || _this$_tabManager === void 0 ? void 0 : _this$_tabManager.id
        });
      } else {
        delete states[key];
      }

      // clean
      states = this._cleanSharedStates(states);

      // write storage
      this.sharedStates = states;
      this._writeSharedStates();

      // cache keys
      if (!this._currentTabKeys.includes(key)) {
        this._currentTabKeys.push(key);
      }
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "hasLimitedStatusError", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "isLimitedMode", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "isVoIPOnlyMode", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setLimitedModeStatusError", [_nextCore.action, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "setLimitedModeStatusError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setNormalMode", [_nextCore.action, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "setNormalMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLimitedMode", [_nextCore.action, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "setLimitedMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setVoIPOnlyMode", [_nextCore.action, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "setVoIPOnlyMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setVoIPOnlyReset", [_nextCore.action, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "setVoIPOnlyReset"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "sharedStates", [_nextCore.state, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "hasCallSession", [_dec17, _dec18, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "hasCallSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hasWebSocketReady", [_dec20, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "hasWebSocketReady"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_retrieveSharedStates", [_nextCore.action, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "_retrieveSharedStates"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_unloadSharedStates", [_nextCore.action, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "_unloadSharedStates"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSharedState", [_nextCore.action, _dec27, _dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "setSharedState"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=AvailabilityMonitor.js.map
