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

var _reactRouter = require('react-router');

var _RcFont = require('../../assets/RcFont/RcFont.scss');

var _RcFont2 = _interopRequireDefault(_RcFont);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _Spinner = require('../Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _RecipientsHeader = require('../RecipientsHeader');

var _RecipientsHeader2 = _interopRequireDefault(_RecipientsHeader);

var _ConversationMessageList = require('../ConversationMessageList');

var _ConversationMessageList2 = _interopRequireDefault(_ConversationMessageList);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConversationPanel = function (_Component) {
  (0, _inherits3.default)(ConversationPanel, _Component);

  function ConversationPanel(props) {
    (0, _classCallCheck3.default)(this, ConversationPanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ConversationPanel.__proto__ || (0, _getPrototypeOf2.default)(ConversationPanel)).call(this, props));

    _this.state = {
      textValue: ''
    };
    _this.onTextChange = function (e) {
      _this.setState({
        textValue: e.currentTarget.value
      });
    };
    _this.handleSubmit = function (e) {
      _this.props.replyToReceivers(_this.state.textValue);
      _this.setState({
        textValue: ''
      });
      e.preventDefault();
    };
    return _this;
  }

  (0, _createClass3.default)(ConversationPanel, [{
    key: 'render',
    value: function render() {
      var conversationBody = null;
      var loading = this.props.showSpinner;
      var recipients = this.props.recipients;
      if (loading) {
        conversationBody = _react2.default.createElement(
          'div',
          { className: _styles2.default.spinerContainer },
          _react2.default.createElement(_Spinner2.default, null)
        );
      } else {
        conversationBody = _react2.default.createElement(_ConversationMessageList2.default, {
          messages: this.props.messages,
          className: _styles2.default.conversationBody,
          showFrom: recipients && recipients.length > 1
        });
      }
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.root },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.header },
          _react2.default.createElement(
            _reactRouter.Link,
            {
              to: '/messages',
              className: _styles2.default.backButton
            },
            _react2.default.createElement('span', { className: _DynamicsFont2.default.iconArrowRight })
          ),
          _react2.default.createElement(_RecipientsHeader2.default, {
            recipients: recipients
          })
        ),
        conversationBody,
        _react2.default.createElement(
          'div',
          { className: _styles2.default.messageForm },
          _react2.default.createElement(
            'form',
            { onSubmit: this.handleSubmit },
            _react2.default.createElement(
              'div',
              { className: _styles2.default.textField },
              _react2.default.createElement('textarea', {
                placeholder: _i18n2.default.getString('typeAnyToSend', this.props.currentLocale),
                value: this.state.textValue,
                maxLength: '1000',
                onChange: this.onTextChange
              })
            ),
            _react2.default.createElement(
              'div',
              { className: _styles2.default.submitField },
              _react2.default.createElement('input', {
                type: 'submit',
                value: _i18n2.default.getString('send', this.props.currentLocale),
                className: _styles2.default.submitButton,
                disabled: this.props.sendButtonDisabled || loading || this.state.textValue.length === 0
              })
            )
          )
        )
      );
    }
  }]);
  return ConversationPanel;
}(_react.Component);

ConversationPanel.propTypes = {
  replyToReceivers: _react.PropTypes.func.isRequired,
  messages: _ConversationMessageList2.default.propTypes.messages,
  recipients: _RecipientsHeader2.default.propTypes.recipients,
  sendButtonDisabled: _react.PropTypes.bool.isRequired,
  currentLocale: _react.PropTypes.string.isRequired,
  showSpinner: _react.PropTypes.bool.isRequired
};

exports.default = ConversationPanel;
//# sourceMappingURL=index.js.map
