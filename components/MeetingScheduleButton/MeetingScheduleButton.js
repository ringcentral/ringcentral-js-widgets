"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeetingScheduleButton = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireDefault(require("react"));
var _MeetingScheduleButtonWrapper = require("./MeetingScheduleButtonWrapper");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MeetingScheduleButton = function MeetingScheduleButton(_ref) {
  var meeting = _ref.meeting,
    scheduleButtonLabel = _ref.scheduleButtonLabel,
    currentLocale = _ref.currentLocale,
    _ref$hidden = _ref.hidden,
    hidden = _ref$hidden === void 0 ? false : _ref$hidden,
    _ref$showSaveAsDefaul = _ref.showSaveAsDefault,
    showSaveAsDefault = _ref$showSaveAsDefaul === void 0 ? false : _ref$showSaveAsDefaul,
    _ref$disableSaveAsDef = _ref.disableSaveAsDefault,
    disableSaveAsDefault = _ref$disableSaveAsDef === void 0 ? false : _ref$disableSaveAsDef,
    _ref$showLaunchMeetin = _ref.showLaunchMeetingBtn,
    showLaunchMeetingBtn = _ref$showLaunchMeetin === void 0 ? false : _ref$showLaunchMeetin,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$scheduling = _ref.scheduling,
    scheduling = _ref$scheduling === void 0 ? false : _ref$scheduling,
    update = _ref.update,
    onClick = _ref.onClick,
    launchMeeting = _ref.launchMeeting;
  return /*#__PURE__*/_react["default"].createElement(_MeetingScheduleButtonWrapper.MeetingScheduleButtonWrapper, {
    $hidden: hidden
  }, hidden ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].actionPrompt
  }, _i18n["default"].getString('prompt')) : null, showSaveAsDefault ? /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
    "data-sign": "saveAsDefault",
    checked: meeting === null || meeting === void 0 ? void 0 : meeting.saveAsDefault,
    disabled: disableSaveAsDefault,
    className: _styles["default"].saveAsDefault,
    formControlLabelProps: {
      classes: {
        label: _styles["default"].saveAsDefaultLabel
      }
    },
    onChange: function onChange() {
      return update === null || update === void 0 ? void 0 : update(_objectSpread(_objectSpread({}, meeting), {}, {
        saveAsDefault: !(meeting === null || meeting === void 0 ? void 0 : meeting.saveAsDefault)
      }));
    },
    label: _i18n["default"].getString('saveAsDefault', currentLocale)
  }) : null, /*#__PURE__*/_react["default"].createElement(_MeetingScheduleButtonWrapper.ScheduleButton, {
    onClick: onClick,
    disabled: disabled,
    loadingMode: "suffix",
    loading: scheduling,
    "data-sign": "meetingScheduleButton",
    fullWidth: true
  }, scheduleButtonLabel !== null && scheduleButtonLabel !== void 0 ? scheduleButtonLabel : _i18n["default"].getString('schedule')), showLaunchMeetingBtn ? /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    className: _styles["default"].gutter,
    onClick: function onClick() {
      return launchMeeting === null || launchMeeting === void 0 ? void 0 : launchMeeting(meeting);
    },
    "data-sign": "launchMeetingButton",
    variant: "text",
    fullWidth: true
  }, _i18n["default"].getString('launchMeeting', currentLocale)) : null);
};
exports.MeetingScheduleButton = MeetingScheduleButton;
//# sourceMappingURL=MeetingScheduleButton.js.map
