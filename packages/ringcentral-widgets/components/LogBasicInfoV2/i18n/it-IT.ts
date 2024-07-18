import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import callResults from '@ringcentral-integration/commons/enums/callResults';
import telephonyStatuses from '@ringcentral-integration/commons/enums/telephonyStatus';
export default {
  [callDirections.inbound]: "In entrata",
  [callDirections.outbound]: "In uscita",
  status: "Stato:",
  InboundNumber: "ID chiamante:",
  OutboundNumber: "Chiamato:",
  InboundDirection: "In entrata da:",
  OutboundDirection: "In uscita verso:",
  [telephonyStatuses.noCall]: "Disconnessa",
  [telephonyStatuses.callConnected]: "Connessa",
  [telephonyStatuses.ringing]: "Chiamata in corso",
  [telephonyStatuses.onHold]: "In attesa",
  [telephonyStatuses.parkedCall]: "Parcheggiata",
  [callResults.unknown]: "Sconosciuto",
  [callResults.missed]: "Persa",
  [callResults.callAccepted]: "Risposta",
  [callResults.accepted]: "Risposta",
  [callResults.voicemail]: "Messaggio vocale",
  [callResults.rejected]: "Rifiutata",
  [callResults.reply]: "Risposta",
  [callResults.received]: "Ricevuti",
  [callResults.faxReceiptError]: "Errore di ricezione fax",
  [callResults.faxOnDemand]: "Fax on-demand",
  [callResults.partialReceive]: "Ricezione parziale",
  [callResults.blocked]: "Bloccata",
  [callResults.callConnected]: "Chiamata connessa",
  [callResults.noAnswer]: "Nessuna risposta",
  [callResults.internationalDisabled]: "Internazionale disabilitato",
  [callResults.busy]: "Occupato",
  [callResults.faxSendError]: "Errore di invio fax",
  [callResults.sent]: "Inviati",
  [callResults.callFailed]: "Chiamata non riuscita",
  [callResults.internalError]: "Errore interno",
  [callResults.IPPhoneOffline]: "Telefono IP offline",
  [callResults.restrictedNumber]: "Numero soggetto a restrizioni",
  [callResults.wrongNumber]: "Numero errato",
  [callResults.stopped]: "Interrotta",
  [callResults.suspendedAccount]: "Account sospeso",
  [callResults.hangUp]: "Riagganciata",
  [callResults.HangUp]: "Riagganciata",
  [callResults.abandoned]: "Abbandonata",
  [callResults.declined]: "Rifiutata",
  [callResults.faxReceipt]: "Ricezione fax",
  [callResults.disconnected]: "Disconnessa",
  [callResults.notAllowed]: "Non consentita",
  warmTransferSwitchCall: "Trasferisci chiamate",
  conferenceCall: "Conferenza telefonica",
  participants: "Partecipanti"
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
