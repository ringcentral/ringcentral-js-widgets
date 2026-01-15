"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.regexp.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoConfig = void 0;
var _meetingHelper = require("@ringcentral-integration/commons/helpers/meetingHelper");
var _RcVideo = require("@ringcentral-integration/commons/modules/RcVideo");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx4 = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _MeetingCalendarHelper = require("../../lib/MeetingCalendarHelper");
var _MeetingHelper = require("../../lib/MeetingHelper");
var _MeetingAlert = require("../MeetingAlert");
var _ExtendedTooltip = require("../MeetingConfigsV2/ExtendedTooltip");
var _SpinnerOverlay = require("../SpinnerOverlay");
var _SettingGroup = require("./SettingGroup");
var _VideoSecuritySettingItem = require("./VideoSecuritySettingItem");
var _constants = require("./constants");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
var _utils = require("./utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", " {\n    padding: ", ";\n  }\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var PanelRoot = _juno.styled.div(_templateObject(), _juno.RcCheckbox, (0, _juno.spacing)(2));
var VideoConfig = function VideoConfig(props) {
  var _meeting$settingLock, _meeting$settingLock2, _meeting$settingLock3, _meeting$settingLock4, _meeting$settingLock5, _meeting$settingLock6, _meeting$settingLock7, _meeting$allowAnyoneR, _meeting$settingLock8, _meeting$allowAnyoneT;
  var disabled = props.disabled,
    currentLocale = props.currentLocale,
    meeting = props.meeting,
    updateMeetingSettings = props.updateMeetingSettings,
    recipientsSection = props.recipientsSection,
    init = props.init,
    children = props.children,
    showWhen = props.showWhen,
    showDuration = props.showDuration,
    showRcvAdminLock = props.showRcvAdminLock,
    showPmiConfirm = props.showPmiConfirm,
    showAllowAnyoneRecord = props.showAllowAnyoneRecord,
    showAllowAnyoneTranscribe = props.showAllowAnyoneTranscribe,
    showWaitingRoom = props.showWaitingRoom,
    showE2EE = props.showE2EE,
    isE2EEDisabled = props.isE2EEDisabled,
    enablePersonalMeeting = props.enablePersonalMeeting,
    isPmiChangeConfirmed = props.isPmiChangeConfirmed,
    isPersonalMeetingDisabled = props.isPersonalMeetingDisabled,
    personalMeetingId = props.personalMeetingId,
    personalMeetingName = props.personalMeetingName,
    switchUsePersonalMeetingId = props.switchUsePersonalMeetingId,
    trackSettingChanges = props.trackSettingChanges,
    e2eeInteractFunc = props.e2eeInteractFunc,
    onPmiChangeClick = props.onPmiChangeClick,
    onCloseMigrationAlert = props.onCloseMigrationAlert,
    datePickerSize = props.datePickerSize,
    timePickerSize = props.timePickerSize,
    checkboxSize = props.checkboxSize,
    labelPlacement = props.labelPlacement,
    delegators = props.delegators,
    showScheduleOnBehalf = props.showScheduleOnBehalf,
    updateScheduleFor = props.updateScheduleFor,
    showSpinnerInConfigPanel = props.showSpinnerInConfigPanel,
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
    isAuthUserTypeDisabled = props.isAuthUserTypeDisabled,
    isWaitingRoomTypeDisabled = props.isWaitingRoomTypeDisabled,
    isWaitingRoomDisabled = props.isWaitingRoomDisabled,
    isRequirePasswordDisabled = props.isRequirePasswordDisabled,
    isWaitingRoomNotCoworkerDisabled = props.isWaitingRoomNotCoworkerDisabled,
    isWaitingRoomGuestDisabled = props.isWaitingRoomGuestDisabled,
    showRemoveMeetingWarning = props.showRemoveMeetingWarning,
    brandConfig = props.brandConfig,
    showMigrationAlert = props.showMigrationAlert;
  var hoursList = (0, _MeetingHelper.getHoursList)(_MeetingHelper.HOUR_SCALE, currentLocale);
  var minutesList = (0, _MeetingHelper.getMinutesList)(_MeetingHelper.MINUTE_SCALE, currentLocale);
  (0, _react.useEffect)(function () {
    if (init) {
      init();
    }
  }, []);
  var update = function update(options, itemName) {
    updateMeetingSettings(_objectSpread(_objectSpread({}, meeting), options));
    trackSettingChanges && itemName && trackSettingChanges(itemName);
  };

  /* Password validate interaction */
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isPasswordFocus = _useState2[0],
    setPasswordFocus = _useState2[1];
  var startTime = (0, _react.useMemo)(function () {
    return new Date(meeting.startTime);
  }, [meeting.startTime]);

  /* Scrollbar */
  var configRef = (0, _react.useRef)();
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    hasScrollBar = _useState4[0],
    setHasScrollBar = _useState4[1];
  (0, _react.useEffect)(function () {
    setHasScrollBar(
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    configRef.current.scrollHeight > configRef.current.clientHeight);
  }, []);
  var showPMI = (0, _react.useMemo)(function () {
    return enablePersonalMeeting && (personalMeetingId || personalMeetingName);
  }, [enablePersonalMeeting, personalMeetingId, personalMeetingName]);
  var getPMILabel = (0, _react.useCallback)(function () {
    if (personalMeetingName) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].pmiLabel
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: _styles["default"].text
      }, _i18n["default"].getString('usePersonalMeetingName', currentLocale)), "\xA0", /*#__PURE__*/_react["default"].createElement("span", {
        "data-sign": "personalMeetingName",
        title: personalMeetingName
      }, personalMeetingName));
    }
    var pmiId = (0, _MeetingCalendarHelper.formatMeetingId)(personalMeetingId, '-');
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].pmiLabel
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: _styles["default"].text
    }, _i18n["default"].getString('usePersonalMeetingId', currentLocale)), "\xA0", /*#__PURE__*/_react["default"].createElement("span", {
      "data-sign": "personalMeetingId",
      title: pmiId
    }, pmiId));
  }, [personalMeetingId, personalMeetingName, currentLocale]);
  return (
    /*#__PURE__*/
    // @ts-expect-error TS(2322): Type '{ children: Element; ref: MutableRefObject<H... Remove this comment to see the full error message
    _react["default"].createElement(PanelRoot, {
      ref: configRef,
      className: _styles["default"].videoConfig,
      "data-sign": "videoConfigsPanel"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].meetingContent
    }, showSpinnerInConfigPanel ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null) : null, showRemoveMeetingWarning && /*#__PURE__*/_react["default"].createElement(_SettingGroup.SettingGroup, {
      dataSign: "removeMeetingWarningPanel"
    }, /*#__PURE__*/_react["default"].createElement(_MeetingAlert.RemoveMeetingWarn, {
      brandConfig: brandConfig,
      currentLocale: currentLocale
    })), showMigrationAlert && brandConfig.substituteName && /*#__PURE__*/_react["default"].createElement(_MeetingAlert.MigrateToPluginAlert, {
      currentLocale: currentLocale,
      substituteName: brandConfig.substituteName,
      onCloseAlert: onCloseMigrationAlert
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _clsx4["default"])(_styles["default"].meetingSection, _styles["default"].gutterTop)
    }, children), recipientsSection ? /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].meetingSection
    }, recipientsSection) : null, showWhen ? /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].meetingSection
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].datePicker
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcDatePicker, {
      fullWidth: true,
      gutterBottom: true,
      label: _i18n["default"].getString('date', currentLocale),
      "data-sign": "date",
      value: startTime,
      clearBtn: false,
      formatString: "MM/DD/YYYY",
      size: datePickerSize,
      locale: currentLocale,
      todayButtonText: _i18n["default"].getString('today', currentLocale),
      onChange: function onChange(value) {
        update({
          // @ts-expect-error TS(2345): Argument of type 'Date | null' is not assignable t... Remove this comment to see the full error message
          startTime: (0, _meetingHelper.updateFullYear)(startTime, value)
        });
      }
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].timePicker
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcTimePicker, {
      fullWidth: true,
      gutterBottom: true,
      clearBtn: false,
      size: timePickerSize,
      label: _i18n["default"].getString('startTime', currentLocale),
      isTwelveHourSystem: true,
      "data-sign": "startTime",
      dateMode: true,
      value: startTime,
      onChange: function onChange(value) {
        update({
          // @ts-expect-error TS(2345): Argument of type 'Date | null' is not assignable t... Remove this comment to see the full error message
          startTime: (0, _meetingHelper.updateFullTime)(startTime, value)
        });
      }
    }))) : null, showDuration ? /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].meetingSection
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].hourDuration
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcSelect, {
      fullWidth: true,
      gutterBottom: true,
      "data-sign": "durationHour",
      value: Math.floor(meeting.duration / 60),
      onChange: function onChange(e) {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        var value = +e.target.value;
        var restMinutes = Math.floor(meeting.duration % 60);
        var durationInMinutes = value * 60 + restMinutes;
        update({
          duration: durationInMinutes
        });
      },
      className: _styles["default"].select,
      label: _i18n["default"].getString('duration', currentLocale)
    }, hoursList.map(function (item, i) {
      return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
        key: i
        // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
        ,
        value: item.value,
        "data-sign": "option".concat(i)
      }, item !== null ? item.text : 'defaultValue');
    }))), /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].minuteDuration
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcSelect, {
      fullWidth: true,
      gutterBottom: true,
      "data-sign": "durationMinute",
      required: true,
      value: Math.floor(meeting.duration % 60),
      onChange: function onChange(e) {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        var value = +e.target.value;
        var restHours = Math.floor(meeting.duration / 60);
        // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
        var isMax = restHours === hoursList.slice(-1)[0].value;
        var minutes = isMax ? 0 : value;
        var durationInMinutes = restHours * 60 + minutes;
        update({
          duration: durationInMinutes
        });
      }
    }, minutesList.map(function (item, i) {
      return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
        key: i
        // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
        ,
        value: item.value,
        "data-sign": "option".concat(i)
      }, item !== null ? item.text : 'defaultValue');
    })))) : null, showScheduleOnBehalf ? /*#__PURE__*/_react["default"].createElement(_SettingGroup.SettingGroup, {
      dataSign: "scheduleOnBehalfPanel",
      summary: /*#__PURE__*/_react["default"].createElement("span", {
        className: _styles["default"].flexVertical
      }, _i18n["default"].getString('scheduleFor', currentLocale), /*#__PURE__*/_react["default"].createElement(_ExtendedTooltip.ExtendedTooltip, {
        interactive: true,
        placement: "bottom",
        hasScrollBar: hasScrollBar,
        "data-sign": "scheduleForTooltip",
        title: /*#__PURE__*/_react["default"].createElement("div", {
          onClick: function onClick(e) {
            e.stopPropagation();
          }
        }, /*#__PURE__*/_react["default"].createElement("div", {
          "data-sign": "scheduleForGuidance",
          className: _styles["default"].preLine
        }, _i18n["default"].getString('scheduleForGuidance', currentLocale)), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_juno.RcLink, {
          variant: "inherit",
          "data-sign": "scheduleForGuidanceLink",
          className: _styles["default"].underline,
          target: "_blank",
          color: "neutral.b01",
          href: _constants.RCV_SCHEDULE_ON_BEHALF_GUIDANCE_LINK
        }, _i18n["default"].getString('scheduleForGuidanceMore', currentLocale))))
      }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
        size: "small",
        color: "neutral.f04",
        symbol: _junoIcon.InfoBorder,
        "data-sign": "scheduleForGuidanceIcon",
        className: _styles["default"].allowCursor,
        onClick: function onClick(e) {
          e.stopPropagation();
        }
      })))
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].boxSelectWrapper
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcSelect, {
      variant: "box",
      fullWidth: true,
      className: _styles["default"].boxSelect,
      "data-sign": "scheduleFor",
      disabled: disabled,
      onChange: function onChange(e) {
        updateScheduleFor(e.target.value);
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        trackSettingChanges(_RcVideo.RCV_ITEM_NAME.scheduleFor);
      },
      value: meeting.extensionId
    }, delegators.map(function (item, index) {
      var userName = item.name === _RcVideo.ASSISTED_USERS_MYSELF ? _i18n["default"].getString(item.name, currentLocale) : item.name;
      return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
        value: item.extensionId,
        key: item.extensionId,
        title: userName,
        className: _styles["default"].boxSelectMenuItem,
        "data-sign": "scheduleForMenuItem".concat(index)
      }, userName);
    })))) : null, /*#__PURE__*/_react["default"].createElement(_SettingGroup.SettingGroup, {
      dataSign: "settingsPanel",
      summary: _i18n["default"].getString('meetingSettings', currentLocale)
    }, showPMI && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingItem, {
      labelPlacement: labelPlacement,
      dataSign: "usePersonalMeetingIdWrapper",
      hasScrollBar: hasScrollBar,
      isDisabled: isPersonalMeetingDisabled,
      currentLocale: currentLocale,
      label: getPMILabel()
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
      "data-sign": "usePersonalMeetingId",
      disabled: isPersonalMeetingDisabled || disabled,
      size: checkboxSize,
      checked: meeting.usePersonalMeetingId,
      onChange: function onChange(ev, checked) {
        switchUsePersonalMeetingId(checked);
      }
    })), meeting.usePersonalMeetingId && showPmiConfirm && !isPmiChangeConfirmed ? /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].pmiChangeConfirmContainer
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcLink, {
      onClick: onPmiChangeClick,
      "data-sign": "pmiConfirm",
      className: _styles["default"].noUnderLine
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcText, {
      weight: "bold",
      className: _styles["default"].normalSize
    }, _i18n["default"].getString('changePmiSettings', currentLocale)))) : null), /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingItem, {
      labelPlacement: labelPlacement,
      dataSign: "muteAudioWrapper",
      hasScrollBar: hasScrollBar,
      currentLocale: currentLocale,
      label: _i18n["default"].getString('muteAudio', currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
      "data-sign": "muteAudio",
      disabled: isMuteAudioDisabled,
      size: checkboxSize,
      checked: meeting.muteAudio,
      onChange: function onChange() {
        update({
          muteAudio: !meeting.muteAudio
        }, _RcVideo.RCV_ITEM_NAME.muteAudio);
      }
    })), /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingItem, {
      labelPlacement: labelPlacement,
      dataSign: "turnOffCameraWrapper",
      hasScrollBar: hasScrollBar,
      currentLocale: currentLocale,
      label: _i18n["default"].getString('turnOffCamera', currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
      "data-sign": "turnOffCamera",
      disabled: isTurnOffCameraDisabled,
      size: checkboxSize,
      checked: meeting.muteVideo,
      onChange: function onChange() {
        update({
          muteVideo: !meeting.muteVideo
        }, _RcVideo.RCV_ITEM_NAME.muteVideo);
      }
    }))), /*#__PURE__*/_react["default"].createElement(_SettingGroup.SettingGroup, {
      dataSign: "securityPanel",
      summary: _i18n["default"].getString('meetingSettingsSecurity', currentLocale)
    }, showE2EE ? /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingItem, {
      labelPlacement: labelPlacement,
      dataSign: "e2eeWrapper",
      hasScrollBar: hasScrollBar,
      isDisabled: isE2EEDisabled,
      isLock: showRcvAdminLock && ((_meeting$settingLock = meeting.settingLock) === null || _meeting$settingLock === void 0 ? void 0 : _meeting$settingLock.e2ee),
      currentLocale: currentLocale,
      label: /*#__PURE__*/_react["default"].createElement("span", {
        className: _styles["default"].flexVertical
      }, _i18n["default"].getString('useE2ee', currentLocale), /*#__PURE__*/_react["default"].createElement(_ExtendedTooltip.ExtendedTooltip, {
        placement: "top",
        hasScrollBar: hasScrollBar,
        title: _i18n["default"].getString('e2eeTooltip', currentLocale),
        "data-sign": "e2eeTooltip"
      }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
        size: "small",
        color: "neutral.f04",
        symbol: _junoIcon.InfoBorder
      })))
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
      "data-sign": "e2ee",
      checked: meeting.e2ee,
      disabled: isE2EEDisabled || disabled,
      size: checkboxSize,
      onChange: function onChange(ev, value) {
        e2eeInteractFunc(value);
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        trackSettingChanges(_RcVideo.RCV_ITEM_NAME.e2ee);
      }
    })) : null, /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingItem, {
      labelPlacement: labelPlacement,
      dataSign: "requirePasswordWrapper",
      hasScrollBar: hasScrollBar,
      isLock: showRcvAdminLock && ((_meeting$settingLock2 = meeting.settingLock) === null || _meeting$settingLock2 === void 0 ? void 0 : _meeting$settingLock2.isMeetingSecret),
      currentLocale: currentLocale,
      label: _i18n["default"].getString('requirePassword', currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
      "data-sign": "requirePassword",
      checked: meeting.isMeetingSecret,
      disabled: isRequirePasswordDisabled,
      size: checkboxSize,
      onChange: function onChange() {
        var next = !meeting.isMeetingSecret;
        update({
          isMeetingSecret: next
        }, _RcVideo.RCV_ITEM_NAME.isMeetingSecret);
      }
    })), meeting.isMeetingSecret ? /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _clsx4["default"])(_styles["default"].passwordInput, _defineProperty({}, _styles["default"].subPrefixPadding, labelPlacement === 'end'))
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcTextField, {
      variant: "outline",
      fullWidth: true,
      disabled: isPasswordFieldDisabled,
      size: "small",
      placeholder: _i18n["default"].getString('enterPassword', currentLocale),
      error: !meeting.isMeetingPasswordValid,
      helperText: (0, _utils.getHelperTextForPasswordField)(meeting.meetingPassword || '', meeting.isMeetingPasswordValid || false, currentLocale, isPasswordFocus),
      InputLabelProps: {
        className: _styles["default"].passwordLabel
      },
      "data-sign": "password",
      clearBtn: true,
      spellCheck: false,
      value: meeting.meetingPassword,
      inputProps: {
        maxLength: 255
      },
      onChange: function onChange(e) {
        update({
          meetingPassword: e.target.value
        });
      },
      onFocus: function onFocus() {
        setPasswordFocus(true);
      },
      onBlur: function onBlur() {
        setPasswordFocus(false);
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        trackSettingChanges(_RcVideo.RCV_ITEM_NAME.meetingPassword);
      }
    })) : null, /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingItem, {
      labelPlacement: labelPlacement,
      dataSign: "allowJoinBeforeHostWrapper",
      hasScrollBar: hasScrollBar,
      isLock: showRcvAdminLock && ((_meeting$settingLock3 = meeting.settingLock) === null || _meeting$settingLock3 === void 0 ? void 0 : _meeting$settingLock3.allowJoinBeforeHost),
      currentLocale: currentLocale,
      label: _i18n["default"].getString(joinBeforeHostLabel, currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
      "data-sign": "allowJoinBeforeHost",
      checked: !meeting.allowJoinBeforeHost,
      disabled: isJoinBeforeHostDisabled,
      size: checkboxSize,
      onChange: function onChange() {
        update({
          allowJoinBeforeHost: !meeting.allowJoinBeforeHost
        }, _RcVideo.RCV_ITEM_NAME.allowJoinBeforeHost);
      }
    })), showWaitingRoom ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingItem, {
      labelPlacement: labelPlacement,
      dataSign: "waitingRoomField",
      hasScrollBar: hasScrollBar,
      isLock: showRcvAdminLock && ((_meeting$settingLock4 = meeting.settingLock) === null || _meeting$settingLock4 === void 0 ? void 0 : _meeting$settingLock4.waitingRoomMode),
      currentLocale: currentLocale,
      label: _i18n["default"].getString(meeting.waitingRoomMode ? 'waitingRoom' : 'enableWaitingRoom', currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
      "data-sign": "enableWaitingRoom",
      checked: !!meeting.waitingRoomMode,
      disabled: isWaitingRoomDisabled,
      size: checkboxSize,
      onChange: function onChange(ev, checked) {
        update({
          waitingRoomMode: checked ? _RcVideo.RCV_WAITING_ROOM_MODE.notcoworker : _RcVideo.RCV_WAITING_ROOM_MODE.off
        }, _RcVideo.RCV_ITEM_NAME.waitingRoomMode);
      }
    })), meeting.waitingRoomMode ? /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _clsx4["default"])(_styles["default"].boxSelectWrapper, _defineProperty({}, _styles["default"].subPrefixPadding, labelPlacement === 'end'))
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcSelect, {
      variant: "box",
      "data-sign": "waitingRoom",
      "data-test-automation-id": "waitingRoom",
      className: _styles["default"].boxSelect,
      fullWidth: true,
      disabled: isWaitingRoomTypeDisabled,
      onChange: function onChange(e) {
        update({
          waitingRoomMode: e.target.value
        }, _RcVideo.RCV_ITEM_NAME.waitingRoomType);
      },
      value: meeting.waitingRoomMode
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      "data-sign": "waitingRoomAll",
      value: _RcVideo.RCV_WAITING_ROOM_MODE.all,
      className: _styles["default"].boxSelectMenuItem,
      title: _i18n["default"].getString('waitingRoomAll', currentLocale)
    }, _i18n["default"].getString('waitingRoomAll', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      "data-sign": "waitingRoomNotCoworker",
      disabled: isWaitingRoomNotCoworkerDisabled,
      value: _RcVideo.RCV_WAITING_ROOM_MODE.notcoworker,
      className: _styles["default"].boxSelectMenuItem,
      title: _i18n["default"].getString('waitingRoomNotCoworker', currentLocale)
    }, _i18n["default"].getString('waitingRoomNotCoworker', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      "data-sign": "waitingRoomGuest",
      disabled: isWaitingRoomGuestDisabled,
      value: _RcVideo.RCV_WAITING_ROOM_MODE.guests,
      className: _styles["default"].boxSelectMenuItem,
      title: _i18n["default"].getString('waitingRoomGuest', currentLocale)
    }, _i18n["default"].getString('waitingRoomGuest', currentLocale)))) : null) : null, /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingItem, {
      labelPlacement: labelPlacement,
      dataSign: "isOnlyAuthUserJoinWrapper",
      hasScrollBar: hasScrollBar,
      isLock: showRcvAdminLock && ((_meeting$settingLock5 = meeting.settingLock) === null || _meeting$settingLock5 === void 0 ? void 0 : _meeting$settingLock5.isOnlyAuthUserJoin),
      currentLocale: currentLocale,
      label: _i18n["default"].getString('onlyAuthUserJoin', currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
      "data-sign": "isOnlyAuthUserJoin",
      checked: meeting.isOnlyAuthUserJoin,
      disabled: isAuthenticatedCanJoinDisabled,
      size: checkboxSize,
      onChange: function onChange(ev, checked) {
        update({
          isOnlyAuthUserJoin: checked,
          isOnlyCoworkersJoin: checked ? meeting.isOnlyCoworkersJoin : false
        }, _RcVideo.RCV_ITEM_NAME.isOnlyAuthUserJoin);
      }
    })), meeting.isOnlyAuthUserJoin ? /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _clsx4["default"])(_styles["default"].boxSelectWrapper, _defineProperty({}, _styles["default"].subPrefixPadding, labelPlacement === 'end'))
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcSelect, {
      variant: "box",
      "data-test-automation-id": "authUserType",
      "data-sign": "authUserType",
      disabled: isAuthUserTypeDisabled,
      className: _styles["default"].boxSelect,
      fullWidth: true,
      onChange: function onChange(e) {
        update({
          isOnlyCoworkersJoin: e.target.value === _RcVideo.AUTH_USER_TYPE.SIGNED_IN_CO_WORKERS
        }, _RcVideo.RCV_ITEM_NAME.isOnlyCoworkersJoin);
      },
      value: authUserTypeValue
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      value: _RcVideo.AUTH_USER_TYPE.SIGNED_IN_USERS,
      title: _i18n["default"].getString('signedInUsers', currentLocale)
    }, _i18n["default"].getString('signedInUsers', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      value: _RcVideo.AUTH_USER_TYPE.SIGNED_IN_CO_WORKERS,
      title: _i18n["default"].getString('signedInCoWorkers', currentLocale)
    }, _i18n["default"].getString('signedInCoWorkers', currentLocale)))) : null, /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingItem, {
      labelPlacement: labelPlacement,
      dataSign: "limitScreenSharingWrapper",
      hasScrollBar: hasScrollBar,
      isLock: showRcvAdminLock && ((_meeting$settingLock6 = meeting.settingLock) === null || _meeting$settingLock6 === void 0 ? void 0 : _meeting$settingLock6.allowScreenSharing),
      currentLocale: currentLocale,
      label: _i18n["default"].getString('limitScreenSharing', currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
      "data-sign": "limitScreenSharing",
      checked: !meeting.allowScreenSharing,
      disabled: isAllowScreenSharingDisabled,
      size: checkboxSize,
      onChange: function onChange() {
        update({
          allowScreenSharing: !meeting.allowScreenSharing
        }, _RcVideo.RCV_ITEM_NAME.allowScreenSharing);
      }
    })), showAllowAnyoneRecord && /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingItem, {
      labelPlacement: "top",
      dataSign: "allowToRecording",
      hasScrollBar: hasScrollBar,
      isLock: showRcvAdminLock && ((_meeting$settingLock7 = meeting.settingLock) === null || _meeting$settingLock7 === void 0 ? void 0 : _meeting$settingLock7.allowAnyoneRecord),
      currentLocale: currentLocale,
      label: _i18n["default"].getString('allowToRecording', currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcSelect, {
      variant: "box",
      "data-sign": "selectAllowToRecord",
      "data-test-automation-id": "selectAllowToRecord",
      className: _styles["default"].boxSelect,
      fullWidth: true,
      disabled: isAllowToRecordDisabled,
      onChange: function onChange(e) {
        update({
          allowAnyoneRecord: e.target.value === 'true'
        }, _RcVideo.RCV_ITEM_NAME.allowAnyoneRecord);
      },
      value: (_meeting$allowAnyoneR = meeting.allowAnyoneRecord) === null || _meeting$allowAnyoneR === void 0 ? void 0 : _meeting$allowAnyoneR.toString()
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      "data-sign": "everyone",
      value: "true",
      className: _styles["default"].boxSelectMenuItem,
      title: _i18n["default"].getString('everyone', currentLocale)
    }, _i18n["default"].getString('everyone', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      "data-sign": "onlyHostModerators",
      value: "false",
      className: _styles["default"].boxSelectMenuItem,
      title: _i18n["default"].getString('onlyHostModerators', currentLocale)
    }, _i18n["default"].getString('onlyHostModerators', currentLocale)))), showAllowAnyoneTranscribe && /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingItem, {
      labelPlacement: "top",
      dataSign: "allowTranscribe",
      hasScrollBar: hasScrollBar,
      isLock: showRcvAdminLock && ((_meeting$settingLock8 = meeting.settingLock) === null || _meeting$settingLock8 === void 0 ? void 0 : _meeting$settingLock8.allowAnyoneTranscribe),
      currentLocale: currentLocale,
      label: _i18n["default"].getString('allowTranscribe', currentLocale)
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcSelect, {
      variant: "box",
      "data-sign": "selectAllowTranscribe",
      "data-test-automation-id": "selectAllowTranscribe",
      className: _styles["default"].boxSelect,
      disabled: isAllowAnyoneTranscribeDisabled,
      fullWidth: true,
      onChange: function onChange(e) {
        update({
          allowAnyoneTranscribe: e.target.value === 'true'
        }, _RcVideo.RCV_ITEM_NAME.allowAnyoneTranscribe);
      },
      value: (_meeting$allowAnyoneT = meeting.allowAnyoneTranscribe) === null || _meeting$allowAnyoneT === void 0 ? void 0 : _meeting$allowAnyoneT.toString()
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      "data-sign": "everyone",
      value: "true",
      className: _styles["default"].boxSelectMenuItem,
      title: _i18n["default"].getString('everyone', currentLocale)
    }, _i18n["default"].getString('everyone', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      "data-sign": "onlyHostModerators",
      value: "false",
      className: _styles["default"].boxSelectMenuItem,
      title: _i18n["default"].getString('onlyHostModerators', currentLocale)
    }, _i18n["default"].getString('onlyHostModerators', currentLocale)))))))
  );
};
exports.VideoConfig = VideoConfig;
VideoConfig.defaultProps = {
  recipientsSection: undefined,
  showWhen: true,
  showDuration: true,
  showRcvAdminLock: false,
  enablePersonalMeeting: false,
  isPmiChangeConfirmed: false,
  showPmiConfirm: false,
  showWaitingRoom: false,
  showE2EE: false,
  isE2EEDisabled: false,
  datePickerSize: 'medium',
  timePickerSize: 'medium',
  labelPlacement: 'start',
  checkboxSize: 'medium'
};
//# sourceMappingURL=VideoConfig.js.map
