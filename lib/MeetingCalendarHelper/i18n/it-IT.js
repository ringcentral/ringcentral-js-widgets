"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  inviteMeetingContent: "{accountName} ti sta invitando a una riunione {brandName}.\n\nAccedi da PC, Mac, iOS o Android: {joinUri}{passwordTpl}\n\nO mediante tocco singolo su iPhone:\n\t{mobileDialingNumberTpl}\n\nO da telefono:\n\tComponi: {phoneDialingNumberTpl}\n\tID riunione: {meetingId}\n\tNumeri internazionali disponibili: {teleconference} ",
  rcvInviteMeetingContent: "{accountName} ti ha invitato a una riunione di {brandName}.\n\nPartecipa attraverso questo collegamento:\n\t{joinUri}{passwordTpl}",
  rcvRCBrandInviteMeetingContent: "{accountName} ti sta invitando a una riunione {productName}.\n\nAccedi con questo collegamento:\n\t{joinUri}{passwordTpl}",
  rcvInviteMeetingContentDial: "\n\nUn solo tocco per aggiungere l'audio, solo da smartphone:\n\t{smartphones}\n\nO componi:\n\tComponi: {dialNumber}\n\tCodice di accesso / ID riunione: {pinNumber} ",
  rcvInviteMeetingContentCountryDial: "\n\nAccedi con un tocco da smartphone per partecipare solo in modalità audio:\n\t{smartphones}\n\nO componi:\n\t{dialNumber}\n\tCodice di accesso/ID riunione: {pinNumber} ",
  rcvTeleconference: "\n\nNumeri internazionali disponibili: {teleconference} ",
  doNotModify: "===== Non modificare questo testo =====",
  password: "\n\nPassword",
  passwordPstn: "\n\nPassword di accesso:"
}; // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n\t{mobileDialingNumberTpl}\n\nOr Telephone:\n\tDial: {phoneDialingNumberTpl}\n\tMeeting ID: {meetingId}\n\tInternational numbers available: {teleconference} "@#@
// @key: @#@"rcvInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {brandName} Meeting.\n\nPlease join using this link:\n\t{joinUri}{passwordTpl}"@#@
// @key: @#@"rcvRCBrandInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {productName} meeting.\n\nPlease join using this link:\n\t{joinUri}{passwordTpl}"@#@
// @key: @#@"rcvInviteMeetingContentDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n\t{smartphones}\n\nOr dial:\n\tDial: {dialNumber}\n\tAccess Code / Meeting ID: {pinNumber} "@#@
// @key: @#@"rcvInviteMeetingContentCountryDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n\t{smartphones}\n\nOr dial:\n\t{dialNumber}\n\tAccess Code / Meeting ID: {pinNumber} "@#@
// @key: @#@"rcvTeleconference"@#@ @source: @#@"\n\nInternational numbers available: {teleconference} "@#@
// @key: @#@"doNotModify"@#@ @source: @#@"===== Do not modify this text ====="@#@
// @key: @#@"password"@#@ @source: @#@"\n\nPassword"@#@
// @key: @#@"passwordPstn"@#@ @source: @#@"\n\nDial-in password:"@#@

exports["default"] = _default;
//# sourceMappingURL=it-IT.js.map
