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
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = (_callErrors$emergency = {}, _defineProperty(_callErrors$emergency, _Call.callErrors.emergencyNumber, 'Noodoproepen zijn niet beschikbaar. Gebruik een andere telefoon om contact op te nemen met de nooddiensten'), _defineProperty(_callErrors$emergency, _Call.callErrors.noToNumber, 'Voer een geldig telefoonnummer in.'), _defineProperty(_callErrors$emergency, _Call.callErrors.noAreaCode, 'Stel {areaCodeLink} in om lokale telefoonnummers met 7 cijfers te gebruiken.'), _defineProperty(_callErrors$emergency, _Call.callErrors.connectFailed, 'Verbinding mislukt. Probeer het later opnieuw.'), _defineProperty(_callErrors$emergency, _Call.callErrors.internalError, 'Kan geen verbinding maken vanwege interne fouten. Probeer het later opnieuw.'), _defineProperty(_callErrors$emergency, _Call.callErrors.notAnExtension, 'Het extensienummer bestaat niet.'), _defineProperty(_callErrors$emergency, _Call.callErrors.networkError, 'Kan geen verbinding maken vanwege netwerkfouten. Probeer het later opnieuw.'), _defineProperty(_callErrors$emergency, _Call.callErrors.noInternational, 'U hebt onvoldoende machtigingen om internationale oproepen te plaatsen. Neem contact op met uw {brand}-accountbeheerder voor een upgrade.'), _defineProperty(_callErrors$emergency, _Call.callErrors.noRingoutEnable, 'Uw extensie mag bellen met de desktop-app.\n    Als u naar andere oproepopties wilt overschakelen,\n    neem dan contact op met uw accountbeheerder voor een upgrade.'), _defineProperty(_callErrors$emergency, _Call.callErrors.numberParseError, 'Er is bij ons een probleem opgetreden. Probeer het later opnieuw.'), _defineProperty(_callErrors$emergency, "areaCode", 'netnummer'), _defineProperty(_callErrors$emergency, "telus911", 'Noodoproepen worden niet ondersteund.'), _defineProperty(_callErrors$emergency, _Call.callErrors.fromAndToNumberIsSame, 'Het RingOut-nummer en bestemmingsnummer kunnen niet hetzelfde zijn. Werk het nummer bij en probeer het opnieuw.'), _callErrors$emergency); // @key: @#@"[callErrors.emergencyNumber]"@#@ @source: @#@"Emergency calling is not available. Please use another phone to contact emergency services"@#@
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
// @key: @#@"[callErrors.fromAndToNumberIsSame]"@#@ @source: @#@"The RingOut number and destination number can't be the same. Please update the number and try again."@#@
exports["default"] = _default;
//# sourceMappingURL=nl-NL.js.map
