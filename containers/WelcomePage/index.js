'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var WelcomePage = (0, _reactRedux.connect)(function (_, props) {
  return {
    currentLocale: props.locale.currentLocale,
    disabled: !props.auth.proxyLoaded || props.rateLimiter.throttling
  };
}, function (_, props) {
  return {
    setupProxyFrame: function setupProxyFrame() {
      props.auth.setupProxyFrame(props.onLogin);
    },
    clearProxyFrame: function clearProxyFrame() {
      props.auth.clearProxyFrame();
    },
    onLoginButtonClick: function onLoginButtonClick() {
      props.auth.openOAuthPage();
    }
  };
})(_LoginPanel2.default);

WelcomePage.propTypes = {
  auth: _react.PropTypes.instanceOf(_Auth2.default).isRequired,
  locale: _react.PropTypes.instanceOf(_Locale2.default).isRequired,
  rateLimiter: _react.PropTypes.instanceOf(_RateLimiter2.default).isRequired,
  mainUrl: _react.PropTypes.string,
  onLogin: _react.PropTypes.func
};

exports.default = WelcomePage;
//# sourceMappingURL=index.js.map
