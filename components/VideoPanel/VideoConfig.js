"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoConfig = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.map");

var _juno = require("@ringcentral/juno");

var _icon = require("@ringcentral/juno/icon");

var _classnames4 = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _meetingHelper = require("@ringcentral-integration/commons/helpers/meetingHelper");

var _RcVideoV = require("@ringcentral-integration/commons/modules/RcVideoV2");

var _ExtendedTooltip = require("../MeetingConfigsV2/ExtendedTooltip");

var _MeetingCalendarHelper = require("../../lib/MeetingCalendarHelper");

var _MeetingHelper = require("../../lib/MeetingHelper");

var _SpinnerOverlay = require("../SpinnerOverlay");

var _i18n = _interopRequireDefault(require("./i18n"));

var _SettingGroup = require("./SettingGroup");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _VideoSecuritySettingItem = require("./VideoSecuritySettingItem");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", " {\n    padding: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function getHelperTextForPasswordField(meeting, currentLocale, isPasswordFocus) {
  if (!meeting.meetingPassword) {
    return _i18n["default"].getString('passwordEmptyError', currentLocale);
  }

  if (!meeting.isMeetingPasswordValid) {
    return _i18n["default"].getString('passwordInvalidError', currentLocale);
  }

  if (isPasswordFocus) {
    return _i18n["default"].getString('passwordHintText', currentLocale);
  } // when correct input without focus, show nothing


  return '';
} // TODO: integrate with VideoPanelProps from 'GenericMeetingPanel/interface'


var PanelRoot = _juno.styled.div(_templateObject(), _juno.RcCheckbox, (0, _juno.spacing)(2));

var VideoConfig = function VideoConfig(props) {
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
      showPmiAlert = props.showPmiAlert,
      showWaitingRoom = props.showWaitingRoom,
      showE2EE = props.showE2EE,
      isE2EEDisabled = props.isE2EEDisabled,
      enablePersonalMeeting = props.enablePersonalMeeting,
      isPersonalMeetingDisabled = props.isPersonalMeetingDisabled,
      personalMeetingId = props.personalMeetingId,
      switchUsePersonalMeetingId = props.switchUsePersonalMeetingId,
      updateHasSettingsChanged = props.updateHasSettingsChanged,
      e2eeInteractFunc = props.e2eeInteractFunc,
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
      isAuthenticatedCanJoinDisabled = props.isAuthenticatedCanJoinDisabled,
      isAuthUserTypeDisabled = props.isAuthUserTypeDisabled,
      isSignedInUsersDisabled = props.isSignedInUsersDisabled,
      isSignedInCoWorkersDisabled = props.isSignedInCoWorkersDisabled,
      isWaitingRoomDisabled = props.isWaitingRoomDisabled,
      isRequirePasswordDisabled = props.isRequirePasswordDisabled,
      isWaitingRoomNotCoworkerDisabled = props.isWaitingRoomNotCoworkerDisabled,
      isWaitingRoomGuestDisabled = props.isWaitingRoomGuestDisabled,
      isWaitingRoomAllDisabled = props.isWaitingRoomAllDisabled;
  var settingsGroupExpandable = false;
  var hoursList = (0, _MeetingHelper.getHoursList)(_MeetingHelper.HOUR_SCALE, currentLocale);
  var minutesList = (0, _MeetingHelper.getMinutesList)(_MeetingHelper.MINUTE_SCALE, currentLocale);
  (0, _react.useEffect)(function () {
    if (init) {
      init();
    }
  }, []);

  var update = function update(options) {
    updateHasSettingsChanged(true);
    return updateMeetingSettings(_objectSpread(_objectSpread({}, meeting), options));
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
    setHasScrollBar(configRef.current.scrollHeight > configRef.current.clientHeight);
  }, []);
  return /*#__PURE__*/_react["default"].createElement(PanelRoot, {
    ref: configRef,
    className: _styles["default"].videoConfig,
    "data-sign": "videoConfigsPanel"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].meetingContent
  }, showSpinnerInConfigPanel ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null) : null, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames4["default"])(_styles["default"].meetingSection, _styles["default"].gutterTop)
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
    date: startTime,
    clearBtn: false,
    formatString: "MM/DD/YYYY",
    size: datePickerSize,
    locale: currentLocale,
    todayButtonText: _i18n["default"].getString('today', currentLocale),
    onChange: function onChange(value) {
      update({
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
    value: startTime,
    onChange: function onChange(value) {
      update({
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
      key: i,
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
      var value = +e.target.value;
      var restHours = Math.floor(meeting.duration / 60);
      var isMax = restHours === hoursList.slice(-1)[0].value;
      var minutes = isMax ? 0 : value;
      var durationInMinutes = restHours * 60 + minutes;
      update({
        duration: durationInMinutes
      });
    }
  }, minutesList.map(function (item, i) {
    return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      key: i,
      value: item.value,
      "data-sign": "option".concat(i)
    }, item !== null ? item.text : 'defaultValue');
  })))) : null, showScheduleOnBehalf ? /*#__PURE__*/_react["default"].createElement(_SettingGroup.SettingGroup, {
    dataSign: "scheduleOnBehalfPanel",
    expandable: settingsGroupExpandable,
    summary: _i18n["default"].getString('scheduleFor', currentLocale)
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
    },
    value: meeting.extensionId
  }, delegators.map(function (item, index) {
    var userName = item.name === _RcVideoV.ASSISTED_USERS_MYSELF ? _i18n["default"].getString(item.name, currentLocale) : item.name;
    return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      value: item.extensionId,
      key: item.extensionId,
      title: userName,
      className: _styles["default"].boxSelectMenuItem,
      "data-sign": "scheduleForMenuItem".concat(index)
    }, userName);
  })))) : null, /*#__PURE__*/_react["default"].createElement(_SettingGroup.SettingGroup, {
    dataSign: "settingsPanel",
    expandable: settingsGroupExpandable,
    summary: _i18n["default"].getString('meetingSettings', currentLocale)
  }, enablePersonalMeeting && personalMeetingId && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingItem, {
    labelPlacement: labelPlacement,
    dataSign: "usePersonalMeetingIdWrapper",
    hasScrollBar: hasScrollBar,
    isDisabled: isPersonalMeetingDisabled,
    currentLocale: currentLocale,
    label: /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].pmiLabel
    }, _i18n["default"].getString('usePersonalMeetingId', currentLocale), "\xA0", /*#__PURE__*/_react["default"].createElement("span", {
      "data-sign": "personalMeetingId"
    }, (0, _MeetingCalendarHelper.formatMeetingId)(personalMeetingId, '-')))
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
    "data-sign": "usePersonalMeetingId",
    disabled: isPersonalMeetingDisabled || disabled,
    size: checkboxSize,
    checked: meeting.usePersonalMeetingId,
    onChange: function onChange(ev, checked) {
      switchUsePersonalMeetingId(checked);
      updateHasSettingsChanged(true);
    }
  })), meeting.usePersonalMeetingId && showPmiAlert ? /*#__PURE__*/_react["default"].createElement(_juno.RcAlert, {
    severity: "info",
    className: _styles["default"].pmiAlertContainer,
    "data-sign": "pmiAlert"
  }, _i18n["default"].getString('pmiSettingAlert', currentLocale)) : null), /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingItem, {
    labelPlacement: labelPlacement,
    dataSign: "muteAudioWrapper",
    hasScrollBar: hasScrollBar,
    currentLocale: currentLocale,
    label: _i18n["default"].getString('muteAudio', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
    "data-sign": "muteAudio",
    disabled: disabled,
    size: checkboxSize,
    checked: meeting.muteAudio,
    onChange: function onChange() {
      update({
        muteAudio: !meeting.muteAudio
      });
    }
  })), /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingItem, {
    labelPlacement: labelPlacement,
    dataSign: "turnOffCameraWrapper",
    hasScrollBar: hasScrollBar,
    currentLocale: currentLocale,
    label: _i18n["default"].getString('turnOffCamera', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
    "data-sign": "turnOffCamera",
    disabled: disabled,
    size: checkboxSize,
    checked: meeting.muteVideo,
    onChange: function onChange() {
      update({
        muteVideo: !meeting.muteVideo
      });
    }
  }))), /*#__PURE__*/_react["default"].createElement(_SettingGroup.SettingGroup, {
    dataSign: "securityPanel",
    expandable: settingsGroupExpandable,
    summary: _i18n["default"].getString('meetingSettingsSecurity', currentLocale)
  }, showE2EE ? /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingItem, {
    labelPlacement: labelPlacement,
    dataSign: "e2eeWrapper",
    hasScrollBar: hasScrollBar,
    isDisabled: isE2EEDisabled,
    isLock: showRcvAdminLock && meeting.settingLock.e2ee,
    currentLocale: currentLocale,
    label: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", {
      className: _styles["default"].flexVertical
    }, _i18n["default"].getString('useE2ee', currentLocale), /*#__PURE__*/_react["default"].createElement(_ExtendedTooltip.ExtendedTooltip, {
      placement: "top",
      hasScrollBar: hasScrollBar,
      title: _i18n["default"].getString('e2eeTooltip', currentLocale),
      "data-sign": "e2eeTooltip"
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
      size: "small",
      color: "neutral.f04",
      symbol: _icon.Info
    }))))
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
    "data-sign": "e2ee",
    checked: meeting.e2ee,
    disabled: isE2EEDisabled || disabled,
    size: checkboxSize,
    onChange: function onChange(ev, value) {
      e2eeInteractFunc(value);
    }
  })) : null, /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingItem, {
    labelPlacement: labelPlacement,
    dataSign: "requirePasswordWrapper",
    hasScrollBar: hasScrollBar,
    isLock: showRcvAdminLock && meeting.settingLock.isMeetingSecret,
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
      });
    }
  })), meeting.isMeetingSecret ? /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames4["default"])(_styles["default"].passwordInput, _defineProperty({}, _styles["default"].subPrefixPadding, labelPlacement === 'end'))
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcTextField, {
    variant: "outline",
    fullWidth: true,
    disabled: disabled,
    size: "small",
    placeholder: _i18n["default"].getString('enterPassword', currentLocale),
    error: !meeting.isMeetingPasswordValid,
    helperText: getHelperTextForPasswordField(meeting, currentLocale, isPasswordFocus),
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
    }
  })) : null, /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingItem, {
    labelPlacement: labelPlacement,
    dataSign: "allowJoinBeforeHostWrapper",
    hasScrollBar: hasScrollBar,
    isLock: showRcvAdminLock && meeting.settingLock.allowJoinBeforeHost,
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
      });
    }
  })), showWaitingRoom ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingItem, {
    labelPlacement: labelPlacement,
    dataSign: "isWaitingRoomWrapper",
    hasScrollBar: hasScrollBar,
    isLock: showRcvAdminLock && meeting.settingLock.waitingRoomMode,
    currentLocale: currentLocale,
    label: _i18n["default"].getString(meeting.waitingRoomMode ? 'waitingRoom' : 'enableWaitingRoom', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
    "data-sign": "enableWaitingRoom",
    checked: !!meeting.waitingRoomMode,
    disabled: isWaitingRoomDisabled,
    size: checkboxSize,
    onChange: function onChange(ev, checked) {
      update({
        waitingRoomMode: checked ? _RcVideoV.RCV_WAITING_ROOM_MODE.notcoworker : _RcVideoV.RCV_WAITING_ROOM_MODE.off
      });
    }
  })), meeting.waitingRoomMode ? /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames4["default"])(_styles["default"].boxSelectWrapper, _defineProperty({}, _styles["default"].subPrefixPadding, labelPlacement === 'end'))
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcSelect, {
    variant: "box",
    "data-sign": "waitingRoom",
    "data-test-automation-id": "waitingRoom",
    className: _styles["default"].boxSelect,
    fullWidth: true,
    disabled: disabled || showRcvAdminLock && meeting.settingLock.waitingRoomMode,
    onChange: function onChange(e) {
      update({
        waitingRoomMode: e.target.value
      });
    },
    value: meeting.waitingRoomMode
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
    "data-sign": "waitingRoomNotCoworker",
    disabled: isWaitingRoomNotCoworkerDisabled,
    value: _RcVideoV.RCV_WAITING_ROOM_MODE.notcoworker,
    className: _styles["default"].boxSelectMenuItem
  }, _i18n["default"].getString('waitingRoomNotCoworker', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
    "data-sign": "waitingRoomGuest",
    disabled: isWaitingRoomGuestDisabled,
    value: _RcVideoV.RCV_WAITING_ROOM_MODE.guests,
    className: _styles["default"].boxSelectMenuItem
  }, _i18n["default"].getString('waitingRoomGuest', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
    "data-sign": "waitingRoomAll",
    disabled: isWaitingRoomAllDisabled,
    value: _RcVideoV.RCV_WAITING_ROOM_MODE.all,
    className: _styles["default"].boxSelectMenuItem
  }, _i18n["default"].getString('waitingRoomAll', currentLocale)))) : null) : null, /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingItem, {
    labelPlacement: labelPlacement,
    dataSign: "isOnlyAuthUserJoinWrapper",
    hasScrollBar: hasScrollBar,
    isLock: showRcvAdminLock && meeting.settingLock.isOnlyAuthUserJoin,
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
      });
    }
  })), meeting.isOnlyAuthUserJoin ? /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames4["default"])(_styles["default"].boxSelectWrapper, _defineProperty({}, _styles["default"].subPrefixPadding, labelPlacement === 'end'))
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcSelect, {
    variant: "box",
    "data-test-automation-id": "authUserType",
    "data-sign": "authUserType",
    disabled: isAuthUserTypeDisabled,
    className: _styles["default"].boxSelect,
    fullWidth: true,
    onChange: function onChange(e) {
      update({
        isOnlyCoworkersJoin: e.target.value === _RcVideoV.AUTH_USER_TYPE.SIGNED_IN_CO_WORKERS
      });
    },
    value: authUserTypeValue
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
    disabled: isSignedInUsersDisabled,
    value: _RcVideoV.AUTH_USER_TYPE.SIGNED_IN_USERS
  }, _i18n["default"].getString('signedInUsers', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
    disabled: isSignedInCoWorkersDisabled,
    value: _RcVideoV.AUTH_USER_TYPE.SIGNED_IN_CO_WORKERS
  }, _i18n["default"].getString('signedInCoWorkers', currentLocale)))) : null, /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingItem, {
    labelPlacement: labelPlacement,
    dataSign: "limitScreenSharingWrapper",
    hasScrollBar: hasScrollBar,
    isLock: showRcvAdminLock && meeting.settingLock.allowScreenSharing,
    currentLocale: currentLocale,
    label: _i18n["default"].getString('limitScreenSharing', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
    "data-sign": "limitScreenSharing",
    checked: !meeting.allowScreenSharing,
    disabled: disabled || showRcvAdminLock && meeting.settingLock.allowScreenSharing,
    size: checkboxSize,
    onChange: function onChange() {
      update({
        allowScreenSharing: !meeting.allowScreenSharing
      });
    }
  })))));
};

exports.VideoConfig = VideoConfig;
VideoConfig.defaultProps = {
  recipientsSection: undefined,
  showWhen: true,
  showDuration: true,
  showRcvAdminLock: false,
  showPmiAlert: false,
  enablePersonalMeeting: false,
  showWaitingRoom: false,
  showE2EE: false,
  isE2EEDisabled: false,
  datePickerSize: 'medium',
  timePickerSize: 'medium',
  labelPlacement: 'start',
  checkboxSize: 'medium'
};
//# sourceMappingURL=VideoConfig.js.map
