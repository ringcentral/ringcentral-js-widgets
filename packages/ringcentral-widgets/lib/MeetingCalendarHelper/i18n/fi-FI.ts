/* eslint-disable */
export default {
  inviteMeetingContent:
    '{accountName} kutsuu sinut tapaamiseen palvelussa {brandName}.\n\nLiity tietokoneella, Macilla, iOS:llä tai Androidilla: {joinUri}{passwordTpl}\n\nTai iPhonella yhdellä napautuksella:\n    {mobileDialingNumberTpl}\n\nTai puhelimella:\n    Soita numeroon: {phoneDialingNumberTpl}\n    Tapaamistunnus: {meetingId}\n    Kansainvälisiä numeroita käytettävissä: {teleconference} ',
  rcvE2EEInviteMeetingContent:
    '{accountName} on kutsunut sinut päästä päähän salattuun {rcvProductName} -tapaamiseen.\n\nLiity tästä linkistä. Huomaa, että sinun täytyy ensin kirjautua palvelun {brandName} sovellukseen:\n{joinUri}\n\nTähän tapaamiseen ei voi liittyä puhelimella.\n\n{e2EESupportLinkText}\n{rcvE2EESupportUrl}',
  e2EESupportLinkText:
    'Lue lisätietoja palvelun {brandName} päästä päähän -salauksesta.',
  rcvInviteMeetingContentDial:
    '\n\nLiity älypuhelimella äänipuheluun yhdellä napautuksella:\n    {smartphones}\n\nTai soita:\n    Soita numeroon: {dialNumber}\n    Käyttökoodi/tapaamistunnus: {pinNumber} ',
  rcvInviteMeetingContentCountryDial:
    '\n\nLiity älypuhelimella äänipuheluun yhdellä napautuksella:\n    {smartphones}\n\nTai soita numeroon:\n    {dialNumber}\n    Käyttökoodi/tapaamistunnus: {pinNumber} ',
  rcvTeleconference:
    '\n\nKansainvälisiä numeroita käytettävissä: {teleconference} ',
  rcvSipHeader: '\n\nLiity SIP:llä:',
  rcvSipContentWithPwd:
    '\n    {meetingId}.{meetingPasswordPSTN}@sip.rcv.com\n    SIP-salasana: {meetingPasswordPSTN}\n',
  rcvSipContentNoPwd: '\n    {meetingId}@sip.rcv.com\n',
  doNotModify:
    '---------------------------------- Älä muokkaa ----------------------------------',
  password: '\n\nSalasana',
  passwordPstn: '\n\nSoiton salasana:',
} as const;

// @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n    {mobileDialingNumberTpl}\n\nOr Telephone:\n    Dial: {phoneDialingNumberTpl}\n    Meeting ID: {meetingId}\n    International numbers available: {teleconference} "@#@
// @key: @#@"rcvE2EEInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to an end-to-end encrypted {rcvProductName} meeting.\n\nPlease join using this link. Note, you'll need to log in to the {brandName} app first:\n{joinUri}\n\nDial-in is not available for this meeting.\n\n{e2EESupportLinkText}\n{rcvE2EESupportUrl}"@#@
// @key: @#@"e2EESupportLinkText"@#@ @source: @#@"Find out more about {brandName}'s end-to-end encryption."@#@
// @key: @#@"rcvInviteMeetingContentDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n    {smartphones}\n\nOr dial:\n    Dial: {dialNumber}\n    Access Code / Meeting ID: {pinNumber} "@#@
// @key: @#@"rcvInviteMeetingContentCountryDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n    {smartphones}\n\nOr dial:\n    {dialNumber}\n    Access Code / Meeting ID: {pinNumber} "@#@
// @key: @#@"rcvTeleconference"@#@ @source: @#@"\n\nInternational numbers available: {teleconference} "@#@
// @key: @#@"rcvSipHeader"@#@ @source: @#@"\n\nJoin by SIP:"@#@
// @key: @#@"rcvSipContentWithPwd"@#@ @source: @#@"\n    {meetingId}.{meetingPasswordPSTN}@sip.rcv.com\n    SIP password: {meetingPasswordPSTN}\n"@#@
// @key: @#@"rcvSipContentNoPwd"@#@ @source: @#@"\n    {meetingId}@sip.rcv.com\n"@#@
// @key: @#@"doNotModify"@#@ @source: @#@"---------------------------------- Do Not Modify ----------------------------------"@#@
// @key: @#@"password"@#@ @source: @#@"\n\nPassword"@#@
// @key: @#@"passwordPstn"@#@ @source: @#@"\n\nDial-in password:"@#@
