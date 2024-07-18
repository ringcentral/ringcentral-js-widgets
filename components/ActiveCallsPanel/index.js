"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ActiveCallsPanel = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _ActiveCallList = _interopRequireDefault(require("../ActiveCallList"));
var _InsideModal = _interopRequireDefault(require("../InsideModal"));
var _LogNotification = _interopRequireDefault(require("../LogNotification"));
var _LogSection = _interopRequireDefault(require("../LogSection"));
var _SpinnerOverlay = require("../SpinnerOverlay");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ActiveCallsPanel = function ActiveCallsPanel(_ref) {
  var activeRingCalls = _ref.activeRingCalls,
    activeOnHoldCalls = _ref.activeOnHoldCalls,
    activeCurrentCalls = _ref.activeCurrentCalls,
    otherDeviceCalls = _ref.otherDeviceCalls,
    className = _ref.className,
    currentLocale = _ref.currentLocale,
    areaCode = _ref.areaCode,
    countryCode = _ref.countryCode,
    showMergeCall = _ref.showMergeCall,
    showCallDetail = _ref.showCallDetail,
    showCallerIdName = _ref.showCallerIdName,
    allCalls = _ref.allCalls,
    onCreateContact = _ref.onCreateContact,
    onClickToSms = _ref.onClickToSms,
    isLoggedContact = _ref.isLoggedContact,
    onLogCall = _ref.onLogCall,
    onViewContact = _ref.onViewContact,
    webphoneAnswer = _ref.webphoneAnswer,
    onMergeCall = _ref.onMergeCall,
    webphoneReject = _ref.webphoneReject,
    webphoneHangup = _ref.webphoneHangup,
    webphoneResume = _ref.webphoneResume,
    webphoneToVoicemail = _ref.webphoneToVoicemail,
    webphoneSwitchCall = _ref.webphoneSwitchCall,
    webphoneIgnore = _ref.webphoneIgnore,
    modalConfirm = _ref.modalConfirm,
    modalClose = _ref.modalClose,
    enableContactFallback = _ref.enableContactFallback,
    onCallsEmpty = _ref.onCallsEmpty,
    sourceIcons = _ref.sourceIcons,
    phoneTypeRenderer = _ref.phoneTypeRenderer,
    phoneSourceNameRenderer = _ref.phoneSourceNameRenderer,
    isWebRTC = _ref.isWebRTC,
    getAvatarUrl = _ref.getAvatarUrl,
    currentLog = _ref.currentLog,
    renderEditLogSection = _ref.renderEditLogSection,
    renderSaveLogButton = _ref.renderSaveLogButton,
    renderExtraButton = _ref.renderExtraButton,
    onSaveCallLog = _ref.onSaveCallLog,
    onUpdateCallLog = _ref.onUpdateCallLog,
    onCloseLogSection = _ref.onCloseLogSection,
    logNotification = _ref.logNotification,
    onCloseNotification = _ref.onCloseNotification,
    onDiscardNotification = _ref.onDiscardNotification,
    onSaveNotification = _ref.onSaveNotification,
    onExpandNotification = _ref.onExpandNotification,
    notificationContainerStyles = _ref.notificationContainerStyles,
    renderContactName = _ref.renderContactName,
    renderSubContactName = _ref.renderSubContactName,
    ringoutHangup = _ref.ringoutHangup,
    ringoutTransfer = _ref.ringoutTransfer,
    ringoutReject = _ref.ringoutReject,
    isOnHold = _ref.isOnHold,
    _ref$isWide = _ref.isWide,
    isWide = _ref$isWide === void 0 ? true : _ref$isWide,
    _ref$brand = _ref.brand,
    brand = _ref$brand === void 0 ? 'RingCentral' : _ref$brand,
    _ref$showContactDispl = _ref.showContactDisplayPlaceholder,
    showContactDisplayPlaceholder = _ref$showContactDispl === void 0 ? true : _ref$showContactDispl,
    _ref$outboundSmsPermi = _ref.outboundSmsPermission,
    outboundSmsPermission = _ref$outboundSmsPermi === void 0 ? true : _ref$outboundSmsPermi,
    _ref$internalSmsPermi = _ref.internalSmsPermission,
    internalSmsPermission = _ref$internalSmsPermi === void 0 ? true : _ref$internalSmsPermi,
    _ref$loggingMap = _ref.loggingMap,
    loggingMap = _ref$loggingMap === void 0 ? {} : _ref$loggingMap,
    _ref$autoLog = _ref.autoLog,
    autoLog = _ref$autoLog === void 0 ? false : _ref$autoLog,
    _ref$showSpinner = _ref.showSpinner,
    showSpinner = _ref$showSpinner === void 0 ? false : _ref$showSpinner,
    _ref$isSessionAConfer = _ref.isSessionAConferenceCall,
    isSessionAConferenceCall = _ref$isSessionAConfer === void 0 ? function () {
      return false;
    } : _ref$isSessionAConfer,
    onCallItemClick = _ref.onCallItemClick,
    _ref$conferenceCallPa = _ref.conferenceCallParties,
    conferenceCallParties = _ref$conferenceCallPa === void 0 ? [] : _ref$conferenceCallPa,
    _ref$webphoneHold = _ref.webphoneHold,
    webphoneHold = _ref$webphoneHold === void 0 ? function (i) {
      return i;
    } : _ref$webphoneHold,
    _ref$useV = _ref.useV2,
    useV2 = _ref$useV === void 0 ? false : _ref$useV,
    _ref$updateSessionMat = _ref.updateSessionMatchedContact,
    updateSessionMatchedContact = _ref$updateSessionMat === void 0 ? function (i) {
      return i;
    } : _ref$updateSessionMat,
    _ref$showNotiLogButto = _ref.showNotiLogButton,
    showNotiLogButton = _ref$showNotiLogButto === void 0 ? true : _ref$showNotiLogButto,
    _ref$showAvatar = _ref.showAvatar,
    showAvatar = _ref$showAvatar === void 0 ? true : _ref$showAvatar,
    _ref$showOtherDevice = _ref.showOtherDevice,
    showOtherDevice = _ref$showOtherDevice === void 0 ? true : _ref$showOtherDevice,
    _ref$disableLinks = _ref.disableLinks,
    disableLinks = _ref$disableLinks === void 0 ? false : _ref$disableLinks,
    _ref$showRingoutCallC = _ref.showRingoutCallControl,
    showRingoutCallControl = _ref$showRingoutCallC === void 0 ? false : _ref$showRingoutCallC,
    _ref$showMultipleMatc = _ref.showMultipleMatch,
    showMultipleMatch = _ref$showMultipleMatc === void 0 ? true : _ref$showMultipleMatc,
    _ref$showSwitchCall = _ref.showSwitchCall,
    showSwitchCall = _ref$showSwitchCall === void 0 ? false : _ref$showSwitchCall,
    _ref$showTransferCall = _ref.showTransferCall,
    showTransferCall = _ref$showTransferCall === void 0 ? true : _ref$showTransferCall,
    _ref$showHoldOnOtherD = _ref.showHoldOnOtherDevice,
    showHoldOnOtherDevice = _ref$showHoldOnOtherD === void 0 ? false : _ref$showHoldOnOtherD,
    _ref$onLogBasicInfoCl = _ref.onLogBasicInfoClick,
    onLogBasicInfoClick = _ref$onLogBasicInfoCl === void 0 ? function () {
      //
    } : _ref$onLogBasicInfoCl,
    _ref$renderSmallCallC = _ref.renderSmallCallContrl,
    renderSmallCallContrl = _ref$renderSmallCallC === void 0 ? function () {
      //
    } : _ref$renderSmallCallC,
    _ref$showIgnoreBtn = _ref.showIgnoreBtn,
    showIgnoreBtn = _ref$showIgnoreBtn === void 0 ? false : _ref$showIgnoreBtn,
    _ref$showHoldAnswerBt = _ref.showHoldAnswerBtn,
    showHoldAnswerBtn = _ref$showHoldAnswerBt === void 0 ? false : _ref$showHoldAnswerBt,
    _ref$useCallDetailV = _ref.useCallDetailV2,
    useCallDetailV2 = _ref$useCallDetailV === void 0 ? false : _ref$useCallDetailV,
    _ref$newCallIcon = _ref.newCallIcon,
    newCallIcon = _ref$newCallIcon === void 0 ? false : _ref$newCallIcon,
    _ref$clickSwitchTrack = _ref.clickSwitchTrack,
    clickSwitchTrack = _ref$clickSwitchTrack === void 0 ? function () {
      //
    } : _ref$clickSwitchTrack,
    onSwitchCall = _ref.onSwitchCall,
    formatPhone = _ref.formatPhone;
  var hasCalls = activeRingCalls.length > 0 || activeOnHoldCalls.length > 0 || activeCurrentCalls.length > 0 || otherDeviceCalls.length > 0;
  (0, _react.useEffect)(function () {
    if (!hasCalls) {
      onCallsEmpty === null || onCallsEmpty === void 0 ? void 0 : onCallsEmpty();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasCalls]);
  var renderLogSection = function renderLogSection() {
    if (!currentLog) return null;
    return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_InsideModal["default"], {
      title: currentLog.title,
      show: currentLog.showLog,
      onClose: onCloseLogSection,
      clickOutToClose: false,
      maskStyle: _styles["default"].maskStyle
    }, /*#__PURE__*/_react["default"].createElement(_LogSection["default"], {
      currentLocale: currentLocale,
      currentLog: currentLog,
      formatPhone: formatPhone,
      isInnerMask: logNotification && logNotification.notificationIsExpand
      // save call log
      ,
      renderEditLogSection: renderEditLogSection,
      showSaveLogBtn: true,
      onUpdateCallLog: onUpdateCallLog,
      onSaveCallLog: onSaveCallLog,
      renderSaveLogButton: renderSaveLogButton
      // active call ctrl
      ,
      onLogBasicInfoClick: onLogBasicInfoClick,
      renderSmallCallContrl: renderSmallCallContrl
    })), logNotification ? /*#__PURE__*/_react["default"].createElement(_InsideModal["default"], {
      show: logNotification.showNotification,
      showTitle: false,
      containerStyles: (0, _clsx["default"])(_styles["default"].notificationContainer, notificationContainerStyles),
      modalStyles: _styles["default"].notificationModal,
      contentStyle: _styles["default"].notificationContent,
      onClose: onCloseNotification
    }, /*#__PURE__*/_react["default"].createElement(_LogNotification["default"], {
      showLogButton: showNotiLogButton,
      currentLocale: currentLocale,
      formatPhone: formatPhone,
      currentLog: logNotification,
      isExpand: logNotification.notificationIsExpand,
      onSave: onSaveNotification,
      onExpand: onExpandNotification,
      onDiscard: onDiscardNotification,
      onStay: onCloseNotification
    })) : null);
  };
  var getCallList = function getCallList(calls, title) {
    var showCallDetail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var allCalls = arguments.length > 3 ? arguments[3] : undefined;
    var showMergeCallBtn = arguments.length > 4 ? arguments[4] : undefined;
    return /*#__PURE__*/_react["default"].createElement(_ActiveCallList["default"], {
      title: title,
      calls: calls,
      currentLocale: currentLocale,
      areaCode: areaCode,
      countryCode: countryCode,
      showCallerIdName: showCallerIdName,
      brand: brand,
      showContactDisplayPlaceholder: showContactDisplayPlaceholder,
      formatPhone: formatPhone,
      onClickToSms: onClickToSms,
      onCreateContact: onCreateContact,
      onViewContact: onViewContact,
      outboundSmsPermission: outboundSmsPermission,
      internalSmsPermission: internalSmsPermission,
      isLoggedContact: isLoggedContact,
      onLogCall: onLogCall,
      autoLog: autoLog,
      loggingMap: loggingMap,
      showMergeCall: showMergeCall && showMergeCallBtn,
      onMergeCall: onMergeCall,
      webphoneAnswer: webphoneAnswer,
      webphoneReject: webphoneReject,
      webphoneHangup: webphoneHangup,
      webphoneResume: webphoneResume,
      webphoneSwitchCall: webphoneSwitchCall,
      webphoneIgnore: webphoneIgnore,
      modalConfirm: modalConfirm,
      modalClose: modalClose,
      webphoneToVoicemail: webphoneToVoicemail,
      renderExtraButton: renderExtraButton,
      renderContactName: renderContactName,
      renderSubContactName: renderSubContactName,
      enableContactFallback: enableContactFallback,
      sourceIcons: sourceIcons,
      phoneTypeRenderer: phoneTypeRenderer,
      phoneSourceNameRenderer: phoneSourceNameRenderer,
      isSessionAConferenceCall: isSessionAConferenceCall,
      useV2: useV2
      // TODO: Maybe we should make all the call item consistent
      ,
      onCallItemClick: onCallItemClick,
      showAvatar: showAvatar,
      getAvatarUrl: getAvatarUrl,
      conferenceCallParties: conferenceCallParties,
      webphoneHold: webphoneHold,
      showCallDetail: showCallDetail,
      updateSessionMatchedContact: updateSessionMatchedContact,
      ringoutHangup: ringoutHangup,
      ringoutTransfer: ringoutTransfer,
      ringoutReject: ringoutReject,
      disableLinks: disableLinks,
      showRingoutCallControl: showRingoutCallControl,
      showMultipleMatch: showMultipleMatch,
      showSwitchCall: showSwitchCall,
      showTransferCall: showTransferCall,
      showHoldOnOtherDevice: showHoldOnOtherDevice,
      isOnHold: isOnHold,
      showIgnoreBtn: showIgnoreBtn,
      showHoldAnswerBtn: showHoldAnswerBtn,
      useCallDetailV2: useCallDetailV2,
      newCallIcon: newCallIcon,
      clickSwitchTrack: clickSwitchTrack,
      onSwitchCall: onSwitchCall,
      isWide: isWide,
      allCalls: allCalls
    });
  };
  if (!hasCalls) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      "data-sign": "activeCalls",
      className: (0, _clsx["default"])(_styles["default"].root, className)
    }, /*#__PURE__*/_react["default"].createElement("p", {
      className: _styles["default"].noCalls
    }, _i18n["default"].getString('noActiveCalls', currentLocale)), renderLogSection(), showSpinner ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, {
      className: _styles["default"].spinner
    }) : null);
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "activeCalls",
    className: _styles["default"].root
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].root, className)
  }, getCallList(activeRingCalls, _i18n["default"].getString('ringCall', currentLocale), showCallDetail, allCalls), getCallList(activeCurrentCalls, _i18n["default"].getString('currentCall', currentLocale), showCallDetail, allCalls), getCallList(activeOnHoldCalls, _i18n["default"].getString('onHoldCall', currentLocale), showCallDetail, allCalls, true), showOtherDevice ? getCallList(otherDeviceCalls, _i18n["default"].getString('otherDeviceCall', currentLocale), true, allCalls) : null), renderLogSection(), showSpinner ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, {
    className: _styles["default"].spinner
  }) : null);
};
exports.ActiveCallsPanel = ActiveCallsPanel;
var _default = ActiveCallsPanel;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
