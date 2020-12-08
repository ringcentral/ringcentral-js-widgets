"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callControlError = _interopRequireDefault(require("ringcentral-integration/modules/ActiveCallControl/callControlError"));

var _muteConflictError$ho;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var holdConflictError = _callControlError["default"].holdConflictError,
    unHoldConflictError = _callControlError["default"].unHoldConflictError,
    muteConflictError = _callControlError["default"].muteConflictError,
    unMuteConflictError = _callControlError["default"].unMuteConflictError,
    generalError = _callControlError["default"].generalError,
    forwardSuccess = _callControlError["default"].forwardSuccess;

var _default = (_muteConflictError$ho = {}, _defineProperty(_muteConflictError$ho, muteConflictError, "Le son de cet appel a été désactivé sur un autre appareil. Veuillez activer le son de l'appel avant votre action dans l'application."), _defineProperty(_muteConflictError$ho, holdConflictError, "Cet appel a été mis en attente sur un autre appareil. Veuillez reprendre l'appel avant votre action dans l'application."), _defineProperty(_muteConflictError$ho, unMuteConflictError, "Le son de cet appel a été activé sur un autre appareil. Veuillez désactiver le son de l'appel avant votre action dans l'application."), _defineProperty(_muteConflictError$ho, unHoldConflictError, "Cet appel a été repris sur un autre appareil. Veuillez mettre en attente l'appel avant toute action au sein de l'application."), _defineProperty(_muteConflictError$ho, generalError, "Erreur de serveur inconnue. Veuillez réessayer plus tard."), _defineProperty(_muteConflictError$ho, forwardSuccess, "Appel transféré"), _muteConflictError$ho); // @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@


exports["default"] = _default;
//# sourceMappingURL=fr-FR.js.map
