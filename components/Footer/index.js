"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Footer = function Footer(props) {
  return /*#__PURE__*/_react["default"].createElement("footer", {
    className: (0, _clsx["default"])(_styles["default"].root, props.className)
  }, props.children);
};
var _default = exports["default"] = Footer;
//# sourceMappingURL=index.js.map
