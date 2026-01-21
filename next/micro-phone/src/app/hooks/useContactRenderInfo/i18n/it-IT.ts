/* eslint-disable */
export default {
  to: 'A',
  from: 'Da',
  ext: 'Int.',
  myCallerId: 'Mio ID chiamante',
  callerId: 'ID chiamante',
  unknownNumber: 'Sconosciuto',
  Inbound: 'Chiamata in entrata',
  Outbound: 'Chiamata in uscita',
  activeCall: 'Chiamata attiva',
  otherDevice: 'Su un altro dispositivo',
  onHold: 'In attesa',
  day: 'giorno',
  hr: 'h',
  min: 'min',
  sec: 'sec',
  yesterday: 'Ieri',
  notes: 'Note AI',
  logged: 'Connesso',
  unlogged: 'Non registrato',
  answeredBy: 'Risposta fornita da',
  conferenceCall: 'Conferenza telefonica',
  copyNumberSuccess: 'Numero copiato',
  // #region call status
  '911': '911',
  '933': '933',
  Abandoned: 'Abbandonata',
  Accepted: 'Accettata',
  'Answered Not Accepted': 'Risposta, non accettata',
  Blocked: 'Bloccata',
  Busy: 'Occupato',
  'Call Failed': 'Chiamata non riuscita',
  'Call Failure': 'Chiamata non riuscita',
  'Call connected': 'Chiamata connessa',
  'Carrier is not active': 'Il gestore non è attivo',
  Declined: 'Rifiutata',
  'EDGE trunk misconfigured': 'Trunk EDGE non configurato correttamente',
  'Fax Not Sent': 'Fax non inviato',
  'Fax Partially Sent': 'Fax parzialmente inviato',
  'Fax Poor Line': 'Linea del fax insoddisfacente',
  'Fax Receipt Error': 'Errore di ricezione fax',
  'Fax on Demand': 'Fax on-demand',
  'Hang Up': 'Riaggancia',
  'IP Phone Offline': 'Telefono IP offline',
  'In Progress': 'In corso',
  'Internal Error': 'Errore interno',
  'International Disabled': 'Internazionale non consentita',
  'International Restricted': 'Internazionale limitata',
  Missed: 'Persa',
  'No Answer': 'Nessuna risposta',
  'No Calling Credit': 'Credito telefonico assente',
  'Not Allowed': 'Non consentita',
  'Partial Receive': 'Ricezione parziale',
  'Phone Login': 'Accesso telefono',
  'Receive Error': 'Errore di ricezione',
  Received: 'Ricevuta',
  Rejected: 'Rifiutata',
  Reply: 'Rispondi',
  'Restricted Number': 'Numero soggetto a restrizioni',
  'Send Error': 'Errore invio',
  Sent: 'Inviato',
  'Sent to Voicemail': 'Inviato alla segreteria telefonica',
  Stopped: 'Interrotta',
  'Suspended account': 'Account sospeso',
  Unknown: 'Sconosciuto',
  Voicemail: 'Segreteria',
  'Wrong Number': 'Numero errato',
  // some fields are not in the platform list
  'Answered Elsewhere': 'Risposto altrove',
  'Ringing Elsewhere': 'Squillo altrove',
  'Fax Send Error': 'Errore di invio fax',
  Account: 'Account',
  'Call accepted': 'Chiamata accettata',
  'Hang up': 'Riaggancia',
  'International Restriction': 'Limitazione internazionale',
  'No fax machine': 'Apparecchio fax assente',
  'Partially Sent': 'Invio parziale',
  'Poor Line Quality': 'Qualità linea insufficiente',
  ResultEmpty: 'vuoto',
  ResultInProgress: 'In corso',
  Suspended: 'Sospeso',
  'Fax Receipt': 'Ricezione fax',
  'Suspended Account': 'Account sospeso',
  Disconnected: 'Disconnesso',
  multiMatchesContactName: '{name} e altri {count}',
  // #endregion call status
  matches: '{numberOfMatches} corrispondenze',
  maybe: 'Forse: {contactName}',
  optedOut: "Il destinatario ha annullato l'adesione.",
  optOutAlertTooltip:
    "Il destinatario deve effettuare nuovamente l'abbonamento per ricevere SMS da questo numero.",
} as const;

// @key: @#@"to"@#@ @source: @#@"To"@#@
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
