export default {
  inviteMeetingContent: "{accountName} nodigt u uit voor een {brandName}-meeting.\n\nNeem deel via pc, Mac, iOS of Android: {joinUri}{passwordTpl}\n\nOf iPhone one-tap:\n    {mobileDialingNumberTpl}\n\nOf telefoon:\n    Bel: {phoneDialingNumberTpl}\n    Meeting-ID: {meetingId}\n    Beschikbare internationale nummers: {teleconference} ",
  rcvE2EEInviteMeetingContent: "{accountName} heeft u uitgenodigd voor een end-to-end-versleutelde {rcvProductName}-meeting.\n\nNeem deel via deze link. Let op: u moet u eerst aanmelden bij de {brandName}-app:\n{joinUri}\n\nInbellen is niet mogelijk voor deze meeting.\n\n{e2EESupportLinkText}\n{rcvE2EESupportUrl}",
  e2EESupportLinkText: "Meer informatie over de end-to-end-versleuteling van {brandName}.",
  rcvInviteMeetingContentDial: "\n\nTik één keer om deel te nemen met alleen audio vanaf een smartphone:\n    {smartphones}\n\nOf kies:\n    Kies: {dialNumber}\n    Toegangscode/meeting-ID: {pinNumber} ",
  rcvInviteMeetingContentCountryDial: "\n\nTik één keer om deel te nemen met alleen audio vanaf een smartphone:\n    {smartphones}\n\nOf kies:\n    {dialNumber}\n    Toegangscode/meeting-ID: {pinNumber} ",
  rcvTeleconference: "\n\nBeschikbare internationale nummers: {teleconference} ",
  rcvSipHeader: "\n\nDeelnemen middels SIP:",
  rcvSipContentWithPwd: "\n    {meetingId}.{meetingPasswordPSTN}@sip.rcv.com\n    SIP-wachtwoord: {meetingPasswordPSTN}\n",
  rcvSipContentNoPwd: "\n    {meetingId}@sip.rcv.com\n",
  doNotModify: "===== Deze tekst niet wijzigen =====",
  password: "\n\nWachtwoord",
  passwordPstn: "\n\nInbelwachtwoord:"
};

// @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n    {mobileDialingNumberTpl}\n\nOr Telephone:\n    Dial: {phoneDialingNumberTpl}\n    Meeting ID: {meetingId}\n    International numbers available: {teleconference} "@#@
// @key: @#@"rcvE2EEInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to an end-to-end encrypted {rcvProductName} meeting.\n\nPlease join using this link. Note, you'll need to log in to the {brandName} app first:\n{joinUri}\n\nDial-in is not available for this meeting.\n\n{e2EESupportLinkText}\n{rcvE2EESupportUrl}"@#@
// @key: @#@"e2EESupportLinkText"@#@ @source: @#@"Find out more about {brandName}'s end-to-end encryption."@#@
// @key: @#@"rcvInviteMeetingContentDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n    {smartphones}\n\nOr dial:\n    Dial: {dialNumber}\n    Access Code / Meeting ID: {pinNumber} "@#@
// @key: @#@"rcvInviteMeetingContentCountryDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n    {smartphones}\n\nOr dial:\n    {dialNumber}\n    Access Code / Meeting ID: {pinNumber} "@#@
// @key: @#@"rcvTeleconference"@#@ @source: @#@"\n\nInternational numbers available: {teleconference} "@#@
// @key: @#@"rcvSipHeader"@#@ @source: @#@"\n\nJoin by SIP:"@#@
// @key: @#@"rcvSipContentWithPwd"@#@ @source: @#@"\n    {meetingId}.{meetingPasswordPSTN}@sip.rcv.com\n    SIP password: {meetingPasswordPSTN}\n"@#@
// @key: @#@"rcvSipContentNoPwd"@#@ @source: @#@"\n    {meetingId}@sip.rcv.com\n"@#@
// @key: @#@"doNotModify"@#@ @source: @#@"===== Do not modify this text ====="@#@
// @key: @#@"password"@#@ @source: @#@"\n\nPassword"@#@
// @key: @#@"passwordPstn"@#@ @source: @#@"\n\nDial-in password:"@#@
