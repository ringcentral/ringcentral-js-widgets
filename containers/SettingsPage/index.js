'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.propTypes = exports.mapToProps = exports.mapToFunctions = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _loginStatus = require('ringcentral-integration/modules/Auth/loginStatus');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

var _formatNumber = require('ringcentral-integration/lib/formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _AccountInfo = require('ringcentral-integration/modules/AccountInfo');

var _AccountInfo2 = _interopRequireDefault(_AccountInfo);

var _Auth = require('ringcentral-integration/modules/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _Brand = require('ringcentral-integration/modules/Brand');

var _Brand2 = _interopRequireDefault(_Brand);

var _ExtensionInfo = require('ringcentral-integration/modules/ExtensionInfo');

var _ExtensionInfo2 = _interopRequireDefault(_ExtensionInfo);

var _Locale = require('ringcentral-integration/modules/Locale');

var _Locale2 = _interopRequireDefault(_Locale);

var _RegionSettings = require('ringcentral-integration/modules/RegionSettings');

var _RegionSettings2 = _interopRequireDefault(_RegionSettings);

var _RolesAndPermissions = require('ringcentral-integration/modules/RolesAndPermissions');

var _RolesAndPermissions2 = _interopRequireDefault(_RolesAndPermissions);

var _Presence = require('ringcentral-integration/modules/Presence');

var _Presence2 = _interopRequireDefault(_Presence);

var _RouterInteraction = require('../../modules/RouterInteraction');

var _RouterInteraction2 = _interopRequireDefault(_RouterInteraction);

var _SettingsPanel = require('../../components/SettingsPanel');

var _SettingsPanel2 = _interopRequireDefault(_SettingsPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var accountInfo = _ref.accountInfo,
      auth = _ref.auth,
      brand = _ref.brand,
      extensionInfo = _ref.extensionInfo,
      locale = _ref.locale,
      regionSettings = _ref.regionSettings,
      callingSettings = _ref.callingSettings,
      version = _ref.version,
      rolesAndPermissions = _ref.rolesAndPermissions,
      presence = _ref.presence,
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
    showSpinner: !(accountInfo.ready && auth.ready && loggedIn && extensionInfo.ready && locale.ready && regionSettings.ready && callingSettings.ready && rolesAndPermissions.ready && (!presence || presence.ready)),
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
    dndStatus: presence && presence.dndStatus,
    userStatus: presence && presence.userStatus,
    showPresenceSettings: !!(presence && params && params.showPresenceSettings)
  };
}

function mapToFunctions(_, _ref2) {
  var _this = this;

  var auth = _ref2.auth,
      presence = _ref2.presence,
      router = _ref2.router,
      regionSettingsUrl = _ref2.regionSettingsUrl,
      callingSettingsUrl = _ref2.callingSettingsUrl;

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
    }
  };
}
var SettingsPage = (0, _reactRedux.connect)(mapToProps, mapToFunctions)(_SettingsPanel2.default);

var propTypes = {
  accountInfo: _propTypes2.default.instanceOf(_AccountInfo2.default).isRequired,
  auth: _propTypes2.default.instanceOf(_Auth2.default).isRequired,
  brand: _propTypes2.default.instanceOf(_Brand2.default).isRequired,
  extensionInfo: _propTypes2.default.instanceOf(_ExtensionInfo2.default).isRequired,
  locale: _propTypes2.default.instanceOf(_Locale2.default).isRequired,
  regionSettings: _propTypes2.default.instanceOf(_RegionSettings2.default).isRequired,
  callingSettingsUrl: _propTypes2.default.string.isRequired,
  regionSettingsUrl: _propTypes2.default.string.isRequired,
  version: _propTypes2.default.string.isRequired,
  rolesAndPermissions: _propTypes2.default.instanceOf(_RolesAndPermissions2.default).isRequired,
  presence: _propTypes2.default.instanceOf(_Presence2.default),
  router: _propTypes2.default.instanceOf(_RouterInteraction2.default),
  callingSettings: _propTypes2.default.object.isRequired
};

SettingsPage.propTypes = propTypes;

exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.propTypes = propTypes;
exports.default = SettingsPage;
//# sourceMappingURL=index.js.map
