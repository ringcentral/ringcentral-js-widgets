"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _DialPad = _interopRequireDefault(require("../DialPad"));

var _RecipientsInput = _interopRequireDefault(require("../RecipientsInput"));

var _RecipientsInputV = require("../RecipientsInputV2");

var _FromField = _interopRequireDefault(require("../FromField"));

var _SpinnerOverlay = require("../SpinnerOverlay");

var _CircleButton = _interopRequireDefault(require("../CircleButton"));

var _Answer = _interopRequireDefault(require("../../assets/images/Answer.svg"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
      recipients = _ref.recipients,
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
      inConference = _ref.inConference,
      isLastInputFromDialpad = _ref.isLastInputFromDialpad,
      useV2 = _ref.useV2;
  var inputEl = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (useV2 && autoFocus && inputEl.current) {
      inputEl.current.focus();
    }
  }, []);
  var input = useV2 ? /*#__PURE__*/_react["default"].createElement(_RecipientsInputV.RecipientsInputV2, {
    ref: inputEl,
    value: toNumber,
    onInputChange: onToNumberChange,
    onInputClear: clearToNumber,
    recipients: recipients,
    addToRecipients: setRecipient,
    removeFromRecipients: clearRecipient,
    searchContactList: searchContactList,
    formatContactPhone: formatPhone,
    currentLocale: currentLocale,
    phoneTypeRenderer: phoneTypeRenderer,
    phoneSourceNameRenderer: phoneSourceNameRenderer,
    contactInfoRenderer: recipientsContactInfoRenderer,
    contactPhoneRenderer: recipientsContactPhoneRenderer,
    isLastInputFromDialpad: isLastInputFromDialpad,
    titleEnabled: true,
    className: !showFromField ? (0, _classnames["default"])(_styles["default"].inputField, _styles["default"].recipientsField) : null
  }) : /*#__PURE__*/_react["default"].createElement(_RecipientsInput["default"], {
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
    isLastInputFromDialpad: isLastInputFromDialpad,
    titleEnabled: true,
    autoFocus: autoFocus,
    className: !showFromField ? (0, _classnames["default"])(_styles["default"].inputField, _styles["default"].recipientsField) : null
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].root, className)
  }, input, showFromField ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].inputField
  }, /*#__PURE__*/_react["default"].createElement(_FromField["default"], {
    fromNumber: fromNumber,
    fromNumbers: fromNumbers,
    onChange: changeFromNumber,
    formatPhone: formatPhone,
    currentLocale: currentLocale,
    hidden: !isWebphoneMode
  })) : null, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].dialButtons, dialButtonsClassName)
  }, /*#__PURE__*/_react["default"].createElement(_DialPad["default"], {
    className: _styles["default"].dialPad,
    onButtonOutput: function onButtonOutput(key) {
      onToNumberChange(toNumber + key, true);

      if (inputEl.current) {
        inputEl.current.focus();
      }
    },
    dialButtonVolume: dialButtonVolume,
    dialButtonMuted: dialButtonMuted
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].callBtnRow, withTabs && _styles["default"].callBtnRowWithTabs, inConference && _styles["default"].callBtnRowInConference)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].callBtn
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    dataSign: "callButton",
    className: (0, _classnames["default"])(_styles["default"].dialBtn, callButtonDisabled && _styles["default"].disabled),
    onClick: onCallButtonClick,
    disabled: callButtonDisabled,
    icon: _Answer["default"],
    showBorder: false
  })))), showSpinner ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null) : null, children);
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
  recipients: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    phoneNumber: _propTypes["default"].string.isRequired,
    name: _propTypes["default"].string
  })).isRequired,
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
  inConference: _propTypes["default"].bool,
  isLastInputFromDialpad: _propTypes["default"].bool,
  useV2: _propTypes["default"].bool
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
  inConference: false,
  isLastInputFromDialpad: false,
  useV2: false
};
var _default = DialerPanel;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
