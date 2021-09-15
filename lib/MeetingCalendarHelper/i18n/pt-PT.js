"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  inviteMeetingContent: "{accountName} enviou-lhe um convite para uma reunião do {brandName}.\n\nEntre através de PC, Mac, iOS ou Android: {joinUri}{passwordTpl}\n\nOu iPhone one-tap:\n    {mobileDialingNumberTpl}\n\nOu telefone:\n    Marque: {phoneDialingNumberTpl}\n    ID da reunião: {meetingId}\n    Números internacionais disponíveis: {teleconference} ",
  rcvInviteMeetingContent: "{accountName} enviou-lhe um convite para uma reunião do {brandName}.\n\nEntre através desta hiperligação:\n    {joinUri}{passwordTpl}",
  rcvTelusInviteMeetingContent: "{accountName} enviou-lhe um convite para uma reunião do TELUS Business Connect.\n\nEntre através desta hiperligação:\n    {joinUri}{passwordTpl}",
  rcvRCBrandInviteMeetingContent: "{accountName} enviou-lhe um convite para uma reunião do {productName}.\n\nEntre através desta hiperligação:\n    {joinUri}{passwordTpl}",
  rcvE2EEInviteMeetingContent: "Recebeu um convite de {accountName} para uma reunião do {rcvProductName} encriptada ponto a ponto.\n\nEntre através desta ligação. Tenha em atenção que terá de iniciar sessão na aplicação {brandName} primeiro:\n{joinUri}\n\nA marcação não está disponível para esta reunião.\n\n{e2EESupportLinkText}\n{rcvE2EESupportUrl}",
  e2EESupportLinkText: "Saiba mais acerca da encriptação ponto a ponto da {brandName}.",
  rcvInviteMeetingContentDial: "\n\nUm toque para entrar apenas com áudio a partir de um smartphone:\n    {smartphones}\n\nOu marque:\n    Marque: {dialNumber}\n    Código de acesso/ID da reunião: {pinNumber} ",
  rcvInviteMeetingContentCountryDial: "\n\nUm toque para entrar apenas com áudio a partir de um smartphone:\n    {smartphones}\n\nOu marque:\n    {dialNumber}\n    Código de acesso/ID da reunião: {pinNumber} ",
  rcvTeleconference: "\n\nNúmeros internacionais disponíveis: {teleconference} ",
  rcvSipHeader: "\n\nEntre através de SIP:",
  rcvSipContentWithPwd: "\n    {meetingId}.{meetingPasswordPSTN}@sip.rcv.com\n    Palavra-passe SIP: {meetingPasswordPSTN}",
  rcvSipContentNoPwd: "\n    {meetingId}@sip.rcv.com",
  doNotModify: "===== Não modificar este texto =====",
  password: "\n\nPalavra-passe",
  passwordPstn: "\n\nPalavra-passe de marcação:",
  'TELUS Business Connect': "TELUS Business Connect"
}; // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n    {mobileDialingNumberTpl}\n\nOr Telephone:\n    Dial: {phoneDialingNumberTpl}\n    Meeting ID: {meetingId}\n    International numbers available: {teleconference} "@#@
// @key: @#@"rcvInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {brandName} Meeting.\n\nPlease join using this link:\n    {joinUri}{passwordTpl}"@#@
// @key: @#@"rcvTelusInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a TELUS Business Connect Meeting.\n\nPlease join using this link:\n    {joinUri}{passwordTpl}"@#@
// @key: @#@"rcvRCBrandInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {productName} meeting.\n\nPlease join using this link:\n    {joinUri}{passwordTpl}"@#@
// @key: @#@"rcvE2EEInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to an end-to-end encrypted {rcvProductName} meeting.\n\nPlease join using this link. Note, you'll need to log in to the {brandName} app first:\n{joinUri}\n\nDial-in is not available for this meeting.\n\n{e2EESupportLinkText}\n{rcvE2EESupportUrl}"@#@
// @key: @#@"e2EESupportLinkText"@#@ @source: @#@"Find out more about {brandName}'s end-to-end encryption."@#@
// @key: @#@"rcvInviteMeetingContentDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n    {smartphones}\n\nOr dial:\n    Dial: {dialNumber}\n    Access Code / Meeting ID: {pinNumber} "@#@
// @key: @#@"rcvInviteMeetingContentCountryDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n    {smartphones}\n\nOr dial:\n    {dialNumber}\n    Access Code / Meeting ID: {pinNumber} "@#@
// @key: @#@"rcvTeleconference"@#@ @source: @#@"\n\nInternational numbers available: {teleconference} "@#@
// @key: @#@"rcvSipHeader"@#@ @source: @#@"\n\nJoin by SIP:"@#@
// @key: @#@"rcvSipContentWithPwd"@#@ @source: @#@"\n    {meetingId}.{meetingPasswordPSTN}@sip.rcv.com\n    SIP password: {meetingPasswordPSTN}\n"@#@
// @key: @#@"rcvSipContentNoPwd"@#@ @source: @#@"\n    {meetingId}@sip.rcv.com\n"@#@
// @key: @#@"doNotModify"@#@ @source: @#@"===== Do not modify this text ====="@#@
// @key: @#@"password"@#@ @source: @#@"\n\nPassword"@#@
// @key: @#@"passwordPstn"@#@ @source: @#@"\n\nDial-in password:"@#@
// @key: @#@"'TELUS Business Connect'"@#@ @source: @#@"TELUS Business Connect"@#@

exports["default"] = _default;
//# sourceMappingURL=pt-PT.js.map
