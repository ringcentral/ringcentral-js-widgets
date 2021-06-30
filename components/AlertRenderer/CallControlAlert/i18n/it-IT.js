"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callControlError = _interopRequireDefault(require("@ringcentral-integration/commons/modules/ActiveCallControl/callControlError"));

var _muteConflictError$un;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var holdConflictError = _callControlError["default"].holdConflictError,
    unHoldConflictError = _callControlError["default"].unHoldConflictError,
    muteConflictError = _callControlError["default"].muteConflictError,
    unMuteConflictError = _callControlError["default"].unMuteConflictError,
    generalError = _callControlError["default"].generalError,
    forwardSuccess = _callControlError["default"].forwardSuccess;

var _default = (_muteConflictError$un = {}, _defineProperty(_muteConflictError$un, muteConflictError, "L'audio di questa chiamata è stato disattivato sull'altro dispositivo. Riattivalo prima di eseguire l'operazione in questa app."), _defineProperty(_muteConflictError$un, unHoldConflictError, "Questa chiamata è stata messa in attesa sull'altro dispositivo. Riprendila prima di eseguire l'operazione in questa app."), _defineProperty(_muteConflictError$un, unMuteConflictError, "L'audio di questa chiamata è stato riattivato sull'altro dispositivo. Disattivalo prima di eseguire l'operazione in questa app."), _defineProperty(_muteConflictError$un, holdConflictError, "Questa chiamata è stata ripresa sull'altro dispositivo. Mettila in attesa prima di eseguire l'operazione in questa app."), _defineProperty(_muteConflictError$un, generalError, "Errore inatteso del server. Riprova più tardi."), _defineProperty(_muteConflictError$un, forwardSuccess, "Chiamata trasferita"), _muteConflictError$un); // @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@


exports["default"] = _default;
//# sourceMappingURL=it-IT.js.map
