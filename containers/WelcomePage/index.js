'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _reactRedux = require('react-redux');

var _LoginPanel = require('../../components/LoginPanel');

var _LoginPanel2 = _interopRequireDefault(_LoginPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WelcomePage = (0, _reactRedux.connect)(function (_, props) {
  return {
    currentLocale: props.locale.currentLocale
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
  auth: _react.PropTypes.object.isRequired,
  locale: _react.PropTypes.object.isRequired,
  onLogin: _react.PropTypes.func
};

exports.default = WelcomePage;
//# sourceMappingURL=index.js.map
