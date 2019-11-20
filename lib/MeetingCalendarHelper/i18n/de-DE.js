"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  inviteMeetingContent: "{accountName} lädt Sie zu einem {brandName}-Meeting ein.\n\nNehmen Sie mit einem PC, Mac, iOS- oder Android-Gerät teil: {joinUri}{passwordTpl}\n\nOder mit einmaligem Tippen auf dem iPhone:\n\t{mobileDialingNumberTpl}\n\nOder per Telefon:\n\tWählen: {phoneDialingNumberTpl}\n\tBesprechungs-ID: {meetingId}\n\tVerfügbare internationale Nummern: {teleconference} ",
  rcvInviteMeetingContent: "{accountName} hat Sie zu einem {brandName} Meeting eingeladen.\n\nBitte melde dich über diesen Link an:\n\t{joinUri} ",
  rcvInviteMeetingContentDial: "\n\nEinmal tippen, um nur Audio von einem Smartphone aus zu verbinden:\n\t{smartphones}\n\nOder wählen:\n\tWählen: {dialNumber}\n\tPIN: {pinNumber} ",
  rcvTeleconference: "Internationale Nummern verfügbar: {teleconference} ",
  doNotModify: "===== Ändern Sie diesen Text nicht =====",
  password: "Kennwort"
}; // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n\t{mobileDialingNumberTpl}\n\nOr Telephone:\n\tDial: {phoneDialingNumberTpl}\n\tMeeting ID: {meetingId}\n\tInternational numbers available: {teleconference} "@#@
// @key: @#@"rcvInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {brandName} Meeting.\n\nPlease join using this link:\n\t{joinUri} "@#@
// @key: @#@"rcvInviteMeetingContentDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n\t{smartphones}\n\nOr dial:\n\tDial: {dialNumber}\n\tPIN: {pinNumber} "@#@
// @key: @#@"rcvTeleconference"@#@ @source: @#@"International numbers available: {teleconference} "@#@
// @key: @#@"doNotModify"@#@ @source: @#@"===== Do not modify this text ====="@#@
// @key: @#@"password"@#@ @source: @#@"Password"@#@

exports["default"] = _default;
//# sourceMappingURL=de-DE.js.map
