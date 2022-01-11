"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  inviteMeetingContent: "{accountName} 正邀請您加入 {brandName} 會議。\n\n透過 PC、Mac、iOS 或 Android 參加：{joinUri}{passwordTpl}\n\n\n    或 iPhone 觸碰一次：{mobileDialingNumberTpl}\n\n或電話：\n    撥號：{phoneDialingNumberTpl}\n    會議 ID：{meetingId}\n    可使用的國際號碼：{teleconference} ",
  rcvE2EEInviteMeetingContent: "{accountName} 已邀請您加入端對端加密 {rcvProductName} 會議。\n\n請使用此連結加入。請注意，您將需要先登入 {brandName} 應用程式：\n{joinUri}\n\n此會議無法使用撥入功能。\n\n{e2EESupportLinkText}\n{rcvE2EESupportUrl}",
  e2EESupportLinkText: "瞭解更多關於 {brandName} 端對端加密。",
  rcvInviteMeetingContentDial: "\n\n點選一下即可從智慧型手機加入僅限音訊的會議：\n    {smartphones}\n\n或撥打：\n    撥打：{dialNumber}\n    存取碼/會議 ID：{pinNumber} ",
  rcvInviteMeetingContentCountryDial: "\n\n點選一下即可從智慧型手機加入僅限音訊的會議：\n    {smartphones}\n\n或撥打：\n    {dialNumber}\n    存取碼/會議 ID：{pinNumber} ",
  rcvTeleconference: "\n\n可用的國際號碼：{teleconference} ",
  rcvSipHeader: "\n\n透過 SIP 加入：",
  rcvSipContentWithPwd: "\n    {meetingId}.{meetingPasswordPSTN}@sip.rcv.com\n    SIP 密碼：{meetingPasswordPSTN}\n",
  rcvSipContentNoPwd: "\n    {meetingId}@sip.rcv.com\n",
  doNotModify: "===== 不要修改此文字 =====",
  password: "\n\n密碼",
  passwordPstn: "\n\n撥入密碼："
}; // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n    {mobileDialingNumberTpl}\n\nOr Telephone:\n    Dial: {phoneDialingNumberTpl}\n    Meeting ID: {meetingId}\n    International numbers available: {teleconference} "@#@
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

exports["default"] = _default;
//# sourceMappingURL=zh-HK.js.map
