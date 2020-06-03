"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Panel(props) {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].root, props.className)
  }, props.children);
}

Panel.propTypes = {
  className: _propTypes["default"].string,
  children: _propTypes["default"].node
};
var _default = Panel;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
