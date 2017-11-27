'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RolesAndPermissionsAlert;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _permissionsMessages = require('ringcentral-integration/modules/RolesAndPermissions/permissionsMessages');

var _permissionsMessages2 = _interopRequireDefault(_permissionsMessages);

var _FormattedMessage = require('../FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RolesAndPermissionsAlert(_ref) {
  var message = _ref.message.message,
      currentLocale = _ref.currentLocale,
      brand = _ref.brand,
      application = _ref.application;

  var msg = void 0;
  switch (message) {
    case _permissionsMessages2.default.invalidTier:
      msg = _react2.default.createElement(_FormattedMessage2.default, {
        message: _i18n2.default.getString(message, currentLocale),
        values: { brand: brand, application: application } });
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
RolesAndPermissionsAlert.propTypes = {
  message: _propTypes2.default.shape({
    message: _propTypes2.default.string.isRequired
  }).isRequired,
  brand: _propTypes2.default.string.isRequired,
  application: _propTypes2.default.string.isRequired,
  currentLocale: _propTypes2.default.string.isRequired
};
RolesAndPermissionsAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _permissionsMessages2.default.invalidTier;
};
//# sourceMappingURL=index.js.map
