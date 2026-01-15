"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebphoneBase = exports.DEFAULT_AUDIO = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.entries.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.timers.js");
var _core = require("@ringcentral-integration/core");
var _utils = require("@ringcentral-integration/utils");
var _events = require("events");
var _ringcentralWebPhone = _interopRequireDefault(require("ringcentral-web-phone"));
var _trackEvents = require("../../enums/trackEvents");
var _SipInstanceManager = require("../../lib/SipInstanceManager");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _AudioHelper = require("./AudioHelper");
var _incoming = _interopRequireDefault(require("./audio/incoming.mp3"));
var _outgoing = _interopRequireDefault(require("./audio/outgoing.mp3"));
var _connectionStatus = require("./connectionStatus");
var _events2 = require("./events");
var _webphoneErrors = require("./webphoneErrors");
var _webphoneHelper = require("./webphoneHelper");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
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
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var DEFAULT_AUDIO = exports.DEFAULT_AUDIO = 'default';
var AUTO_RETRIES_DELAY = [0, 5 * 1000, 10 * 1000, 30 * 1000, 2 * 60 * 1000, 5 * 60 * 1000, 15 * 60 * 1000, 30 * 60 * 1000];
var RECOVER_DEBOUNCE_THRESHOLD = 1000;
var INACTIVE_SLEEP_DELAY = 1000;
var registerErrors = [_webphoneErrors.webphoneErrors.sipProvisionError, _webphoneErrors.webphoneErrors.webphoneCountOverLimit, _webphoneErrors.webphoneErrors.webphoneForbidden, _webphoneErrors.webphoneErrors.requestTimeout, _webphoneErrors.webphoneErrors.internalServerError, _webphoneErrors.webphoneErrors.serverTimeout, _webphoneErrors.webphoneErrors.unknownError, _webphoneErrors.webphoneErrors.connectFailed, _webphoneErrors.webphoneErrors.provisionUpdate, _webphoneErrors.webphoneErrors.serverConnecting];

/**
 * @constructor
 * @description Web phone module to handle phone interaction with WebRTC.
 */
var WebphoneBase = exports.WebphoneBase = (_dec = (0, _di.Module)({
  name: 'Webphone',
  deps: ['Auth', 'Alert', 'Client', 'NumberValidate', 'AppFeatures', 'ExtensionFeatures', 'Brand', 'RegionSettings', 'AudioSettings', 'Storage', {
    dep: 'AvailabilityMonitor',
    optional: true
  }, {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'Prefix',
    optional: true
  }, {
    dep: 'WebphoneOptions',
    optional: true
  }]
}), _dec2 = (0, _core.track)(_trackEvents.trackEvents.webRTCRegistration), _dec3 = (0, _core.computed)(function (that) {
  return [that.ready, that._deps.audioSettings.ringtoneVolume];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that.ready, that._deps.audioSettings.supportDevices, that._deps.audioSettings.ringtoneDeviceId];
}), _dec5 = (0, _core.computed)(function (that) {
  return [that.ready, that._deps.audioSettings.supportDevices, that._deps.audioSettings.outputDeviceId];
}), _dec6 = (0, _core.computed)(function (that) {
  var _that$_deps$tabManage, _that$_deps$tabManage2;
  return [that.ready, (_that$_deps$tabManage = that._deps.tabManager) === null || _that$_deps$tabManage === void 0 ? void 0 : _that$_deps$tabManage.ready, (_that$_deps$tabManage2 = that._deps.tabManager) === null || _that$_deps$tabManage2 === void 0 ? void 0 : _that$_deps$tabManage2.active];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function WebphoneBase(deps) {
    var _deps$webphoneOptions, _deps$webphoneOptions2;
    var _this;
    _classCallCheck(this, WebphoneBase);
    _this = _callSuper(this, WebphoneBase, [{
      deps: deps,
      enableCache: true,
      storageKey: 'Webphone'
    }]);
    _this._reconnectDelays = AUTO_RETRIES_DELAY;
    _this._disconnectOnInactive = void 0;
    _this._activeWebphoneKey = void 0;
    _this._webphoneInstanceKey = void 0;
    _this._webphone = null;
    _this._sipInstanceManager = void 0;
    _this._remoteVideo = null;
    _this._localVideo = null;
    _this._sipInstanceId = void 0;
    _this._connectTimeout = null;
    _this._isFirstRegister = true;
    _this._reconnectAfterSessionEnd = null;
    _this._disconnectInactiveAfterSessionEnd = false;
    _this._eventEmitter = new _events.EventEmitter();
    _this._stopWebphoneUserAgentPromise = null;
    _this._removedWebphoneAtBeforeUnload = false;
    _initializerDefineProperty(_this, "connectionStatus", _descriptor, _this);
    _initializerDefineProperty(_this, "connectRetryCounts", _descriptor2, _this);
    _initializerDefineProperty(_this, "errorCode", _descriptor3, _this);
    _initializerDefineProperty(_this, "statusCode", _descriptor4, _this);
    _initializerDefineProperty(_this, "device", _descriptor5, _this);
    _initializerDefineProperty(_this, "data", _descriptor6, _this);
    _this._disconnectOnInactive = (_deps$webphoneOptions = (_deps$webphoneOptions2 = deps.webphoneOptions) === null || _deps$webphoneOptions2 === void 0 ? void 0 : _deps$webphoneOptions2.disconnectOnInactive) !== null && _deps$webphoneOptions !== void 0 ? _deps$webphoneOptions : false;
    _this._activeWebphoneKey = "".concat(deps.prefix, "-active-webphone-key");
    _this._sipInstanceManager = new _SipInstanceManager.SipInstanceManager("".concat(deps.prefix, "-webphone-inactive-sip-instance"));
    return _this;
  }
  _inherits(WebphoneBase, _RcModuleV);
  return _createClass(WebphoneBase, [{
    key: "_setConnectionStatus",
    value: function _setConnectionStatus(status) {
      this.connectionStatus = status;
    }
  }, {
    key: "_setStateOnConnectError",
    value: function _setStateOnConnectError(errorCode, statusCode) {
      this.connectionStatus = _connectionStatus.connectionStatus.connectError;
      this.device = null;
      if (errorCode) {
        this.errorCode = errorCode;
      }
      if (statusCode) {
        this.statusCode = statusCode;
      }
    }
  }, {
    key: "_setStateOnConnectFailed",
    value: function _setStateOnConnectFailed(errorCode, statusCode) {
      this.connectionStatus = _connectionStatus.connectionStatus.connectFailed;
      this.device = null;
      if (errorCode) {
        this.errorCode = errorCode;
      }
      if (statusCode) {
        this.statusCode = statusCode;
      }
    }
  }, {
    key: "_setStateOnConnect",
    value: function _setStateOnConnect() {
      this.connectionStatus = _connectionStatus.connectionStatus.connecting;
      this.device = null;
      this.connectRetryCounts += 1;
    }
  }, {
    key: "_setStateOnReconnect",
    value: function _setStateOnReconnect() {
      this.connectionStatus = _connectionStatus.connectionStatus.reconnecting;
      this.device = null;
      this.connectRetryCounts += 1;
    }
  }, {
    key: "_setStateOnRegistered",
    value: function _setStateOnRegistered(device) {
      this.connectionStatus = _connectionStatus.connectionStatus.connected;
      this.device = device;
      this.errorCode = null;
      this.statusCode = null;
      this.connectRetryCounts = 0;
    }
  }, {
    key: "_setStateOnUnregistered",
    value: function _setStateOnUnregistered() {
      this.connectionStatus = _connectionStatus.connectionStatus.disconnected;
      this.device = null;
      this.connectRetryCounts = 0;
    }
  }, {
    key: "_setStateWhenUnregisteredOnInactive",
    value: function _setStateWhenUnregisteredOnInactive() {
      this.connectionStatus = _connectionStatus.connectionStatus.inactive;
      this.device = null;
      this.connectRetryCounts = 0;
    }
  }, {
    key: "_setStoreOnDisconnect",
    value: function _setStoreOnDisconnect() {
      this.connectionStatus = _connectionStatus.connectionStatus.disconnecting;
      this.device = null;
    }
  }, {
    key: "_setDevice",
    value: function _setDevice(device) {
      this.device = device;
    }
  }, {
    key: "_setRetryCounts",
    value: function _setRetryCounts(retryCounts) {
      this.connectRetryCounts = retryCounts;
    }
  }, {
    key: "incomingAudioFile",
    get: function get() {
      return this.data.incomingAudioFile;
    }
  }, {
    key: "incomingAudioDataUrl",
    get: function get() {
      return this.data.incomingAudioDataUrl;
    }
  }, {
    key: "outgoingAudioFile",
    get: function get() {
      return this.data.outgoingAudioFile;
    }
  }, {
    key: "outgoingAudioDataUrl",
    get: function get() {
      return this.data.outgoingAudioDataUrl;
    }
  }, {
    key: "_setRingtoneIntoStorage",
    value: function _setRingtoneIntoStorage(incomingAudioFile, incomingAudioDataUrl, outgoingAudioFile, outgoingAudioDataUrl) {
      this.data.incomingAudioFile = incomingAudioFile;
      this.data.incomingAudioDataUrl = incomingAudioDataUrl;
      this.data.outgoingAudioFile = outgoingAudioFile;
      this.data.outgoingAudioDataUrl = outgoingAudioDataUrl;
    }
  }, {
    key: "_setIncomingAudioIntoStorage",
    value: function _setIncomingAudioIntoStorage(fileName, dataUrl) {
      this.data.incomingAudioFile = fileName;
      this.data.incomingAudioDataUrl = dataUrl;
    }
  }, {
    key: "_resetIncomingAudio",
    value: function _resetIncomingAudio() {
      this.data.incomingAudioFile = DEFAULT_AUDIO;
      this.data.incomingAudioDataUrl = null;
    }
  }, {
    key: "_setOutgoingAudioIntoStorage",
    value: function _setOutgoingAudioIntoStorage(fileName, dataUrl) {
      this.data.outgoingAudioFile = fileName;
      this.data.outgoingAudioDataUrl = dataUrl;
    }
  }, {
    key: "_resetOutgoingAudio",
    value: function _resetOutgoingAudio() {
      this.data.outgoingAudioFile = DEFAULT_AUDIO;
      this.data.outgoingAudioDataUrl = null;
    }
  }, {
    key: "_prepareVideoElement",
    value: function _prepareVideoElement() {
      this._remoteVideo = document.createElement('video');
      this._remoteVideo.id = 'remoteVideo';
      this._remoteVideo.setAttribute('hidden', 'hidden');
      this._localVideo = document.createElement('video');
      this._localVideo.id = 'localVideo';
      this._localVideo.setAttribute('hidden', 'hidden');
      this._localVideo.setAttribute('muted', 'muted');
      this._localVideo.muted = true;
      document.body.appendChild(this._remoteVideo);
      document.body.appendChild(this._localVideo);
      this._remoteVideo.volume = this._deps.audioSettings.callVolume;
      if (this._deps.audioSettings.supportDevices) {
        if (this._remoteVideo.setSinkId && this._deps.audioSettings.outputDeviceId) {
          this._remoteVideo.setSinkId(this._deps.audioSettings.outputDeviceId);
        }
      }
    }
  }, {
    key: "_destroyVideoElement",
    value: function _destroyVideoElement() {
      if (this._remoteVideo) {
        this._remoteVideo.remove();
        this._remoteVideo = null;
      }
      if (this._localVideo) {
        this._localVideo.remove();
        this._localVideo = null;
      }
    }
  }, {
    key: "_initModule",
    value: function () {
      var _initModule2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this2 = this;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (typeof window !== 'undefined' && typeof document !== 'undefined') {
                if (document.readyState === 'loading') {
                  window.addEventListener('load', function () {
                    _this2._prepareVideoElement();
                  });
                } else {
                  this._prepareVideoElement();
                }
                window.addEventListener('beforeunload', function () {
                  if (!_this2._webphone) {
                    return;
                  }
                  if (Object.keys(_this2.originalSessions).length > 0) {
                    return;
                  }
                  _this2._removedWebphoneAtBeforeUnload = true;
                  // disconnect webphone at beforeunload if there are not active sessions
                  _this2._disconnect();
                  // set timeout to reconnect web phone is before unload cancel
                  setTimeout(function () {
                    _this2._removedWebphoneAtBeforeUnload = false;
                    _this2.connect({
                      force: true,
                      skipConnectDelay: true,
                      skipDLCheck: true
                    });
                  }, 4000);
                });
                window.addEventListener('pagehide', function () {
                  // mark current instance id as inactive, so app can reuse it after refresh
                  if (_this2._sipInstanceId) {
                    _this2._sipInstanceManager.setInstanceInactive(_this2._sipInstanceId, _this2._deps.auth.endpointId);
                    _this2._sipInstanceId = null;
                  }
                  // disconnect if web phone is not disconnected at beforeunload
                  if (!_this2._removedWebphoneAtBeforeUnload) {
                    _this2._disconnect();
                  }
                  _this2._removeCurrentInstanceFromActiveWebphone();
                  _this2._destroyVideoElement();
                });
              }
              this._createOtherWebphoneInstanceListener();
              _context.n = 1;
              return _superPropGet(WebphoneBase, "_initModule", this, 3)([]);
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function _initModule() {
        return _initModule2.apply(this, arguments);
      }
      return _initModule;
    }()
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this3 = this;
      this._deps.auth.addBeforeLogoutHandler(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _this3._sipInstanceId = null;
              _context2.n = 1;
              return _this3._disconnect();
            case 1:
              return _context2.a(2);
          }
        }, _callee2);
      })));
      (0, _core.watch)(this, function () {
        return _this3.shouldUpdateRingtoneVolume;
      }, function () {
        if (_this3.ready && _this3._webphone && _this3._webphone.userAgent) {
          _this3._webphone.userAgent.audioHelper.setVolume(_this3._deps.audioSettings.ringtoneVolume);
        }
      });
      (0, _core.watch)(this, function () {
        return _this3._deps.audioSettings.callVolume;
      }, function () {
        if (_this3.ready && _this3._remoteVideo) {
          _this3._remoteVideo.volume = _this3._deps.audioSettings.callVolume;
        }
      });
      (0, _core.watch)(this, function () {
        return _this3.shouldSetSinkId;
      }, function () {
        if (_this3.ready && _this3._deps.audioSettings.supportDevices && _this3._remoteVideo && _this3._remoteVideo.setSinkId) {
          _this3._remoteVideo.setSinkId(_this3._deps.audioSettings.outputDeviceId);
        }
      });
      (0, _core.watch)(this, function () {
        return _this3.shouldSetRingtoneSinkId;
      }, function () {
        if (_this3.ready && _this3._deps.audioSettings.supportDevices && _this3._webphone && _this3._webphone.userAgent && _this3._webphone.userAgent.audioHelper &&
        // @ts-expect-error
        _this3._webphone.userAgent.audioHelper.setDeviceId) {
          // @ts-expect-error
          _this3._webphone.userAgent.audioHelper.setDeviceId(_this3._deps.audioSettings.ringtoneDeviceId);
        }
      });
      (0, _core.watch)(this, function () {
        return _this3.shouldTriggerOnTabActive;
      }, function () {
        var _this3$_deps$tabManag, _this3$_deps$tabManag2;
        if (_this3.ready && ((_this3$_deps$tabManag = _this3._deps.tabManager) === null || _this3$_deps$tabManag === void 0 ? void 0 : _this3$_deps$tabManag.ready) && ((_this3$_deps$tabManag2 = _this3._deps.tabManager) === null || _this3$_deps$tabManag2 === void 0 ? void 0 : _this3$_deps$tabManag2.active)) {
          _this3._onTabActive();
        }
      });
    }
  }, {
    key: "shouldUpdateRingtoneVolume",
    get: function get() {
      return [this.ready, this._deps.audioSettings.ringtoneVolume];
    }
  }, {
    key: "shouldSetRingtoneSinkId",
    get: function get() {
      return [this.ready, this._deps.audioSettings.supportDevices, this._deps.audioSettings.ringtoneDeviceId];
    }
  }, {
    key: "shouldSetSinkId",
    get: function get() {
      return [this.ready, this._deps.audioSettings.supportDevices, this._deps.audioSettings.outputDeviceId];
    }
  }, {
    key: "shouldTriggerOnTabActive",
    get: function get() {
      var _this$_deps$tabManage, _this$_deps$tabManage2;
      return [this.ready, (_this$_deps$tabManage = this._deps.tabManager) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage.ready, (_this$_deps$tabManage2 = this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.active];
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._deps.auth.loggedIn && this._deps.appFeatures.ready && this._deps.extensionFeatures.ready && this._deps.numberValidate.ready && this._deps.audioSettings.ready && this._deps.storage.ready && (!this._deps.tabManager || this._deps.tabManager.ready) && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (!this._deps.auth.loggedIn || !this._deps.appFeatures.ready || !this._deps.extensionFeatures.ready || !this._deps.numberValidate.ready || !!this._deps.tabManager && !this._deps.tabManager.ready || !this._deps.audioSettings.ready) && this.ready;
    }
  }, {
    key: "_sipProvision",
    value: function () {
      var _sipProvision2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var response;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return this._deps.client.service.platform().post('/restapi/v1.0/client-info/sip-provision', {
                sipInfo: [{
                  transport: 'WSS'
                }]
              });
            case 1:
              response = _context3.v;
              return _context3.a(2, response.json());
          }
        }, _callee3, this);
      }));
      function _sipProvision() {
        return _sipProvision2.apply(this, arguments);
      }
      return _sipProvision;
    }()
  }, {
    key: "_fetchDL",
    value: function () {
      var _fetchDL2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var response, devices, phoneLines;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return this._deps.client.account().extension().device().list();
            case 1:
              response = _context4.v;
              devices = response.records;
              phoneLines = [];
              devices === null || devices === void 0 ? void 0 : devices.forEach(function (device) {
                if (!device.phoneLines || device.phoneLines.length === 0) {
                  return;
                }
                phoneLines = phoneLines.concat(device.phoneLines);
              });
              return _context4.a(2, phoneLines);
          }
        }, _callee4, this);
      }));
      function _fetchDL() {
        return _fetchDL2.apply(this, arguments);
      }
      return _fetchDL;
    }()
  }, {
    key: "_removeWebphone",
    value: function () {
      var _removeWebphone2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var _t;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              if (!(!this._webphone || !this._webphone.userAgent)) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2);
            case 1:
              this._stopWebphoneUserAgentPromise = this._waitUnregistered(this._webphone.userAgent);
              this._webphone.userAgent.stop();
              _context5.p = 2;
              _context5.n = 3;
              return this._stopWebphoneUserAgentPromise;
            case 3:
              _context5.n = 5;
              break;
            case 4:
              _context5.p = 4;
              _t = _context5.v;
              console.error(_t);
            case 5:
              this._stopWebphoneUserAgentPromise = null;
              try {
                this._webphone.userAgent.removeAllListeners();
                this._webphone.userAgent.transport.removeAllListeners();
                if (this._webphone.userAgent.transport.isConnected()) {
                  this._webphone.userAgent.transport.disconnect();
                }
                if (this._webphone.userAgent.transport.reconnectTimer) {
                  clearTimeout(this._webphone.userAgent.transport.reconnectTimer);
                  this._webphone.userAgent.transport.reconnectTimer = undefined;
                }
                if (this._webphone.userAgent.transport.__clearSwitchBackTimer) {
                  this._webphone.userAgent.transport.__clearSwitchBackTimer();
                }
                this.stopAudio();
              } catch (e) {
                console.error(e);
                // ignore clean listener error
              }
              this._webphone = null;
            case 6:
              return _context5.a(2);
          }
        }, _callee5, this, [[2, 4]]);
      }));
      function _removeWebphone() {
        return _removeWebphone2.apply(this, arguments);
      }
      return _removeWebphone;
    }()
  }, {
    key: "_waitUnregistered",
    value: function _waitUnregistered(userAgent) {
      return new Promise(function (resolve, reject) {
        var timeout = setTimeout(function () {
          reject(new Error('unregistered timeout'));
        }, 2000);
        userAgent.once('unregistered', function () {
          if (timeout) {
            clearTimeout(timeout);
          }
          resolve();
        });
      });
    }
  }, {
    key: "_createWebphone",
    value: function () {
      var _createWebphone2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(provisionData) {
        var _this$_deps$webphoneO,
          _this$_deps$webphoneO2,
          _this4 = this;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              _context6.n = 1;
              return this._removeWebphone();
            case 1:
              if (!this._sipInstanceId) {
                this._sipInstanceId = this._sipInstanceManager.getInstanceId(this._deps.auth.endpointId);
              }
              this._webphone = new _ringcentralWebPhone["default"](provisionData, _objectSpread({
                appKey: this._deps.webphoneOptions.appKey,
                appName: (0, _core.removeNonISO8859Chars)(this._deps.webphoneOptions.appName),
                appVersion: this._deps.webphoneOptions.appVersion,
                uuid: this._deps.auth.endpointId,
                logLevel: (_this$_deps$webphoneO = this._deps.webphoneOptions.webphoneLogLevel) !== null && _this$_deps$webphoneO !== void 0 ? _this$_deps$webphoneO : 1,
                // error 0, warn 1, log: 2, debug: 3
                audioHelper: {
                  enabled: true // enables audio feedback when web phone is ringing or making a call
                },
                media: {
                  remote: this._remoteVideo,
                  local: this._localVideo
                },
                enableQos: (0, _webphoneHelper.isChrome)(),
                enableMidLinesInSDP: (0, _webphoneHelper.isEnableMidLinesInSDP)(),
                instanceId: this._sipInstanceId,
                // reuse sip instance id to avoid 603 issue at reconnection
                autoStop: false
              }, (_this$_deps$webphoneO2 = this._deps.webphoneOptions.webphoneSDKOptions) !== null && _this$_deps$webphoneO2 !== void 0 ? _this$_deps$webphoneO2 : {}));
              // @ts-expect-error TS(2322): Type 'WebphoneAudioHelper' is not assignable to ty... Remove this comment to see the full error message
              this._webphone.userAgent.audioHelper = new _AudioHelper.WebphoneAudioHelper({
                enabled: true
              });
              this.loadAudio();
              this._webphone.userAgent.audioHelper.setVolume(this._deps.audioSettings.ringtoneVolume);
              // Webphone userAgent registered event
              this._webphone.userAgent.on('registered', function () {
                if (!_this4.connected) {
                  _this4._onWebphoneRegistered(provisionData);
                }
              });
              this._webphone.userAgent.on('unregistered', function (e) {
                console.log('web phone unregistered event', e);
                _this4._onWebphoneUnregistered();
              });
              this._webphone.userAgent.on('registrationFailed', function (response, cause) {
                console.error('Webphone Register Error:', response, cause);
                // For 401
                if (!response && cause === 'Connection Error') {
                  return;
                }
                var message = response && response.data || response;
                if (message && typeof message === 'string' && _this4._webphone.userAgent.transport.isSipErrorCode(message)) {
                  // error is handled in webphone sdk;
                  return;
                }
                // don't handled in connection is disconnecting
                if (_this4.disconnected || _this4.disconnecting) {
                  return;
                }
                var errorCode;
                // limit logic:
                /*
                 * Specialties of this flow are next:
                 *   6th WebRTC in another browser receives 6th ‘EndpointID’ and 1st ‘InstanceID’,
                 *   which has been given previously to the 1st ‘EndpointID’.
                 *   It successfully registers on WSX by moving 1st ‘EndpointID’ to a blocklist state.
                 *   When 1st WebRTC client re-registers on expiration timeout,
                 *   WSX defines that 1st ‘EndpointID’ is blocklisted and responds with ‘SIP/2.0 403 Forbidden,
                 *   instance id is intercepted by another registration’ and remove it from block list.
                 *   So if 1st WebRTC will send re-register again with the same ‘InstanceID’,
                 *   it will be accepted and 6th ‘EndpointID’ will be blocklisted.
                 *   (But the WebRTC client must logout on receiving SIP/2.0 403 Forbidden error and in case of login -
                 *   provision again via Platform API and receive new InstanceID)
                 */
                var statusCode = response ? response.statusCode || response.status_code : null;
                switch (statusCode) {
                  // Webphone account over limit
                  case 403:
                  case 603:
                    {
                      errorCode = _webphoneErrors.webphoneErrors.webphoneCountOverLimit;
                      break;
                    }
                  // Internal server error
                  case 500:
                    {
                      errorCode = _webphoneErrors.webphoneErrors.internalServerError;
                      break;
                    }
                  // Timeout
                  case 504:
                    {
                      errorCode = _webphoneErrors.webphoneErrors.serverTimeout;
                      break;
                    }
                  default:
                    {
                      errorCode = _webphoneErrors.webphoneErrors.unknownError;
                      break;
                    }
                }
                _this4._onConnectError({
                  errorCode: errorCode,
                  statusCode: statusCode
                });
              });
              this._webphone.userAgent.on('invite', function (session) {
                console.log('UA invite');
                _this4._onInvite(session);
              });
              // this._webphone.userAgent.on('inviteSent', (session) => {
              //   console.log('UA invite');
              //   this._addSession(session as WebphoneSession);
              // });
              // sip provision expired
              // TODO: should check that type issue in ringcentral-web-phone
              // @ts-expect-error TS(2769): No overload matches this call.
              this._webphone.userAgent.on('provisionUpdate', function () {
                if (Object.keys(_this4.originalSessions).length === 0) {
                  _this4._deps.alert.warning({
                    message: _webphoneErrors.webphoneErrors.provisionUpdate,
                    allowDuplicates: false
                  });
                  _this4.connect({
                    force: true,
                    skipDLCheck: true,
                    skipConnectDelay: true
                  });
                  return;
                }
                _this4._reconnectAfterSessionEnd = {
                  reason: _webphoneErrors.webphoneErrors.provisionUpdate
                };
              });
              // websocket transport connecting event
              this._webphone.userAgent.transport.on('connecting', function () {
                // reconnecting event
                console.log('web phone connecting event');
                if (_this4.connected || _this4.connectError) {
                  _this4._deps.alert.warning({
                    message: _webphoneErrors.webphoneErrors.serverConnecting,
                    allowDuplicates: false
                  });
                  _this4._setStateOnReconnect();
                }
                _this4.stopAudio();
              });
              // Server connection closed event after 10 time retry with primary server and backup server
              this._webphone.userAgent.transport.on('closed', function () {
                console.log('web phone closed event');
                _this4._setRetryCounts(20);
                _this4._onConnectError({
                  errorCode: _webphoneErrors.webphoneErrors.connectFailed,
                  ttl: 0
                });
                _this4.stopAudio();
              });
              this._webphone.userAgent.transport.on('transportError', function () {
                console.log('WebSocket transportError occurred');
                _this4.stopAudio();
              });
              this._webphone.userAgent.transport.on('wsConnectionError', function () {
                _this4._setConnectionStatus(_connectionStatus.connectionStatus.connectError);
                _this4.stopAudio();
              });
              // Timeout to switch back to primary server
              this._webphone.userAgent.transport.on('switchBackProxy', function () {
                if (Object.keys(_this4.originalSessions).length === 0) {
                  _this4.connect({
                    skipConnectDelay: true,
                    force: true,
                    skipDLCheck: true
                  });
                  return;
                }
                _this4._reconnectAfterSessionEnd = {
                  reason: null
                };
              });
            case 2:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function _createWebphone(_x) {
        return _createWebphone2.apply(this, arguments);
      }
      return _createWebphone;
    }() // eslint-disable-next-line
  }, {
    key: "_onInvite",
    value: function _onInvite(session) {
      // override
    }
  }, {
    key: "_connect",
    value: function () {
      var _connect2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var sipProvision, _t2;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              if (this._deps.auth.loggedIn) {
                _context7.n = 1;
                break;
              }
              return _context7.a(2);
            case 1:
              _context7.p = 1;
              _context7.n = 2;
              return this._sipProvision();
            case 2:
              sipProvision = _context7.v;
              _context7.n = 5;
              break;
            case 3:
              _context7.p = 3;
              _t2 = _context7.v;
              // TODO: should use instanceof to check that error type before use that
              console.error(_t2, this.connectRetryCounts);
              if (!(_t2 && _t2.message && _t2.message.indexOf('Feature [WebPhone] is not available') > -1)) {
                _context7.n = 4;
                break;
              }
              this._deps.extensionFeatures.fetchData();
              return _context7.a(2);
            case 4:
              this._onConnectError({
                errorCode: _webphoneErrors.webphoneErrors.sipProvisionError,
                statusCode: null,
                ttl: 0
              });
              return _context7.a(2);
            case 5:
              _context7.n = 6;
              return this._createWebphone(sipProvision);
            case 6:
              return _context7.a(2);
          }
        }, _callee7, this, [[1, 3]]);
      }));
      function _connect() {
        return _connect2.apply(this, arguments);
      }
      return _connect;
    }()
  }, {
    key: "_waitStillTabActive",
    value: function () {
      var _waitStillTabActive2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              if (!(!this._deps.tabManager || this._deps.tabManager.active)) {
                _context8.n = 1;
                break;
              }
              return _context8.a(2);
            case 1:
              _context8.n = 2;
              return (0, _utils.sleep)(INACTIVE_SLEEP_DELAY);
            case 2:
              _context8.n = 3;
              return this._waitStillTabActive();
            case 3:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function _waitStillTabActive() {
        return _waitStillTabActive2.apply(this, arguments);
      }
      return _waitStillTabActive;
    }()
  }, {
    key: "_isAvailableToConnect",
    value: function _isAvailableToConnect(_ref2) {
      var force = _ref2.force;
      if (!this.enabled || !this._deps.auth.loggedIn) {
        return false;
      }
      // do not connect if it is connecting
      // do not reconnect when user disconnected
      if (this.connecting || this.disconnecting || this.inactiveDisconnecting || this.reconnecting) {
        return false;
      }
      // do not connect when connected unless force
      if (!force && this.connected) {
        return false;
      }
      return true;
    }

    /**
     * connect a web phone.
     */
  }, {
    key: "connect",
    value: (function () {
      var _connect3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        var _this$_deps$webphoneO3,
          _this5 = this;
        var _ref3,
          _ref3$force,
          force,
          _ref3$skipTimeout,
          skipTimeout,
          _ref3$skipConnectDela,
          skipConnectDelay,
          _ref3$skipDLCheck,
          skipDLCheck,
          _ref3$skipTabActiveCh,
          skipTabActiveCheck,
          connectDelay,
          phoneLines,
          _args9 = arguments,
          _t3;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              _ref3 = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : {}, _ref3$force = _ref3.force, force = _ref3$force === void 0 ? false : _ref3$force, _ref3$skipTimeout = _ref3.skipTimeout, skipTimeout = _ref3$skipTimeout === void 0 ? true : _ref3$skipTimeout, _ref3$skipConnectDela = _ref3.skipConnectDelay, skipConnectDelay = _ref3$skipConnectDela === void 0 ? false : _ref3$skipConnectDela, _ref3$skipDLCheck = _ref3.skipDLCheck, skipDLCheck = _ref3$skipDLCheck === void 0 ? false : _ref3$skipDLCheck, _ref3$skipTabActiveCh = _ref3.skipTabActiveCheck, skipTabActiveCheck = _ref3$skipTabActiveCh === void 0 ? false : _ref3$skipTabActiveCh;
              if ((0, _webphoneHelper.isBrowserSupport)()) {
                _context9.n = 1;
                break;
              }
              this._setStateOnConnectError(_webphoneErrors.webphoneErrors.browserNotSupported, null);
              this._deps.alert.warning({
                message: _webphoneErrors.webphoneErrors.browserNotSupported,
                ttl: 0
              });
              return _context9.a(2);
            case 1:
              if (this._isAvailableToConnect({
                force: force
              })) {
                _context9.n = 2;
                break;
              }
              return _context9.a(2);
            case 2:
              if (skipTabActiveCheck) {
                _context9.n = 3;
                break;
              }
              _context9.n = 3;
              return this._waitStillTabActive();
            case 3:
              if (this._isAvailableToConnect({
                force: force
              })) {
                _context9.n = 4;
                break;
              }
              return _context9.a(2);
            case 4:
              // when last connect is connect error, use reconnect (will show connecting badge)
              if (this.connectError || force) {
                this._setStateOnReconnect();
              } else {
                this._setStateOnConnect();
              }
              connectDelay = (_this$_deps$webphoneO3 = this._deps.webphoneOptions.connectDelay) !== null && _this$_deps$webphoneO3 !== void 0 ? _this$_deps$webphoneO3 : 0;
              if (!(!skipConnectDelay && connectDelay > 0)) {
                _context9.n = 5;
                break;
              }
              _context9.n = 5;
              return (0, _utils.sleep)(connectDelay);
            case 5:
              if (skipDLCheck) {
                _context9.n = 10;
                break;
              }
              _context9.p = 6;
              if (this._deps.auth.loggedIn) {
                _context9.n = 7;
                break;
              }
              return _context9.a(2);
            case 7:
              _context9.n = 8;
              return this._fetchDL();
            case 8:
              phoneLines = _context9.v;
              if (phoneLines.length === 0) {
                this._deps.alert.warning({
                  message: _webphoneErrors.webphoneErrors.noOutboundCallWithoutDL
                });
              }
              _context9.n = 10;
              break;
            case 9:
              _context9.p = 9;
              _t3 = _context9.v;
              console.error('fetch DL failed', _t3);
              this._deps.alert.warning({
                message: _webphoneErrors.webphoneErrors.checkDLError,
                allowDuplicates: false
              });
            case 10:
              if (!(this.disconnected || this.disconnecting || !this._deps.auth.loggedIn)) {
                _context9.n = 11;
                break;
              }
              return _context9.a(2);
            case 11:
              if (this._connectTimeout) {
                clearTimeout(this._connectTimeout);
              }
              if (!(force || skipTimeout)) {
                _context9.n = 13;
                break;
              }
              _context9.n = 12;
              return this._connect();
            case 12:
              return _context9.a(2);
            case 13:
              this._connectTimeout = setTimeout(function () {
                _this5._connectTimeout = null;
                _this5._connect();
              }, this._getConnectTimeoutTtl());
            case 14:
              return _context9.a(2);
          }
        }, _callee9, this, [[6, 9]]);
      }));
      function connect() {
        return _connect3.apply(this, arguments);
      }
      return connect;
    }())
  }, {
    key: "_getConnectTimeoutTtl",
    value: function _getConnectTimeoutTtl() {
      return this._reconnectDelays[Math.min(this.connectRetryCounts, this._reconnectDelays.length - 1)];
    }
  }, {
    key: "_onConnectError",
    value: function () {
      var _onConnectError2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(_ref4) {
        var errorCode, statusCode, ttl;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              errorCode = _ref4.errorCode, statusCode = _ref4.statusCode, ttl = _ref4.ttl;
              if (statusCode === 403 && this._sipInstanceId) {
                // recreate sip instance id if server send 403
                this._sipInstanceId = null;
              }
              if (!(this.connectRetryCounts > 2 || this.reconnecting || this.connected || this.connectError)) {
                _context0.n = 3;
                break;
              }
              this._setStateOnConnectError(errorCode, statusCode);
              this._deps.alert.danger({
                message: errorCode,
                ttl: ttl,
                allowDuplicates: false,
                payload: {
                  statusCode: statusCode
                }
              });
              this._hideConnectingAlert();
              // Need to show unavailable badge and reconnect in background when third retry
              // sleep before next reconnect for slient reconnect in background
              _context0.n = 1;
              return (0, _utils.sleep)(this._getConnectTimeoutTtl());
            case 1:
              if (this.connectError) {
                _context0.n = 2;
                break;
              }
              return _context0.a(2);
            case 2:
              this.connect({
                skipConnectDelay: true,
                force: true,
                skipDLCheck: true
              });
              return _context0.a(2);
            case 3:
              this._setStateOnConnectFailed(errorCode, statusCode);
              if (this.connectRetryCounts === 1) {
                this._deps.alert.warning({
                  message: errorCode,
                  ttl: ttl,
                  allowDuplicates: false,
                  payload: {
                    statusCode: statusCode,
                    isConnecting: true
                  }
                });
                this._hideConnectFailedAlert();
              }
              this.connect({
                skipDLCheck: true,
                skipConnectDelay: true,
                skipTimeout: false
              });
            case 4:
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function _onConnectError(_x2) {
        return _onConnectError2.apply(this, arguments);
      }
      return _onConnectError;
    }()
  }, {
    key: "_onWebphoneRegistered",
    value: function _onWebphoneRegistered(provisionData) {
      this._setStateOnRegistered(provisionData.device);
      this._hideRegisterErrorAlert();
      this._setCurrentInstanceAsActiveWebphone();
      this._eventEmitter.emit(_events2.EVENTS.webphoneRegistered);
    }
  }, {
    key: "_onWebphoneUnregistered",
    value: function _onWebphoneUnregistered() {
      this._removeCurrentInstanceFromActiveWebphone();
      if (this.disconnecting || this.inactiveDisconnecting || this.disconnected || this.inactive || !!this._stopWebphoneUserAgentPromise) {
        // unregister by our app
        return;
      }
      // unavailable, unregistered by some errors
      this._setStateOnConnectError();
      this._eventEmitter.emit(_events2.EVENTS.webphoneUnregistered);
    }
  }, {
    key: "_setCurrentInstanceAsActiveWebphone",
    value: function _setCurrentInstanceAsActiveWebphone() {
      if (this._disconnectOnInactive && this._deps.tabManager) {
        localStorage.setItem(this._activeWebphoneKey, this._deps.tabManager.id);
      }
    }
  }, {
    key: "_removeCurrentInstanceFromActiveWebphone",
    value: function _removeCurrentInstanceFromActiveWebphone() {
      if (this._disconnectOnInactive && this._deps.tabManager) {
        var activeWebphoneInstance = localStorage.getItem(this._activeWebphoneKey);
        if (activeWebphoneInstance === this._deps.tabManager.id) {
          localStorage.removeItem(this._activeWebphoneKey);
        }
      }
    }
  }, {
    key: "_createOtherWebphoneInstanceListener",
    value: function _createOtherWebphoneInstanceListener() {
      var _this6 = this;
      if (!this._disconnectOnInactive || !this._deps.tabManager) {
        return;
      }
      window.addEventListener('storage', function (e) {
        _this6._onStorageChangeEvent(e);
      });
    }
  }, {
    key: "_onStorageChangeEvent",
    value: function _onStorageChangeEvent(e) {
      // disconnect to inactive when other tabs' web phone connected
      if (e.key === this._activeWebphoneKey) {
        var _this$_deps$tabManage3;
        if (!this.connected || !document.hidden) {
          return;
        }
        if (e.newValue === ((_this$_deps$tabManage3 = this._deps.tabManager) === null || _this$_deps$tabManage3 === void 0 ? void 0 : _this$_deps$tabManage3.id)) {
          return;
        }
        if (Object.keys(this.originalSessions).length === 0) {
          this._disconnectToInactive();
          return;
        }
        this._disconnectInactiveAfterSessionEnd = true;
      }
    }
  }, {
    key: "_disconnectToInactive",
    value: function () {
      var _disconnectToInactive2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              this._setConnectionStatus(_connectionStatus.connectionStatus.inactiveDisconnecting);
              this._setDevice(null);
              _context1.n = 1;
              return this._removeWebphone();
            case 1:
              this._setStateWhenUnregisteredOnInactive();
            case 2:
              return _context1.a(2);
          }
        }, _callee1, this);
      }));
      function _disconnectToInactive() {
        return _disconnectToInactive2.apply(this, arguments);
      }
      return _disconnectToInactive;
    }()
  }, {
    key: "_makeWebphoneInactiveOnSessionsEmpty",
    value: function _makeWebphoneInactiveOnSessionsEmpty() {
      if (this._disconnectInactiveAfterSessionEnd && Object.keys(this.originalSessions).length === 0) {
        this._disconnectInactiveAfterSessionEnd = false;
        if (!document.hidden) {
          var _this$_deps$tabManage4;
          // set to active
          if ((_this$_deps$tabManage4 = this._deps.tabManager) === null || _this$_deps$tabManage4 === void 0 ? void 0 : _this$_deps$tabManage4.active) {
            this._setCurrentInstanceAsActiveWebphone();
          }
          return;
        }
        this._disconnectToInactive();
      }
    }
  }, {
    key: "_onTabActive",
    value: function () {
      var _onTabActive2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              if (this._disconnectOnInactive) {
                _context10.n = 1;
                break;
              }
              return _context10.a(2);
            case 1:
              if (!this.connected) {
                _context10.n = 2;
                break;
              }
              this._setCurrentInstanceAsActiveWebphone();
              return _context10.a(2);
            case 2:
              _context10.n = 3;
              return (0, _utils.sleep)(RECOVER_DEBOUNCE_THRESHOLD);
            case 3:
              if (this._deps.tabManager.active) {
                _context10.n = 4;
                break;
              }
              return _context10.a(2);
            case 4:
              if (this.inactive) {
                this.connect({
                  skipDLCheck: true,
                  force: true,
                  skipTabActiveCheck: true
                });
              }
            case 5:
              return _context10.a(2);
          }
        }, _callee10, this);
      }));
      function _onTabActive() {
        return _onTabActive2.apply(this, arguments);
      }
      return _onTabActive;
    }()
  }, {
    key: "_hideConnectingAlert",
    value: function _hideConnectingAlert() {
      var alertIds = this._deps.alert.messages.filter(function (m) {
        for (var i = 0, len = registerErrors.length; i < len; i += 1) {
          if (m.message === registerErrors[i] && m.payload && m.payload.isConnecting === true) return true;
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
    key: "_hideConnectFailedAlert",
    value: function () {
      var _hideConnectFailedAlert2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
        var alertIds;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              alertIds = this._deps.alert.messages.filter(function (m) {
                for (var i = 0, len = registerErrors.length; i < len; i += 1) {
                  if (m.message === registerErrors[i] && !m.payload.isConnecting) return true;
                }
                return false;
              }).map(function (m) {
                return m.id;
              });
              if (alertIds.length) {
                this._deps.alert.dismiss(alertIds);
              }
            case 1:
              return _context11.a(2);
          }
        }, _callee11, this);
      }));
      function _hideConnectFailedAlert() {
        return _hideConnectFailedAlert2.apply(this, arguments);
      }
      return _hideConnectFailedAlert;
    }()
  }, {
    key: "_hideRegisterErrorAlert",
    value: function _hideRegisterErrorAlert() {
      var alertIds = this._deps.alert.messages.filter(function (m) {
        for (var i = 0, len = registerErrors.length; i < len; i += 1) {
          if (m.message === registerErrors[i]) return true;
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
    key: "_disconnect",
    value: function () {
      var _disconnect2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              if (!(this.disconnected || this.disconnecting)) {
                _context12.n = 1;
                break;
              }
              return _context12.a(2);
            case 1:
              if (this._connectTimeout) {
                clearTimeout(this._connectTimeout);
              }
              this._setStoreOnDisconnect();
              if (!this._webphone) {
                _context12.n = 2;
                break;
              }
              _context12.n = 2;
              return this._removeWebphone();
            case 2:
              this._setStateOnUnregistered();
            case 3:
              return _context12.a(2);
          }
        }, _callee12, this);
      }));
      function _disconnect() {
        return _disconnect2.apply(this, arguments);
      }
      return _disconnect;
    }()
  }, {
    key: "disconnect",
    value: function () {
      var _disconnect3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              this._sipInstanceId = null;
              _context13.n = 1;
              return this._disconnect();
            case 1:
              return _context13.a(2);
          }
        }, _callee13, this);
      }));
      function disconnect() {
        return _disconnect3.apply(this, arguments);
      }
      return disconnect;
    }()
    /**
     * Inform user what is happening with webphone,
     * this will be invoked when webphone itself run into error situation
     */
  }, {
    key: "showAlert",
    value: (function () {
      var _showAlert = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              if (this.errorCode) {
                _context14.n = 1;
                break;
              }
              return _context14.a(2);
            case 1:
              this._deps.alert.danger({
                message: this.errorCode,
                allowDuplicates: false,
                payload: {
                  statusCode: this.statusCode
                }
              });
            case 2:
              return _context14.a(2);
          }
        }, _callee14, this);
      }));
      function showAlert() {
        return _showAlert.apply(this, arguments);
      }
      return showAlert;
    }())
  }, {
    key: "loadAudio",
    value: function loadAudio() {
      if (this._webphone && this._webphone.userAgent && this._webphone.userAgent.audioHelper) {
        this._webphone.userAgent.audioHelper.loadAudio({
          incoming: this.incomingAudio,
          outgoing: this.outgoingAudio
        });
        // @ts-expect-error
        this._webphone.userAgent.audioHelper.setDeviceId(this._deps.audioSettings.ringtoneDeviceId);
      }
    }
  }, {
    key: "stopAudio",
    value: function stopAudio() {
      var _this$_webphone, _this$_webphone$userA;
      if ((_this$_webphone = this._webphone) === null || _this$_webphone === void 0 ? void 0 : (_this$_webphone$userA = _this$_webphone.userAgent) === null || _this$_webphone$userA === void 0 ? void 0 : _this$_webphone$userA.audioHelper) {
        this._webphone.userAgent.audioHelper.playOutgoing(false);
        this._webphone.userAgent.audioHelper.playIncoming(false);
      }
    }
  }, {
    key: "setOutgoingAudio",
    value: function () {
      var _setOutgoingAudio = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(_ref5) {
        var fileName, dataUrl;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              fileName = _ref5.fileName, dataUrl = _ref5.dataUrl;
              // TODO: validate filePath?
              this._setOutgoingAudioIntoStorage(fileName, dataUrl);
              this.loadAudio();
            case 1:
              return _context15.a(2);
          }
        }, _callee15, this);
      }));
      function setOutgoingAudio(_x3) {
        return _setOutgoingAudio.apply(this, arguments);
      }
      return setOutgoingAudio;
    }()
  }, {
    key: "resetOutgoingAudio",
    value: function () {
      var _resetOutgoingAudio2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.n) {
            case 0:
              this._resetOutgoingAudio();
              this.loadAudio();
            case 1:
              return _context16.a(2);
          }
        }, _callee16, this);
      }));
      function resetOutgoingAudio() {
        return _resetOutgoingAudio2.apply(this, arguments);
      }
      return resetOutgoingAudio;
    }()
  }, {
    key: "setIncomingAudio",
    value: function () {
      var _setIncomingAudio = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(_ref6) {
        var fileName, dataUrl;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.n) {
            case 0:
              fileName = _ref6.fileName, dataUrl = _ref6.dataUrl;
              // TODO: validate filePath?
              this._setIncomingAudioIntoStorage(fileName, dataUrl);
              this.loadAudio();
            case 1:
              return _context17.a(2);
          }
        }, _callee17, this);
      }));
      function setIncomingAudio(_x4) {
        return _setIncomingAudio.apply(this, arguments);
      }
      return setIncomingAudio;
    }()
  }, {
    key: "resetIncomingAudio",
    value: function () {
      var _resetIncomingAudio2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18() {
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.n) {
            case 0:
              this._resetIncomingAudio();
              this.loadAudio();
            case 1:
              return _context18.a(2);
          }
        }, _callee18, this);
      }));
      function resetIncomingAudio() {
        return _resetIncomingAudio2.apply(this, arguments);
      }
      return resetIncomingAudio;
    }()
  }, {
    key: "setRingtone",
    value: function () {
      var _setRingtone = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(_ref7) {
        var incomingAudio, incomingAudioFile, outgoingAudio, outgoingAudioFile, isIncomingDefault, isOutgoingDefault;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.n) {
            case 0:
              incomingAudio = _ref7.incomingAudio, incomingAudioFile = _ref7.incomingAudioFile, outgoingAudio = _ref7.outgoingAudio, outgoingAudioFile = _ref7.outgoingAudioFile;
              isIncomingDefault = incomingAudioFile === DEFAULT_AUDIO && incomingAudio === _incoming["default"];
              isOutgoingDefault = outgoingAudioFile === DEFAULT_AUDIO && outgoingAudio === _outgoing["default"];
              this._setRingtoneIntoStorage(isIncomingDefault ? DEFAULT_AUDIO : incomingAudioFile, isIncomingDefault ? null : incomingAudio, isOutgoingDefault ? DEFAULT_AUDIO : outgoingAudioFile, isOutgoingDefault ? null : outgoingAudio);
              this.loadAudio();
            case 1:
              return _context19.a(2);
          }
        }, _callee19, this);
      }));
      function setRingtone(_x5) {
        return _setRingtone.apply(this, arguments);
      }
      return setRingtone;
    }()
  }, {
    key: "originalSessions",
    get: function get() {
      var _this$_webphone$userA2, _this$_webphone2;
      return (_this$_webphone$userA2 = (_this$_webphone2 = this._webphone) === null || _this$_webphone2 === void 0 ? void 0 : _this$_webphone2.userAgent.sessions) !== null && _this$_webphone$userA2 !== void 0 ? _this$_webphone$userA2 : {};
    }

    // for backward compatibility v1
  }, {
    key: "_sessions",
    get: function get() {
      return new Map(Object.entries(this.originalSessions));
    }
  }, {
    key: "enabled",
    get: function get() {
      return this._deps.appFeatures.isWebPhoneEnabled;
    }
  }, {
    key: "disconnecting",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.disconnecting;
    }
  }, {
    key: "inactiveDisconnecting",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.inactiveDisconnecting;
    }
  }, {
    key: "inactive",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.inactive;
    }
  }, {
    key: "connecting",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.connecting;
    }
  }, {
    key: "reconnecting",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.reconnecting;
    }
  }, {
    key: "connected",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.connected;
    }
  }, {
    key: "disconnected",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.disconnected;
    }
  }, {
    key: "connectFailed",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.connectFailed;
    }
  }, {
    key: "connectError",
    get: function get() {
      return this.connectionStatus === _connectionStatus.connectionStatus.connectError;
    }

    /*
     * Together with `CallingSettings` module to check if webphone is
     * Unavailable.
     */
  }, {
    key: "isUnavailable",
    get: function get() {
      return this.ready && this._deps.auth.loggedIn && (!this._deps.audioSettings.userMedia || this.reconnecting || this.connectError || this.inactive);
    }
  }, {
    key: "incomingAudio",
    get: function get() {
      // support turn off ringtone
      if (this.incomingAudioDataUrl === '') {
        return '';
      }
      return this.incomingAudioDataUrl || this.defaultIncomingAudio;
    }
  }, {
    key: "outgoingAudio",
    get: function get() {
      return this.outgoingAudioDataUrl || this.defaultOutgoingAudio;
    }
  }, {
    key: "defaultIncomingAudio",
    get: function get() {
      return _incoming["default"];
    }
  }, {
    key: "defaultOutgoingAudio",
    get: function get() {
      return _outgoing["default"];
    }
  }, {
    key: "defaultIncomingAudioFile",
    get: function get() {
      return DEFAULT_AUDIO;
    }
  }, {
    key: "defaultOutgoingAudioFile",
    get: function get() {
      return DEFAULT_AUDIO;
    }
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "connectionStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _connectionStatus.connectionStatus.disconnected;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "connectRetryCounts", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "errorCode", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "statusCode", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "device", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setConnectionStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setConnectionStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnConnectError", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnConnectError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnConnectFailed", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnConnectFailed"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnConnect", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnConnect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnReconnect", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnReconnect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnRegistered", [_dec2, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnRegistered"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateOnUnregistered", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateOnUnregistered"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStateWhenUnregisteredOnInactive", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStateWhenUnregisteredOnInactive"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setStoreOnDisconnect", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setStoreOnDisconnect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setDevice", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setDevice"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setRetryCounts", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setRetryCounts"), _class2.prototype), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "data", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      incomingAudioFile: DEFAULT_AUDIO,
      incomingAudioDataUrl: null,
      outgoingAudioFile: DEFAULT_AUDIO,
      outgoingAudioDataUrl: null
    };
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setRingtoneIntoStorage", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setRingtoneIntoStorage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setIncomingAudioIntoStorage", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setIncomingAudioIntoStorage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_resetIncomingAudio", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_resetIncomingAudio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setOutgoingAudioIntoStorage", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setOutgoingAudioIntoStorage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_resetOutgoingAudio", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_resetOutgoingAudio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shouldUpdateRingtoneVolume", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "shouldUpdateRingtoneVolume"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shouldSetRingtoneSinkId", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "shouldSetRingtoneSinkId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shouldSetSinkId", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "shouldSetSinkId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shouldTriggerOnTabActive", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "shouldTriggerOnTabActive"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_sipProvision", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_sipProvision"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_connect", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_connect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "connect", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "connect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "disconnect", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "disconnect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showAlert", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "showAlert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setOutgoingAudio", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setOutgoingAudio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetOutgoingAudio", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "resetOutgoingAudio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setIncomingAudio", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setIncomingAudio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetIncomingAudio", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "resetIncomingAudio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setRingtone", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setRingtone"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=WebphoneBase.js.map
