"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = LoginPanel;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _SpinnerOverlay = _interopRequireDefault(require("../SpinnerOverlay"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function LoginPanel(_ref) {
  var className = _ref.className,
      onLoginButtonClick = _ref.onLoginButtonClick,
      currentLocale = _ref.currentLocale,
      disabled = _ref.disabled,
      version = _ref.version,
      showSpinner = _ref.showSpinner,
      customSpinner = _ref.customSpinner,
      children = _ref.children,
      showSignUp = _ref.showSignUp,
      onSignUpButtonClick = _ref.onSignUpButtonClick,
      customStyles = _ref.customStyles;
  var spinner = showSpinner ? _react["default"].createElement(_SpinnerOverlay["default"], customSpinner ? {
    custom: customSpinner
  } : {}) : null;
  var versionDisplay = version ? _react["default"].createElement("div", {
    className: _styles["default"].versionContainer
  }, _i18n["default"].getString('version', currentLocale), " ", version) : null;
  return _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].root, className)
  }, _react["default"].createElement("button", {
    type: "button",
    "data-sign": "loginButton",
    className: (0, _classnames["default"])(_styles["default"].loginButton, customStyles),
    onClick: onLoginButtonClick,
    disabled: disabled
  }, _i18n["default"].getString('loginButton', currentLocale)), showSignUp && _react["default"].createElement("button", {
    type: "button",
    className: _styles["default"].signUpButton,
    onClick: onSignUpButtonClick
  }, _i18n["default"].getString('signupButton', currentLocale)), versionDisplay, spinner, children);
}

LoginPanel.propTypes = {
  className: _propTypes["default"].string,
  currentLocale: _propTypes["default"].string.isRequired,
  onLoginButtonClick: _propTypes["default"].func.isRequired,
  disabled: _propTypes["default"].bool,
  version: _propTypes["default"].string,
  showSpinner: _propTypes["default"].bool,
  customSpinner: _propTypes["default"].func,
  children: _propTypes["default"].node,
  showSignUp: _propTypes["default"].bool,
  onSignUpButtonClick: _propTypes["default"].func,
  customStyles: _propTypes["default"].string
};
LoginPanel.defaultProps = {
  className: null,
  disabled: false,
  version: undefined,
  showSpinner: false,
  customSpinner: undefined,
  children: undefined,
  showSignUp: false,
  onSignUpButtonClick: function onSignUpButtonClick() {},
  customStyles: undefined
};
//# sourceMappingURL=index.js.map
