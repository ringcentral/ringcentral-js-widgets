"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callResults = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callResults"));

var _telephonyStatus = _interopRequireDefault(require("@ringcentral-integration/commons/enums/telephonyStatus"));

var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));

var _callDirections$inbou;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_callDirections$inbou = {}, _defineProperty(_callDirections$inbou, _callDirections["default"].inbound, "Entrant"), _defineProperty(_callDirections$inbou, _callDirections["default"].outbound, "Sortant"), _defineProperty(_callDirections$inbou, "status", "Statut :"), _defineProperty(_callDirections$inbou, "InboundNumber", "Identifiant de l'appelant :"), _defineProperty(_callDirections$inbou, "OutboundNumber", "A appelé :"), _defineProperty(_callDirections$inbou, "InboundDirection", "Appel entrant de :"), _defineProperty(_callDirections$inbou, "OutboundDirection", "Appel sortant à :"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].noCall, "Déconnecté"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].callConnected, "Connecté"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].ringing, "Sonnerie en cours"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].onHold, "En attente"), _defineProperty(_callDirections$inbou, _telephonyStatus["default"].parkedCall, "Parqué"), _defineProperty(_callDirections$inbou, _callResults["default"].unknown, "Inconnu"), _defineProperty(_callDirections$inbou, _callResults["default"].missed, "Manqué"), _defineProperty(_callDirections$inbou, _callResults["default"].callAccepted, "Réponse obtenue"), _defineProperty(_callDirections$inbou, _callResults["default"].accepted, "Réponse obtenue"), _defineProperty(_callDirections$inbou, _callResults["default"].voicemail, "Messagerie vocale"), _defineProperty(_callDirections$inbou, _callResults["default"].rejected, "Refusé"), _defineProperty(_callDirections$inbou, _callResults["default"].reply, "Répondre"), _defineProperty(_callDirections$inbou, _callResults["default"].received, "Reçu"), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceiptError, "Erreur de réception du fax"), _defineProperty(_callDirections$inbou, _callResults["default"].faxOnDemand, "Fax à la demande"), _defineProperty(_callDirections$inbou, _callResults["default"].partialReceive, "Réception partielle"), _defineProperty(_callDirections$inbou, _callResults["default"].blocked, "Bloqué"), _defineProperty(_callDirections$inbou, _callResults["default"].callConnected, "Appel connecté"), _defineProperty(_callDirections$inbou, _callResults["default"].noAnswer, "Aucune réponse"), _defineProperty(_callDirections$inbou, _callResults["default"].internationalDisabled, "Appels internationaux désactivés"), _defineProperty(_callDirections$inbou, _callResults["default"].busy, "Occupé(e)"), _defineProperty(_callDirections$inbou, _callResults["default"].faxSendError, "Erreur d'envoi du fax"), _defineProperty(_callDirections$inbou, _callResults["default"].sent, "Envoyé"), _defineProperty(_callDirections$inbou, _callResults["default"].callFailed, "L'appel a échoué"), _defineProperty(_callDirections$inbou, _callResults["default"].internalError, "Erreur interne"), _defineProperty(_callDirections$inbou, _callResults["default"].IPPhoneOffline, "Téléphone IP hors ligne"), _defineProperty(_callDirections$inbou, _callResults["default"].restrictedNumber, "Numéro restreint"), _defineProperty(_callDirections$inbou, _callResults["default"].wrongNumber, "Mauvais numéro"), _defineProperty(_callDirections$inbou, _callResults["default"].stopped, "Interrompu"), _defineProperty(_callDirections$inbou, _callResults["default"].suspendedAccount, "Compte suspendu"), _defineProperty(_callDirections$inbou, _callResults["default"].hangUp, "Raccroché"), _defineProperty(_callDirections$inbou, _callResults["default"].HangUp, "Raccroché"), _defineProperty(_callDirections$inbou, _callResults["default"].abandoned, "Abandonné"), _defineProperty(_callDirections$inbou, _callResults["default"].declined, "Refusé"), _defineProperty(_callDirections$inbou, _callResults["default"].faxReceipt, "Réception du fax"), _defineProperty(_callDirections$inbou, _callResults["default"].disconnected, "Déconnecté"), _defineProperty(_callDirections$inbou, _callResults["default"].notAllowed, "Non autorisé"), _callDirections$inbou); // @key: @#@"[callDirections.inbound]"@#@ @source: @#@"Inbound"@#@
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
//# sourceMappingURL=fr-FR.js.map
