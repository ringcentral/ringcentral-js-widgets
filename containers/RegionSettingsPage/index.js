'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _reactRedux = require('react-redux');

var _react = require('react');

var _RegionSettingsPanel = require('../../components/RegionSettingsPanel');

var _RegionSettingsPanel2 = _interopRequireDefault(_RegionSettingsPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RegionSettingsPage = (0, _reactRedux.connect)(function (_, props) {
  return {
    availableCountries: props.regionSettings.availableCountries,
    countryCode: props.regionSettings.countryCode,
    areaCode: props.regionSettings.areaCode,
    currentLocale: props.locale.currentLocale
  };
}, function (_, props) {
  return {
    onLogoutButtonClick: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return props.auth.logout();

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function onLogoutButtonClick() {
        return _ref.apply(this, arguments);
      };
    }(),
    onBackButtonClick: function onBackButtonClick() {
      props.router.history.goBack();
    },
    onSave: function onSave(_ref2) {
      var areaCode = _ref2.areaCode,
          countryCode = _ref2.countryCode;

      props.regionSettings.setData({
        areaCode: areaCode,
        countryCode: countryCode
      });
    }
  };
})(_RegionSettingsPanel2.default);

RegionSettingsPage.propTypes = {
  locale: _react.PropTypes.object.isRequired,
  regionSettings: _react.PropTypes.object.isRequired,
  router: _react.PropTypes.object.isRequired
};

exports.default = RegionSettingsPage;
//# sourceMappingURL=index.js.map
