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
var _default = (_callErrors$emergency = {}, _defineProperty(_callErrors$emergency, _Call.callErrors.emergencyNumber, "Chiamate di emergenza non disponibile. Utilizza un altro telefono per contattare i servizi di emergenza"), _defineProperty(_callErrors$emergency, _Call.callErrors.noToNumber, "Inserisci un numero di telefono valido."), _defineProperty(_callErrors$emergency, _Call.callErrors.noAreaCode, "Imposta {areaCodeLink} per l'utilizzo dei numeri di telefono locali a 7 cifre."), _defineProperty(_callErrors$emergency, _Call.callErrors.connectFailed, "Connessione non riuscita. Riprova più tardi."), _defineProperty(_callErrors$emergency, _Call.callErrors.internalError, "Impossibile connettersi a causa di errori interni. Riprova più tardi."), _defineProperty(_callErrors$emergency, _Call.callErrors.notAnExtension, "Il numero interno non esiste."), _defineProperty(_callErrors$emergency, _Call.callErrors.networkError, "Impossibile connettersi a causa di problemi di rete. Riprova più tardi."), _defineProperty(_callErrors$emergency, _Call.callErrors.noInternational, "Non disponi delle autorizzazioni per effettuare chiamate internazionali. Contatta l'amministratore dell'account {brand} per effettuare un upgrade."), _defineProperty(_callErrors$emergency, _Call.callErrors.noRingoutEnable, "Dal tuo interno è possibile effettuare chiamate con l'app per il desktop.\n    Per passare ad altre opzioni di chiamata\n    contatta l'amministratore dell'account per un aggiornamento."), _defineProperty(_callErrors$emergency, _Call.callErrors.numberParseError, "Si è verificato un problema. Riprova più tardi."), _defineProperty(_callErrors$emergency, "areaCode", "prefisso"), _defineProperty(_callErrors$emergency, "telus911", "Chiamate di emergenza non supportate."), _callErrors$emergency); // @key: @#@"[callErrors.emergencyNumber]"@#@ @source: @#@"Emergency calling is not available. Please use another phone to contact emergency services"@#@
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
//# sourceMappingURL=it-IT.js.map
