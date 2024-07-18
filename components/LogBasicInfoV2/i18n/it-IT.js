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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_callDirections$inbou = {}, _defineProperty(_callDirections$inbou, _callDirections["default"].inbound, "In entrata"), _defineProperty(_callDirections$inbou, _callDirections["default"].outbound, "In uscita"), _defineProperty(_callDirections$inbou, "status", "Stato:"), _defineProperty(_callDirections$inbou, "InboundNumber", "ID chiamante:"), _defineProperty(_callDirections$inbou, "OutboundNumber", "Chiamato:"), _defineProperty(_callDirections$inbou, "InboundDirection", "In entrata da:"), _defineProperty(_callDirections$inbou, "OutboundDirection", "In uscita verso:"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].noCall, "Disconnessa"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].callConnected, "Connessa"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].ringing, "Chiamata in corso"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].onHold, "In attesa"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].parkedCall, "Parcheggiata"), _defineProperty(_callDirections$inbou, _callResults["default"].unknown, "Sconosciuto"), _defineProperty(_callDirections$inbou, _callResults["default"].missed, "Persa"), _defineProperty(_callDirections$inbou, _callResults["default"].callAccepted, "Risposta"), _defineProperty(_callDirections$inbou, _callResults["default"].accepted, "Risposta"), _defineProperty(_callDirections$inbou, _callResults["default"].voicemail, "Messaggio vocale"), _defineProperty(_callDirections$inbou, _callResults["default"].rejected, "Rifiutata"), _defineProperty(_callDirections$inbou, _callResults["default"].reply, "Risposta"), _defineProperty(_callDirections$inbou, _callResults["default"].received, "Ricevuti"), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceiptError, "Errore di ricezione fax"), _defineProperty(_callDirections$inbou, _callResults["default"].faxOnDemand, "Fax on-demand"), _defineProperty(_callDirections$inbou, _callResults["default"].partialReceive, "Ricezione parziale"), _defineProperty(_callDirections$inbou, _callResults["default"].blocked, "Bloccata"), _defineProperty(_callDirections$inbou, _callResults["default"].callConnected, "Chiamata connessa"), _defineProperty(_callDirections$inbou, _callResults["default"].noAnswer, "Nessuna risposta"), _defineProperty(_callDirections$inbou, _callResults["default"].internationalDisabled, "Internazionale disabilitato"), _defineProperty(_callDirections$inbou, _callResults["default"].busy, "Occupato"), _defineProperty(_callDirections$inbou, _callResults["default"].faxSendError, "Errore di invio fax"), _defineProperty(_callDirections$inbou, _callResults["default"].sent, "Inviati"), _defineProperty(_callDirections$inbou, _callResults["default"].callFailed, "Chiamata non riuscita"), _defineProperty(_callDirections$inbou, _callResults["default"].internalError, "Errore interno"), _defineProperty(_callDirections$inbou, _callResults["default"].IPPhoneOffline, "Telefono IP offline"), _defineProperty(_callDirections$inbou, _callResults["default"].restrictedNumber, "Numero soggetto a restrizioni"), _defineProperty(_callDirections$inbou, _callResults["default"].wrongNumber, "Numero errato"), _defineProperty(_callDirections$inbou, _callResults["default"].stopped, "Interrotta"), _defineProperty(_callDirections$inbou, _callResults["default"].suspendedAccount, "Account sospeso"), _defineProperty(_callDirections$inbou, _callResults["default"].hangUp, "Riagganciata"), _defineProperty(_callDirections$inbou, _callResults["default"].HangUp, "Riagganciata"), _defineProperty(_callDirections$inbou, _callResults["default"].abandoned, "Abbandonata"), _defineProperty(_callDirections$inbou, _callResults["default"].declined, "Rifiutata"), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceipt, "Ricezione fax"), _defineProperty(_callDirections$inbou, _callResults["default"].disconnected, "Disconnessa"), _defineProperty(_callDirections$inbou, _callResults["default"].notAllowed, "Non consentita"), _defineProperty(_callDirections$inbou, "warmTransferSwitchCall", "Trasferisci chiamate"), _defineProperty(_callDirections$inbou, "conferenceCall", "Conferenza telefonica"), _defineProperty(_callDirections$inbou, "participants", "Partecipanti"), _callDirections$inbou); // @key: @#@"[callDirections.inbound]"@#@ @source: @#@"Inbound"@#@
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
// @key: @#@"conferenceCall"@#@ @source: @#@"Conference Call"@#@
// @key: @#@"participants"@#@ @source: @#@"Participants"@#@
exports["default"] = _default;
//# sourceMappingURL=it-IT.js.map
