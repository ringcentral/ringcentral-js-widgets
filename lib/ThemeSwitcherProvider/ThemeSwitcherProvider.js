"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeSwitcherProvider = exports.ThemeSwitcherDefaultTheme = void 0;

require("./styles.scss");

var _juno = require("@ringcentral/juno");

var _react = _interopRequireDefault(require("react"));

var _theme = require("../phoneContext/theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ThemeSwitcherDefaultTheme = {
  defaultTheme: 'light',
  themeMap: {
    light: _theme.defaultTheme,
    dark: _juno.RcDefaultDarkTheme
  }
};
exports.ThemeSwitcherDefaultTheme = ThemeSwitcherDefaultTheme;

var ThemeSwitcherProvider = function ThemeSwitcherProvider(_ref) {
  var children = _ref.children,
      _ref$defaultTheme = _ref.defaultTheme,
      defaultTheme = _ref$defaultTheme === void 0 ? ThemeSwitcherDefaultTheme.defaultTheme : _ref$defaultTheme,
      _ref$themeMap = _ref.themeMap,
      themeMap = _ref$themeMap === void 0 ? ThemeSwitcherDefaultTheme.themeMap : _ref$themeMap;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcThemeSwitcherProvider, {
    defaultTheme: defaultTheme,
    themeMap: themeMap
  }, children);
};

exports.ThemeSwitcherProvider = ThemeSwitcherProvider;
//# sourceMappingURL=ThemeSwitcherProvider.js.map
