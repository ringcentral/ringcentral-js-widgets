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

exports.default = (_callDirections$inbou = {}, (0, _defineProperty3.default)(_callDirections$inbou, _callDirections2.default.inbound, "Eingehend"), (0, _defineProperty3.default)(_callDirections$inbou, _callDirections2.default.outbound, "Ausgehend"), (0, _defineProperty3.default)(_callDirections$inbou, 'status', "Status:"), (0, _defineProperty3.default)(_callDirections$inbou, 'InboundNumber', "Rufnummernanzeige:"), (0, _defineProperty3.default)(_callDirections$inbou, 'OutboundNumber', "Angerufen:"), (0, _defineProperty3.default)(_callDirections$inbou, 'InboundDirection', "Eingehender Anruf von:"), (0, _defineProperty3.default)(_callDirections$inbou, 'OutboundDirection', "Ausgehender Anruf an:"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.noCall, "Getrennt"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.callConnected, "Verbunden"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.ringing, "Es wird angerufen"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.onHold, "Wird gehalten"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.parkedCall, "Geparkt"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.unknown, "Unbekannt"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.missed, "Verpasst"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callAccepted, "Beantwortet"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.accepted, "Beantwortet"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.voicemail, "Voicemail"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.rejected, "Abgelehnt"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.reply, "Antworten"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.received, "Empfangen"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxReceiptError, "Faxempfangsfehler"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxOnDemand, "Fax bei Bedarf"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.partialReceive, "Teilweise empfangen"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.blocked, "Blockiert"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callConnected, "Getrennt"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.noAnswer, "Keine Antwort"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.internationalDisabled, "International deaktiviert"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.busy, "Belegt"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxSendError, "Faxsendefehler"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.sent, "Gesendet"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callFailed, "Anruf fehlgeschlagen"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.internalError, "Interner Fehler"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.IPPhoneOffline, "IP-Telefon offline"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.restrictedNumber, "Geheimnummer"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.wrongNumber, "Falsche Nummer"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.stopped, "Angehalten"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.suspendedAccount, "Gesperrtes Konto"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.hangUp, "Aufgelegt"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.HangUp, "Aufgelegt"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.abandoned, "Abgebrochen"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.declined, "Abgelehnt"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxReceipt, "Faxempfang"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.disconnected, "Getrennt"), _callDirections$inbou);

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
//# sourceMappingURL=de-DE.js.map
