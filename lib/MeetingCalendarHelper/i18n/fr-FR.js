"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  inviteMeetingContent: "{accountName} vous invite à participer à une réunion {brandName}.\n\nRejoignez la conférence via un PC, Mac ou périphérique iOS/Android : {joinUri}{passwordTpl}\n\nOu via un iPhone one-tap :\n\t{mobileDialingNumberTpl}\n\nOu via un téléphone :\n\tComposez le : {phoneDialingNumberTpl}\n\tID de réunion : {meetingId}\n\tNuméros internationaux disponibles : {teleconference} ",
  rcvInviteMeetingContent: "{accountName} vous a invité à une réunion {brandName}.\n\nInscrivez-vous en utilisant le lien :\n\t{joinUri}{passwordTpl}",
  rcvRCBrandInviteMeetingContent: "{accountName} vous a invité à participer à une réunion {productName}.\n\nVeuillez la rejoindre en utilisant ce lien :\n\t{joinUri}{passwordTpl}",
  rcvInviteMeetingContentDial: "\n\nRejoignez l'audio uniquement en un clic, à partir d'un smartphone :\n\t{smartphones}\n\nOu en composant le :\n\tNuméro : {dialNumber}\n\tPIN : {pinNumber}{passwordPstnTpl} ",
  rcvTeleconference: "\n\nNuméros internationaux disponibles : {teleconference} ",
  doNotModify: "===== Ne pas modifier ce texte =====",
  password: "\n\nMot de passe"
}; // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n\t{mobileDialingNumberTpl}\n\nOr Telephone:\n\tDial: {phoneDialingNumberTpl}\n\tMeeting ID: {meetingId}\n\tInternational numbers available: {teleconference} "@#@
// @key: @#@"rcvInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {brandName} Meeting.\n\nPlease join using this link:\n\t{joinUri}{passwordTpl}"@#@
// @key: @#@"rcvRCBrandInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {productName} meeting.\n\nPlease join using this link:\n\t{joinUri}{passwordTpl}"@#@
// @key: @#@"rcvInviteMeetingContentDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n\t{smartphones}\n\nOr dial:\n\tDial: {dialNumber}\n\tPIN: {pinNumber}{passwordPstnTpl} "@#@
// @key: @#@"rcvTeleconference"@#@ @source: @#@"\n\nInternational numbers available: {teleconference} "@#@
// @key: @#@"doNotModify"@#@ @source: @#@"===== Do not modify this text ====="@#@
// @key: @#@"password"@#@ @source: @#@"\n\nPassword"@#@

exports["default"] = _default;
//# sourceMappingURL=fr-FR.js.map
