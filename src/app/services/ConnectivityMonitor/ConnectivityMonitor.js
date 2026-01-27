"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_TIME_TO_RETRY = exports.DEFAULT_HEART_BEAT_INTERVAL = exports.ConnectivityMonitor = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/web.timers.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _rxjs = require("rxjs");
var _errorMessages = require("../AvailabilityMonitor/errorMessages");
var _Client = require("../Client");
var _Environment = require("../Environment");
var _errorMessages2 = require("../RateLimiter/errorMessages");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2, _descriptor, _descriptor2;
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
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
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var DEFAULT_TIME_TO_RETRY = exports.DEFAULT_TIME_TO_RETRY = 5 * 1000;
var DEFAULT_HEART_BEAT_INTERVAL = exports.DEFAULT_HEART_BEAT_INTERVAL = 60 * 1000;
var errorMessageTypes = [_errorMessages2.errorMessages.rateLimitReached, _errorMessages.errorMessages.serviceLimited];
function defaultCheckConnectionFn() {
  return _defaultCheckConnectionFn.apply(this, arguments);
}
/**
 * Monitors network connectivity and handles connection state
 *
 * @class
 */
function _defaultCheckConnectionFn() {
  _defaultCheckConnectionFn = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    var response;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          _context4.n = 1;
          return fetch('https://apps.ringcentral.com/integration/ping', {
            method: 'HEAD',
            mode: 'no-cors'
          });
        case 1:
          response = _context4.v;
          if (!(response.type !== 'opaque' && response.status !== 200)) {
            _context4.n = 2;
            break;
          }
          throw new Error('Network check failed');
        case 2:
          return _context4.a(2);
      }
    }, _callee4);
  }));
  return _defaultCheckConnectionFn.apply(this, arguments);
}
var ConnectivityMonitor = exports.ConnectivityMonitor = (_dec = (0, _nextCore.injectable)({
  name: 'ConnectivityMonitor'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 3);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('ConnectivityMonitorOptions')(target, undefined, 4);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _nextCore.Root === "undefined" ? Object : _nextCore.Root, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof _Client.Client === "undefined" ? Object : _Client.Client, typeof _Environment.Environment === "undefined" ? Object : _Environment.Environment, typeof ConnectivityMonitorOptions === "undefined" ? Object : ConnectivityMonitorOptions]), _dec6 = (0, _nextCore.delegate)('server'), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", []), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", []), _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", []), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", []), _dec13 = (0, _nextCore.delegate)('server'), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function ConnectivityMonitor(_root, _portManager, _client, _environment, _connectivityMonitorOptions) {
    var _this$_connectivityMo, _this$_connectivityMo2, _this$_connectivityMo3, _this$_connectivityMo4;
    var _this;
    _classCallCheck(this, ConnectivityMonitor);
    _this = _callSuper(this, ConnectivityMonitor);
    _this._root = _root;
    _this._portManager = _portManager;
    _this._client = _client;
    _this._environment = _environment;
    _this._connectivityMonitorOptions = _connectivityMonitorOptions;
    _this._timeToRetry = (_this$_connectivityMo = (_this$_connectivityMo2 = _this._connectivityMonitorOptions) === null || _this$_connectivityMo2 === void 0 ? void 0 : _this$_connectivityMo2.timeToRetry) !== null && _this$_connectivityMo !== void 0 ? _this$_connectivityMo : DEFAULT_TIME_TO_RETRY;
    _this._heartBeatInterval = (_this$_connectivityMo3 = (_this$_connectivityMo4 = _this._connectivityMonitorOptions) === null || _this$_connectivityMo4 === void 0 ? void 0 : _this$_connectivityMo4.heartBeatInterval) !== null && _this$_connectivityMo3 !== void 0 ? _this$_connectivityMo3 : DEFAULT_HEART_BEAT_INTERVAL;
    _this._checkConnectionFunc = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var _this$_connectivityMo5, _this$_connectivityMo6, checkConnectionFunc, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            checkConnectionFunc = (_this$_connectivityMo5 = (_this$_connectivityMo6 = _this._connectivityMonitorOptions) === null || _this$_connectivityMo6 === void 0 ? void 0 : _this$_connectivityMo6.checkConnectionFunc) !== null && _this$_connectivityMo5 !== void 0 ? _this$_connectivityMo5 : defaultCheckConnectionFn;
            _context.n = 1;
            return checkConnectionFunc();
          case 1:
            _this._requestSuccessHandler();
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            _this._requestErrorHandler(_t);
          case 3:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2]]);
    }));
    _this._retryTimeoutId = null;
    _this._lastEnvironmentCounter = 0;
    _this._unbindHandlers = null;
    _this._requestSuccessHandler = function () {
      if (!_this.connectivity) {
        _this.setConnectSuccess();
      }
      _this._retry();
    };
    _this._requestErrorHandler = function (error) {
      if (error.message && errorMessageTypes.includes(error.message)) return;
      if (!error.response) {
        if (_this.connectivity) {
          _this.setConnectFail();
        }
      }
      _this._retry();
    };
    _this._networkErrorHandler = function () {
      _this.handlerNetworkError();
    };
    _this._networkOnlineHandler = function () {
      _this._checkConnection();
    };
    /**
     * Current connectivity status
     * @type {boolean}
     */
    _initializerDefineProperty(_this, "connectivity", _descriptor, _this);
    /**
     * Flag indicating if network connection is lost
     * @type {boolean}
     */
    _initializerDefineProperty(_this, "networkLoss", _descriptor2, _this);
    _this.networkLoss$ = (0, _rxjs.fromEvent)(global, 'offline');
    _this.networkOnline$ = (0, _rxjs.fromEvent)(global, 'online');
    if (!_this.enable) return _possibleConstructorReturn(_this);
    if (_this._portManager.shared) {
      _this._portManager.onMainTab(function () {
        _this._bindNetworkHandler();
      });
    } else {
      _this._bindNetworkHandler();
    }
    return _this;
  }
  _inherits(ConnectivityMonitor, _RcModule);
  return _createClass(ConnectivityMonitor, [{
    key: "enable",
    get: function get() {
      var _this$_connectivityMo7, _this$_connectivityMo8;
      return (_this$_connectivityMo7 = (_this$_connectivityMo8 = this._connectivityMonitorOptions) === null || _this$_connectivityMo8 === void 0 ? void 0 : _this$_connectivityMo8.enable) !== null && _this$_connectivityMo7 !== void 0 ? _this$_connectivityMo7 : true;
    }
  }, {
    key: "handlerNetworkError",
    value: function () {
      var _handlerNetworkError = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (!this.networkLoss) {
                this.setNetworkLoss();
              }
              this._retry();
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function handlerNetworkError() {
        return _handlerNetworkError.apply(this, arguments);
      }
      return handlerNetworkError;
    }()
  }, {
    key: "setNetworkLoss",
    value: function setNetworkLoss() {
      this.connectivity = false;
      this.networkLoss = true;
    }
  }, {
    key: "setConnectSuccess",
    value: function setConnectSuccess() {
      this.connectivity = true;
      this.networkLoss = false;
    }
  }, {
    key: "setConnectFail",
    value: function setConnectFail() {
      this.connectivity = false;
    }

    /**
     * Indicates if the ConnectivityMonitor is ready to be used
     * @type {boolean}
     */
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(this.pending && (!this._environment || this._environment.ready));
    }
  }, {
    key: "_shouldRebindHandlers",
    value: function _shouldRebindHandlers() {
      var _this$_environment;
      return !!(this.ready && ((_this$_environment = this._environment) === null || _this$_environment === void 0 ? void 0 : _this$_environment.ready) && this._environment.changeCounter !== this._lastEnvironmentCounter);
    }
  }, {
    key: "onInit",
    value: function onInit() {
      if (this.enable) {
        this._bindHandlers();
      }
    }
  }, {
    key: "onInitSuccess",
    value: function onInitSuccess() {
      if (this.enable) {
        this._retry();
      }
    }
  }, {
    key: "onStateChange",
    value: function onStateChange() {
      if (!this._shouldInit() && this._shouldRebindHandlers()) {
        if (this._environment) {
          this._lastEnvironmentCounter = this._environment.changeCounter;
        }
        this._bindHandlers();
      }
    }
  }, {
    key: "_bindHandlers",
    value: function _bindHandlers() {
      var _this$_unbindHandlers,
        _this2 = this;
      (_this$_unbindHandlers = this._unbindHandlers) === null || _this$_unbindHandlers === void 0 ? void 0 : _this$_unbindHandlers.call(this);
      var client = this._client.service.client();
      client.on(client.events.requestSuccess, this._requestSuccessHandler);
      client.on(client.events.requestError, this._requestErrorHandler);
      this._unbindHandlers = function () {
        client.removeListener(client.events.requestSuccess, _this2._requestSuccessHandler);
        client.removeListener(client.events.requestError, _this2._requestErrorHandler);
        _this2._unbindHandlers = null;
      };
    }
  }, {
    key: "_bindNetworkHandler",
    value: function _bindNetworkHandler() {
      var _this3 = this;
      this.networkLoss$.pipe((0, _rxjs.tap)(function () {
        return _this3.handlerNetworkError();
      }), this._root.takeUntilAppDestroy).subscribe();
      this.networkOnline$.pipe((0, _rxjs.tap)(function () {
        return _this3._networkOnlineHandler();
      }), this._root.takeUntilAppDestroy).subscribe();
    }
  }, {
    key: "_checkConnection",
    value: function () {
      var _checkConnection2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var _t2;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              _context3.n = 1;
              return this._checkConnectionFunc();
            case 1:
              _context3.n = 3;
              break;
            case 2:
              _context3.p = 2;
              _t2 = _context3.v;
            case 3:
              return _context3.a(2);
          }
        }, _callee3, this, [[0, 2]]);
      }));
      function _checkConnection() {
        return _checkConnection2.apply(this, arguments);
      }
      return _checkConnection;
    }()
  }, {
    key: "_clearTimeout",
    value: function _clearTimeout() {
      if (this._retryTimeoutId) {
        clearTimeout(this._retryTimeoutId);
        this._retryTimeoutId = null;
      }
    }
  }, {
    key: "_retry",
    value: function _retry() {
      var _this4 = this;
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.connectivity ? this._heartBeatInterval : this._timeToRetry;
      this._clearTimeout();
      this._retryTimeoutId = setTimeout(function () {
        _this4._retryTimeoutId = null;
        _this4._checkConnection();
      }, t);
    }
  }]);
}(_nextCore.RcModule), _applyDecoratedDescriptor(_class2.prototype, "handlerNetworkError", [_dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "handlerNetworkError"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "connectivity", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "networkLoss", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setNetworkLoss", [_nextCore.action, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "setNetworkLoss"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setConnectSuccess", [_nextCore.action, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "setConnectSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setConnectFail", [_nextCore.action, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "setConnectFail"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_checkConnection", [_dec13, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "_checkConnection"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=ConnectivityMonitor.js.map
