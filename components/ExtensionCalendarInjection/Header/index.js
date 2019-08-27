"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _CloseButton = _interopRequireDefault(require("../CloseButton"));

var _themeContext = require("../commons/themeContext");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Header(props) {
  var theme = props.theme,
      onClose = props.onClose,
      i18n = props.i18n;

  if (theme.isOldUI) {
    return _react["default"].createElement("div", {
      className: _styles["default"].isOldHeader
    }, _react["default"].createElement(_CloseButton["default"], {
      className: _styles["default"].headerCloseButton,
      onClick: onClose
    }), _react["default"].createElement("div", {
      className: _styles["default"].headerTitle
    }, i18n.popupTitle));
  }

  return _react["default"].createElement("div", {
    className: _styles["default"].header
  }, _react["default"].createElement("div", {
    className: _styles["default"].headerTitle
  }, i18n.popupTitle), _react["default"].createElement(_CloseButton["default"], {
    onClick: onClose
  }));
}

Header.propTypes = {
  theme: _propTypes["default"].object.isRequired,
  onClose: _propTypes["default"].func.isRequired,
  i18n: _propTypes["default"].object.isRequired
};

var _default = (0, _themeContext.ThemeConsumer)(Header);

exports["default"] = _default;
//# sourceMappingURL=index.js.map
