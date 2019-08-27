"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _themeContext = require("../commons/themeContext");

var _icons = _interopRequireDefault(require("../commons/icons.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ArrowSVG(_ref) {
  var theme = _ref.theme;

  if (theme.isOldUI) {
    return _react["default"].createElement("i", {
      role: "presentation",
      className: _icons["default"].msIconCaretSolidDown
    });
  }

  return _react["default"].createElement("i", {
    role: "presentation",
    className: _icons["default"].msIconChevronDown
  });
}

ArrowSVG.propTypes = {
  theme: _propTypes["default"].object.isRequired
};

var _default = (0, _themeContext.ThemeConsumer)(ArrowSVG);

exports["default"] = _default;
//# sourceMappingURL=index.js.map
