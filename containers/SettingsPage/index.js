'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.propTypes = exports.mapToProps = exports.mapToFunctions = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _react = require('react');

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

var _SettingsPanel = require('../../components/SettingsPanel');

var _SettingsPanel2 = _interopRequireDefault(_SettingsPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var accountInfo = _ref.accountInfo,
      auth = _ref.auth,
      brand = _ref.brand,
      callingSettingsUrl = _ref.callingSettingsUrl,
      extensionInfo = _ref.extensionInfo,
      locale = _ref.locale,
      regionSettings = _ref.regionSettings,
      regionSettingsUrl = _ref.regionSettingsUrl,
      version = _ref.version;

  var loggedIn = auth.loginStatus === _loginStatus2.default.loggedIn;
  var loginNumber = loggedIn && accountInfo.ready && extensionInfo.ready ? (0, _formatNumber2.default)({
    phoneNumber: accountInfo.mainCompanyNumber + '*' + extensionInfo.extensionNumber,
    countryCode: regionSettings.countryCode,
    areaCode: regionSettings.areaCode
  }) : '';
  return {
    showRegion: loggedIn && brand.id === '1210' && (regionSettings.availableCountries.length > 1 || !!regionSettings.availableCountries.find(function (c) {
      return c.isoCode === 'US';
    }) || !!regionSettings.availableCountries.find(function (c) {
      return c.isoCode === 'CA';
    })),
    loginNumber: loginNumber,
    version: version,
    currentLocale: locale.currentLocale,
    brandId: brand.id,
    callingSettingsUrl: callingSettingsUrl,
    regionSettingsUrl: regionSettingsUrl
  };
}

function mapToFunctions(_, _ref2) {
  var _this = this;

  var auth = _ref2.auth;

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
    }()
  };
}
var SettingsPage = (0, _reactRedux.connect)(mapToProps, mapToFunctions)(_SettingsPanel2.default);

var propTypes = {
  accountInfo: _react.PropTypes.instanceOf(_AccountInfo2.default).isRequired,
  auth: _react.PropTypes.instanceOf(_Auth2.default).isRequired,
  brand: _react.PropTypes.instanceOf(_Brand2.default).isRequired,
  extensionInfo: _react.PropTypes.instanceOf(_ExtensionInfo2.default).isRequired,
  locale: _react.PropTypes.instanceOf(_Locale2.default).isRequired,
  regionSettings: _react.PropTypes.instanceOf(_RegionSettings2.default).isRequired,
  callingSettingsUrl: _react.PropTypes.string.isRequired,
  regionSettingsUrl: _react.PropTypes.string.isRequired,
  version: _react.PropTypes.string.isRequired
};

SettingsPage.propTypes = propTypes;

exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.propTypes = propTypes;
exports.default = SettingsPage;
//# sourceMappingURL=index.js.map
