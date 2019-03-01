"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _callControlError = _interopRequireDefault(require("ringcentral-integration/modules/ActiveCallControl/callControlError"));

var _muteConflictError$ho;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var holdConflictError = _callControlError.default.holdConflictError,
    unHoldConflictError = _callControlError.default.unHoldConflictError,
    muteConflictError = _callControlError.default.muteConflictError,
    unMuteConflictError = _callControlError.default.unMuteConflictError,
    generalError = _callControlError.default.generalError;

var _default = (_muteConflictError$ho = {}, _defineProperty(_muteConflictError$ho, muteConflictError, "Esta chamada foi silenciada em outro dispositivo. Reative a chamada antes da sua operação neste aplicativo."), _defineProperty(_muteConflictError$ho, holdConflictError, "Esta chamada foi colocada em espera em outro dispositivo. Retire a chamada de espera antes da sua operação neste aplicativo."), _defineProperty(_muteConflictError$ho, unMuteConflictError, "Esta chamada foi reativada em outro dispositivo. Silencie a chamada antes da sua operação neste aplicativo."), _defineProperty(_muteConflictError$ho, unHoldConflictError, "Esta chamada foi retirada de espera em outro dispositivo. Coloque a chamada em espera antes da sua operação neste aplicativo."), _defineProperty(_muteConflictError$ho, generalError, "Erro inesperado do servidor. Tente novamente mais tarde."), _muteConflictError$ho); // @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@


exports.default = _default;
//# sourceMappingURL=pt-BR.js.map
