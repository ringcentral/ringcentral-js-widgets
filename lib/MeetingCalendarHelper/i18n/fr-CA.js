"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  inviteMeetingContent: "{accountName} vous invite à une réunion {brandName}.\n\nJoindre sur PC, Mac, iOS ou Android : {joinUri}{passwordTpl}\n\nOu participation d'un seul toucher sur iPhone :\n\t{mobileDialingNumberTpl}\n\nOu par téléphone :\n\tComposer : {phoneDialingNumberTpl}\n\tCode de réunion : {meetingId}\n\tNuméros internationaux disponibles : {teleconference} ",
  rcvInviteMeetingContent: "{accountName} vous a invité à une réunion {brandName}.\n\nVeuillez y participer en utilisant ce lien :\n\t{joinUri} ",
  rcvInviteMeetingContentDial: "\n\nAppuyez une fois pour participer à l'audioconférence uniquement à partir d'un téléphone intelligent :\n\t{smartphones}\n\nou composez le :\n\tNuméro à composer : {dialNumber}\n\tCode PIN: {pinNumber} ",
  rcvTeleconference: "Numéros internationaux disponibles : {teleconference} ",
  doNotModify: "===== Ne modifiez pas ce texto =====",
  password: "Mot de passe"
}; // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n\t{mobileDialingNumberTpl}\n\nOr Telephone:\n\tDial: {phoneDialingNumberTpl}\n\tMeeting ID: {meetingId}\n\tInternational numbers available: {teleconference} "@#@
// @key: @#@"rcvInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {brandName} Meeting.\n\nPlease join using this link:\n\t{joinUri} "@#@
// @key: @#@"rcvInviteMeetingContentDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n\t{smartphones}\n\nOr dial:\n\tDial: {dialNumber}\n\tPIN: {pinNumber} "@#@
// @key: @#@"rcvTeleconference"@#@ @source: @#@"International numbers available: {teleconference} "@#@
// @key: @#@"doNotModify"@#@ @source: @#@"===== Do not modify this text ====="@#@
// @key: @#@"password"@#@ @source: @#@"Password"@#@

exports["default"] = _default;
//# sourceMappingURL=fr-CA.js.map
