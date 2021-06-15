"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  inviteMeetingContent: "{accountName} está convidando você para uma reunião do {brandName}.\n\nEntrar do PC, Mac, iOS ou Android: {joinUri}{passwordTpl}\n\nOu um toque de iPhone:\n    {mobileDialingNumberTpl}\n\nOu telefone:\n    Discar: {phoneDialingNumberTpl}\n    ID da reunião: {meetingId}\n    Números internacionais disponíveis: {teleconference} ",
  rcvInviteMeetingContent: "{accountName} convidou você para uma reunião do {brandName}.\n\nEntre usando este link:\n    {joinUri}{passwordTpl}",
  rcvRCBrandInviteMeetingContent: "{accountName} convidou você para uma reunião do {productName}.\n\nEntre usando este link:\n    {joinUri}{passwordTpl}",
  rcvInviteMeetingContentDial: "\n\nUm toque para entrar apenas com áudio por um smartphone:\n    {smartphones}\n\nOu disque para:\n    Discar: {dialNumber}\n    Código de acesso/ID da reunião: {pinNumber} ",
  rcvInviteMeetingContentCountryDial: "\n\nUm toque para entrar apenas com áudio por um smartphone:\n    {smartphones}\n\nOu disque para:\n    {dialNumber}\n    Código de acesso/ID da reunião: {pinNumber} ",
  rcvTeleconference: "\n\nNúmeros internacionais disponíveis: {teleconference} ",
  rcvSipHeader: "\n\nEntrar por SIP:",
  rcvSipContentWithPwd: "\n    {meetingId}.{meetingPasswordPSTN}@rcv.com\n    Senha do SIP: {meetingPasswordPSTN}",
  rcvSipContentNoPwd: "\n    {meetingId}@rcv.com",
  doNotModify: "===== Não modifique este texto =====",
  password: "\n\nSenha",
  passwordPstn: "\n\nSenha de discagem:",
  'TELUS Business Connect': "TELUS Business Connect"
}; // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n    {mobileDialingNumberTpl}\n\nOr Telephone:\n    Dial: {phoneDialingNumberTpl}\n    Meeting ID: {meetingId}\n    International numbers available: {teleconference} "@#@
// @key: @#@"rcvInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {brandName} Meeting.\n\nPlease join using this link:\n    {joinUri}{passwordTpl}"@#@
// @key: @#@"rcvRCBrandInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {productName} meeting.\n\nPlease join using this link:\n    {joinUri}{passwordTpl}"@#@
// @key: @#@"rcvInviteMeetingContentDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n    {smartphones}\n\nOr dial:\n    Dial: {dialNumber}\n    Access Code / Meeting ID: {pinNumber} "@#@
// @key: @#@"rcvInviteMeetingContentCountryDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n    {smartphones}\n\nOr dial:\n    {dialNumber}\n    Access Code / Meeting ID: {pinNumber} "@#@
// @key: @#@"rcvTeleconference"@#@ @source: @#@"\n\nInternational numbers available: {teleconference} "@#@
// @key: @#@"rcvSipHeader"@#@ @source: @#@"\n\nJoin by SIP:"@#@
// @key: @#@"rcvSipContentWithPwd"@#@ @source: @#@"\n    {meetingId}.{meetingPasswordPSTN}@rcv.com\n    SIP password: {meetingPasswordPSTN}\n"@#@
// @key: @#@"rcvSipContentNoPwd"@#@ @source: @#@"\n    {meetingId}@rcv.com\n"@#@
// @key: @#@"doNotModify"@#@ @source: @#@"===== Do not modify this text ====="@#@
// @key: @#@"password"@#@ @source: @#@"\n\nPassword"@#@
// @key: @#@"passwordPstn"@#@ @source: @#@"\n\nDial-in password:"@#@
// @key: @#@"'TELUS Business Connect'"@#@ @source: @#@"TELUS Business Connect"@#@

exports["default"] = _default;
//# sourceMappingURL=pt-BR.js.map
