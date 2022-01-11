import callResults from '@ringcentral-integration/commons/enums/callResults';
import telephonyStatuses from '@ringcentral-integration/commons/enums/telephonyStatus';
import callDirections from '@ringcentral-integration/commons/enums/callDirections';
export default {
  [callDirections.inbound]: "Inkomend",
  [callDirections.outbound]: "Uitgaand",
  status: "Status:",
  InboundNumber: "Beller-ID:",
  OutboundNumber: "Gebeld:",
  InboundDirection: "Inkomend van:",
  OutboundDirection: "Uitgaand naar:",
  [telephonyStatuses.noCall]: "Verbinding verbroken",
  [telephonyStatuses.callConnected]: "Verbonden",
  [telephonyStatuses.ringing]: "Gaat over",
  [telephonyStatuses.onHold]: "In de wacht",
  [telephonyStatuses.parkedCall]: "Geparkeerd",
  [callResults.unknown]: "Onbekend",
  [callResults.missed]: "Gemist",
  [callResults.callAccepted]: "Beantwoord",
  [callResults.accepted]: "Beantwoord",
  [callResults.voicemail]: "Voicemail",
  [callResults.rejected]: "Geweigerd",
  [callResults.reply]: "Beantwoorden",
  [callResults.received]: "Ontvangen",
  [callResults.faxReceiptError]: "Fout bij ontvangst van fax",
  [callResults.faxOnDemand]: "Fax op aanvraag",
  [callResults.partialReceive]: "Gedeeltelijke ontvangst",
  [callResults.blocked]: "Geblokkeerd",
  [callResults.callConnected]: "Oproep verbonden",
  [callResults.noAnswer]: "Geen antwoord",
  [callResults.internationalDisabled]: "Internationaal uitgeschakeld",
  [callResults.busy]: "Bezet",
  [callResults.faxSendError]: "Fout bij verzenden van fax",
  [callResults.sent]: "Verzonden",
  [callResults.callFailed]: "Oproep mislukt",
  [callResults.internalError]: "Interne fout",
  [callResults.IPPhoneOffline]: "IP-telefoon offline",
  [callResults.restrictedNumber]: "Beperkt nummer",
  [callResults.wrongNumber]: "Verkeerd nummer",
  [callResults.stopped]: "Gestopt",
  [callResults.suspendedAccount]: "Opgeheven account",
  [callResults.hangUp]: "Opgehangen",
  [callResults.HangUp]: "Opgehangen",
  [callResults.abandoned]: "Verlaten",
  [callResults.declined]: "Geweigerd",
  [callResults.faxReceipt]: "Faxbewijs",
  [callResults.disconnected]: "Verbinding verbroken",
  [callResults.notAllowed]: "Niet toegestaan"
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
