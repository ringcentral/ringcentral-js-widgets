import callResults from 'ringcentral-integration/enums/callResults';
import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatus';
import callDirections from 'ringcentral-integration/enums/callDirections';

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
  [telephonyStatuses.ringing]: "Squillo",
  [telephonyStatuses.onHold]: "In attesa",
  [telephonyStatuses.parkedCall]: "Parcheggiata",
  [callResults.unknown]: "Sconosciuto",
  [callResults.missed]: "Persa",
  [callResults.callAccepted]: "Risposta",
  [callResults.accepted]: "Risposta",
  [callResults.voicemail]: "Segreteria telefonica",
  [callResults.rejected]: "Rifiutata",
  [callResults.reply]: "Rispondi",
  [callResults.received]: "Ricevuto",
  [callResults.faxReceiptError]: "Errore di ricezione fax",
  [callResults.faxOnDemand]: "Fax on-demand",
  [callResults.partialReceive]: "Ricezione parziale",
  [callResults.blocked]: "Bloccato",
  [callResults.callConnected]: "Disconnessa",
  [callResults.noAnswer]: "Nessuna risposta",
  [callResults.internationalDisabled]: "Internazionale disabilitato",
  [callResults.busy]: "Occupato",
  [callResults.faxSendError]: "Errore di invio fax",
  [callResults.sent]: "Inviato",
  [callResults.callFailed]: "Chiamata non riuscita",
  [callResults.internalError]: "Errore interno",
  [callResults.IPPhoneOffline]: "Telefono IP offline",
  [callResults.restrictedNumber]: "Numero soggetto a restrizioni",
  [callResults.wrongNumber]: "Numero errato",
  [callResults.stopped]: "Interrotto",
  [callResults.suspendedAccount]: "Account sospeso",
  [callResults.hangUp]: "Riagganciato",
  [callResults.HangUp]: "Riagganciato",
  [callResults.abandoned]: "Abbandonato",
  [callResults.declined]: "Rifiutato",
  [callResults.faxReceipt]: "Ricezione fax",
  [callResults.disconnected]: "Disconnesso"
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
