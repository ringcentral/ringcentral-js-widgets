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

exports.default = (_callDirections$inbou = {}, (0, _defineProperty3.default)(_callDirections$inbou, _callDirections2.default.inbound, "Entrant"), (0, _defineProperty3.default)(_callDirections$inbou, _callDirections2.default.outbound, "Sortant"), (0, _defineProperty3.default)(_callDirections$inbou, 'status', "État :"), (0, _defineProperty3.default)(_callDirections$inbou, 'InboundNumber', "Afficheur :"), (0, _defineProperty3.default)(_callDirections$inbou, 'OutboundNumber', "A appelé :"), (0, _defineProperty3.default)(_callDirections$inbou, 'InboundDirection', "Appel entrant de :"), (0, _defineProperty3.default)(_callDirections$inbou, 'OutboundDirection', "Appel sortant à :"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.noCall, "Déconnecté"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.callConnected, "Connecté"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.ringing, "Sonnerie en cours"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.onHold, "En attente"), (0, _defineProperty3.default)(_callDirections$inbou, _telephonyStatus2.default.parkedCall, "Mise en garde"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.unknown, "Inconnu"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.missed, "Manqué"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callAccepted, "réponse obtenue"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.accepted, "réponse obtenue"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.voicemail, "Messagerie vocale"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.rejected, "Refusé"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.reply, "Répondre"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.received, "Reçu"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxReceiptError, "Erreur de réception de fax"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxOnDemand, "Fax sur demande"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.partialReceive, "Réception partielle"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.blocked, "Bloqué"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callConnected, "Déconnecté"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.noAnswer, "Aucune réponse"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.internationalDisabled, "Appels internationaux désactivés"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.busy, "Occupé"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxSendError, "Erreur d'envoi de fax"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.sent, "Envoyé"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.callFailed, "L'appel a échoué"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.internalError, "Erreur interne"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.IPPhoneOffline, "Téléphone IP hors ligne"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.restrictedNumber, "Numéro restreint"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.wrongNumber, "Mauvais numéro"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.stopped, "Interrompu"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.suspendedAccount, "Compte suspendu"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.hangUp, "Raccroché"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.HangUp, "Raccroché"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.abandoned, "Abandonné"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.declined, "Refusé"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.faxReceipt, "Réception de fax"), (0, _defineProperty3.default)(_callDirections$inbou, _callResults2.default.disconnected, "Déconnecté"), _callDirections$inbou);

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
//# sourceMappingURL=fr-CA.js.map
