"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _webphoneErrors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/webphoneErrors"));
var _webphoneMessages = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/webphoneMessages"));
var _webphoneErrors$conne;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = exports["default"] = (_webphoneErrors$conne = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connectFailed, 'No momento, os recursos do telefone estão indisponíveis. Tente novamente mais tarde. '), _webphoneErrors["default"].connected, 'Telefone da Web registrado.'), _webphoneErrors["default"].browserNotSupported, 'Não há suporte para chamadas usando este navegador.'), _webphoneErrors["default"].webphoneCountOverLimit, 'É possível registrar no máximo cinco telefones Web.'), _webphoneErrors["default"].checkDLError, 'Não é possível fazer uma chamada. Entre em contato com o {brandName} para obter suporte se esse erro continuar aparecendo.'), _webphoneErrors["default"].noOutboundCallWithoutDL, 'No momento, o ramal não pode fazer chamadas de saída com o navegador. Entre em contato com o representante da conta para fazer uma atualização.'), _webphoneErrors["default"].provisionUpdate, 'Algo deu errado do nosso lado. Tentaremos reconectar automaticamente em breve.'), _webphoneErrors["default"].serverConnecting, 'Há um problema de conexão com o servidor de telefone.'), _webphoneErrors["default"].toVoiceMailError, 'Não é possível enviar chamadas para caixa postal devido a um erro interno'), _webphoneErrors["default"].muteError, 'Não é possível deixar a chamada sem som no momento.'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].holdError, 'Não é possível colocar a chamada em espera no momento.'), _webphoneErrors["default"].flipError, 'Não é possível transferir dinamicamente a chamada. Tente novamente mais tarde.'), _webphoneErrors["default"].recordError, 'Não é possível gravar a chamada no momento. Código de erro: {errorCode}.'), _webphoneErrors["default"].pauseRecordError, 'Não foi possível parar a gravação da chamada. Tente novamente mais tarde.'), _webphoneErrors["default"].recordDisabled, 'Sua conta não tem o recurso de gravação de chamadas. Entre em contato com o administrador da conta.'), _webphoneErrors["default"].transferError, 'Não é possível transferir a chamada. Tente novamente mais tarde.'), _webphoneMessages["default"].parked, 'Sua chamada está estacionada no local: {parkedNumber}'), "failWithStatusCode", 'Ocorreu um erro: {errorCode}. Se o problema continuar, reporte esse erro ao suporte da {brandName}.'), "registeringWithStatusCode", 'Ocorreu um problema. Estamos tentando reconectar. Se o problema continuar, reporte-o ao suporte da {brandName}. Código de erro: {errorCode}.'), "failWithoutStatusCode", 'Algo deu errado do nosso lado. Se o erro continuar, reporte-o ao suporte do {brandName}.'), _defineProperty(_webphoneErrors$conne, "registeringWithoutStatusCode", 'Ocorreu um problema. Estamos tentando reconectar. Se o problema continuar, reporte-o ao suporte da {brandName}.')); // @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Sorry, phone features are currently unavailable. Please retry later. "@#@
// @key: @#@"[webphoneErrors.connected]"@#@ @source: @#@"Web phone registered."@#@
// @key: @#@"[webphoneErrors.browserNotSupported]"@#@ @source: @#@"Sorry, making calls using this browser is not supported."@#@
// @key: @#@"[webphoneErrors.webphoneCountOverLimit]"@#@ @source: @#@"A maximum of 5 web phones could be registered."@#@
// @key: @#@"[webphoneErrors.checkDLError]"@#@ @source: @#@"Unable to make outgoing call. Contact {brandName} for support if this error keeps showing."@#@
// @key: @#@"[webphoneErrors.noOutboundCallWithoutDL]"@#@ @source: @#@"Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade."@#@
// @key: @#@"[webphoneErrors.provisionUpdate]"@#@ @source: @#@"Sorry, something went wrong on our end. We will automatically try to reconnect shortly."@#@
// @key: @#@"[webphoneErrors.serverConnecting]"@#@ @source: @#@"Sorry, we are having an issue connecting to the phone server."@#@
// @key: @#@"[webphoneErrors.toVoiceMailError]"@#@ @source: @#@"Cannot send call to voicemail due to internal error"@#@
// @key: @#@"[webphoneErrors.muteError]"@#@ @source: @#@"Call cannot be muted at the moment."@#@
// @key: @#@"[webphoneErrors.holdError]"@#@ @source: @#@"Call cannot be hold at the moment."@#@
// @key: @#@"[webphoneErrors.flipError]"@#@ @source: @#@"Cannot flip the call. Please try again later."@#@
// @key: @#@"[webphoneErrors.recordError]"@#@ @source: @#@"You cannot record the call at the moment. Error code: {errorCode}"@#@
// @key: @#@"[webphoneErrors.pauseRecordError]"@#@ @source: @#@"Sorry, we weren't able to stop recording the call. Try again later."@#@
// @key: @#@"[webphoneErrors.recordDisabled]"@#@ @source: @#@"Sorry, your account does not have the feature to record a call. Please contact your account administrator."@#@
// @key: @#@"[webphoneErrors.transferError]"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@
// @key: @#@"[webphoneMessages.parked]"@#@ @source: @#@"Your call is parked at location: {parkedNumber}"@#@
// @key: @#@"failWithStatusCode"@#@ @source: @#@"Sorry, we've encountered an error: {errorCode}. If the problem persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support. Error code: {errorCode}."@#@
// @key: @#@"failWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong on our end. If the error persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support."@#@
//# sourceMappingURL=pt-BR.js.map
