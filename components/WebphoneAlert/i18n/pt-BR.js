"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _webphoneErrors = _interopRequireDefault(require("ringcentral-integration/modules/Webphone/webphoneErrors"));

var _webphoneErrors$conne;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_webphoneErrors$conne = {}, _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.connectFailed, "Falha ao conectar ao servidor de telefone da Web."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.connected, "Telefone da Web registrado."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.browserNotSupported, "Há suporte para ligação com o navegador somente no Chrome."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.webphoneCountOverLimit, "É possível registrar no máximo cinco telefones Web."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.notOutboundCallWithoutDL, "No momento, o ramal não pode fazer chamadas de saída com o navegador. Entre em contato com o representante da conta para fazer um upgrade."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.getSipProvisionError, "Você não tem permissão para enviar mensagens."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.toVoiceMailError, "Não é possível enviar chamadas para caixa postal devido a um erro interno"), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.muteError, "Não é possível deixar a chamada sem som no momento."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.holdError, "Não é possível colocar a chamada em espera no momento."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.flipError, "Não é possível transferir a chamada. Tente novamente mais tarde."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.recordError, "Não é possível gravar a chamada no momento. Código de erro: {errorCode}"), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.recordDisabled, "Sua conta não tem o recurso de gravação de chamadas. Entre em contato com o administrador da conta."), _defineProperty(_webphoneErrors$conne, _webphoneErrors.default.transferError, "Não é possível transferir a chamada. Tente novamente mais tarde."), _defineProperty(_webphoneErrors$conne, "webphoneUnavailable", "{error}. Estamos nos reconectando ao servidor. Se o erro continuar, reporte esse erro ao Suporte de {brandName}."), _defineProperty(_webphoneErrors$conne, "errorCode", "Código de erro interno: {errorCode}"), _defineProperty(_webphoneErrors$conne, "occurs", "Há um erro interno"), _webphoneErrors$conne); // @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Connect with web phone server failed."@#@
// @key: @#@"[webphoneErrors.connected]"@#@ @source: @#@"Web phone registered."@#@
// @key: @#@"[webphoneErrors.browserNotSupported]"@#@ @source: @#@"Calling with browser is only supported on Chrome."@#@
// @key: @#@"[webphoneErrors.webphoneCountOverLimit]"@#@ @source: @#@"A maximum of 5 web phones could be registered."@#@
// @key: @#@"[webphoneErrors.notOutboundCallWithoutDL]"@#@ @source: @#@"Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade."@#@
// @key: @#@"[webphoneErrors.getSipProvisionError]"@#@ @source: @#@"You have no permission to send message."@#@
// @key: @#@"[webphoneErrors.toVoiceMailError]"@#@ @source: @#@"Cannot send call to voicemail due to internal error"@#@
// @key: @#@"[webphoneErrors.muteError]"@#@ @source: @#@"Call cannot be muted at the moment."@#@
// @key: @#@"[webphoneErrors.holdError]"@#@ @source: @#@"Call cannot be hold at the moment."@#@
// @key: @#@"[webphoneErrors.flipError]"@#@ @source: @#@"Cannot flip the call. Please try again later."@#@
// @key: @#@"[webphoneErrors.recordError]"@#@ @source: @#@"You cannot record the call at the moment. Error code: {errorCode}"@#@
// @key: @#@"[webphoneErrors.recordDisabled]"@#@ @source: @#@"Sorry, your account does not have the feature to record a call. Please contact your account administrator."@#@
// @key: @#@"[webphoneErrors.transferError]"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@
// @key: @#@"webphoneUnavailable"@#@ @source: @#@"{error}. We are reconnecting to server. If the error persists, please report this error to {brandName} Support."@#@
// @key: @#@"errorCode"@#@ @source: @#@"Internal error code: {errorCode}"@#@
// @key: @#@"occurs"@#@ @source: @#@"Internal error occurs"@#@


exports.default = _default;
//# sourceMappingURL=pt-BR.js.map
