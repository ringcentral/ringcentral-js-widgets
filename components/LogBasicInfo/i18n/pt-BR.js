'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _callDirections$inbou;

var _callResults = require('ringcentral-integration/enums/callResults');

var _callResults2 = _interopRequireDefault(_callResults);

var _telephonyStatus = require('ringcentral-integration/enums/telephonyStatus');

var _telephonyStatus2 = _interopRequireDefault(_telephonyStatus);

var _callDirections = require('ringcentral-integration/enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_callDirections$inbou = {}, (0, _defineProperty3.default)(_callDirections$inbou, _callDirections2.default.inbound, "Entrada"), (0, _defineProperty3.default)(_callDirections$inbou, _callDirections2.default.outbound, "Saída"), (0, _defineProperty3.default)(_callDirections$inbou, 'status', "Status:"), (0, _defineProperty3.default)(_callDirections$inbou, 'InboundNumber', "ID do autor da chamada:"), (0, _defineProperty3.default)(_callDirections$inbou, 'OutboundNumber', "Ligou para:"), (0, _defineProperty3.default)(_callDirections$inbou, 'InboundDirection', "Chamada de entrada de:"), (0, _defineProperty3.default)(_callDirections$inbou, 'OutboundDirection', "Chamada de saída para:"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.noCall, "Desconectado"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.callConnected, "Conectado"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.ringing, "Toque"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.onHold, "Em espera"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.parkedCall, "Estacionadas"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.unknown, "Desconhecidas"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.missed, "Perdidas"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callAccepted, "Atendidas"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.accepted, "Atendidas"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.voicemail, "Caixa postal"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.rejected, "Recusadas"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.reply, "Responder"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.received, "Recebidos"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxReceiptError, "Erro de recebimento de fax"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxOnDemand, "Fax sob demanda"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.partialReceive, "Recebimento parcial"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.blocked, "Bloqueado"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callConnected, "Desconectado"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.noAnswer, "Sem resposta"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.internationalDisabled, "Desativado internacionalmente"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.busy, "Ocupado"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxSendError, "Erro de envio de fax"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.sent, "Enviado"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callFailed, "Falha na chamada"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.internalError, "Erro interno"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.IPPhoneOffline, "Telefone IP offline"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.restrictedNumber, "Número restrito"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.wrongNumber, "Número errado"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.stopped, "Parado"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.suspendedAccount, "Conta suspensa"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.hangUp, "Desligar"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.HangUp, "Desligar"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.abandoned, "Abandonadas"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.declined, "Recusadas"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxReceipt, "Recebimento de fax"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.disconnected, "Desconectado"), _callDirections$inbou);

// @key: @#@"[callDirections.inbound]"@#@ @source: @#@"Inbound"@#@
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
// @key: @#@"[callResults.callConnected]"@#@ @source: @#@"Disconnected"@#@
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
//# sourceMappingURL=pt-BR.js.map
