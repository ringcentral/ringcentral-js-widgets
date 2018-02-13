'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mapToProps = exports.mapToFunctions = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _reactRedux = require('react-redux');

var _loginStatus = require('ringcentral-integration/modules/Auth/loginStatus');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

var _formatNumber = require('ringcentral-integration/lib/formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _SettingsPanel = require('../../components/SettingsPanel');

var _SettingsPanel2 = _interopRequireDefault(_SettingsPanel);

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      detailedPresence = _ref$phone.detailedPresence,
      _ref$showRegion = _ref.showRegion,
      showRegion = _ref$showRegion === undefined ? true : _ref$showRegion,
      _ref$showCalling = _ref.showCalling,
      showCalling = _ref$showCalling === undefined ? true : _ref$showCalling,
      _ref$showAudio = _ref.showAudio,
      showAudio = _ref$showAudio === undefined ? true : _ref$showAudio,
      _ref$showFeedback = _ref.showFeedback,
      showFeedback = _ref$showFeedback === undefined ? true : _ref$showFeedback,
      _ref$showUserGuide = _ref.showUserGuide,
      showUserGuide = _ref$showUserGuide === undefined ? true : _ref$showUserGuide,
      params = _ref.params;

  var loginNumber = '';
  var loggedIn = auth.loginStatus === _loginStatus2.default.loggedIn;
  if (loggedIn && accountInfo.ready && extensionInfo.ready) {
    // If no extensionNumber, extensionNumber field needs to be omitted
    var extensionNumber = extensionInfo.extensionNumber && extensionInfo.extensionNumber !== '0' ? extensionInfo.extensionNumber : null;
    var phoneNumber = [accountInfo.mainCompanyNumber, extensionNumber].join('*');
    loginNumber = (0, _formatNumber2.default)({
      phoneNumber: phoneNumber,
      countryCode: regionSettings.countryCode,
      areaCode: regionSettings.areaCode
    });
  }
  return {
    showSpinner: !(accountInfo.ready && auth.ready && loggedIn && extensionInfo.ready && locale.ready && regionSettings.ready && (!callingSettings || callingSettings.ready) && rolesAndPermissions.ready && (!detailedPresence || detailedPresence.ready) && (!localeSettings || localeSettings.ready)),
    showFeedback: showFeedback,
    showCalling: showCalling && callingSettings && rolesAndPermissions.callingEnabled,
    showAudio: showAudio && rolesAndPermissions.callingEnabled,
    showRegion: loggedIn && brand.id === '1210' && (regionSettings.availableCountries.length > 1 || !!regionSettings.availableCountries.find(function (c) {
      return c.isoCode === 'US';
    }) || !!regionSettings.availableCountries.find(function (c) {
      return c.isoCode === 'CA';
    })) && rolesAndPermissions.callingEnabled && showRegion,
    loginNumber: loginNumber,
    version: version,
    currentLocale: locale.currentLocale,
    brandId: brand.id,
    ringoutEnabled: rolesAndPermissions.ringoutEnabled,
    outboundSMS: !!rolesAndPermissions.permissions.OutboundSMS || !!rolesAndPermissions.permissions.InternalSMS,
    isCallQueueMember: extensionInfo.isCallQueueMember,
    dndStatus: detailedPresence && detailedPresence.dndStatus,
    userStatus: detailedPresence && detailedPresence.userStatus,
    showPresenceSettings: !!(detailedPresence && params && params.showPresenceSettings),
    supportedLocales: localeSettings && localeSettings.supportedLocales,
    savedLocale: localeSettings && localeSettings.savedLocale,
    showUserGuide: showUserGuide && rolesAndPermissions.hasUserGuidePermission
  };
}

function mapToFunctions(_, _ref2) {
  var _this = this;

  var _ref2$phone = _ref2.phone,
      auth = _ref2$phone.auth,
      detailedPresence = _ref2$phone.detailedPresence,
      routerInteraction = _ref2$phone.routerInteraction,
      localeSettings = _ref2$phone.localeSettings,
      userGuide = _ref2$phone.userGuide,
      _ref2$regionSettingsU = _ref2.regionSettingsUrl,
      regionSettingsUrl = _ref2$regionSettingsU === undefined ? '/settings/region' : _ref2$regionSettingsU,
      _ref2$callingSettings = _ref2.callingSettingsUrl,
      callingSettingsUrl = _ref2$callingSettings === undefined ? '/settings/calling' : _ref2$callingSettings,
      _ref2$audioSettingsUr = _ref2.audioSettingsUrl,
      audioSettingsUrl = _ref2$audioSettingsUr === undefined ? '/settings/audio' : _ref2$audioSettingsUr,
      _ref2$feedbackSetting = _ref2.feedbackSettingsUrl,
      feedbackSettingsUrl = _ref2$feedbackSetting === undefined ? '/settings/feedback' : _ref2$feedbackSetting;

  return {
    onLogoutButtonClick: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return auth.logout();

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function onLogoutButtonClick() {
        return _ref3.apply(this, arguments);
      };
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
    setAvailable: function setAvailable() {
      return detailedPresence && detailedPresence.setAvailable.apply(detailedPresence, arguments);
    },
    setBusy: function setBusy() {
      return detailedPresence && detailedPresence.setBusy.apply(detailedPresence, arguments);
    },
    setDoNotDisturb: function setDoNotDisturb() {
      return detailedPresence && detailedPresence.setDoNotDisturb.apply(detailedPresence, arguments);
    },
    setInvisible: function setInvisible() {
      return detailedPresence && detailedPresence.setInvisible.apply(detailedPresence, arguments);
    },
    toggleAcceptCallQueueCalls: function toggleAcceptCallQueueCalls() {
      return detailedPresence && detailedPresence.toggleAcceptCallQueueCalls.apply(detailedPresence, arguments);
    },
    saveLocale: localeSettings && function (locale) {
      return localeSettings.saveLocale(locale);
    }
  };
}
var SettingsPage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_SettingsPanel2.default));

exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.default = SettingsPage;
//# sourceMappingURL=index.js.map
