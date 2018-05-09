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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CopyToClipboard = function (_Component) {
  (0, _inherits3.default)(CopyToClipboard, _Component);

  function CopyToClipboard() {
    (0, _classCallCheck3.default)(this, CopyToClipboard);
    return (0, _possibleConstructorReturn3.default)(this, (CopyToClipboard.__proto__ || (0, _getPrototypeOf2.default)(CopyToClipboard)).apply(this, arguments));
  }

  (0, _createClass3.default)(CopyToClipboard, [{
    key: 'executeCopy',
    value: function executeCopy() {
      this.copyTextArea.focus();
      this.copyTextArea.select();
      try {
        var result = document.execCommand('copy');
        if (result) {
          this.copyTextArea.blur();
          if (typeof this.props.handleSuccess === 'function') this.props.handleSuccess();
        } else if (typeof this.props.handleFailure === 'function') {
          this.props.handleFailure();
        }
      } catch (e) {
        console.error(e);
        if (typeof this.props.handleFailure === 'function') {
          this.props.handleFailure();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          currentLocale = _props.currentLocale,
          buttonClassName = _props.buttonClassName,
          disabled = _props.disabled,
          copiedText = _props.copiedText,
          buttonText = _props.buttonText,
          CustomButton = _props.button;

      return _react2.default.createElement(
        'div',
        { className: _styles2.default.container },
        _react2.default.createElement('textarea', {
          className: _styles2.default.copyTextArea,
          ref: function ref(_ref) {
            _this2.copyTextArea = _ref;
          },
          defaultValue: copiedText }),
        CustomButton ? _react2.default.createElement(CustomButton, this.props) : _react2.default.createElement(
          _Button2.default,
          {
            disabled: disabled,
            className: (0, _classnames2.default)(_styles2.default.primaryButton, buttonClassName),
            onClick: function onClick() {
              return _this2.executeCopy();
            } },
          buttonText || _i18n2.default.getString('copyToClipboard', currentLocale)
        )
      );
    }
  }]);
  return CopyToClipboard;
}(_react.Component);

CopyToClipboard.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  handleSuccess: _propTypes2.default.func,
  handleFailure: _propTypes2.default.func,
  buttonClassName: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  copiedText: _propTypes2.default.string,
  buttonText: _propTypes2.default.string,
  button: _propTypes2.default.node
};

CopyToClipboard.defaultProps = {
  handleSuccess: undefined,
  handleFailure: undefined,
  buttonClassName: undefined,
  disabled: undefined,
  copiedText: undefined,
  buttonText: undefined,
  button: undefined
};

exports.default = CopyToClipboard;
//# sourceMappingURL=index.js.map
