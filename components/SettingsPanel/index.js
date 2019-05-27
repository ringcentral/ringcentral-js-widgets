"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SettingsPanel;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _Header = _interopRequireDefault(require("../Header"));

var _Panel = _interopRequireDefault(require("../Panel"));

var _Line = _interopRequireDefault(require("../Line"));

var _LinkLine = _interopRequireDefault(require("../LinkLine"));

var _IconLine = _interopRequireDefault(require("../IconLine"));

var _Eula = _interopRequireDefault(require("../Eula"));

var _SpinnerOverlay = _interopRequireDefault(require("../SpinnerOverlay"));

var _PresenceSettingSection = _interopRequireDefault(require("../PresenceSettingSection"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _Switch = _interopRequireDefault(require("../Switch"));

var _InputLine = _interopRequireDefault(require("../InputLine"));

var _LocalePicker = _interopRequireDefault(require("../LocalePicker"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function SettingsPanel(_ref) {
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
      disableAutoLogEnabled = _ref.disableAutoLogEnabled,
      disableAutoLogNotesEnabled = _ref.disableAutoLogNotesEnabled,
      onAutoLogChange = _ref.onAutoLogChange,
      onAutoLogNotesChange = _ref.onAutoLogNotesChange,
      showAutoLogSMS = _ref.showAutoLogSMS,
      autoLogSMSEnabled = _ref.autoLogSMSEnabled,
      onAutoLogSMSChange = _ref.onAutoLogSMSChange,
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
      versionContainer = _ref.versionContainer;

  if (showSpinner) {
    return _react["default"].createElement(_SpinnerOverlay["default"], null);
  }

  var locale = supportedLocales && supportedLocales.length > 1 && _react["default"].createElement(_InputLine["default"], {
    label: _i18n["default"].getString('language', currentLocale)
  }, _react["default"].createElement(_LocalePicker["default"], {
    value: savedLocale,
    onChange: saveLocale,
    options: supportedLocales
  }));

  var region = showRegion ? _react["default"].createElement(_LinkLine["default"], {
    onClick: onRegionSettingsLinkClick
  }, _i18n["default"].getString('region', currentLocale)) : null;
  var report = showReport ? _react["default"].createElement(_LinkLine["default"], {
    onClick: onReportLinkClick
  }, _i18n["default"].getString('report', currentLocale)) : null;
  var calling = showCalling ? _react["default"].createElement(_LinkLine["default"], {
    onClick: onCallingSettingsLinkClick
  }, _i18n["default"].getString('calling', currentLocale)) : null;
  var audio = showAudio ? _react["default"].createElement(_LinkLine["default"], {
    onClick: onAudioSettingsLinkClick
  }, _i18n["default"].getString('audio', currentLocale)) : null;
  var feedback = showFeedback ? _react["default"].createElement(_LinkLine["default"], {
    onClick: onFeedbackSettingsLinkClick
  }, _i18n["default"].getString('feedback', currentLocale)) : null;
  var quickAccess = showQuickAccess ? _react["default"].createElement(_LinkLine["default"], {
    onClick: onQuickAccessLinkClick
  }, _i18n["default"].getString('quickAccess', currentLocale)) : null;
  var presenceSetting = showPresenceSettings && dndStatus && userStatus ? _react["default"].createElement(_PresenceSettingSection["default"], {
    currentLocale: currentLocale,
    dndStatus: dndStatus,
    userStatus: userStatus,
    isCallQueueMember: isCallQueueMember,
    setAvailable: setAvailable,
    setBusy: setBusy,
    setDoNotDisturb: setDoNotDisturb,
    setInvisible: setInvisible,
    toggleAcceptCallQueueCalls: toggleAcceptCallQueueCalls,
    showPresenceSettings: openPresenceSettings
  }) : null;
  var clickToDialText;

  if (outboundSMS && clickToDialPermissions) {
    clickToDialText = _i18n["default"].getString('clickToDialSMS', currentLocale);
  } else if (!outboundSMS && clickToDialPermissions) {
    clickToDialText = _i18n["default"].getString('clickToDial', currentLocale);
  } else if (outboundSMS && !clickToDialPermissions) {
    clickToDialText = _i18n["default"].getString('clickToSMS', currentLocale);
  } else {
    clickToDialText = '';
  }

  var clickToDial = showClickToDial && (outboundSMS || clickToDialPermissions) ? _react["default"].createElement(_IconLine["default"], {
    icon: _react["default"].createElement(_Switch["default"], {
      checked: clickToDialEnabled,
      onChange: onClickToDialChange
    }),
    title: clickToDialTitle
  }, clickToDialText) : null; // if the Switch component is disabled then the text to describe it will be a disabled color.

  var autoLog = showAutoLog ? _react["default"].createElement(_IconLine["default"], {
    icon: _react["default"].createElement(_Switch["default"], {
      disable: disableAutoLogEnabled,
      checked: autoLogEnabled,
      onChange: onAutoLogChange
    })
  }, _react["default"].createElement("span", {
    className: (0, _classnames["default"])(disableAutoLogEnabled && _styles["default"].disableText)
  }, _i18n["default"].getString('autoLogCalls', currentLocale))) : null;
  var autoLogNotes = showAutoLogNotes ? _react["default"].createElement(_IconLine["default"], {
    icon: _react["default"].createElement(_Switch["default"], {
      disable: disableAutoLogNotesEnabled,
      checked: autoLogNotesEnabled,
      onChange: onAutoLogNotesChange
    })
  }, _react["default"].createElement("span", {
    className: (0, _classnames["default"])(disableAutoLogNotesEnabled && _styles["default"].disableText)
  }, _i18n["default"].getString('autoLogNotes', currentLocale))) : null;
  var autoLogSMS = showAutoLogSMS ? _react["default"].createElement(_IconLine["default"], {
    icon: _react["default"].createElement(_Switch["default"], {
      checked: autoLogSMSEnabled,
      onChange: onAutoLogSMSChange
    })
  }, _i18n["default"].getString('autoLogSMS', currentLocale)) : null;
  var header = showHeader ? _react["default"].createElement(_Header["default"], null, _i18n["default"].getString('settings', currentLocale)) : null;
  var userGuide = showUserGuide ? _react["default"].createElement(_LinkLine["default"], {
    onClick: onUserGuideClick
  }, _i18n["default"].getString('userGuide', currentLocale)) : null;

  var versionArea = versionContainer || _react["default"].createElement("div", {
    className: _styles["default"].versionContainer,
    "data-sign": "version"
  }, _i18n["default"].getString('version', currentLocale), ' ', version);

  return _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].root, className)
  }, header, _react["default"].createElement(_Panel["default"], {
    className: (0, _classnames["default"])(_styles["default"].content, showHeader && _styles["default"].contentWithHeader)
  }, report, locale, calling, region, audio, presenceSetting, children, autoLog, autoLogNotes, autoLogSMS, clickToDial, additional, feedback, quickAccess, userGuide, _react["default"].createElement("section", {
    className: _styles["default"].section
  }, _react["default"].createElement(_Line["default"], {
    noBorder: true
  }, _react["default"].createElement(EulaRenderer, {
    dataSign: "eula",
    className: _styles["default"].eula,
    currentLocale: currentLocale,
    brandId: brandId
  }))), _react["default"].createElement("section", {
    className: _styles["default"].section
  }, _react["default"].createElement(_IconLine["default"], {
    noBorder: true,
    dataSign: "logoutButton",
    onClick: onLogoutButtonClick,
    icon: _react["default"].createElement("span", {
      className: (0, _classnames["default"])(_styles["default"].logoutIcon, _DynamicsFont["default"].logout)
    })
  }, _i18n["default"].getString('logout', currentLocale), _react["default"].createElement("span", {
    className: _styles["default"].loginNumber
  }, " ".concat(loginNumber)))), versionArea));
}

SettingsPanel.propTypes = {
  brandId: _propTypes["default"].string.isRequired,
  onCallingSettingsLinkClick: _propTypes["default"].func.isRequired,
  onAudioSettingsLinkClick: _propTypes["default"].func.isRequired,
  children: _propTypes["default"].node,
  className: _propTypes["default"].string,
  currentLocale: _propTypes["default"].string.isRequired,
  EulaRenderer: _propTypes["default"].func,
  loginNumber: _propTypes["default"].string.isRequired,
  onLogoutButtonClick: _propTypes["default"].func.isRequired,
  onRegionSettingsLinkClick: _propTypes["default"].func.isRequired,
  showCalling: _propTypes["default"].bool,
  showRegion: _propTypes["default"].bool,
  showAudio: _propTypes["default"].bool,
  showAutoLog: _propTypes["default"].bool,
  showAutoLogNotes: _propTypes["default"].bool,
  showReport: _propTypes["default"].bool,
  autoLogEnabled: _propTypes["default"].bool,
  autoLogNotesEnabled: _propTypes["default"].bool,
  disableAutoLogEnabled: _propTypes["default"].bool,
  disableAutoLogNotesEnabled: _propTypes["default"].bool,
  onAutoLogChange: _propTypes["default"].func,
  onAutoLogNotesChange: _propTypes["default"].func,
  showAutoLogSMS: _propTypes["default"].bool,
  autoLogSMSEnabled: _propTypes["default"].bool,
  onAutoLogSMSChange: _propTypes["default"].func,
  showClickToDial: _propTypes["default"].bool,
  clickToDialEnabled: _propTypes["default"].bool,
  clickToDialPermissions: _propTypes["default"].bool,
  onClickToDialChange: _propTypes["default"].func,
  version: _propTypes["default"].string.isRequired,
  showHeader: _propTypes["default"].bool,
  outboundSMS: _propTypes["default"].bool,
  showSpinner: _propTypes["default"].bool,
  dndStatus: _propTypes["default"].string,
  userStatus: _propTypes["default"].string,
  isCallQueueMember: _propTypes["default"].bool,
  setAvailable: _propTypes["default"].func,
  setBusy: _propTypes["default"].func,
  setDoNotDisturb: _propTypes["default"].func,
  setInvisible: _propTypes["default"].func,
  toggleAcceptCallQueueCalls: _propTypes["default"].func,
  openPresenceSettings: _propTypes["default"].bool,
  showPresenceSettings: _propTypes["default"].bool,
  showFeedback: _propTypes["default"].bool,
  showQuickAccess: _propTypes["default"].bool,
  additional: _propTypes["default"].node,
  supportedLocales: _propTypes["default"].arrayOf(_propTypes["default"].string),
  savedLocale: _propTypes["default"].string,
  saveLocale: _propTypes["default"].func,
  onFeedbackSettingsLinkClick: _propTypes["default"].func.isRequired,
  onQuickAccessLinkClick: _propTypes["default"].func,
  onUserGuideClick: _propTypes["default"].func.isRequired,
  showUserGuide: _propTypes["default"].bool,
  clickToDialTitle: _propTypes["default"].string,
  versionContainer: _propTypes["default"].node,
  onReportLinkClick: _propTypes["default"].func
};
SettingsPanel.defaultProps = {
  className: null,
  EulaRenderer: _Eula["default"],
  children: null,
  showClickToDial: false,
  clickToDialEnabled: false,
  clickToDialPermissions: false,
  onClickToDialChange: undefined,
  showCalling: false,
  showAudio: false,
  showAutoLog: false,
  showAutoLogNotes: false,
  showRegion: false,
  showUserGuide: false,
  showReport: false,
  autoLogEnabled: false,
  autoLogNotesEnabled: false,
  disableAutoLogEnabled: false,
  disableAutoLogNotesEnabled: false,
  onAutoLogChange: function onAutoLogChange() {
    return null;
  },
  onAutoLogNotesChange: function onAutoLogNotesChange() {
    return null;
  },
  showAutoLogSMS: false,
  autoLogSMSEnabled: false,
  onAutoLogSMSChange: undefined,
  showHeader: false,
  outboundSMS: false,
  showSpinner: false,
  dndStatus: undefined,
  userStatus: undefined,
  isCallQueueMember: false,
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
  },
  openPresenceSettings: false,
  showPresenceSettings: true,
  additional: null,
  supportedLocales: undefined,
  savedLocale: undefined,
  saveLocale: undefined,
  showFeedback: true,
  showQuickAccess: false,
  onQuickAccessLinkClick: function onQuickAccessLinkClick() {
    return null;
  },
  clickToDialTitle: null,
  versionContainer: null,
  onReportLinkClick: function onReportLinkClick() {
    return null;
  }
};
//# sourceMappingURL=index.js.map
