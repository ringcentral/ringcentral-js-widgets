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

var _default = (_callDirections$inbou = {}, _defineProperty(_callDirections$inbou, _callDirections["default"].inbound, "Eingehend"), _defineProperty(_callDirections$inbou, _callDirections["default"].outbound, "Ausgehend"), _defineProperty(_callDirections$inbou, "status", "Status:"), _defineProperty(_callDirections$inbou, "InboundNumber", "Rufnummernanzeige:"), _defineProperty(_callDirections$inbou, "OutboundNumber", "Angerufen:"), _defineProperty(_callDirections$inbou, "InboundDirection", "Eingehender Anruf von:"), _defineProperty(_callDirections$inbou, "OutboundDirection", "Ausgehender Anruf an:"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].noCall, "Getrennt"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].callConnected, "Verbunden"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].ringing, "Es wird angerufen"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].onHold, "Gehalten"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].parkedCall, "Geparkt"), _defineProperty(_callDirections$inbou, _callResults["default"].unknown, "Unbekannt"), _defineProperty(_callDirections$inbou, _callResults["default"].missed, "Verpasst"), _defineProperty(_callDirections$inbou, _callResults["default"].callAccepted, "Beantwortet"), _defineProperty(_callDirections$inbou, _callResults["default"].accepted, "Beantwortet"), _defineProperty(_callDirections$inbou, _callResults["default"].voicemail, "Voicemail"), _defineProperty(_callDirections$inbou, _callResults["default"].rejected, "Abgelehnt"), _defineProperty(_callDirections$inbou, _callResults["default"].reply, "Antworten"), _defineProperty(_callDirections$inbou, _callResults["default"].received, "Empfangen"), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceiptError, "Faxempfangsfehler"), _defineProperty(_callDirections$inbou, _callResults["default"].faxOnDemand, "Fax bei Bedarf"), _defineProperty(_callDirections$inbou, _callResults["default"].partialReceive, "Teilweise empfangen"), _defineProperty(_callDirections$inbou, _callResults["default"].blocked, "Blockiert"), _defineProperty(_callDirections$inbou, _callResults["default"].callConnected, "Anruf verbunden"), _defineProperty(_callDirections$inbou, _callResults["default"].noAnswer, "Keine Antwort"), _defineProperty(_callDirections$inbou, _callResults["default"].internationalDisabled, "International deaktiviert"), _defineProperty(_callDirections$inbou, _callResults["default"].busy, "Belegt"), _defineProperty(_callDirections$inbou, _callResults["default"].faxSendError, "Faxsendefehler"), _defineProperty(_callDirections$inbou, _callResults["default"].sent, "Gesendet"), _defineProperty(_callDirections$inbou, _callResults["default"].callFailed, "Anruf fehlgeschlagen"), _defineProperty(_callDirections$inbou, _callResults["default"].internalError, "Interner Fehler"), _defineProperty(_callDirections$inbou, _callResults["default"].IPPhoneOffline, "IP-Telefon offline"), _defineProperty(_callDirections$inbou, _callResults["default"].restrictedNumber, "Geheimnummer"), _defineProperty(_callDirections$inbou, _callResults["default"].wrongNumber, "Falsche Nummer"), _defineProperty(_callDirections$inbou, _callResults["default"].stopped, "Angehalten"), _defineProperty(_callDirections$inbou, _callResults["default"].suspendedAccount, "Gesperrtes Konto"), _defineProperty(_callDirections$inbou, _callResults["default"].hangUp, "Aufgelegt"), _defineProperty(_callDirections$inbou, _callResults["default"].HangUp, "Aufgelegt"), _defineProperty(_callDirections$inbou, _callResults["default"].abandoned, "Abgebrochen"), _defineProperty(_callDirections$inbou, _callResults["default"].declined, "Abgelehnt"), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceipt, "Faxempfang"), _defineProperty(_callDirections$inbou, _callResults["default"].disconnected, "Getrennt"), _defineProperty(_callDirections$inbou, _callResults["default"].notAllowed, "Nicht zulässig"), _callDirections$inbou); // @key: @#@"[callDirections.inbound]"@#@ @source: @#@"Inbound"@#@
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


exports["default"] = _default;
//# sourceMappingURL=de-DE.js.map
