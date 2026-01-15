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
exports.EvIntegratedSoftphone = void 0;
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
var _di = require("@ringcentral-integration/commons/lib/di");
var _utils = require("@ringcentral-integration/commons/utils");
var _core = require("@ringcentral-integration/core");
var _utils2 = require("@ringcentral-integration/utils");
var _events = require("events");
var _enums = require("../../enums");
var _enums2 = require("../../lib/EvClient/enums");
var _IncomingModalText = require("./IncomingModalText");
var _audios = require("./audios");
var _i18n = _interopRequireDefault(require("./i18n"));
var _runInActivityWebRTCTab = require("./runInActivityWebRTCTab.decorator");
var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var SECOND = 1000;
var RECONNECT_DEBOUNCE_TIME = SECOND * 5;
var RECONNECT_DEBOUNCE_TIME_WHEN_CONNECTED = SECOND * 15;
var SIP_MAX_CONNECTING_TIME = SECOND * 30;
var ModalContentRendererID = 'EvIntegratedSoftphone.ModalContentRenderer';
var ModalContentRenderer = function ModalContentRenderer(_ref) {
  var isInbound = _ref.isInbound,
    inboundTextProps = _ref.inboundTextProps,
    outboundText = _ref.outboundText;
  return (0, _IncomingModalText.getModalText)({
    isInbound: isInbound,
    inboundTextProps: inboundTextProps,
    outboundText: outboundText
  });
};
var EvIntegratedSoftphone = exports.EvIntegratedSoftphone = (_dec = (0, _di.Module)({
  name: 'EvIntegratedSoftphone',
  deps: ['Locale', 'RouterInteraction', 'EvAgentSession', 'EvSubscription', 'Beforeunload', 'EvSettings', 'EvClient', 'Presence', 'Storage', 'EvAuth', 'Block', 'Auth', 'ModalUI', 'Alert', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'EvIntegratedSoftphoneOptions',
    optional: true
  }]
}), _dec2 = (0, _runInActivityWebRTCTab.runInActivityWebRTCTab)(), _dec3 = (0, _runInActivityWebRTCTab.runInActivityWebRTCTab)(), _dec(_class = (_class2 = /*#__PURE__*/function (_ref2) {
  function EvIntegratedSoftphone(deps) {
    var _this;
    _classCallCheck(this, EvIntegratedSoftphone);
    _this = _callSuper(this, EvIntegratedSoftphone, [{
      deps: deps,
      enableCache: true,
      storageKey: 'EvIntegratedSoftphone'
    }]);
    _this.autoAnswerCheckFn = void 0;
    _this._isFirefox = void 0;
    _this._audio = void 0;
    _this._eventEmitter = new _events.EventEmitter();
    _this._answerModalId = null;
    /** audio permission alert id */
    _this._audioPermissionAlertId = null;
    // private _checkWebRTCIntervalId: NodeJS.Timeout;
    // private _heartBeatIntervalTime: number;
    _this._beforeunloadHandler = function () {
      return _this.isWebRTCTab;
    };
    _this._isCloseWhenCallConnected = false;
    _this._failedBlockId = void 0;
    // @state
    // dtmfString: string = '';
    _initializerDefineProperty(_this, "audioPermission", _descriptor, _this);
    _initializerDefineProperty(_this, "muteActive", _descriptor2, _this);
    _initializerDefineProperty(_this, "sipRegisterSuccess", _descriptor3, _this);
    _initializerDefineProperty(_this, "sipRegistering", _descriptor4, _this);
    /** connecting webRTC alert id, for dialer call button disabled check */
    _initializerDefineProperty(_this, "connectingAlertId", _descriptor5, _this);
    _this._deps.evAuth.beforeAgentLogout(function () {
      _this._resetAllState();
    });
    _this._deps.beforeunload.onAfterUnload(function () {
      _this._sendTabManager(_enums.tabManagerEvents.CLOSE_WHEN_CALL_CONNECTED);
    });
    _this._deps.modalUI.registerRenderer(ModalContentRendererID, ModalContentRenderer);
    _this._isFirefox = navigator.userAgent.indexOf('Firefox') !== -1;
    return _this;
  }
  _inherits(EvIntegratedSoftphone, _ref2);
  return _createClass(EvIntegratedSoftphone, [{
    key: "tabManagerEnabled",
    get: function get() {
      var _this$_deps$tabManage;
      return (_this$_deps$tabManage = this._deps.tabManager) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage.enable;
    }
  }, {
    key: "isWebRTCTab",
    get: function get() {
      return this._deps.tabManager.isMainTab && this.sipRegisterSuccess;
    }
  }, {
    key: "isIntegratedSoftphoneWithTabEnable",
    get: function get() {
      return this._deps.tabManager.enable && this._deps.evAgentSession.isIntegratedSoftphone;
    }
  }, {
    key: "setConnectingAlertId",
    value:
    // this is for dialPad click when on call
    // @action
    // sipSendDTMF(dtmf: string) {
    // this.dtmfString += dtmf;
    // this._deps.evClient.sipSendDTMF(dtmf);
    // }

    function setConnectingAlertId(id) {
      this.connectingAlertId = id;
    }
  }, {
    key: "setAudioPermission",
    value: function setAudioPermission(permission) {
      this.audioPermission = permission;
    }
  }, {
    key: "resetController",
    value: function resetController() {
      // this.dtmfString = '';
      this.muteActive = false;
    }
  }, {
    key: "setMuteActive",
    value: function setMuteActive(state) {
      this.muteActive = state;
    }
  }, {
    key: "resetSip",
    value: function resetSip() {
      this.audioPermission = false;
      this.sipRegistering = false;
      this.sipRegisterSuccess = false;
    }
  }, {
    key: "setSipRegisterSuccess",
    value: function setSipRegisterSuccess(state) {
      this.sipRegisterSuccess = state;
    }
  }, {
    key: "setSipRegistering",
    value: function setSipRegistering(state) {
      this.sipRegistering = state;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      this._initAudio();
      this._bindingIntegratedSoftphone();
      this._deps.tabManager.onSetMainTabComplete(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              console.log('onSetMainTabComplete~~', _this2._deps.evAgentSession.isIntegratedSoftphone);
              if (!_this2._deps.evAgentSession.isIntegratedSoftphone) {
                _context.n = 1;
                break;
              }
              _context.n = 1;
              return _this2.connectWebRTC();
            case 1:
              return _context.a(2);
          }
        }, _callee);
      })));
      this._deps.evAgentSession.onConfigSuccess(function () {
        if (_this2._deps.tabManager.hasMultipleTabs && !_this2._deps.tabManager.isMainTab && _this2._deps.evAgentSession.isIntegratedSoftphone && _this2._deps.evAgentSession.isConfigTabAlive()) {
          console.log('setSipRegisterSuccess in onConfigSuccess~~');
          _this2.setSipRegisterSuccess(true);
        }
      });
      this._deps.evAgentSession.onReConfigFail(function () {
        if (_this2._deps.evAgentSession.isIntegratedSoftphone) {
          _this2._emitRegistrationFailed();
        }
      });
    }
  }, {
    key: "onReset",
    value: function onReset() {
      try {
        console.log('onReset in EvIntegratedSoftphone~');
        this._resetAllState();
      } catch (error) {
        // ignore error
      }
    }
  }, {
    key: "_resetAllState",
    value: function _resetAllState() {
      this._closeWebRTCConnectingMask();
      this.resetSip();
      this._deps.evClient.sipTerminate();
      this._eventEmitter.emit(_enums.EvSoftphoneEvents.RESET);
    }
  }, {
    key: "_emitRegistrationFailed",
    value: function _emitRegistrationFailed() {
      this._deps.evSubscription.emit(_enums2.EvCallbackTypes.SIP_REGISTRATION_FAILED, null);
    }
  }, {
    key: "onStateChange",
    value: function () {
      var _onStateChange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (this.ready && this._deps.tabManager.enable && this._deps.tabManager.ready) {
                this._checkTabManagerEvent();
              }
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function onStateChange() {
        return _onStateChange.apply(this, arguments);
      }
      return onStateChange;
    }()
  }, {
    key: "_checkTabManagerEvent",
    value: function () {
      var _checkTabManagerEvent2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var event, data, _t;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              event = this._deps.tabManager.event;
              if (!event) {
                _context3.n = 20;
                break;
              }
              data = event.args[0];
              _t = event.name;
              _context3.n = _t === _enums.tabManagerEvents.ASK_AUDIO_PERMISSION ? 1 : _t === _enums.tabManagerEvents.SIP_CONNECTING ? 2 : _t === _enums.tabManagerEvents.SIP_RINGING ? 3 : _t === _enums.tabManagerEvents.SIP_RINGING_MODAL ? 4 : _t === _enums.tabManagerEvents.MUTE_STATE_CHANGE ? 8 : _t === _enums.tabManagerEvents.SIP_REGISTERED ? 9 : _t === _enums.tabManagerEvents.SIP_UNREGISTERED ? 10 : _t === _enums.tabManagerEvents.SIP_REGISTRATION_FAILED_RELOAD ? 11 : _t === _enums.tabManagerEvents.SIP_REGISTRATION_FAILED ? 12 : _t === _enums.tabManagerEvents.SIP_CONNECTED ? 14 : _t === _enums.tabManagerEvents.SIP_ENDED ? 15 : _t === _enums.tabManagerEvents.MUTE ? 16 : _t === _enums.tabManagerEvents.CLOSE_WHEN_CALL_CONNECTED ? 17 : _t === _enums.tabManagerEvents.NOTIFY_ACTIVE_TAB_CALL_ACTIVE ? 18 : 19;
              break;
            case 1:
              if (data) {
                this._showAskAudioPermissionMask();
              } else {
                this._closeAskAudioPermissionMask();
              }
              return _context3.a(3, 20);
            case 2:
              this._showWebRTCConnectingMask();
              return _context3.a(3, 20);
            case 3:
              this._showRingingModal(data);
              return _context3.a(3, 20);
            case 4:
              // that event call from modal ok or cancel, that auto close modal
              this._deps.modalUI.close(this._answerModalId);
              if (!data) {
                _context3.n = 6;
                break;
              }
              _context3.n = 5;
              return this.answerCall();
            case 5:
              _context3.n = 7;
              break;
            case 6:
              this.rejectCall();
            case 7:
              return _context3.a(3, 20);
            case 8:
              this.setMuteActive(data);
              return _context3.a(3, 20);
            case 9:
              console.log('_sipRegistered in other tabs~');
              this._sipRegistered();
              return _context3.a(3, 20);
            case 10:
              this.setSipRegisterSuccess(false);
              return _context3.a(3, 20);
            case 11:
              this._reloadApp();
              return _context3.a(3, 20);
            case 12:
              this._handleRegistrationFailed();
              _context3.n = 13;
              return this._deps.evAgentSession.onceLogoutThenLogin();
            case 13:
              this._closeFailReconnectedBlock();
              return _context3.a(3, 20);
            case 14:
              this._sipConnected();
              return _context3.a(3, 20);
            case 15:
              this._sipEnded();
              // When sip end need reset Dialout Status to idle
              this._deps.presence.setDialoutStatus(_enums.dialoutStatuses.idle);
              return _context3.a(3, 20);
            case 16:
              this.sipToggleMute(data);
              return _context3.a(3, 20);
            case 17:
              this._isCloseWhenCallConnected = true;
              return _context3.a(3, 20);
            case 18:
              if (this._deps.tabManager.active) {
                this._deps.alert.warning({
                  message: _enums.tabManagerEvents.NOTIFY_ACTIVE_TAB_CALL_ACTIVE,
                  backdrop: true,
                  ttl: 0
                });
              }
              return _context3.a(3, 20);
            case 19:
              return _context3.a(3, 20);
            case 20:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function _checkTabManagerEvent() {
        return _checkTabManagerEvent2.apply(this, arguments);
      }
      return _checkTabManagerEvent;
    }()
  }, {
    key: "_closeFailReconnectedBlock",
    value: function _closeFailReconnectedBlock() {
      this._deps.block.unblock(this._failedBlockId);
      this._failedBlockId = null;
    }
  }, {
    key: "sipToggleMute",
    value: function sipToggleMute(state) {
      this._deps.evClient.sipToggleMute(state);
    }
  }, {
    key: "onRinging",
    value: function onRinging(callback) {
      this._eventEmitter.on(_enums2.EvCallbackTypes.SIP_RINGING, callback);
    }
  }, {
    key: "askAudioPermission",
    value: function () {
      var _askAudioPermission = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var showMask,
          _args4 = arguments,
          _t2;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              showMask = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : true;
              console.log('askAudioPermission~~', showMask);
              _context4.p = 1;
              if (!showMask) {
                _context4.n = 2;
                break;
              }
              if (!this.audioPermission) {
                this._sendTabManager(_enums.tabManagerEvents.ASK_AUDIO_PERMISSION, true);
                this._showAskAudioPermissionMask();
              }
              console.log('connect WEB_RTC');
              _context4.n = 2;
              return navigator.mediaDevices.getUserMedia({
                audio: true
              });
            case 2:
              _context4.n = 4;
              break;
            case 3:
              _context4.p = 3;
              _t2 = _context4.v;
              this._deps.alert.danger({
                message: _enums.EvSoftphoneEvents.AUDIO_STREAM_REJECTED,
                backdrop: true,
                ttl: 0
              });
              console.log(_t2);
              throw new Error('Need Audio permission');
            case 4:
              _context4.p = 4;
              if (showMask) {
                if (this._audioPermissionAlertId) {
                  this._sendTabManager(_enums.tabManagerEvents.ASK_AUDIO_PERMISSION, false);
                  this._closeAskAudioPermissionMask();
                }
              }
              return _context4.f(4);
            case 5:
              this.setAudioPermission(true);
              if (this.sipRegisterSuccess) {
                _context4.n = 6;
                break;
              }
              _context4.n = 6;
              return this._registerSoftphone();
            case 6:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 3, 4, 5]]);
      }));
      function askAudioPermission() {
        return _askAudioPermission.apply(this, arguments);
      }
      return askAudioPermission;
    }()
  }, {
    key: "connectWebRTC",
    value: function () {
      var _connectWebRTC = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              console.log('connectWebRTC~');
              this.resetSip();
              _context5.n = 1;
              return this.askAudioPermission();
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function connectWebRTC() {
        return _connectWebRTC.apply(this, arguments);
      }
      return connectWebRTC;
    }()
  }, {
    key: "_bindingIntegratedSoftphone",
    value: function _bindingIntegratedSoftphone() {
      var _this3 = this;
      console.log('_bindingIntegratedSoftphone~~');
      this._deps.evSubscription.subscribe(_enums2.EvCallbackTypes.SIP_REGISTERED, function () {
        // That will call several times when reconnected.
        console.log('!!!!!!!SIP_REGISTERED');
        if (!_this3.sipRegisterSuccess) {
          _this3._sendTabManager(_enums.tabManagerEvents.SIP_REGISTERED);
          _this3._sipRegistered();
        }
      });
      this._deps.evSubscription.subscribe(_enums2.EvCallbackTypes.SIP_UNREGISTERED, function () {
        console.log('!!!!!!!SIP_UNREGISTERED');
        if (_this3.sipRegisterSuccess) {
          _this3._sendTabManager(_enums.tabManagerEvents.SIP_UNREGISTERED);
          _this3.setSipRegisterSuccess(false);
        }
      });
      this._deps.evSubscription.subscribe(_enums2.EvCallbackTypes.SIP_REGISTRATION_FAILED, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              console.log('!!!!!!!SIP_REGISTRATION_FAILED');
              _this3.setSipRegistering(false);
              _this3._sendTabManager(_enums.tabManagerEvents.SIP_REGISTRATION_FAILED);
              _this3._handleRegistrationFailed();

              // await this._deps.evAgentSession.reLoginAgent();
              // this._closeFailReconnectedBlock();
            case 1:
              return _context6.a(2);
          }
        }, _callee6);
      })));
      this._deps.evSubscription.subscribe(_enums2.EvCallbackTypes.SIP_RINGING, function (ringingCall) {
        var _this3$_deps$evClient, _this3$_deps$evClient2, _this3$_deps$evClient3;
        _this3.bindBeforeunload();
        console.log('!!!!!!!SIP_RINGING');
        _this3._eventEmitter.emit(_enums2.EvCallbackTypes.SIP_RINGING, ringingCall);
        if (_this3.autoAnswerCheckFn()) {
          return _this3._sipAnswer();
        }
        var displayName = ringingCall.data.request.from.displayName;
        var queueName = (_this3$_deps$evClient = _this3._deps.evClient.currentCall) === null || _this3$_deps$evClient === void 0 ? void 0 : (_this3$_deps$evClient2 = _this3$_deps$evClient.queue) === null || _this3$_deps$evClient2 === void 0 ? void 0 : _this3$_deps$evClient2.name;
        var _this3$_deps$presence = _this3._deps.presence,
          dialoutStatus = _this3$_deps$presence.dialoutStatus,
          isOffhooking = _this3$_deps$presence.isOffhooking,
          isManualOffhook = _this3$_deps$presence.isManualOffhook;
        // exclude outbound and offhook
        var isInbound = dialoutStatus !== 'dialing' && !(isManualOffhook && isOffhooking) && ((_this3$_deps$evClient3 = _this3._deps.evClient.currentCall) === null || _this3$_deps$evClient3 === void 0 ? void 0 : _this3$_deps$evClient3.callType) === 'INBOUND';
        _this3._sendTabManager(_enums.tabManagerEvents.SIP_RINGING, {
          displayName: displayName,
          queueName: queueName,
          isInbound: isInbound
        });
        _this3._showRingingModal({
          displayName: displayName,
          queueName: queueName,
          isInbound: isInbound
        });
      });
      this._deps.evSubscription.subscribe(_enums2.EvCallbackTypes.SIP_CONNECTED, function () {
        console.info('!!!!!!!SIP_CONNECTED');
        _this3._sendTabManager(_enums.tabManagerEvents.SIP_CONNECTED);
        _this3._sipConnected();
      });
      this._deps.evSubscription.subscribe(_enums2.EvCallbackTypes.SIP_ENDED, function () {
        console.info('!!!!!!!SIP_ENDED');
        _this3.removeBeforeunload();
        _this3._sendTabManager(_enums.tabManagerEvents.SIP_ENDED);
        _this3._sipEnded();
      });
      this._deps.evSubscription.subscribe(_enums2.EvCallbackTypes.SIP_MUTE, function () {
        console.info('!!!!!!!SIP_MUTE');
        _this3._sendTabManager(_enums.tabManagerEvents.MUTE_STATE_CHANGE, true);
        _this3.setMuteActive(true);
      });
      this._deps.evSubscription.subscribe(_enums2.EvCallbackTypes.SIP_UNMUTE, function () {
        console.info('!!!!!!!SIP_UNMUTE');
        _this3._sendTabManager(_enums.tabManagerEvents.MUTE_STATE_CHANGE, false);
        _this3.setMuteActive(false);
      });

      // TODO: that is update session config related feature
      // triggered by agentSDK if dial destination is changed on softphone registration
      // pass in autoStartOH, maintainOH and dial destination, needed for reconnect logic
      // this._deps.evSubscription.subscribe(
      // EvCallbackTypes.SIP_DIAL_DEST_CHANGED,
      // (data) => {
      // console.info('!!!!!!!SIP_DIAL_DEST_CHANGED');
      // // AgentSvc.setDialDest(data.dialDest),
      // // SessionSvc.attemptingSoftphoneReconnect &&
      // // (data.autoStartOH
      // // ? AgentSvc.offhookInit().then(
      // // function(result) {
      // // data.maintainOH && (AgentSvc.systemInitOffhook = !1);
      // // },
      // // function(err) {
      // // SessionSvc.showOffhookError(err.detail, data.maintainOH);
      // // },
      // // )
      // // : ($timeout(function() {
      // // 'RNA-STATE' === AgentSvc.currentAgentState.baseState &&
      // // AgentSvc.setAgentState('AVAILABLE');
      // // }, 1e3),
      // // (SessionSvc.attemptingSoftphoneReconnect = !1),
      // // (SessionSvc.manualSoftphoneReconnect = !1)));
      // },
      // );
    }
  }, {
    key: "_sipEnded",
    value: function _sipEnded() {
      this._closeRingingModal();
      this._deps.presence.setOffhook(false);
    }
  }, {
    key: "_sipRegistered",
    value: function _sipRegistered() {
      console.log('_sipRegistered~');
      this.setSipRegisterSuccess(true);
      this._eventEmitter.emit(_enums.EvSoftphoneEvents.REGISTERED);
      this._isCloseWhenCallConnected = false;
      this._closeWebRTCConnectingMask();
    }
  }, {
    key: "_handleRegistrationFailed",
    value: function _handleRegistrationFailed() {
      var _this4 = this;
      this._failedBlockId = this._deps.block.block();
      this._deps.evClient.sipTerminate();
      this._resetAllState();
      this._closeWebRTCConnectingMask();
      // this._deps.alert.danger({
      //   message: EvCallbackTypes.SIP_REGISTRATION_FAILED,
      //   backdrop: true,
      //   ttl: 0,
      //   allowDuplicates: false,
      // });

      this._deps.modalUI.alert({
        title: 'Registration failed',
        content: 'Will reload your pages and tabs for you',
        confirmButtonText: 'Ok',
        childrenSize: 'small',
        onConfirm: function onConfirm() {
          _this4._sendTabManager(_enums.tabManagerEvents.SIP_REGISTRATION_FAILED_RELOAD);
          _this4._reloadApp();
        }
      });
      this._deps.tabManager.setMainTabId(null);
      // this._deps.routerInteraction.push('/sessionConfig');
    }
  }, {
    key: "_reloadApp",
    value: function _reloadApp() {
      window.location.reload();
    }
  }, {
    key: "_sipConnected",
    value: function _sipConnected() {
      this._deps.presence.setOffhook(true);
      // When connected reset all controller state
      this.resetController();
    }
  }, {
    key: "_showWebRTCConnectingMask",
    value: function () {
      var _showWebRTCConnectingMask2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var _t3;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              this._closeWebRTCConnectingMask();
              _t3 = this;
              _context7.n = 1;
              return this._deps.alert.info({
                message: this._isCloseWhenCallConnected ? _enums.tabManagerEvents.SIP_RECONNECTING_WHEN_CALL_CONNECTED : _enums.tabManagerEvents.SIP_CONNECTING,
                loading: true
              });
            case 1:
              _t3.setConnectingAlertId.call(_t3, _context7.v);
            case 2:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function _showWebRTCConnectingMask() {
        return _showWebRTCConnectingMask2.apply(this, arguments);
      }
      return _showWebRTCConnectingMask;
    }()
  }, {
    key: "_closeWebRTCConnectingMask",
    value: function _closeWebRTCConnectingMask() {
      console.log('_closeWebRTCConnectingMask~~', this.connectingAlertId);
      if (this.connectingAlertId) {
        this._deps.alert.dismiss(this.connectingAlertId);
        this.setConnectingAlertId(null);
      }
    }
  }, {
    key: "_showAskAudioPermissionMask",
    value: function () {
      var _showAskAudioPermissionMask2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              this._closeAskAudioPermissionMask();
              _context8.n = 1;
              return this._deps.alert.info({
                message: _enums.tabManagerEvents.ASK_AUDIO_PERMISSION,
                loading: true,
                backdrop: true
              });
            case 1:
              this._audioPermissionAlertId = _context8.v;
            case 2:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function _showAskAudioPermissionMask() {
        return _showAskAudioPermissionMask2.apply(this, arguments);
      }
      return _showAskAudioPermissionMask;
    }()
  }, {
    key: "_closeAskAudioPermissionMask",
    value: function _closeAskAudioPermissionMask() {
      if (this._audioPermissionAlertId) {
        this._deps.alert.dismiss(this._audioPermissionAlertId);
        this._audioPermissionAlertId = null;
      }
    }
  }, {
    key: "_showRingingModal",
    value: function _showRingingModal(_ref5) {
      var _this5 = this;
      var displayName = _ref5.displayName,
        queueName = _ref5.queueName,
        isInbound = _ref5.isInbound;
      // prevent open a lot of modal, that sdk event pass a lot of ringing state when re login
      if (this._answerModalId) {
        return;
      }
      this._playAudioLoop('ringtone');
      var currentLocale = this._deps.locale.currentLocale;
      this._answerModalId = this._deps.modalUI.confirm({
        title: _i18n["default"].getString('inviteModalTitle', currentLocale),
        content: ModalContentRendererID,
        contentProps: {
          isInbound: isInbound,
          inboundTextProps: queueName && {
            incomingText: (0, _utils2.format)(_i18n["default"].getString('incomingText', currentLocale), {
              displayName: displayName
            }),
            queueNameText: (0, _utils2.format)(_i18n["default"].getString('queueNameText', currentLocale), {
              queueName: queueName
            })
          },
          outboundText: (0, _utils2.format)(_i18n["default"].getString('outboundText', currentLocale), {
            displayName: displayName
          })
        },
        confirmButtonText: _i18n["default"].getString('inviteModalAnswer', currentLocale),
        cancelButtonText: _i18n["default"].getString('inviteModalReject', currentLocale),
        onConfirm: function () {
          var _onConfirm = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
            return _regenerator().w(function (_context9) {
              while (1) switch (_context9.n) {
                case 0:
                  _this5._sendTabManager(_enums.tabManagerEvents.SIP_RINGING_MODAL, true);
                  _context9.n = 1;
                  return _this5.answerCall();
                case 1:
                  return _context9.a(2);
              }
            }, _callee9);
          }));
          function onConfirm() {
            return _onConfirm.apply(this, arguments);
          }
          return onConfirm;
        }(),
        onCancel: function onCancel() {
          _this5._sendTabManager(_enums.tabManagerEvents.SIP_RINGING_MODAL, false);
          _this5.rejectCall();
        },
        childrenSize: 'small'
      });
    }
  }, {
    key: "answerCall",
    value: function () {
      var _answerCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              this._resetRingingModal();
              if (!(!this.tabManagerEnabled || this.tabManagerEnabled && this._deps.tabManager.isMainTab)) {
                _context0.n = 1;
                break;
              }
              _context0.n = 1;
              return this._sipAnswer();
            case 1:
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function answerCall() {
        return _answerCall.apply(this, arguments);
      }
      return answerCall;
    }()
  }, {
    key: "rejectCall",
    value: function rejectCall() {
      this._resetRingingModal();
      // when reject not show init fail
      this._deps.presence.showOffHookInitError = false;
      this._deps.evClient.sipReject();
      this._eventEmitter.emit(_enums.EvSoftphoneEvents.CALL_REJECTED);
      this.removeBeforeunload();
    }
  }, {
    key: "onceRegistered",
    value: function () {
      var _onceRegistered = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
        var _this6 = this;
        var _resolve, resolveTrue, resolveFalse, success, _t4;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              resolveTrue = function resolveTrue() {
                return _resolve(true);
              };
              resolveFalse = function resolveFalse() {
                return _resolve(false);
              };
              _context1.p = 1;
              _context1.n = 2;
              return (0, _utils.waitUntilTo)(function () {
                return new Promise(function (resolve) {
                  _resolve = resolve;
                  _this6._eventEmitter.once(_enums.EvSoftphoneEvents.REGISTERED, resolveTrue);
                  // when reset sip also need reject that
                  _this6._eventEmitter.once(_enums.EvSoftphoneEvents.RESET, resolveFalse);
                });
              }, {
                timeout: SIP_MAX_CONNECTING_TIME
              });
            case 2:
              success = _context1.v;
              if (!success) {
                this._emitRegistrationFailed();
              }
              _context1.n = 4;
              break;
            case 3:
              _context1.p = 3;
              _t4 = _context1.v;
              this._emitRegistrationFailed();
            case 4:
              this._eventEmitter.off(_enums.EvSoftphoneEvents.REGISTERED, resolveTrue);
              this._eventEmitter.off(_enums.EvSoftphoneEvents.RESET, resolveFalse);
            case 5:
              return _context1.a(2);
          }
        }, _callee1, this, [[1, 3]]);
      }));
      function onceRegistered() {
        return _onceRegistered.apply(this, arguments);
      }
      return onceRegistered;
    }()
  }, {
    key: "_closeRingingModal",
    value: function _closeRingingModal() {
      // if there is modal there, mean another cancel this call
      if (this._answerModalId) {
        this._deps.alert.info({
          message: _enums.EvSoftphoneEvents.CALL_REJECTED,
          ttl: 0
        });
        this._deps.modalUI.close(this._answerModalId);
        this._answerModalId = null;
        this._stopAudio();
      }
    }
  }, {
    key: "_registerSoftphone",
    value: function () {
      var _registerSoftphone2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              if (this.sipRegistering) {
                _context10.n = 5;
                break;
              }
              this.setSipRegistering(true);
              this._sendTabManager(_enums.tabManagerEvents.SIP_CONNECTING);
              this._showWebRTCConnectingMask();
              console.log('isReconnected, isForceLogin, _isCloseWhenCallConnected~', this._deps.evAgentSession.isReconnected, this._deps.evAgentSession.isForceLogin, this._isCloseWhenCallConnected);

              // When that is force login is also need delay to reconnect server
              if (!(this._deps.evAgentSession.isReconnected || this._deps.evAgentSession.isForceLogin)) {
                _context10.n = 3;
                break;
              }
              _context10.n = 1;
              return (0, _utils.sleep)(this._isCloseWhenCallConnected ? RECONNECT_DEBOUNCE_TIME_WHEN_CONNECTED : RECONNECT_DEBOUNCE_TIME);
            case 1:
              _context10.n = 2;
              return this._connectedWebRTC();
            case 2:
              _context10.n = 4;
              break;
            case 3:
              _context10.n = 4;
              return this._connectedWebRTC();
            case 4:
              return _context10.a(2);
            case 5:
              throw new Error('Sip is registering');
            case 6:
              return _context10.a(2);
          }
        }, _callee10, this);
      }));
      function _registerSoftphone() {
        return _registerSoftphone2.apply(this, arguments);
      }
      return _registerSoftphone;
    }()
  }, {
    key: "_connectedWebRTC",
    value: function () {
      var _connectedWebRTC2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
        var _t5;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              _context11.p = 0;
              this._deps.evClient.sipInit();
              this._deps.evClient.sipRegister();
              _context11.n = 1;
              return this.onceRegistered();
            case 1:
              this.setSipRegistering(false);
              this._closeWebRTCConnectingMask();
              _context11.n = 3;
              break;
            case 2:
              _context11.p = 2;
              _t5 = _context11.v;
              console.error(_t5);
            case 3:
              return _context11.a(2);
          }
        }, _callee11, this, [[0, 2]]);
      }));
      function _connectedWebRTC() {
        return _connectedWebRTC2.apply(this, arguments);
      }
      return _connectedWebRTC;
    }()
  }, {
    key: "_resetRingingModal",
    value: function _resetRingingModal() {
      this._stopAudio();
      this._answerModalId = null;
    }
  }, {
    key: "_sipAnswer",
    value: function () {
      var _sipAnswer2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
        var _t7;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              if (!this._isFirefox) {
                _context13.n = 4;
                break;
              }
              _context13.p = 1;
              _context13.n = 2;
              return (0, _utils.waitUntilTo)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
                var _t6;
                return _regenerator().w(function (_context12) {
                  while (1) switch (_context12.p = _context12.n) {
                    case 0:
                      _context12.p = 0;
                      _context12.n = 1;
                      return navigator.mediaDevices.getUserMedia({
                        audio: true
                      });
                    case 1:
                      _context12.n = 3;
                      break;
                    case 2:
                      _context12.p = 2;
                      _t6 = _context12.v;
                    case 3:
                      return _context12.a(2);
                  }
                }, _callee12, null, [[0, 2]]);
              })), {
                timeout: 2000
              });
            case 2:
              _context13.n = 4;
              break;
            case 3:
              _context13.p = 3;
              _t7 = _context13.v;
              this._sendTabManager(_enums.tabManagerEvents.NOTIFY_ACTIVE_TAB_CALL_ACTIVE);
              // eslint-disable-next-line no-alert
              window.confirm(_i18n["default"].getString('activeCallTip', this._deps.locale.currentLocale));
            case 4:
              this._deps.evClient.sipAnswer();
            case 5:
              return _context13.a(2);
          }
        }, _callee13, this, [[1, 3]]);
      }));
      function _sipAnswer() {
        return _sipAnswer2.apply(this, arguments);
      }
      return _sipAnswer;
    }()
  }, {
    key: "_initAudio",
    value: function _initAudio() {
      if (typeof document !== 'undefined' && document.createElement) {
        this._audio = document.createElement('audio');
      }
    }
  }, {
    key: "_playAudioLoop",
    value: function _playAudioLoop(type) {
      this._audio.loop = true;
      this._playAudio(type);
    }
  }, {
    key: "_playAudio",
    value: function _playAudio(type) {
      this._audio.currentTime = 0;
      this._audio.src = _audios.audios[type];
      this._audio.play();
    }
  }, {
    key: "_stopAudio",
    value: function _stopAudio() {
      this._audio.loop = false;
      this._audio.pause();
    }
  }, {
    key: "_sendTabManager",
    value: function _sendTabManager(event, value) {
      var _this$_deps$tabManage2;
      (_this$_deps$tabManage2 = this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.send(event, value);
    }
  }, {
    key: "bindBeforeunload",
    value: function bindBeforeunload() {
      this._deps.beforeunload.add(this._beforeunloadHandler);
    }
  }, {
    key: "removeBeforeunload",
    value: function removeBeforeunload() {
      this._deps.beforeunload.remove(this._beforeunloadHandler);
    }
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "audioPermission", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "muteActive", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "sipRegisterSuccess", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "sipRegistering", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "connectingAlertId", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setConnectingAlertId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setConnectingAlertId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAudioPermission", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAudioPermission"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetController", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetController"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setMuteActive", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setMuteActive"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetSip", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetSip"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSipRegisterSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setSipRegisterSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSipRegistering", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setSipRegistering"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_playAudio", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "_playAudio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_stopAudio", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "_stopAudio"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=EvIntegratedSoftphone.js.map
