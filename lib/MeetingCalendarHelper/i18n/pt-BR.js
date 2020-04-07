"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  inviteMeetingContent: "{accountName} está convidando você para uma reunião do {brandName}.\n\nEntre em um PC, Mac, iOS ou Android: {joinUri}{passwordTpl}\n\nOu pelo toque do iPhone:\n\t{mobileDialingNumberTpl}\n\nOu pelo telefone:\n\tDisque: {phoneDialingNumberTpl}\n\tID da reunião: {meetingId}\n\tNúmeros internacionais disponíveis: {teleconference} ",
  rcvInviteMeetingContent: "{accountName} convidou você para uma reunião {brandName}.\n\nEntre usando este link:\n\t{joinUri} ",
  rcvRCBrandInviteMeetingContent: "{accountName} Convidou você para uma reunião da {productName}.\n\nEntre usando este link:\n\t{joinUri} ",
  rcvInviteMeetingContentDial: "\n\nUm toque para entrar em uma chamada apenas de áudio de um smartphone:\n\t{smartphones}\n\nOu disque:\n\tDisque: {dialNumber}\n\tPIN: {pinNumber} ",
  rcvTeleconference: "Números internacionais disponíveis: {teleconference} ",
  doNotModify: "===== Não modifique este texto =====",
  password: "Senha"
}; // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n\t{mobileDialingNumberTpl}\n\nOr Telephone:\n\tDial: {phoneDialingNumberTpl}\n\tMeeting ID: {meetingId}\n\tInternational numbers available: {teleconference} "@#@
// @key: @#@"rcvInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {brandName} Meeting.\n\nPlease join using this link:\n\t{joinUri} "@#@
// @key: @#@"rcvRCBrandInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {productName} meeting.\n\nPlease join using this link:\n\t{joinUri} "@#@
// @key: @#@"rcvInviteMeetingContentDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n\t{smartphones}\n\nOr dial:\n\tDial: {dialNumber}\n\tPIN: {pinNumber} "@#@
// @key: @#@"rcvTeleconference"@#@ @source: @#@"International numbers available: {teleconference} "@#@
// @key: @#@"doNotModify"@#@ @source: @#@"===== Do not modify this text ====="@#@
// @key: @#@"password"@#@ @source: @#@"Password"@#@

exports["default"] = _default;
//# sourceMappingURL=pt-BR.js.map
