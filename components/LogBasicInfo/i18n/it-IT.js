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

exports.default = (_callDirections$inbou = {}, (0, _defineProperty3.default)(_callDirections$inbou, _callDirections2.default.inbound, "In entrata"), (0, _defineProperty3.default)(_callDirections$inbou, _callDirections2.default.outbound, "In uscita"), (0, _defineProperty3.default)(_callDirections$inbou, 'status', "Stato:"), (0, _defineProperty3.default)(_callDirections$inbou, 'InboundNumber', "ID chiamante:"), (0, _defineProperty3.default)(_callDirections$inbou, 'OutboundNumber', "Chiamato:"), (0, _defineProperty3.default)(_callDirections$inbou, 'InboundDirection', "In entrata da:"), (0, _defineProperty3.default)(_callDirections$inbou, 'OutboundDirection', "In uscita verso:"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.noCall, "Disconnessa"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.callConnected, "Connessa"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.ringing, "Squillo"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.onHold, "Messa in attesa"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.parkedCall, "Parcheggiata"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.unknown, "Sconosciuto"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.missed, "Persa"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callAccepted, "Risposta"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.accepted, "Risposta"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.voicemail, "Segreteria telefonica"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.rejected, "Rifiutata"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.reply, "Rispondi"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.received, "Ricevuto"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxReceiptError, "Errore di ricezione fax"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxOnDemand, "Fax on-demand"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.partialReceive, "Ricezione parziale"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.blocked, "Bloccato"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callConnected, "Disconnesso"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.noAnswer, "Nessuna risposta"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.internationalDisabled, "Internazionale disabilitato"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.busy, "Occupato"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxSendError, "Errore di invio fax"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.sent, "Inviato"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callFailed, "Chiamata non riuscita"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.internalError, "Errore interno"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.IPPhoneOffline, "Telefono IP offline"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.restrictedNumber, "Numero soggetto a restrizioni"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.wrongNumber, "Numero errato"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.stopped, "Interrotto"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.suspendedAccount, "Account sospeso"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.hangUp, "Riagganciato"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.HangUp, "Riagganciato"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.abandoned, "Abbandonato"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.declined, "Rifiutato"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxReceipt, "Ricezione fax"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.disconnected, "Disconnesso"), _callDirections$inbou);

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
//# sourceMappingURL=it-IT.js.map
