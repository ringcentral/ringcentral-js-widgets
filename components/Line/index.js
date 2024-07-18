"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Line = function Line(_ref) {
  var dataSign = _ref.dataSign,
    className = _ref.className,
    onClick = _ref.onClick,
    horizontal = _ref.horizontal,
    noBorder = _ref.noBorder,
    children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": dataSign,
    className: (0, _clsx["default"])(_styles["default"].root, className, onClick && _styles["default"].clickable, horizontal && _styles["default"].horizontal, noBorder && _styles["default"].noborder),
    onClick: onClick
  }, children);
};
var _default = Line;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
