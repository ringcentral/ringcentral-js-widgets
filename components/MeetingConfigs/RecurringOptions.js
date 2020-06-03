"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecurringOptions = void 0;

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

require("react-widgets/dist/css/react-widgets.css");

var _react = _interopRequireDefault(require("react"));

var _MeetingSection = _interopRequireDefault(require("../MeetingSection"));

var _Switch = _interopRequireDefault(require("../Switch"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      var meetingType = isCheckRecurring ? 'ScheduledRecurring' : 'Scheduled';
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
