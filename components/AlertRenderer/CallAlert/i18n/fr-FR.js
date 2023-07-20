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
var _default = (_callErrors$emergency = {}, _defineProperty(_callErrors$emergency, _Call.callErrors.emergencyNumber, "L’appel d’urgence n’est pas disponible. Veuillez utiliser un autre téléphone pour contacter les services d’urgence."), _defineProperty(_callErrors$emergency, _Call.callErrors.noToNumber, "Veuillez entrer un numéro de téléphone valide."), _defineProperty(_callErrors$emergency, _Call.callErrors.noAreaCode, "Veuillez paramétrer l’{areaCodeLink} pour utiliser des numéros de téléphone locaux à 7 chiffres."), _defineProperty(_callErrors$emergency, _Call.callErrors.connectFailed, "Échec de la connexion. Veuillez réessayer ultérieurement."), _defineProperty(_callErrors$emergency, _Call.callErrors.internalError, "Connexion impossible en raison d’erreurs internes. Veuillez réessayer ultérieurement."), _defineProperty(_callErrors$emergency, _Call.callErrors.notAnExtension, "Le numéro de l’extension n’existe pas."), _defineProperty(_callErrors$emergency, _Call.callErrors.networkError, "Connexion impossible en raison de problèmes de réseau. Veuillez réessayer ultérieurement."), _defineProperty(_callErrors$emergency, _Call.callErrors.noInternational, "Vous n’êtes pas autorisé à passer des appels à l’international. Veuillez contacter votre administrateur de compte {brand} pour une mise à niveau."), _defineProperty(_callErrors$emergency, _Call.callErrors.noRingoutEnable, "Votre extension est autorisée à passer des appels avec l’application logicielle.\n    Si vous souhaitez passer à d’autres options d’appel,\n    veuillez contacter votre administrateur de compte pour une mise à niveau."), _defineProperty(_callErrors$emergency, _Call.callErrors.numberParseError, "Une erreur s’est produite de notre côté. Veuillez réessayer ultérieurement."), _defineProperty(_callErrors$emergency, "areaCode", "indicatif"), _defineProperty(_callErrors$emergency, "telus911", "La composition d’urgence n’est pas prise en charge."), _callErrors$emergency); // @key: @#@"[callErrors.emergencyNumber]"@#@ @source: @#@"Emergency calling is not available. Please use another phone to contact emergency services"@#@
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
//# sourceMappingURL=fr-FR.js.map
