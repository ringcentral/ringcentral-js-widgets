'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginPanel = function (_Component) {
  (0, _inherits3.default)(LoginPanel, _Component);

  function LoginPanel() {
    (0, _classCallCheck3.default)(this, LoginPanel);
    return (0, _possibleConstructorReturn3.default)(this, (LoginPanel.__proto__ || (0, _getPrototypeOf2.default)(LoginPanel)).apply(this, arguments));
  }

  (0, _createClass3.default)(LoginPanel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.setupProxyFrame();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.clearProxyFrame();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          onLoginButtonClick = _props.onLoginButtonClick,
          currentLocale = _props.currentLocale,
          disabled = _props.disabled;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.root, className) },
        _react2.default.createElement(
          'button',
          {
            className: _styles2.default.loginButton,
            onClick: onLoginButtonClick,
            disabled: disabled },
          _i18n2.default.getString('loginButton', currentLocale)
        )
      );
    }
  }]);
  return LoginPanel;
}(_react.Component);

exports.default = LoginPanel;


LoginPanel.propTypes = {
  className: _react.PropTypes.string,
  setupProxyFrame: _react.PropTypes.func.isRequired,
  clearProxyFrame: _react.PropTypes.func.isRequired,
  currentLocale: _react.PropTypes.string.isRequired,
  onLoginButtonClick: _react.PropTypes.func.isRequired,
  disabled: _react.PropTypes.bool
};

LoginPanel.defaultProps = {
  className: null,
  disabled: false
};
//# sourceMappingURL=index.js.map
