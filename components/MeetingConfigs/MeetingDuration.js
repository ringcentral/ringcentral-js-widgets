"use strict";

require("core-js/modules/es6.object.define-properties");

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
exports.MeetingDuration = void 0;

require("core-js/modules/es6.array.slice");

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    textField: "text",
    value: parseInt(meeting.schedule.durationInMinutes / 60, 10),
    onChange: function onChange(_ref2) {
      var value = _ref2.value;
      var restMinutes = meeting.schedule.durationInMinutes % 60;
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
      var restHours = parseInt(meeting.schedule.durationInMinutes / 60, 10);
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
