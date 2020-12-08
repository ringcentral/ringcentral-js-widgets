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

var _default = (_muteConflictError$ho = {}, _defineProperty(_muteConflictError$ho, muteConflictError, "Esta llamada se había silenciado en otro dispositivo. Desactive el silencio de la llamada antes de empezar a utilizar la aplicación."), _defineProperty(_muteConflictError$ho, holdConflictError, "Esta llamada se había puesto en espera en otro dispositivo. Reanude la llamada antes de empezar a utilizar la aplicación."), _defineProperty(_muteConflictError$ho, unMuteConflictError, "El audio de esta llamada se había activado en otro dispositivo. Silencie la llamada antes de empezar a utilizar la aplicación."), _defineProperty(_muteConflictError$ho, unHoldConflictError, "Esta llamada se había reanudado en otro dispositivo. Ponga la llamada en espera antes de empezar a utilizar la aplicación."), _defineProperty(_muteConflictError$ho, generalError, "Error en el servidor. Vuelva a intentarlo más tarde."), _defineProperty(_muteConflictError$ho, forwardSuccess, "Llamada desviada"), _muteConflictError$ho); // @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@


exports["default"] = _default;
//# sourceMappingURL=es-419.js.map
