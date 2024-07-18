"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RcVideoScheduleButton = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireDefault(require("react"));
var _MeetingScheduleButtonWrapper = require("../MeetingScheduleButton/MeetingScheduleButtonWrapper");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  padding: ", " 16px 16px\n    16px;\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function getI18nButtonString() {
  return _i18n["default"].getString('schedule');
}
var RcVideoScheduleButtonWrapper = (0, _juno.styled)(_MeetingScheduleButtonWrapper.MeetingScheduleButtonWrapper)(_templateObject(), function (_ref) {
  var $noCheckbox = _ref.$noCheckbox;
  return $noCheckbox ? (0, _juno.spacing)(4) : '5px';
});
var RcVideoScheduleButton = function RcVideoScheduleButton(props) {
  var _props$hidden = props.hidden,
    hidden = _props$hidden === void 0 ? false : _props$hidden,
    disabled = props.disabled,
    meeting = props.meeting,
    onClick = props.onClick,
    currentLocale = props.currentLocale,
    showSaveAsDefault = props.showSaveAsDefault,
    disableSaveAsDefault = props.disableSaveAsDefault,
    update = props.update,
    buttonLabel = props.buttonLabel;
  return /*#__PURE__*/_react["default"].createElement(RcVideoScheduleButtonWrapper, {
    $hidden: hidden,
    $noCheckbox: !showSaveAsDefault
  }, showSaveAsDefault ? /*#__PURE__*/_react["default"].createElement(_juno.RcCheckbox, {
    label: _i18n["default"].getString('saveAsDefault', currentLocale),
    "data-sign": "saveAsDefault",
    checked: meeting.saveAsDefault,
    disabled: disableSaveAsDefault,
    onChange: function onChange() {
      update(_objectSpread(_objectSpread({}, meeting), {}, {
        saveAsDefault: !meeting.saveAsDefault
      }));
    }
  }) : null, /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    onClick: onClick,
    disabled: disabled,
    "data-sign": "videoScheduleButton",
    fullWidth: true
  }, buttonLabel !== null && buttonLabel !== void 0 ? buttonLabel : getI18nButtonString()));
};
exports.RcVideoScheduleButton = RcVideoScheduleButton;
//# sourceMappingURL=RcVideoScheduleButton.js.map
