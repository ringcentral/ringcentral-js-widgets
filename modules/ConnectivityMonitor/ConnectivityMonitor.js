"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.includes");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.string.includes");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_TIME_TO_RETRY = exports.DEFAULT_HEART_BEAT_INTERVAL = exports.ConnectivityMonitor = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _AvailabilityMonitor = require("../AvailabilityMonitor");
var _RateLimiter = require("../RateLimiter");
var _dec, _class, _class2, _descriptor, _descriptor2;
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
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
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var DEFAULT_TIME_TO_RETRY = 5 * 1000;
exports.DEFAULT_TIME_TO_RETRY = DEFAULT_TIME_TO_RETRY;
var DEFAULT_HEART_BEAT_INTERVAL = 60 * 1000;
exports.DEFAULT_HEART_BEAT_INTERVAL = DEFAULT_HEART_BEAT_INTERVAL;
var errorMessageTypes = [_RateLimiter.errorMessages.rateLimitReached, _AvailabilityMonitor.errorMessages.serviceLimited];
function defaultCheckConnectionFn() {
  return _defaultCheckConnectionFn.apply(this, arguments);
}
function _defaultCheckConnectionFn() {
  _defaultCheckConnectionFn = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return fetch('https://apps.ringcentral.com/integration/ping', {
              method: 'HEAD',
              mode: 'no-cors'
            });
          case 2:
            response = _context3.sent;
            if (!(response.type !== 'opaque' && response.status !== 200)) {
              _context3.next = 5;
              break;
            }
            throw new Error('Network check failed');
          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _defaultCheckConnectionFn.apply(this, arguments);
}
var ConnectivityMonitor = (_dec = (0, _di.Module)({
  name: 'ConnectivityMonitor',
  deps: ['Client', {
    dep: 'Environment',
    optional: true
  }, {
    dep: 'ConnectivityMonitorOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(ConnectivityMonitor, _RcModuleV);
  var _super = _createSuper(ConnectivityMonitor);
  function ConnectivityMonitor(deps) {
    var _this$_deps$connectiv, _this$_deps$connectiv2, _this$_deps$connectiv3, _this$_deps$connectiv4;
    var _this;
    _classCallCheck(this, ConnectivityMonitor);
    _this = _super.call(this, {
      deps: deps
    });
    _this._timeToRetry = (_this$_deps$connectiv = (_this$_deps$connectiv2 = _this._deps.connectivityMonitorOptions) === null || _this$_deps$connectiv2 === void 0 ? void 0 : _this$_deps$connectiv2.timeToRetry) !== null && _this$_deps$connectiv !== void 0 ? _this$_deps$connectiv : DEFAULT_TIME_TO_RETRY;
    _this._heartBeatInterval = (_this$_deps$connectiv3 = (_this$_deps$connectiv4 = _this._deps.connectivityMonitorOptions) === null || _this$_deps$connectiv4 === void 0 ? void 0 : _this$_deps$connectiv4.heartBeatInterval) !== null && _this$_deps$connectiv3 !== void 0 ? _this$_deps$connectiv3 : DEFAULT_HEART_BEAT_INTERVAL;
    _this._checkConnectionFunc = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _this$_deps$connectiv5, _this$_deps$connectiv6, checkConnectionFunc;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              checkConnectionFunc = (_this$_deps$connectiv5 = (_this$_deps$connectiv6 = _this._deps.connectivityMonitorOptions) === null || _this$_deps$connectiv6 === void 0 ? void 0 : _this$_deps$connectiv6.checkConnectionFunc) !== null && _this$_deps$connectiv5 !== void 0 ? _this$_deps$connectiv5 : defaultCheckConnectionFn;
              _context.next = 4;
              return checkConnectionFunc();
            case 4:
              _this._requestSuccessHandler();
              _context.next = 10;
              break;
            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              _this._requestErrorHandler(_context.t0);
            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
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
      if (!error.response && _this.connectivity) {
        _this.setConnectFail();
      }
      _this._retry();
    };
    _this._networkOnlineHandler = function () {
      _this._checkConnection();
    };
    _this._networkErrorHandler = function () {
      if (!_this.networkLoss) {
        _this.setNetworkLoss();
      }
      _this._retry();
    };
    _initializerDefineProperty(_this, "connectivity", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "networkLoss", _descriptor2, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(ConnectivityMonitor, [{
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
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(this.pending && (!this._deps.environment || this._deps.environment.ready));
    }
  }, {
    key: "_shouldRebindHandlers",
    value: function _shouldRebindHandlers() {
      var _this$_deps$environme;
      return !!(this.ready && ((_this$_deps$environme = this._deps.environment) === null || _this$_deps$environme === void 0 ? void 0 : _this$_deps$environme.ready) && this._deps.environment.changeCounter !== this._lastEnvironmentCounter);
    }
  }, {
    key: "onInit",
    value: function onInit() {
      this._bindHandlers();
    }
  }, {
    key: "onInitSuccess",
    value: function onInitSuccess() {
      this._retry();
    }
  }, {
    key: "onStateChange",
    value: function onStateChange() {
      if (!this._shouldInit() && this._shouldRebindHandlers()) {
        if (this._deps.environment) {
          this._lastEnvironmentCounter = this._deps.environment.changeCounter;
        }
        this._bindHandlers();
      }
    }
  }, {
    key: "_bindHandlers",
    value: function _bindHandlers() {
      var _this$_unbindHandlers,
        _window,
        _window2,
        _this2 = this;
      (_this$_unbindHandlers = this._unbindHandlers) === null || _this$_unbindHandlers === void 0 ? void 0 : _this$_unbindHandlers.call(this);
      var client = this._deps.client.service.client();
      client.on(client.events.requestSuccess, this._requestSuccessHandler);
      client.on(client.events.requestError, this._requestErrorHandler);
      (_window = window) === null || _window === void 0 ? void 0 : _window.addEventListener('offline', this._networkErrorHandler);
      (_window2 = window) === null || _window2 === void 0 ? void 0 : _window2.addEventListener('online', this._networkOnlineHandler);
      this._unbindHandlers = function () {
        var _window3, _window4;
        client.removeListener(client.events.requestSuccess, _this2._requestSuccessHandler);
        client.removeListener(client.events.requestError, _this2._requestErrorHandler);
        (_window3 = window) === null || _window3 === void 0 ? void 0 : _window3.removeEventListener('offline', _this2._networkErrorHandler);
        (_window4 = window) === null || _window4 === void 0 ? void 0 : _window4.removeEventListener('online', _this2._networkOnlineHandler);
        _this2._unbindHandlers = null;
      };
    }
  }, {
    key: "_checkConnection",
    value: function () {
      var _checkConnection2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this._checkConnectionFunc();
              case 3:
                _context2.next = 7;
                break;
              case 5:
                _context2.prev = 5;
                _context2.t0 = _context2["catch"](0);
              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 5]]);
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
      var _this3 = this;
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.connectivity ? this._heartBeatInterval : this._timeToRetry;
      this._clearTimeout();
      this._retryTimeoutId = setTimeout(function () {
        _this3._retryTimeoutId = null;
        _this3._checkConnection();
      }, t);
    }
  }]);
  return ConnectivityMonitor;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "connectivity", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "networkLoss", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setNetworkLoss", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setNetworkLoss"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setConnectSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setConnectSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setConnectFail", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setConnectFail"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_checkConnection", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_checkConnection"), _class2.prototype)), _class2)) || _class);
exports.ConnectivityMonitor = ConnectivityMonitor;
//# sourceMappingURL=ConnectivityMonitor.js.map
