"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthPage = void 0;
var _nextCore = require("@ringcentral-integration/next-core");
var _react = _interopRequireDefault(require("react"));
var _LoginPage = require("./LoginPage");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * @deprecated use pages/Auth/AuthPage instead
 */
var AuthPage = exports.AuthPage = function AuthPage(_ref) {
  var openOAuthPage = _ref.openOAuthPage,
    showSpinner = _ref.showSpinner,
    currentLocale = _ref.currentLocale,
    children = _ref.children,
    disabled = _ref.disabled,
    showSignUp = _ref.showSignUp,
    onSignUpButtonClick = _ref.onSignUpButtonClick;
  var match = (0, _nextCore.useRouteMatch)();
  var loginPath = "".concat(match.path);
  return /*#__PURE__*/_react["default"].createElement(_nextCore.Switch, null, /*#__PURE__*/_react["default"].createElement(_nextCore.Route, {
    path: loginPath,
    component: function component() {
      return /*#__PURE__*/_react["default"].createElement(_LoginPage.LoginPage, {
        disabled: disabled,
        children: children,
        showSpinner: showSpinner,
        currentLocale: currentLocale,
        openOAuthPage: openOAuthPage,
        showSignUp: showSignUp,
        onSignUpButtonClick: onSignUpButtonClick
      });
    }
  }));
};
//# sourceMappingURL=AuthPage.js.map
