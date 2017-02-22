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

var _RcFont = require('../../assets/RcFont/RcFont.scss');

var _RcFont2 = _interopRequireDefault(_RcFont);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _RecipientsInput = require('../RecipientsInput');

var _RecipientsInput2 = _interopRequireDefault(_RecipientsInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SenderSelectInput(props) {
  return _react2.default.createElement(
    'select',
    {
      className: props.className,
      value: props.value,
      onChange: props.onChange },
    props.options.map(function (number) {
      return _react2.default.createElement(
        'option',
        { key: number, value: number },
        props.formatPhone(number)
      );
    })
  );
}

SenderSelectInput.propTypes = {
  value: _react.PropTypes.string.isRequired,
  className: _react.PropTypes.string,
  onChange: _react.PropTypes.func.isRequired,
  formatPhone: _react.PropTypes.func.isRequired,
  options: _react.PropTypes.arrayOf(_react.PropTypes.string.isRequired).isRequired
};

var ComposeTextPanel = function (_Component) {
  (0, _inherits3.default)(ComposeTextPanel, _Component);

  function ComposeTextPanel(props) {
    (0, _classCallCheck3.default)(this, ComposeTextPanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ComposeTextPanel.__proto__ || (0, _getPrototypeOf2.default)(ComposeTextPanel)).call(this, props));

    _this.state = {
      showSenderSetting: true
    };

    _this.onSenderChange = function (e) {
      var value = e.currentTarget.value;
      _this.props.updateSenderNumber(value);
    };

    _this.onReceiverChange = function (e) {
      var value = e.currentTarget.value;
      _this.props.updateTypingToNumber(value);
    };

    _this.cleanReceiverValue = function () {
      _this.props.cleanTypingToNumber();
    };

    _this.onReceiverInputKeyDown = function (e) {
      _this.props.searchContact(e.currentTarget.value);
    };

    _this.addToRecipients = function (receiver) {
      _this.props.addToNumber(receiver);
      _this.props.cleanTypingToNumber();
    };

    _this.removeFromRecipients = function (phoneNumber) {
      _this.props.removeToNumber({ phoneNumber: phoneNumber });
    };

    _this.onTextChange = function (e) {
      var value = e.currentTarget.value;
      _this.props.updateMessageText(value);
    };

    _this.handleSubmit = function (e) {
      e.preventDefault();
      _this.props.send();
      console.debug('send message ...');
    };

    _this.toggleShowSenderSetting = function () {
      _this.setState(function (prevState) {
        return { showSenderSetting: !prevState.showSenderSetting };
      });
    };
    return _this;
  }

  (0, _createClass3.default)(ComposeTextPanel, [{
    key: 'render',
    value: function render() {
      var senderFieldClasses = _styles2.default.messageSenderField;
      if (!this.state.showSenderSetting) {
        senderFieldClasses = (0, _classnames2.default)(_styles2.default.messageSenderField, _styles2.default.hiddenField);
      }
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: _styles2.default.composeTextPanelHeader },
          _react2.default.createElement(
            'h1',
            null,
            _i18n2.default.getString('composeMessage')
          ),
          _react2.default.createElement(
            'a',
            { href: '#sender-number-setting', className: _styles2.default.sendNumberSetting, onClick: this.toggleShowSenderSetting },
            _react2.default.createElement('span', { className: _RcFont2.default.icon_setting })
          )
        ),
        _react2.default.createElement(
          'form',
          { onSubmit: this.handleSubmit },
          _react2.default.createElement(
            'div',
            { className: senderFieldClasses },
            _react2.default.createElement(
              'label',
              null,
              _i18n2.default.getString('sendMessageFrom', this.props.currentLocale)
            ),
            _react2.default.createElement(
              'div',
              { className: _styles2.default.valueInput },
              _react2.default.createElement(SenderSelectInput, {
                className: _styles2.default.select,
                value: this.props.senderNumber,
                onChange: this.onSenderChange,
                options: this.props.senderNumbers,
                formatPhone: this.props.formatPhone
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.messageReceiverField },
            _react2.default.createElement(
              'label',
              null,
              _i18n2.default.getString('to', this.props.currentLocale),
              ':'
            ),
            _react2.default.createElement(
              'div',
              { className: _styles2.default.rightPanel },
              _react2.default.createElement(_RecipientsInput2.default, {
                value: this.props.typingToNumber,
                onChange: this.onReceiverChange,
                onClean: this.cleanReceiverValue,
                placeholder: _i18n2.default.getString('enterNameOrNumber', this.props.currentLocale),
                recipients: this.props.toNumbers,
                addToRecipients: this.addToRecipients,
                removeFromRecipients: this.removeFromRecipients,
                searchContactList: this.props.searchContactList,
                onKeyUp: this.onReceiverInputKeyDown,
                formatPhone: this.props.formatPhone
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.messageTextField },
            _react2.default.createElement('textarea', {
              placeholder: _i18n2.default.getString('typeAnyToSend', this.props.currentLocale),
              value: this.props.messageText,
              maxLength: '1000',
              required: true,
              onChange: this.onTextChange
            })
          ),
          _react2.default.createElement('input', {
            type: 'submit',
            value: _i18n2.default.getString('send', this.props.currentLocale),
            className: _styles2.default.submitButton,
            disabled: this.props.sendButtonDisabled
          })
        )
      );
    }
  }]);
  return ComposeTextPanel;
}(_react.Component);

ComposeTextPanel.propTypes = {
  send: _react.PropTypes.func.isRequired,
  senderNumbers: _react.PropTypes.arrayOf(_react.PropTypes.string.isRequired).isRequired,
  sendButtonDisabled: _react.PropTypes.bool.isRequired,
  formatPhone: _react.PropTypes.func.isRequired,
  searchContact: _react.PropTypes.func.isRequired,
  searchContactList: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    name: _react.PropTypes.string.isRequired,
    entityType: _react.PropTypes.string.isRequired,
    phoneType: _react.PropTypes.string.isRequired,
    phoneNumber: _react.PropTypes.string.isRequired
  })).isRequired,
  currentLocale: _react.PropTypes.string.isRequired,
  updateSenderNumber: _react.PropTypes.func.isRequired,
  updateTypingToNumber: _react.PropTypes.func.isRequired,
  cleanTypingToNumber: _react.PropTypes.func.isRequired,
  addToNumber: _react.PropTypes.func.isRequired,
  removeToNumber: _react.PropTypes.func.isRequired,
  updateMessageText: _react.PropTypes.func.isRequired,
  messageText: _react.PropTypes.string,
  typingToNumber: _react.PropTypes.string,
  senderNumber: _react.PropTypes.string,
  toNumbers: _react2.default.PropTypes.arrayOf(_react.PropTypes.shape({
    phoneNumber: _react.PropTypes.string.isRequired,
    name: _react.PropTypes.string.isRequired
  })).isRequired
};

ComposeTextPanel.defaultProps = {
  messageText: '',
  typingToNumber: '',
  senderNumber: ''
};

exports.default = ComposeTextPanel;
//# sourceMappingURL=index.js.map
