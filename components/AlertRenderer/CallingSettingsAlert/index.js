"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _callingSettingsMessages = _interopRequireDefault(require("ringcentral-integration/modules/CallingSettings/callingSettingsMessages"));

var _FormattedMessage = _interopRequireDefault(require("../../FormattedMessage"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function CallingSettingsAlert(_ref) {
  var message = _ref.message.message,
      currentLocale = _ref.currentLocale,
      brand = _ref.brand,
      onCallingSettingsLinkClick = _ref.onCallingSettingsLinkClick;

  switch (message) {
    case _callingSettingsMessages["default"].saveSuccess:
    case _callingSettingsMessages["default"].saveSuccessWithSoftphone:
    case _callingSettingsMessages["default"].webphonePermissionRemoved:
    case _callingSettingsMessages["default"].emergencyCallingNotAvailable:
      return _react["default"].createElement(_FormattedMessage["default"], {
        message: _i18n["default"].getString(message),
        values: {
          brand: brand
        }
      });

    case _callingSettingsMessages["default"].permissionChanged:
    case _callingSettingsMessages["default"].phoneNumberChanged:
      {
        var link = onCallingSettingsLinkClick ? _react["default"].createElement("a", {
          onClick: function onClick(e) {
            e.preventDefault();
            onCallingSettingsLinkClick();
          }
        }, _i18n["default"].getString('link', currentLocale)) : _i18n["default"].getString('link', currentLocale);
        return _react["default"].createElement(_FormattedMessage["default"], {
          message: _i18n["default"].getString(message, currentLocale),
          values: {
            link: link
          }
        });
      }

    default:
      return null;
  }
}

CallingSettingsAlert.propTypes = {
  message: _propTypes["default"].shape({
    message: _propTypes["default"].string.isRequired
  }).isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  brand: _propTypes["default"].string.isRequired,
  onCallingSettingsLinkClick: _propTypes["default"].func
};
CallingSettingsAlert.defaultProps = {
  onCallingSettingsLinkClick: undefined
};

CallingSettingsAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _callingSettingsMessages["default"].saveSuccess || message === _callingSettingsMessages["default"].saveSuccessWithSoftphone || message === _callingSettingsMessages["default"].permissionChanged || message === _callingSettingsMessages["default"].webphonePermissionRemoved || message === _callingSettingsMessages["default"].phoneNumberChanged || message === _callingSettingsMessages["default"].emergencyCallingNotAvailable;
};

var _default = CallingSettingsAlert;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
