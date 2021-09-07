"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  inviteMeetingContent: "{accountName}さんから{brandName}会議に招待されています。\n\nPC、Mac、iOS、Androidのいずれかから参加してください。{joinUri}{passwordTpl}\n\nまたは1回のタップでiPhoneから参加できます。\n    {mobileDialingNumberTpl}\n\nあるいは電話で参加することもできます。\n    ダイヤル：{phoneDialingNumberTpl}\n    会議ID：{meetingId}\n    国際電話番号もご利用になれます。{teleconference} ",
  rcvInviteMeetingContent: "{accountName}さんから{brandName}会議に招待されました。\n\nこちらのリンクを使用して参加してください。\n    {joinUri}{passwordTpl}",
  rcvTelusInviteMeetingContent: "{accountName}があなたをTELUS Business Connect Meetingに招待しています。\n\nこちらのリンクを使用して参加してください。\n    {joinUri}{passwordTpl}",
  rcvRCBrandInviteMeetingContent: "{accountName}さんから{productName}会議に招待されました。\n\nこちらのリンクを使用して参加してください。\n    {joinUri}{passwordTpl}",
  rcvE2EEInviteMeetingContent: "{accountName}はあなたをエンドツーエンドで暗号化された{rcvProductName}会議に招待しました。\n\nこのリンクを使用して参加してください。最初に{brandName}アプリにログインする必要があることにご注意ください。\n{joinUri}\n\nダイヤルインはこの会議で使用できません。\n\n{e2EESupportLinkText}\n{rcvE2EESupportUrl}",
  e2EESupportLinkText: "{brandName}のエンドツーエンド暗号化の詳細を参照してください。",
  rcvInviteMeetingContentDial: "\n\n1回のタップでスマートフォンから音声のみで参加できます。\n    {smartphones}\n\nまたはダイヤルできます。\n    ダイヤル：{dialNumber}\n    アクセスコード/会議ID：{pinNumber} ",
  rcvInviteMeetingContentCountryDial: "\n\n1回のタップでスマートフォンから音声のみで参加できます。\n    {smartphones}\n\nまたはダイヤルできます。\n    {dialNumber}\n    アクセスコード/会議ID：{pinNumber} ",
  rcvTeleconference: "\n\n利用可能な国際電話番号： {teleconference} ",
  rcvSipHeader: "\n\nSIPで参加できます。",
  rcvSipContentWithPwd: "\n    {meetingId}.{meetingPasswordPSTN}@rcv.com\n    SIPパスワード：{meetingPasswordPSTN}",
  rcvSipContentNoPwd: "\n    {meetingId}@rcv.com",
  doNotModify: "===== このテキストを変更しないでください =====",
  password: "\n\nパスワード",
  passwordPstn: "\n\nダイヤルインパスワード:",
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
// @key: @#@"rcvSipContentWithPwd"@#@ @source: @#@"\n    {meetingId}.{meetingPasswordPSTN}@rcv.com\n    SIP password: {meetingPasswordPSTN}\n"@#@
// @key: @#@"rcvSipContentNoPwd"@#@ @source: @#@"\n    {meetingId}@rcv.com\n"@#@
// @key: @#@"doNotModify"@#@ @source: @#@"===== Do not modify this text ====="@#@
// @key: @#@"password"@#@ @source: @#@"\n\nPassword"@#@
// @key: @#@"passwordPstn"@#@ @source: @#@"\n\nDial-in password:"@#@
// @key: @#@"'TELUS Business Connect'"@#@ @source: @#@"TELUS Business Connect"@#@

exports["default"] = _default;
//# sourceMappingURL=ja-JP.js.map
