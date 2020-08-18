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

var _events = _interopRequireDefault(require("events"));

var _formatMessage = _interopRequireDefault(require("format-message"));

var _di = require("ringcentral-integration/lib/di");

var _sleep = _interopRequireDefault(require("ringcentral-integration/lib/sleep"));

var _enums = require("../../enums");

var _enums2 = require("../../lib/EvClient/enums");

var _heartBeat = require("../../lib/heartBeat");

var _time = require("../../lib/time");

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
  deps: ['Locale', 'RouterInteraction', 'EvAgentSession', 'EvSubscription', 'Beforeunload', 'EvSettings', 'EvClient', 'Presence', 'Storage', 'EvAuth', 'Block', 'Auth', 'Modal', 'Alert', {
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
    get: function get() {
      var _this$_deps$tabManage;

      return (_this$_deps$tabManage = this._deps.tabManager) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage._tabbie.enabled;
    }
  }, {
    key: "isWebRTCTab",
    get: function get() {
      return !this.tabManagerEnabled || this.webRTCTabId === this._deps.tabManager.id;
    }
  }, {
    key: "isWebRTCTabAlive",
    get: function get() {
      return !this.tabManagerEnabled || this.webRTCTabId && this._deps.tabManager.checkTabAliveById(this.webRTCTabId);
    }
  }]);

  function EvIntegratedSoftphone(deps) {
    var _this$_deps$evIntegra, _this$_deps$evIntegra2;

    var _this;

    _classCallCheck(this, EvIntegratedSoftphone);

    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'EvIntegratedSoftphone'
    });
    _this.autoAnswerCheckFn = void 0;
    _this._audio = void 0;
    _this._eventEmitter = new _events["default"]();
    _this._answerModalId = null;
    _this._audioPermissionAlertId = null;
    _this._checkWebRTCIntervalId = void 0;
    _this._heartBeat = void 0;
    _this._heartBeatIntervalTime = void 0;
    _this._isReconnected = false;

    _this._beforeunloadHandler = function () {
      return _this.isWebRTCTab;
    };

    _this._isCloseWhenCallConnected = false;

    _initializerDefineProperty(_this, "muteActive", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "sipRegisterSuccess", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "sipRegistering", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "webRTCTabId", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "connectingAlertId", _descriptor5, _assertThisInitialized(_this));

    var heartBeatInterval = (_this$_deps$evIntegra = (_this$_deps$evIntegra2 = _this._deps.evIntegratedSoftphoneOptions) === null || _this$_deps$evIntegra2 === void 0 ? void 0 : _this$_deps$evIntegra2.heartBeatInterval) !== null && _this$_deps$evIntegra !== void 0 ? _this$_deps$evIntegra : 1000;

    if (_this.tabManagerEnabled) {
      _this._heartBeat = new _heartBeat.HeartBeat("".concat(_this._deps.tabManager._tabbie.prefix, "webRTCConnect"), heartBeatInterval);
      _this._heartBeatIntervalTime = heartBeatInterval;
    }

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
    key: "setWebRTCTabId",
    value: function setWebRTCTabId(id) {
      this.webRTCTabId = id;
    }
  }, {
    key: "resetSip",
    value: function resetSip() {
      this.sipRegistering = false;
      this.sipRegisterSuccess = false;
      this.webRTCTabId = null;
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

      if (this.tabManagerEnabled) {
        this._bindCheckWebRTCInterval();
      }

      this._deps.evAgentSession.onTriggerConfig.push( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_this2._deps.evAgentSession.isIntegratedSoftphone && !_this2.isWebRTCTabAlive)) {
                  _context.next = 3;
                  break;
                }

                _context.next = 3;
                return _this2.connectWebRTC();

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));

      this._deps.evAuth.beforeAgentLogout(function () {
        var _this2$_heartBeat;

        _this2._closeWebRTCConnectingMask();

        _this2.resetSip();

        _this2._clearWebRTCInterval();

        (_this2$_heartBeat = _this2._heartBeat) === null || _this2$_heartBeat === void 0 ? void 0 : _this2$_heartBeat.destroy();

        _this2._deps.evClient.sipTerminate();
      });

      this._deps.beforeunload.onAfterUnload(function () {
        _this2._sendTabManager(_enums.tabManagerEvents.CLOSE_WHEN_CALL_CONNECTED);
      });
    }
  }, {
    key: "_clearWebRTCInterval",
    value: function _clearWebRTCInterval() {
      if (this._checkWebRTCIntervalId) {
        clearInterval(this._checkWebRTCIntervalId);
        this._checkWebRTCIntervalId = null;
      }
    }
  }, {
    key: "_bindCheckWebRTCInterval",
    value: function _bindCheckWebRTCInterval() {
      var _this3 = this;

      this._deps.evAgentSession.onConfigSuccess.push(function () {
        if (_this3._deps.evAgentSession.isIntegratedSoftphone) {
          // when config success, if that webRTC tab is alive set sip register success to true
          if (_this3.isWebRTCTabAlive) {
            _this3.setSipRegisterSuccess(true);
          }

          if (typeof _this3._checkWebRTCIntervalId === 'number') return;
          _this3._checkWebRTCIntervalId = setInterval( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!(_this3.sipRegistering || _this3.isWebRTCTab)) {
                      _context3.next = 3;
                      break;
                    }

                    _this3._clearWebRTCInterval();

                    return _context3.abrupt("return");

                  case 3:
                    if (!(_this3._deps.evAuth.connected && _this3._deps.evAgentSession.configSuccess && !_this3.isWebRTCTabAlive && !_this3._heartBeat.isWorkingByLocal && !_this3._heartBeat.isSuccessByLocal)) {
                      _context3.next = 21;
                      break;
                    }

                    _this3._heartBeat.heartBeatOnWorking(); // when that is connecting


                    _this3._closeWebRTCConnectingMask();

                    _this3.setWebRTCTabId(null);

                    _context3.prev = 7;
                    _context3.next = 10;
                    return _this3._deps.block.next( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                      return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              console.log('!!!configureAgent');
                              _context2.next = 3;
                              return _this3._deps.evAgentSession.configureAgent(false);

                            case 3:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, _callee2);
                    })));

                  case 10:
                    _context3.next = 17;
                    break;

                  case 12:
                    _context3.prev = 12;
                    _context3.t0 = _context3["catch"](7);
                    console.error('re config fail', _context3.t0);

                    _this3._emitRegistrationFailed();

                    return _context3.abrupt("return");

                  case 17:
                    _this3._isReconnected = true;

                    _this3._clearWebRTCInterval();

                    _context3.next = 21;
                    return _this3.connectWebRTC();

                  case 21:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, null, [[7, 12]]);
          })), _this3._heartBeatIntervalTime);
        }
      });
    }
  }, {
    key: "_emitRegistrationFailed",
    value: function _emitRegistrationFailed() {
      this._deps.evSubscription.emit(_enums2.EvCallbackTypes.SIP_REGISTRATION_FAILED, null);
    }
  }, {
    key: "onStateChange",
    value: function () {
      var _onStateChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this.ready && this.tabManagerEnabled && this._deps.tabManager.ready) {
                  this._checkTabManagerEvent();
                }

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function onStateChange() {
        return _onStateChange.apply(this, arguments);
      }

      return onStateChange;
    }()
  }, {
    key: "_checkTabManagerEvent",
    value: function _checkTabManagerEvent() {
      var event = this._deps.tabManager.event;

      if (event) {
        var data = event.args[0];

        switch (event.name) {
          case _enums.tabManagerEvents.ASK_AUDIO_PERMISSION:
            if (data) {
              this._showAskAudioPermissionMask();
            } else {
              this._closeAskAudioPermissionMask();
            }

            break;

          case _enums.tabManagerEvents.SIP_CONNECTING:
            this._showWebRTCConnectingMask();

            break;

          case _enums.tabManagerEvents.SET_WEB_RTC_TAB_ID:
            // when set tab id, reset the connected state to false
            this._isCloseWhenCallConnected = false;
            this.setWebRTCTabId(data);

            this._closeWebRTCConnectingMask();

            break;

          case _enums.tabManagerEvents.SIP_RINGING:
            this._showRingingModal(data);

            break;

          case _enums.tabManagerEvents.SIP_RINGING_MODAL:
            // that event call from modal ok or cancel, that auto close modal
            this._deps.modal.close(this._answerModalId);

            if (data) {
              this.answerCall();
            } else {
              this.rejectCall();
            }

            break;

          case _enums.tabManagerEvents.MUTE_STATE_CHANGE:
            this.setMuteActive(data);
            break;

          case _enums.tabManagerEvents.SIP_REGISTERED:
            this._sipRegistered();

            break;

          case _enums.tabManagerEvents.SIP_UNREGISTERED:
            this.setSipRegisterSuccess(false);
            break;

          case _enums.tabManagerEvents.SIP_REGISTRATION_FAILED:
            this._handleRegistrationFailed();

            break;

          case _enums.tabManagerEvents.SIP_CONNECTED:
            this._sipConnected();

            break;

          case _enums.tabManagerEvents.SIP_ENDED:
            this._sipEnded(); // When sip end need reset Dialout Status to idle


            this._deps.presence.setDialoutStatus(_enums.dialoutStatuses.idle);

            break;

          case _enums.tabManagerEvents.MUTE:
            this.sipToggleMute(data);
            break;

          case _enums.tabManagerEvents.CLOSE_WHEN_CALL_CONNECTED:
            this._isCloseWhenCallConnected = true;
            break;

          default:
            break;
        }
      }
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
      var _askAudioPermission = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _this4 = this;

        var showMask,
            showMaskTimeout,
            _args5 = arguments;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                showMask = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : true;
                showMaskTimeout = null;
                _context5.prev = 2;

                if (showMask) {
                  /**
                   *  using timeout when navigator.mediaDevices.getUserMedia is already completed,
                   *  that will very quick close, so remove that when very quick.
                   */
                  showMaskTimeout = setTimeout(function () {
                    _this4._sendTabManager(_enums.tabManagerEvents.ASK_AUDIO_PERMISSION, true);

                    _this4._showAskAudioPermissionMask();

                    showMaskTimeout = null;
                  }, 100);
                }

                _context5.next = 6;
                return navigator.mediaDevices.getUserMedia({
                  audio: true
                });

              case 6:
                _context5.next = 12;
                break;

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](2);

                this._deps.alert.danger({
                  message: _enums.EvSoftphoneEvents.AUDIO_STREAM_REJECTED,
                  backdrop: true,
                  ttl: 0
                });

                throw new Error('Need Audio permission');

              case 12:
                _context5.prev = 12;

                if (showMask) {
                  if (showMaskTimeout) {
                    clearTimeout(showMaskTimeout);
                  }

                  if (this._audioPermissionAlertId) {
                    this._sendTabManager(_enums.tabManagerEvents.ASK_AUDIO_PERMISSION, false);

                    this._closeAskAudioPermissionMask();
                  }
                }

                return _context5.finish(12);

              case 15:
                if (this.sipRegisterSuccess) {
                  _context5.next = 18;
                  break;
                }

                _context5.next = 18;
                return this._registerSoftphone();

              case 18:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 8, 12, 15]]);
      }));

      function askAudioPermission() {
        return _askAudioPermission.apply(this, arguments);
      }

      return askAudioPermission;
    }()
  }, {
    key: "connectWebRTC",
    value: function () {
      var _connectWebRTC = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var isConfiguringByLocal;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                isConfiguringByLocal = this._heartBeat.isWorkingByLocal;

                if (this.tabManagerEnabled && !isConfiguringByLocal) {
                  this._heartBeat.heartBeatOnWorking();
                }

                this._bindingIntegratedSoftphone(); // when init set register to be false


                this.resetSip();
                _context6.next = 6;
                return this.askAudioPermission();

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function connectWebRTC() {
        return _connectWebRTC.apply(this, arguments);
      }

      return connectWebRTC;
    }()
  }, {
    key: "_bindingIntegratedSoftphone",
    value: function _bindingIntegratedSoftphone() {
      var _this5 = this;

      this._deps.evSubscription.subscribe(_enums2.EvCallbackTypes.SIP_REGISTERED, function () {
        // That will call several times when reconnected.
        console.log('!!!!!!!SIP_REGISTERED');

        if (!_this5.sipRegisterSuccess) {
          _this5._setWebRTCTabId();

          _this5._heartBeat.heartBeatOnSuccess();

          _this5._sendTabManager(_enums.tabManagerEvents.SIP_REGISTERED);

          _this5._sipRegistered();
        }
      });

      this._deps.evSubscription.subscribe(_enums2.EvCallbackTypes.SIP_UNREGISTERED, function () {
        console.log('!!!!!!!SIP_UNREGISTERED');

        if (_this5.sipRegisterSuccess) {
          _this5._sendTabManager(_enums.tabManagerEvents.SIP_UNREGISTERED);

          _this5.setSipRegisterSuccess(false);
        }
      });

      this._deps.evSubscription.subscribe(_enums2.EvCallbackTypes.SIP_REGISTRATION_FAILED, function () {
        console.log('!!!!!!!SIP_REGISTRATION_FAILED');

        _this5.setSipRegistering(false);

        _this5._sendTabManager(_enums.tabManagerEvents.SIP_REGISTRATION_FAILED);

        _this5._handleRegistrationFailed();
      });

      this._deps.evSubscription.subscribe(_enums2.EvCallbackTypes.SIP_RINGING, function (ringingCall) {
        console.log('!!!!!!!SIP_RINGING');

        _this5._eventEmitter.emit(_enums2.EvCallbackTypes.SIP_RINGING);

        if (_this5.autoAnswerCheckFn()) {
          return _this5._sipAnswer();
        }

        var displayName = ringingCall.data.request.from.displayName;

        _this5._sendTabManager(_enums.tabManagerEvents.SIP_RINGING, displayName);

        _this5._showRingingModal(displayName);
      });

      this._deps.evSubscription.subscribe(_enums2.EvCallbackTypes.SIP_CONNECTED, function () {
        _this5._deps.beforeunload.add(_this5._beforeunloadHandler);

        console.info('!!!!!!!SIP_CONNECTED');

        _this5._sendTabManager(_enums.tabManagerEvents.SIP_CONNECTED);

        _this5._sipConnected();
      });

      this._deps.evSubscription.subscribe(_enums2.EvCallbackTypes.SIP_ENDED, function () {
        console.info('!!!!!!!SIP_ENDED');

        _this5._deps.beforeunload.remove(_this5._beforeunloadHandler);

        _this5._sendTabManager(_enums.tabManagerEvents.SIP_ENDED);

        _this5._sipEnded();
      });

      this._deps.evSubscription.subscribe(_enums2.EvCallbackTypes.SIP_MUTE, function () {
        console.info('!!!!!!!SIP_MUTE');

        _this5._sendTabManager(_enums.tabManagerEvents.MUTE_STATE_CHANGE, true);

        _this5.setMuteActive(true);
      });

      this._deps.evSubscription.subscribe(_enums2.EvCallbackTypes.SIP_UNMUTE, function () {
        console.info('!!!!!!!SIP_UNMUTE');

        _this5._sendTabManager(_enums.tabManagerEvents.MUTE_STATE_CHANGE, false);

        _this5.setMuteActive(false);
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

      this._deps.evSettings.setOffhook(false);
    }
  }, {
    key: "_sipRegistered",
    value: function _sipRegistered() {
      this.setSipRegisterSuccess(true);

      this._eventEmitter.emit(_enums.EvSoftphoneEvents.REGISTERED);
    }
  }, {
    key: "_handleRegistrationFailed",
    value: function _handleRegistrationFailed() {
      this._deps.evClient.sipTerminate();

      this._deps.evAuth.newReconnect();

      this.setSipRegisterSuccess(false);

      this._closeWebRTCConnectingMask();

      this._deps.alert.danger({
        message: _enums2.EvCallbackTypes.SIP_REGISTRATION_FAILED,
        backdrop: true,
        ttl: 0,
        allowDuplicates: false
      });

      this._deps.routerInteraction.push('/sessionConfig');
    }
  }, {
    key: "_sipConnected",
    value: function _sipConnected() {
      this._deps.evSettings.setOffhook(true); // When connected reset all controller state


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
      var _this6 = this;

      // prevent open a lot of modal, that sdk event pass a lot of ringing state when re login
      if (this._answerModalId) {
        return;
      }

      this._playAudioLoop('ringtone');

      var currentLocale = this._deps.locale.currentLocale;
      this._answerModalId = this._deps.modal.confirm({
        title: _i18n["default"].getString('inviteModalTitle', currentLocale),
        content: (0, _formatMessage["default"])(_i18n["default"].getString('inviteModalContent', currentLocale), {
          displayName: displayName
        }),
        okText: _i18n["default"].getString('inviteModalAnswer', currentLocale),
        cancelText: _i18n["default"].getString('inviteModalReject', currentLocale),
        onOK: function onOK() {
          _this6._sendTabManager(_enums.tabManagerEvents.SIP_RINGING_MODAL, true);

          _this6.answerCall();
        },
        onCancel: function onCancel() {
          _this6._sendTabManager(_enums.tabManagerEvents.SIP_RINGING_MODAL, false);

          _this6.rejectCall();
        }
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
    }
  }, {
    key: "onceRegistered",
    value: function onceRegistered() {
      var _this7 = this;

      return (0, _time.raceTimeout)(new Promise(function (resolve) {
        return _this7._eventEmitter.once(_enums.EvSoftphoneEvents.REGISTERED, resolve);
      }), {
        timeout: SIP_MAX_CONNECTING_TIME
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

        this._deps.modal.close(this._answerModalId);

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
                  _context7.next = 14;
                  break;
                }

                this.setSipRegistering(true);

                this._sendTabManager(_enums.tabManagerEvents.SIP_CONNECTING);

                this._showWebRTCConnectingMask(); // When that is force login is also need delay to reconnect server


                if (!(this._isReconnected || this._deps.evAgentSession.isForceLogin)) {
                  _context7.next = 11;
                  break;
                }

                _context7.next = 7;
                return (0, _sleep["default"])(this._isCloseWhenCallConnected ? RECONNECT_DEBOUNCE_TIME_WHEN_CONNECTED : RECONNECT_DEBOUNCE_TIME);

              case 7:
                _context7.next = 9;
                return this._connectedWebRTC();

              case 9:
                _context7.next = 13;
                break;

              case 11:
                _context7.next = 13;
                return this._connectedWebRTC();

              case 13:
                return _context7.abrupt("return");

              case 14:
                throw new Error('Sip is registering');

              case 15:
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
                this._deps.evClient.sipInit();

                this._deps.evClient.sipRegister();

                _context8.prev = 2;
                _context8.next = 5;
                return this.onceRegistered();

              case 5:
                this.setSipRegistering(false);

                this._setWebRTCTabId();

                _context8.next = 13;
                break;

              case 9:
                _context8.prev = 9;
                _context8.t0 = _context8["catch"](2);
                console.error(_context8.t0);

                this._emitRegistrationFailed();

              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[2, 9]]);
      }));

      function _connectedWebRTC() {
        return _connectedWebRTC2.apply(this, arguments);
      }

      return _connectedWebRTC;
    }()
  }, {
    key: "_setWebRTCTabId",
    value: function _setWebRTCTabId() {
      if (this.tabManagerEnabled) {
        var id = this._deps.tabManager.id;

        this._sendTabManager(_enums.tabManagerEvents.SET_WEB_RTC_TAB_ID, id);

        this.setWebRTCTabId(id);
      }

      this._closeWebRTCConnectingMask();
    }
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
  }]);

  return EvIntegratedSoftphone;
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "muteActive", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sipRegisterSuccess", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "sipRegistering", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "webRTCTabId", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "connectingAlertId", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setConnectingAlertId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setConnectingAlertId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetController", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetController"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setMuteActive", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setMuteActive"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setWebRTCTabId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setWebRTCTabId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetSip", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetSip"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSipRegisterSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setSipRegisterSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSipRegistering", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setSipRegistering"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_playAudio", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "_playAudio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_stopAudio", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "_stopAudio"), _class2.prototype)), _class2)) || _class);
exports.EvIntegratedSoftphone = EvIntegratedSoftphone;
//# sourceMappingURL=EvIntegratedSoftphone.js.map
