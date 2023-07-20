"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _webphoneErrors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/webphoneErrors"));
var _webphoneMessages = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/webphoneMessages"));
var _webphoneErrors$conne;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_webphoneErrors$conne = {}, _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connectFailed, "Lamentamos mas, de momento, as funcionalidades de telefone não estão disponíveis. Tente novamente mais tarde. "), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].connected, "Telefone da web registado."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].browserNotSupported, "Lamentamos, mas não é possível efetuar chamadas através deste browser."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].webphoneCountOverLimit, "É possível registar um máximo de cinco telefones da web."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].checkDLError, "Não é possível efetuar uma chamada. Se este erro persistir, contacte {brandName} para obter ajuda."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].noOutboundCallWithoutDL, "De momento, a sua extensão não tem permissão para efetuar chamadas através do browser. Contacte o representante da conta para obter uma atualização."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].provisionUpdate, "Lamentamos, mas ocorreu um erro do nosso lado. Tentaremos restabelecer automaticamente a ligação em breve."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].serverConnecting, "Lamentamos, mas estamos com problemas em ligar ao servidor de telefones."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].toVoiceMailError, "Não é possível enviar a chamada para o correio de voz devido a um erro interno"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].muteError, "De momento, não é possível desativar o som da chamada."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].holdError, "De momento, não é possível colocar a chamada em espera."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].flipError, "Não é possível transferir a chamada. Tente novamente mais tarde."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordError, "De momento, não é possível gravar a chamada. Código de erro: {errorCode}"), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].pauseRecordError, "Lamentamos, mas não conseguimos parar a gravação da chamada. Tente novamente mais tarde."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].recordDisabled, "Lamentamos, mas a sua conta não dispõe da funcionalidade de gravação de chamada. Contacte o administrador da conta."), _defineProperty(_webphoneErrors$conne, _webphoneErrors["default"].transferError, "Não é possível transferir a chamada. Tente novamente mais tarde."), _defineProperty(_webphoneErrors$conne, _webphoneMessages["default"].parked, "A sua chamada está no ponto de espera no local: {parkedNumber}"), _defineProperty(_webphoneErrors$conne, "failWithStatusCode", "Lamentamos, mas ocorreu um erro: {errorCode}. Se o problema persistir, comunique este erro ao suporte do {brandName}."), _defineProperty(_webphoneErrors$conne, "registeringWithStatusCode", "Lamentamos, mas ocorreu um erro. Estamos a tentar restabelecer a ligação. Se o problema persistir, comunique este erro ao suporte do {brandName}. Código de erro: {errorCode}."), _defineProperty(_webphoneErrors$conne, "failWithoutStatusCode", "Lamentamos, mas ocorreu um erro do nosso lado. Se o erro persistir, comunique este erro ao suporte do {brandName}."), _defineProperty(_webphoneErrors$conne, "registeringWithoutStatusCode", "Lamentamos, mas ocorreu um erro. Estamos a tentar restabelecer a ligação. Se o problema persistir, comunique este erro ao suporte do {brandName}."), _webphoneErrors$conne); // @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Sorry, phone features are currently unavailable. Please retry later. "@#@
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
exports["default"] = _default;
//# sourceMappingURL=pt-PT.js.map
