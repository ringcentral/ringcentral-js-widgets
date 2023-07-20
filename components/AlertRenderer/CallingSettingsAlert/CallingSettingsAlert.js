"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallingSettingsAlert = void 0;
var _react = _interopRequireDefault(require("react"));
var _CallingSettings = require("@ringcentral-integration/commons/modules/CallingSettings");
var _FormattedMessage = _interopRequireDefault(require("../../FormattedMessage"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var CallingSettingsAlert = function CallingSettingsAlert(_ref) {
  var message = _ref.message.message,
    currentLocale = _ref.currentLocale,
    brandName = _ref.brandName,
    jupiterAppName = _ref.jupiterAppName,
    softphoneAppName = _ref.softphoneAppName,
    onCallingSettingsLinkClick = _ref.onCallingSettingsLinkClick;
  switch (message) {
    case _CallingSettings.callingSettingsMessages.saveSuccess:
    case _CallingSettings.callingSettingsMessages.saveSuccessWithSoftphone:
    case _CallingSettings.callingSettingsMessages.webphonePermissionRemoved:
    case _CallingSettings.callingSettingsMessages.emergencyCallingNotAvailable:
    case _CallingSettings.callingSettingsMessages.disableEmergencyInJapan:
    case _CallingSettings.callingSettingsMessages.saveSuccessWithJupiter:
      {
        var appName = brandName;
        if (message === _CallingSettings.callingSettingsMessages.saveSuccessWithJupiter) {
          appName = jupiterAppName;
        } else if (message === _CallingSettings.callingSettingsMessages.saveSuccessWithSoftphone) {
          appName = softphoneAppName;
        }
        return /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
          message: _i18n["default"].getString(message),
          values: {
            brand: appName
          }
        });
      }
    case _CallingSettings.callingSettingsMessages.permissionChanged:
    case _CallingSettings.callingSettingsMessages.phoneNumberChanged:
      {
        var link = onCallingSettingsLinkClick ? /*#__PURE__*/_react["default"].createElement("a", {
          onClick: function onClick(e) {
            e.preventDefault();
            onCallingSettingsLinkClick();
          }
        }, _i18n["default"].getString('link', currentLocale)) : _i18n["default"].getString('link', currentLocale);
        return /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
          message: _i18n["default"].getString(message, currentLocale)
          // @ts-expect-error TS(2322): Type 'string | Element' is not assignable to type ... Remove this comment to see the full error message
          ,
          values: {
            link: link
          }
        });
      }
    default:
      return null;
  }
};
exports.CallingSettingsAlert = CallingSettingsAlert;
CallingSettingsAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _CallingSettings.callingSettingsMessages.saveSuccess || message === _CallingSettings.callingSettingsMessages.saveSuccessWithSoftphone || message === _CallingSettings.callingSettingsMessages.permissionChanged || message === _CallingSettings.callingSettingsMessages.webphonePermissionRemoved || message === _CallingSettings.callingSettingsMessages.phoneNumberChanged || message === _CallingSettings.callingSettingsMessages.emergencyCallingNotAvailable || message === _CallingSettings.callingSettingsMessages.saveSuccessWithJupiter || message === _CallingSettings.callingSettingsMessages.disableEmergencyInJapan;
};
//# sourceMappingURL=CallingSettingsAlert.js.map
