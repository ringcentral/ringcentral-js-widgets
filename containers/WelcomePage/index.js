'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.propTypes = exports.mapToProps = exports.mapToFunctions = undefined;

var _react = require('react');

var _reactRedux = require('react-redux');

var _Auth = require('ringcentral-integration/modules/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _Locale = require('ringcentral-integration/modules/Locale');

var _Locale2 = _interopRequireDefault(_Locale);

var _RateLimiter = require('ringcentral-integration/modules/RateLimiter');

var _RateLimiter2 = _interopRequireDefault(_RateLimiter);

var _LoginPanel = require('../../components/LoginPanel');

var _LoginPanel2 = _interopRequireDefault(_LoginPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var auth = _ref.auth,
      locale = _ref.locale,
      rateLimiter = _ref.rateLimiter;

  return {
    currentLocale: locale.currentLocale,
    disabled: !auth.proxyLoaded || rateLimiter.throttling
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
  auth: _react.PropTypes.instanceOf(_Auth2.default).isRequired,
  locale: _react.PropTypes.instanceOf(_Locale2.default).isRequired,
  rateLimiter: _react.PropTypes.instanceOf(_RateLimiter2.default).isRequired,
  mainUrl: _react.PropTypes.string,
  onLogin: _react.PropTypes.func
};

WelcomePage.propTypes = propTypes;

exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.propTypes = propTypes;
exports.default = WelcomePage;
//# sourceMappingURL=index.js.map
