"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationPanel = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AnimationPanel = function AnimationPanel(_ref) {
  var children = _ref.children,
      className = _ref.className,
      open = _ref.open,
      style = _ref.style;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].root, open ? _styles["default"].active : null, className),
    style: style
  }, children);
};

exports.AnimationPanel = AnimationPanel;
//# sourceMappingURL=AnimationPanel.js.map
