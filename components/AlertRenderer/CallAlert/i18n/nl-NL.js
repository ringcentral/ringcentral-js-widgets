"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callErrors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Call/callErrors"));

var _callErrors$noToNumbe;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_callErrors$noToNumbe = {}, _defineProperty(_callErrors$noToNumbe, _callErrors["default"].noToNumber, "Voer een geldig telefoonnummer in."), _defineProperty(_callErrors$noToNumbe, _callErrors["default"].noAreaCode, "Stel {areaCodeLink} in om 7-cijferige lokale telefoonnummers te gebruiken."), _defineProperty(_callErrors$noToNumbe, _callErrors["default"].specialNumber, "Het bellen van alarmnummers of speciale servicenummers wordt niet ondersteund."), _defineProperty(_callErrors$noToNumbe, _callErrors["default"].connectFailed, "Verbinding mislukt. Probeer het later opnieuw."), _defineProperty(_callErrors$noToNumbe, _callErrors["default"].internalError, "Verbinding maken is mislukt vanwege interne fouten. Probeer het later opnieuw."), _defineProperty(_callErrors$noToNumbe, _callErrors["default"].notAnExtension, "Het extensienummer bestaat niet."), _defineProperty(_callErrors$noToNumbe, _callErrors["default"].networkError, "Verbinding maken is mislukt vanwege netwerkfouten. Probeer het later opnieuw."), _defineProperty(_callErrors$noToNumbe, _callErrors["default"].noInternational, "U hebt onvoldoende machtigingen om internationale oproepen te plaatsen. Neem contact op met uw {brand}-accountbeheerder voor een upgrade."), _defineProperty(_callErrors$noToNumbe, _callErrors["default"].noRingoutEnable, "Uw extensie mag bellen met de desktop-app.\n    Als u naar andere oproepopties wilt overschakelen,\n    neem dan contact op met uw accountbeheerder voor een upgrade."), _defineProperty(_callErrors$noToNumbe, "areaCode", "netnummer"), _defineProperty(_callErrors$noToNumbe, "telus911", "Noodoproepen worden niet ondersteund."), _callErrors$noToNumbe); // @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.specialNumber]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noInternational]"@#@ @source: @#@"You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@


exports["default"] = _default;
//# sourceMappingURL=nl-NL.js.map
