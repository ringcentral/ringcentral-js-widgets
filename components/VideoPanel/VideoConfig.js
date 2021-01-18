"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.reduce");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMinutesList = getMinutesList;
exports.getHoursList = getHoursList;
exports.Topic = exports.VideoConfig = exports.HOUR_SCALE = exports.MINUTE_SCALE = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

var _juno = require("@ringcentral/juno");

var _ramda = require("ramda");

var _classnames4 = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _RcVideo = require("ringcentral-integration/modules/RcVideo");

var _meetingHelper = require("ringcentral-integration/helpers/meetingHelper");

var _MeetingCalendarHelper = require("../../lib/MeetingCalendarHelper");

var _reactHooks = require("../../react-hooks");

var _i18n = _interopRequireDefault(require("./i18n"));

var _SettingGroup = require("./SettingGroup");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _VideoSecuritySettingItem = require("./VideoSecuritySettingItem");

var _SpinnerOverlay = require("../SpinnerOverlay");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MINUTE_SCALE = 4;
exports.MINUTE_SCALE = MINUTE_SCALE;
var HOUR_SCALE = 13;
exports.HOUR_SCALE = HOUR_SCALE;

function getMinutesList(MINUTE_SCALE) {
  return (0, _ramda.reduce)(function (result) {
    var index = result.length;
    var value = 60 / MINUTE_SCALE * index;
    var text = "".concat("".concat(value, "0").slice(0, 2), " min");
    return result.concat({
      value: value,
      text: text
    });
  }, [], new Array(MINUTE_SCALE));
}

function getHoursList(HOUR_SCALE) {
  if (HOUR_SCALE > 23) {
    throw new Error('HOUR_SCALE must be less than 23.');
  }

  return (0, _ramda.reduce)(function (result) {
    var value = result.length;
    var text = "".concat("0".concat(value, "0").slice(-3, -1), " hr");
    return result.concat({
      value: value,
      text: text
    });
  }, [], new Array(HOUR_SCALE));
}

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
}

var VideoConfig = function VideoConfig(props) {
  var disabled = props.disabled,
      currentLocale = props.currentLocale,
      meeting = props.meeting,
      updateMeetingSettings = props.updateMeetingSettings,
      validatePasswordSettings = props.validatePasswordSettings,
      recipientsSection = props.recipientsSection,
      init = props.init,
      children = props.children,
      showTopic = props.showTopic,
      showWhen = props.showWhen,
      showDuration = props.showDuration,
      showAdminLock = props.showAdminLock,
      showPmiAlert = props.showPmiAlert,
      enableWaitingRoom = props.enableWaitingRoom,
      enablePersonalMeeting = props.enablePersonalMeeting,
      personalMeetingId = props.personalMeetingId,
      switchUsePersonalMeetingId = props.switchUsePersonalMeetingId,
      updateHasSettingsChanged = props.updateHasSettingsChanged,
      datePickerSize = props.datePickerSize,
      timePickerSize = props.timePickerSize,
      labelPlacement = props.labelPlacement,
      delegators = props.delegators,
      showScheduleOnBehalf = props.showScheduleOnBehalf,
      updateScheduleFor = props.updateScheduleFor,
      showSpinnerInConfigPanel = props.showSpinnerInConfigPanel;
  var hoursList = getHoursList(HOUR_SCALE);
  var minutesList = getMinutesList(MINUTE_SCALE);
  (0, _react.useEffect)(function () {
    if (init) {
      init();
    }
  }, []);

  var _useState = (0, _react.useState)(meeting.meetingPassword),
      _useState2 = _slicedToArray(_useState, 2),
      meetingPassword = _useState2[0],
      setMeetingPassword = _useState2[1];
  /* Password */


  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isPasswordFocus = _useState4[0],
      setPasswordFocus = _useState4[1];

  (0, _react.useEffect)(function () {
    setMeetingPassword(meeting.meetingPassword);
  }, [meeting.meetingPassword]);

  var update = function update(options) {
    updateHasSettingsChanged(true);
    return updateMeetingSettings(_objectSpread(_objectSpread({}, meeting), options));
  };

  var debouncedPassword = (0, _reactHooks.useDebounce)(meetingPassword, 200);
  (0, _react.useEffect)(function () {
    var isMeetingPasswordValid = validatePasswordSettings(debouncedPassword, meeting.isMeetingSecret);
    updateMeetingSettings(_objectSpread(_objectSpread({}, meeting), {}, {
      meetingPassword: debouncedPassword,
      isMeetingPasswordValid: isMeetingPasswordValid
    }));
  }, [debouncedPassword]);
  var startTime = (0, _react.useMemo)(function () {
    return new Date(meeting.startTime);
  }, [meeting.startTime]);
  var authUserTypeValue = meeting.isOnlyCoworkersJoin ? 'signedInCoWorkers' : 'signedInUsers';

  var _useState5 = (0, _react.useState)(authUserTypeValue),
      _useState6 = _slicedToArray(_useState5, 2),
      authUserType = _useState6[0],
      setAuthUserType = _useState6[1];

  (0, _react.useEffect)(function () {
    setAuthUserType(authUserTypeValue);
  }, [authUserTypeValue]);
  var configRef = (0, _react.useRef)();

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      hasScrollBar = _useState8[0],
      setHasScrollBar = _useState8[1];

  (0, _react.useEffect)(function () {
    setHasScrollBar(configRef.current.scrollHeight > configRef.current.clientHeight);
  }, []);
  var settingsGroupExpandable = false;

  var _useState9 = (0, _react.useState)('onlyJoinAfterMe'),
      _useState10 = _slicedToArray(_useState9, 2),
      joinBeforeHostLabel = _useState10[0],
      setJoinBeforeHostLabel = _useState10[1];

  (0, _react.useEffect)(function () {
    var user = (0, _ramda.find)(function (item) {
      return item.extensionId === meeting.extensionId;
    }, delegators || []);

    if (user && !user.isLoginUser) {
      return setJoinBeforeHostLabel('onlyJoinAfterHost');
    }

    return setJoinBeforeHostLabel('onlyJoinAfterMe');
  }, [delegators, meeting.extensionId]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: configRef,
    className: _styles["default"].videoConfig,
    "data-sign": "videoConfigPanel"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].meetingContent
  }, showSpinnerInConfigPanel ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null) : null, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].meetingSection
  }, children), recipientsSection ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].meetingSection
  }, recipientsSection) : null, showWhen ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].meetingSection
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcDatePicker, {
    label: _i18n["default"].getString('date', currentLocale),
    "data-sign": "date",
    date: startTime,
    fullWidth: true,
    clearBtn: false,
    formatString: "MM/DD/YYYY",
    size: datePickerSize,
    onChange: function onChange(value) {
      update({
        startTime: (0, _meetingHelper.updateFullYear)(startTime, value)
      });
    }
  })) : null, showWhen ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].meetingSection
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcTimePicker, {
    fullWidth: true,
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
  })) : null, showDuration ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].meetingSection
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].hourDuration
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcLineSelect // size="small"
  , {
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
    classes: {
      root: _styles["default"].select
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
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcLineSelect, {
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
    },
    classes: {
      root: _styles["default"].select
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
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcBoxSelect, {
    fullWidth: true,
    className: _styles["default"].boxSelect,
    "data-sign": "scheduleFor",
    disabled: disabled,
    onChange: function onChange(e) {
      updateScheduleFor(e.target.value);
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
    expandable: settingsGroupExpandable,
    summary: _i18n["default"].getString('meetingSettings', currentLocale)
  }, enablePersonalMeeting && personalMeetingId && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingsItem, {
    labelPlacement: labelPlacement,
    dataSign: "usePersonalMeetingIdWrapper",
    hasScrollBar: hasScrollBar,
    currentLocale: currentLocale,
    label: /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].pmiLabel
    }, _i18n["default"].getString('usePersonalMeetingId', currentLocale), "\xA0", /*#__PURE__*/_react["default"].createElement("span", {
      "data-sign": "personalMeetingId"
    }, (0, _MeetingCalendarHelper.formatMeetingId)(personalMeetingId, '-')))
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
    "data-sign": "usePersonalMeetingId",
    disabled: disabled,
    checked: meeting.usePersonalMeetingId,
    onChange: function onChange(ev, checked) {
      switchUsePersonalMeetingId(checked);
      updateHasSettingsChanged(true);
    }
  })), meeting.usePersonalMeetingId && showPmiAlert ? /*#__PURE__*/_react["default"].createElement(_juno.RcAlert, {
    severity: "info",
    className: _styles["default"].pmiAlertContainer,
    "data-sign": "pmiAlert"
  }, _i18n["default"].getString('pmiSettingAlert', currentLocale)) : null), /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingsItem, {
    labelPlacement: labelPlacement,
    dataSign: "muteAudioWrapper",
    hasScrollBar: hasScrollBar,
    currentLocale: currentLocale,
    label: _i18n["default"].getString('muteAudio', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
    "data-sign": "muteAudio",
    disabled: disabled,
    checked: meeting.muteAudio,
    onChange: function onChange() {
      update({
        muteAudio: !meeting.muteAudio
      });
    }
  })), /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingsItem, {
    labelPlacement: labelPlacement,
    dataSign: "turnOffCameraWrapper",
    hasScrollBar: hasScrollBar,
    currentLocale: currentLocale,
    label: _i18n["default"].getString('turnOffCamera', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
    "data-sign": "turnOffCamera",
    disabled: disabled,
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
  }, /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingsItem, {
    labelPlacement: labelPlacement,
    dataSign: "requirePasswordWrapper",
    hasScrollBar: hasScrollBar,
    isLock: showAdminLock && meeting.settingLock.isMeetingSecret,
    currentLocale: currentLocale,
    label: _i18n["default"].getString('requirePassword', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
    "data-sign": "requirePassword",
    checked: meeting.isMeetingSecret,
    disabled: disabled || showAdminLock && meeting.settingLock.isMeetingSecret,
    onChange: function onChange() {
      var next = !meeting.isMeetingSecret;
      update({
        isMeetingSecret: next
      });
    }
  })), meeting.isMeetingSecret ? /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames4["default"])(_styles["default"].passwordInput, _defineProperty({}, _styles["default"].subPrefixPadding, labelPlacement === 'end'))
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcOutlineTextField, {
    disabled: disabled,
    size: "small",
    placeholder: _i18n["default"].getString('Enter Password', currentLocale),
    error: !meeting.isMeetingPasswordValid,
    helperText: getHelperTextForPasswordField(meeting, currentLocale, isPasswordFocus),
    InputLabelProps: {
      className: _styles["default"].passwordLabel
    },
    "data-sign": "password",
    clearBtn: true,
    spellCheck: false,
    value: meetingPassword,
    inputProps: {
      maxLength: 255
    },
    onChange: function onChange(e) {
      setMeetingPassword(e.target.value);
      updateHasSettingsChanged(true);
    },
    onFocus: function onFocus() {
      setPasswordFocus(true);
    },
    onBlur: function onBlur() {
      setPasswordFocus(false);
    }
  })) : null, /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingsItem, {
    labelPlacement: labelPlacement,
    dataSign: "allowJoinBeforeHostWrapper",
    hasScrollBar: hasScrollBar,
    isLock: showAdminLock && meeting.settingLock.allowJoinBeforeHost,
    currentLocale: currentLocale,
    label: _i18n["default"].getString(joinBeforeHostLabel, currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
    "data-sign": "allowJoinBeforeHost",
    checked: !meeting.allowJoinBeforeHost,
    disabled: showAdminLock && meeting.settingLock.allowJoinBeforeHost || enableWaitingRoom && meeting.waitingRoomMode === _RcVideo.RCV_WAITING_ROOM_MODE.all || disabled,
    onChange: function onChange() {
      update({
        allowJoinBeforeHost: !meeting.allowJoinBeforeHost
      });
    }
  })), enableWaitingRoom ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingsItem, {
    labelPlacement: labelPlacement,
    dataSign: "isWaitingRoomWrapper",
    hasScrollBar: hasScrollBar,
    isLock: showAdminLock && meeting.settingLock.waitingRoomMode,
    currentLocale: currentLocale,
    label: _i18n["default"].getString(meeting.waitingRoomMode ? 'waitingRoom' : 'enableWaitingRoom', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
    "data-sign": "enableWaitingRoom",
    checked: !!meeting.waitingRoomMode,
    disabled: disabled || showAdminLock && meeting.settingLock.waitingRoomMode,
    onChange: function onChange(ev, checked) {
      update({
        waitingRoomMode: checked ? _RcVideo.RCV_WAITING_ROOM_MODE.notcoworker : _RcVideo.RCV_WAITING_ROOM_MODE.off
      });
    }
  })), meeting.waitingRoomMode ? /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames4["default"])(_styles["default"].boxSelectWrapper, _defineProperty({}, _styles["default"].subPrefixPadding, labelPlacement === 'end'))
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcBoxSelect, {
    "data-sign": "waitingRoom",
    automationId: "waitingRoom",
    className: _styles["default"].boxSelect,
    fullWidth: true,
    disabled: disabled || showAdminLock && meeting.settingLock.waitingRoomMode,
    onChange: function onChange(e) {
      update({
        waitingRoomMode: e.target.value
      });
    },
    value: meeting.waitingRoomMode
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
    "data-sign": "waitingRoomNotCoworker",
    disabled: meeting.isOnlyCoworkersJoin,
    value: _RcVideo.RCV_WAITING_ROOM_MODE.notcoworker
  }, _i18n["default"].getString('waitingRoomNotCoworker', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
    "data-sign": "waitingRoomGuest",
    disabled: meeting.isOnlyAuthUserJoin,
    value: _RcVideo.RCV_WAITING_ROOM_MODE.guests
  }, _i18n["default"].getString('waitingRoomGuest', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
    "data-sign": "waitingRoomAll",
    value: _RcVideo.RCV_WAITING_ROOM_MODE.all
  }, _i18n["default"].getString('waitingRoomAll', currentLocale)))) : null) : null, /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingsItem, {
    labelPlacement: labelPlacement,
    dataSign: "isOnlyAuthUserJoinWrapper",
    hasScrollBar: hasScrollBar,
    isLock: showAdminLock && meeting.settingLock.isOnlyAuthUserJoin,
    currentLocale: currentLocale,
    label: _i18n["default"].getString('onlyAuthUserJoin', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
    "data-sign": "isOnlyAuthUserJoin",
    checked: meeting.isOnlyAuthUserJoin,
    disabled: disabled || showAdminLock && meeting.settingLock.isOnlyAuthUserJoin,
    onChange: function onChange(ev, checked) {
      update({
        isOnlyAuthUserJoin: checked,
        isOnlyCoworkersJoin: checked ? meeting.isOnlyCoworkersJoin : false
      });
    }
  })), meeting.isOnlyAuthUserJoin ? /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames4["default"])(_styles["default"].boxSelectWrapper, _defineProperty({}, _styles["default"].subPrefixPadding, labelPlacement === 'end'))
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcBoxSelect, {
    "data-sign": "authUserType",
    automationId: "authUserType",
    disabled: disabled || showAdminLock && meeting.settingLock.isOnlyCoworkersJoin,
    className: _styles["default"].boxSelect,
    fullWidth: true,
    onChange: function onChange(e) {
      setAuthUserType(e.target.value);
      update({
        isOnlyCoworkersJoin: e.target.value === 'signedInCoWorkers'
      });
    },
    value: authUserType
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
    value: "signedInUsers"
  }, _i18n["default"].getString('signedInUsers', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
    value: "signedInCoWorkers"
  }, _i18n["default"].getString('signedInCoWorkers', currentLocale)))) : null, /*#__PURE__*/_react["default"].createElement(_VideoSecuritySettingItem.VideoSecuritySettingsItem, {
    labelPlacement: labelPlacement,
    dataSign: "limitScreenSharingWrapper",
    hasScrollBar: hasScrollBar,
    isLock: showAdminLock && meeting.settingLock.allowScreenSharing,
    currentLocale: currentLocale,
    label: _i18n["default"].getString('limitScreenSharing', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
    "data-sign": "limitScreenSharing",
    checked: !meeting.allowScreenSharing,
    disabled: disabled || showAdminLock && meeting.settingLock.allowScreenSharing,
    onChange: function onChange() {
      update({
        allowScreenSharing: !meeting.allowScreenSharing
      });
    }
  })))));
};

exports.VideoConfig = VideoConfig;

var InnerTopic = function InnerTopic(_ref) {
  var name = _ref.name,
      currentLocale = _ref.currentLocale,
      setTopicRef = _ref.setTopicRef,
      updateMeetingTopic = _ref.updateMeetingTopic;

  var _useState11 = (0, _react.useState)(name),
      _useState12 = _slicedToArray(_useState11, 2),
      topic = _useState12[0],
      setTopic = _useState12[1];

  var topicRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    setTopic(name);
    setTopicRef(topicRef);
  }, [name, setTopicRef]);
  return /*#__PURE__*/_react["default"].createElement(_juno.RcTextField, {
    ref: topicRef // size="small"
    ,
    label: _i18n["default"].getString('topic', currentLocale),
    "data-sign": "topic",
    fullWidth: true,
    clearBtn: false,
    value: topic,
    inputProps: {
      maxLength: 255
    },
    onChange: function onChange(e) {
      setTopic(e.target.value);
    },
    onBlur: function onBlur() {
      updateMeetingTopic(topic);
    },
    classes: {
      root: _styles["default"].input
    }
  });
};

var Topic = /*#__PURE__*/_react["default"].memo(InnerTopic, function (prevProps, nextProps) {
  return prevProps.name === nextProps.name && prevProps.currentLocale === nextProps.currentLocale;
});

exports.Topic = Topic;
VideoConfig.defaultProps = {
  recipientsSection: undefined,
  showTopic: true,
  showWhen: true,
  showDuration: true,
  showAdminLock: false,
  showPmiAlert: false,
  enablePersonalMeeting: false,
  enableWaitingRoom: false,
  datePickerSize: 'medium',
  timePickerSize: 'medium',
  labelPlacement: 'start'
};
//# sourceMappingURL=VideoConfig.js.map
