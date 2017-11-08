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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      accountInfo = _ref$phone.accountInfo,
      auth = _ref$phone.auth,
      brand = _ref$phone.brand,
      extensionInfo = _ref$phone.extensionInfo,
      locale = _ref$phone.locale,
      regionSettings = _ref$phone.regionSettings,
      callingSettings = _ref$phone.callingSettings,
      version = _ref$phone.version,
      rolesAndPermissions = _ref$phone.rolesAndPermissions,
      detailedPresence = _ref$phone.detailedPresence,
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
    showSpinner: !(accountInfo.ready && auth.ready && loggedIn && extensionInfo.ready && locale.ready && regionSettings.ready && callingSettings.ready && rolesAndPermissions.ready && (!detailedPresence || detailedPresence.ready)),
    showRegion: loggedIn && brand.id === '1210' && (regionSettings.availableCountries.length > 1 || !!regionSettings.availableCountries.find(function (c) {
      return c.isoCode === 'US';
    }) || !!regionSettings.availableCountries.find(function (c) {
      return c.isoCode === 'CA';
    })),
    loginNumber: loginNumber,
    version: version,
    currentLocale: locale.currentLocale,
    brandId: brand.id,
    ringoutEnabled: rolesAndPermissions.ringoutEnabled,
    outboundSMS: !!rolesAndPermissions.permissions.OutboundSMS || !!rolesAndPermissions.permissions.InternalSMS,
    isCallQueueMember: extensionInfo.isCallQueueMember,
    dndStatus: detailedPresence && detailedPresence.dndStatus,
    userStatus: detailedPresence && detailedPresence.userStatus,
    showPresenceSettings: !!(detailedPresence && params && params.showPresenceSettings)
  };
}

function mapToFunctions(_, _ref2) {
  var _this = this;

  var _ref2$phone = _ref2.phone,
      auth = _ref2$phone.auth,
      detailedPresence = _ref2$phone.detailedPresence,
      router = _ref2$phone.router,
      _ref2$regionSettingsU = _ref2.regionSettingsUrl,
      regionSettingsUrl = _ref2$regionSettingsU === undefined ? '/settings/region' : _ref2$regionSettingsU,
      _ref2$callingSettings = _ref2.callingSettingsUrl,
      callingSettingsUrl = _ref2$callingSettings === undefined ? '/settings/calling' : _ref2$callingSettings,
      _ref2$audioSettingsUr = _ref2.audioSettingsUrl,
      audioSettingsUrl = _ref2$audioSettingsUr === undefined ? '/settings/audio' : _ref2$audioSettingsUr;

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
      router.push(regionSettingsUrl);
    },
    onCallingSettingsLinkClick: function onCallingSettingsLinkClick() {
      router.push(callingSettingsUrl);
    },
    onAudioSettingsLinkClick: function onAudioSettingsLinkClick() {
      router.push(audioSettingsUrl);
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
    }
  };
}
var SettingsPage = (0, _reactRedux.connect)(mapToProps, mapToFunctions)(_SettingsPanel2.default);

exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.default = SettingsPage;
//# sourceMappingURL=index.js.map
