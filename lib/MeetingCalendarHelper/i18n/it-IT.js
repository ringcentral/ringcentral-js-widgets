"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  inviteMeetingContent: "{accountName} ti sta invitando a una riunione {brandName}.\n\nAccedi da PC, Mac, iOS o Android: {joinUri}{passwordTpl}\n\nO mediante un tocco singolo da iPhone:\n    {mobileDialingNumberTpl}\n\nO da telefono:\n    Componi:{phoneDialingNumberTpl}\n    ID riunione: {meetingId}\n    Numeri internazionali disponibili: {teleconference}\n ",
  rcvE2EEInviteMeetingContent: "{accountName} ti ha invitato a una riunione {rcvProductName} con crittografia end-to-end.\n\nAccedi con questo link. Tieni presente che prima è necessario accedere all'app {brandName}:\n{joinUri}\n\nPer questa riunione non è possibile collegarsi alla chiamata.\n\n{e2EESupportLinkText}\n{rcvE2EESupportUrl}",
  e2EESupportLinkText: "Scopri di più sulla crittografia end-to-end di {brandName}.",
  rcvInviteMeetingContentDial: "\n\nAccedi con un tocco da smartphone per partecipare solo in modalità audio:\n    {smartphones}\n\nO componi:\n    Componi:{dialNumber}\n    Codice di accesso/ID riunione: {pinNumber} ",
  rcvInviteMeetingContentCountryDial: "\n\nAccedi con un tocco da smartphone per partecipare solo in modalità audio:\n    {smartphones}\n\nO componi:\n    {dialNumber}\n    Codice di accesso/ID riunione: {pinNumber} ",
  rcvTeleconference: "\n\nNumeri internazionali disponibili: {teleconference} ",
  rcvSipHeader: "\n\nJoin by SIP:",
  rcvSipContentWithPwd: "\n    {meetingId}.{meetingPasswordPSTN}@sip.rcv.com\n    Password SIP: {meetingPasswordPSTN}\n",
  rcvSipContentNoPwd: "\n    {meetingId}@sip.rcv.com\n",
  doNotModify: "------------- Non modificare --------------",
  password: "\n\nPassword",
  passwordPstn: "Password accesso diretto: \n\n"
}; // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n    {mobileDialingNumberTpl}\n\nOr Telephone:\n    Dial: {phoneDialingNumberTpl}\n    Meeting ID: {meetingId}\n    International numbers available: {teleconference} "@#@
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
exports["default"] = _default;
//# sourceMappingURL=it-IT.js.map
