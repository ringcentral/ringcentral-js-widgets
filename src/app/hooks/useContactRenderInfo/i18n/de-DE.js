"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* eslint-disable */
var _default = exports["default"] = {
  to: 'Für',
  from: 'Von',
  ext: 'Nebenst.',
  myCallerId: 'Eigene Anrufer-ID',
  callerId: 'Anrufer-ID',
  unknownNumber: 'Unbekannt',
  Inbound: 'Eingehender Anruf',
  Outbound: 'Ausgehender Anruf',
  activeCall: 'Aktiver Anruf',
  otherDevice: 'Auf einem anderen Gerät',
  onHold: 'Gehalten',
  day: 'Tag',
  hr: 'Std.',
  min: 'Min.',
  sec: 'Sek.',
  yesterday: 'Gestern',
  notes: 'AI-Anmerkungen',
  logged: 'Protokolliert',
  unlogged: 'Nicht protokolliert',
  answeredBy: 'Beantwortet von',
  conferenceCall: 'Telefonkonferenz',
  copyNumberSuccess: 'Nummer kopiert',
  // #region call status
  '911': '911',
  '933': '933',
  Abandoned: 'Abgebrochen',
  Accepted: 'Angenommen',
  'Answered Not Accepted': 'Beantwortet – nicht angenommen',
  Blocked: 'Blockiert',
  Busy: 'Besetzt',
  'Call Failed': 'Anruf fehlgeschlagen',
  'Call Failure': 'Anruffehler',
  'Call connected': 'Anruf verbunden',
  'Carrier is not active': 'Netzbetreiber ist nicht aktiv',
  Declined: 'Abgelehnt',
  'EDGE trunk misconfigured': 'EDGE-Trunk falsch konfiguriert',
  'Fax Not Sent': 'Fax nicht gesendet',
  'Fax Partially Sent': 'Fax teilweise gesendet',
  'Fax Poor Line': 'Fax schlechte Verbindung',
  'Fax Receipt Error': 'Faxempfangsfehler',
  'Fax on Demand': 'Fax bei Bedarf',
  'Hang Up': 'Auflegen',
  'IP Phone Offline': 'IP-Telefon offline',
  'In Progress': 'In Verarbeitung',
  'Internal Error': 'Interner Fehler',
  'International Disabled': 'International deaktiviert',
  'International Restricted': 'International eingeschränkt',
  Missed: 'Verpasst',
  'No Answer': 'Keine Antwort',
  'No Calling Credit': 'Kein Gesprächsguthaben',
  'Not Allowed': 'Nicht zulässig',
  'Partial Receive': 'Teilweise empfangen',
  'Phone Login': 'Telefonanmeldung',
  'Receive Error': 'Empfangsfehler',
  Received: 'Empfangen',
  Rejected: 'Abgelehnt',
  Reply: 'Antworten',
  'Restricted Number': 'Geheimnummer',
  'Send Error': 'Sendefehler',
  Sent: 'Gesendet',
  'Sent to Voicemail': 'An Voicemail senden',
  Stopped: 'Angehalten',
  'Suspended account': 'Gesperrtes Konto',
  Unknown: 'Unbekannt',
  Voicemail: 'Mailboxnachricht',
  'Wrong Number': 'Falsche Nummer',
  // some fields are not in the platform list
  'Answered Elsewhere': 'An anderer Stelle beantwortet',
  'Ringing Elsewhere': 'Es klingelt woanders',
  'Fax Send Error': 'Faxsendefehler',
  Account: 'Konto',
  'Call accepted': 'Anruf angenommen',
  'Hang up': 'Auflegen',
  'International Restriction': 'Internationale Einschränkung',
  'No fax machine': 'Kein Faxgerät',
  'Partially Sent': 'Teilweise gesendet',
  'Poor Line Quality': 'Schlechte Leitung',
  ResultEmpty: 'leer',
  ResultInProgress: 'In Verarbeitung',
  Suspended: 'Gesperrt',
  'Fax Receipt': 'Faxempfang',
  'Suspended Account': 'Gesperrtes Konto',
  Disconnected: 'Getrennt',
  multiMatchesContactName: '{name} und {count} weitere',
  // #endregion call status
  matches: '{numberOfMatches} Übereinstimmungen',
  maybe: 'Vielleicht: {contactName}',
  optedOut: 'Empfänger hat sich abgemeldet',
  optOutAlertTooltip: 'Der Empfänger muss sich erneut anmelden, um Textnachrichten von dieser Nummer zu erhalten.'
}; // @key: @#@"to"@#@ @source: @#@"To"@#@
// @key: @#@"from"@#@ @source: @#@"From"@#@
// @key: @#@"ext"@#@ @source: @#@"Ext."@#@
// @key: @#@"myCallerId"@#@ @source: @#@"My caller ID"@#@
// @key: @#@"callerId"@#@ @source: @#@"Caller ID"@#@
// @key: @#@"unknownNumber"@#@ @source: @#@"Unknown"@#@
// @key: @#@"Inbound"@#@ @source: @#@"Incoming call"@#@
// @key: @#@"Outbound"@#@ @source: @#@"Outgoing call"@#@
// @key: @#@"activeCall"@#@ @source: @#@"Active call"@#@
// @key: @#@"otherDevice"@#@ @source: @#@"On other device"@#@
// @key: @#@"onHold"@#@ @source: @#@"On hold"@#@
// @key: @#@"day"@#@ @source: @#@"day"@#@
// @key: @#@"hr"@#@ @source: @#@"hr"@#@
// @key: @#@"min"@#@ @source: @#@"min"@#@
// @key: @#@"sec"@#@ @source: @#@"sec"@#@
// @key: @#@"yesterday"@#@ @source: @#@"Yesterday"@#@
// @key: @#@"notes"@#@ @source: @#@"AI notes"@#@
// @key: @#@"logged"@#@ @source: @#@"Logged"@#@
// @key: @#@"unlogged"@#@ @source: @#@"Unlogged"@#@
// @key: @#@"answeredBy"@#@ @source: @#@"Answered by"@#@
// @key: @#@"conferenceCall"@#@ @source: @#@"Conference Call"@#@
// @key: @#@"copyNumberSuccess"@#@ @source: @#@"Number copied"@#@
// @key: @#@"'911'"@#@ @source: @#@"911"@#@
// @key: @#@"'933'"@#@ @source: @#@"933"@#@
// @key: @#@"Abandoned"@#@ @source: @#@"Abandoned"@#@
// @key: @#@"Accepted"@#@ @source: @#@"Accepted"@#@
// @key: @#@"'Answered Not Accepted'"@#@ @source: @#@"Answered Not Accepted"@#@
// @key: @#@"Blocked"@#@ @source: @#@"Blocked"@#@
// @key: @#@"Busy"@#@ @source: @#@"Busy"@#@
// @key: @#@"'Call Failed'"@#@ @source: @#@"Call Failed"@#@
// @key: @#@"'Call Failure'"@#@ @source: @#@"Call Failure"@#@
// @key: @#@"'Call connected'"@#@ @source: @#@"Call connected"@#@
// @key: @#@"'Carrier is not active'"@#@ @source: @#@"Carrier is not active"@#@
// @key: @#@"Declined"@#@ @source: @#@"Declined"@#@
// @key: @#@"'EDGE trunk misconfigured'"@#@ @source: @#@"EDGE trunk misconfigured"@#@
// @key: @#@"'Fax Not Sent'"@#@ @source: @#@"Fax Not Sent"@#@
// @key: @#@"'Fax Partially Sent'"@#@ @source: @#@"Fax Partially Sent"@#@
// @key: @#@"'Fax Poor Line'"@#@ @source: @#@"Fax Poor Line"@#@
// @key: @#@"'Fax Receipt Error'"@#@ @source: @#@"Fax Receipt Error"@#@
// @key: @#@"'Fax on Demand'"@#@ @source: @#@"Fax on Demand"@#@
// @key: @#@"'Hang Up'"@#@ @source: @#@"Hang Up"@#@
// @key: @#@"'IP Phone Offline'"@#@ @source: @#@"IP Phone Offline"@#@
// @key: @#@"'In Progress'"@#@ @source: @#@"In Progress"@#@
// @key: @#@"'Internal Error'"@#@ @source: @#@"Internal Error"@#@
// @key: @#@"'International Disabled'"@#@ @source: @#@"International Disabled"@#@
// @key: @#@"'International Restricted'"@#@ @source: @#@"International Restricted"@#@
// @key: @#@"Missed"@#@ @source: @#@"Missed"@#@
// @key: @#@"'No Answer'"@#@ @source: @#@"No Answer"@#@
// @key: @#@"'No Calling Credit'"@#@ @source: @#@"No Calling Credit"@#@
// @key: @#@"'Not Allowed'"@#@ @source: @#@"Not Allowed"@#@
// @key: @#@"'Partial Receive'"@#@ @source: @#@"Partial Receive"@#@
// @key: @#@"'Phone Login'"@#@ @source: @#@"Phone Login"@#@
// @key: @#@"'Receive Error'"@#@ @source: @#@"Receive Error"@#@
// @key: @#@"Received"@#@ @source: @#@"Received"@#@
// @key: @#@"Rejected"@#@ @source: @#@"Rejected"@#@
// @key: @#@"Reply"@#@ @source: @#@"Reply"@#@
// @key: @#@"'Restricted Number'"@#@ @source: @#@"Restricted Number"@#@
// @key: @#@"'Send Error'"@#@ @source: @#@"Send Error"@#@
// @key: @#@"Sent"@#@ @source: @#@"Sent"@#@
// @key: @#@"'Sent to Voicemail'"@#@ @source: @#@"Sent to Voicemail"@#@
// @key: @#@"Stopped"@#@ @source: @#@"Stopped"@#@
// @key: @#@"'Suspended account'"@#@ @source: @#@"Suspended account"@#@
// @key: @#@"Unknown"@#@ @source: @#@"Unknown"@#@
// @key: @#@"Voicemail"@#@ @source: @#@"Voicemail"@#@
// @key: @#@"'Wrong Number'"@#@ @source: @#@"Wrong Number"@#@
// @key: @#@"'Answered Elsewhere'"@#@ @source: @#@"Answered elsewhere"@#@
// @key: @#@"'Ringing Elsewhere'"@#@ @source: @#@"Ringing elsewhere"@#@
// @key: @#@"'Fax Send Error'"@#@ @source: @#@"Fax Send Error"@#@
// @key: @#@"Account"@#@ @source: @#@"Account"@#@
// @key: @#@"'Call accepted'"@#@ @source: @#@"Call accepted"@#@
// @key: @#@"'Hang up'"@#@ @source: @#@"Hang up"@#@
// @key: @#@"'International Restriction'"@#@ @source: @#@"International Restriction"@#@
// @key: @#@"'No fax machine'"@#@ @source: @#@"No fax machine"@#@
// @key: @#@"'Partially Sent'"@#@ @source: @#@"Partially Sent"@#@
// @key: @#@"'Poor Line Quality'"@#@ @source: @#@"Poor Line Quality"@#@
// @key: @#@"ResultEmpty"@#@ @source: @#@"empty"@#@
// @key: @#@"ResultInProgress"@#@ @source: @#@"In Progress"@#@
// @key: @#@"Suspended"@#@ @source: @#@"Suspended"@#@
// @key: @#@"'Fax Receipt'"@#@ @source: @#@"Fax Receipt"@#@
// @key: @#@"'Suspended Account'"@#@ @source: @#@"Suspended Account"@#@
// @key: @#@"Disconnected"@#@ @source: @#@"Disconnected"@#@
// @key: @#@"multiMatchesContactName"@#@ @source: @#@"{name} and {count} more"@#@
// @key: @#@"matches"@#@ @source: @#@"{numberOfMatches} matches"@#@
// @key: @#@"maybe"@#@ @source: @#@"Maybe: {contactName}"@#@
// @key: @#@"optedOut"@#@ @source: @#@"Recipient has opted out."@#@
// @key: @#@"optOutAlertTooltip"@#@ @source: @#@"The recipient must opt back in to receive texts from this number."@#@
//# sourceMappingURL=de-DE.js.map
