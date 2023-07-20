"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _Answer = _interopRequireDefault(require("../../assets/images/Answer.svg"));
var _CircleButton = _interopRequireDefault(require("../CircleButton"));
var _DialPad = _interopRequireDefault(require("../DialPad"));
var _FromField = _interopRequireDefault(require("../FromField"));
var _RecipientsInput = _interopRequireDefault(require("../RecipientsInput"));
var _RecipientsInputV = require("../RecipientsInputV2");
var _SpinnerOverlay = require("../SpinnerOverlay");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var DialerPanel = function DialerPanel(_ref) {
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
    _ref$disableFromField = _ref.disableFromField,
    disableFromField = _ref$disableFromField === void 0 ? false : _ref$disableFromField,
    children = _ref.children,
    withTabs = _ref.withTabs,
    inConference = _ref.inConference,
    isLastInputFromDialpad = _ref.isLastInputFromDialpad,
    showAnonymous = _ref.showAnonymous,
    useV2 = _ref.useV2;
  var inputEl = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (useV2 && autoFocus && inputEl.current) {
      // @ts-expect-error TS(2339): Property 'focus' does not exist on type 'never'.
      inputEl.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var input = useV2 ? /*#__PURE__*/_react["default"].createElement(_RecipientsInputV.RecipientsInputV2, {
    ref: inputEl
    // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
    ,
    value: toNumber
    // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
    ,
    onInputChange: onToNumberChange,
    onInputClear: clearToNumber,
    recipients: recipients,
    addToRecipients: setRecipient,
    removeFromRecipients: clearRecipient,
    searchContactList: searchContactList
    // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
    ,
    formatContactPhone: formatPhone,
    currentLocale: currentLocale,
    phoneTypeRenderer: phoneTypeRenderer,
    phoneSourceNameRenderer: phoneSourceNameRenderer,
    contactInfoRenderer: recipientsContactInfoRenderer,
    contactPhoneRenderer: recipientsContactPhoneRenderer,
    isLastInputFromDialpad: isLastInputFromDialpad,
    enableTitle: true
    // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
    ,
    className: !showFromField ? (0, _classnames["default"])(_styles["default"].inputField, _styles["default"].recipientsField) : null
  }) : /*#__PURE__*/_react["default"].createElement(_RecipientsInput["default"], {
    inputRef: function inputRef(element) {
      inputEl.current = element;
    },
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
    autoFocus: autoFocus
    // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
    ,
    className: !showFromField ? (0, _classnames["default"])(_styles["default"].inputField, _styles["default"].recipientsField) : null
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].root, className)
  }, input, showFromField ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].inputField
  }, /*#__PURE__*/_react["default"].createElement(_FromField["default"]
  // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
  , {
    showAnonymous: showAnonymous
    // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
    ,
    fromNumber: fromNumber
    // @ts-expect-error TS(2322): Type '{ phoneNumber?: string | undefined; usageTyp... Remove this comment to see the full error message
    ,
    fromNumbers: fromNumbers
    // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
    ,
    onChange: changeFromNumber
    // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
    ,
    formatPhone: formatPhone,
    currentLocale: currentLocale,
    hidden: !isWebphoneMode,
    disabled: disableFromField
  })) : null, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].dialButtons, dialButtonsClassName)
  }, /*#__PURE__*/_react["default"].createElement(_DialPad["default"], {
    className: _styles["default"].dialPad,
    onButtonOutput: function onButtonOutput(key) {
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      onToNumberChange(toNumber + key, true);
      if (inputEl.current) {
        // @ts-expect-error TS(2339): Property 'focus' does not exist on type 'never'.
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
    onClick: function onClick() {
      return onCallButtonClick({
        clickDialerToCall: true
      });
    },
    disabled: callButtonDisabled,
    icon: _Answer["default"],
    showBorder: false
  })))), showSpinner ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null) : null, children);
};
var Empty = function Empty() {
  return null;
};
DialerPanel.defaultProps = {
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  className: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  dialButtonsClassName: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  fromNumber: null,
  callButtonDisabled: false,
  toNumber: '',
  fromNumbers: [],
  isWebphoneMode: false,
  changeFromNumber: Empty,
  onToNumberChange: Empty,
  formatPhone: function formatPhone(phoneNumber) {
    return phoneNumber;
  },
  showSpinner: false,
  dialButtonVolume: 1,
  dialButtonMuted: false,
  recipients: [],
  autoFocus: false,
  showFromField: true,
  disableFromField: false,
  withTabs: false,
  inConference: false,
  isLastInputFromDialpad: false,
  useV2: false,
  showAnonymous: true
};
var _default = DialerPanel;
exports["default"] = _default;
//# sourceMappingURL=DialerPanel.js.map
