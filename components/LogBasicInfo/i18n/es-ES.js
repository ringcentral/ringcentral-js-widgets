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

exports.default = (_callDirections$inbou = {}, (0, _defineProperty3.default)(_callDirections$inbou, _callDirections2.default.inbound, "Entrantes"), (0, _defineProperty3.default)(_callDirections$inbou, _callDirections2.default.outbound, "Salientes"), (0, _defineProperty3.default)(_callDirections$inbou, 'status', "Estado:"), (0, _defineProperty3.default)(_callDirections$inbou, 'InboundNumber', "ID de llamadas:"), (0, _defineProperty3.default)(_callDirections$inbou, 'OutboundNumber', "Llamada de:"), (0, _defineProperty3.default)(_callDirections$inbou, 'InboundDirection', "Llamada entrante de:"), (0, _defineProperty3.default)(_callDirections$inbou, 'OutboundDirection', "Llamada saliente a:"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.noCall, "Desconectada"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.callConnected, "Conectada"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.ringing, "Llamando"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.onHold, "En espera"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.parkedCall, "Aparcada"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.unknown, "Desconocida"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.missed, "Perdida"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callAccepted, "Atendida"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.accepted, "Atendida"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.voicemail, "Mensaje de voz"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.rejected, "Rechazada"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.reply, "Responder"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.received, "Recibida"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxReceiptError, "Error de recepción de fax"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxOnDemand, "Fax a petición"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.partialReceive, "Recepción parcial"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.blocked, "Bloqueada"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callConnected, "Desconectada"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.noAnswer, "No hay respuesta"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.internationalDisabled, "Internacional desactivado"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.busy, "Ocupado"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxSendError, "Error de envío de fax"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.sent, "Enviado"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callFailed, "Error de llamada"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.internalError, "Error interno"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.IPPhoneOffline, "Teléfono IP desconectado"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.restrictedNumber, "Número restringido"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.wrongNumber, "Número incorrecto"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.stopped, "Detenido"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.suspendedAccount, "Cuenta suspendida"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.hangUp, "Colgada"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.HangUp, "Colgada"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.abandoned, "Abandonada"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.declined, "Rechazada"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxReceipt, "Fax recibido"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.disconnected, "Desconectada"), _callDirections$inbou);

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
//# sourceMappingURL=es-ES.js.map
