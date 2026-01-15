"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _reactHooks = require("@ringcentral-integration/react-hooks");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _Answer = _interopRequireDefault(require("../../assets/images/Answer.svg"));
var _CircleButton = _interopRequireDefault(require("../CircleButton"));
var _DialPad = _interopRequireDefault(require("../DialPad"));
var _FromField = _interopRequireDefault(require("../FromField"));
var _RecipientsInput = _interopRequireDefault(require("../RecipientsInput"));
var _RecipientsInputV = require("../RecipientsInputV2");
var _SpinnerOverlay = require("../SpinnerOverlay");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
    callVolume = _ref.callVolume,
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
    useV2 = _ref.useV2,
    showCustomPhoneLabel = _ref.showCustomPhoneLabel;
  var inputEl = (0, _react.useRef)(null);
  var autoFocusRef = (0, _react.useRef)(autoFocus);
  if (process.env.NODE_ENV !== 'production') {
    if (typeof autoFocus === 'boolean' && autoFocus !== autoFocusRef.current) {
      console.warn('DialerPanel: autoFocus should never change after component mounted, only work when keep it as a constant');
    }
  }
  if (autoFocusRef.current) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    (0, _reactHooks.usePageAutoFocus)(inputEl);
  }
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
    className: !showFromField ? (0, _clsx["default"])(_styles["default"].inputField, _styles["default"].recipientsField) : null
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
    titleEnabled: true
    // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
    ,
    className: !showFromField ? (0, _clsx["default"])(_styles["default"].inputField, _styles["default"].recipientsField) : null
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].root, className)
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
    disabled: disableFromField,
    showCustomPhoneLabel: showCustomPhoneLabel
  })) : null, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].dialButtons, dialButtonsClassName)
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
    dialButtonVolume: callVolume
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].callBtnRow, withTabs && _styles["default"].callBtnRowWithTabs, inConference && _styles["default"].callBtnRowInConference)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].callBtn
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    dataSign: "callButton",
    className: (0, _clsx["default"])(_styles["default"].dialBtn, callButtonDisabled && _styles["default"].disabled),
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
  callVolume: 1,
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
var _default = exports["default"] = DialerPanel;
//# sourceMappingURL=DialerPanel.js.map
