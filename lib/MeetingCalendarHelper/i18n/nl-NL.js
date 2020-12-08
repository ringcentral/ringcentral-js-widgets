"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  inviteMeetingContent: "{accountName} nodigt u uit voor een {brandName}-meeting.\n\nDeelnemen vanaf pc, Mac, iOS of Android: {joinUri}{passwordTpl}\n\nOf iPhone one-tap:\n\t{mobileDialingNumberTpl}\n\nOf telefoon:\n\tBel:{phoneDialingNumberTpl}\n\tMeeting-ID: {meetingId}\n\tBeschikbare internationale nummers: {teleconference} ",
  rcvInviteMeetingContent: "{accountName} heeft u uitgenodigd voor een {brandName}-meeting.\n\nNeem deel via deze link:\n\t{joinUri}{passwordTpl}",
  rcvRCBrandInviteMeetingContent: "{accountName} heeft u uitgenodigd voor een {productName}-meeting.\n\nNeem deel via deze link:\n\t{joinUri}{passwordTpl}",
  rcvInviteMeetingContentDial: "\n\nTik één keer om deel te nemen met alleen audio vanaf een smartphone:\n\t{smartphones}\n\nOf kies:\n\tKies: {dialNumber}\n\tToegangscode/meeting-ID: {pinNumber} ",
  rcvTeleconference: "\n\nInternationale nummers beschikbaar: {teleconference} ",
  doNotModify: "===== Deze tekst niet wijzigen =====",
  password: "\n\nWachtwoord",
  passwordPstn: "\n\nInbelwachtwoord:"
}; // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n\t{mobileDialingNumberTpl}\n\nOr Telephone:\n\tDial: {phoneDialingNumberTpl}\n\tMeeting ID: {meetingId}\n\tInternational numbers available: {teleconference} "@#@
// @key: @#@"rcvInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {brandName} Meeting.\n\nPlease join using this link:\n\t{joinUri}{passwordTpl}"@#@
// @key: @#@"rcvRCBrandInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {productName} meeting.\n\nPlease join using this link:\n\t{joinUri}{passwordTpl}"@#@
// @key: @#@"rcvInviteMeetingContentDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n\t{smartphones}\n\nOr dial:\n\tDial: {dialNumber}\n\tAccess Code / Meeting ID: {pinNumber} "@#@
// @key: @#@"rcvTeleconference"@#@ @source: @#@"\n\nInternational numbers available: {teleconference} "@#@
// @key: @#@"doNotModify"@#@ @source: @#@"===== Do not modify this text ====="@#@
// @key: @#@"password"@#@ @source: @#@"\n\nPassword"@#@
// @key: @#@"passwordPstn"@#@ @source: @#@"\n\nDial-in password:"@#@

exports["default"] = _default;
//# sourceMappingURL=nl-NL.js.map
