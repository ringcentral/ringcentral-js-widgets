"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  inviteMeetingContent: "{accountName} ti sta invitando a una riunione {brandName}.\n\nAccedi da PC, Mac, iOS o Android: {joinUri}{passwordTpl}\n\nO mediante tocco singolo su iPhone:\n\t{mobileDialingNumberTpl}\n\nO da telefono:\n\tComponi: {phoneDialingNumberTpl}\n\tID riunione: {meetingId}\n\tNumeri internazionali disponibili: {teleconference} ",
  rcvInviteMeetingContent: "{accountName} ti ha invitato a una riunione di {brandName}.\n\nPartecipa attraverso questo collegamento:\n\t{joinUri} ",
  rcvInviteMeetingContentDial: "\n\nAccedi con un tocco da smartphone per partecipare solo in modalità audio:\n\t{smartphones}\n\nOppure componi:\n\tComponi: {dialNumber}\n\tPIN: {pinNumber} ",
  rcvTeleconference: "Numeri internazionali disponibili: {teleconference} ",
  doNotModify: "===== Non modificare questo testo =====",
  password: "Password"
}; // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n\t{mobileDialingNumberTpl}\n\nOr Telephone:\n\tDial: {phoneDialingNumberTpl}\n\tMeeting ID: {meetingId}\n\tInternational numbers available: {teleconference} "@#@
// @key: @#@"rcvInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {brandName} Meeting.\n\nPlease join using this link:\n\t{joinUri} "@#@
// @key: @#@"rcvInviteMeetingContentDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n\t{smartphones}\n\nOr dial:\n\tDial: {dialNumber}\n\tPIN: {pinNumber} "@#@
// @key: @#@"rcvTeleconference"@#@ @source: @#@"International numbers available: {teleconference} "@#@
// @key: @#@"doNotModify"@#@ @source: @#@"===== Do not modify this text ====="@#@
// @key: @#@"password"@#@ @source: @#@"Password"@#@

exports["default"] = _default;
//# sourceMappingURL=it-IT.js.map
