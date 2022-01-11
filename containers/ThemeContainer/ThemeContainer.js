"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeContainer = exports.GlobalStyle = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = require("@ringcentral/juno/es6/foundation/styled-components.js");

var _ThemeProvider = require("@ringcentral/juno/es6/foundation/theme/ThemeProvider.js");

var _phoneContext = require("../../lib/phoneContext");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var GlobalVariablesStyles = (0, _styledComponents.createGlobalStyle)(_templateObject(), function (_ref) {
  var variable = _ref.variable,
      theme = _ref.theme;
  return (0, _utils.getThemeVariableString)(variable, theme);
});
var GlobalStyle = (0, _styledComponents.createGlobalStyle)(_templateObject2(), function (_ref2) {
  var style = _ref2.style;
  return style;
});
exports.GlobalStyle = GlobalStyle;

var ThemeProvider = function ThemeProvider(_ref3) {
  var children = _ref3.children,
      theme = _ref3.theme,
      variable = _ref3.variable,
      prefixGlobalClass = _ref3.prefixGlobalClass;
  return /*#__PURE__*/_react["default"].createElement(_ThemeProvider.RcThemeProvider, {
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
