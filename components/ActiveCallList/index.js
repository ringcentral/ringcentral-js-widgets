"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.is-array");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

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

ActiveCallList.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  className: _propTypes["default"].string,
  title: _propTypes["default"].string.isRequired,
  calls: _propTypes["default"].array.isRequired,
  areaCode: _propTypes["default"].string.isRequired,
  countryCode: _propTypes["default"].string.isRequired,
  brand: _propTypes["default"].string,
  showContactDisplayPlaceholder: _propTypes["default"].bool,
  formatPhone: _propTypes["default"].func.isRequired,
  onClickToSms: _propTypes["default"].func,
  onCreateContact: _propTypes["default"].func,
  onViewContact: _propTypes["default"].func,
  outboundSmsPermission: _propTypes["default"].bool,
  internalSmsPermission: _propTypes["default"].bool,
  isLoggedContact: _propTypes["default"].func,
  onLogCall: _propTypes["default"].func,
  loggingMap: _propTypes["default"].object,
  webphoneAnswer: _propTypes["default"].func,
  webphoneReject: _propTypes["default"].func,
  webphoneHangup: _propTypes["default"].func,
  webphoneResume: _propTypes["default"].func,
  webphoneToVoicemail: _propTypes["default"].func,
  webphoneSwitchCall: _propTypes["default"].func,
  webphoneIgnore: _propTypes["default"].func,
  modalConfirm: _propTypes["default"].func,
  modalClose: _propTypes["default"].func,
  enableContactFallback: _propTypes["default"].bool,
  autoLog: _propTypes["default"].bool,
  sourceIcons: _propTypes["default"].object,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  isSessionAConferenceCall: _propTypes["default"].func,
  useV2: _propTypes["default"].bool,
  onCallItemClick: _propTypes["default"].func,
  showAvatar: _propTypes["default"].bool,
  getAvatarUrl: _propTypes["default"].func,
  conferenceCallParties: _propTypes["default"].arrayOf(_propTypes["default"].object),
  webphoneHold: _propTypes["default"].func,
  showCallDetail: _propTypes["default"].bool,
  updateSessionMatchedContact: _propTypes["default"].func,
  renderExtraButton: _propTypes["default"].func,
  renderContactName: _propTypes["default"].func,
  ringoutHangup: _propTypes["default"].func,
  ringoutTransfer: _propTypes["default"].func,
  ringoutReject: _propTypes["default"].func,
  disableLinks: _propTypes["default"].bool,
  showRingoutCallControl: _propTypes["default"].bool,
  showMultipleMatch: _propTypes["default"].bool,
  showSwitchCall: _propTypes["default"].bool,
  showTransferCall: _propTypes["default"].bool,
  showHoldOnOtherDevice: _propTypes["default"].bool,
  isOnHold: _propTypes["default"].func,
  showIgnoreBtn: _propTypes["default"].bool,
  showHoldAnswerBtn: _propTypes["default"].bool,
  useCallDetailV2: _propTypes["default"].bool,
  newCallIcon: _propTypes["default"].bool,
  clickSwitchTrack: _propTypes["default"].func,
  isWide: _propTypes["default"].bool
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
