'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.propTypes = exports.mapToProps = exports.mapToFunctions = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _Auth = require('ringcentral-integration/modules/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _loginStatus = require('ringcentral-integration/modules/Auth/loginStatus');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

var _Locale = require('ringcentral-integration/modules/Locale');

var _Locale2 = _interopRequireDefault(_Locale);

var _RateLimiter = require('ringcentral-integration/modules/RateLimiter');

var _RateLimiter2 = _interopRequireDefault(_RateLimiter);

var _ConnectivityMonitor = require('ringcentral-integration/modules/ConnectivityMonitor');

var _ConnectivityMonitor2 = _interopRequireDefault(_ConnectivityMonitor);

var _LoginPanel = require('../../components/LoginPanel');

var _LoginPanel2 = _interopRequireDefault(_LoginPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var auth = _ref.auth,
      locale = _ref.locale,
      rateLimiter = _ref.rateLimiter,
      connectivityMonitor = _ref.connectivityMonitor,
      version = _ref.version;

  return {
    currentLocale: locale.currentLocale,
    disabled: !auth.proxyLoaded || rateLimiter.throttling || !connectivityMonitor.connectivity,
    version: version,
    showSpinner: !auth.ready || auth.loginStatus === _loginStatus2.default.loggingIn || auth.loginStatus === _loginStatus2.default.loggingOut || auth.loginStatus === _loginStatus2.default.beforeLogout
  };
}

function mapToFunctions(_, _ref2) {
  var auth = _ref2.auth,
      onLogin = _ref2.onLogin;

  return {
    setupProxyFrame: function setupProxyFrame() {
      auth.setupProxyFrame(onLogin);
    },
    clearProxyFrame: function clearProxyFrame() {
      auth.clearProxyFrame();
    },
    onLoginButtonClick: function onLoginButtonClick() {
      auth.openOAuthPage();
    }
  };
}

var WelcomePage = (0, _reactRedux.connect)(mapToProps, mapToFunctions)(_LoginPanel2.default);

var propTypes = {
  auth: _propTypes2.default.instanceOf(_Auth2.default).isRequired,
  locale: _propTypes2.default.instanceOf(_Locale2.default).isRequired,
  rateLimiter: _propTypes2.default.instanceOf(_RateLimiter2.default).isRequired,
  connectivityMonitor: _propTypes2.default.instanceOf(_ConnectivityMonitor2.default).isRequired,
  mainUrl: _propTypes2.default.string,
  onLogin: _propTypes2.default.func,
  version: _propTypes2.default.string
};

WelcomePage.propTypes = propTypes;

exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.propTypes = propTypes;
exports.default = WelcomePage;
//# sourceMappingURL=index.js.map
