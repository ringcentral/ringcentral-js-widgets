"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Badge(_ref) {
  var className = _ref.className,
      name = _ref.name,
      children = _ref.children,
      onClick = _ref.onClick;
  return /*#__PURE__*/_react["default"].createElement("div", {
    title: name,
    className: (0, _classnames["default"])(_styles["default"].root, className),
    onClick: onClick
  }, children);
}

Badge.propTypes = {
  onClick: _propTypes["default"].func,
  className: _propTypes["default"].string,
  name: _propTypes["default"].string.isRequired,
  children: _propTypes["default"].node.isRequired
};
Badge.defaultProps = {
  className: null,
  name: null,
  onClick: function onClick() {
    return null;
  }
};
var _default = Badge;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
