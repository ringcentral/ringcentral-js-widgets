export default {
  inviteMeetingContent: "{accountName} ti sta invitando a una riunione {brandName}.\n\nPartecipa da PC, Mac, iOS o Android: {joinUri}{passwordTpl}\n\nOppure da iPhone con un tocco:\n    {mobileDialingNumberTpl}\n\nO via telefono:\n    Componi: {phoneDialingNumberTpl}\n     ID riunione: {meetingId}\n    Numeri internazionali disponibili: {teleconference} ",
  rcvInviteMeetingContent: "{accountName} ti ha invitato a una riunione {brandName}.\n\nAccedi con questo collegamento:\n    {joinUri}{passwordTpl}",
  rcvTelusInviteMeetingContent: "{accountName} ti ha invitato a una riunione TELUS Business Connect.\n\nAccedi con questo link:\n    {joinUri}{passwordTpl}",
  rcvRCBrandInviteMeetingContent: "{accountName} ti ha invitato a una riunione {productName}.\n\nAccedi con questo collegamento:\n    {joinUri}{passwordTpl}",
  rcvE2EEInviteMeetingContent: "{accountName} ti ha invitato a una riunione {rcvProductName} con crittografia end-to-end.\n\nAccedi con questo link. Tieni presente che prima è necessario accedere all'app {brandName}:\n{joinUri}\n\nPer questa riunione non è possibile collegarsi alla chiamata.\n\n{e2EESupportLinkText}\n{rcvE2EESupportUrl}",
  e2EESupportLinkText: "Scopri di più sulla crittografia end-to-end di {brandName}.",
  rcvInviteMeetingContentDial: "\n\nAccedi con un tocco da smartphone per partecipare solo in modalità audio:\n    {smartphones}\n\nO componi:\n    Componi: {dialNumber}\n    Codice di accesso / ID riunione: {pinNumber} ",
  rcvInviteMeetingContentCountryDial: "\n\nAccedi con un tocco da smartphone per partecipare solo in modalità audio:\n    {smartphones}\n\nO componi:\n    {dialNumber}\n    Codice di accesso / ID riunione: {pinNumber} ",
  rcvTeleconference: "\n\nNumeri internazionali disponibili: {teleconference} ",
  rcvSipHeader: "\n\nPartecipa tramite SIP:",
  rcvSipContentWithPwd: "\n    {meetingId}.{meetingPasswordPSTN}@rcv.com\n    Password SIP: {meetingPasswordPSTN}",
  rcvSipContentNoPwd: "\n    {meetingId}@rcv.com",
  doNotModify: "===== Non modificare questo testo =====",
  password: "\n\nPassword",
  passwordPstn: "\n\nPassword di accesso:",
  'TELUS Business Connect': "TELUS Business Connect"
};

// @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n    {mobileDialingNumberTpl}\n\nOr Telephone:\n    Dial: {phoneDialingNumberTpl}\n    Meeting ID: {meetingId}\n    International numbers available: {teleconference} "@#@
// @key: @#@"rcvInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {brandName} Meeting.\n\nPlease join using this link:\n    {joinUri}{passwordTpl}"@#@
// @key: @#@"rcvTelusInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a TELUS Business Connect Meeting.\n\nPlease join using this link:\n    {joinUri}{passwordTpl}"@#@
// @key: @#@"rcvRCBrandInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {productName} meeting.\n\nPlease join using this link:\n    {joinUri}{passwordTpl}"@#@
// @key: @#@"rcvE2EEInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to an end-to-end encrypted {rcvProductName} meeting.\n\nPlease join using this link. Note, you'll need to log in to the {brandName} app first:\n{joinUri}\n\nDial-in is not available for this meeting.\n\n{e2EESupportLinkText}\n{rcvE2EESupportUrl}"@#@
// @key: @#@"e2EESupportLinkText"@#@ @source: @#@"Find out more about {brandName}'s end-to-end encryption."@#@
// @key: @#@"rcvInviteMeetingContentDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n    {smartphones}\n\nOr dial:\n    Dial: {dialNumber}\n    Access Code / Meeting ID: {pinNumber} "@#@
// @key: @#@"rcvInviteMeetingContentCountryDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n    {smartphones}\n\nOr dial:\n    {dialNumber}\n    Access Code / Meeting ID: {pinNumber} "@#@
// @key: @#@"rcvTeleconference"@#@ @source: @#@"\n\nInternational numbers available: {teleconference} "@#@
// @key: @#@"rcvSipHeader"@#@ @source: @#@"\n\nJoin by SIP:"@#@
// @key: @#@"rcvSipContentWithPwd"@#@ @source: @#@"\n    {meetingId}.{meetingPasswordPSTN}@rcv.com\n    SIP password: {meetingPasswordPSTN}\n"@#@
// @key: @#@"rcvSipContentNoPwd"@#@ @source: @#@"\n    {meetingId}@rcv.com\n"@#@
// @key: @#@"doNotModify"@#@ @source: @#@"===== Do not modify this text ====="@#@
// @key: @#@"password"@#@ @source: @#@"\n\nPassword"@#@
// @key: @#@"passwordPstn"@#@ @source: @#@"\n\nDial-in password:"@#@
// @key: @#@"'TELUS Business Connect'"@#@ @source: @#@"TELUS Business Connect"@#@
