/* eslint-disable */
export default {
  to: 'Vastaanottaja',
  from: 'Lähde',
  ext: 'Alanumero',
  myCallerId: 'Oma soittajatunnus',
  callerId: 'Soittajatunnus',
  unknownNumber: 'Tuntematon',
  Inbound: 'Saapuva puhelu',
  Outbound: 'Lähtevä puhelu',
  activeCall: 'Käynnissä oleva puhelu',
  otherDevice: 'Toisella laitteella',
  onHold: 'Pidossa',
  day: 'päivä',
  hr: 't',
  min: 'min',
  sec: 's',
  yesterday: 'Eilen',
  notes: 'AI-muistiinpanot',
  logged: 'Kirjattu lokiin',
  unlogged: 'Kirjaamatta',
  answeredBy: 'Vastannut',
  conferenceCall: 'Neuvottelupuhelu',
  copyNumberSuccess: 'Numero kopioitu',
  // #region call status
  '911': '911',
  '933': '933',
  Abandoned: 'Hylätty',
  Accepted: 'Hyväksytty',
  'Answered Not Accepted': 'Vastattu, ei hyväksytty',
  Blocked: 'Estetty',
  Busy: 'Varattu',
  'Call Failed': 'Puhelu epäonnistui',
  'Call Failure': 'Puheluvirhe',
  'Call connected': 'Puhelu yhdistetty',
  'Carrier is not active': 'Operaattori ei ole aktiivinen',
  Declined: 'Hylätty',
  'EDGE trunk misconfigured': 'EDGE-runko on määritetty virheellisesti',
  'Fax Not Sent': 'Faksia ei lähetetty',
  'Fax Partially Sent': 'Faksi osittain lähetetty',
  'Fax Poor Line': 'Faksilinja heikko',
  'Fax Receipt Error': 'Faksin vastaanottovirhe',
  'Fax on Demand': 'Faksi tarvittaessa',
  'Hang Up': 'Lopeta puhelu',
  'IP Phone Offline': 'IP-puhelin offline-tilassa',
  'In Progress': 'Käynnissä',
  'Internal Error': 'Sisäinen virhe',
  'International Disabled': 'Kansainväliset pois käytöstä',
  'International Restricted': 'Kansainvälinen rajoitettu',
  Missed: 'Vastaamattomat',
  'No Answer': 'Ei vastausta',
  'No Calling Credit': 'Ei saldoa',
  'Not Allowed': 'Ei sallittu',
  'Partial Receive': 'Osittainen vastaanotto',
  'Phone Login': 'Puhelimella kirjautuminen',
  'Receive Error': 'Vastaanottovirhe',
  Received: 'Vastaanotettu',
  Rejected: 'Hylätty',
  Reply: 'Vastaa',
  'Restricted Number': 'Rajoitettu numero',
  'Send Error': 'Lähetysvirhe',
  Sent: 'Lähetetty',
  'Sent to Voicemail': 'Lähetetty puhelinvastaajaan',
  Stopped: 'Pysäytetty',
  'Suspended account': 'Jäädytetty tili',
  Unknown: 'Tuntematon',
  Voicemail: 'Puhelinvastaaja',
  'Wrong Number': 'Väärä numero',
  // some fields are not in the platform list
  'Answered Elsewhere': 'Vastattu muualla',
  'Ringing Elsewhere': 'Soi muualla',
  'Fax Send Error': 'Faksin lähetysvirhe',
  Account: 'Tili',
  'Call accepted': 'Puhelu hyväksytty',
  'Hang up': 'Lopeta puhelu',
  'International Restriction': 'Kansainvälinen rajoitus',
  'No fax machine': 'Ei faksilaitetta',
  'Partially Sent': 'Lähetetty osittain',
  'Poor Line Quality': 'Huono linjan laatu',
  ResultEmpty: 'tyhjä',
  ResultInProgress: 'Käynnissä',
  Suspended: 'Jäädytetty',
  'Fax Receipt': 'Faksin vastaanotto',
  'Suspended Account': 'Jäädytetty tili',
  Disconnected: 'Yhteys katkaistu',
  multiMatchesContactName: '{name} ja {count} muuta',
  // #endregion call status
  matches: '{numberOfMatches} osumaa',
  maybe: 'Ehkä: {contactName}',
  optedOut: 'Vastaanottaja on peruuttanut tilauksen.',
  optOutAlertTooltip:
    'Vastaanottajan on tilattava viestit uudelleen, jotta hän voi vastaanottaa tekstiviestejä tästä numerosta.',
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
