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

var _icons = _interopRequireDefault(require("../commons/icons.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function CloseButton(_ref) {
  var onClick = _ref.onClick,
      className = _ref.className;
  return _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].closeButton, className),
    onClick: onClick
  }, _react["default"].createElement("i", {
    role: "presentation",
    className: _icons["default"].msIconCancel
  }));
}

CloseButton.propTypes = {
  onClick: _propTypes["default"].func.isRequired,
  className: _propTypes["default"].string
};
CloseButton.defaultProps = {
  className: ''
};
var _default = CloseButton;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
