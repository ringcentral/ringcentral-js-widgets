"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Line = function Line(_ref) {
  var dataSign = _ref.dataSign,
      className = _ref.className,
      onClick = _ref.onClick,
      horizontal = _ref.horizontal,
      noBorder = _ref.noBorder,
      children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": dataSign,
    className: (0, _classnames["default"])(_styles["default"].root, className, onClick && _styles["default"].clickable, horizontal && _styles["default"].horizontal, noBorder && _styles["default"].noborder),
    onClick: onClick
  }, children);
};

var _default = Line;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
