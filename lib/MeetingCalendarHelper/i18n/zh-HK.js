"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  inviteMeetingContent: "{accountName} 正邀請您加入 {brandName} 會議。\n\n請從 PC、Mac、iOS 或 Android 加入：{joinUri}{passwordTpl}\n\n或在 iPhone 點一下加入：\n    {mobileDialingNumberTpl}\n\n或透過電話加入：\n    請撥打：{phoneDialingNumberTpl}\n    會議 ID：{meetingId}\n    可用的國際號碼：{teleconference} ",
  rcvInviteMeetingContent: "{accountName} 已邀請您加入 {brandName} 會議。\n\n請使用此連結加入：\n    {joinUri}{passwordTpl}",
  rcvRCBrandInviteMeetingContent: "{accountName} 已邀請您加入 {productName} 會議。\n\n請使用此連結加入：\n    {joinUri}{passwordTpl}",
  rcvInviteMeetingContentDial: "\n\n點一下即可從智慧型手機加入僅限音訊的會議：\n    {smartphones}\n\n或撥打：\n    請撥打：{dialNumber}\n    存取碼 / 會議 ID：{pinNumber} ",
  rcvInviteMeetingContentCountryDial: "\n\n點一下即可從智慧型手機加入僅限音訊的會議：\n    {smartphones}\n\n或撥打：\n    {dialNumber}\n    存取碼 / 會議 ID：{pinNumber} ",
  rcvTeleconference: "\n\n可用的國際號碼： {teleconference} ",
  rcvSipHeader: "\n\n以 SIP 加入：",
  rcvSipContentWithPwd: "\n    {meetingId}.{meetingPasswordPSTN}@rcv.com\n    SIP 密碼：{meetingPasswordPSTN}",
  rcvSipContentNoPwd: "\n    {meetingId}@rcv.com",
  doNotModify: "===== 不要修改此文字 =====",
  password: "\n\n密碼",
  passwordPstn: "\n\n撥入密碼:",
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
//# sourceMappingURL=zh-HK.js.map
