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

var _default = (_callingSettingsMessa = {}, _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].saveSuccess, "Instellingen zijn opgeslagen."), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].saveSuccessWithSoftphone, "Instellingen opgeslagen. Zorg ervoor dat u {brand} op uw computer hebt geïnstalleerd."), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].permissionChanged, "Uw machtigingen zijn onlangs gewijzigd. Ga naar {link} om uw oproepopties te bekijken."), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].phoneNumberChanged, "De informatie voor uw telefoonnummer is onlangs gewijzigd. Ga naar {link} om uw oproepopties te bekijken."), _defineProperty(_callingSettingsMessa, "link", "Instellingen > Oproepen"), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].webphonePermissionRemoved, "Uw machtigingen zijn gewijzigd en u kunt niet bellen met de browser. Neem voor meer informatie contact op met uw accountbeheerder."), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].emergencyCallingNotAvailable, "Het bellen van alarmnummers of speciale servicenummers wordt niet ondersteund. Gebruik in geval van nood uw oude vaste of draadloze telefoon om een alarmnummer te bellen."), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].saveSuccessWithJupiter, "Instellingen opgeslagen. Zorg ervoor dat u {brand} op uw computer hebt geïnstalleerd."), _callingSettingsMessa); // @key: @#@"[callingSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithSoftphone]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} installed in your computer."@#@
// @key: @#@"[callingSettingsMessages.permissionChanged]"@#@ @source: @#@"Your permissions have been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"[callingSettingsMessages.phoneNumberChanged]"@#@ @source: @#@"Your phone number information has been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"link"@#@ @source: @#@"Settings > Calling"@#@
// @key: @#@"[callingSettingsMessages.webphonePermissionRemoved]"@#@ @source: @#@"Your permissions have been changed and you cannot make calls with Browser. For details please contact your account administrator."@#@
// @key: @#@"[callingSettingsMessages.emergencyCallingNotAvailable]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported. In an emergency, use your traditional wireline or wireless phone to call an emergency number."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithJupiter]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} installed in your computer."@#@


exports["default"] = _default;
//# sourceMappingURL=nl-NL.js.map
