'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.propTypes = exports.mapToProps = exports.mapToFunctions = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _reactRedux = require('react-redux');

var _react = require('react');

var _Locale = require('ringcentral-integration/modules/Locale');

var _Locale2 = _interopRequireDefault(_Locale);

var _RegionSettings = require('ringcentral-integration/modules/RegionSettings');

var _RegionSettings2 = _interopRequireDefault(_RegionSettings);

var _RouterInteraction = require('../../modules/RouterInteraction');

var _RouterInteraction2 = _interopRequireDefault(_RouterInteraction);

var _RegionSettingsPanel = require('../../components/RegionSettingsPanel');

var _RegionSettingsPanel2 = _interopRequireDefault(_RegionSettingsPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var locale = _ref.locale,
      regionSettings = _ref.regionSettings;

  return {
    availableCountries: regionSettings.availableCountries,
    countryCode: regionSettings.countryCode,
    areaCode: regionSettings.areaCode,
    currentLocale: locale.currentLocale
  };
}

function mapToFunctions(_, _ref2) {
  var _this = this;

  var auth = _ref2.auth,
      regionSettings = _ref2.regionSettings,
      router = _ref2.router;

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
      router.history.goBack();
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

var RegionSettingsPage = (0, _reactRedux.connect)(mapToProps, mapToFunctions)(_RegionSettingsPanel2.default);

var propTypes = {
  locale: _react.PropTypes.instanceOf(_Locale2.default).isRequired,
  regionSettings: _react.PropTypes.instanceOf(_RegionSettings2.default).isRequired,
  router: _react.PropTypes.instanceOf(_RouterInteraction2.default).isRequired
};

RegionSettingsPage.propTypes = propTypes;

exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.propTypes = propTypes;
exports.default = RegionSettingsPage;
//# sourceMappingURL=index.js.map
