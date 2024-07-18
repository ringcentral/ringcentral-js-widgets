"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeContainer = exports.GlobalStyle = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireDefault(require("react"));
var _phoneContext = require("../../lib/phoneContext");
var _utils = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  :root {\n    ", ";\n  }\n"]);
  _templateObject2 = function _templateObject2() {
    return data;
  };
  return data;
}
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  :root {\n    ", ";\n  }\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var GlobalVariablesStyles = (0, _juno.createGlobalStyle)(_templateObject(), function (_ref) {
  var variable = _ref.variable,
    theme = _ref.theme;
  return (0, _utils.getThemeVariableString)(variable, theme);
});
var GlobalStyle = (0, _juno.createGlobalStyle)(_templateObject2(), function (_ref2) {
  var style = _ref2.style;
  return style;
});
exports.GlobalStyle = GlobalStyle;
var ThemeProvider = function ThemeProvider(_ref3) {
  var children = _ref3.children,
    theme = _ref3.theme,
    variable = _ref3.variable,
    prefixGlobalClass = _ref3.prefixGlobalClass;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, {
    theme: theme,
    prefixGlobalClass: prefixGlobalClass
  }, /*#__PURE__*/_react["default"].createElement(GlobalVariablesStyles, {
    variable: variable
  }), children);
};
var ThemeContainer = (0, _phoneContext.connectModule)(function (phone) {
  return phone.themeUI;
})(ThemeProvider);
exports.ThemeContainer = ThemeContainer;
//# sourceMappingURL=ThemeContainer.js.map
