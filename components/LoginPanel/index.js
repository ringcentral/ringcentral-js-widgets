'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _SpinnerOverlay = require('../SpinnerOverlay');

var _SpinnerOverlay2 = _interopRequireDefault(_SpinnerOverlay);

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
      this.props.setupOAuth();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.destroyOAuth();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          onLoginButtonClick = _props.onLoginButtonClick,
          currentLocale = _props.currentLocale,
          disabled = _props.disabled,
          version = _props.version,
          showSpinner = _props.showSpinner,
          children = _props.children;

      var spinner = showSpinner ? _react2.default.createElement(_SpinnerOverlay2.default, null) : null;
      var versionDisplay = version ? _react2.default.createElement(
        'div',
        { className: _styles2.default.versionContainer },
        _i18n2.default.getString('version', currentLocale),
        ' ',
        version
      ) : null;
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
        ),
        versionDisplay,
        spinner,
        children
      );
    }
  }]);
  return LoginPanel;
}(_react.Component);

exports.default = LoginPanel;


LoginPanel.propTypes = {
  className: _propTypes2.default.string,
  setupOAuth: _propTypes2.default.func.isRequired,
  destroyOAuth: _propTypes2.default.func.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  onLoginButtonClick: _propTypes2.default.func.isRequired,
  disabled: _propTypes2.default.bool,
  version: _propTypes2.default.string,
  showSpinner: _propTypes2.default.bool,
  children: _propTypes2.default.node
};

LoginPanel.defaultProps = {
  className: null,
  disabled: false,
  version: undefined,
  showSpinner: false,
  children: undefined
};
//# sourceMappingURL=index.js.map
