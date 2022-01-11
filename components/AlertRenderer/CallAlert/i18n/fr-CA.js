"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callErrors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Call/callErrors"));

var _callErrors$emergency;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_callErrors$emergency = {}, _defineProperty(_callErrors$emergency, _callErrors["default"].emergencyNumber, "L’appel d’urgence n’est pas disponible. Veuillez utiliser un autre téléphone pour communiquer avec les services d’urgence"), _defineProperty(_callErrors$emergency, _callErrors["default"].noToNumber, "Veuillez entrer un numéro de téléphone valide."), _defineProperty(_callErrors$emergency, _callErrors["default"].noAreaCode, "Veuillez configurer l’{areaCodeLink} pour utiliser des numéros de téléphone locaux à 7 chiffres."), _defineProperty(_callErrors$emergency, _callErrors["default"].connectFailed, "Échec de la connexion. Veuillez réessayer plus tard."), _defineProperty(_callErrors$emergency, _callErrors["default"].internalError, "Connexion impossible en raison d’erreurs internes. Veuillez réessayer plus tard."), _defineProperty(_callErrors$emergency, _callErrors["default"].notAnExtension, "Le numéro de poste n’existe pas."), _defineProperty(_callErrors$emergency, _callErrors["default"].networkError, "Connexion impossible en raison de problèmes de réseau. Veuillez réessayer plus tard."), _defineProperty(_callErrors$emergency, _callErrors["default"].noInternational, "Vous n’êtes pas autorisé à faire des appels internationaux. Veuillez communiquer avec votre administrateur de compte {brand} pour obtenir une mise à jour."), _defineProperty(_callErrors$emergency, _callErrors["default"].noRingoutEnable, "Votre poste est autorisé à effectuer des appels avec l’application pour ordinateur de bureau.\n    Si vous souhaitez passer à d’autres options d’appel,\n    veuillez communiquer avec votre administrateur de compte pour obtenir une mise à niveau."), _defineProperty(_callErrors$emergency, "areaCode", "indicatif régional"), _defineProperty(_callErrors$emergency, "telus911", "La composition d’urgence n’est pas prise en charge."), _callErrors$emergency); // @key: @#@"[callErrors.emergencyNumber]"@#@ @source: @#@"Emergency calling is not available. Please use another phone to contact emergency services"@#@
// @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noInternational]"@#@ @source: @#@"You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@


exports["default"] = _default;
//# sourceMappingURL=fr-CA.js.map
