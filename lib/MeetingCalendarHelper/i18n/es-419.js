"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  inviteMeetingContent: "{accountName} le invita a una reunión de {brandName}.\n\nUnirse desde una PC, Mac, iOS o Android: {joinUri}{passwordTpl}\n\nO desde iPhone con un solo toque:\n    {mobileDialingNumberTpl}\n\nO por teléfono:\n    Marcar: {phoneDialingNumberTpl}\n    ID de reunión: {meetingId}\n    Números internacionales disponibles: {teleconference} ",
  rcvInviteMeetingContent: "{accountName} lo invitó a una reunión de {brandName}.\n\nÚnase mediante este enlace:\n    {joinUri}{passwordTpl}",
  rcvTelusInviteMeetingContent: "{accountName} lo ha invitado a una reunión TELUS Business Connect.\n\nÚnase mediante este enlace:\n    {joinUri}{passwordTpl}",
  rcvRCBrandInviteMeetingContent: "{accountName} lo invitó a una reunión de {productName}.\n\nÚnase mediante este enlace:\n    {joinUri}{passwordTpl}",
  rcvE2EEInviteMeetingContent: "{accountName} lo ha invitado a una reunión cifrada de extremo a extremo{rcvProductName}.\n\nÚnase con este enlace. Aviso, deberá iniciar sesión en la aplicación {brandName} primero:\n{joinUri}\n\nEl marcado no está disponible para esta reunión.\n\n{e2EESupportLinkText}\n{rcvE2EESupportUrl}",
  e2EESupportLinkText: "Conozca más sobre el cifrado de extremo a extremo de {brandName}.",
  rcvInviteMeetingContentDial: "\n\nPulse una vez para unir el audio solo desde un smartphone:\n    {smartphones}\n\nO marque:\n    Marcar: {dialNumber}\n    Código de acceso/ID de la reunión: {pinNumber} ",
  rcvInviteMeetingContentCountryDial: "\n\nPulse una vez para unir el audio solo desde un smartphone:\n    {smartphones}\n\nO marque:\n    {dialNumber}\n    Código de acceso/ID de la reunión: {pinNumber} ",
  rcvTeleconference: "\n\nNúmeros internacionales disponibles: {teleconference} ",
  rcvSipHeader: "\n\nÚnase con SIP:",
  rcvSipContentWithPwd: "\n    {meetingId}.{meetingPasswordPSTN}@sip.rcv.com\n    contraseña de SIP: {meetingPasswordPSTN}",
  rcvSipContentNoPwd: "\n    {meetingId}@sip.rcv.com",
  doNotModify: "===== No modifique este texto =====",
  password: "\n\nContraseña",
  passwordPstn: "\n\nContraseña de marcado:",
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
//# sourceMappingURL=es-419.js.map
