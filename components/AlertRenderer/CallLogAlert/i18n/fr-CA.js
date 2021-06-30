"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callLogMessages = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callLogMessages"));

var _callLogMessages$logC;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_callLogMessages$logC = {}, _defineProperty(_callLogMessages$logC, _callLogMessages["default"].logCallLogFailed, "Impossible de charger le formulaire du journal des appels en raison d'une erreur inattendue. Veuillez actualiser la page et réessayer."), _defineProperty(_callLogMessages$logC, _callLogMessages["default"].logFailed, "Désolé, nous n’avons pas réussi à enregistrer votre appel. Veuillez réessayer plus tard."), _defineProperty(_callLogMessages$logC, _callLogMessages["default"].fieldRequired, "Tous les champs obligatoires sont requis."), _callLogMessages$logC); // @key: @#@"[callLogMessages.logCallLogFailed]"@#@ @source: @#@"Failed to load call log form due to unexpected error. Please refresh the page and try again."@#@
// @key: @#@"[callLogMessages.logFailed]"@#@ @source: @#@"Sorry, we've failed to log your call. Please try again later."@#@
// @key: @#@"[callLogMessages.fieldRequired]"@#@ @source: @#@"Mandatory fields are required."@#@


exports["default"] = _default;
//# sourceMappingURL=fr-CA.js.map
