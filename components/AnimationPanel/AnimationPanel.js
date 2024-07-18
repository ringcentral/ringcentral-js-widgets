"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationPanel = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var AnimationPanel = function AnimationPanel(_ref) {
  var children = _ref.children,
    className = _ref.className,
    open = _ref.open,
    style = _ref.style;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].root, open ? _styles["default"].active : null, className),
    style: style
  }, children);
};
exports.AnimationPanel = AnimationPanel;
//# sourceMappingURL=AnimationPanel.js.map
