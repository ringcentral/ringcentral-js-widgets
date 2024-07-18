"use strict";

require("core-js/modules/es.array.find");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.map");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _ActiveCallItem = _interopRequireDefault(require("../ActiveCallItem"));
var _ActiveCallItemV = require("../ActiveCallItemV2");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
    showCallerIdName = _ref.showCallerIdName,
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
    showMergeCall = _ref.showMergeCall,
    onMergeCall = _ref.onMergeCall,
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
    onSwitchCall = _ref.onSwitchCall,
    clickSwitchTrack = _ref.clickSwitchTrack,
    showMultipleMatch = _ref.showMultipleMatch,
    isWide = _ref.isWide,
    allCalls = _ref.allCalls;
  if (!calls.length) {
    return null;
  }
  // if you are using call control SDK for webphone operation, then require to use ActiveCallItem v2
  var Component = useV2 ? _ActiveCallItemV.ActiveCallItem : _ActiveCallItem["default"];
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].list, className),
    "data-sign": "callList"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].listTitle,
    style: {
      // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'Ma... Remove this comment to see the full error message
      marginBottom: useV2 && title ? '-5px' : null
    },
    title: title,
    "data-sign": "listTitle"
  }, title), calls.map(function (call) {
    var _call$isConferenceCal, _ref2, _call$id;
    var isOnConferenceCall = (_call$isConferenceCal = call.isConferenceCall) !== null && _call$isConferenceCal !== void 0 ? _call$isConferenceCal : call.webphoneSession ?
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    isSessionAConferenceCall(call.webphoneSession.id) : isConferenceCall(call); // in case it's an other device call
    var warmTransferInfo = call.warmTransferInfo;
    var warmTransferRole;
    var originalCall;
    if (warmTransferInfo) {
      warmTransferRole = warmTransferInfo.isOriginal ? " (".concat(_i18n["default"].getString('callerCall', currentLocale), ")") : " (".concat(_i18n["default"].getString('transferCall', currentLocale), ")");
      if (!call.warmTransferInfo.isOriginal) {
        originalCall = allCalls === null || allCalls === void 0 ? void 0 : allCalls.find(function (s) {
          var _call$warmTransferInf;
          return s.telephonySessionId === ((_call$warmTransferInf = call.warmTransferInfo) === null || _call$warmTransferInf === void 0 ? void 0 : _call$warmTransferInf.relatedTelephonySessionId);
        });
      }
    }
    return /*#__PURE__*/_react["default"].createElement(Component, {
      warmTransferRole: warmTransferRole,
      call: call,
      showCallerIdName: showCallerIdName,
      key: (_ref2 = (_call$id = call.id) !== null && _call$id !== void 0 ? _call$id : call.sessionId) !== null && _ref2 !== void 0 ? _ref2 : call.telephonySessionId,
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
      showMergeCall: showMergeCall,
      onMergeCall: onMergeCall
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      ,
      webphoneAnswer: webphoneAnswer
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      ,
      webphoneReject: webphoneReject
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      ,
      webphoneHangup: webphoneHangup
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      ,
      webphoneResume: webphoneResume
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      ,
      webphoneToVoicemail: webphoneToVoicemail
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      ,
      webphoneSwitchCall: webphoneSwitchCall
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      ,
      modalConfirm: modalConfirm
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      ,
      modalClose: modalClose,
      enableContactFallback: enableContactFallback,
      autoLog: autoLog,
      sourceIcons: sourceIcons,
      phoneTypeRenderer: phoneTypeRenderer,
      phoneSourceNameRenderer: phoneSourceNameRenderer,
      hasActionMenu: !isOnConferenceCall
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      ,
      onClick: function onClick() {
        return onCallItemClick(originalCall || call);
      },
      showAvatar: showAvatar,
      getAvatarUrl: getAvatarUrl
      // @ts-expect-error TS(2322): Type 'object[] | undefined' is not assignable to t... Remove this comment to see the full error message
      ,
      conferenceCallParties: conferenceCallParties
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      ,
      webphoneHold: webphoneHold,
      showCallDetail: showCallDetail,
      updateSessionMatchedContact: updateSessionMatchedContact,
      renderExtraButton: renderExtraButton,
      renderContactName: renderContactName,
      renderSubContactName: renderSubContactName
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      ,
      ringoutHangup: ringoutHangup
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      ,
      ringoutTransfer: ringoutTransfer
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      ,
      ringoutReject: ringoutReject,
      disableLinks: disableLinks,
      showRingoutCallControl: showRingoutCallControl,
      showMultipleMatch: !showRingoutCallControl && showMultipleMatch // disabled for salesforce
      ,
      showSwitchCall: showSwitchCall,
      showTransferCall: showTransferCall,
      showHoldOnOtherDevice: showHoldOnOtherDevice,
      isOnHold: isOnHold
      // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
      ,
      webphoneIgnore: webphoneIgnore,
      showIgnoreBtn: showIgnoreBtn,
      showHoldAnswerBtn: showHoldAnswerBtn,
      useCallDetailV2: useCallDetailV2
      // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
      ,
      newCallIcon: newCallIcon,
      clickSwitchTrack: clickSwitchTrack,
      onSwitchCall: onSwitchCall,
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
