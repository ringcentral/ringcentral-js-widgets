"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeContainer = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

var _juno = require("@ringcentral/juno");

var _react = _interopRequireDefault(require("react"));

var _phoneContext = require("../../lib/phoneContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    :root {\n      --rc-blue: ", ";\n      --bigRed: ", ";\n      --darkRed: ", ";\n      --tomato: ", ";\n      --orange: ", ";\n      --leaf: ", ";\n      --dark: ", ";\n      --night: ", ";\n      --ash: ", ";\n      --coin: ", ";\n      --smoke: ", ";\n      --silver: ", ";\n      --egg: ", ";\n      --snow: ", ";\n      --rc-orange: ", ";\n      --darkergray: ", ";\n      --darkgray: ", ";\n      --gray: ", ";\n      --bggray: ", ";\n      --lightergray: ", ";\n      --lightgray: ", ";\n      --grey-light: ", ";\n      --missed: ", ";\n      --active: ", ";\n      --primary-color: ", ";\n      --primary-color-highlight: ", ";\n      --primary-color-highlight-solid: ", ";\n      --line-panel-background-color: ", ";\n      --call-btn-color: ", ";\n      --extension-background-color: ", ";\n      --sms-bubble-background-color: ", ";\n      --brand-font-color: ", ";\n      --brand-font-color-highlight: ", ";\n      --jupiter-background-color: ", ";\n      ", "\n      --c2d-arrow-color: ", ";\n      --add-meeting-btn-color: ", ";\n      --add-meeting-btn-text-color: ", ";\n      --header-logo-width: ", ";\n      --header-logo-height: ", ";\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var GlobalVariablesCss = function GlobalVariablesCss(_ref) {
  var variable = _ref.variable;
  return (0, _juno.css)(_templateObject(), variable.rcBlue, variable.bigRed, variable.darkRed, variable.tomato, variable.orange, variable.leaf, variable.dark, variable.night, variable.ash, variable.coin, variable.smoke, variable.silver, variable.egg, variable.snow, variable.rcOrange, variable.darkergray, variable.darkgray, variable.gray, variable.bggray, variable.lightergray, variable.lightgray, variable.greyLight, variable.missed, variable.active, variable.primaryColor, variable.primaryColorHighlight, variable.primaryColorHighlightSolid, variable.linePanelBackgroundColor, variable.callBtnColor, variable.extensionBackgroundColor, variable.smsBubbleBackgroundColor, variable.brandFontColor, variable.brandFontColorHighlight, variable.jupiterBackgroundColor, ''
  /** project related overwrite */
  , variable.c2dArrowColor, variable.addMeetingBtnColor, variable.addMeetingBtnTextColor, variable.headerLogoWidth, variable.headerLogoHeight);
};

var GlobalVariablesStyles = (0, _juno.createGlobalStyle)(_templateObject2(), GlobalVariablesCss);

var ThemeProvider = function ThemeProvider(_ref2) {
  var children = _ref2.children,
      theme = _ref2.theme,
      variable = _ref2.variable;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcThemeProvider, {
    theme: theme
  }, /*#__PURE__*/_react["default"].createElement(GlobalVariablesStyles, {
    variable: variable
  }), children);
};

var ThemeContainer = (0, _phoneContext.connectModule)(function (phone) {
  return phone.themeUI;
})(ThemeProvider);
exports.ThemeContainer = ThemeContainer;
//# sourceMappingURL=ThemeContainer.js.map
