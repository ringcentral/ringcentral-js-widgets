'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mapToProps = exports.mapToFunctions = undefined;

var _reactRedux = require('react-redux');

var _loginStatus = require('ringcentral-integration/modules/Auth/loginStatus');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

var _LoginPanel = require('../../components/LoginPanel');

var _LoginPanel2 = _interopRequireDefault(_LoginPanel);

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      auth = _ref$phone.auth,
      locale = _ref$phone.locale,
      rateLimiter = _ref$phone.rateLimiter,
      connectivityMonitor = _ref$phone.connectivityMonitor,
      oAuth = _ref$phone.oAuth,
      version = _ref.version;

  return {
    currentLocale: locale.currentLocale,
    disabled: !oAuth.oAuthReady || rateLimiter.throttling || !connectivityMonitor.connectivity,
    version: version,
    showSpinner: !auth.ready || auth.loginStatus === _loginStatus2.default.loggingIn || auth.loginStatus === _loginStatus2.default.loggingOut || auth.loginStatus === _loginStatus2.default.beforeLogout || auth.loginStatus === _loginStatus2.default.loggedIn
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

var WelcomePage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_LoginPanel2.default));

exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.default = WelcomePage;
//# sourceMappingURL=index.js.map
