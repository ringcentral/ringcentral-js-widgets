"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RcVideoScheduleButton = void 0;
var _react = _interopRequireDefault(require("react"));
var _juno = require("@ringcentral/juno");
var _MeetingScheduleButtonWrapper = require("../MeetingScheduleButton/MeetingScheduleButtonWrapper");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  padding: ", " 16px 16px\n    16px;\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function getI18nButtonString() {
  return _i18n["default"].getString('schedule');
}
var RcVideoScheduleButtonWrapper = (0, _juno.styled)(_MeetingScheduleButtonWrapper.MeetingScheduleButtonWrapper)(_templateObject(), function (_ref) {
  var $noCheckbox = _ref.$noCheckbox;
  return $noCheckbox ? (0, _juno.spacing)(4) : '5px';
});
var RcVideoScheduleButton = function RcVideoScheduleButton(props) {
  var hidden = props.hidden,
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
  }, buttonLabel || getI18nButtonString()));
};
exports.RcVideoScheduleButton = RcVideoScheduleButton;
//# sourceMappingURL=RcVideoScheduleButton.js.map
