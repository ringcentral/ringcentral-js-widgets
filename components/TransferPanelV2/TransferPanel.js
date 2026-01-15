"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransferPanel = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.object.to-string.js");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireWildcard(require("react"));
var _rxjs = require("rxjs");
var _BackHeaderV = _interopRequireDefault(require("../BackHeaderV2"));
var _CommunicationSetupPanel = require("../CommunicationSetupPanel");
var _ContactSearchPanelEnum = require("../ContactSearchPanel/ContactSearchPanelEnum");
var _StyledTransferPanel = require("./StyledTransferPanel");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var TransferPanel = exports.TransferPanel = function TransferPanel(props) {
  var onBack = props.onBack,
    _props$onCallEnd = props.onCallEnd,
    onCallEnd = _props$onCallEnd === void 0 ? _rxjs.noop : _props$onCallEnd,
    onTransfer = props.onTransfer,
    onToVoicemail = props.onToVoicemail,
    session = props.session,
    sessionId = props.sessionId,
    currentLocale = props.currentLocale,
    autoFocus = props.autoFocus,
    children = props.children,
    callVolume = props.callVolume,
    outputDeviceId = props.outputDeviceId,
    controlBusy = props.controlBusy,
    setActiveSessionId = props.setActiveSessionId,
    onWarmTransfer = props.onWarmTransfer,
    enableWarmTransfer = props.enableWarmTransfer,
    companyContacts = props.companyContacts,
    onTransferDataTrack = props.onTransferDataTrack,
    onToVoicemailDataTrack = props.onToVoicemailDataTrack,
    onWarmTransferDataTrack = props.onWarmTransferDataTrack,
    contactSearch = props.contactSearch,
    triggerEventTracking = props.triggerEventTracking;
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
  }), /*#__PURE__*/_react["default"].createElement(_StyledTransferPanel.CommunicationSetupPanelWrap, null, /*#__PURE__*/_react["default"].createElement(_CommunicationSetupPanel.CommunicationSetupPanel, {
    triggerEventTracking: triggerEventTracking
    // To field
    ,
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
    directlyProceedType: "transfer",
    ContactSearch: contactSearch
  }, /*#__PURE__*/_react["default"].createElement(_StyledTransferPanel.DialerWrapper, null, /*#__PURE__*/_react["default"].createElement(_StyledTransferPanel.StyledRcDialPad, {
    "data-sign": "dialPad",
    onChange: function onChange(value) {
      onToNumberChange(toNumber + value);
    },
    sounds: _juno.RcDialerPadSoundsMPEG,
    getDialPadButtonProps: function getDialPadButtonProps(v) {
      return {
        'data-test-id': "".concat(v),
        'data-sign': "dialPadBtn".concat(v)
      };
    },
    volume: callVolume,
    sinkId: outputDeviceId
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
TransferPanel.defaultProps = {
  callVolume: 1,
  outputDeviceId: ''
};
//# sourceMappingURL=TransferPanel.js.map
