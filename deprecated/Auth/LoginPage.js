"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginPage = void 0;
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _SpinnerOverlay = require("@ringcentral-integration/widgets/components/SpinnerOverlay");
var _flexCenter = require("@ringcentral/juno/es6/foundation/styles/flexCenter.js");
var _newPalette = require("@ringcentral/juno/es6/foundation/styles/newPalette.js");
var _Button = require("@ringcentral/juno/es6/components/Buttons/Button/Button.js");
var _spacing = require("@ringcentral/juno/es6/foundation/styles/spacing.js");
var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));
var _typography = require("@ringcentral/juno/es6/foundation/styles/typography.js");
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var CustomButton = (0, _styledComponents["default"])(_Button.RcButton)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  ", "\n"])), (0, _typography.typography)('caption2'));
var SignUpButton = (0, _styledComponents["default"])(CustomButton)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  margin-top: 5%;\n"])));
var LoginWrapper = _styledComponents["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  ", ";\n  flex: 1 1 auto;\n  flex-direction: column;\n  background-color: ", ";\n  overflow: hidden;\n  padding: ", ";\n  height: 100%;\n"])), _flexCenter.flexCenterStyle, (0, _newPalette.palette2)('neutral', 'b01'), (0, _spacing.spacing)(4));
var VersionWrapper = _styledComponents["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  position: absolute;\n  bottom: 1%;\n  right: 1%;\n  ", ";\n  color: ", ";\n"])), (0, _typography.typography)('caption1'), (0, _newPalette.palette2)('neutral', 'f03'));
var LoginPage = exports.LoginPage = function LoginPage(_ref) {
  var className = _ref.className,
    disabled = _ref.disabled,
    version = _ref.version,
    children = _ref.children,
    showSignUp = _ref.showSignUp,
    openOAuthPage = _ref.openOAuthPage,
    currentLocale = _ref.currentLocale,
    _ref$showSpinner = _ref.showSpinner,
    showSpinner = _ref$showSpinner === void 0 ? false : _ref$showSpinner,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    onSignUpButtonClick = _ref.onSignUpButtonClick;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  return /*#__PURE__*/_react["default"].createElement(LoginWrapper, {
    className: className
  }, /*#__PURE__*/_react["default"].createElement(CustomButton, {
    "data-sign": "loginButton",
    variant: "contained",
    fullWidth: true,
    onClick: function onClick() {
      openOAuthPage();
    },
    disabled: disabled,
    size: size
  }, t('loginButton')), showSignUp && /*#__PURE__*/_react["default"].createElement(SignUpButton, {
    variant: "outlined",
    fullWidth: true,
    size: size,
    onClick: onSignUpButtonClick
  }, t('signupButton')), version && /*#__PURE__*/_react["default"].createElement(VersionWrapper, null, t('version'), " ", version), showSpinner && /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null), children);
};
//# sourceMappingURL=LoginPage.js.map
