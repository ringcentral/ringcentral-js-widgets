'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _callingSettingsMessages = require('ringcentral-integration/modules/CallingSettings/callingSettingsMessages');

var _callingSettingsMessages2 = _interopRequireDefault(_callingSettingsMessages);

var _FormattedMessage = require('../FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CallingSettingsAlert(_ref) {
  var message = _ref.message.message,
      currentLocale = _ref.currentLocale,
      brand = _ref.brand,
      onCallingSettingsLinkClick = _ref.onCallingSettingsLinkClick;

  switch (message) {
    case _callingSettingsMessages2.default.saveSuccess:
    case _callingSettingsMessages2.default.saveSuccessWithSoftphone:
    case _callingSettingsMessages2.default.webphonePermissionRemoved:
    case _callingSettingsMessages2.default.emergencyCallingNotAvailable:
      return _react2.default.createElement(_FormattedMessage2.default, {
        message: _i18n2.default.getString(message),
        values: { brand: brand }
      });

    case _callingSettingsMessages2.default.permissionChanged:
    case _callingSettingsMessages2.default.phoneNumberChanged:
      {
        var link = onCallingSettingsLinkClick ? _react2.default.createElement(
          'a',
          {
            onClick: function onClick(e) {
              e.preventDefault();
              onCallingSettingsLinkClick();
            } },
          _i18n2.default.getString('link', currentLocale)
        ) : _i18n2.default.getString('link', currentLocale);
        return _react2.default.createElement(_FormattedMessage2.default, {
          message: _i18n2.default.getString(message, currentLocale),
          values: { link: link }
        });
      }
    default:
      return null;
  }
}
CallingSettingsAlert.propTypes = {
  message: _propTypes2.default.shape({
    message: _propTypes2.default.string.isRequired
  }).isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  brand: _propTypes2.default.string.isRequired,
  onCallingSettingsLinkClick: _propTypes2.default.func
};
CallingSettingsAlert.defaultProps = {
  onCallingSettingsLinkClick: undefined
};
CallingSettingsAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _callingSettingsMessages2.default.saveSuccess || message === _callingSettingsMessages2.default.saveSuccessWithSoftphone || message === _callingSettingsMessages2.default.permissionChanged || message === _callingSettingsMessages2.default.webphonePermissionRemoved || message === _callingSettingsMessages2.default.phoneNumberChanged || message === _callingSettingsMessages2.default.emergencyCallingNotAvailable;
};

exports.default = CallingSettingsAlert;
//# sourceMappingURL=index.js.map
