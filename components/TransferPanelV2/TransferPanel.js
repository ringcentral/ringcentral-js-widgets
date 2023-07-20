"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.is-array");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransferPanel = void 0;
var _react = _interopRequireWildcard(require("react"));
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _BackHeaderV = _interopRequireDefault(require("../BackHeaderV2"));
var _CommunicationSetupPanel = require("../CommunicationSetupPanel");
var _ContactSearchPanelEnum = require("../ContactSearchPanel/ContactSearchPanelEnum");
var _i18n = _interopRequireDefault(require("./i18n"));
var _StyledTransferPanel = require("./StyledTransferPanel");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var TransferPanel = function TransferPanel(props) {
  var onBack = props.onBack,
    onCallEnd = props.onCallEnd,
    onTransfer = props.onTransfer,
    onToVoicemail = props.onToVoicemail,
    session = props.session,
    sessionId = props.sessionId,
    currentLocale = props.currentLocale,
    autoFocus = props.autoFocus,
    children = props.children,
    dialButtonVolume = props.dialButtonVolume,
    dialButtonMuted = props.dialButtonMuted,
    controlBusy = props.controlBusy,
    setActiveSessionId = props.setActiveSessionId,
    onWarmTransfer = props.onWarmTransfer,
    enableWarmTransfer = props.enableWarmTransfer,
    companyContacts = props.companyContacts,
    onTransferDataTrack = props.onTransferDataTrack,
    onToVoicemailDataTrack = props.onToVoicemailDataTrack,
    onWarmTransferDataTrack = props.onWarmTransferDataTrack;
  var previousSession = (0, _juno.usePrevious)(function () {
    return session;
  });
  (0, _react.useEffect)(function () {
    setActiveSessionId(sessionId);
  }, []);
  (0, _react.useEffect)(function () {
    if (previousSession && !session) {
      onCallEnd();
    }
  }, [onCallEnd, session, previousSession]);
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    toNumber = _useState2[0],
    setToNumber = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    recipients = _useState4[0],
    setRecipients = _useState4[1];
  if (!session) {
    return null;
  }
  var isOnTransfer = !!session.isOnTransfer;
  var onToNumberChange = function onToNumberChange(toNumber) {
    setToNumber(toNumber);
  };
  var setRecipient = function setRecipient() {
    for (var _len = arguments.length, recipient = new Array(_len), _key = 0; _key < _len; _key++) {
      recipient[_key] = arguments[_key];
    }
    setRecipients(recipient);
    setToNumber('');
  };
  var clearRecipient = function clearRecipient() {
    setRecipients([]);
    setToNumber('');
  };
  var getTransferNumber = function getTransferNumber() {
    return recipients.length > 0 && recipients[0].phoneNumber || toNumber;
  };
  var onTransferCall = function onTransferCall() {
    onTransferDataTrack === null || onTransferDataTrack === void 0 ? void 0 : onTransferDataTrack(recipients, toNumber);
    onTransfer(getTransferNumber(), sessionId);
  };
  var onWarmTransferCall = function onWarmTransferCall() {
    onWarmTransferDataTrack === null || onWarmTransferDataTrack === void 0 ? void 0 : onWarmTransferDataTrack(recipients, toNumber);
    onWarmTransfer(getTransferNumber(), sessionId);
  };
  var getVoicemailId = function getVoicemailId() {
    var _companyContacts$filt;
    return companyContacts === null || companyContacts === void 0 ? void 0 : (_companyContacts$filt = companyContacts.filter(function (item) {
      var _recipients$;
      return (item === null || item === void 0 ? void 0 : item.extensionNumber) === (((_recipients$ = recipients[0]) === null || _recipients$ === void 0 ? void 0 : _recipients$.phoneNumber) || toNumber);
    })[0]) === null || _companyContacts$filt === void 0 ? void 0 : _companyContacts$filt.id;
  };
  var onToVoicemailCall = function onToVoicemailCall() {
    var _recipients$2, _recipients$3;
    onToVoicemailDataTrack === null || onToVoicemailDataTrack === void 0 ? void 0 : onToVoicemailDataTrack(recipients, toNumber);
    //! select a company contact
    if (recipients.length > 0 && ((_recipients$2 = recipients[0]) === null || _recipients$2 === void 0 ? void 0 : _recipients$2.type) === 'company') {
      onToVoicemail(recipients[0].id, sessionId);
    }

    //! click number on dial pad or use Directly Procee entry
    else if (recipients.length > 0 && ((_recipients$3 = recipients[0]) === null || _recipients$3 === void 0 ? void 0 : _recipients$3.isDirectlyProceed) || !!toNumber) {
      onToVoicemail(getVoicemailId(), sessionId);
    } else {
      onToVoicemail();
    }
  };
  var getTransferButtonStatus = function getTransferButtonStatus() {
    if (isOnTransfer || controlBusy) return true;
    if (recipients.length !== 0 || toNumber !== '') return false;
    return true;
  };
  return /*#__PURE__*/_react["default"].createElement(_StyledTransferPanel.TransferPage, null, /*#__PURE__*/_react["default"].createElement(_BackHeaderV["default"], {
    onBackClick: onBack,
    title: _i18n["default"].getString('transferTo', currentLocale)
  }), /*#__PURE__*/_react["default"].createElement(_StyledTransferPanel.CommunicationSetupPanelWrap, null, /*#__PURE__*/_react["default"].createElement(_CommunicationSetupPanel.CommunicationSetupPanel
  // To field
  , {
    recipients: recipients,
    toNumber: toNumber,
    onToNumberChange: onToNumberChange,
    setRecipient: setRecipient,
    clearRecipient: clearRecipient,
    autoFocus: autoFocus,
    showFromField: false,
    defaultTab: _ContactSearchPanelEnum.TabsEnum.company
    // Common
    ,
    currentLocale: currentLocale,
    directlyProceedType: "transfer"
  }, /*#__PURE__*/_react["default"].createElement(_StyledTransferPanel.DialerWrapper, null, /*#__PURE__*/_react["default"].createElement(_StyledTransferPanel.StyledRcDialPad, {
    "data-sign": "dialPad",
    onChange: function onChange(value) {
      onToNumberChange(toNumber + value);
    },
    sounds: _juno.RcDialerPadSounds,
    getDialPadButtonProps: function getDialPadButtonProps(v) {
      return {
        'data-test-id': "".concat(v),
        'data-sign': "dialPadBtn".concat(v)
      };
    },
    volume: dialButtonVolume,
    muted: dialButtonMuted
  })), /*#__PURE__*/_react["default"].createElement(_StyledTransferPanel.DefaultIconGroup, null, enableWarmTransfer && /*#__PURE__*/_react["default"].createElement(_StyledTransferPanel.DefaultIconWrap, null, /*#__PURE__*/_react["default"].createElement(_StyledTransferPanel.DefaultIcon, {
    size: "medium",
    color: "interactive.f01",
    symbol: _junoIcon.Askfirst,
    "data-sign": "warmTransferBtn",
    onClick: onWarmTransferCall,
    disabled: getTransferButtonStatus()
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcText, {
    color: "neutral.f06",
    variant: "caption1"
  }, _i18n["default"].getString('warmTransfer', currentLocale))), /*#__PURE__*/_react["default"].createElement(_StyledTransferPanel.DefaultIconWrap, null, /*#__PURE__*/_react["default"].createElement(_StyledTransferPanel.DefaultIcon, {
    size: "medium",
    color: "interactive.f01",
    symbol: _junoIcon.TransferCall,
    "data-sign": "transferBtn",
    onClick: onTransferCall,
    disabled: getTransferButtonStatus()
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcText, {
    color: "neutral.f06",
    variant: "caption1"
  }, _i18n["default"].getString('blindTransfer', currentLocale))), enableWarmTransfer && /*#__PURE__*/_react["default"].createElement(_StyledTransferPanel.DefaultIconWrap, null, /*#__PURE__*/_react["default"].createElement(_StyledTransferPanel.DefaultIcon, {
    size: "medium",
    color: "interactive.f01",
    symbol: _junoIcon.Voicemail,
    "data-sign": "toVoicemailBtn",
    onClick: onToVoicemailCall,
    disabled: getTransferButtonStatus()
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcText, {
    color: "neutral.f06",
    variant: "caption1"
  }, _i18n["default"].getString('toVoicemail', currentLocale)))), children)));
};
exports.TransferPanel = TransferPanel;
TransferPanel.defaultProps = {
  dialButtonVolume: 1,
  dialButtonMuted: false
};
//# sourceMappingURL=TransferPanel.js.map
