"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.is-array");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ActiveCallItem = _interopRequireDefault(require("../ActiveCallItem"));

var _ActiveCallItemV = require("../ActiveCallItemV2");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isConferenceCall(normalizedCall) {
  return normalizedCall && normalizedCall.to && Array.isArray(normalizedCall.to.phoneNumber) && normalizedCall.to.phoneNumber.length === 0 && normalizedCall.toName === 'Conference';
}

var ActiveCallList = function ActiveCallList(_ref) {
  var calls = _ref.calls,
      className = _ref.className,
      currentLocale = _ref.currentLocale,
      areaCode = _ref.areaCode,
      countryCode = _ref.countryCode,
      brand = _ref.brand,
      showContactDisplayPlaceholder = _ref.showContactDisplayPlaceholder,
      formatPhone = _ref.formatPhone,
      onClickToSms = _ref.onClickToSms,
      onCreateContact = _ref.onCreateContact,
      onViewContact = _ref.onViewContact,
      outboundSmsPermission = _ref.outboundSmsPermission,
      internalSmsPermission = _ref.internalSmsPermission,
      isLoggedContact = _ref.isLoggedContact,
      onLogCall = _ref.onLogCall,
      autoLog = _ref.autoLog,
      loggingMap = _ref.loggingMap,
      webphoneAnswer = _ref.webphoneAnswer,
      webphoneReject = _ref.webphoneReject,
      webphoneHangup = _ref.webphoneHangup,
      webphoneResume = _ref.webphoneResume,
      webphoneToVoicemail = _ref.webphoneToVoicemail,
      webphoneSwitchCall = _ref.webphoneSwitchCall,
      modalConfirm = _ref.modalConfirm,
      modalClose = _ref.modalClose,
      enableContactFallback = _ref.enableContactFallback,
      title = _ref.title,
      sourceIcons = _ref.sourceIcons,
      phoneTypeRenderer = _ref.phoneTypeRenderer,
      phoneSourceNameRenderer = _ref.phoneSourceNameRenderer,
      isSessionAConferenceCall = _ref.isSessionAConferenceCall,
      onCallItemClick = _ref.onCallItemClick,
      showAvatar = _ref.showAvatar,
      getAvatarUrl = _ref.getAvatarUrl,
      conferenceCallParties = _ref.conferenceCallParties,
      useV2 = _ref.useV2,
      webphoneHold = _ref.webphoneHold,
      showCallDetail = _ref.showCallDetail,
      updateSessionMatchedContact = _ref.updateSessionMatchedContact,
      renderExtraButton = _ref.renderExtraButton,
      renderContactName = _ref.renderContactName,
      renderSubContactName = _ref.renderSubContactName,
      ringoutHangup = _ref.ringoutHangup,
      ringoutTransfer = _ref.ringoutTransfer,
      ringoutReject = _ref.ringoutReject,
      disableLinks = _ref.disableLinks,
      showRingoutCallControl = _ref.showRingoutCallControl,
      showSwitchCall = _ref.showSwitchCall,
      showTransferCall = _ref.showTransferCall,
      showHoldOnOtherDevice = _ref.showHoldOnOtherDevice,
      isOnHold = _ref.isOnHold,
      webphoneIgnore = _ref.webphoneIgnore,
      showIgnoreBtn = _ref.showIgnoreBtn,
      showHoldAnswerBtn = _ref.showHoldAnswerBtn,
      useCallDetailV2 = _ref.useCallDetailV2,
      newCallIcon = _ref.newCallIcon,
      clickSwitchTrack = _ref.clickSwitchTrack,
      showMultipleMatch = _ref.showMultipleMatch,
      isWide = _ref.isWide;

  if (!calls.length) {
    return null;
  } // if you are using call control SDK for webphone operation, then require to use ActiveCallItem v2


  var Component = useV2 ? _ActiveCallItemV.ActiveCallItem : _ActiveCallItem["default"];
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].list, className),
    "data-sign": "callList"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].listTitle,
    style: {
      marginBottom: useV2 && title ? '-5px' : null
    },
    title: title,
    "data-sign": "listTitle"
  }, title), calls.map(function (call) {
    var isOnConferenceCall = call.webphoneSession ? isSessionAConferenceCall(call.webphoneSession.id) : isConferenceCall(call); // in case it's an other device call

    return /*#__PURE__*/_react["default"].createElement(Component, {
      call: call,
      key: call.id,
      isOnConferenceCall: isOnConferenceCall,
      currentLocale: currentLocale,
      areaCode: areaCode,
      countryCode: countryCode,
      brand: brand,
      showContactDisplayPlaceholder: showContactDisplayPlaceholder,
      formatPhone: formatPhone,
      onClickToSms: onClickToSms,
      internalSmsPermission: internalSmsPermission,
      outboundSmsPermission: outboundSmsPermission,
      isLoggedContact: isLoggedContact,
      onLogCall: onLogCall,
      onViewContact: onViewContact,
      onCreateContact: onCreateContact,
      loggingMap: loggingMap,
      webphoneAnswer: webphoneAnswer,
      webphoneReject: webphoneReject,
      webphoneHangup: webphoneHangup,
      webphoneResume: webphoneResume,
      webphoneToVoicemail: webphoneToVoicemail,
      webphoneSwitchCall: webphoneSwitchCall,
      modalConfirm: modalConfirm,
      modalClose: modalClose,
      enableContactFallback: enableContactFallback,
      autoLog: autoLog,
      sourceIcons: sourceIcons,
      phoneTypeRenderer: phoneTypeRenderer,
      phoneSourceNameRenderer: phoneSourceNameRenderer,
      hasActionMenu: !isOnConferenceCall,
      onClick: function onClick() {
        return onCallItemClick(call);
      },
      showAvatar: showAvatar,
      getAvatarUrl: getAvatarUrl,
      conferenceCallParties: conferenceCallParties,
      webphoneHold: webphoneHold,
      showCallDetail: showCallDetail,
      updateSessionMatchedContact: updateSessionMatchedContact,
      renderExtraButton: renderExtraButton,
      renderContactName: renderContactName,
      renderSubContactName: renderSubContactName,
      ringoutHangup: ringoutHangup,
      ringoutTransfer: ringoutTransfer,
      ringoutReject: ringoutReject,
      disableLinks: disableLinks,
      showRingoutCallControl: showRingoutCallControl,
      showMultipleMatch: !showRingoutCallControl && showMultipleMatch // disabled for salesforce
      ,
      showSwitchCall: showSwitchCall,
      showTransferCall: showTransferCall,
      showHoldOnOtherDevice: showHoldOnOtherDevice,
      isOnHold: isOnHold,
      webphoneIgnore: webphoneIgnore,
      showIgnoreBtn: showIgnoreBtn,
      showHoldAnswerBtn: showHoldAnswerBtn,
      useCallDetailV2: useCallDetailV2,
      newCallIcon: newCallIcon,
      clickSwitchTrack: clickSwitchTrack,
      isWide: isWide
    });
  }));
};

ActiveCallList.defaultProps = {
  isWide: true,
  className: undefined,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  onCreateContact: undefined,
  onClickToSms: undefined,
  outboundSmsPermission: true,
  internalSmsPermission: true,
  isLoggedContact: undefined,
  onLogCall: undefined,
  loggingMap: {},
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  enableContactFallback: undefined,
  autoLog: false,
  onViewContact: undefined,
  webphoneToVoicemail: undefined,
  webphoneSwitchCall: undefined,
  webphoneIgnore: undefined,
  modalConfirm: undefined,
  modalClose: undefined,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  isSessionAConferenceCall: function isSessionAConferenceCall() {
    return false;
  },
  useV2: false,
  onCallItemClick: function onCallItemClick(i) {
    return i;
  },
  showAvatar: true,
  getAvatarUrl: undefined,
  conferenceCallParties: [],
  webphoneHold: function webphoneHold(i) {
    return i;
  },
  showCallDetail: false,
  updateSessionMatchedContact: function updateSessionMatchedContact(i) {
    return i;
  },
  renderExtraButton: undefined,
  renderContactName: undefined,
  renderSubContactName: undefined,
  ringoutHangup: undefined,
  ringoutTransfer: undefined,
  ringoutReject: undefined,
  disableLinks: false,
  showRingoutCallControl: false,
  showMultipleMatch: true,
  showSwitchCall: false,
  showTransferCall: true,
  showHoldOnOtherDevice: false,
  isOnHold: undefined,
  showIgnoreBtn: false,
  showHoldAnswerBtn: false,
  useCallDetailV2: false,
  newCallIcon: false,
  clickSwitchTrack: function clickSwitchTrack() {}
};
var _default = ActiveCallList;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
