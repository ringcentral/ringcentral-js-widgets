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

var _default = (_callingSettingsMessa = {}, _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].saveSuccess, "Impostazioni salvate correttamente."), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].saveSuccessWithSoftphone, "Impostazioni salvate correttamente. Assicurati che {brand} sia installato nel computer."), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].permissionChanged, "Le tue autorizzazioni sono state modificate di recente. Vai a {link} per verificare le opzioni di chiamata."), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].phoneNumberChanged, "Le informazioni sul numero di telefono sono state modificate di recente. Vai a {link} per verificare le opzioni di chiamata."), _defineProperty(_callingSettingsMessa, "link", "Impostazioni > Chiamata"), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].webphonePermissionRemoved, "Le tue autorizzazioni sono state modificate e non consentono di effettuare chiamate con il browser. Per maggiori dettagli contatta l'amministratore del tuo account."), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].emergencyCallingNotAvailable, "Le chiamate a servizi di emergenza o speciali non sono supportate. In caso di emergenza, usa la linea fissa convenzionale o un telefono wireless per chiamare un servizio di emergenza."), _defineProperty(_callingSettingsMessa, _callingSettingsMessages["default"].saveSuccessWithJupiter, "Impostazioni salvate correttamente. Assicurati che {brand} sia installato nel computer."), _callingSettingsMessa); // @key: @#@"[callingSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithSoftphone]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} installed in your computer."@#@
// @key: @#@"[callingSettingsMessages.permissionChanged]"@#@ @source: @#@"Your permissions have been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"[callingSettingsMessages.phoneNumberChanged]"@#@ @source: @#@"Your phone number information has been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"link"@#@ @source: @#@"Settings > Calling"@#@
// @key: @#@"[callingSettingsMessages.webphonePermissionRemoved]"@#@ @source: @#@"Your permissions have been changed and you cannot make calls with Browser. For details please contact your account administrator."@#@
// @key: @#@"[callingSettingsMessages.emergencyCallingNotAvailable]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported. In an emergency, use your traditional wireline or wireless phone to call an emergency number."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithJupiter]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} installed in your computer."@#@


exports["default"] = _default;
//# sourceMappingURL=it-IT.js.map
