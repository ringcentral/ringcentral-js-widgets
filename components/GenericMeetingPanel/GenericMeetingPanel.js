"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.function.name");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericMeetingPanel = void 0;
require("regenerator-runtime/runtime");
var _utils = require("@ringcentral-integration/utils");
var _react = _interopRequireWildcard(require("react"));
var _InnerTopic = require("../InnerTopic");
var _MeetingConfigsV = require("../MeetingConfigsV2");
var _SchedulerMeetingPanel = require("../SchedulerMeetingPanel");
var _SpinnerOverlay = require("../SpinnerOverlay");
var _VideoPanel = require("../VideoPanel");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var GenericMeetingPanel = function GenericMeetingPanel(props) {
  var topicRef = (0, _react.useRef)(null);
  var meeting = props.meeting,
    disabled = props.disabled,
    configDisabled = props.configDisabled,
    currentLocale = props.currentLocale,
    ScheduleButton = props.scheduleButton,
    recipientsSection = props.recipientsSection,
    showTopic = props.showTopic,
    showWhen = props.showWhen,
    showDuration = props.showDuration,
    showRecurringMeeting = props.showRecurringMeeting,
    openNewWindow = props.openNewWindow,
    meetingOptionToggle = props.meetingOptionToggle,
    audioOptionToggle = props.audioOptionToggle,
    onOK = props.onOK,
    init = props.init,
    showSaveAsDefault = props.showSaveAsDefault,
    disableSaveAsDefault = props.disableSaveAsDefault,
    updateMeetingSettings = props.updateMeetingSettings,
    onCloseMigrationAlert = props.onCloseMigrationAlert,
    isRCM = props.isRCM,
    isRCV = props.isRCV,
    datePickerSize = props.datePickerSize,
    timePickerSize = props.timePickerSize,
    checkboxSize = props.checkboxSize,
    showLaunchMeetingBtn = props.showLaunchMeetingBtn,
    launchMeeting = props.launchMeeting,
    scheduleButtonLabel = props.scheduleButtonLabel,
    appCode = props.appCode,
    schedule = props.schedule,
    showSpinner = props.showSpinner,
    showRcvAdminLock = props.showRcvAdminLock,
    showPmiConfirm = props.showPmiConfirm,
    enablePersonalMeeting = props.enablePersonalMeeting,
    isPmiChangeConfirmed = props.isPmiChangeConfirmed,
    onPmiChangeClick = props.onPmiChangeClick,
    showWaitingRoom = props.showWaitingRoom,
    showE2EE = props.showE2EE,
    isE2EEDisabled = props.isE2EEDisabled,
    showAllowAnyoneRecord = props.showAllowAnyoneRecord,
    showAllowAnyoneTranscribe = props.showAllowAnyoneTranscribe,
    personalMeetingId = props.personalMeetingId,
    personalMeetingName = props.personalMeetingName,
    switchUsePersonalMeetingId = props.switchUsePersonalMeetingId,
    trackSettingChanges = props.trackSettingChanges,
    e2eeInteractFunc = props.e2eeInteractFunc,
    showScheduleOnBehalf = props.showScheduleOnBehalf,
    delegators = props.delegators,
    joinBeforeHostLabel = props.joinBeforeHostLabel,
    authUserTypeValue = props.authUserTypeValue,
    isJoinBeforeHostDisabled = props.isJoinBeforeHostDisabled,
    isPasswordFieldDisabled = props.isPasswordFieldDisabled,
    isAllowToRecordDisabled = props.isAllowToRecordDisabled,
    isAllowAnyoneTranscribeDisabled = props.isAllowAnyoneTranscribeDisabled,
    isMuteAudioDisabled = props.isMuteAudioDisabled,
    isTurnOffCameraDisabled = props.isTurnOffCameraDisabled,
    isAllowScreenSharingDisabled = props.isAllowScreenSharingDisabled,
    isAuthenticatedCanJoinDisabled = props.isAuthenticatedCanJoinDisabled,
    isRequirePasswordDisabled = props.isRequirePasswordDisabled,
    isWaitingRoomDisabled = props.isWaitingRoomDisabled,
    isWaitingRoomNotCoworkerDisabled = props.isWaitingRoomNotCoworkerDisabled,
    isWaitingRoomGuestDisabled = props.isWaitingRoomGuestDisabled,
    isAuthUserTypeDisabled = props.isAuthUserTypeDisabled,
    isWaitingRoomTypeDisabled = props.isWaitingRoomTypeDisabled,
    updateScheduleFor = props.updateScheduleFor,
    labelPlacement = props.labelPlacement,
    showSpinnerInConfigPanel = props.showSpinnerInConfigPanel,
    enableServiceWebSettings = props.enableServiceWebSettings,
    recurringMeetingPosition = props.recurringMeetingPosition,
    defaultTopic = props.defaultTopic,
    isPersonalMeetingDisabled = props.isPersonalMeetingDisabled,
    showMigrationAlert = props.showMigrationAlert,
    showRemoveMeetingWarning = props.showRemoveMeetingWarning,
    brandConfig = props.brandConfig,
    useSimpleRcv = props.useSimpleRcv;
  if (showSpinner) {
    return /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null);
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].wrapper
  }, showRemoveMeetingWarning && /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].mask
  }), isRCM && /*#__PURE__*/_react["default"].createElement(_MeetingConfigsV.MeetingConfigs
  // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
  , {
    disabled: configDisabled,
    defaultTopic: defaultTopic,
    showSpinnerInConfigPanel: showSpinnerInConfigPanel,
    updateMeetingSettings: updateMeetingSettings,
    personalMeetingId: personalMeetingId,
    switchUsePersonalMeetingId: switchUsePersonalMeetingId,
    onCloseMigrationAlert: onCloseMigrationAlert,
    init: init,
    labelPlacement: labelPlacement,
    meeting: meeting,
    currentLocale: currentLocale,
    recipientsSection: recipientsSection,
    showTopic: showTopic,
    showWhen: showWhen,
    showDuration: showDuration,
    showRecurringMeeting: showRecurringMeeting,
    meetingOptionToggle: meetingOptionToggle,
    audioOptionToggle: audioOptionToggle,
    showScheduleOnBehalf: showScheduleOnBehalf
    // @ts-expect-error TS(2322): Type 'RcvDelegator[] | undefined' is not assignabl... Remove this comment to see the full error message
    ,
    delegators: delegators,
    updateScheduleFor: updateScheduleFor,
    trackSettingChanges: trackSettingChanges,
    enableServiceWebSettings: enableServiceWebSettings,
    recurringMeetingPosition: recurringMeetingPosition,
    datePickerSize: datePickerSize,
    timePickerSize: timePickerSize,
    checkboxSize: checkboxSize,
    showMigrationAlert: showMigrationAlert,
    showRemoveMeetingWarning: showRemoveMeetingWarning,
    brandConfig: brandConfig
  }, showTopic && /*#__PURE__*/_react["default"].createElement(_InnerTopic.Topic, {
    name: meeting.topic,
    updateMeetingTopic: function updateMeetingTopic(topic) {
      updateMeetingSettings(_objectSpread(_objectSpread({}, meeting), {}, {
        topic: topic
      }));
    },
    currentLocale: currentLocale,
    ref: topicRef,
    defaultTopic: defaultTopic
  })), isRCV && !useSimpleRcv && /*#__PURE__*/_react["default"].createElement(_VideoPanel.VideoConfig, {
    disabled: configDisabled,
    showAllowAnyoneRecord: showAllowAnyoneRecord,
    showAllowAnyoneTranscribe: showAllowAnyoneTranscribe,
    isPersonalMeetingDisabled: isPersonalMeetingDisabled,
    currentLocale: currentLocale,
    labelPlacement: labelPlacement,
    meeting: meeting,
    e2eeInteractFunc: e2eeInteractFunc,
    updateScheduleFor: updateScheduleFor,
    updateMeetingSettings: updateMeetingSettings,
    onCloseMigrationAlert: onCloseMigrationAlert,
    recipientsSection: recipientsSection,
    showWhen: showWhen,
    showDuration: showDuration,
    init: init,
    datePickerSize: datePickerSize,
    timePickerSize: timePickerSize,
    checkboxSize: checkboxSize,
    showRcvAdminLock: showRcvAdminLock,
    showPmiConfirm: showPmiConfirm,
    showWaitingRoom: showWaitingRoom,
    showE2EE: showE2EE,
    isE2EEDisabled: isE2EEDisabled,
    isWaitingRoomNotCoworkerDisabled: isWaitingRoomNotCoworkerDisabled,
    isWaitingRoomGuestDisabled: isWaitingRoomGuestDisabled,
    isAuthUserTypeDisabled: isAuthUserTypeDisabled,
    isWaitingRoomTypeDisabled: isWaitingRoomTypeDisabled,
    enablePersonalMeeting: enablePersonalMeeting,
    isPmiChangeConfirmed: isPmiChangeConfirmed,
    personalMeetingId: personalMeetingId,
    personalMeetingName: personalMeetingName,
    switchUsePersonalMeetingId: switchUsePersonalMeetingId,
    trackSettingChanges: trackSettingChanges,
    onPmiChangeClick: onPmiChangeClick,
    showScheduleOnBehalf: showScheduleOnBehalf,
    showSpinnerInConfigPanel: showSpinnerInConfigPanel,
    delegators: delegators,
    joinBeforeHostLabel: joinBeforeHostLabel,
    authUserTypeValue: authUserTypeValue,
    isJoinBeforeHostDisabled: isJoinBeforeHostDisabled,
    isPasswordFieldDisabled: isPasswordFieldDisabled,
    isAllowToRecordDisabled: isAllowToRecordDisabled,
    isAllowAnyoneTranscribeDisabled: isAllowAnyoneTranscribeDisabled,
    isMuteAudioDisabled: isMuteAudioDisabled,
    isTurnOffCameraDisabled: isTurnOffCameraDisabled,
    isAllowScreenSharingDisabled: isAllowScreenSharingDisabled,
    isAuthenticatedCanJoinDisabled: isAuthenticatedCanJoinDisabled,
    isWaitingRoomDisabled: isWaitingRoomDisabled,
    isRequirePasswordDisabled: isRequirePasswordDisabled,
    showMigrationAlert: showMigrationAlert,
    showRemoveMeetingWarning: showRemoveMeetingWarning,
    brandConfig: brandConfig
  }, showTopic && /*#__PURE__*/_react["default"].createElement(_InnerTopic.Topic, {
    name: meeting.name,
    updateMeetingTopic: function updateMeetingTopic(name) {
      updateMeetingSettings({
        name: name
      });
    },
    currentLocale: currentLocale,
    ref: topicRef,
    defaultTopic: defaultTopic
  })), isRCV && useSimpleRcv && /*#__PURE__*/_react["default"].createElement(_SchedulerMeetingPanel.SchedulerMeetingPanel, _extends({}, props, {
    disabled: configDisabled,
    meeting: meeting,
    personalMeeting: props.personalMeeting
  })), (isRCM || isRCV) && ScheduleButton && /*#__PURE__*/_react["default"].createElement(ScheduleButton, {
    currentLocale: currentLocale,
    disabled: disabled,
    meeting: meeting
    // @ts-expect-error TS(2322): Type '(() => any) | undefined' is not assignable t... Remove this comment to see the full error message
    ,
    onOK: onOK,
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _topicRef$current, _topicRef$current2, opener, meetingSetting;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (disabled) {
                _context.next = 5;
                break;
              }
              opener = openNewWindow && (0, _utils.isSafari)() ? window.open() : null;
              meetingSetting = isRCM ? _objectSpread(_objectSpread({}, meeting), {}, {
                topic: (_topicRef$current = topicRef.current) === null || _topicRef$current === void 0 ? void 0 : _topicRef$current.value
              }) : _objectSpread(_objectSpread({}, meeting), {}, {
                name: (_topicRef$current2 = topicRef.current) === null || _topicRef$current2 === void 0 ? void 0 : _topicRef$current2.value
              });
              _context.next = 5;
              return schedule === null || schedule === void 0 ? void 0 : schedule(meetingSetting, opener);
            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })),
    update: updateMeetingSettings
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    ,
    showSaveAsDefault: showSaveAsDefault
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    ,
    disableSaveAsDefault: disableSaveAsDefault
    // @ts-expect-error TS(2322): Type '(() => any) | undefined' is not assignable t... Remove this comment to see the full error message
    ,
    launchMeeting: launchMeeting,
    showLaunchMeetingBtn: showLaunchMeetingBtn,
    appCode: appCode,
    scheduleButtonLabel: scheduleButtonLabel
  }));
};
exports.GenericMeetingPanel = GenericMeetingPanel;
GenericMeetingPanel.defaultProps = {
  launchMeeting: function launchMeeting() {
    //
  },
  disabled: false,
  showWhen: true,
  showTopic: true,
  showDuration: true,
  showRecurringMeeting: true,
  openNewWindow: true,
  meetingOptionToggle: false,
  audioOptionToggle: false,
  onOK: undefined,
  scheduleButton: undefined,
  showRcvAdminLock: false,
  showPmiConfirm: false,
  showWaitingRoom: false,
  showE2EE: false,
  isE2EEDisabled: false,
  isWaitingRoomNotCoworkerDisabled: false,
  isWaitingRoomGuestDisabled: false,
  isAuthUserTypeDisabled: false,
  isWaitingRoomTypeDisabled: false,
  enablePersonalMeeting: false,
  isPmiChangeConfirmed: false,
  showSaveAsDefault: true,
  disableSaveAsDefault: false,
  showLaunchMeetingBtn: false,
  appCode: '',
  scheduleButtonLabel: '',
  personalMeetingId: undefined,
  personalMeetingName: undefined,
  showSpinner: false,
  labelPlacement: 'start',
  enableServiceWebSettings: false,
  recurringMeetingPosition: 'middle'
};
//# sourceMappingURL=GenericMeetingPanel.js.map
