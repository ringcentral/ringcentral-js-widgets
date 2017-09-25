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

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _RecipientsInput = require('../RecipientsInput');

var _RecipientsInput2 = _interopRequireDefault(_RecipientsInput);

var _DropdownSelect = require('../DropdownSelect');

var _DropdownSelect2 = _interopRequireDefault(_DropdownSelect);

var _SpinnerOverlay = require('../SpinnerOverlay');

var _SpinnerOverlay2 = _interopRequireDefault(_SpinnerOverlay);

var _NoSenderAlert = require('./NoSenderAlert');

var _NoSenderAlert2 = _interopRequireDefault(_NoSenderAlert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SenderField(props) {
  return _react2.default.createElement(_DropdownSelect2.default, {
    label: _i18n2.default.getString('from', props.currentLocale) + ':',
    className: _styles2.default.senderSelect,
    value: props.value,
    onChange: props.onChange,
    options: props.options,
    paddingLeft: 0,
    renderValue: props.formatPhone,
    valueFunction: function valueFunction(value) {
      return value;
    },
    renderFunction: props.formatPhone
  });
}

SenderField.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  value: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  formatPhone: _propTypes2.default.func.isRequired,
  options: _propTypes2.default.arrayOf(_propTypes2.default.string.isRequired).isRequired
};

var ComposeTextPanel = function (_Component) {
  (0, _inherits3.default)(ComposeTextPanel, _Component);

  function ComposeTextPanel(props) {
    (0, _classCallCheck3.default)(this, ComposeTextPanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ComposeTextPanel.__proto__ || (0, _getPrototypeOf2.default)(ComposeTextPanel)).call(this, props));

    _this.onSenderChange = function (value) {
      _this.props.updateSenderNumber(value);
    };

    _this.onReceiverChange = function (e) {
      var value = e.currentTarget.value;
      _this.props.updateTypingToNumber(value);
    };

    _this.cleanReceiverValue = function () {
      _this.props.cleanTypingToNumber();
    };

    _this.onReceiverInputKeyUp = function (e) {
      _this.props.searchContact(e.currentTarget.value);
    };

    _this.addToRecipients = function (receiver) {
      var shouldClean = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      _this.props.addToNumber(receiver);
      if (shouldClean) {
        _this.props.cleanTypingToNumber();
      }
    };

    _this.removeFromRecipients = function (phoneNumber) {
      _this.props.removeToNumber({ phoneNumber: phoneNumber });
    };

    _this.onTextChange = function (e) {
      var value = e.currentTarget.value;
      _this.props.updateMessageText(value);
    };

    _this.onTextAreaKeyDown = function (e) {
      console.debug('onTextAreaKeyDown', e);
      if (e.key === 'Enter') {
        e.preventDefault();
        _this.props.send();
      }
    };

    _this.handleSubmit = function (e) {
      e.preventDefault();
      _this.props.send();
      console.debug('send message ...');
    };
    return _this;
  }

  (0, _createClass3.default)(ComposeTextPanel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.searchContact(this.props.typingToNumber);
    }
  }, {
    key: 'hasSenderNumbers',
    value: function hasSenderNumbers() {
      return this.props.senderNumbers.length > 0;
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.showSpinner) {
        return _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(_styles2.default.root, this.props.className) },
          _react2.default.createElement(_SpinnerOverlay2.default, null)
        );
      }
      var senderField = this.hasSenderNumbers() ? _react2.default.createElement(SenderField, {
        currentLocale: this.props.currentLocale,
        value: this.props.senderNumber,
        options: this.props.senderNumbers,
        formatPhone: this.props.formatPhone,
        onChange: this.onSenderChange
      }) : null;
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.root, this.props.className) },
        _react2.default.createElement(_NoSenderAlert2.default, {
          currentLocale: this.props.currentLocale,
          outboundSMS: this.props.outboundSMS,
          hasSenderNumbers: this.hasSenderNumbers()
        }),
        _react2.default.createElement(
          'form',
          { onSubmit: this.handleSubmit },
          _react2.default.createElement(
            'div',
            { className: _styles2.default.receiverField },
            _react2.default.createElement(_RecipientsInput2.default, {
              value: this.props.typingToNumber,
              label: _i18n2.default.getString('to', this.props.currentLocale) + ':',
              onChange: this.onReceiverChange,
              onClean: this.cleanReceiverValue,
              placeholder: _i18n2.default.getString('enterNameOrNumber', this.props.currentLocale),
              recipients: this.props.toNumbers,
              addToRecipients: this.addToRecipients,
              removeFromRecipients: this.removeFromRecipients,
              searchContactList: this.props.searchContactList,
              onKeyUp: this.onReceiverInputKeyUp,
              formatContactPhone: this.props.formatContactPhone,
              titleEnabled: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.senderField },
            senderField
          ),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.buttomField },
            _react2.default.createElement(
              'div',
              { className: _styles2.default.textField },
              _react2.default.createElement('textarea', {
                placeholder: _i18n2.default.getString('typeMessage', this.props.currentLocale),
                value: this.props.messageText,
                maxLength: '1000',
                onChange: this.onTextChange,
                onKeyPressCapture: this.onTextAreaKeyDown
              })
            ),
            _react2.default.createElement(
              'div',
              { className: _styles2.default.submitField },
              _react2.default.createElement('input', {
                type: 'submit',
                value: _i18n2.default.getString('send', this.props.currentLocale),
                className: _styles2.default.submitButton,
                disabled: this.props.sendButtonDisabled
              })
            )
          )
        )
      );
    }
  }]);
  return ComposeTextPanel;
}(_react.Component);

ComposeTextPanel.propTypes = {
  className: _propTypes2.default.string,
  send: _propTypes2.default.func.isRequired,
  senderNumbers: _propTypes2.default.arrayOf(_propTypes2.default.string.isRequired).isRequired,
  sendButtonDisabled: _propTypes2.default.bool.isRequired,
  formatPhone: _propTypes2.default.func.isRequired,
  formatContactPhone: _propTypes2.default.func.isRequired,
  searchContact: _propTypes2.default.func.isRequired,
  searchContactList: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    name: _propTypes2.default.string.isRequired,
    entityType: _propTypes2.default.string.isRequired,
    phoneType: _propTypes2.default.string.isRequired,
    phoneNumber: _propTypes2.default.string.isRequired
  })).isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  updateSenderNumber: _propTypes2.default.func.isRequired,
  updateTypingToNumber: _propTypes2.default.func.isRequired,
  cleanTypingToNumber: _propTypes2.default.func.isRequired,
  addToNumber: _propTypes2.default.func.isRequired,
  removeToNumber: _propTypes2.default.func.isRequired,
  updateMessageText: _propTypes2.default.func.isRequired,
  messageText: _propTypes2.default.string,
  typingToNumber: _propTypes2.default.string,
  senderNumber: _propTypes2.default.string,
  toNumbers: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    phoneNumber: _propTypes2.default.string.isRequired,
    name: _propTypes2.default.string
  })).isRequired,
  outboundSMS: _propTypes2.default.bool,
  showSpinner: _propTypes2.default.bool
};

ComposeTextPanel.defaultProps = {
  className: null,
  messageText: '',
  typingToNumber: '',
  senderNumber: '',
  outboundSMS: false,
  showSpinner: false
};

exports.default = ComposeTextPanel;
//# sourceMappingURL=index.js.map
