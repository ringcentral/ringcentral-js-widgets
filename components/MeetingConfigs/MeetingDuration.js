"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.parse-int");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeetingDuration = void 0;
require("react-widgets/dist/css/react-widgets.css");
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _DropdownList = _interopRequireDefault(require("react-widgets/lib/DropdownList"));
var _MeetingSection = _interopRequireDefault(require("../MeetingSection"));
var _constants = require("./constants");
var _helpers = require("./helpers");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var minutesList = (0, _helpers.getMinutesList)(_constants.MINUTE_SCALE);
var hoursList = (0, _helpers.getHoursList)(_constants.HOUR_SCALE);
var MeetingDuration = function MeetingDuration(_ref) {
  var currentLocale = _ref.currentLocale,
    meeting = _ref.meeting,
    update = _ref.update,
    isRecurring = _ref.isRecurring;
  return !isRecurring ? /*#__PURE__*/_react["default"].createElement(_MeetingSection["default"], {
    title: _i18n["default"].getString('duration', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].spaceBetween, _styles["default"].duration)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].list
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].hoursList
  }, /*#__PURE__*/_react["default"].createElement(_DropdownList["default"], {
    data: hoursList,
    valueField: "value",
    textField: "text"
    // @ts-expect-error TS(2345): Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
    ,
    value: parseInt(meeting.schedule.durationInMinutes / 60, 10),
    onChange: function onChange(_ref2) {
      var value = _ref2.value;
      var restMinutes = meeting.schedule.durationInMinutes % 60;
      // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
      var isMax = value === hoursList.slice(-1)[0].value;
      restMinutes = isMax ? 0 : restMinutes;
      var durationInMinutes = value * 60 + restMinutes;
      update(_objectSpread(_objectSpread({}, meeting), {}, {
        schedule: _objectSpread(_objectSpread({}, meeting.schedule), {}, {
          durationInMinutes: durationInMinutes
        })
      }));
    }
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].list
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].minutesList
  }, /*#__PURE__*/_react["default"].createElement(_DropdownList["default"], {
    data: minutesList,
    valueField: "value",
    textField: "text",
    value: meeting.schedule.durationInMinutes % 60 || 0,
    onChange: function onChange(_ref3) {
      var value = _ref3.value;
      var restHours = parseInt(
      // @ts-expect-error TS(2345): Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
      meeting.schedule.durationInMinutes / 60, 10);
      // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
      var isMax = restHours === hoursList.slice(-1)[0].value;
      var minutes = isMax ? 0 : value;
      var durationInMinutes = restHours * 60 + minutes;
      update(_objectSpread(_objectSpread({}, meeting), {}, {
        schedule: _objectSpread(_objectSpread({}, meeting.schedule), {}, {
          durationInMinutes: durationInMinutes
        })
      }));
    }
  }))))) : null;
};
exports.MeetingDuration = MeetingDuration;
//# sourceMappingURL=MeetingDuration.js.map
