'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.propTypes = exports.mapToProps = exports.mapToFunctions = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Auth = require('ringcentral-integration/modules/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _Locale = require('ringcentral-integration/modules/Locale');

var _Locale2 = _interopRequireDefault(_Locale);

var _RateLimiter = require('ringcentral-integration/modules/RateLimiter');

var _RateLimiter2 = _interopRequireDefault(_RateLimiter);

var _LoginPanel = require('../../components/LoginPanel');

var _LoginPanel2 = _interopRequireDefault(_LoginPanel);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function WelcomeContainer(props) {
  return _react2.default.createElement(
    'div',
    { className: _styles2.default.root },
    _react2.default.createElement(_LoginPanel2.default, {
      currentLocale: props.currentLocale,
      disabled: props.disabled,
      setupProxyFrame: props.setupProxyFrame,
      clearProxyFrame: props.clearProxyFrame,
      onLoginButtonClick: props.onLoginButtonClick
    }),
    props.children
  );
}

WelcomeContainer.propTypes = {
  children: _react.PropTypes.node,
  currentLocale: _react.PropTypes.string.isRequired,
  setupProxyFrame: _react.PropTypes.func.isRequired,
  clearProxyFrame: _react.PropTypes.func.isRequired,
  onLoginButtonClick: _react.PropTypes.func.isRequired,
  disabled: _react.PropTypes.bool
};

WelcomeContainer.defaultProps = {
  children: null,
  disabled: false
};

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

var WelcomePage = (0, _reactRedux.connect)(mapToProps, mapToFunctions)(WelcomeContainer);

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
