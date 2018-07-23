'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DialPad = require('../DialPad');

var _DialPad2 = _interopRequireDefault(_DialPad);

var _RecipientsInput = require('../RecipientsInput');

var _RecipientsInput2 = _interopRequireDefault(_RecipientsInput);

var _FromField = require('../FromField');

var _FromField2 = _interopRequireDefault(_FromField);

var _SpinnerOverlay = require('../SpinnerOverlay');

var _SpinnerOverlay2 = _interopRequireDefault(_SpinnerOverlay);

var _CircleButton = require('../CircleButton');

var _CircleButton2 = _interopRequireDefault(_CircleButton);

var _Answer = require('../../assets/images/Answer.svg');

var _Answer2 = _interopRequireDefault(_Answer);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DialerPanel(_ref) {
  var currentLocale = _ref.currentLocale,
      callButtonDisabled = _ref.callButtonDisabled,
      className = _ref.className,
      dialButtonsClassName = _ref.dialButtonsClassName,
      onToNumberChange = _ref.onToNumberChange,
      onCallButtonClick = _ref.onCallButtonClick,
      toNumber = _ref.toNumber,
      fromNumber = _ref.fromNumber,
      fromNumbers = _ref.fromNumbers,
      changeFromNumber = _ref.changeFromNumber,
      formatPhone = _ref.formatPhone,
      isWebphoneMode = _ref.isWebphoneMode,
      showSpinner = _ref.showSpinner,
      dialButtonVolume = _ref.dialButtonVolume,
      dialButtonMuted = _ref.dialButtonMuted,
      searchContact = _ref.searchContact,
      searchContactList = _ref.searchContactList,
      recipient = _ref.recipient,
      clearToNumber = _ref.clearToNumber,
      setRecipient = _ref.setRecipient,
      clearRecipient = _ref.clearRecipient,
      phoneTypeRenderer = _ref.phoneTypeRenderer,
      recipientsContactInfoRenderer = _ref.recipientsContactInfoRenderer,
      recipientsContactPhoneRenderer = _ref.recipientsContactPhoneRenderer,
      autoFocus = _ref.autoFocus,
      _ref$showFromField = _ref.showFromField,
      showFromField = _ref$showFromField === undefined ? true : _ref$showFromField,
      children = _ref.children;

  var onCallFunc = function onCallFunc() {
    if (!callButtonDisabled) {
      onCallButtonClick();
    }
  };

  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_styles2.default.root, className) },
    _react2.default.createElement(_RecipientsInput2.default, {
      value: toNumber,
      onChange: onToNumberChange,
      onClean: clearToNumber,
      recipient: recipient,
      addToRecipients: setRecipient,
      removeFromRecipients: clearRecipient,
      searchContact: searchContact,
      searchContactList: searchContactList,
      formatContactPhone: formatPhone,
      currentLocale: currentLocale,
      phoneTypeRenderer: phoneTypeRenderer,
      contactInfoRenderer: recipientsContactInfoRenderer,
      contactPhoneRenderer: recipientsContactPhoneRenderer,
      titleEnabled: true,
      autoFocus: autoFocus,
      className: !showFromField ? (0, _classnames2.default)(_styles2.default.inputField, _styles2.default.recipientsField) : null
    }),
    showFromField ? _react2.default.createElement(
      'div',
      { className: _styles2.default.inputField },
      _react2.default.createElement(_FromField2.default, {
        fromNumber: fromNumber,
        fromNumbers: fromNumbers,
        onChange: changeFromNumber,
        formatPhone: formatPhone,
        currentLocale: currentLocale,
        hidden: !isWebphoneMode
      })
    ) : null,
    _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)(_styles2.default.dialButtons, dialButtonsClassName) },
      _react2.default.createElement(_DialPad2.default, {
        className: _styles2.default.dialPad,
        onButtonOutput: function onButtonOutput(key) {
          onToNumberChange(toNumber + key);
        },
        dialButtonVolume: dialButtonVolume,
        dialButtonMuted: dialButtonMuted
      }),
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.callBtnRow) },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.callBtn },
          _react2.default.createElement(_CircleButton2.default, {
            className: (0, _classnames2.default)(_styles2.default.dialBtn, callButtonDisabled && _styles2.default.disabled),
            onClick: onCallFunc,
            disabled: callButtonDisabled,
            icon: _Answer2.default,
            showBorder: false
          })
        )
      )
    ),
    showSpinner ? _react2.default.createElement(_SpinnerOverlay2.default, null) : null,
    children
  );
}

DialerPanel.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  className: _propTypes2.default.string,
  dialButtonsClassName: _propTypes2.default.string,
  onCallButtonClick: _propTypes2.default.func.isRequired,
  callButtonDisabled: _propTypes2.default.bool,
  isWebphoneMode: _propTypes2.default.bool,
  toNumber: _propTypes2.default.string,
  onToNumberChange: _propTypes2.default.func,
  fromNumber: _propTypes2.default.string,
  fromNumbers: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    phoneNumber: _propTypes2.default.string,
    usageType: _propTypes2.default.string
  })),
  changeFromNumber: _propTypes2.default.func,
  formatPhone: _propTypes2.default.func,
  showSpinner: _propTypes2.default.bool,
  dialButtonVolume: _propTypes2.default.number,
  dialButtonMuted: _propTypes2.default.bool,
  searchContact: _propTypes2.default.func.isRequired,
  searchContactList: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    name: _propTypes2.default.string.isRequired,
    entityType: _propTypes2.default.string.isRequired,
    phoneType: _propTypes2.default.string.isRequired,
    phoneNumber: _propTypes2.default.string.isRequired
  })).isRequired,
  recipient: _propTypes2.default.shape({
    phoneNumber: _propTypes2.default.string.isRequired,
    name: _propTypes2.default.string
  }),
  clearToNumber: _propTypes2.default.func.isRequired,
  setRecipient: _propTypes2.default.func.isRequired,
  clearRecipient: _propTypes2.default.func.isRequired,
  phoneTypeRenderer: _propTypes2.default.func,
  recipientsContactInfoRenderer: _propTypes2.default.func,
  recipientsContactPhoneRenderer: _propTypes2.default.func,
  autoFocus: _propTypes2.default.bool,
  showFromField: _propTypes2.default.bool,
  children: _propTypes2.default.node
};

DialerPanel.defaultProps = {
  className: null,
  dialButtonsClassName: null,
  fromNumber: null,
  callButtonDisabled: false,
  toNumber: '',
  fromNumbers: [],
  isWebphoneMode: false,
  changeFromNumber: function changeFromNumber() {
    return null;
  },
  onToNumberChange: function onToNumberChange() {
    return null;
  },
  formatPhone: function formatPhone(phoneNumber) {
    return phoneNumber;
  },
  showSpinner: false,
  dialButtonVolume: 1,
  dialButtonMuted: false,
  recipient: [],
  phoneTypeRenderer: undefined,
  recipientsContactInfoRenderer: undefined,
  recipientsContactPhoneRenderer: undefined,
  autoFocus: false,
  showFromField: true,
  children: undefined
};

exports.default = DialerPanel;
//# sourceMappingURL=index.js.map
