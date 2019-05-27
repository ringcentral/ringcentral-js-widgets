"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _DialPad = _interopRequireDefault(require("../DialPad"));

var _RecipientsInput = _interopRequireDefault(require("../RecipientsInput"));

var _FromField = _interopRequireDefault(require("../FromField"));

var _SpinnerOverlay = _interopRequireDefault(require("../SpinnerOverlay"));

var _CircleButton = _interopRequireDefault(require("../CircleButton"));

var _Answer = _interopRequireDefault(require("../../assets/images/Answer.svg"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
      phoneSourceNameRenderer = _ref.phoneSourceNameRenderer,
      recipientsContactInfoRenderer = _ref.recipientsContactInfoRenderer,
      recipientsContactPhoneRenderer = _ref.recipientsContactPhoneRenderer,
      autoFocus = _ref.autoFocus,
      _ref$showFromField = _ref.showFromField,
      showFromField = _ref$showFromField === void 0 ? true : _ref$showFromField,
      children = _ref.children,
      withTabs = _ref.withTabs,
      inConference = _ref.inConference;

  var onCallFunc = function onCallFunc() {
    if (!callButtonDisabled) {
      onCallButtonClick();
    }
  };

  return _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].root, className)
  }, _react["default"].createElement(_RecipientsInput["default"], {
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
    phoneSourceNameRenderer: phoneSourceNameRenderer,
    contactInfoRenderer: recipientsContactInfoRenderer,
    contactPhoneRenderer: recipientsContactPhoneRenderer,
    titleEnabled: true,
    autoFocus: autoFocus,
    className: !showFromField ? (0, _classnames["default"])(_styles["default"].inputField, _styles["default"].recipientsField) : null
  }), showFromField ? _react["default"].createElement("div", {
    className: _styles["default"].inputField
  }, _react["default"].createElement(_FromField["default"], {
    fromNumber: fromNumber,
    fromNumbers: fromNumbers,
    onChange: changeFromNumber,
    formatPhone: formatPhone,
    currentLocale: currentLocale,
    hidden: !isWebphoneMode
  })) : null, _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].dialButtons, dialButtonsClassName)
  }, _react["default"].createElement(_DialPad["default"], {
    className: _styles["default"].dialPad,
    onButtonOutput: function onButtonOutput(key) {
      onToNumberChange(toNumber + key);
    },
    dialButtonVolume: dialButtonVolume,
    dialButtonMuted: dialButtonMuted
  }), _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].callBtnRow, withTabs && _styles["default"].callBtnRowWithTabs, inConference && _styles["default"].callBtnRowInConference)
  }, _react["default"].createElement("div", {
    className: _styles["default"].callBtn
  }, _react["default"].createElement(_CircleButton["default"], {
    dataSign: "callButton",
    className: (0, _classnames["default"])(_styles["default"].dialBtn, callButtonDisabled && _styles["default"].disabled),
    onClick: onCallFunc,
    disabled: callButtonDisabled,
    icon: _Answer["default"],
    showBorder: false
  })))), showSpinner ? _react["default"].createElement(_SpinnerOverlay["default"], null) : null, children);
}

DialerPanel.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  className: _propTypes["default"].string,
  dialButtonsClassName: _propTypes["default"].string,
  onCallButtonClick: _propTypes["default"].func.isRequired,
  callButtonDisabled: _propTypes["default"].bool,
  isWebphoneMode: _propTypes["default"].bool,
  toNumber: _propTypes["default"].string,
  onToNumberChange: _propTypes["default"].func,
  fromNumber: _propTypes["default"].string,
  fromNumbers: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    phoneNumber: _propTypes["default"].string,
    usageType: _propTypes["default"].string
  })),
  changeFromNumber: _propTypes["default"].func,
  formatPhone: _propTypes["default"].func,
  showSpinner: _propTypes["default"].bool,
  dialButtonVolume: _propTypes["default"].number,
  dialButtonMuted: _propTypes["default"].bool,
  searchContact: _propTypes["default"].func.isRequired,
  searchContactList: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    name: _propTypes["default"].string.isRequired,
    entityType: _propTypes["default"].string.isRequired,
    phoneType: _propTypes["default"].string.isRequired,
    phoneNumber: _propTypes["default"].string.isRequired
  })).isRequired,
  recipient: _propTypes["default"].shape({
    phoneNumber: _propTypes["default"].string.isRequired,
    name: _propTypes["default"].string
  }),
  clearToNumber: _propTypes["default"].func.isRequired,
  setRecipient: _propTypes["default"].func.isRequired,
  clearRecipient: _propTypes["default"].func.isRequired,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  recipientsContactInfoRenderer: _propTypes["default"].func,
  recipientsContactPhoneRenderer: _propTypes["default"].func,
  autoFocus: _propTypes["default"].bool,
  showFromField: _propTypes["default"].bool,
  children: _propTypes["default"].node,
  withTabs: _propTypes["default"].bool,
  inConference: _propTypes["default"].bool
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
  phoneSourceNameRenderer: undefined,
  recipientsContactInfoRenderer: undefined,
  recipientsContactPhoneRenderer: undefined,
  autoFocus: false,
  showFromField: true,
  children: undefined,
  withTabs: false,
  inConference: false
};
var _default = DialerPanel;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
