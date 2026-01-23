"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginPage = void 0;
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _components = require("../../components");
var _i18n = _interopRequireDefault(require("./i18n"));
var _welcome = _interopRequireDefault(require("./welcome.svg"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var LoginPage = exports.LoginPage = function LoginPage(_ref) {
  var className = _ref.className,
    disabled = _ref.disabled,
    children = _ref.children,
    showSignUp = _ref.showSignUp,
    openOAuthPage = _ref.openOAuthPage,
    _ref$showSpinner = _ref.showSpinner,
    showSpinner = _ref$showSpinner === void 0 ? false : _ref$showSpinner,
    appName = _ref.appName,
    brandName = _ref.brandName,
    onSignUpButtonClick = _ref.onSignUpButtonClick;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  return /*#__PURE__*/_react["default"].createElement(_components.SpringSpinnerOverlay, {
    loading: showSpinner
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('flex flex-col flex-auto items-center justify-between bg-neutral-base p-4 h-full overflow-hidden', className)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-8"
  }, /*#__PURE__*/_react["default"].createElement(_welcome["default"], {
    width: "160",
    height: "160"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mb-6 self-stretch flex flex-col justify-start items-center gap-5"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-neutral-b0 typography-title",
    "data-sign": "login-title"
  }, t('title', {
    brandName: brandName
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "self-stretch h-10 flex flex-col justify-start items-center gap-1"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "self-stretch typography-descriptor text-center text-neutral-b2",
    "data-sign": "login-desc"
  }, t('description', {
    appName: appName
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "container flex flex-col justify-start items-center gap-4"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
    className: "",
    color: "primary",
    size: "large",
    variant: "contained",
    onClick: openOAuthPage,
    disabled: disabled,
    "data-sign": "loginButton",
    fullWidth: true
  }, t('loginButton')), showSignUp && /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
    className: "",
    color: "primary",
    size: "large",
    variant: "outlined",
    onClick: onSignUpButtonClick,
    "data-sign": "signUpButton",
    fullWidth: true
  }, t('signupButton'))), children));
};
//# sourceMappingURL=LoginPage.js.map
