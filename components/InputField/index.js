"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var InputField = function InputField(props) {
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": props.dataSign,
    className: (0, _classnames["default"])(_styles["default"].root, props.className)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].label
  }, props.label, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].hint
  }, props.labelHint)), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].inputHolder
  }, props.children));
};
InputField.defaultProps = {
  // @ts-expect-error TS(2322): Type '{ children: undefined; label: undefined; lab... Remove this comment to see the full error message
  children: undefined,
  label: undefined,
  labelHint: undefined,
  className: undefined,
  dataSign: undefined
};
var _default = InputField;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
