"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.baseDefaultProps = void 0;

var _react = _interopRequireDefault(require("react"));

var _Eula = _interopRequireDefault(require("../Eula"));

var _ClickToDial = require("./SettingItems/ClickToDial");

var _LinkLineItem = require("./SettingItems/LinkLineItem");

var _Locale = require("./SettingItems/Locale");

var _PresenceSetting = require("./SettingItems/PresenceSetting");

var _SwitchLineItem = require("./SettingItems/SwitchLineItem");

var _BasePanel = _interopRequireDefault(require("./BasePanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SettingsPanel = function SettingsPanel(_ref) {
  var children = _ref.children,
      className = _ref.className,
      onLogoutButtonClick = _ref.onLogoutButtonClick,
      loginNumber = _ref.loginNumber,
      version = _ref.version,
      currentLocale = _ref.currentLocale,
      brandId = _ref.brandId,
      EulaRenderer = _ref.EulaRenderer,
      onCallingSettingsLinkClick = _ref.onCallingSettingsLinkClick,
      onRegionSettingsLinkClick = _ref.onRegionSettingsLinkClick,
      onAudioSettingsLinkClick = _ref.onAudioSettingsLinkClick,
      onFeedbackSettingsLinkClick = _ref.onFeedbackSettingsLinkClick,
      onQuickAccessLinkClick = _ref.onQuickAccessLinkClick,
      onUserGuideClick = _ref.onUserGuideClick,
      showCalling = _ref.showCalling,
      showAutoLog = _ref.showAutoLog,
      showAutoLogNotes = _ref.showAutoLogNotes,
      showAudio = _ref.showAudio,
      showReport = _ref.showReport,
      autoLogEnabled = _ref.autoLogEnabled,
      autoLogNotesEnabled = _ref.autoLogNotesEnabled,
      logSMSContentEnabled = _ref.logSMSContentEnabled,
      disableAutoLogEnabled = _ref.disableAutoLogEnabled,
      disableAutoLogNotesEnabled = _ref.disableAutoLogNotesEnabled,
      onAutoLogChange = _ref.onAutoLogChange,
      onAutoLogNotesChange = _ref.onAutoLogNotesChange,
      showAutoLogSMS = _ref.showAutoLogSMS,
      showLogSMSContent = _ref.showLogSMSContent,
      autoLogSMSEnabled = _ref.autoLogSMSEnabled,
      onAutoLogSMSChange = _ref.onAutoLogSMSChange,
      onLogSMSContentChange = _ref.onLogSMSContentChange,
      showClickToDial = _ref.showClickToDial,
      clickToDialEnabled = _ref.clickToDialEnabled,
      clickToDialPermissions = _ref.clickToDialPermissions,
      onClickToDialChange = _ref.onClickToDialChange,
      onReportLinkClick = _ref.onReportLinkClick,
      showRegion = _ref.showRegion,
      showHeader = _ref.showHeader,
      outboundSMS = _ref.outboundSMS,
      showSpinner = _ref.showSpinner,
      dndStatus = _ref.dndStatus,
      userStatus = _ref.userStatus,
      setAvailable = _ref.setAvailable,
      setBusy = _ref.setBusy,
      setDoNotDisturb = _ref.setDoNotDisturb,
      setInvisible = _ref.setInvisible,
      toggleAcceptCallQueueCalls = _ref.toggleAcceptCallQueueCalls,
      isCallQueueMember = _ref.isCallQueueMember,
      showPresenceSettings = _ref.showPresenceSettings,
      openPresenceSettings = _ref.openPresenceSettings,
      showFeedback = _ref.showFeedback,
      showQuickAccess = _ref.showQuickAccess,
      showUserGuide = _ref.showUserGuide,
      additional = _ref.additional,
      supportedLocales = _ref.supportedLocales,
      savedLocale = _ref.savedLocale,
      saveLocale = _ref.saveLocale,
      clickToDialTitle = _ref.clickToDialTitle,
      versionContainer = _ref.versionContainer,
      autoLogTitle = _ref.autoLogTitle,
      autoLogSMSTitle = _ref.autoLogSMSTitle,
      logSMSContentTitle = _ref.logSMSContentTitle;
  return _react["default"].createElement(_BasePanel["default"], {
    currentLocale: currentLocale,
    className: className,
    showSpinner: showSpinner,
    showHeader: showHeader,
    brandId: brandId,
    loginNumber: loginNumber,
    onLogoutButtonClick: onLogoutButtonClick,
    EulaRenderer: EulaRenderer,
    version: version,
    versionContainer: versionContainer
  }, _react["default"].createElement(_LinkLineItem.LinkLineItem, {
    name: "report",
    show: showReport,
    currentLocale: currentLocale,
    onClick: onReportLinkClick
  }), _react["default"].createElement(_Locale.Locale, {
    supportedLocales: supportedLocales,
    currentLocale: currentLocale,
    savedLocale: savedLocale,
    saveLocale: saveLocale
  }), _react["default"].createElement(_LinkLineItem.LinkLineItem, {
    name: "calling",
    show: showCalling,
    currentLocale: currentLocale,
    onClick: onCallingSettingsLinkClick
  }), _react["default"].createElement(_LinkLineItem.LinkLineItem, {
    name: "region",
    show: showRegion,
    currentLocale: currentLocale,
    onClick: onRegionSettingsLinkClick
  }), _react["default"].createElement(_LinkLineItem.LinkLineItem, {
    name: "audio",
    show: showAudio,
    currentLocale: currentLocale,
    onClick: onAudioSettingsLinkClick
  }), _react["default"].createElement(_PresenceSetting.PresenceSetting, {
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
  }), children, _react["default"].createElement(_SwitchLineItem.SwitchLineItem, {
    name: "autoLogCalls",
    dataSign: "AutoLogCall",
    show: showAutoLog,
    customTitle: autoLogTitle,
    currentLocale: currentLocale,
    disabled: disableAutoLogEnabled,
    checked: autoLogEnabled,
    onChange: onAutoLogChange
  }), _react["default"].createElement(_SwitchLineItem.SwitchLineItem, {
    name: "autoLogNotes",
    dataSign: "AutoLogNotes",
    show: showAutoLogNotes,
    currentLocale: currentLocale,
    disabled: disableAutoLogNotesEnabled,
    checked: autoLogNotesEnabled,
    onChange: onAutoLogNotesChange
  }), _react["default"].createElement(_SwitchLineItem.SwitchLineItem, {
    name: "autoLogSMS",
    dataSign: "AutoLogSMS",
    customTitle: autoLogSMSTitle,
    show: showAutoLogSMS,
    currentLocale: currentLocale,
    checked: autoLogSMSEnabled,
    onChange: onAutoLogSMSChange
  }), _react["default"].createElement(_SwitchLineItem.SwitchLineItem, {
    name: "logSMSContent",
    dataSign: "LogSMSContent",
    customTitle: logSMSContentTitle,
    show: showLogSMSContent,
    currentLocale: currentLocale,
    checked: logSMSContentEnabled,
    onChange: onLogSMSContentChange
  }), _react["default"].createElement(_ClickToDial.ClickToDial, {
    currentLocale: currentLocale,
    showClickToDial: showClickToDial,
    outboundSMS: outboundSMS,
    clickToDialPermissions: clickToDialPermissions,
    clickToDialEnabled: clickToDialEnabled,
    onClickToDialChange: onClickToDialChange,
    clickToDialTitle: clickToDialTitle
  }), additional, _react["default"].createElement(_LinkLineItem.LinkLineItem, {
    name: "feedback",
    show: showFeedback,
    currentLocale: currentLocale,
    onClick: onFeedbackSettingsLinkClick
  }), _react["default"].createElement(_LinkLineItem.LinkLineItem, {
    name: "quickAccess",
    show: showQuickAccess,
    currentLocale: currentLocale,
    onClick: onQuickAccessLinkClick
  }), _react["default"].createElement(_LinkLineItem.LinkLineItem, {
    name: "userGuide",
    show: showUserGuide,
    currentLocale: currentLocale,
    onClick: onUserGuideClick
  }));
};

var baseDefaultProps = {
  className: null,
  EulaRenderer: _Eula["default"],
  children: null,
  showClickToDial: false,
  clickToDialEnabled: false,
  clickToDialPermissions: false,
  showCalling: false,
  showAudio: false,
  showAutoLog: false,
  showAutoLogNotes: false,
  showRegion: false,
  showUserGuide: false,
  showReport: false,
  autoLogEnabled: false,
  autoLogNotesEnabled: false,
  logSMSContentEnabled: true,
  disableAutoLogEnabled: false,
  disableAutoLogNotesEnabled: false,
  showAutoLogSMS: false,
  showLogSMSContent: false,
  autoLogSMSEnabled: false,
  showHeader: false,
  outboundSMS: false,
  showSpinner: false,
  openPresenceSettings: false,
  showPresenceSettings: true,
  showFeedback: true,
  showQuickAccess: false,
  clickToDialTitle: null,
  onReportLinkClick: function onReportLinkClick() {
    return null;
  },
  onQuickAccessLinkClick: function onQuickAccessLinkClick() {
    return null;
  },
  onAutoLogChange: function onAutoLogChange() {
    return null;
  },
  onAutoLogNotesChange: function onAutoLogNotesChange() {
    return null;
  },
  onLogSMSContentChange: function onLogSMSContentChange() {
    return null;
  },
  setAvailable: function setAvailable() {
    return null;
  },
  setBusy: function setBusy() {
    return null;
  },
  setDoNotDisturb: function setDoNotDisturb() {
    return null;
  },
  setInvisible: function setInvisible() {
    return null;
  },
  toggleAcceptCallQueueCalls: function toggleAcceptCallQueueCalls() {
    return null;
  }
};
exports.baseDefaultProps = baseDefaultProps;
SettingsPanel.defaultProps = baseDefaultProps;
var _default = SettingsPanel;
exports["default"] = _default;
//# sourceMappingURL=SettingsPanel.js.map
