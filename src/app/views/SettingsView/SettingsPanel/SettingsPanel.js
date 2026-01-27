"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsPanel = void 0;
var _components = require("@ringcentral-integration/micro-core/src/app/components");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _components2 = require("@ringcentral-integration/next-widgets/components");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _rxjs = require("rxjs");
var _Section = require("../../../components/Section");
var _ClickToDial = require("./ClickToDial");
var _PresenceSetting = require("./PresenceSetting");
var _SelectToDial = require("./SelectToDial");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var LoadingIcon = function LoadingIcon() {
  return /*#__PURE__*/_react["default"].createElement(_springUi.CircularProgressIndicator, {
    size: "xsmall"
  });
};
var SettingsPanel = exports.SettingsPanel = function SettingsPanel(_ref) {
  var _customRenderInfo$pop, _customRenderInfo$pop2, _customRenderInfo$pop3;
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
    crmService = _ref.crmService,
    onSelectToDialChange = _ref.onSelectToDialChange,
    selectToDialTitle = _ref.selectToDialTitle,
    _ref$selectToDialEnab = _ref.selectToDialEnabled,
    selectToDialEnabled = _ref$selectToDialEnab === void 0 ? false : _ref$selectToDialEnab,
    _ref$clickToDialEnabl = _ref.clickToDialEnabled,
    clickToDialEnabled = _ref$clickToDialEnabl === void 0 ? false : _ref$clickToDialEnabl,
    _ref$clickToCallPermi = _ref.clickToCallPermission,
    clickToCallPermission = _ref$clickToCallPermi === void 0 ? false : _ref$clickToCallPermi,
    clickToDialTitle = _ref.clickToDialTitle,
    _ref$disableAutoLogEn = _ref.disableAutoLogEnabled,
    disableAutoLogEnabled = _ref$disableAutoLogEn === void 0 ? false : _ref$disableAutoLogEn,
    _ref$disableAutoLogNo = _ref.disableAutoLogNotesEnabled,
    disableAutoLogNotesEnabled = _ref$disableAutoLogNo === void 0 ? false : _ref$disableAutoLogNo,
    _ref$disableAutoLogSM = _ref.disableAutoLogSMSEnabled,
    disableAutoLogSMSEnabled = _ref$disableAutoLogSM === void 0 ? false : _ref$disableAutoLogSM,
    dndStatus = _ref.dndStatus,
    eulaLabel = _ref.eulaLabel,
    eulaLink = _ref.eulaLink,
    onEulaLinkClick = _ref.onEulaLinkClick,
    privacyNoticeLabel = _ref.privacyNoticeLabel,
    privacyNoticeLink = _ref.privacyNoticeLink,
    _ref$isCallQueueMembe = _ref.isCallQueueMember,
    isCallQueueMember = _ref$isCallQueueMembe === void 0 ? false : _ref$isCallQueueMembe,
    _ref$logSMSContentEna = _ref.logSMSContentEnabled,
    logSMSContentEnabled = _ref$logSMSContentEna === void 0 ? true : _ref$logSMSContentEna,
    _ref$logExtCallEnable = _ref.logExtCallEnabled,
    logExtCallEnabled = _ref$logExtCallEnable === void 0 ? false : _ref$logExtCallEnable,
    logSMSContentTitle = _ref.logSMSContentTitle,
    logExtCallTitle = _ref.logExtCallTitle,
    openEntityFrom = _ref.openEntityFrom,
    onAudioSettingsLinkClick = _ref.onAudioSettingsLinkClick,
    _ref$onAutoLogChange = _ref.onAutoLogChange,
    onAutoLogChange = _ref$onAutoLogChange === void 0 ? _rxjs.noop : _ref$onAutoLogChange,
    _ref$onAutoLogNotesCh = _ref.onAutoLogNotesChange,
    onAutoLogNotesChange = _ref$onAutoLogNotesCh === void 0 ? _rxjs.noop : _ref$onAutoLogNotesCh,
    onAutoLogSMSChange = _ref.onAutoLogSMSChange,
    _ref$onLogExtCallChan = _ref.onLogExtCallChange,
    onLogExtCallChange = _ref$onLogExtCallChan === void 0 ? _rxjs.noop : _ref$onLogExtCallChan,
    _ref$onOpenEntityFrom = _ref.onOpenEntityFromChange,
    onOpenEntityFromChange = _ref$onOpenEntityFrom === void 0 ? _rxjs.noop : _ref$onOpenEntityFrom,
    onCallingSettingsLinkClick = _ref.onCallingSettingsLinkClick,
    onClickToDialChange = _ref.onClickToDialChange,
    onFeedbackSettingsLinkClick = _ref.onFeedbackSettingsLinkClick,
    _ref$showThemeSwitch = _ref.showThemeSwitch,
    showThemeSwitch = _ref$showThemeSwitch === void 0 ? false : _ref$showThemeSwitch,
    onTrackingClick = _ref.onTrackingClick,
    onThemeSwitchClick = _ref.onThemeSwitchClick,
    onLogoutButtonClick = _ref.onLogoutButtonClick,
    _ref$onLogSMSContentC = _ref.onLogSMSContentChange,
    onLogSMSContentChange = _ref$onLogSMSContentC === void 0 ? _rxjs.noop : _ref$onLogSMSContentC,
    _ref$onQuickAccessLin = _ref.onQuickAccessLinkClick,
    onQuickAccessLinkClick = _ref$onQuickAccessLin === void 0 ? _rxjs.noop : _ref$onQuickAccessLin,
    onRegionSettingsLinkClick = _ref.onRegionSettingsLinkClick,
    _ref$onReportLinkClic = _ref.onReportLinkClick,
    onReportLinkClick = _ref$onReportLinkClic === void 0 ? _rxjs.noop : _ref$onReportLinkClic,
    onShareIdeaClick = _ref.onShareIdeaClick,
    onUserGuideClick = _ref.onUserGuideClick,
    onReportIssueClick = _ref.onReportIssueClick,
    _ref$openPresenceSett = _ref.openPresenceSettings,
    openPresenceSettings = _ref$openPresenceSett === void 0 ? false : _ref$openPresenceSett,
    _ref$outboundSMS = _ref.outboundSMS,
    outboundSMS = _ref$outboundSMS === void 0 ? false : _ref$outboundSMS,
    _ref$setAvailable = _ref.setAvailable,
    setAvailable = _ref$setAvailable === void 0 ? _rxjs.noop : _ref$setAvailable,
    _ref$setBusy = _ref.setBusy,
    setBusy = _ref$setBusy === void 0 ? _rxjs.noop : _ref$setBusy,
    _ref$setDoNotDisturb = _ref.setDoNotDisturb,
    setDoNotDisturb = _ref$setDoNotDisturb === void 0 ? _rxjs.noop : _ref$setDoNotDisturb,
    _ref$setInvisible = _ref.setInvisible,
    setInvisible = _ref$setInvisible === void 0 ? _rxjs.noop : _ref$setInvisible,
    _ref$showAudio = _ref.showAudio,
    showAudio = _ref$showAudio === void 0 ? false : _ref$showAudio,
    _ref$showAutoLog = _ref.showAutoLog,
    showAutoLog = _ref$showAutoLog === void 0 ? false : _ref$showAutoLog,
    _ref$showLogExtCall = _ref.showLogExtCall,
    showLogExtCall = _ref$showLogExtCall === void 0 ? false : _ref$showLogExtCall,
    _ref$showAutoLogNotes = _ref.showAutoLogNotes,
    showAutoLogNotes = _ref$showAutoLogNotes === void 0 ? false : _ref$showAutoLogNotes,
    _ref$showAutoLogSMS = _ref.showAutoLogSMS,
    showAutoLogSMS = _ref$showAutoLogSMS === void 0 ? false : _ref$showAutoLogSMS,
    _ref$showCalling = _ref.showCalling,
    showCalling = _ref$showCalling === void 0 ? false : _ref$showCalling,
    _ref$showClickToDial = _ref.showClickToDial,
    showClickToDial = _ref$showClickToDial === void 0 ? false : _ref$showClickToDial,
    _ref$showSelectToDial = _ref.showSelectToDial,
    showSelectToDial = _ref$showSelectToDial === void 0 ? false : _ref$showSelectToDial,
    _ref$showFeedback = _ref.showFeedback,
    showFeedback = _ref$showFeedback === void 0 ? true : _ref$showFeedback,
    _ref$showTrackingIssu = _ref.showTrackingIssue,
    showTrackingIssue = _ref$showTrackingIssu === void 0 ? false : _ref$showTrackingIssu,
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
    _ref$showOpenEntityFr = _ref.showOpenEntityFrom,
    showOpenEntityFrom = _ref$showOpenEntityFr === void 0 ? false : _ref$showOpenEntityFr,
    _ref$showShareIdea = _ref.showShareIdea,
    showShareIdea = _ref$showShareIdea === void 0 ? false : _ref$showShareIdea,
    _ref$showUserGuide = _ref.showUserGuide,
    showUserGuide = _ref$showUserGuide === void 0 ? false : _ref$showUserGuide,
    _ref$isEnablePendo = _ref.isEnablePendo,
    isEnablePendo = _ref$isEnablePendo === void 0 ? false : _ref$isEnablePendo,
    _ref$showReportIssue = _ref.showReportIssue,
    showReportIssue = _ref$showReportIssue === void 0 ? false : _ref$showReportIssue,
    _ref$openEntityFromOp = _ref.openEntityFromOptions,
    openEntityFromOptions = _ref$openEntityFromOp === void 0 ? [] : _ref$openEntityFromOp,
    _ref$toggleAcceptCall = _ref.toggleAcceptCallQueueCalls,
    toggleAcceptCallQueueCalls = _ref$toggleAcceptCall === void 0 ? _rxjs.noop : _ref$toggleAcceptCall,
    userStatus = _ref.userStatus,
    version = _ref.version,
    versionContainer = _ref.versionContainer,
    showRemoveMeetingWarning = _ref.showRemoveMeetingWarning,
    showMatchesToggle = _ref.showMatchesToggle,
    showMatches = _ref.showMatches,
    onToggleShowMatches = _ref.onToggleShowMatches,
    showPopUpForInboundCall = _ref.showPopUpForInboundCall,
    popUpAppForInboundCall = _ref.popUpAppForInboundCall,
    onTogglePopUpAppForInboundCall = _ref.onTogglePopUpAppForInboundCall,
    additionalLogItems = _ref.additionalLogItems,
    additionalAnalytics = _ref.additionalAnalytics,
    brandConfig = _ref.brandConfig,
    _ref$enableAcceptQueu = _ref.enableAcceptQueueCallsControl,
    enableAcceptQueueCallsControl = _ref$enableAcceptQueu === void 0 ? true : _ref$enableAcceptQueu,
    customRenderInfo = _ref.customRenderInfo,
    onCallQueueManagementClick = _ref.onCallQueueManagementClick,
    autoLogTextUpdating = _ref.autoLogTextUpdating,
    onRefreshLog = _ref.onRefreshLog,
    isLogRefreshing = _ref.isLogRefreshing;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var showPhoneSection = showAudio || showCalling || showRegion || showReport;
  var showLogSection = showAutoLog || showAutoLogNotes || showAutoLogSMS || showLogSMSContent || showLogExtCall || additionalLogItems;
  var showAnalyticsSection = !!additionalAnalytics;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_components.AppHeaderNav, {
    title: t('settings')
    // clear the setting default icon
  }, /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null)), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('overflow-y-auto overflow-x-hidden px-3 relative', className)
  }, /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, showRemoveMeetingWarning && /*#__PURE__*/_react["default"].createElement(_components2.RemoveMeetingWarn, {
    brandConfig: brandConfig,
    hasRemoved: true
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-3",
    "data-sign": "phone-section"
  }, showPhoneSection && /*#__PURE__*/_react["default"].createElement(_Section.Section, {
    label: t('phone')
  }, showReport && /*#__PURE__*/_react["default"].createElement(_components2.LinkLine, {
    "data-sign": "report",
    onClick: onReportLinkClick
  }, t('report')), showCalling && /*#__PURE__*/_react["default"].createElement(_components2.LinkLine, {
    "data-sign": "calling",
    onClick: onCallingSettingsLinkClick
  }, t('calling')), showAudio && /*#__PURE__*/_react["default"].createElement(_components2.LinkLine, {
    "data-sign": "audio",
    onClick: onAudioSettingsLinkClick
  }, t('audio')), showRegion && /*#__PURE__*/_react["default"].createElement(_components2.LinkLine, {
    "data-sign": "region",
    onClick: onRegionSettingsLinkClick
  }, t('region')), showMatchesToggle && /*#__PURE__*/_react["default"].createElement(_components2.SwitchLine, {
    "data-sign": "showMatchedEntities",
    checked: showMatches,
    onChange: onToggleShowMatches
  }, t('showMatches')), showPopUpForInboundCall && /*#__PURE__*/_react["default"].createElement(_components2.SwitchLine, {
    "data-sign": "popUpAppForInboundCall",
    checked: popUpAppForInboundCall,
    onChange: onTogglePopUpAppForInboundCall
  }, (customRenderInfo === null || customRenderInfo === void 0 ? void 0 : (_customRenderInfo$pop = customRenderInfo.popUpForInboundCall) === null || _customRenderInfo$pop === void 0 ? void 0 : _customRenderInfo$pop.subject) || t('popUpAppForInboundCall'), (customRenderInfo === null || customRenderInfo === void 0 ? void 0 : (_customRenderInfo$pop2 = customRenderInfo.popUpForInboundCall) === null || _customRenderInfo$pop2 === void 0 ? void 0 : _customRenderInfo$pop2.tooltip) && /*#__PURE__*/_react["default"].createElement(_springUi.Tooltip, {
    color: "neutral",
    placement: "bottom",
    title: customRenderInfo === null || customRenderInfo === void 0 ? void 0 : (_customRenderInfo$pop3 = customRenderInfo.popUpForInboundCall) === null || _customRenderInfo$pop3 === void 0 ? void 0 : _customRenderInfo$pop3.tooltip
  }, /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
    size: "medium",
    symbol: _springIcon.InfoMd,
    color: "neutral",
    variant: "icon",
    "data-sign": "popUpAppForInboundCall-info-icon"
  })))), showLogSection && /*#__PURE__*/_react["default"].createElement(_Section.Section, {
    label: t('log'),
    headerEndAdornment: onRefreshLog && /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
      size: "xsmall",
      iconSize: "xsmall",
      disabled: isLogRefreshing,
      symbol: isLogRefreshing ? LoadingIcon : _springIcon.RefreshMd,
      color: "neutral",
      variant: "icon",
      "data-sign": "refresh-log",
      TooltipProps: isLogRefreshing ? undefined : {
        title: t('syncSettings')
      },
      onClick: onRefreshLog
    })
  }, additionalLogItems, showAutoLog && /*#__PURE__*/_react["default"].createElement(_components2.SwitchLine, {
    "data-sign": "AutoLogCall",
    disabled: disableAutoLogEnabled,
    checked: autoLogEnabled,
    onChange: onAutoLogChange
  }, autoLogTitle || t('autoLogCalls')), showAutoLogNotes && /*#__PURE__*/_react["default"].createElement(_components2.SwitchLine, {
    "data-sign": "AutoLogNotes",
    disabled: disableAutoLogNotesEnabled,
    checked: autoLogNotesEnabled,
    onChange: onAutoLogNotesChange
  }, t('autoLogNotes')), showAutoLogSMS && /*#__PURE__*/_react["default"].createElement(_components2.SwitchLine, {
    "data-sign": "AutoLogSMS",
    disabled: disableAutoLogSMSEnabled,
    checked: autoLogSMSEnabled,
    onChange: onAutoLogSMSChange,
    loading: autoLogTextUpdating
  }, autoLogSMSTitle || t('autoLogSMS')), showLogSMSContent && /*#__PURE__*/_react["default"].createElement(_components2.SwitchLine, {
    "data-sign": "LogSMSContent",
    checked: logSMSContentEnabled,
    onChange: onLogSMSContentChange
  }, logSMSContentTitle || t('logSMSContent')), showLogExtCall && /*#__PURE__*/_react["default"].createElement(_components2.SwitchLine, {
    "data-sign": "logExtensionCall",
    checked: logExtCallEnabled,
    onChange: onLogExtCallChange
  }, logExtCallTitle || t('logExtensionCall'))), showAnalyticsSection && /*#__PURE__*/_react["default"].createElement(_Section.Section, {
    label: t('analytics'),
    tag: crmService
  }, additionalAnalytics), /*#__PURE__*/_react["default"].createElement(_Section.Section, {
    label: t('general')
  }, showPresenceSettings && dndStatus && userStatus && /*#__PURE__*/_react["default"].createElement(_PresenceSetting.PresenceSetting, {
    dndStatus: dndStatus
    // TODO: spring-ui, after all project migrate to spring-ui, rename this prop to presenceStatus
    ,
    presenceStatus: userStatus,
    isCallQueueMember: isCallQueueMember,
    setAvailable: setAvailable,
    setBusy: setBusy,
    setDoNotDisturb: setDoNotDisturb,
    setInvisible: setInvisible,
    toggleAcceptCallQueueCalls: toggleAcceptCallQueueCalls,
    showPresenceSettings: openPresenceSettings,
    enableAcceptQueueCallsControl: enableAcceptQueueCallsControl,
    onCallQueueManagementClick: onCallQueueManagementClick
  }), children, showOpenEntityFrom && /*#__PURE__*/_react["default"].createElement(_components2.SelectLine, {
    value: openEntityFrom,
    options: openEntityFromOptions,
    "data-sign": "openEntityFrom",
    onChange: onOpenEntityFromChange
  }, t('openEntityFrom')), /*#__PURE__*/_react["default"].createElement(_ClickToDial.ClickToDial, {
    showClickToDial: showClickToDial,
    outboundSMS: outboundSMS,
    clickToCallPermission: clickToCallPermission,
    clickToDialEnabled: clickToDialEnabled,
    onClickToDialChange: onClickToDialChange,
    clickToDialTitle: clickToDialTitle
  }), /*#__PURE__*/_react["default"].createElement(_SelectToDial.SelectToDial, {
    showSelectToDial: showSelectToDial,
    smsPermission: outboundSMS,
    callPermission: clickToCallPermission,
    selectToDialEnabled: selectToDialEnabled,
    onSelectToDialChange: onSelectToDialChange,
    selectToDialTitle: selectToDialTitle
  }), additional, showThemeSwitch && /*#__PURE__*/_react["default"].createElement(_components2.LinkLine, {
    "data-sign": "theme",
    onClick: onThemeSwitchClick
  }, t('theme')), showTrackingIssue && /*#__PURE__*/_react["default"].createElement(_components2.LinkLine, {
    "data-sign": "ContactSupport",
    onClick: onTrackingClick
  }, t('contactSupport')), showFeedback && /*#__PURE__*/_react["default"].createElement(_components2.LinkLine, {
    "data-sign": "Feedback",
    "data-pendo": isEnablePendo ? 'Feedback' : '',
    onClick: onFeedbackSettingsLinkClick
  }, t('feedback')), showShareIdea && /*#__PURE__*/_react["default"].createElement(_components2.LinkLine, {
    "data-sign": "shareIdea",
    onClick: onShareIdeaClick
  }, t('shareIdea')), showQuickAccess && /*#__PURE__*/_react["default"].createElement(_components2.LinkLine, {
    "data-sign": "quickAccess",
    onClick: onQuickAccessLinkClick
  }, t('quickAccess')), showUserGuide && /*#__PURE__*/_react["default"].createElement(_components2.LinkLine, {
    "data-sign": "userGuide",
    onClick: onUserGuideClick
  }, t('userGuide')), showReportIssue && /*#__PURE__*/_react["default"].createElement(_components2.LinkLine, {
    "data-sign": "reportIssue",
    onClick: onReportIssueClick
  }, t('reportIssue')), versionContainer || /*#__PURE__*/_react["default"].createElement(_components2.Line, {
    "data-sign": "version",
    className: "flex justify-between",
    icon: /*#__PURE__*/_react["default"].createElement("span", {
      className: "typography-mainText"
    }, version)
  }, t('version'))), /*#__PURE__*/_react["default"].createElement(_Section.Section, null, /*#__PURE__*/_react["default"].createElement(_components2.Line, null, /*#__PURE__*/_react["default"].createElement(_components2.Eula, {
    "data-sign": "eula",
    link: eulaLink,
    label: eulaLabel,
    onClick: onEulaLinkClick
  })), privacyNoticeLink && privacyNoticeLabel && /*#__PURE__*/_react["default"].createElement(_components2.Line, null, /*#__PURE__*/_react["default"].createElement(_components2.Eula, {
    "data-sign": "privacyNotice",
    link: privacyNoticeLink,
    label: privacyNoticeLabel
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-3 flex justify-center"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
    "data-sign": "logoutButton",
    color: "primary",
    variant: "text",
    fullWidth: true,
    size: "medium",
    onClick: onLogoutButtonClick
  }, t('logout'))))));
};
//# sourceMappingURL=SettingsPanel.js.map
