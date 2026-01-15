"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* eslint-disable */
var _default = exports["default"] = {
  inviteMeetingContent: '{accountName} vous invite à une réunion {brandName}.\n\nRejoindre sur PC, Mac, iOS ou Android : {joinUri}{passwordTpl}\n\nOu participer sur iPhone en une seule sélection :\n    {mobileDialingNumberTpl}\n\nOu via un téléphone :\n    Composer le : {phoneDialingNumberTpl}\n    ID de réunion : {meetingId}\n    Numéraux internationaux disponibles : {teleconference} ',
  rcvE2EEInviteMeetingContent: '{accountName} vous a invité à une réunion {rcvProductName} chiffrée de bout en bout.\n\nVeuillez rejoindre la réunion à l’aide de ce lien. Vous devrez tout d’abord vous connecter à l’application {brandName} :\n{joinUri}\n\nLa composition n’est pas disponible pour cette réunion.\n\n{e2EESupportLinkText}\n{rcvE2EESupportUrl}',
  e2EESupportLinkText: 'En savoir plus sur le chiffrement de bout en bout de {brandName}.',
  rcvInviteMeetingContentDial: '\n\nAppuyez une seule fois pour rejoindre l’audio uniquement à partir d’un smartphone :\n    {smartphones}\n\nOu composez le :\n    Composez le : {dialNumber}\n\n    Code d’accès/ID de réunion : {pinNumber} ',
  rcvInviteMeetingContentCountryDial: '\n\nAppuyez une seule fois pour rejoindre l’audio uniquement à partir d’un smartphone :\n    {smartphones}\n\nOu composez le :\n    {dialNumber}\n    Code d’accès/ID de réunion : {pinNumber} ',
  rcvTeleconference: '\n\nNuméros internationaux disponibles : {teleconference} ',
  rcvSipHeader: '\n\nRejoindre par SIP :',
  rcvSipContentWithPwd: '\n    {meetingId}.{meetingPasswordPSTN}@sip.rcv.com\n    Mot de passe SIP : {meetingPasswordPSTN}\n',
  rcvSipContentNoPwd: '\n    {meetingId}@sip.rcv.com\n',
  doNotModify: '---------------------------------- Ne pas modifier ----------------------------------',
  password: '\n\nMot de passe',
  passwordPstn: '\n\nMot de passe à composer :'
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
//# sourceMappingURL=fr-FR.js.map
