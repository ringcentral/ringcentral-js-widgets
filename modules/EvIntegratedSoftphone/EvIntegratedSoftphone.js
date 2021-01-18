"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvIntegratedSoftphone = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.function.name");

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _events = require("events");

var _formatMessage = _interopRequireDefault(require("format-message"));

var _di = require("ringcentral-integration/lib/di");

var _raceTimeout = require("ringcentral-integration/lib/raceTimeout");

var _sleep = _interopRequireDefault(require("ringcentral-integration/lib/sleep"));

var _enums = require("../../enums");

var _enums2 = require("../../lib/EvClient/enums");

var _audios = require("./audios");

var _i18n = _interopRequireDefault(require("./i18n"));

var _runInActivityWebRTCTab = require("./runInActivityWebRTCTab.decorator");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var SECOND = 1000;
var RECONNECT_DEBOUNCE_TIME = SECOND * 5;
var RECONNECT_DEBOUNCE_TIME_WHEN_CONNECTED = SECOND * 15;
var SIP_MAX_CONNECTING_TIME = SECOND * 30;
var EvIntegratedSoftphone = (_dec = (0, _di.Module)({
  name: 'EvIntegratedSoftphone',
  deps: ['Locale', 'RouterInteraction', 'EvAgentSession', 'EvSubscription', 'Beforeunload', 'EvSettings', 'EvClient', 'Presence', 'Storage', 'EvAuth', 'Block', 'Auth', 'ModalUI', 'Alert', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'EvIntegratedSoftphoneOptions',
    optional: true
  }]
}), _dec2 = (0, _runInActivityWebRTCTab.runInActivityWebRTCTab)(), _dec3 = (0, _runInActivityWebRTCTab.runInActivityWebRTCTab)(), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvIntegratedSoftphone, _RcModuleV);

  var _super = _createSuper(EvIntegratedSoftphone);

  _createClass(EvIntegratedSoftphone, [{
    key: "tabManagerEnabled",

    /** audio permission alert id */
    // private _checkWebRTCIntervalId: NodeJS.Timeout;
    // private _heartBeatIntervalTime: number;
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
    _this._audio = void 0;
    _this._eventEmitter = new _events.EventEmitter();
    _this._answerModalId = null;
    _this._audioPermissionAlertId = null;

    _this._beforeunloadHandler = function () {
      return _this.isWebRTCTab;
    };

    _this._isCloseWhenCallConnected = false;
    _this._failedBlockId = void 0;

    _initializerDefineProperty(_this, "audioPermission", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "muteActive", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "sipRegisterSuccess", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "sipRegistering", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "connectingAlertId", _descriptor5, _assertThisInitialized(_this));

    _this._deps.evAuth.beforeAgentLogout(function () {
      _this._resetAllState();
    });

    _this._deps.beforeunload.onAfterUnload(function () {
      _this._sendTabManager(_enums.tabManagerEvents.CLOSE_WHEN_CALL_CONNECTED);
    });

    return _this;
  } // @state
  // dtmfString: string = '';


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
                console.log('onSettedMainTab~~', _this2._deps.evAgentSession.isIntegratedSoftphone);

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
        if (_this2._deps.tabManager.hasMultipleTabs && !_this2._deps.tabManager.isMainTab && _this2._deps.evAgentSession.isConfigTabAlive()) {
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
      } catch (error) {// ignore error
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
                  _context3.next = 39;
                  break;
                }

                data = event.args[0];
                _context3.t0 = event.name;
                _context3.next = _context3.t0 === _enums.tabManagerEvents.ASK_AUDIO_PERMISSION ? 6 : _context3.t0 === _enums.tabManagerEvents.SIP_CONNECTING ? 8 : _context3.t0 === _enums.tabManagerEvents.SIP_RINGING ? 10 : _context3.t0 === _enums.tabManagerEvents.SIP_RINGING_MODAL ? 12 : _context3.t0 === _enums.tabManagerEvents.MUTE_STATE_CHANGE ? 15 : _context3.t0 === _enums.tabManagerEvents.SIP_REGISTERED ? 17 : _context3.t0 === _enums.tabManagerEvents.SIP_UNREGISTERED ? 20 : _context3.t0 === _enums.tabManagerEvents.SIP_REGISTRATION_FAILED_RELOAD ? 22 : _context3.t0 === _enums.tabManagerEvents.SIP_REGISTRATION_FAILED ? 24 : _context3.t0 === _enums.tabManagerEvents.SIP_CONNECTED ? 29 : _context3.t0 === _enums.tabManagerEvents.SIP_ENDED ? 31 : _context3.t0 === _enums.tabManagerEvents.MUTE ? 34 : _context3.t0 === _enums.tabManagerEvents.CLOSE_WHEN_CALL_CONNECTED ? 36 : 38;
                break;

              case 6:
                if (data) {
                  this._showAskAudioPermissionMask();
                } else {
                  this._closeAskAudioPermissionMask();
                }

                return _context3.abrupt("break", 39);

              case 8:
                this._showWebRTCConnectingMask();

                return _context3.abrupt("break", 39);

              case 10:
                this._showRingingModal(data);

                return _context3.abrupt("break", 39);

              case 12:
                // that event call from modal ok or cancel, that auto close modal
                this._deps.modalUI.close(this._answerModalId);

                if (data) {
                  this.answerCall();
                } else {
                  this.rejectCall();
                }

                return _context3.abrupt("break", 39);

              case 15:
                this.setMuteActive(data);
                return _context3.abrupt("break", 39);

              case 17:
                console.log('_sipRegistered in other tabs~');

                this._sipRegistered();

                return _context3.abrupt("break", 39);

              case 20:
                this.setSipRegisterSuccess(false);
                return _context3.abrupt("break", 39);

              case 22:
                this._reloadApp();

                return _context3.abrupt("break", 39);

              case 24:
                this._handleRegistrationFailed();

                _context3.next = 27;
                return this._deps.evAgentSession.onceLogoutThenLogin();

              case 27:
                this._closeFailReconnectedBlock();

                return _context3.abrupt("break", 39);

              case 29:
                this._sipConnected();

                return _context3.abrupt("break", 39);

              case 31:
                this._sipEnded(); // When sip end need reset Dialout Status to idle


                this._deps.presence.setDialoutStatus(_enums.dialoutStatuses.idle);

                return _context3.abrupt("break", 39);

              case 34:
                this.sipToggleMute(data);
                return _context3.abrupt("break", 39);

              case 36:
                this._isCloseWhenCallConnected = true;
                return _context3.abrupt("break", 39);

              case 38:
                return _context3.abrupt("break", 39);

              case 39:
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
                _context4.prev = 1;

                if (!showMask) {
                  _context4.next = 7;
                  break;
                }

                if (!this.audioPermission) {
                  this._sendTabManager(_enums.tabManagerEvents.ASK_AUDIO_PERMISSION, true);

                  this._showAskAudioPermissionMask();
                }

                console.log('connect WEB_RTC');
                _context4.next = 7;
                return navigator.mediaDevices.getUserMedia({
                  audio: true
                });

              case 7:
                _context4.next = 14;
                break;

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](1);

                this._deps.alert.danger({
                  message: _enums.EvSoftphoneEvents.AUDIO_STREAM_REJECTED,
                  backdrop: true,
                  ttl: 0
                });

                console.log(_context4.t0);
                throw new Error('Need Audio permission');

              case 14:
                _context4.prev = 14;

                if (showMask) {
                  if (this._audioPermissionAlertId) {
                    this._sendTabManager(_enums.tabManagerEvents.ASK_AUDIO_PERMISSION, false);

                    this._closeAskAudioPermissionMask();
                  }
                }

                return _context4.finish(14);

              case 17:
                this.setAudioPermission(true);

                if (this.sipRegisterSuccess) {
                  _context4.next = 21;
                  break;
                }

                _context4.next = 21;
                return this._registerSoftphone();

              case 21:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 9, 14, 17]]);
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

                _this3._handleRegistrationFailed(); // await this._deps.evAgentSession.reLoginAgent();
                // this._closeFailReconnectedBlock();


              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      })));

      this._deps.evSubscription.subscribe(_enums2.EvCallbackTypes.SIP_RINGING, function (ringingCall) {
        _this3.bindBeforeunload();

        console.log('!!!!!!!SIP_RINGING');

        _this3._eventEmitter.emit(_enums2.EvCallbackTypes.SIP_RINGING, ringingCall);

        if (_this3.autoAnswerCheckFn()) {
          return _this3._sipAnswer();
        }

        var displayName = ringingCall.data.request.from.displayName;

        _this3._sendTabManager(_enums.tabManagerEvents.SIP_RINGING, displayName);

        _this3._showRingingModal(displayName);
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
      }); // TODO: that is update session config related feature
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

      this._closeWebRTCConnectingMask(); // this._deps.alert.danger({
      //   message: EvCallbackTypes.SIP_REGISTRATION_FAILED,
      //   backdrop: true,
      //   ttl: 0,
      //   allowDuplicates: false,
      // });


      this._deps.modalUI.alert({
        title: 'Registration failed',
        content: 'Will reload your pages and tabs for you',
        okText: 'Ok',
        size: 'xsmall',
        onOK: function onOK() {
          _this4._sendTabManager(_enums.tabManagerEvents.SIP_REGISTRATION_FAILED_RELOAD);

          _this4._reloadApp();
        }
      });

      this._deps.tabManager.setMainTabId(null); // this._deps.routerInteraction.push('/sessionConfig');

    }
  }, {
    key: "_reloadApp",
    value: function _reloadApp() {
      window.location.reload();
    }
  }, {
    key: "_sipConnected",
    value: function _sipConnected() {
      this._deps.presence.setOffhook(true); // When connected reset all controller state


      this.resetController();
    }
  }, {
    key: "_showWebRTCConnectingMask",
    value: function _showWebRTCConnectingMask() {
      this._closeWebRTCConnectingMask();

      this.setConnectingAlertId(this._deps.alert.info({
        message: this._isCloseWhenCallConnected ? _enums.tabManagerEvents.SIP_RECONNECTING_WHEN_CALL_CONNECTED : _enums.tabManagerEvents.SIP_CONNECTING,
        loading: true
      }));
    }
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
    value: function _showAskAudioPermissionMask() {
      this._closeAskAudioPermissionMask();

      this._audioPermissionAlertId = this._deps.alert.info({
        message: _enums.tabManagerEvents.ASK_AUDIO_PERMISSION,
        loading: true,
        backdrop: true
      });
    }
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
    value: function _showRingingModal(displayName) {
      var _this5 = this;

      // prevent open a lot of modal, that sdk event pass a lot of ringing state when re login
      if (this._answerModalId) {
        return;
      }

      this._playAudioLoop('ringtone');

      var currentLocale = this._deps.locale.currentLocale;
      this._answerModalId = this._deps.modalUI.confirm({
        title: _i18n["default"].getString('inviteModalTitle', currentLocale),
        content: (0, _formatMessage["default"])(_i18n["default"].getString('inviteModalContent', currentLocale), {
          displayName: displayName
        }),
        okText: _i18n["default"].getString('inviteModalAnswer', currentLocale),
        cancelText: _i18n["default"].getString('inviteModalReject', currentLocale),
        onOK: function onOK() {
          _this5._sendTabManager(_enums.tabManagerEvents.SIP_RINGING_MODAL, true);

          _this5.answerCall();
        },
        onCancel: function onCancel() {
          _this5._sendTabManager(_enums.tabManagerEvents.SIP_RINGING_MODAL, false);

          _this5.rejectCall();
        },
        size: 'xsmall'
      });
    }
  }, {
    key: "answerCall",
    value: function answerCall() {
      this._resetRingingModal();

      this._sipAnswer();
    }
  }, {
    key: "rejectCall",
    value: function rejectCall() {
      this._resetRingingModal(); // when reject not show init fail


      this._deps.presence.showOffHookInitError = false;

      this._deps.evClient.sipReject();

      this._eventEmitter.emit(_enums.EvSoftphoneEvents.CALL_REJECTED);

      this.removeBeforeunload();
    }
  }, {
    key: "onceRegistered",
    value: function onceRegistered() {
      var _this6 = this;

      var _resolve;

      var _reject;

      return (0, _raceTimeout.raceTimeout)(new Promise(function (resolve, reject) {
        _resolve = resolve;
        _reject = reject;

        _this6._eventEmitter.once(_enums.EvSoftphoneEvents.REGISTERED, _resolve); // when reset sip also need reject that


        _this6._eventEmitter.once(_enums.EvSoftphoneEvents.RESET, _reject);
      }), {
        timeout: SIP_MAX_CONNECTING_TIME,
        onTimeout: function onTimeout(res, rej) {
          _this6._emitRegistrationFailed();

          rej('connected integratedSoftphone fail');
        },
        finalize: function finalize() {
          _resolve();

          _this6._eventEmitter.off(_enums.EvSoftphoneEvents.REGISTERED, _resolve);

          _this6._eventEmitter.off(_enums.EvSoftphoneEvents.RESET, _reject);
        }
      });
    }
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
      var _registerSoftphone2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (this.sipRegistering) {
                  _context7.next = 15;
                  break;
                }

                this.setSipRegistering(true);

                this._sendTabManager(_enums.tabManagerEvents.SIP_CONNECTING);

                this._showWebRTCConnectingMask();

                console.log('isReconnected, isForceLogin, _isCloseWhenCallConnected~', this._deps.evAgentSession.isReconnected, this._deps.evAgentSession.isForceLogin, this._isCloseWhenCallConnected); // When that is force login is also need delay to reconnect server

                if (!(this._deps.evAgentSession.isReconnected || this._deps.evAgentSession.isForceLogin)) {
                  _context7.next = 12;
                  break;
                }

                _context7.next = 8;
                return (0, _sleep["default"])(this._isCloseWhenCallConnected ? RECONNECT_DEBOUNCE_TIME_WHEN_CONNECTED : RECONNECT_DEBOUNCE_TIME);

              case 8:
                _context7.next = 10;
                return this._connectedWebRTC();

              case 10:
                _context7.next = 14;
                break;

              case 12:
                _context7.next = 14;
                return this._connectedWebRTC();

              case 14:
                return _context7.abrupt("return");

              case 15:
                throw new Error('Sip is registering');

              case 16:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _registerSoftphone() {
        return _registerSoftphone2.apply(this, arguments);
      }

      return _registerSoftphone;
    }()
  }, {
    key: "_connectedWebRTC",
    value: function () {
      var _connectedWebRTC2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;

                this._deps.evClient.sipInit();

                this._deps.evClient.sipRegister();

                _context8.next = 5;
                return this.onceRegistered();

              case 5:
                this.setSipRegistering(false);

                this._closeWebRTCConnectingMask();

                _context8.next = 12;
                break;

              case 9:
                _context8.prev = 9;
                _context8.t0 = _context8["catch"](0);
                console.error(_context8.t0);

              case 12:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 9]]);
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
    value: function _sipAnswer() {
      this._deps.evClient.sipAnswer();
    }
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
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "audioPermission", [_core.storage, _core.state], {
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
