"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeSwitcher = void 0;

var _juno = require("@ringcentral/juno");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ThemeSwitcher = function ThemeSwitcher() {
  var _useThemeSwitcher = (0, _juno.useThemeSwitcher)(),
      setTheme = _useThemeSwitcher.setTheme;

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    onClick: function onClick() {
      setTheme('light');
    }
  }, "Light"), /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    onClick: function onClick() {
      setTheme('dark');
    }
  }, "Dark"));
};

exports.ThemeSwitcher = ThemeSwitcher;
//# sourceMappingURL=ThemeSwitcher.js.map
