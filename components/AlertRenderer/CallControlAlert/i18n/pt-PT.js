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

var _default = (_muteConflictError$ho = {}, _defineProperty(_muteConflictError$ho, muteConflictError, "O som desta chamada foi desativado noutro dispositivo. Ative o som da chamada antes de assumir o controlo nesta aplicação."), _defineProperty(_muteConflictError$ho, holdConflictError, "Esta chamada foi colocada em espera noutro dispositivo. Retome a chamada antes de assumir o controlo nesta aplicação."), _defineProperty(_muteConflictError$ho, unMuteConflictError, "O som desta chamada foi ativado noutro dispositivo. Desative o som da chamada antes de assumir o controlo nesta aplicação."), _defineProperty(_muteConflictError$ho, unHoldConflictError, "Esta chamada foi retomada noutro dispositivo. Coloque a chamada em espera antes de assumir o controlo nesta aplicação."), _defineProperty(_muteConflictError$ho, generalError, "Erro de servidor inesperado. Tente novamente mais tarde."), _defineProperty(_muteConflictError$ho, forwardSuccess, "Chamada reencaminhada"), _muteConflictError$ho); // @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@


exports["default"] = _default;
//# sourceMappingURL=pt-PT.js.map
