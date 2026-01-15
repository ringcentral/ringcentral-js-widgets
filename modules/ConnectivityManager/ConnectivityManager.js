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
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectivityManager = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
var _di = require("@ringcentral-integration/commons/lib/di");
var _proxify = require("@ringcentral-integration/commons/lib/proxy/proxify");
var _core = require("@ringcentral-integration/core");
var _connectivityTypes = require("./connectivityTypes");
var _dec, _dec2, _dec3, _class, _class2;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var ConnectivityManager = exports.ConnectivityManager = (_dec = (0, _di.Module)({
  name: 'ConnectivityManager',
  deps: ['Alert', 'OAuth', 'Auth', 'ConnectivityMonitor', {
    dep: 'AvailabilityMonitor',
    optional: true
  }, {
    dep: 'CallingSettings',
    optional: true
  }, {
    dep: 'AudioSettings',
    optional: true
  }, {
    dep: 'Webphone',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.connectivityMonitor.networkLoss, that._deps.connectivityMonitor.connectivity, that.proxyRetryCount, that.isVoIPOnlyModeActivated, that.isLimitedModeActivated, that.webphoneAvailable, that.webphoneUnavailable];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that.connectivityType];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function ConnectivityManager(deps) {
    _classCallCheck(this, ConnectivityManager);
    return _callSuper(this, ConnectivityManager, [{
      deps: deps
    }]);
  }
  _inherits(ConnectivityManager, _RcModuleV);
  return _createClass(ConnectivityManager, [{
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this = this;
      (0, _core.watch)(this, function () {
        return _this.connectivityType;
      }, function () {
        if (_this.ready) {
          _this.showConnectivityAlert();
        }
      });
    }

    // Cancel @proxify for getting user media permission on client page
    // May need a better solution when migrate `googlechrome` project to new arch
    // @proxify
  }, {
    key: "checkWebphoneAndConnect",
    value: function () {
      var _checkWebphoneAndConnect = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!(!this._deps.callingSettings || this._deps.callingSettings && (!this._deps.callingSettings.ready || !this._deps.callingSettings.isWebphoneMode))) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              if (this._deps.audioSettings && this._deps.audioSettings.ready) {
                this._deps.audioSettings.checkAudioAvailable({
                  checkIfNoDevices: true
                });
              }
              if (this._deps.webphone && this._deps.webphone.ready) {
                this._deps.webphone.connect({
                  force: true,
                  skipConnectDelay: true
                });
              }
            case 2:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function checkWebphoneAndConnect() {
        return _checkWebphoneAndConnect.apply(this, arguments);
      }
      return checkWebphoneAndConnect;
    }()
  }, {
    key: "checkStatus",
    value: function () {
      var _checkStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (this._deps.availabilityMonitor) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              this._deps.availabilityMonitor.healthCheck();
            case 2:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function checkStatus() {
        return _checkStatus.apply(this, arguments);
      }
      return checkStatus;
    }()
  }, {
    key: "_showAlert",
    value: function _showAlert(message) {
      if (message) {
        this._deps.alert.danger({
          message: message,
          allowDuplicates: false
        });
      }
    }
  }, {
    key: "_hideAlerts",
    value: function _hideAlerts() {
      var alertIds = this._deps.alert.messages.filter(function (m) {
        for (var type in _connectivityTypes.connectivityTypes) {
          if (m.message === _connectivityTypes.connectivityTypes[type]) return true;
        }
        return false;
      }).map(function (m) {
        return m.id;
      });
      if (alertIds.length) {
        this._deps.alert.dismiss(alertIds);
      }
    }
  }, {
    key: "showConnectivityAlert",
    value: function () {
      var _showConnectivityAlert = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              if (!this.connectivityType || this.connectivityType === _connectivityTypes.connectivityTypes.webphoneUnavailable) {
                this._hideAlerts();
              } else {
                this._showAlert(this.connectivityType);
              }
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function showConnectivityAlert() {
        return _showConnectivityAlert.apply(this, arguments);
      }
      return showConnectivityAlert;
    }()
  }, {
    key: "webphoneAvailable",
    get: function get() {
      return this._deps.webphone && this._deps.callingSettings && this._deps.audioSettings && this._deps.audioSettings.ready && this._deps.callingSettings.ready && this._deps.auth.ready && this._deps.auth.loggedIn && this._deps.callingSettings.isWebphoneMode && this._deps.audioSettings.userMedia && this._deps.webphone.connected;
    }
  }, {
    key: "isWebphoneInitializing",
    get: function get() {
      var _this$_deps$callingSe;
      return !!((_this$_deps$callingSe = this._deps.callingSettings) === null || _this$_deps$callingSe === void 0 ? void 0 : _this$_deps$callingSe.isWebphoneMode) && (
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      !this._deps.webphone.ready ||
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      this._deps.webphone.disconnected ||
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      this._deps.webphone.connecting ||
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      this._deps.webphone.connectFailed);
    }
  }, {
    key: "webphoneConnecting",
    get: function get() {
      var _this$_deps$webphone;
      return !!((_this$_deps$webphone = this._deps.webphone) === null || _this$_deps$webphone === void 0 ? void 0 : _this$_deps$webphone.ready) && (this._deps.webphone.connecting || this._deps.webphone.reconnecting);
    }
  }, {
    key: "webphoneUnavailable",
    get: function get() {
      return this._deps.webphone && this._deps.callingSettings && this._deps.audioSettings && this._deps.audioSettings.ready && this._deps.auth.ready && this._deps.auth.loggedIn && this._deps.callingSettings.isWebphoneMode && (!this._deps.audioSettings.userMedia || this._deps.webphone.reconnecting || this._deps.webphone.connectError || this._deps.webphone.inactive);
    }

    // TODO: fix oAuth type
  }, {
    key: "proxyRetryCount",
    get: function get() {
      // @ts-expect-error TS(2339): Property 'proxyRetryCount' does not exist on type ... Remove this comment to see the full error message
      return this._deps.oAuth && this._deps.oAuth.proxyRetryCount > 0;
    }
  }, {
    key: "isVoIPOnlyModeActivated",
    get: function get() {
      return !!this._deps.availabilityMonitor && this._deps.availabilityMonitor.isVoIPOnlyMode;
    }
  }, {
    key: "isLimitedModeActivated",
    get: function get() {
      return !!this._deps.availabilityMonitor && this._deps.availabilityMonitor.isLimitedMode;
    }
  }, {
    key: "hasLimitedStatusError",
    get: function get() {
      return !!this._deps.availabilityMonitor && this._deps.availabilityMonitor.hasLimitedStatusError;
    }
  }, {
    key: "connectivityType",
    get: function get() {
      if (this._deps.connectivityMonitor.networkLoss) return _connectivityTypes.connectivityTypes.networkLoss;
      if (this.proxyRetryCount) return _connectivityTypes.connectivityTypes.offline;
      if (!this._deps.connectivityMonitor.connectivity) return _connectivityTypes.connectivityTypes.offline;
      if (this.isVoIPOnlyModeActivated) {
        if (this.webphoneAvailable) return _connectivityTypes.connectivityTypes.voipOnly;
        return _connectivityTypes.connectivityTypes.serverUnavailable;
      }
      if (this.webphoneUnavailable) return _connectivityTypes.connectivityTypes.webphoneUnavailable;
      if (this.isLimitedModeActivated) return _connectivityTypes.connectivityTypes.survival;
      return null;
    }
  }, {
    key: "mode",
    get: function get() {
      if (this.connectivityType === _connectivityTypes.connectivityTypes.networkLoss || this.connectivityType === _connectivityTypes.connectivityTypes.serverUnavailable) return _connectivityTypes.connectivityTypes.offline;
      return this.connectivityType;
    }
  }, {
    key: "isWebphoneUnavailableMode",
    get: function get() {
      return this.mode === _connectivityTypes.connectivityTypes.webphoneUnavailable;
    }
  }, {
    key: "isOfflineMode",
    get: function get() {
      return this.mode === _connectivityTypes.connectivityTypes.offline;
    }
  }, {
    key: "isVoipOnlyMode",
    get: function get() {
      return this.mode === _connectivityTypes.connectivityTypes.voipOnly;
    }
  }]);
}(_core.RcModuleV2), _applyDecoratedDescriptor(_class2.prototype, "checkStatus", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "checkStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showConnectivityAlert", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "showConnectivityAlert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "connectivityType", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "connectivityType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mode", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "mode"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=ConnectivityManager.js.map
