"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  inviteMeetingContent: "{accountName} lädt Sie zu einer {brandName}-Besprechung ein.\n\nÜber PC, Mac, iOS oder Android teilnehmen: {joinUri}{passwordTpl}\n\nOder iPhone One-tap:\n    {mobileDialingNumberTpl}\n\nOder Telefon:\n    Wählen Sie: {phoneDialingNumberTpl}\n    Besprechungs-ID: {meetingId}\n    Internationale Nummern verfügbar: {teleconference} ",
  rcvInviteMeetingContent: "{accountName} hat Sie zu einer {brandName}-Besprechung eingeladen.\n\nBitte nehmen Sie über folgenden Link teil:\n    {joinUri}{passwordTpl}",
  rcvTelusInviteMeetingContent: "{accountName} hat Sie zu einer TELUS Business Connect-Besprechung eingeladen.\n\nBitte nehmen Sie über folgenden Link teil:\n    {joinUri}{passwordTpl}",
  rcvRCBrandInviteMeetingContent: "{accountName} hat Sie zu einer {productName}-Besprechung eingeladen.\n\nBitte nehmen Sie über folgenden Link teil:\n    {joinUri}{passwordTpl}",
  rcvE2EEInviteMeetingContent: "{accountName} hat Sie zu einer End-to-End-verschlüsselten {rcvProductName}-Besprechung eingeladen.\n\nBitte nehmen Sie über folgenden Link teil: Beachten Sie, dass Sie sich zuerst bei der {brandName}-App anmelden müssen:\n{joinUri}\n\nFür diese Besprechung ist keine Einwahl möglich.\n\n{e2EESupportLinkText}\n{rcvE2EESupportUrl}",
  e2EESupportLinkText: "Erfahren Sie mehr über die End-to-End-Verschlüsselung von {brandName}.",
  rcvInviteMeetingContentDial: "\n\nEinmal tippen und mit dem Smartphone teilnehmen (nur Audio):\n    {smartphones}\n\nOder wählen Sie:\n    Wählen Sie: {dialNumber}\n    Zugriffscode/Besprechungs-ID: {pinNumber} ",
  rcvInviteMeetingContentCountryDial: "\n\nEinmal tippen und mit dem Smartphone teilnehmen (nur Audio):\n    {smartphones}\n\nOder wählen Sie:\n    {dialNumber}\n    Zugriffscode/Besprechungs-ID: {pinNumber} ",
  rcvTeleconference: "\n\nInternationale Nummern verfügbar: {teleconference} ",
  rcvSipHeader: "\n\nÜber SIP teilnehmen:",
  rcvSipContentWithPwd: "\n    {meetingId}.{meetingPasswordPSTN}@sip.rcv.com\n    SIP-Kennwort: {meetingPasswordPSTN}",
  rcvSipContentNoPwd: "\n    {meetingId}@sip.rcv.com",
  doNotModify: "===== Ändern Sie diesen Text nicht =====",
  password: "\n\nKennwort",
  passwordPstn: "\n\nEinwahlkennwort:",
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
//# sourceMappingURL=de-DE.js.map
