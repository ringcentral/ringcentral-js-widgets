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
exports.RecurringOptions = void 0;
require("react-widgets/dist/css/react-widgets.css");
var _react = _interopRequireDefault(require("react"));
var _meetingHelper = require("@ringcentral-integration/commons/helpers/meetingHelper");
var _MeetingSection = _interopRequireDefault(require("../MeetingSection"));
var _Switch = _interopRequireDefault(require("../Switch"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var RecurringOptions = function RecurringOptions(_ref) {
  var isRecurring = _ref.isRecurring,
    currentLocale = _ref.currentLocale,
    update = _ref.update,
    meeting = _ref.meeting;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_MeetingSection["default"], {
    className: _styles["default"].section
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].RecurringMeetingDiv
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].spaceBetween
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].label
  }, _i18n["default"].getString('recurringMeeting', currentLocale)), /*#__PURE__*/_react["default"].createElement(_Switch["default"], {
    checked: isRecurring,
    onChange: function onChange(isCheckRecurring) {
      var meetingType = isCheckRecurring ? _meetingHelper.MeetingType.RECURRING : _meetingHelper.MeetingType.SCHEDULED;
      update(_objectSpread(_objectSpread({}, meeting), {}, {
        meetingType: meetingType
      }));
    },
    dataSign: "recuttingMeeting"
  })), isRecurring ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].recurringDescribe
  }, _i18n["default"].getString('recurringDescribe', currentLocale)) : null)));
};
exports.RecurringOptions = RecurringOptions;
RecurringOptions.defaultProps = {
  occurrenceDesc: 'N/A'
};
//# sourceMappingURL=RecurringOptions.js.map
