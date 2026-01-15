"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeInput = exports.MINS = exports.HOURS = exports.DAYS = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
var _templateObject;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var MINS = exports.MINS = 0;
var HOURS = exports.HOURS = 1;
var DAYS = exports.DAYS = 2;
var TimeButton = (0, _juno.styled)(_juno.RcButton)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  && {\n    box-shadow: none;\n  }\n"])));
TimeButton.defaultProps = {
  size: 'xsmall',
  radius: 'round',
  keepElevation: false
};
var TimeInput = exports.TimeInput = function TimeInput(_ref) {
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
TimeInput.defaultProps = {
  timeValue: '',
  timeUnit: MINS
};
//# sourceMappingURL=TimeInput.js.map
