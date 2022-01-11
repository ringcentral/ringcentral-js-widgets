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

var Footer = function Footer(props) {
  return /*#__PURE__*/_react["default"].createElement("footer", {
    className: (0, _classnames["default"])(_styles["default"].root, props.className)
  }, props.children);
};

var _default = Footer;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
