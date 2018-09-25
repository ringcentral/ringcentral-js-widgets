"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _muteConflictError$ho;

var _callControlError = require("ringcentral-integration/modules/ActiveCallControl/callControlError");

var _callControlError2 = _interopRequireDefault(_callControlError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var holdConflictError = _callControlError2.default.holdConflictError,
    unHoldConflictError = _callControlError2.default.unHoldConflictError,
    muteConflictError = _callControlError2.default.muteConflictError,
    unMuteConflictError = _callControlError2.default.unMuteConflictError,
    generalError = _callControlError2.default.generalError;
exports.default = (_muteConflictError$ho = {}, (0, _defineProperty3.default)(_muteConflictError$ho, muteConflictError, "Le son de cet appel a été désactivé sur un autre appareil. Veuillez activer le son de l'appel avant votre action dans l'application."), (0, _defineProperty3.default)(_muteConflictError$ho, holdConflictError, "Cet appel a été mis en attente sur un autre appareil. Veuillez reprendre l'appel avant votre action dans l'application."), (0, _defineProperty3.default)(_muteConflictError$ho, unMuteConflictError, "Le son de cet appel a été activé sur un autre appareil. Veuillez désactiver le son de l'appel avant votre action dans l'application."), (0, _defineProperty3.default)(_muteConflictError$ho, unHoldConflictError, "Cet appel a été repris sur un autre appareil. Veuillez mettre en attente l'appel avant votre action dans l'application."), (0, _defineProperty3.default)(_muteConflictError$ho, generalError, "Erreur de serveur inconnue. Veuillez réessayer plus tard."), _muteConflictError$ho);

// @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
//# sourceMappingURL=fr-FR.js.map
