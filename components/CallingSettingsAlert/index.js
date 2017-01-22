'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

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
      callingSettingsUrl = _ref.callingSettingsUrl;

  switch (message) {
    case _callingSettingsMessages2.default.saveSuccess:
    case _callingSettingsMessages2.default.saveSuccessWithSoftphone:
    case _callingSettingsMessages2.default.firstLogin:
    case _callingSettingsMessages2.default.firstLoginOther:
      return _react2.default.createElement(_FormattedMessage2.default, {
        message: _i18n2.default.getString(message),
        values: { brand: brand }
      });

    case _callingSettingsMessages2.default.permissionChanged:
    case _callingSettingsMessages2.default.phoneNumberChanged:
      return _react2.default.createElement(_FormattedMessage2.default, {
        message: _i18n2.default.getString(message),
        values: { link: _react2.default.createElement(
            _reactRouter.Link,
            { to: callingSettingsUrl },
            _i18n2.default.getString('link')
          ) }
      });
    default:
      return null;
  }
}
CallingSettingsAlert.propTypes = {
  message: _react.PropTypes.shape({
    message: _react.PropTypes.string.isRequired
  }).isRequired,
  currentLocale: _react.PropTypes.string.isRequired,
  brand: _react.PropTypes.string.isRequired,
  callingSettingsUrl: _react.PropTypes.string.isRequired
};
CallingSettingsAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _callingSettingsMessages2.default.saveSuccess || message === _callingSettingsMessages2.default.saveSuccessWithSoftphone || message === _callingSettingsMessages2.default.firstLogin || message === _callingSettingsMessages2.default.firstLoginOther || message === _callingSettingsMessages2.default.permissionChanged || message === _callingSettingsMessages2.default.phoneNumberChanged;
};

exports.default = CallingSettingsAlert;
//# sourceMappingURL=index.js.map
