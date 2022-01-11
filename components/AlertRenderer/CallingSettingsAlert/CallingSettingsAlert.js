"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallingSettingsAlert = void 0;

var _react = _interopRequireDefault(require("react"));

var _callingSettingsMessages = require("@ringcentral-integration/commons/modules/CallingSettingsV2/callingSettingsMessages");

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
    case _callingSettingsMessages.callingSettingsMessages.saveSuccess:
    case _callingSettingsMessages.callingSettingsMessages.saveSuccessWithSoftphone:
    case _callingSettingsMessages.callingSettingsMessages.webphonePermissionRemoved:
    case _callingSettingsMessages.callingSettingsMessages.emergencyCallingNotAvailable:
    case _callingSettingsMessages.callingSettingsMessages.disableEmergencyInJapan:
    case _callingSettingsMessages.callingSettingsMessages.saveSuccessWithJupiter:
      {
        var appName = brandName;

        if (message === _callingSettingsMessages.callingSettingsMessages.saveSuccessWithJupiter) {
          appName = jupiterAppName;
        } else if (message === _callingSettingsMessages.callingSettingsMessages.saveSuccessWithSoftphone) {
          appName = softphoneAppName;
        }

        return /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
          message: _i18n["default"].getString(message),
          values: {
            brand: appName
          }
        });
      }

    case _callingSettingsMessages.callingSettingsMessages.permissionChanged:
    case _callingSettingsMessages.callingSettingsMessages.phoneNumberChanged:
      {
        var link = onCallingSettingsLinkClick ? /*#__PURE__*/_react["default"].createElement("a", {
          onClick: function onClick(e) {
            e.preventDefault();
            onCallingSettingsLinkClick();
          }
        }, _i18n["default"].getString('link', currentLocale)) : _i18n["default"].getString('link', currentLocale);
        return /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
          message: _i18n["default"].getString(message, currentLocale),
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
  return message === _callingSettingsMessages.callingSettingsMessages.saveSuccess || message === _callingSettingsMessages.callingSettingsMessages.saveSuccessWithSoftphone || message === _callingSettingsMessages.callingSettingsMessages.permissionChanged || message === _callingSettingsMessages.callingSettingsMessages.webphonePermissionRemoved || message === _callingSettingsMessages.callingSettingsMessages.phoneNumberChanged || message === _callingSettingsMessages.callingSettingsMessages.emergencyCallingNotAvailable || message === _callingSettingsMessages.callingSettingsMessages.saveSuccessWithJupiter || message === _callingSettingsMessages.callingSettingsMessages.disableEmergencyInJapan;
};
//# sourceMappingURL=CallingSettingsAlert.js.map
