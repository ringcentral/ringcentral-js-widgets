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
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _callResults = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callResults"));
var _telephonyStatus = _interopRequireDefault(require("@ringcentral-integration/commons/enums/telephonyStatus"));
var _callDirections$inbou;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_callDirections$inbou = {}, _defineProperty(_callDirections$inbou, _callDirections["default"].inbound, "Entrada"), _defineProperty(_callDirections$inbou, _callDirections["default"].outbound, "Saída"), _defineProperty(_callDirections$inbou, "status", "Status:"), _defineProperty(_callDirections$inbou, "InboundNumber", "ID da chamada:"), _defineProperty(_callDirections$inbou, "OutboundNumber", "Ligou para:"), _defineProperty(_callDirections$inbou, "InboundDirection", "Chamada de entrada de:"), _defineProperty(_callDirections$inbou, "OutboundDirection", "Chamada de saída para:"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].noCall, "Desconectada"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].callConnected, "Conectada"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].ringing, "Chamando"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].onHold, "Em espera"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].parkedCall, "Estacionadas"), _defineProperty(_callDirections$inbou, _callResults["default"].unknown, "Desconhecido"), _defineProperty(_callDirections$inbou, _callResults["default"].missed, "Perdida"), _defineProperty(_callDirections$inbou, _callResults["default"].callAccepted, "Atendida"), _defineProperty(_callDirections$inbou, _callResults["default"].accepted, "Atendida"), _defineProperty(_callDirections$inbou, _callResults["default"].voicemail, "Caixa postal"), _defineProperty(_callDirections$inbou, _callResults["default"].rejected, "Recusada"), _defineProperty(_callDirections$inbou, _callResults["default"].reply, "Responder"), _defineProperty(_callDirections$inbou, _callResults["default"].received, "Recebida"), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceiptError, "Erro de recebimento de fax"), _defineProperty(_callDirections$inbou, _callResults["default"].faxOnDemand, "Fax sob demanda"), _defineProperty(_callDirections$inbou, _callResults["default"].partialReceive, "Recebimento parcial"), _defineProperty(_callDirections$inbou, _callResults["default"].blocked, "Bloqueado"), _defineProperty(_callDirections$inbou, _callResults["default"].callConnected, "Chamada conectada"), _defineProperty(_callDirections$inbou, _callResults["default"].noAnswer, "Sem resposta"), _defineProperty(_callDirections$inbou, _callResults["default"].internationalDisabled, "Desativado internacionalmente"), _defineProperty(_callDirections$inbou, _callResults["default"].busy, "Ocupada"), _defineProperty(_callDirections$inbou, _callResults["default"].faxSendError, "Erro de envio de fax"), _defineProperty(_callDirections$inbou, _callResults["default"].sent, "Enviado"), _defineProperty(_callDirections$inbou, _callResults["default"].callFailed, "Falha na chamada"), _defineProperty(_callDirections$inbou, _callResults["default"].internalError, "Erro interno"), _defineProperty(_callDirections$inbou, _callResults["default"].IPPhoneOffline, "Telefone IP offline"), _defineProperty(_callDirections$inbou, _callResults["default"].restrictedNumber, "Número restrito"), _defineProperty(_callDirections$inbou, _callResults["default"].wrongNumber, "Número errado"), _defineProperty(_callDirections$inbou, _callResults["default"].stopped, "Parado"), _defineProperty(_callDirections$inbou, _callResults["default"].suspendedAccount, "Conta suspensa"), _defineProperty(_callDirections$inbou, _callResults["default"].hangUp, "Desligada"), _defineProperty(_callDirections$inbou, _callResults["default"].HangUp, "Desligada"), _defineProperty(_callDirections$inbou, _callResults["default"].abandoned, "Abandonada"), _defineProperty(_callDirections$inbou, _callResults["default"].declined, "Recusada"), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceipt, "Recebimento de fax"), _defineProperty(_callDirections$inbou, _callResults["default"].disconnected, "Desconectada"), _defineProperty(_callDirections$inbou, _callResults["default"].notAllowed, "Não permitida"), _defineProperty(_callDirections$inbou, "warmTransferSwitchCall", "Alternar chamadas"), _callDirections$inbou); // @key: @#@"[callDirections.inbound]"@#@ @source: @#@"Inbound"@#@
// @key: @#@"[callDirections.outbound]"@#@ @source: @#@"Outbound"@#@
// @key: @#@"status"@#@ @source: @#@"Status:"@#@
// @key: @#@"InboundNumber"@#@ @source: @#@"Caller Id:"@#@
// @key: @#@"OutboundNumber"@#@ @source: @#@"Called:"@#@
// @key: @#@"InboundDirection"@#@ @source: @#@"Inbound from:"@#@
// @key: @#@"OutboundDirection"@#@ @source: @#@"Outbound to:"@#@
// @key: @#@"[telephonyStatuses.noCall]"@#@ @source: @#@"Disconnected"@#@
// @key: @#@"[telephonyStatuses.callConnected]"@#@ @source: @#@"Connected"@#@
// @key: @#@"[telephonyStatuses.ringing]"@#@ @source: @#@"Ringing"@#@
// @key: @#@"[telephonyStatuses.onHold]"@#@ @source: @#@"On Hold"@#@
// @key: @#@"[telephonyStatuses.parkedCall]"@#@ @source: @#@"Parked"@#@
// @key: @#@"[callResults.unknown]"@#@ @source: @#@"Unknown"@#@
// @key: @#@"[callResults.missed]"@#@ @source: @#@"Missed"@#@
// @key: @#@"[callResults.callAccepted]"@#@ @source: @#@"Answered"@#@
// @key: @#@"[callResults.accepted]"@#@ @source: @#@"Answered"@#@
// @key: @#@"[callResults.voicemail]"@#@ @source: @#@"Voicemail"@#@
// @key: @#@"[callResults.rejected]"@#@ @source: @#@"Declined"@#@
// @key: @#@"[callResults.reply]"@#@ @source: @#@"Reply"@#@
// @key: @#@"[callResults.received]"@#@ @source: @#@"Received"@#@
// @key: @#@"[callResults.faxReceiptError]"@#@ @source: @#@"Fax Receipt Error"@#@
// @key: @#@"[callResults.faxOnDemand]"@#@ @source: @#@"Fax on Demand"@#@
// @key: @#@"[callResults.partialReceive]"@#@ @source: @#@"Partial Receive"@#@
// @key: @#@"[callResults.blocked]"@#@ @source: @#@"Blocked"@#@
// @key: @#@"[callResults.callConnected]"@#@ @source: @#@"Call connected"@#@
// @key: @#@"[callResults.noAnswer]"@#@ @source: @#@"No Answer"@#@
// @key: @#@"[callResults.internationalDisabled]"@#@ @source: @#@"International Disabled"@#@
// @key: @#@"[callResults.busy]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[callResults.faxSendError]"@#@ @source: @#@"Fax Send Error"@#@
// @key: @#@"[callResults.sent]"@#@ @source: @#@"Sent"@#@
// @key: @#@"[callResults.callFailed]"@#@ @source: @#@"Call Failed"@#@
// @key: @#@"[callResults.internalError]"@#@ @source: @#@"Internal Error"@#@
// @key: @#@"[callResults.IPPhoneOffline]"@#@ @source: @#@"IP Phone Offline"@#@
// @key: @#@"[callResults.restrictedNumber]"@#@ @source: @#@"Restricted Number"@#@
// @key: @#@"[callResults.wrongNumber]"@#@ @source: @#@"Wrong Number"@#@
// @key: @#@"[callResults.stopped]"@#@ @source: @#@"Stopped"@#@
// @key: @#@"[callResults.suspendedAccount]"@#@ @source: @#@"Suspended Account"@#@
// @key: @#@"[callResults.hangUp]"@#@ @source: @#@"Hung up"@#@
// @key: @#@"[callResults.HangUp]"@#@ @source: @#@"Hung up"@#@
// @key: @#@"[callResults.abandoned]"@#@ @source: @#@"Abandoned"@#@
// @key: @#@"[callResults.declined]"@#@ @source: @#@"Declined"@#@
// @key: @#@"[callResults.faxReceipt]"@#@ @source: @#@"Fax Receipt"@#@
// @key: @#@"[callResults.disconnected]"@#@ @source: @#@"Disconnected"@#@
// @key: @#@"[callResults.notAllowed]"@#@ @source: @#@"Not Allowed"@#@
// @key: @#@"warmTransferSwitchCall"@#@ @source: @#@"Switch calls"@#@
exports["default"] = _default;
//# sourceMappingURL=pt-BR.js.map
