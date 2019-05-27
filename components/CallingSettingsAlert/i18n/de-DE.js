"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callingSettingsMessages = _interopRequireDefault(require("ringcentral-integration/modules/CallingSettings/callingSettingsMessages"));

var _callingSettingsMessa;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_callingSettingsMessa = {}, _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].saveSuccess, "Einstellungen wurden erfolgreich gespeichert."), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].saveSuccessWithSoftphone, "Die Einstellungen wurden erfolgreich gespeichert. Stellen Sie sicher, dass Sie {brand} für Desktop auf Ihrem Computer installiert haben."), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].permissionChanged, "Ihre Berechtigungen wurden kürzlich geändert. Navigieren Sie zu {link}, um Ihre Anrufoptionen zu überprüfen."), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].phoneNumberChanged, "Ihre Telefonnummerninformationen wurden kürzlich geändert. Navigieren Sie zu {link}, um Ihre Anrufoptionen zu überprüfen."), _defineProperty(_callingSettingsMessa, "link", "Einstellungen > Anrufen"), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].webphonePermissionRemoved, "Ihre Berechtigungen wurden geändert und Sie können über den Browser keine Anrufe tätigen. Wenden Sie sich an Ihren Kontoadministrator, wenn Sie Details benötigen."), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].emergencyCallingNotAvailable, "Das Anrufen des Notrufs oder bestimmter Servicenummern wird nicht unterstützt. Verwenden Sie für Notfallanrufe Ihr Festnetz- oder Ihr Mobiltelefon."), _callingSettingsMessa); // @key: @#@"[callingSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithSoftphone]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} for Desktop installed in your computer."@#@
// @key: @#@"[callingSettingsMessages.permissionChanged]"@#@ @source: @#@"Your permissions have been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"[callingSettingsMessages.phoneNumberChanged]"@#@ @source: @#@"Your phone number information has been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"link"@#@ @source: @#@"Settings > Calling"@#@
// @key: @#@"[callingSettingsMessages.webphonePermissionRemoved]"@#@ @source: @#@"Your permissions have been changed and you cannot make calls with Browser. For details please contact your account administrator."@#@
// @key: @#@"[callingSettingsMessages.emergencyCallingNotAvailable]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported. In an emergency, use your traditional wireline or wireless phone to call an emergency number."@#@


exports["default"] = _default;
//# sourceMappingURL=de-DE.js.map
