import callResults from 'ringcentral-integration/enums/callResults';
import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatus';
import callDirections from 'ringcentral-integration/enums/callDirections';
export default {
  [callDirections.inbound]: "Entrant",
  [callDirections.outbound]: "Sortant",
  status: "Statut :",
  InboundNumber: "Identifiant de l'appelant :",
  OutboundNumber: "A appelé :",
  InboundDirection: "Appel entrant de :",
  OutboundDirection: "Appel sortant à :",
  [telephonyStatuses.noCall]: "Déconnecté",
  [telephonyStatuses.callConnected]: "Connecté",
  [telephonyStatuses.ringing]: "Sonnerie en cours",
  [telephonyStatuses.onHold]: "En attente",
  [telephonyStatuses.parkedCall]: "Parqué",
  [callResults.unknown]: "Inconnu",
  [callResults.missed]: "Manqué",
  [callResults.callAccepted]: "Réponse obtenue",
  [callResults.accepted]: "Réponse obtenue",
  [callResults.voicemail]: "Messagerie vocale",
  [callResults.rejected]: "Refusé",
  [callResults.reply]: "Répondre",
  [callResults.received]: "Reçu",
  [callResults.faxReceiptError]: "Erreur de réception du fax",
  [callResults.faxOnDemand]: "Fax à la demande",
  [callResults.partialReceive]: "Réception partielle",
  [callResults.blocked]: "Bloqué",
  [callResults.callConnected]: "Déconnecté",
  [callResults.noAnswer]: "Aucune réponse",
  [callResults.internationalDisabled]: "Appels internationaux désactivés",
  [callResults.busy]: "Occupé(e)",
  [callResults.faxSendError]: "Erreur d'envoi du fax",
  [callResults.sent]: "Envoyé",
  [callResults.callFailed]: "L'appel a échoué",
  [callResults.internalError]: "Erreur interne",
  [callResults.IPPhoneOffline]: "Téléphone IP hors ligne",
  [callResults.restrictedNumber]: "Numéro restreint",
  [callResults.wrongNumber]: "Mauvais numéro",
  [callResults.stopped]: "Interrompu",
  [callResults.suspendedAccount]: "Compte suspendu",
  [callResults.hangUp]: "Raccroché",
  [callResults.HangUp]: "Raccroché",
  [callResults.abandoned]: "Abandonné",
  [callResults.declined]: "Refusé",
  [callResults.faxReceipt]: "Réception du fax",
  [callResults.disconnected]: "Déconnecté"
};

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
