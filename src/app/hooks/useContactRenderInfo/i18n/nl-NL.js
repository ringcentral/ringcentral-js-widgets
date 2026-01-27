"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* eslint-disable */
var _default = exports["default"] = {
  to: 'Aan',
  from: 'Van',
  ext: 'Extensie',
  myCallerId: 'Mijn beller-ID',
  callerId: 'Beller-ID',
  unknownNumber: 'Onbekend',
  Inbound: 'Inkomende oproep',
  Outbound: 'Uitgaande oproep',
  activeCall: 'Actieve oproep',
  otherDevice: 'Op ander apparaat',
  onHold: 'In de wacht',
  day: 'dag',
  hr: 'uur',
  min: 'min',
  sec: 's',
  yesterday: 'Gisteren',
  notes: 'AI-notities',
  logged: 'Geregistreerd',
  unlogged: 'Niet geregistreerd',
  answeredBy: 'Beantwoord door',
  conferenceCall: 'Conference call',
  copyNumberSuccess: 'Nummer gekopieerd',
  // #region call status
  '911': '911',
  '933': '933',
  Abandoned: 'Afgebroken',
  Accepted: 'Geaccepteerd',
  'Answered Not Accepted': 'Beantwoord niet geaccepteerd',
  Blocked: 'Geblokkeerd',
  Busy: 'Bezet',
  'Call Failed': 'Oproep mislukt',
  'Call Failure': 'Oproepfout',
  'Call connected': 'Oproep verbonden',
  'Carrier is not active': 'Provider is niet actief',
  Declined: 'Geweigerd',
  'EDGE trunk misconfigured': 'EDGE-trunk onjuist geconfigureerd',
  'Fax Not Sent': 'Fax niet verzonden',
  'Fax Partially Sent': 'Fax gedeeltelijk verzonden',
  'Fax Poor Line': 'Fax slechte lijn',
  'Fax Receipt Error': 'Fout bij ontvangst van fax',
  'Fax on Demand': 'Fax op aanvraag',
  'Hang Up': 'Ophangen',
  'IP Phone Offline': 'IP-telefoon offline',
  'In Progress': 'Bezig',
  'Internal Error': 'Interne fout',
  'International Disabled': 'Internationaal uitgeschakeld',
  'International Restricted': 'Internationaal beperkt',
  Missed: 'Gemist',
  'No Answer': 'Geen reactie',
  'No Calling Credit': 'Geen belkrediet',
  'Not Allowed': 'Niet toegestaan',
  'Partial Receive': 'Gedeeltelijke ontvangst',
  'Phone Login': 'Aanmelden via telefoon',
  'Receive Error': 'Ontvangstfout',
  Received: 'Ontvangen',
  Rejected: 'Geweigerd',
  Reply: 'Antwoorden',
  'Restricted Number': 'Beperkt nummer',
  'Send Error': 'Fout bij verzenden',
  Sent: 'Verzonden',
  'Sent to Voicemail': 'Verzonden naar voicemail',
  Stopped: 'Gestopt',
  'Suspended account': 'Opgeheven account',
  Unknown: 'Onbekend',
  Voicemail: 'Voicemail',
  'Wrong Number': 'Verkeerd nummer',
  // some fields are not in the platform list
  'Answered Elsewhere': 'Elders beantwoord',
  'Ringing Elsewhere': 'Gaat ergens anders over',
  'Fax Send Error': 'Fout bij verzenden van fax',
  Account: 'Account',
  'Call accepted': 'Oproep geaccepteerd',
  'Hang up': 'Ophangen',
  'International Restriction': 'Internationale beperking',
  'No fax machine': 'Geen faxapparaat',
  'Partially Sent': 'Gedeeltelijk verzonden',
  'Poor Line Quality': 'Slechte lijnkwaliteit',
  ResultEmpty: 'leeg',
  ResultInProgress: 'Bezig',
  Suspended: 'Opgeschort',
  'Fax Receipt': 'Faxbewijs',
  'Suspended Account': 'Opgeschort account',
  Disconnected: 'Verbinding verbroken',
  multiMatchesContactName: '{name} en {count} meer',
  // #endregion call status
  matches: '{numberOfMatches} overeenkomsten',
  maybe: 'Misschien: {contactName}',
  optedOut: 'De ontvanger heeft zich afgemeld.',
  optOutAlertTooltip: 'De ontvanger moet zich weer aanmelden om tekstberichten van dit nummer te ontvangen.'
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
//# sourceMappingURL=nl-NL.js.map
