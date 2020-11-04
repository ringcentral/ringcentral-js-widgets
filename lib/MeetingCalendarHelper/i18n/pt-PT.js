"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  inviteMeetingContent: "{accountName} está a convidá-lo para uma reunião do {brandName}.\n\nEntre através de PC, Mac, iOS ou Android: {joinUri}{passwordTpl}\n\nOu iPhone one-tap:\n\t{mobileDialingNumberTpl}\n\nOu telefone:\n\tMarcar:{phoneDialingNumberTpl}\n\tID da reunião: {meetingId}\n\tNúmeros internacionais disponíveis: {teleconference} ",
  rcvInviteMeetingContent: "{accountName} convidou-o para uma reunião do {brandName}.\n\nEntre através desta hiperligação:\n\t{joinUri}{passwordTpl}",
  rcvRCBrandInviteMeetingContent: "{accountName} convidou-o para uma reunião do {productName}.\n\nEntre através desta hiperligação:\n\t{joinUri}{passwordTpl}",
  rcvInviteMeetingContentDial: "\n\nUm toque para participar apenas com áudio a partir de um smartphone:\n\t{smartphones}\n\nOu marque:\n\tMarque: {dialNumber}\n\tPIN: {pinNumber} ",
  rcvTeleconference: "\n\nNúmeros internacionais disponíveis: {teleconference} ",
  doNotModify: "===== Não modificar este texto =====",
  password: "\n\nPalavra-passe",
  passwordPstn: "\n\nPalavra-passe de marcação:"
}; // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n\t{mobileDialingNumberTpl}\n\nOr Telephone:\n\tDial: {phoneDialingNumberTpl}\n\tMeeting ID: {meetingId}\n\tInternational numbers available: {teleconference} "@#@
// @key: @#@"rcvInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {brandName} Meeting.\n\nPlease join using this link:\n\t{joinUri}{passwordTpl}"@#@
// @key: @#@"rcvRCBrandInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {productName} meeting.\n\nPlease join using this link:\n\t{joinUri}{passwordTpl}"@#@
// @key: @#@"rcvInviteMeetingContentDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n\t{smartphones}\n\nOr dial:\n\tDial: {dialNumber}\n\tPIN: {pinNumber} "@#@
// @key: @#@"rcvTeleconference"@#@ @source: @#@"\n\nInternational numbers available: {teleconference} "@#@
// @key: @#@"doNotModify"@#@ @source: @#@"===== Do not modify this text ====="@#@
// @key: @#@"password"@#@ @source: @#@"\n\nPassword"@#@
// @key: @#@"passwordPstn"@#@ @source: @#@"\n\nDial-in password:"@#@

exports["default"] = _default;
//# sourceMappingURL=pt-PT.js.map
