"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.default = void 0;

var _reactRedux = require("react-redux");

var _loginStatus = _interopRequireDefault(require("ringcentral-integration/modules/Auth/loginStatus"));

var _LoginPanel = _interopRequireDefault(require("../../components/LoginPanel"));

var _phoneContext = require("../../lib/phoneContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      auth = _ref$phone.auth,
      locale = _ref$phone.locale,
      rateLimiter = _ref$phone.rateLimiter,
      connectivityMonitor = _ref$phone.connectivityMonitor,
      oAuth = _ref$phone.oAuth,
      version = _ref.version,
      _ref$showSignUp = _ref.showSignUp,
      showSignUp = _ref$showSignUp === void 0 ? false : _ref$showSignUp,
      onSignUpButtonClick = _ref.onSignUpButtonClick;
  return {
    currentLocale: locale.currentLocale,
    disabled: !oAuth.oAuthReady || rateLimiter.throttling || !connectivityMonitor.connectivity,
    version: version,
    showSpinner: !auth.ready || auth.loginStatus === _loginStatus.default.loggingIn || auth.loginStatus === _loginStatus.default.loggingOut || auth.loginStatus === _loginStatus.default.beforeLogout || auth.loginStatus === _loginStatus.default.loggedIn,
    showSignUp: showSignUp,
    onSignUpButtonClick: onSignUpButtonClick
  };
}

function mapToFunctions(_, _ref2) {
  var oAuth = _ref2.phone.oAuth;
  return {
    setupOAuth: function setupOAuth() {
      oAuth.setupOAuth();
    },
    destroyOAuth: function destroyOAuth() {
      oAuth.destroyOAuth();
    },
    onLoginButtonClick: function onLoginButtonClick() {
      oAuth.openOAuthPage();
    }
  };
}

var WelcomePage = (0, _phoneContext.withPhone)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_LoginPanel.default));
exports.default = WelcomePage;
//# sourceMappingURL=index.js.map
