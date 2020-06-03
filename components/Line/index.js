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

function Line(props) {
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": props.dataSign,
    className: (0, _classnames["default"])(_styles["default"].root, props.className, props.onClick && _styles["default"].clickable, props.horizontal && _styles["default"].horizontal, props.noBorder && _styles["default"].noborder),
    onClick: props.onClick
  }, props.children);
}

Line.propTypes = {
  dataSign: _propTypes["default"].string,
  className: _propTypes["default"].string,
  children: _propTypes["default"].node,
  onClick: _propTypes["default"].func,
  horizontal: _propTypes["default"].bool,
  noBorder: _propTypes["default"].bool
};
Line.defaultProps = {
  dataSign: null,
  noBorder: false
};
var _default = Line;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
