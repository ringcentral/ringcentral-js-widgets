"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _ramda = require("ramda");

var _di = require("@ringcentral-integration/commons/lib/di");

var _RcVideoV = require("@ringcentral-integration/commons/modules/RcVideoV2");

var _RcUIModule2 = _interopRequireDefault(require("../../lib/RcUIModule"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var GenericMeetingUI = (_dec = (0, _di.Module)({
  name: 'GenericMeetingUI',
  deps: ['GenericMeeting', 'AppFeatures', 'Locale', 'RateLimiter', 'ConnectivityMonitor']
}), _dec(_class = /*#__PURE__*/function (_RcUIModule) {
  _inherits(GenericMeetingUI, _RcUIModule);

  var _super = _createSuper(GenericMeetingUI);

  function GenericMeetingUI(_ref) {
    var _this;

    var genericMeeting = _ref.genericMeeting,
        locale = _ref.locale,
        rateLimiter = _ref.rateLimiter,
        connectivityMonitor = _ref.connectivityMonitor,
        appFeatures = _ref.appFeatures,
        options = _objectWithoutProperties(_ref, ["genericMeeting", "locale", "rateLimiter", "connectivityMonitor", "appFeatures"]);

    _classCallCheck(this, GenericMeetingUI);

    _this = _super.call(this, _objectSpread({}, options));
    _this._genericMeeting = void 0;
    _this._appFeatures = void 0;
    _this._locale = void 0;
    _this._rateLimiter = void 0;
    _this._connectivityMonitor = void 0;
    _this._genericMeeting = genericMeeting;
    _this._appFeatures = appFeatures;
    _this._locale = locale;
    _this._rateLimiter = rateLimiter;
    _this._connectivityMonitor = connectivityMonitor;
    return _this;
  }

  _createClass(GenericMeetingUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref2) {
      var _settingLock, _meeting$settingLock, _settingLock2, _settingLock3, _settingLock4;

      var useRcmV2 = _ref2.useRcmV2,
          disabled = _ref2.disabled,
          showTopic = _ref2.showTopic,
          showWhen = _ref2.showWhen,
          showDuration = _ref2.showDuration,
          openNewWindow = _ref2.openNewWindow,
          labelPlacement = _ref2.labelPlacement,
          showRecurringMeeting = _ref2.showRecurringMeeting,
          scheduleButton = _ref2.scheduleButton,
          datePickerSize = _ref2.datePickerSize,
          timePickerSize = _ref2.timePickerSize,
          recurringMeetingPosition = _ref2.recurringMeetingPosition,
          _ref2$showRcvAdminLoc = _ref2.showRcvAdminLock,
          showRcvAdminLock = _ref2$showRcvAdminLoc === void 0 ? false : _ref2$showRcvAdminLoc,
          _ref2$configDisabled = _ref2.configDisabled,
          configDisabled = _ref2$configDisabled === void 0 ? false : _ref2$configDisabled;
      var isRCM = this._genericMeeting.isRCM;
      var isRCV = this._genericMeeting.isRCV;
      var meeting = this._genericMeeting.ready && this._genericMeeting.meeting || {};
      var delegators = this._genericMeeting.ready && this._genericMeeting.delegators || [];
      var isDelegator = false;

      if (isRCV) {
        var user = (0, _ramda.find)(function (item) {
          return item.extensionId === meeting.extensionId;
        }, delegators);
        isDelegator = user && !user.isLoginUser;
      }

      var enableWaitingRoom = this._genericMeeting.ready && this._genericMeeting.enableWaitingRoom;
      var isAllOptionDisabled = !!(disabled || !meeting.isMeetingPasswordValid || this._genericMeeting.ready && this._genericMeeting.isScheduling || this._connectivityMonitor && !this._connectivityMonitor.connectivity || this._rateLimiter && this._rateLimiter.throttling);
      var showE2EE = this._genericMeeting.ready && this._genericMeeting.enableE2EE;
      /** for rcv part * */

      var _ref3 = meeting,
          settingLock = _ref3.settingLock,
          e2ee = _ref3.e2ee,
          isOnlyCoworkersJoin = _ref3.isOnlyCoworkersJoin; // when e2ee is on, waiting room&auth can join&require password&jbh will be disabled and turn on.

      var isE2eeRelatedOptionsDisabled = showE2EE && e2ee;
      var isE2EEDisabled = showE2EE && (this._appFeatures.ready && !this._appFeatures.hasVideoE2EE || settingLock.e2ee || (0, _ramda.any)(function (key) {
        return settingLock[key] && meeting[key] === _RcVideoV.DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH[key];
      })(Object.keys(_RcVideoV.DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH)));
      var authUserTypeValue = isOnlyCoworkersJoin ? _RcVideoV.AUTH_USER_TYPE.SIGNED_IN_CO_WORKERS : _RcVideoV.AUTH_USER_TYPE.SIGNED_IN_USERS;
      /** for rcv part * */

      return {
        isRCV: isRCV,
        isRCM: isRCM,
        meeting: meeting,
        useRcmV2: useRcmV2,
        showWhen: showWhen,
        showTopic: showTopic,
        delegators: delegators,
        showDuration: showDuration,
        openNewWindow: openNewWindow,
        scheduleButton: scheduleButton,
        labelPlacement: labelPlacement,
        datePickerSize: datePickerSize,
        timePickerSize: timePickerSize,
        showRcvAdminLock: showRcvAdminLock,
        recurringMeetingPosition: recurringMeetingPosition,
        showE2EE: showE2EE,
        isE2EEDisabled: isE2EEDisabled,
        currentLocale: this._locale.currentLocale,
        disabled: isAllOptionDisabled,
        configDisabled: configDisabled,
        showScheduleOnBehalf: !!(delegators && delegators.length > 0),
        showRecurringMeeting: !meeting.usePersonalMeetingId && showRecurringMeeting,
        showSaveAsDefault: this._genericMeeting.ready && this._genericMeeting.showSaveAsDefault,
        // Need to add this back when we back to this ticket
        // https://jira.ringcentral.com/browse/RCINT-15031
        // disableSaveAsDefault:
        //   this._genericMeeting.ready &&
        //   !this._genericMeeting.isPreferencesChanged,
        disableSaveAsDefault: false,
        enableServiceWebSettings: this._genericMeeting.ready && this._genericMeeting.enableServiceWebSettings,
        enablePersonalMeeting: this._genericMeeting.ready && this._genericMeeting.enablePersonalMeeting,
        showWaitingRoom: enableWaitingRoom,
        // RCV AuthCanJoin
        authUserTypeValue: authUserTypeValue,
        personalMeetingId: this._genericMeeting.ready && this._genericMeeting.personalMeetingId,
        showSpinner: !!(!this._locale.ready || !this._genericMeeting.ready || !isRCM && !isRCV || !this._genericMeeting.meeting || this._connectivityMonitor && !this._connectivityMonitor.ready || this._rateLimiter && !this._rateLimiter.ready),
        showSpinnerInConfigPanel: this._genericMeeting.isUpdating,
        hasSettingsChanged: this._genericMeeting.hasSettingsChanged,
        defaultSetting: this._genericMeeting.defaultSetting,
        defaultTopic: this._genericMeeting.ready ? this._genericMeeting.defaultTopic : '',
        isPersonalMeetingDisabled: showE2EE && meeting.e2ee,

        /* RCV JBH */
        joinBeforeHostLabel: isDelegator ? _RcVideoV.JBH_LABEL.JOIN_AFTER_HOST : _RcVideoV.JBH_LABEL.JOIN_AFTER_ME,

        /* RCV option */
        isRequirePasswordDisabled: isE2eeRelatedOptionsDisabled || configDisabled || showRcvAdminLock && ((_settingLock = meeting.settingLock) === null || _settingLock === void 0 ? void 0 : _settingLock.isMeetingSecret),
        isJoinBeforeHostDisabled: isE2eeRelatedOptionsDisabled || configDisabled || showRcvAdminLock && ((_meeting$settingLock = meeting.settingLock) === null || _meeting$settingLock === void 0 ? void 0 : _meeting$settingLock.allowJoinBeforeHost) || enableWaitingRoom && meeting.waitingRoomMode === _RcVideoV.RCV_WAITING_ROOM_MODE.all,
        isWaitingRoomDisabled: isE2eeRelatedOptionsDisabled || configDisabled || showRcvAdminLock && ((_settingLock2 = meeting.settingLock) === null || _settingLock2 === void 0 ? void 0 : _settingLock2.waitingRoomMode),
        isWaitingRoomNotCoworkerDisabled: meeting.isOnlyCoworkersJoin,
        isWaitingRoomGuestDisabled: meeting.isOnlyAuthUserJoin || showE2EE && meeting.e2ee,
        isWaitingRoomAllDisabled: false,
        isAuthenticatedCanJoinDisabled: isE2eeRelatedOptionsDisabled || configDisabled || showRcvAdminLock && ((_settingLock3 = meeting.settingLock) === null || _settingLock3 === void 0 ? void 0 : _settingLock3.isOnlyAuthUserJoin),
        isAuthUserTypeDisabled: disabled || configDisabled || showRcvAdminLock && ((_settingLock4 = meeting.settingLock) === null || _settingLock4 === void 0 ? void 0 : _settingLock4.isOnlyCoworkersJoin),
        isSignedInUsersDisabled: false,
        isSignedInCoWorkersDisabled: false
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref4) {
      var _this2 = this;

      var _schedule = _ref4.schedule;
      return {
        switchUsePersonalMeetingId: function switchUsePersonalMeetingId(usePersonalMeetingId) {
          return _this2._genericMeeting.switchUsePersonalMeetingId(usePersonalMeetingId);
        },
        updateHasSettingsChanged: function updateHasSettingsChanged(isChanged) {
          _this2._genericMeeting.updateHasSettingsChanged(isChanged);
        },
        updateScheduleFor: function updateScheduleFor(userExtensionId) {
          return _this2._genericMeeting.updateScheduleFor(userExtensionId);
        },
        // TODO: any is reserved for RcM
        updateMeetingSettings: function updateMeetingSettings(value) {
          return _this2._genericMeeting.updateMeetingSettings(value);
        },
        validatePasswordSettings: function validatePasswordSettings(password, isSecret) {
          return _this2._genericMeeting.validatePasswordSettings(password, isSecret);
        },
        schedule: function schedule(meetingInfo, opener) {
          if (_schedule) {
            return _schedule(meetingInfo, opener);
          }

          return _this2._genericMeeting.schedule(meetingInfo, {}, opener);
        },
        init: function init() {
          return _this2._genericMeeting.init();
        },
        // TODO: Moving to RcVideo updateMeetingSettings would be better
        e2eeInteractFunc: function e2eeInteractFunc(e2eeValue) {
          if (!e2eeValue) {
            _this2._genericMeeting.updateMeetingSettings({
              e2ee: e2eeValue
            }); // when user turn on e2ee option in pmi meeting, should switch to non-pmi meeting

          } else if (_this2._genericMeeting.meeting.usePersonalMeetingId) {
            _this2._genericMeeting.switchUsePersonalMeetingId(false);

            _this2._genericMeeting.updateMeetingSettings(_objectSpread({
              e2ee: true
            }, _RcVideoV.RCV_E2EE_DEFAULT_SECURITY_OPTIONS));
          } else {
            _this2._genericMeeting.updateMeetingSettings(_objectSpread({
              e2ee: e2eeValue
            }, _RcVideoV.RCV_E2EE_DEFAULT_SECURITY_OPTIONS));
          }

          _this2._genericMeeting.updateHasSettingsChanged(true);
        }
      };
    }
  }]);

  return GenericMeetingUI;
}(_RcUIModule2["default"])) || _class);
exports["default"] = GenericMeetingUI;
//# sourceMappingURL=index.js.map
