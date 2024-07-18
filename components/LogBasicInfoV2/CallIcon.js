"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallIcon = void 0;
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var CallIcon = function CallIcon(_ref) {
  var title = _ref.title,
    iconClassName = _ref.iconClassName;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].callIcon,
    title: title
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: iconClassName
  }));
};
exports.CallIcon = CallIcon;
CallIcon.defaultProps = {
  title: ''
};
//# sourceMappingURL=CallIcon.js.map
