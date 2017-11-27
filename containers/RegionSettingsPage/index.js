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

var _RegionSettingsPanel = require('../../components/RegionSettingsPanel');

var _RegionSettingsPanel2 = _interopRequireDefault(_RegionSettingsPanel);

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      locale = _ref$phone.locale,
      regionSettings = _ref$phone.regionSettings;

  return {
    availableCountries: regionSettings.availableCountries,
    countryCode: regionSettings.countryCode,
    areaCode: regionSettings.areaCode,
    currentLocale: locale.currentLocale
  };
}

function mapToFunctions(_, _ref2) {
  var _this = this;

  var _ref2$phone = _ref2.phone,
      auth = _ref2$phone.auth,
      regionSettings = _ref2$phone.regionSettings,
      routerInteraction = _ref2$phone.routerInteraction;

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
    onBackButtonClick: function onBackButtonClick() {
      routerInteraction.goBack();
    },
    onSave: function onSave(_ref4) {
      var areaCode = _ref4.areaCode,
          countryCode = _ref4.countryCode;

      regionSettings.setData({
        areaCode: areaCode,
        countryCode: countryCode
      });
    }
  };
}

var RegionSettingsPage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_RegionSettingsPanel2.default));

exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.default = RegionSettingsPage;
//# sourceMappingURL=index.js.map
