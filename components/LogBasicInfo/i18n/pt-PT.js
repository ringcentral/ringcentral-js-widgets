"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callResults = _interopRequireDefault(require("ringcentral-integration/enums/callResults"));

var _telephonyStatus = _interopRequireDefault(require("ringcentral-integration/enums/telephonyStatus"));

var _callDirections = _interopRequireDefault(require("ringcentral-integration/enums/callDirections"));

var _callDirections$inbou;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_callDirections$inbou = {}, _defineProperty(_callDirections$inbou, _callDirections["default"].inbound, "Recebidas"), _defineProperty(_callDirections$inbou, _callDirections["default"].outbound, "Efetuadas"), _defineProperty(_callDirections$inbou, "status", "Estado:"), _defineProperty(_callDirections$inbou, "InboundNumber", "ID do autor da chamada:"), _defineProperty(_callDirections$inbou, "OutboundNumber", "Marcado:"), _defineProperty(_callDirections$inbou, "InboundDirection", "Recebida de:"), _defineProperty(_callDirections$inbou, "OutboundDirection", "Efetuada para:"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].noCall, "Desligado"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].callConnected, "Ligado"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].ringing, "A chamar"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].onHold, "Em espera"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].parkedCall, "Ponto de espera"), _defineProperty(_callDirections$inbou, _callResults["default"].unknown, "Desconhecido"), _defineProperty(_callDirections$inbou, _callResults["default"].missed, "Perdida"), _defineProperty(_callDirections$inbou, _callResults["default"].callAccepted, "Atendida"), _defineProperty(_callDirections$inbou, _callResults["default"].accepted, "Atendida"), _defineProperty(_callDirections$inbou, _callResults["default"].voicemail, "Correio de voz"), _defineProperty(_callDirections$inbou, _callResults["default"].rejected, "Recusada"), _defineProperty(_callDirections$inbou, _callResults["default"].reply, "Responder"), _defineProperty(_callDirections$inbou, _callResults["default"].received, "Recebido"), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceiptError, "Erro de receção de fax"), _defineProperty(_callDirections$inbou, _callResults["default"].faxOnDemand, "Fax por subscrição"), _defineProperty(_callDirections$inbou, _callResults["default"].partialReceive, "Receção parcial"), _defineProperty(_callDirections$inbou, _callResults["default"].blocked, "Bloqueado"), _defineProperty(_callDirections$inbou, _callResults["default"].callConnected, "Chamada ligada"), _defineProperty(_callDirections$inbou, _callResults["default"].noAnswer, "Sem resposta"), _defineProperty(_callDirections$inbou, _callResults["default"].internationalDisabled, "Internacional desativado"), _defineProperty(_callDirections$inbou, _callResults["default"].busy, "Ocupado"), _defineProperty(_callDirections$inbou, _callResults["default"].faxSendError, "Erro de envio de fax"), _defineProperty(_callDirections$inbou, _callResults["default"].sent, "Enviado"), _defineProperty(_callDirections$inbou, _callResults["default"].callFailed, "Chamada falhada"), _defineProperty(_callDirections$inbou, _callResults["default"].internalError, "Erro interno"), _defineProperty(_callDirections$inbou, _callResults["default"].IPPhoneOffline, "Telefone IP offline"), _defineProperty(_callDirections$inbou, _callResults["default"].restrictedNumber, "Número restrito"), _defineProperty(_callDirections$inbou, _callResults["default"].wrongNumber, "Número errado"), _defineProperty(_callDirections$inbou, _callResults["default"].stopped, "Parado"), _defineProperty(_callDirections$inbou, _callResults["default"].suspendedAccount, "Conta suspensa"), _defineProperty(_callDirections$inbou, _callResults["default"].hangUp, "Desligada"), _defineProperty(_callDirections$inbou, _callResults["default"].HangUp, "Desligada"), _defineProperty(_callDirections$inbou, _callResults["default"].abandoned, "Abandonada"), _defineProperty(_callDirections$inbou, _callResults["default"].declined, "Recusada"), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceipt, "Recibo de fax"), _defineProperty(_callDirections$inbou, _callResults["default"].disconnected, "Desligado"), _callDirections$inbou); // @key: @#@"[callDirections.inbound]"@#@ @source: @#@"Inbound"@#@
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


exports["default"] = _default;
//# sourceMappingURL=pt-PT.js.map
