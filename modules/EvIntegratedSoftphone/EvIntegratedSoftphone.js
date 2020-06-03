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

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _events = _interopRequireDefault(require("events"));

var _formatMessage = _interopRequireDefault(require("format-message"));

var _di = require("ringcentral-integration/lib/di");

var _enums = require("../../lib/EvClient/enums");

var _audios = require("./audios");

var _i18n = _interopRequireDefault(require("./i18n"));

var _enums2 = require("../../enums");

var _time = require("../../lib/time");

var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

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

var EvIntegratedSoftphone = (_dec = (0, _di.Module)({
  name: 'EvIntegratedSoftphone',
  deps: ['Locale', 'RouterInteraction', 'EvSessionConfig', 'EvSubscription', 'EvSettings', 'EvClient', 'Presence', 'Storage', 'Modal', 'Alert', {
    dep: 'EvIntegratedSoftphoneOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvIntegratedSoftphone, _RcModuleV);

  var _super = _createSuper(EvIntegratedSoftphone);

  function EvIntegratedSoftphone(_ref) {
    var _this;

    var locale = _ref.locale,
        routerInteraction = _ref.routerInteraction,
        evSessionConfig = _ref.evSessionConfig,
        evSubscription = _ref.evSubscription,
        evSettings = _ref.evSettings,
        evClient = _ref.evClient,
        storage = _ref.storage,
        presence = _ref.presence,
        modal = _ref.modal,
        alert = _ref.alert,
        _ref$enableCache = _ref.enableCache,
        enableCache = _ref$enableCache === void 0 ? true : _ref$enableCache;

    _classCallCheck(this, EvIntegratedSoftphone);

    _this = _super.call(this, {
      modules: {
        locale: locale,
        routerInteraction: routerInteraction,
        evSessionConfig: evSessionConfig,
        evSubscription: evSubscription,
        evSettings: evSettings,
        evClient: evClient,
        storage: storage,
        presence: presence,
        modal: modal,
        alert: alert
      },
      enableCache: enableCache,
      storageKey: 'EvIntegratedSoftphone'
    });
    _this.autoAnswerCheckFn = void 0;
    _this._audio = void 0;
    _this._eventEmitter = new _events["default"]();
    _this._answerModalId = null;
    _this.sipRegistering = false;

    _initializerDefineProperty(_this, "muteActive", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "softphoneRegistered", _descriptor2, _assertThisInitialized(_this));

    _this._initAudio();

    return _this;
  } // @state
  // dtmfString: string = '';


  _createClass(EvIntegratedSoftphone, [{
    key: "reset",
    // this is for dialPad click when on call
    // @action
    // sipSendDTMF(dtmf: string) {
    //   this.state.dtmfString += dtmf;
    //   this._modules.evClient.sipSendDTMF(dtmf);
    // }
    value: function reset() {
      // this.state.dtmfString = '';
      this.state.muteActive = false;
    }
  }, {
    key: "setMuteActive",
    value: function setMuteActive(state) {
      this.state.muteActive = state;
    }
  }, {
    key: "setSoftphoneRegistered",
    value: function setSoftphoneRegistered(state) {
      this.state.softphoneRegistered = state;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;

      this._modules.evSessionConfig.onTriggerConfig.push( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!_this2._modules.evSessionConfig.isIntegrated) {
                  _context.next = 5;
                  break;
                }

                _this2._bindingIntegratedSoftphone(); // when init set register to be false


                _this2.setSoftphoneRegistered(false);

                _context.next = 5;
                return _this2.askAudioPermission();

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
    }
  }, {
    key: "sipToggleMute",
    value: function sipToggleMute(state) {
      this._modules.evClient.sipToggleMute(state);
    }
  }, {
    key: "askAudioPermission",
    value: function () {
      var _askAudioPermission = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return navigator.mediaDevices.getUserMedia({
                  audio: true
                });

              case 3:
                _context2.next = 9;
                break;

              case 5:
                _context2.prev = 5;
                _context2.t0 = _context2["catch"](0);

                this._modules.alert.danger({
                  message: _enums2.EvSoftphoneEvents.AUDIO_STREAM_REJECTED,
                  backdrop: true
                });

                throw new Error('Need Audio permission');

              case 9:
                if (this.softphoneRegistered) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 12;
                return this._registerSoftphone();

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 5]]);
      }));

      function askAudioPermission() {
        return _askAudioPermission.apply(this, arguments);
      }

      return askAudioPermission;
    }()
  }, {
    key: "_bindingIntegratedSoftphone",
    value: function _bindingIntegratedSoftphone() {
      var _this3 = this;

      this._modules.evSubscription.subscribe(_enums.EvCallbackTypes.SIP_REGISTERED, function () {
        console.log('!!!!!!!SIP_REGISTERED');

        _this3.setSoftphoneRegistered(true);

        _this3._eventEmitter.emit(_enums2.EvSoftphoneEvents.REGISTERED);
      });

      this._modules.evSubscription.subscribe(_enums.EvCallbackTypes.SIP_UNREGISTERED, function () {
        console.log('!!!!!!!SIP_UNREGISTERED');

        _this3.setSoftphoneRegistered(false);
      });

      this._modules.evSubscription.subscribe(_enums.EvCallbackTypes.SIP_REGISTRATION_FAILED, function () {
        console.log('!!!!!!!SIP_REGISTRATION_FAILED');

        _this3._modules.alert.danger({
          message: _enums.EvCallbackTypes.SIP_REGISTRATION_FAILED,
          backdrop: true,
          ttl: 0
        });
      });

      this._modules.evSubscription.subscribe(_enums.EvCallbackTypes.SIP_RINGING, function (ringingCall) {
        console.log('!!!!!!!SIP_RINGING');

        if (_this3.autoAnswerCheckFn()) {
          return _this3._sipAnswer();
        }

        _this3._showRingingModal(ringingCall);
      });

      this._modules.evSubscription.subscribe(_enums.EvCallbackTypes.SIP_CONNECTED, function () {
        // console.info('!!!!!!!SIP_CONNECTED');
        _this3._modules.evSettings.setOffhook(true); // When connected reset all state


        _this3.reset();
      });

      this._modules.evSubscription.subscribe(_enums.EvCallbackTypes.SIP_ENDED, function () {
        // console.info('!!!!!!!SIP_ENDED');
        _this3._closeRingingModal();

        _this3._modules.evSettings.setOffhook(false);
      });

      this._modules.evSubscription.subscribe(_enums.EvCallbackTypes.SIP_MUTE, function () {
        _this3.setMuteActive(true);
      });

      this._modules.evSubscription.subscribe(_enums.EvCallbackTypes.SIP_UNMUTE, function () {
        _this3.setMuteActive(false);
      }); // TODO: that is update session config related feature
      // triggered by agentSDK if dial destination is changed on softphone registration
      // pass in autoStartOH, maintainOH and dial destination, needed for reconnect logic
      // this._modules.evSubscription.subscribe(
      //   EvCallbackTypes.SIP_DIAL_DEST_CHANGED,
      //   (data) => {
      //     console.info('!!!!!!!SIP_DIAL_DEST_CHANGED');
      //     // AgentSvc.setDialDest(data.dialDest),
      //     //   SessionSvc.attemptingSoftphoneReconnect &&
      //     //     (data.autoStartOH
      //     //       ? AgentSvc.offhookInit().then(
      //     //           function(result) {
      //     //             data.maintainOH && (AgentSvc.systemInitOffhook = !1);
      //     //           },
      //     //           function(err) {
      //     //             SessionSvc.showOffhookError(err.detail, data.maintainOH);
      //     //           },
      //     //         )
      //     //       : ($timeout(function() {
      //     //           'RNA-STATE' === AgentSvc.currentAgentState.baseState &&
      //     //             AgentSvc.setAgentState('AVAILABLE');
      //     //         }, 1e3),
      //     //         (SessionSvc.attemptingSoftphoneReconnect = !1),
      //     //         (SessionSvc.manualSoftphoneReconnect = !1)));
      //   },
      // );

    }
  }, {
    key: "_showRingingModal",
    value: function _showRingingModal(ringingCall) {
      var _this4 = this;

      this._playAudioLoop('ringtone');

      var displayName = ringingCall.data.request.from.displayName;
      this._answerModalId = this._modules.modal.confirm({
        title: _i18n["default"].getString('inviteModalTitle', this._modules.locale.currentLocale),
        content: (0, _formatMessage["default"])(_i18n["default"].getString('inviteModalContent', this._modules.locale.currentLocale), {
          displayName: displayName
        }),
        okText: _i18n["default"].getString('inviteModalAnswer', this._modules.locale.currentLocale),
        cancelText: _i18n["default"].getString('inviteModalReject', this._modules.locale.currentLocale),
        onOK: function onOK() {
          _this4._resetRingingModal();

          _this4._sipAnswer();
        },
        onCancel: function onCancel() {
          // when reject not show init fail
          _this4._resetRingingModal();

          _this4._modules.presence.showOffHookInitError = false;

          _this4._modules.evClient.sipReject();

          _this4._eventEmitter.emit(_enums2.EvSoftphoneEvents.CALL_REJECTED);
        }
      });
    }
  }, {
    key: "_closeRingingModal",
    value: function _closeRingingModal() {
      // if there is modal there, mean another cancel this call
      if (this._answerModalId) {
        this._modules.alert.info({
          message: _enums2.EvSoftphoneEvents.CALL_REJECTED,
          ttl: 0
        });

        this._modules.modal.close(this._answerModalId);

        this._answerModalId = null;

        this._stopAudio();
      }
    }
  }, {
    key: "_registerSoftphone",
    value: function () {
      var _registerSoftphone2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this5 = this;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.sipRegistering) {
                  _context3.next = 13;
                  break;
                }

                this.sipRegistering = true;

                this._modules.evClient.sipInit();

                this._modules.evClient.sipRegister();

                _context3.prev = 4;
                _context3.next = 7;
                return (0, _time.raceTimeout)(new Promise(function (resolve) {
                  return _this5._eventEmitter.once(_enums2.EvSoftphoneEvents.REGISTERED, resolve);
                }), {
                  timeout: 10 * 1000
                });

              case 7:
                _context3.next = 12;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](4);

                this._modules.evSubscription.emit(_enums.EvCallbackTypes.SIP_REGISTRATION_FAILED, null);

              case 12:
                this.sipRegistering = false;

              case 13:
                throw new Error('Sip is registering');

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 9]]);
      }));

      function _registerSoftphone() {
        return _registerSoftphone2.apply(this, arguments);
      }

      return _registerSoftphone;
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
      this._modules.evClient.sipAnswer();
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
  }]);

  return EvIntegratedSoftphone;
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "muteActive", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "softphoneRegistered", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "reset", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "reset"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setMuteActive", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setMuteActive"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setSoftphoneRegistered", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setSoftphoneRegistered"), _class2.prototype)), _class2)) || _class);
exports.EvIntegratedSoftphone = EvIntegratedSoftphone;
//# sourceMappingURL=EvIntegratedSoftphone.js.map
