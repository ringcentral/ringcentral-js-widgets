import callResults from 'ringcentral-integration/enums/callResults';
import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatus';
import callDirections from 'ringcentral-integration/enums/callDirections';
export default {
  [callDirections.inbound]: "Eingehend",
  [callDirections.outbound]: "Ausgehend",
  status: "Status:",
  InboundNumber: "Rufnummernanzeige:",
  OutboundNumber: "Angerufen:",
  InboundDirection: "Eingehender Anruf von:",
  OutboundDirection: "Ausgehender Anruf an:",
  [telephonyStatuses.noCall]: "Getrennt",
  [telephonyStatuses.callConnected]: "Verbunden",
  [telephonyStatuses.ringing]: "Es wird angerufen",
  [telephonyStatuses.onHold]: "Gehalten",
  [telephonyStatuses.parkedCall]: "Geparkt",
  [callResults.unknown]: "Unbekannt",
  [callResults.missed]: "Verpasst",
  [callResults.callAccepted]: "Beantwortet",
  [callResults.accepted]: "Beantwortet",
  [callResults.voicemail]: "Voicemail",
  [callResults.rejected]: "Abgelehnt",
  [callResults.reply]: "Antworten",
  [callResults.received]: "Empfangen",
  [callResults.faxReceiptError]: "Faxempfangsfehler",
  [callResults.faxOnDemand]: "Fax bei Bedarf",
  [callResults.partialReceive]: "Teilweise empfangen",
  [callResults.blocked]: "Blockiert",
  [callResults.callConnected]: "Anruf verbunden",
  [callResults.noAnswer]: "Keine Antwort",
  [callResults.internationalDisabled]: "International deaktiviert",
  [callResults.busy]: "Belegt",
  [callResults.faxSendError]: "Faxsendefehler",
  [callResults.sent]: "Gesendet",
  [callResults.callFailed]: "Anruf fehlgeschlagen",
  [callResults.internalError]: "Interner Fehler",
  [callResults.IPPhoneOffline]: "IP-Telefon offline",
  [callResults.restrictedNumber]: "Geheimnummer",
  [callResults.wrongNumber]: "Falsche Nummer",
  [callResults.stopped]: "Angehalten",
  [callResults.suspendedAccount]: "Gesperrtes Konto",
  [callResults.hangUp]: "Aufgelegt",
  [callResults.HangUp]: "Aufgelegt",
  [callResults.abandoned]: "Abgebrochen",
  [callResults.declined]: "Abgelehnt",
  [callResults.faxReceipt]: "Faxempfang",
  [callResults.disconnected]: "Getrennt"
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
