"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginPanel = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireDefault(require("react"));
var _HeaderViewUtils = require("../HeaderView/utils/HeaderViewUtils");
var _SpinnerOverlay = require("../SpinnerOverlay");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  bottom: 1%;\n  right: 1%;\n  ", ";\n  color: ", ";\n"]);
  _templateObject4 = function _templateObject4() {
    return data;
  };
  return data;
}
function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  ", ";\n  flex-direction: column;\n  background-color: ", ";\n  padding: 0 10% ", "px;\n"]);
  _templateObject3 = function _templateObject3() {
    return data;
  };
  return data;
}
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  margin-top: 5%;\n"]);
  _templateObject2 = function _templateObject2() {
    return data;
  };
  return data;
}
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", "\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var CustomButton = (0, _juno.styled)(_juno.RcButton)(_templateObject(), (0, _juno.typography)('caption2'));
var SignUpButton = (0, _juno.styled)(CustomButton)(_templateObject2());
var LoginWrapper = _juno.styled.div(_templateObject3(), _juno.flexCenterStyle, (0, _juno.palette2)('neutral', 'b01'), _HeaderViewUtils.headerViewHeight);
var VersionWrapper = _juno.styled.div(_templateObject4(), (0, _juno.typography)('caption1'), (0, _juno.palette2)('neutral', 'f03'));
var LoginPanel = function LoginPanel(_ref) {
  var className = _ref.className,
    onLoginButtonClick = _ref.onLoginButtonClick,
    currentLocale = _ref.currentLocale,
    disabled = _ref.disabled,
    version = _ref.version,
    showSpinner = _ref.showSpinner,
    customSpinner = _ref.customSpinner,
    children = _ref.children,
    showSignUp = _ref.showSignUp,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    onSignUpButtonClick = _ref.onSignUpButtonClick,
    customStyles = _ref.customStyles;
  return /*#__PURE__*/_react["default"].createElement(LoginWrapper, {
    className: className
  }, /*#__PURE__*/_react["default"].createElement(CustomButton, {
    variant: "contained",
    "data-sign": "loginButton",
    className: customStyles,
    fullWidth: true,
    onClick: onLoginButtonClick,
    disabled: disabled,
    size: size
  }, _i18n["default"].getString('loginButton', currentLocale)), showSignUp && /*#__PURE__*/_react["default"].createElement(SignUpButton, {
    variant: "outlined",
    fullWidth: true,
    onClick: onSignUpButtonClick,
    size: size
  }, _i18n["default"].getString('signupButton', currentLocale)), version && /*#__PURE__*/_react["default"].createElement(VersionWrapper, null, _i18n["default"].getString('version', currentLocale), " ", version), showSpinner && /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, customSpinner ? {
    custom: customSpinner
  } : {}), children);
};
exports.LoginPanel = LoginPanel;
LoginPanel.defaultProps = {};
//# sourceMappingURL=LoginPanel.js.map
