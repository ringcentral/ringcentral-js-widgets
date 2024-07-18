"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _Line = _interopRequireDefault(require("../Line"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var InputLine = function InputLine(props) {
  return /*#__PURE__*/_react["default"].createElement(_Line["default"], {
    className: props.className,
    onClick: props.onClick,
    noBorder: props.noBorder
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].label
  }, props.label), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].inputHolder
  }, props.children));
};
var _default = InputLine;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
