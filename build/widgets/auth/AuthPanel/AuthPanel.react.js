'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AuthPanel = require('./AuthPanel.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AuthPanel = function (_React$Component) {
  _inherits(AuthPanel, _React$Component);

  function AuthPanel() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, AuthPanel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(AuthPanel)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      isOauthOpened: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AuthPanel, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.removeEventListener) {
        this.removeEventListener();
      }
    }
  }, {
    key: 'oauth',
    value: function oauth() {
      var _this2 = this;

      if (this.removeEventListener) {
        this.removeEventListener();
        this.removeEventListener = null;
      }
      var redirectUri = this.props.redirectUri;
      var oauthChannel = function oauthChannel(e) {
        if (e.data.type === 'oauth') {
          var _props$parseLoginUrl = _this2.props.parseLoginUrl(e.data.value);

          var code = _props$parseLoginUrl.code;

          console.log(code);
          _this2.setState({ isOauthOpened: false });
          _this2.props.authorize({ code: code, redirectUri: redirectUri });
          window.removeEventListener('message', oauthChannel);
          _this2.removeEventListener = null;
        }
      };
      this.setState({ isOauthOpened: true });
      window.open(this.props.loginUrl({ redirectUri: redirectUri }), 'oauth-iframe', 'width=400, height=600');
      window.addEventListener('message', oauthChannel);
      this.removeEventListener = function () {
        return window.removeEventListener('message', oauthChannel);
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { className: _AuthPanel.auth },
        _react2.default.createElement(
          'button',
          {
            className: _AuthPanel.loginButton,
            onClick: function onClick() {
              return _this3.oauth();
            }
          },
          'Login'
        )
      );
    }
  }]);

  return AuthPanel;
}(_react2.default.Component);

AuthPanel.propTypes = {
  /**
   * type: url
   */
  redirectUri: _react2.default.PropTypes.string,
  authorize: _react2.default.PropTypes.func,
  loginUrl: _react2.default.PropTypes.func,
  parseLoginUrl: _react2.default.PropTypes.func
};
exports.default = AuthPanel;