"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeInput = exports.MINS = exports.HOURS = exports.DAYS = void 0;
var _react = _interopRequireDefault(require("react"));
var _juno = require("@ringcentral/juno");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  && {\n    box-shadow: none;\n  }\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var MINS = 0;
exports.MINS = MINS;
var HOURS = 1;
exports.HOURS = HOURS;
var DAYS = 2;
exports.DAYS = DAYS;
var TimeButton = (0, _juno.styled)(_juno.RcButton)(_templateObject());
TimeButton.defaultProps = {
  size: 'xsmall',
  radius: 'round',
  keepElevation: false
};
var TimeInput = function TimeInput(_ref) {
  var timeValue = _ref.timeValue,
    onTimeValueChange = _ref.onTimeValueChange,
    inputRef = _ref.inputRef,
    currentLocale = _ref.currentLocale,
    timeUnit = _ref.timeUnit,
    onSelectTimeUnit = _ref.onSelectTimeUnit;
  var handleSelectTimeUnit = function handleSelectTimeUnit(e, unit) {
    e.stopPropagation();
    onSelectTimeUnit(unit);
  };
  var theme = (0, _juno.useTheme)();
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].timeInput
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].timeValue
  }, /*#__PURE__*/_react["default"].createElement("input", {
    maxLength: 2,
    value: timeValue,
    onChange: onTimeValueChange,
    ref: inputRef
  })), /*#__PURE__*/_react["default"].createElement(_juno.RcBox, {
    marginLeft: (0, _juno.spacing)(2)({
      theme: theme
    }),
    clone: true
  }, /*#__PURE__*/_react["default"].createElement(TimeButton, {
    onClick: function onClick(e) {
      return handleSelectTimeUnit(e, MINS);
    },
    variant: timeUnit === MINS ? 'contained' : 'text'
  }, _i18n["default"].getString('min', currentLocale))), /*#__PURE__*/_react["default"].createElement(TimeButton, {
    variant: timeUnit === HOURS ? 'contained' : 'text',
    onClick: function onClick(e) {
      return handleSelectTimeUnit(e, HOURS);
    }
  }, _i18n["default"].getString('hours', currentLocale)), /*#__PURE__*/_react["default"].createElement(TimeButton, {
    variant: timeUnit === DAYS ? 'contained' : 'text',
    onClick: function onClick(e) {
      return handleSelectTimeUnit(e, DAYS);
    }
  }, _i18n["default"].getString('days', currentLocale)));
};
exports.TimeInput = TimeInput;
TimeInput.defaultProps = {
  timeValue: '',
  timeUnit: MINS
};
//# sourceMappingURL=TimeInput.js.map
