"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticationFailed = void 0;
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _FormattedMessage = _interopRequireDefault(require("@ringcentral-integration/widgets/components/FormattedMessage"));
var _Button = require("@ringcentral/juno/es6/components/Buttons/Button/Button.js");
var _Icon = require("@ringcentral/juno/es6/components/Icon/Icon.js");
var _Typography = require("@ringcentral/juno/es6/components/Typography/Typography.js");
var _flexCenter = require("@ringcentral/juno/es6/foundation/styles/flexCenter.js");
var _spacing = require("@ringcentral/juno/es6/foundation/styles/spacing.js");
var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));
var _DeleteCircle = _interopRequireDefault(require("@ringcentral/juno-icon/es6/DeleteCircle.js"));
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _templateObject, _templateObject2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var FooterHeight = '68px';
var Footer = _styledComponents["default"].footer(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  width: 100%;\n  height: ", ";\n  position: fixed;\n  bottom: 0;\n  ", ";\n  justify-content: space-evenly;\n"])), FooterHeight, _flexCenter.flexCenterStyle);
var AuthenticationWrapper = _styledComponents["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  padding-top: 179px;\n  text-align: center;\n  p {\n    margin-top: ", ";\n    padding: 0 30px;\n  }\n  ", " {\n    height: 98px;\n    flex-direction: column;\n    ", " {\n      margin: 0 0 20px 0;\n    }\n    ", ":first-child {\n      width: 240px;\n      height: 36px;\n    }\n  }\n"])), (0, _spacing.spacing)(1), Footer, _Button.RcButton, _Button.RcButton);
var AuthenticationFailed = exports.AuthenticationFailed = function AuthenticationFailed(_ref) {
  var onSignOut = _ref.onSignOut,
    onTryAgain = _ref.onTryAgain,
    tryAgainAfterSeconds = _ref.tryAgainAfterSeconds;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  return /*#__PURE__*/_react["default"].createElement(AuthenticationWrapper, {
    "data-sign": "loadingArea"
  }, /*#__PURE__*/_react["default"].createElement(_Icon.RcIcon, {
    symbol: _DeleteCircle["default"],
    color: "danger.f02"
  }), /*#__PURE__*/_react["default"].createElement(_Typography.RcTypography, {
    variant: "caption1",
    color: "neutral.f06",
    align: "center"
  }, t('canNotAuthenticate')), !tryAgainAfterSeconds ? /*#__PURE__*/_react["default"].createElement(_Typography.RcTypography, {
    variant: "caption1",
    color: "neutral.f06",
    align: "center"
  }, t('tryAgainNow')) : /*#__PURE__*/_react["default"].createElement(_Typography.RcTypography, {
    variant: "caption1",
    color: "neutral.f06",
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
    message: t('tryAgainLater'),
    values: {
      seconds: "".concat(tryAgainAfterSeconds)
    }
  })), /*#__PURE__*/_react["default"].createElement(Footer, null, /*#__PURE__*/_react["default"].createElement(_Button.RcButton, {
    variant: "outlined",
    onClick: onTryAgain,
    size: "large",
    disabled: !!tryAgainAfterSeconds,
    "data-sign": "tryAgain"
  }, t('tryBtn')), /*#__PURE__*/_react["default"].createElement(_Button.RcButton, {
    variant: "plain",
    onClick: onSignOut,
    size: "large",
    "data-sign": "signOut"
  }, t('signOut'))));
};
//# sourceMappingURL=AuthenticationFailed.js.map
