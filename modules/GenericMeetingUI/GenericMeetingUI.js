"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericMeetingUI = void 0;

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _ramda = require("ramda");

var _di = require("@ringcentral-integration/commons/lib/di");

var _RcVideoV = require("@ringcentral-integration/commons/modules/RcVideoV2");

var _core = require("@ringcentral-integration/core");

var _i18n = _interopRequireDefault(require("./i18n"));

var _dec, _class, _class2, _descriptor;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var GenericMeetingUI = (_dec = (0, _di.Module)({
  name: 'GenericMeetingUI',
  deps: ['GenericMeeting', 'AppFeatures', 'Locale', 'ModalUI', 'RateLimiter', 'ConnectivityMonitor']
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(GenericMeetingUI, _RcUIModuleV);

  var _super = _createSuper(GenericMeetingUI);

  function GenericMeetingUI(deps) {
    var _this;

    _classCallCheck(this, GenericMeetingUI);

    _this = _super.call(this, {
      deps: deps
    });

    _initializerDefineProperty(_this, "isPmiChangeConfirmed", _descriptor, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(GenericMeetingUI, [{
    key: "setIsPmiChangeConfirmed",
    value: function setIsPmiChangeConfirmed(status) {
      this.isPmiChangeConfirmed = status;
    }
  }, {
    key: "getRcvConfig",
    value: function getRcvConfig(_ref) {
      var _meeting$settingLock2, _meeting$settingLock3, _meeting$settingLock4, _meeting$settingLock5, _meeting$settingLock6, _meeting$settingLock7, _meeting$settingLock8;

      var _ref$disabled = _ref.disabled,
          disabled = _ref$disabled === void 0 ? false : _ref$disabled,
          _ref$showRcvAdminLock = _ref.showRcvAdminLock,
          showRcvAdminLock = _ref$showRcvAdminLock === void 0 ? false : _ref$showRcvAdminLock,
          _ref$configDisabled = _ref.configDisabled,
          configDisabled = _ref$configDisabled === void 0 ? false : _ref$configDisabled,
          _ref$showPmiConfirm = _ref.showPmiConfirm,
          showPmiConfirm = _ref$showPmiConfirm === void 0 ? false : _ref$showPmiConfirm;
      var isDelegator = false;
      var meeting = this.meeting;
      var delegators = this.delegators;
      var user = (0, _ramda.find)(function (item) {
        return item.extensionId === meeting.extensionId;
      }, delegators);
      isDelegator = user && !user.isLoginUser;
      var enableWaitingRoom = this._deps.genericMeeting.ready && this._deps.genericMeeting.enableWaitingRoom;
      var showE2EE = this._deps.genericMeeting.ready && this._deps.genericMeeting.enableE2EE;
      var _meeting$settingLock = meeting.settingLock,
          settingLock = _meeting$settingLock === void 0 ? {} : _meeting$settingLock,
          e2ee = meeting.e2ee,
          isOnlyCoworkersJoin = meeting.isOnlyCoworkersJoin;
      var isPmiConfigDisabled = configDisabled || showPmiConfirm && this.meeting.usePersonalMeetingId && !this.isPmiChangeConfirmed; // when e2ee is on, waiting room&auth can join&require password&jbh will be disabled and turn on.

      var isE2eeRelatedOptionsDisabled = showE2EE && e2ee;
      var isE2EEDisabled = showE2EE && (this._deps.appFeatures.ready && !this._deps.appFeatures.hasVideoE2EE || settingLock.e2ee || (0, _ramda.any)(function (key) {
        return settingLock[key] && meeting[key] === _RcVideoV.DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH[key];
      })(Object.keys(_RcVideoV.DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH)));
      var authUserTypeValue = isOnlyCoworkersJoin ? _RcVideoV.AUTH_USER_TYPE.SIGNED_IN_CO_WORKERS : _RcVideoV.AUTH_USER_TYPE.SIGNED_IN_USERS;
      return {
        meeting: meeting,
        showE2EE: showE2EE,
        delegators: delegators,
        isE2EEDisabled: isE2EEDisabled,
        authUserTypeValue: authUserTypeValue,
        isE2eeRelatedOptionsDisabled: isE2eeRelatedOptionsDisabled,
        showWaitingRoom: enableWaitingRoom,
        isPersonalMeetingDisabled: showE2EE && meeting.e2ee,
        joinBeforeHostLabel: isDelegator ? _RcVideoV.JBH_LABEL.JOIN_AFTER_HOST : _RcVideoV.JBH_LABEL.JOIN_AFTER_ME,
        isRequirePasswordDisabled: isE2eeRelatedOptionsDisabled || isPmiConfigDisabled || configDisabled || showRcvAdminLock && ((_meeting$settingLock2 = meeting.settingLock) === null || _meeting$settingLock2 === void 0 ? void 0 : _meeting$settingLock2.isMeetingSecret),
        isJoinBeforeHostDisabled: configDisabled || isPmiConfigDisabled || showRcvAdminLock && ((_meeting$settingLock3 = meeting.settingLock) === null || _meeting$settingLock3 === void 0 ? void 0 : _meeting$settingLock3.allowJoinBeforeHost) || enableWaitingRoom && meeting.waitingRoomMode === _RcVideoV.RCV_WAITING_ROOM_MODE.all,
        isMuteAudioDisabled: configDisabled || isPmiConfigDisabled,
        isTurnOffCameraDisabled: configDisabled || isPmiConfigDisabled,
        isAllowScreenSharingDisabled: configDisabled || isPmiConfigDisabled || showRcvAdminLock && ((_meeting$settingLock4 = meeting.settingLock) === null || _meeting$settingLock4 === void 0 ? void 0 : _meeting$settingLock4.allowScreenSharing),
        isWaitingRoomDisabled: isE2eeRelatedOptionsDisabled || isPmiConfigDisabled || configDisabled || showRcvAdminLock && ((_meeting$settingLock5 = meeting.settingLock) === null || _meeting$settingLock5 === void 0 ? void 0 : _meeting$settingLock5.waitingRoomMode),
        isWaitingRoomTypeDisabled: disabled || configDisabled || isPmiConfigDisabled || showRcvAdminLock && ((_meeting$settingLock6 = meeting.settingLock) === null || _meeting$settingLock6 === void 0 ? void 0 : _meeting$settingLock6.waitingRoomMode),
        isWaitingRoomNotCoworkerDisabled: meeting.isOnlyCoworkersJoin,
        isWaitingRoomGuestDisabled: meeting.isOnlyAuthUserJoin || showE2EE && meeting.e2ee,
        isWaitingRoomAllDisabled: false,
        isAuthenticatedCanJoinDisabled: isE2eeRelatedOptionsDisabled || configDisabled || isPmiConfigDisabled || showRcvAdminLock && ((_meeting$settingLock7 = meeting.settingLock) === null || _meeting$settingLock7 === void 0 ? void 0 : _meeting$settingLock7.isOnlyAuthUserJoin),
        isAuthUserTypeDisabled: disabled || configDisabled || isPmiConfigDisabled || showRcvAdminLock && ((_meeting$settingLock8 = meeting.settingLock) === null || _meeting$settingLock8 === void 0 ? void 0 : _meeting$settingLock8.isOnlyCoworkersJoin),
        isSignedInUsersDisabled: false,
        isSignedInCoWorkersDisabled: false
      };
    }
  }, {
    key: "getRcmConfig",
    value: function getRcmConfig(_ref2) {
      var _this$meeting;

      var showRecurringMeeting = _ref2.showRecurringMeeting;
      return {
        delegators: this.delegators,
        showRecurringMeeting: !((_this$meeting = this.meeting) === null || _this$meeting === void 0 ? void 0 : _this$meeting.usePersonalMeetingId) && showRecurringMeeting
      };
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(props) {
      var _this$meeting2;

      var useRcmV2 = props.useRcmV2,
          disabled = props.disabled,
          showTopic = props.showTopic,
          showWhen = props.showWhen,
          showDuration = props.showDuration,
          openNewWindow = props.openNewWindow,
          labelPlacement = props.labelPlacement,
          scheduleButton = props.scheduleButton,
          datePickerSize = props.datePickerSize,
          timePickerSize = props.timePickerSize,
          recurringMeetingPosition = props.recurringMeetingPosition,
          _props$showRcvAdminLo = props.showRcvAdminLock,
          showRcvAdminLock = _props$showRcvAdminLo === void 0 ? false : _props$showRcvAdminLo,
          _props$showPmiConfirm = props.showPmiConfirm,
          showPmiConfirm = _props$showPmiConfirm === void 0 ? false : _props$showPmiConfirm,
          _props$configDisabled = props.configDisabled,
          configDisabled = _props$configDisabled === void 0 ? false : _props$configDisabled;
      var isRCM = this._deps.genericMeeting.isRCM;
      var isRCV = this._deps.genericMeeting.isRCV;
      var isAllOptionDisabled = !!(disabled || !((_this$meeting2 = this.meeting) === null || _this$meeting2 === void 0 ? void 0 : _this$meeting2.isMeetingPasswordValid) || this._deps.genericMeeting.ready && this._deps.genericMeeting.isScheduling || this._deps.connectivityMonitor && !this._deps.connectivityMonitor.connectivity || this._deps.rateLimiter && this._deps.rateLimiter.throttling);
      var config = isRCM ? this.getRcmConfig(props) : this.getRcvConfig(props);
      return _objectSpread({
        isRCV: isRCV,
        isRCM: isRCM,
        useRcmV2: useRcmV2,
        showWhen: showWhen,
        showTopic: showTopic,
        showDuration: showDuration,
        openNewWindow: openNewWindow,
        scheduleButton: scheduleButton,
        labelPlacement: labelPlacement,
        datePickerSize: datePickerSize,
        timePickerSize: timePickerSize,
        showRcvAdminLock: showRcvAdminLock,
        showPmiConfirm: showPmiConfirm,
        recurringMeetingPosition: recurringMeetingPosition,
        meeting: this.meeting,
        currentLocale: this._deps.locale.currentLocale,
        disabled: isAllOptionDisabled,
        configDisabled: configDisabled,
        showScheduleOnBehalf: !!(this.delegators && this.delegators.length > 0),
        showSaveAsDefault: this._deps.genericMeeting.ready && this._deps.genericMeeting.showSaveAsDefault,
        // Need to add this back when we back to this ticket
        // https://jira.ringcentral.com/browse/RCINT-15031
        // disableSaveAsDefault:
        //   this._deps.genericMeeting.ready &&
        //   !this._deps.genericMeeting.isPreferencesChanged,
        disableSaveAsDefault: false,
        enableServiceWebSettings: this._deps.genericMeeting.ready && this._deps.genericMeeting.enableServiceWebSettings,
        enablePersonalMeeting: this._deps.genericMeeting.ready && this._deps.genericMeeting.enablePersonalMeeting,
        personalMeetingId: this._deps.genericMeeting.ready && this._deps.genericMeeting.personalMeetingId,
        showSpinner: !!(!this._deps.locale.ready || !this._deps.genericMeeting.ready || !isRCM && !isRCV || !this._deps.genericMeeting.meeting || this._deps.connectivityMonitor && !this._deps.connectivityMonitor.ready || this._deps.rateLimiter && !this._deps.rateLimiter.ready),
        showSpinnerInConfigPanel: this._deps.genericMeeting.isUpdating,
        hasSettingsChanged: this._deps.genericMeeting.hasSettingsChanged,
        defaultSetting: this._deps.genericMeeting.defaultSetting,
        defaultTopic: this._deps.genericMeeting.ready ? this._deps.genericMeeting.defaultTopic : '',
        isPmiChangeConfirmed: this.isPmiChangeConfirmed
      }, config);
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref3) {
      var _this2 = this;

      var _schedule = _ref3.schedule;
      return {
        switchUsePersonalMeetingId: function switchUsePersonalMeetingId(usePersonalMeetingId) {
          _this2._deps.genericMeeting.switchUsePersonalMeetingId(usePersonalMeetingId); // reset pmi change confirm popup


          if (usePersonalMeetingId) {
            _this2.setIsPmiChangeConfirmed(false);
          }

          _this2._deps.genericMeeting.updateHasSettingsChanged(true);
        },
        updateScheduleFor: function updateScheduleFor(userExtensionId) {
          return _this2._deps.genericMeeting.updateScheduleFor(userExtensionId);
        },
        // TODO: any is reserved for RcM
        updateMeetingSettings: function updateMeetingSettings(value) {
          _this2._deps.genericMeeting.updateHasSettingsChanged(true);

          _this2._deps.genericMeeting.updateMeetingSettings(value);
        },
        validatePasswordSettings: function validatePasswordSettings(password, isSecret) {
          return _this2._deps.genericMeeting.validatePasswordSettings(password, isSecret);
        },
        schedule: function schedule(meetingInfo, opener) {
          if (_schedule) {
            return _schedule(meetingInfo, opener);
          }

          return _this2._deps.genericMeeting.schedule(meetingInfo, {}, opener);
        },
        init: function init() {
          return _this2._deps.genericMeeting.init();
        },
        // TODO: Moving to RcVideo updateMeetingSettings would be better
        e2eeInteractFunc: function e2eeInteractFunc(e2eeValue) {
          if (!e2eeValue) {
            _this2._deps.genericMeeting.updateMeetingSettings({
              e2ee: e2eeValue
            }); // when user turn on e2ee option in pmi meeting, should switch to non-pmi meeting

          } else if (_this2._deps.genericMeeting.meeting.usePersonalMeetingId) {
            _this2._deps.genericMeeting.switchUsePersonalMeetingId(false);

            _this2._deps.genericMeeting.turnOnE2ee();
          } else {
            _this2._deps.genericMeeting.turnOnE2ee();
          }

          _this2._deps.genericMeeting.updateHasSettingsChanged(true);
        },
        onPmiChangeClick: function () {
          var _onPmiChangeClick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var currentLocale;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    currentLocale = _this2._deps.locale.currentLocale;

                    _this2._deps.modalUI.confirm({
                      maxWidth: 'xs',
                      childrenSize: _this2.isSmallScreen ? 'small' : 'medium',
                      title: _i18n["default"].getString('pmiChangeConfirmTitle', currentLocale),
                      content: _i18n["default"].getString('pmiChangeConfirmContext', currentLocale),
                      onConfirm: function onConfirm() {
                        _this2.setIsPmiChangeConfirmed(true);
                      },
                      confirmButtonText: _i18n["default"].getString('pmiChangeConfirmed', currentLocale),
                      cancelButtonText: _i18n["default"].getString('pmiChangeCancel', currentLocale)
                    });

                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function onPmiChangeClick() {
            return _onPmiChangeClick.apply(this, arguments);
          }

          return onPmiChangeClick;
        }()
      };
    }
  }, {
    key: "meeting",
    get: function get() {
      return this._deps.genericMeeting.ready && this._deps.genericMeeting.meeting || {};
    }
  }, {
    key: "delegators",
    get: function get() {
      return this._deps.genericMeeting.ready && this._deps.genericMeeting.delegators || [];
    }
  }, {
    key: "isSmallScreen",
    get: function get() {
      return document.body.clientWidth < 290;
    }
  }]);

  return GenericMeetingUI;
}(_core.RcUIModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "isPmiChangeConfirmed", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setIsPmiChangeConfirmed", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setIsPmiChangeConfirmed"), _class2.prototype)), _class2)) || _class);
exports.GenericMeetingUI = GenericMeetingUI;
//# sourceMappingURL=GenericMeetingUI.js.map
