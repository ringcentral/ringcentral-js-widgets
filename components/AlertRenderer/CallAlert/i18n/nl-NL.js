"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Call = require("@ringcentral-integration/commons/modules/Call");
var _callErrors$emergency;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_callErrors$emergency = {}, _defineProperty(_callErrors$emergency, _Call.callErrors.emergencyNumber, "Noodoproepen zijn niet beschikbaar. Gebruik een andere telefoon om contact op te nemen met de nooddiensten"), _defineProperty(_callErrors$emergency, _Call.callErrors.noToNumber, "Voer een geldig telefoonnummer in."), _defineProperty(_callErrors$emergency, _Call.callErrors.noAreaCode, "Stel {areaCodeLink} in om lokale telefoonnummers met 7 cijfers te gebruiken."), _defineProperty(_callErrors$emergency, _Call.callErrors.connectFailed, "Verbinding mislukt. Probeer het later opnieuw."), _defineProperty(_callErrors$emergency, _Call.callErrors.internalError, "Kan geen verbinding maken vanwege interne fouten. Probeer het later opnieuw."), _defineProperty(_callErrors$emergency, _Call.callErrors.notAnExtension, "Het extensienummer bestaat niet."), _defineProperty(_callErrors$emergency, _Call.callErrors.networkError, "Kan geen verbinding maken vanwege netwerkfouten. Probeer het later opnieuw."), _defineProperty(_callErrors$emergency, _Call.callErrors.noInternational, "U hebt onvoldoende machtigingen om internationale oproepen te plaatsen. Neem contact op met uw {brand}-accountbeheerder voor een upgrade."), _defineProperty(_callErrors$emergency, _Call.callErrors.noRingoutEnable, "Uw extensie mag bellen met de desktop-app.\n    Als u naar andere oproepopties wilt overschakelen,\n    neem dan contact op met uw accountbeheerder voor een upgrade."), _defineProperty(_callErrors$emergency, _Call.callErrors.numberParseError, "Er is bij ons een probleem opgetreden. Probeer het later opnieuw."), _defineProperty(_callErrors$emergency, "areaCode", "netnummer"), _defineProperty(_callErrors$emergency, "telus911", "Noodoproepen worden niet ondersteund."), _callErrors$emergency); // @key: @#@"[callErrors.emergencyNumber]"@#@ @source: @#@"Emergency calling is not available. Please use another phone to contact emergency services"@#@
// @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noInternational]"@#@ @source: @#@"You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"[callErrors.numberParseError]"@#@ @source: @#@"Sorry, there was a problem on our end. Please try again later."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@
exports["default"] = _default;
//# sourceMappingURL=nl-NL.js.map
