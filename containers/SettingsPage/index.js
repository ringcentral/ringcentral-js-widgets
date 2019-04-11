"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.default = void 0;

require("core-js/modules/es6.promise");

require("regenerator-runtime/runtime");

var _reactRedux = require("react-redux");

var _loginStatus = _interopRequireDefault(require("ringcentral-integration/modules/Auth/loginStatus"));

var _formatNumber = _interopRequireDefault(require("ringcentral-integration/lib/formatNumber"));

var _SettingsPanel = _interopRequireDefault(require("../../components/SettingsPanel"));

var _phoneContext = require("../../lib/phoneContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      accountInfo = _ref$phone.accountInfo,
      auth = _ref$phone.auth,
      brand = _ref$phone.brand,
      extensionInfo = _ref$phone.extensionInfo,
      locale = _ref$phone.locale,
      localeSettings = _ref$phone.localeSettings,
      regionSettings = _ref$phone.regionSettings,
      callingSettings = _ref$phone.callingSettings,
      version = _ref$phone.version,
      rolesAndPermissions = _ref$phone.rolesAndPermissions,
      presence = _ref$phone.presence,
      _ref$showRegion = _ref.showRegion,
      showRegion = _ref$showRegion === void 0 ? true : _ref$showRegion,
      _ref$showCalling = _ref.showCalling,
      showCalling = _ref$showCalling === void 0 ? true : _ref$showCalling,
      _ref$showAudio = _ref.showAudio,
      showAudio = _ref$showAudio === void 0 ? true : _ref$showAudio,
      _ref$showFeedback = _ref.showFeedback,
      showFeedback = _ref$showFeedback === void 0 ? true : _ref$showFeedback,
      _ref$showUserGuide = _ref.showUserGuide,
      showUserGuide = _ref$showUserGuide === void 0 ? true : _ref$showUserGuide,
      _ref$showPresenceSett = _ref.showPresenceSettings,
      showPresenceSettings = _ref$showPresenceSett === void 0 ? true : _ref$showPresenceSett,
      _ref$showQuickAccess = _ref.showQuickAccess,
      showQuickAccess = _ref$showQuickAccess === void 0 ? false : _ref$showQuickAccess,
      params = _ref.params;
  var loginNumber = '';
  var loggedIn = auth.loginStatus === _loginStatus.default.loggedIn;

  if (loggedIn && accountInfo.ready && extensionInfo.ready) {
    // If no extensionNumber, extensionNumber field needs to be omitted
    var extensionNumber = extensionInfo.extensionNumber && extensionInfo.extensionNumber !== '0' ? extensionInfo.extensionNumber : null;
    var phoneNumber = [accountInfo.mainCompanyNumber, extensionNumber].join('*');
    loginNumber = (0, _formatNumber.default)({
      phoneNumber: phoneNumber,
      countryCode: regionSettings.countryCode,
      areaCode: regionSettings.areaCode
    });
  }

  return {
    showSpinner: !(accountInfo.ready && auth.ready && loggedIn && extensionInfo.ready && locale.ready && regionSettings.ready && (!callingSettings || callingSettings.ready) && rolesAndPermissions.ready && (!presence || presence.ready) && (!localeSettings || localeSettings.ready)),
    showFeedback: showFeedback,
    showQuickAccess: showQuickAccess,
    showCalling: showCalling && callingSettings && rolesAndPermissions.callingEnabled,
    showAudio: showAudio && rolesAndPermissions.callingEnabled,
    showRegion: loggedIn && brand.id === '1210' && regionSettings.showReginSetting && rolesAndPermissions.callingEnabled && showRegion,
    loginNumber: loginNumber,
    version: version,
    currentLocale: locale.currentLocale,
    brandId: brand.id,
    ringoutEnabled: rolesAndPermissions.ringoutEnabled,
    outboundSMS: !!rolesAndPermissions.permissions.OutboundSMS || !!rolesAndPermissions.permissions.InternalSMS,
    isCallQueueMember: extensionInfo.isCallQueueMember,
    dndStatus: presence && presence.dndStatus,
    userStatus: presence && presence.userStatus,
    openPresenceSettings: !!(presence && params && params.showPresenceSettings),
    showPresenceSettings: showPresenceSettings && rolesAndPermissions.hasEditPresencePermission,
    supportedLocales: localeSettings && localeSettings.supportedLocales,
    savedLocale: localeSettings && localeSettings.savedLocale,
    showUserGuide: showUserGuide && rolesAndPermissions.hasUserGuidePermission
  };
}

function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      auth = _ref2$phone.auth,
      presence = _ref2$phone.presence,
      routerInteraction = _ref2$phone.routerInteraction,
      localeSettings = _ref2$phone.localeSettings,
      userGuide = _ref2$phone.userGuide,
      quickAccess = _ref2$phone.quickAccess,
      _ref2$regionSettingsU = _ref2.regionSettingsUrl,
      regionSettingsUrl = _ref2$regionSettingsU === void 0 ? '/settings/region' : _ref2$regionSettingsU,
      _ref2$callingSettings = _ref2.callingSettingsUrl,
      callingSettingsUrl = _ref2$callingSettings === void 0 ? '/settings/calling' : _ref2$callingSettings,
      _ref2$audioSettingsUr = _ref2.audioSettingsUrl,
      audioSettingsUrl = _ref2$audioSettingsUr === void 0 ? '/settings/audio' : _ref2$audioSettingsUr,
      _ref2$feedbackSetting = _ref2.feedbackSettingsUrl,
      feedbackSettingsUrl = _ref2$feedbackSetting === void 0 ? '/settings/feedback' : _ref2$feedbackSetting;
  return {
    onLogoutButtonClick: function () {
      var _onLogoutButtonClick = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return auth.logout();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function onLogoutButtonClick() {
        return _onLogoutButtonClick.apply(this, arguments);
      }

      return onLogoutButtonClick;
    }(),
    onRegionSettingsLinkClick: function onRegionSettingsLinkClick() {
      routerInteraction.push(regionSettingsUrl);
    },
    onCallingSettingsLinkClick: function onCallingSettingsLinkClick() {
      routerInteraction.push(callingSettingsUrl);
    },
    onAudioSettingsLinkClick: function onAudioSettingsLinkClick() {
      routerInteraction.push(audioSettingsUrl);
    },
    onFeedbackSettingsLinkClick: function onFeedbackSettingsLinkClick() {
      routerInteraction.push(feedbackSettingsUrl);
    },
    onUserGuideClick: function onUserGuideClick() {
      userGuide.start();
    },
    onQuickAccessLinkClick: function onQuickAccessLinkClick() {
      quickAccess.enter();
    },
    setAvailable: function setAvailable() {
      return presence && presence.setAvailable.apply(presence, arguments);
    },
    setBusy: function setBusy() {
      return presence && presence.setBusy.apply(presence, arguments);
    },
    setDoNotDisturb: function setDoNotDisturb() {
      return presence && presence.setDoNotDisturb.apply(presence, arguments);
    },
    setInvisible: function setInvisible() {
      return presence && presence.setInvisible.apply(presence, arguments);
    },
    toggleAcceptCallQueueCalls: function toggleAcceptCallQueueCalls() {
      return presence && presence.toggleAcceptCallQueueCalls.apply(presence, arguments);
    },
    saveLocale: localeSettings && function (locale) {
      return localeSettings.saveLocale(locale);
    }
  };
}

var SettingsPage = (0, _phoneContext.withPhone)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_SettingsPanel.default));
exports.default = SettingsPage;
//# sourceMappingURL=index.js.map
