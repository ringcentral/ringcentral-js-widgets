"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthPage = void 0;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
var _components = require("@ringcentral-integration/micro-core/src/app/components");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _components2 = require("@ringcentral-integration/next-widgets/components");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _welcome = _interopRequireDefault(require("./welcome.svg"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var AuthPage = exports.AuthPage = function AuthPage(_ref) {
  var logoUrl = _ref.logoUrl,
    className = _ref.className,
    disabled = _ref.disabled,
    children = _ref.children,
    showSignUp = _ref.showSignUp,
    openOAuthPage = _ref.openOAuthPage,
    _ref$showSpinner = _ref.showSpinner,
    showSpinner = _ref$showSpinner === void 0 ? false : _ref$showSpinner,
    appName = _ref.appName,
    brandName = _ref.brandName,
    welcomePicture = _ref.welcomePicture,
    description = _ref.description,
    onSignUpButtonClick = _ref.onSignUpButtonClick;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;

  // use AppFooter for toast position calculation
  var _useAppFooter = (0, _components.useAppFooter)({
      defaultFooter: /*#__PURE__*/_react["default"].createElement("div", {
        className: "w-full flex flex-col justify-start items-center gap-4 px-3"
      }, /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
        color: "primary",
        size: "medium",
        variant: "contained",
        onClick: openOAuthPage,
        disabled: disabled,
        "data-sign": "loginButton",
        fullWidth: true
      }, t('loginButton')), showSignUp ? /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex typography-descriptor text-neutral-b2 pb-3"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        "data-sign": "newUser",
        className: "text-nowrap"
      }, t('newUser')), /*#__PURE__*/_react["default"].createElement("button", {
        className: "pl-1 underline hover:text-neutral-b2/70 active:text-neutral-b2/80 outline-none focus:text-neutral-b2/80",
        onClick: onSignUpButtonClick,
        "data-sign": "signUpButton"
      }, t('tryForFree'))) : /*#__PURE__*/_react["default"].createElement("div", {
        className: "h-2"
      }), children),
      additionalFooterHeight: -16
    }),
    footer = _useAppFooter.footer;
  return /*#__PURE__*/_react["default"].createElement(_components2.SpringSpinnerOverlay, {
    loading: showSpinner
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('flex flex-col items-center justify-between pt-6 px-3 gap-12', className)
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: logoUrl,
    alt: "logo",
    className: "w-[158px] h-[24px]"
  }), welcomePicture !== null && welcomePicture !== void 0 ? welcomePicture : /*#__PURE__*/_react["default"].createElement(_welcome["default"], {
    width: "240",
    height: "170"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col justify-start items-center gap-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-neutral-b0 typography-display3 text-center",
    "data-sign": "login-title"
  }, t('title', {
    brandName: brandName
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col justify-start items-center gap-1"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "typography-descriptor text-center text-neutral-b0",
    "data-sign": "login-desc"
  }, description !== null && description !== void 0 ? description : t('description', {
    appName: appName
  }))))), /*#__PURE__*/_react["default"].createElement("i", {
    className: "flex-auto"
  }), footer);
};
//# sourceMappingURL=AuthPage.js.map
