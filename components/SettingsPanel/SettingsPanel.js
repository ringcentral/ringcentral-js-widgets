"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsPanel = void 0;
var _react = _interopRequireDefault(require("react"));
var _MeetingAlert = require("../MeetingAlert");
var _BasePanel = require("./BasePanel");
var _ClickToDial = require("./ClickToDial");
var _LinkLineItem = require("./LinkLineItem");
var _Locale = require("./Locale");
var _PresenceSetting = require("./PresenceSetting");
var _SwitchLineItem = require("./SwitchLineItem");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Empty = function Empty() {
  return null;
};
var SettingsPanel = function SettingsPanel(_ref) {
  var additional = _ref.additional,
    _ref$autoLogEnabled = _ref.autoLogEnabled,
    autoLogEnabled = _ref$autoLogEnabled === void 0 ? false : _ref$autoLogEnabled,
    _ref$autoLogNotesEnab = _ref.autoLogNotesEnabled,
    autoLogNotesEnabled = _ref$autoLogNotesEnab === void 0 ? false : _ref$autoLogNotesEnab,
    _ref$autoLogSMSEnable = _ref.autoLogSMSEnabled,
    autoLogSMSEnabled = _ref$autoLogSMSEnable === void 0 ? false : _ref$autoLogSMSEnable,
    autoLogSMSTitle = _ref.autoLogSMSTitle,
    autoLogTitle = _ref.autoLogTitle,
    children = _ref.children,
    className = _ref.className,
    _ref$clickToDialEnabl = _ref.clickToDialEnabled,
    clickToDialEnabled = _ref$clickToDialEnabl === void 0 ? false : _ref$clickToDialEnabl,
    _ref$clickToDialPermi = _ref.clickToDialPermissions,
    clickToDialPermissions = _ref$clickToDialPermi === void 0 ? false : _ref$clickToDialPermi,
    clickToDialTitle = _ref.clickToDialTitle,
    currentLocale = _ref.currentLocale,
    _ref$disableAutoLogEn = _ref.disableAutoLogEnabled,
    disableAutoLogEnabled = _ref$disableAutoLogEn === void 0 ? false : _ref$disableAutoLogEn,
    _ref$disableAutoLogNo = _ref.disableAutoLogNotesEnabled,
    disableAutoLogNotesEnabled = _ref$disableAutoLogNo === void 0 ? false : _ref$disableAutoLogNo,
    dndStatus = _ref.dndStatus,
    eulaLabel = _ref.eulaLabel,
    eulaLink = _ref.eulaLink,
    isCallQueueMember = _ref.isCallQueueMember,
    loginNumber = _ref.loginNumber,
    _ref$logSMSContentEna = _ref.logSMSContentEnabled,
    logSMSContentEnabled = _ref$logSMSContentEna === void 0 ? true : _ref$logSMSContentEna,
    logSMSContentTitle = _ref.logSMSContentTitle,
    onAudioSettingsLinkClick = _ref.onAudioSettingsLinkClick,
    _ref$onAutoLogChange = _ref.onAutoLogChange,
    onAutoLogChange = _ref$onAutoLogChange === void 0 ? Empty : _ref$onAutoLogChange,
    _ref$onAutoLogNotesCh = _ref.onAutoLogNotesChange,
    onAutoLogNotesChange = _ref$onAutoLogNotesCh === void 0 ? Empty : _ref$onAutoLogNotesCh,
    onAutoLogSMSChange = _ref.onAutoLogSMSChange,
    onCallingSettingsLinkClick = _ref.onCallingSettingsLinkClick,
    onClickToDialChange = _ref.onClickToDialChange,
    onEulaLinkClick = _ref.onEulaLinkClick,
    onFeedbackSettingsLinkClick = _ref.onFeedbackSettingsLinkClick,
    onLogoutButtonClick = _ref.onLogoutButtonClick,
    _ref$onLogSMSContentC = _ref.onLogSMSContentChange,
    onLogSMSContentChange = _ref$onLogSMSContentC === void 0 ? Empty : _ref$onLogSMSContentC,
    _ref$onQuickAccessLin = _ref.onQuickAccessLinkClick,
    onQuickAccessLinkClick = _ref$onQuickAccessLin === void 0 ? Empty : _ref$onQuickAccessLin,
    onRegionSettingsLinkClick = _ref.onRegionSettingsLinkClick,
    _ref$onReportLinkClic = _ref.onReportLinkClick,
    onReportLinkClick = _ref$onReportLinkClic === void 0 ? Empty : _ref$onReportLinkClic,
    onShareIdeaClick = _ref.onShareIdeaClick,
    onUserGuideClick = _ref.onUserGuideClick,
    onReportIssueClick = _ref.onReportIssueClick,
    _ref$openPresenceSett = _ref.openPresenceSettings,
    openPresenceSettings = _ref$openPresenceSett === void 0 ? false : _ref$openPresenceSett,
    _ref$outboundSMS = _ref.outboundSMS,
    outboundSMS = _ref$outboundSMS === void 0 ? false : _ref$outboundSMS,
    savedLocale = _ref.savedLocale,
    saveLocale = _ref.saveLocale,
    _ref$setAvailable = _ref.setAvailable,
    setAvailable = _ref$setAvailable === void 0 ? Empty : _ref$setAvailable,
    _ref$setBusy = _ref.setBusy,
    setBusy = _ref$setBusy === void 0 ? Empty : _ref$setBusy,
    _ref$setDoNotDisturb = _ref.setDoNotDisturb,
    setDoNotDisturb = _ref$setDoNotDisturb === void 0 ? Empty : _ref$setDoNotDisturb,
    _ref$setInvisible = _ref.setInvisible,
    setInvisible = _ref$setInvisible === void 0 ? Empty : _ref$setInvisible,
    _ref$showAudio = _ref.showAudio,
    showAudio = _ref$showAudio === void 0 ? false : _ref$showAudio,
    _ref$showAutoLog = _ref.showAutoLog,
    showAutoLog = _ref$showAutoLog === void 0 ? false : _ref$showAutoLog,
    _ref$showAutoLogNotes = _ref.showAutoLogNotes,
    showAutoLogNotes = _ref$showAutoLogNotes === void 0 ? false : _ref$showAutoLogNotes,
    _ref$showAutoLogSMS = _ref.showAutoLogSMS,
    showAutoLogSMS = _ref$showAutoLogSMS === void 0 ? false : _ref$showAutoLogSMS,
    _ref$showCalling = _ref.showCalling,
    showCalling = _ref$showCalling === void 0 ? false : _ref$showCalling,
    _ref$showClickToDial = _ref.showClickToDial,
    showClickToDial = _ref$showClickToDial === void 0 ? false : _ref$showClickToDial,
    _ref$showFeedback = _ref.showFeedback,
    showFeedback = _ref$showFeedback === void 0 ? true : _ref$showFeedback,
    _ref$showHeader = _ref.showHeader,
    showHeader = _ref$showHeader === void 0 ? false : _ref$showHeader,
    _ref$showLogSMSConten = _ref.showLogSMSContent,
    showLogSMSContent = _ref$showLogSMSConten === void 0 ? false : _ref$showLogSMSConten,
    _ref$showPresenceSett = _ref.showPresenceSettings,
    showPresenceSettings = _ref$showPresenceSett === void 0 ? true : _ref$showPresenceSett,
    _ref$showQuickAccess = _ref.showQuickAccess,
    showQuickAccess = _ref$showQuickAccess === void 0 ? false : _ref$showQuickAccess,
    _ref$showRegion = _ref.showRegion,
    showRegion = _ref$showRegion === void 0 ? false : _ref$showRegion,
    _ref$showReport = _ref.showReport,
    showReport = _ref$showReport === void 0 ? false : _ref$showReport,
    _ref$showShareIdea = _ref.showShareIdea,
    showShareIdea = _ref$showShareIdea === void 0 ? false : _ref$showShareIdea,
    _ref$showSpinner = _ref.showSpinner,
    showSpinner = _ref$showSpinner === void 0 ? false : _ref$showSpinner,
    _ref$showUserGuide = _ref.showUserGuide,
    showUserGuide = _ref$showUserGuide === void 0 ? false : _ref$showUserGuide,
    _ref$isEnablePendo = _ref.isEnablePendo,
    isEnablePendo = _ref$isEnablePendo === void 0 ? false : _ref$isEnablePendo,
    _ref$showReportIssue = _ref.showReportIssue,
    showReportIssue = _ref$showReportIssue === void 0 ? false : _ref$showReportIssue,
    supportedLocales = _ref.supportedLocales,
    _ref$toggleAcceptCall = _ref.toggleAcceptCallQueueCalls,
    toggleAcceptCallQueueCalls = _ref$toggleAcceptCall === void 0 ? Empty : _ref$toggleAcceptCall,
    userStatus = _ref.userStatus,
    version = _ref.version,
    versionContainer = _ref.versionContainer,
    showRemoveMeetingWarning = _ref.showRemoveMeetingWarning,
    brandConfig = _ref.brandConfig;
  return /*#__PURE__*/_react["default"].createElement(_BasePanel.BasePanel, {
    currentLocale: currentLocale,
    className: className,
    showSpinner: showSpinner,
    showHeader: showHeader,
    eulaLabel: eulaLabel,
    eulaLink: eulaLink,
    onEulaLinkClick: onEulaLinkClick,
    loginNumber: loginNumber,
    onLogoutButtonClick: onLogoutButtonClick,
    version: version,
    versionContainer: versionContainer
  }, showRemoveMeetingWarning && /*#__PURE__*/_react["default"].createElement(_MeetingAlert.RemoveMeetingWarn, {
    brandConfig: brandConfig,
    currentLocale: currentLocale,
    hasRemoved: true
  }), /*#__PURE__*/_react["default"].createElement(_LinkLineItem.LinkLineItem, {
    name: "report",
    show: showReport,
    currentLocale: currentLocale,
    onClick: onReportLinkClick
  }), /*#__PURE__*/_react["default"].createElement(_Locale.Locale, {
    supportedLocales: supportedLocales,
    currentLocale: currentLocale,
    savedLocale: savedLocale,
    saveLocale: saveLocale
  }), /*#__PURE__*/_react["default"].createElement(_LinkLineItem.LinkLineItem, {
    name: "calling",
    show: showCalling,
    currentLocale: currentLocale,
    onClick: onCallingSettingsLinkClick
  }), /*#__PURE__*/_react["default"].createElement(_LinkLineItem.LinkLineItem, {
    name: "region",
    show: showRegion,
    currentLocale: currentLocale,
    onClick: onRegionSettingsLinkClick
  }), /*#__PURE__*/_react["default"].createElement(_LinkLineItem.LinkLineItem, {
    name: "audio",
    show: showAudio,
    currentLocale: currentLocale,
    onClick: onAudioSettingsLinkClick
  }), /*#__PURE__*/_react["default"].createElement(_PresenceSetting.PresenceSetting, {
    showPresenceSettings: showPresenceSettings,
    dndStatus: dndStatus,
    userStatus: userStatus,
    currentLocale: currentLocale,
    isCallQueueMember: isCallQueueMember,
    setAvailable: setAvailable,
    setBusy: setBusy,
    setDoNotDisturb: setDoNotDisturb,
    setInvisible: setInvisible,
    toggleAcceptCallQueueCalls: toggleAcceptCallQueueCalls,
    openPresenceSettings: openPresenceSettings
  }), children, /*#__PURE__*/_react["default"].createElement(_SwitchLineItem.SwitchLineItem, {
    name: "autoLogCalls",
    dataSign: "AutoLogCall",
    show: showAutoLog,
    customTitle: autoLogTitle,
    currentLocale: currentLocale,
    disabled: disableAutoLogEnabled,
    checked: autoLogEnabled,
    onChange: onAutoLogChange
  }), /*#__PURE__*/_react["default"].createElement(_SwitchLineItem.SwitchLineItem, {
    name: "autoLogNotes",
    dataSign: "AutoLogNotes",
    show: showAutoLogNotes,
    currentLocale: currentLocale,
    disabled: disableAutoLogNotesEnabled,
    checked: autoLogNotesEnabled,
    onChange: onAutoLogNotesChange
  }), /*#__PURE__*/_react["default"].createElement(_SwitchLineItem.SwitchLineItem, {
    name: "autoLogSMS",
    dataSign: "AutoLogSMS",
    customTitle: autoLogSMSTitle,
    show: showAutoLogSMS,
    currentLocale: currentLocale,
    checked: autoLogSMSEnabled,
    onChange: onAutoLogSMSChange
  }), /*#__PURE__*/_react["default"].createElement(_SwitchLineItem.SwitchLineItem, {
    name: "logSMSContent",
    dataSign: "LogSMSContent",
    customTitle: logSMSContentTitle,
    show: showLogSMSContent,
    currentLocale: currentLocale,
    checked: logSMSContentEnabled,
    onChange: onLogSMSContentChange
  }), /*#__PURE__*/_react["default"].createElement(_ClickToDial.ClickToDial, {
    currentLocale: currentLocale,
    showClickToDial: showClickToDial,
    outboundSMS: outboundSMS,
    clickToDialPermissions: clickToDialPermissions,
    clickToDialEnabled: clickToDialEnabled,
    onClickToDialChange: onClickToDialChange,
    clickToDialTitle: clickToDialTitle
  }), additional, /*#__PURE__*/_react["default"].createElement(_LinkLineItem.LinkLineItem, {
    name: "feedback",
    dataSign: "Feedback",
    pendoSignName: isEnablePendo ? 'Feedback' : '',
    show: showFeedback,
    currentLocale: currentLocale,
    onClick: onFeedbackSettingsLinkClick
  }), /*#__PURE__*/_react["default"].createElement(_LinkLineItem.LinkLineItem, {
    name: "shareIdea",
    show: showShareIdea,
    currentLocale: currentLocale,
    onClick: onShareIdeaClick
  }), /*#__PURE__*/_react["default"].createElement(_LinkLineItem.LinkLineItem, {
    name: "quickAccess",
    show: showQuickAccess,
    currentLocale: currentLocale,
    onClick: onQuickAccessLinkClick
  }), /*#__PURE__*/_react["default"].createElement(_LinkLineItem.LinkLineItem, {
    name: "userGuide",
    show: showUserGuide,
    currentLocale: currentLocale,
    onClick: onUserGuideClick
  }), /*#__PURE__*/_react["default"].createElement(_LinkLineItem.LinkLineItem, {
    name: "reportIssue",
    show: showReportIssue,
    currentLocale: currentLocale,
    onClick: onReportIssueClick
  }));
};
exports.SettingsPanel = SettingsPanel;
//# sourceMappingURL=SettingsPanel.js.map
