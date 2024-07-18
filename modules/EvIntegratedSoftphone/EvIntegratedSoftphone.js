"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvIntegratedSoftphone = void 0;
require("regenerator-runtime/runtime");
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
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var EvIntegratedSoftphone = (_dec = (0, _di.Module)({
  name: 'EvIntegratedSoftphone',
  deps: ['Locale', 'RouterInteraction', 'EvAgentSession', 'EvSubscription', 'Beforeunload', 'EvSettings', 'EvClient', 'Presence', 'Storage', 'EvAuth', 'Block', 'Auth', 'ModalUI', 'Alert', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'EvIntegratedSoftphoneOptions',
    optional: true
  }]
}), _dec2 = (0, _runInActivityWebRTCTab.runInActivityWebRTCTab)(), _dec3 = (0, _runInActivityWebRTCTab.runInActivityWebRTCTab)(), _dec(_class = (_class2 = /*#__PURE__*/function (_ref2) {
  _inherits(EvIntegratedSoftphone, _ref2);
  var _super = _createSuper(EvIntegratedSoftphone);
  _createClass(EvIntegratedSoftphone, [{
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
  }]);
  function EvIntegratedSoftphone(deps) {
    var _this;
    _classCallCheck(this, EvIntegratedSoftphone);
    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'EvIntegratedSoftphone'
    });
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
    _initializerDefineProperty(_this, "audioPermission", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "muteActive", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "sipRegisterSuccess", _descriptor3, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "sipRegistering", _descriptor4, _assertThisInitialized(_this));
    /** connecting webRTC alert id, for dialer call button disabled check */
    _initializerDefineProperty(_this, "connectingAlertId", _descriptor5, _assertThisInitialized(_this));
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
  _createClass(EvIntegratedSoftphone, [{
    key: "setConnectingAlertId",
    // this is for dialPad click when on call
    // @action
    // sipSendDTMF(dtmf: string) {
    // this.dtmfString += dtmf;
    // this._deps.evClient.sipSendDTMF(dtmf);
    // }
    value: function setConnectingAlertId(id) {
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
      this._deps.tabManager.onSetMainTabComplete( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('onSetMainTabComplete~~', _this2._deps.evAgentSession.isIntegratedSoftphone);
                if (!_this2._deps.evAgentSession.isIntegratedSoftphone) {
                  _context.next = 4;
                  break;
                }
                _context.next = 4;
                return _this2.connectWebRTC();
              case 4:
              case "end":
                return _context.stop();
            }
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
      var _onStateChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.ready && this._deps.tabManager.enable && this._deps.tabManager.ready) {
                  this._checkTabManagerEvent();
                }
              case 1:
              case "end":
                return _context2.stop();
            }
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
      var _checkTabManagerEvent2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var event, data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                event = this._deps.tabManager.event;
                if (!event) {
                  _context3.next = 46;
                  break;
                }
                data = event.args[0];
                _context3.t0 = event.name;
                _context3.next = _context3.t0 === _enums.tabManagerEvents.ASK_AUDIO_PERMISSION ? 6 : _context3.t0 === _enums.tabManagerEvents.SIP_CONNECTING ? 8 : _context3.t0 === _enums.tabManagerEvents.SIP_RINGING ? 10 : _context3.t0 === _enums.tabManagerEvents.SIP_RINGING_MODAL ? 12 : _context3.t0 === _enums.tabManagerEvents.MUTE_STATE_CHANGE ? 20 : _context3.t0 === _enums.tabManagerEvents.SIP_REGISTERED ? 22 : _context3.t0 === _enums.tabManagerEvents.SIP_UNREGISTERED ? 25 : _context3.t0 === _enums.tabManagerEvents.SIP_REGISTRATION_FAILED_RELOAD ? 27 : _context3.t0 === _enums.tabManagerEvents.SIP_REGISTRATION_FAILED ? 29 : _context3.t0 === _enums.tabManagerEvents.SIP_CONNECTED ? 34 : _context3.t0 === _enums.tabManagerEvents.SIP_ENDED ? 36 : _context3.t0 === _enums.tabManagerEvents.MUTE ? 39 : _context3.t0 === _enums.tabManagerEvents.CLOSE_WHEN_CALL_CONNECTED ? 41 : _context3.t0 === _enums.tabManagerEvents.NOTIFY_ACTIVE_TAB_CALL_ACTIVE ? 43 : 45;
                break;
              case 6:
                if (data) {
                  this._showAskAudioPermissionMask();
                } else {
                  this._closeAskAudioPermissionMask();
                }
                return _context3.abrupt("break", 46);
              case 8:
                this._showWebRTCConnectingMask();
                return _context3.abrupt("break", 46);
              case 10:
                this._showRingingModal(data);
                return _context3.abrupt("break", 46);
              case 12:
                // that event call from modal ok or cancel, that auto close modal
                this._deps.modalUI.close(this._answerModalId);
                if (!data) {
                  _context3.next = 18;
                  break;
                }
                _context3.next = 16;
                return this.answerCall();
              case 16:
                _context3.next = 19;
                break;
              case 18:
                this.rejectCall();
              case 19:
                return _context3.abrupt("break", 46);
              case 20:
                this.setMuteActive(data);
                return _context3.abrupt("break", 46);
              case 22:
                console.log('_sipRegistered in other tabs~');
                this._sipRegistered();
                return _context3.abrupt("break", 46);
              case 25:
                this.setSipRegisterSuccess(false);
                return _context3.abrupt("break", 46);
              case 27:
                this._reloadApp();
                return _context3.abrupt("break", 46);
              case 29:
                this._handleRegistrationFailed();
                _context3.next = 32;
                return this._deps.evAgentSession.onceLogoutThenLogin();
              case 32:
                this._closeFailReconnectedBlock();
                return _context3.abrupt("break", 46);
              case 34:
                this._sipConnected();
                return _context3.abrupt("break", 46);
              case 36:
                this._sipEnded();
                // When sip end need reset Dialout Status to idle
                this._deps.presence.setDialoutStatus(_enums.dialoutStatuses.idle);
                return _context3.abrupt("break", 46);
              case 39:
                this.sipToggleMute(data);
                return _context3.abrupt("break", 46);
              case 41:
                this._isCloseWhenCallConnected = true;
                return _context3.abrupt("break", 46);
              case 43:
                if (this._deps.tabManager.active) {
                  this._deps.alert.warning({
                    message: _enums.tabManagerEvents.NOTIFY_ACTIVE_TAB_CALL_ACTIVE,
                    backdrop: true,
                    ttl: 0
                  });
                }
                return _context3.abrupt("break", 46);
              case 45:
                return _context3.abrupt("break", 46);
              case 46:
              case "end":
                return _context3.stop();
            }
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
      var _askAudioPermission = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var showMask,
          _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                showMask = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : true;
                console.log('askAudioPermission~~', showMask);
                _context4.prev = 2;
                if (!showMask) {
                  _context4.next = 8;
                  break;
                }
                if (!this.audioPermission) {
                  this._sendTabManager(_enums.tabManagerEvents.ASK_AUDIO_PERMISSION, true);
                  this._showAskAudioPermissionMask();
                }
                console.log('connect WEB_RTC');
                _context4.next = 8;
                return navigator.mediaDevices.getUserMedia({
                  audio: true
                });
              case 8:
                _context4.next = 15;
                break;
              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](2);
                this._deps.alert.danger({
                  message: _enums.EvSoftphoneEvents.AUDIO_STREAM_REJECTED,
                  backdrop: true,
                  ttl: 0
                });
                console.log(_context4.t0);
                throw new Error('Need Audio permission');
              case 15:
                _context4.prev = 15;
                if (showMask) {
                  if (this._audioPermissionAlertId) {
                    this._sendTabManager(_enums.tabManagerEvents.ASK_AUDIO_PERMISSION, false);
                    this._closeAskAudioPermissionMask();
                  }
                }
                return _context4.finish(15);
              case 18:
                this.setAudioPermission(true);
                if (this.sipRegisterSuccess) {
                  _context4.next = 22;
                  break;
                }
                _context4.next = 22;
                return this._registerSoftphone();
              case 22:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 10, 15, 18]]);
      }));
      function askAudioPermission() {
        return _askAudioPermission.apply(this, arguments);
      }
      return askAudioPermission;
    }()
  }, {
    key: "connectWebRTC",
    value: function () {
      var _connectWebRTC = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                console.log('connectWebRTC~');
                this.resetSip();
                _context5.next = 4;
                return this.askAudioPermission();
              case 4:
              case "end":
                return _context5.stop();
            }
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
      this._deps.evSubscription.subscribe(_enums2.EvCallbackTypes.SIP_REGISTRATION_FAILED, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                console.log('!!!!!!!SIP_REGISTRATION_FAILED');
                _this3.setSipRegistering(false);
                _this3._sendTabManager(_enums.tabManagerEvents.SIP_REGISTRATION_FAILED);
                _this3._handleRegistrationFailed();

                // await this._deps.evAgentSession.reLoginAgent();
                // this._closeFailReconnectedBlock();
              case 4:
              case "end":
                return _context6.stop();
            }
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
          isManualOffhook = _this3$_deps$presence.isManualOffhook; // exclude outbound and offhook
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
      var _showWebRTCConnectingMask2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this._closeWebRTCConnectingMask();
                _context7.t0 = this;
                _context7.next = 4;
                return this._deps.alert.info({
                  message: this._isCloseWhenCallConnected ? _enums.tabManagerEvents.SIP_RECONNECTING_WHEN_CALL_CONNECTED : _enums.tabManagerEvents.SIP_CONNECTING,
                  loading: true
                });
              case 4:
                _context7.t1 = _context7.sent;
                _context7.t0.setConnectingAlertId.call(_context7.t0, _context7.t1);
              case 6:
              case "end":
                return _context7.stop();
            }
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
      var _showAskAudioPermissionMask2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                this._closeAskAudioPermissionMask();
                _context8.next = 3;
                return this._deps.alert.info({
                  message: _enums.tabManagerEvents.ASK_AUDIO_PERMISSION,
                  loading: true,
                  backdrop: true
                });
              case 3:
                this._audioPermissionAlertId = _context8.sent;
              case 4:
              case "end":
                return _context8.stop();
            }
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
          var _onConfirm = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    _this5._sendTabManager(_enums.tabManagerEvents.SIP_RINGING_MODAL, true);
                    _context9.next = 3;
                    return _this5.answerCall();
                  case 3:
                  case "end":
                    return _context9.stop();
                }
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
      var _answerCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                this._resetRingingModal();
                if (!(!this.tabManagerEnabled || this.tabManagerEnabled && this._deps.tabManager.isMainTab)) {
                  _context10.next = 4;
                  break;
                }
                _context10.next = 4;
                return this._sipAnswer();
              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
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
      var _onceRegistered = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var _this6 = this;
        var _resolve, resolveTrue, resolveFalse, success;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                resolveTrue = function resolveTrue() {
                  return _resolve(true);
                };
                resolveFalse = function resolveFalse() {
                  return _resolve(false);
                };
                _context11.prev = 2;
                _context11.next = 5;
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
              case 5:
                success = _context11.sent;
                if (!success) {
                  this._emitRegistrationFailed();
                }
                _context11.next = 12;
                break;
              case 9:
                _context11.prev = 9;
                _context11.t0 = _context11["catch"](2);
                this._emitRegistrationFailed();
              case 12:
                this._eventEmitter.off(_enums.EvSoftphoneEvents.REGISTERED, resolveTrue);
                this._eventEmitter.off(_enums.EvSoftphoneEvents.RESET, resolveFalse);
              case 14:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[2, 9]]);
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
      var _registerSoftphone2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (this.sipRegistering) {
                  _context12.next = 15;
                  break;
                }
                this.setSipRegistering(true);
                this._sendTabManager(_enums.tabManagerEvents.SIP_CONNECTING);
                this._showWebRTCConnectingMask();
                console.log('isReconnected, isForceLogin, _isCloseWhenCallConnected~', this._deps.evAgentSession.isReconnected, this._deps.evAgentSession.isForceLogin, this._isCloseWhenCallConnected);

                // When that is force login is also need delay to reconnect server
                if (!(this._deps.evAgentSession.isReconnected || this._deps.evAgentSession.isForceLogin)) {
                  _context12.next = 12;
                  break;
                }
                _context12.next = 8;
                return (0, _utils.sleep)(this._isCloseWhenCallConnected ? RECONNECT_DEBOUNCE_TIME_WHEN_CONNECTED : RECONNECT_DEBOUNCE_TIME);
              case 8:
                _context12.next = 10;
                return this._connectedWebRTC();
              case 10:
                _context12.next = 14;
                break;
              case 12:
                _context12.next = 14;
                return this._connectedWebRTC();
              case 14:
                return _context12.abrupt("return");
              case 15:
                throw new Error('Sip is registering');
              case 16:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));
      function _registerSoftphone() {
        return _registerSoftphone2.apply(this, arguments);
      }
      return _registerSoftphone;
    }()
  }, {
    key: "_connectedWebRTC",
    value: function () {
      var _connectedWebRTC2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.prev = 0;
                this._deps.evClient.sipInit();
                this._deps.evClient.sipRegister();
                _context13.next = 5;
                return this.onceRegistered();
              case 5:
                this.setSipRegistering(false);
                this._closeWebRTCConnectingMask();
                _context13.next = 12;
                break;
              case 9:
                _context13.prev = 9;
                _context13.t0 = _context13["catch"](0);
                console.error(_context13.t0);
              case 12:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this, [[0, 9]]);
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
      var _sipAnswer2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                if (!this._isFirefox) {
                  _context15.next = 10;
                  break;
                }
                _context15.prev = 1;
                _context15.next = 4;
                return (0, _utils.waitUntilTo)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
                  return regeneratorRuntime.wrap(function _callee14$(_context14) {
                    while (1) {
                      switch (_context14.prev = _context14.next) {
                        case 0:
                          _context14.prev = 0;
                          _context14.next = 3;
                          return navigator.mediaDevices.getUserMedia({
                            audio: true
                          });
                        case 3:
                          _context14.next = 7;
                          break;
                        case 5:
                          _context14.prev = 5;
                          _context14.t0 = _context14["catch"](0);
                        case 7:
                        case "end":
                          return _context14.stop();
                      }
                    }
                  }, _callee14, null, [[0, 5]]);
                })), {
                  timeout: 2000
                });
              case 4:
                _context15.next = 10;
                break;
              case 6:
                _context15.prev = 6;
                _context15.t0 = _context15["catch"](1);
                this._sendTabManager(_enums.tabManagerEvents.NOTIFY_ACTIVE_TAB_CALL_ACTIVE);
                // eslint-disable-next-line no-alert
                window.confirm(_i18n["default"].getString('activeCallTip', this._deps.locale.currentLocale));
              case 10:
                this._deps.evClient.sipAnswer();
              case 11:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this, [[1, 6]]);
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
  return EvIntegratedSoftphone;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "audioPermission", [_core.storage, _core.state], {
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
}), _applyDecoratedDescriptor(_class2.prototype, "setConnectingAlertId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setConnectingAlertId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAudioPermission", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAudioPermission"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetController", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetController"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setMuteActive", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setMuteActive"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetSip", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetSip"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSipRegisterSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setSipRegisterSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSipRegistering", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setSipRegistering"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_playAudio", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "_playAudio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_stopAudio", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "_stopAudio"), _class2.prototype)), _class2)) || _class);
exports.EvIntegratedSoftphone = EvIntegratedSoftphone;
//# sourceMappingURL=EvIntegratedSoftphone.js.map
