'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RegionSettingsAlert;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _regionSettingsMessages = require('ringcentral-integration/modules/RegionSettings/regionSettingsMessages');

var _regionSettingsMessages2 = _interopRequireDefault(_regionSettingsMessages);

var _FormattedMessage = require('../FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RegionSettingsAlert(_ref) {
  var message = _ref.message.message,
      currentLocale = _ref.currentLocale,
      regionSettingsUrl = _ref.regionSettingsUrl;

  var msg = void 0;
  switch (message) {
    case _regionSettingsMessages2.default.dialingPlansChanged:
      {
        var regionSettings = _i18n2.default.getString('regionSettings', currentLocale);
        msg = _react2.default.createElement(_FormattedMessage2.default, {
          message: _i18n2.default.getString(message, currentLocale),
          values: { regionSettingsLink: _react2.default.createElement(
              _reactRouter.Link,
              { to: regionSettingsUrl },
              regionSettings
            ) } });
      }
      break;
    default:
      msg = _i18n2.default.getString(message, currentLocale);
      break;
  }
  return _react2.default.createElement(
    'div',
    null,
    msg
  );
}
RegionSettingsAlert.propTypes = {
  message: _react.PropTypes.shape({
    message: _react.PropTypes.string.isRequired
  }).isRequired,
  regionSettingsUrl: _react.PropTypes.string.isRequired,
  currentLocale: _react.PropTypes.string.isRequired
};
RegionSettingsAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _regionSettingsMessages2.default.saveSuccess || message === _regionSettingsMessages2.default.dialingPlansChanged || message === _regionSettingsMessages2.default.areaCodeInvalid;
};
//# sourceMappingURL=index.js.map
