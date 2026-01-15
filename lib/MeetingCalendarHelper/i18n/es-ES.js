"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* eslint-disable */
var _default = exports["default"] = {
  inviteMeetingContent: '{accountName}le está invitando a una reunión de{brandName}.\n\nÚnase desde PC, Mac, iOS o Android:{joinUri}{passwordTpl}\n\nO desde iPhone con tan solo pulsar una vez:\n    {mobileDialingNumberTpl}\n\nO desde un teléfono:\n    Marque:{phoneDialingNumberTpl}\n    ID de la reunión:{meetingId}\n    Números internacionales disponibles:{teleconference} ',
  rcvE2EEInviteMeetingContent: '{accountName}le ha invitado a una reunión cifrada de extremo a extremo de{rcvProductName}.\n\nÚnase mediante este enlace. Tenga en cuenta que primero necesitará iniciar sesión en la aplicación{brandName}:\n{joinUri}\n\nLa marcación no está disponible para esta reunión.\n\n{e2EESupportLinkText}\n{rcvE2EESupportUrl}',
  e2EESupportLinkText: 'Obtenga más información sobre el cifrado de extremo a extremo de{brandName}.',
  rcvInviteMeetingContentDial: '\n\nUn toque para unirse al audio solo desde un teléfono inteligente:\n    {smartphones}\n\nO marcación:\n    Marcar:{dialNumber}\n    Código de acceso/ID de reunión:{pinNumber} ',
  rcvInviteMeetingContentCountryDial: '\n\nUn toque para unirse al audio solo desde un teléfono inteligente:\n    {smartphones}\n\nO marque:\n    {dialNumber}\n    Código de acceso/ID de reunión:{pinNumber} ',
  rcvTeleconference: '\n\nNúmeros internacionales disponibles:{teleconference} ',
  rcvSipHeader: '\n\nÚnase mediante SIP:',
  rcvSipContentWithPwd: '\n    {meetingId}.{meetingPasswordPSTN}@sip.rcv.com\n    Contraseña de SIP:{meetingPasswordPSTN}\n',
  rcvSipContentNoPwd: '\n    {meetingId}@sip.rcv.com\n',
  doNotModify: '---------------------------------- No modificar ----------------------------------',
  password: '\n\nContraseña',
  passwordPstn: 'Contraseña de marcación:\n\n'
}; // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n    {mobileDialingNumberTpl}\n\nOr Telephone:\n    Dial: {phoneDialingNumberTpl}\n    Meeting ID: {meetingId}\n    International numbers available: {teleconference} "@#@
// @key: @#@"rcvE2EEInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to an end-to-end encrypted {rcvProductName} meeting.\n\nPlease join using this link. Note, you'll need to log in to the {brandName} app first:\n{joinUri}\n\nDial-in is not available for this meeting.\n\n{e2EESupportLinkText}\n{rcvE2EESupportUrl}"@#@
// @key: @#@"e2EESupportLinkText"@#@ @source: @#@"Find out more about {brandName}'s end-to-end encryption."@#@
// @key: @#@"rcvInviteMeetingContentDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n    {smartphones}\n\nOr dial:\n    Dial: {dialNumber}\n    Access Code / Meeting ID: {pinNumber} "@#@
// @key: @#@"rcvInviteMeetingContentCountryDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n    {smartphones}\n\nOr dial:\n    {dialNumber}\n    Access Code / Meeting ID: {pinNumber} "@#@
// @key: @#@"rcvTeleconference"@#@ @source: @#@"\n\nInternational numbers available: {teleconference} "@#@
// @key: @#@"rcvSipHeader"@#@ @source: @#@"\n\nJoin by SIP:"@#@
// @key: @#@"rcvSipContentWithPwd"@#@ @source: @#@"\n    {meetingId}.{meetingPasswordPSTN}@sip.rcv.com\n    SIP password: {meetingPasswordPSTN}\n"@#@
// @key: @#@"rcvSipContentNoPwd"@#@ @source: @#@"\n    {meetingId}@sip.rcv.com\n"@#@
// @key: @#@"doNotModify"@#@ @source: @#@"---------------------------------- Do Not Modify ----------------------------------"@#@
// @key: @#@"password"@#@ @source: @#@"\n\nPassword"@#@
// @key: @#@"passwordPstn"@#@ @source: @#@"\n\nDial-in password:"@#@
//# sourceMappingURL=es-ES.js.map
