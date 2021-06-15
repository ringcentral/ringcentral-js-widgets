"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  inviteMeetingContent: "{accountName} 正在邀请您参加 {brandName} 会议。\n\n通过电脑、Mac、iOS 或 Android 设备加入：{joinUri}{passwordTpl}\n\n或通过 iPhone 一键加入：\n    {mobileDialingNumberTpl}\n\n或通过电话加入：\n    拨打：{phoneDialingNumberTpl}\n    会议 ID：{meetingId}\n    可用的国际号码：{teleconference} ",
  rcvInviteMeetingContent: "{accountName} 已邀请您参加 {brandName} 会议。\n\n请使用以下链接加入：\n    {joinUri}{passwordTpl}",
  rcvRCBrandInviteMeetingContent: "{accountName} 已邀请您参加 {productName} 会议。\n\n请使用以下链接加入：\n    {joinUri}{passwordTpl}",
  rcvInviteMeetingContentDial: "\n\n在智能手机上一键加入纯音频会议：\n    {smartphones}\n\n或拨打：\n    拨打：{dialNumber}\n    访问码/会议 ID：{pinNumber} ",
  rcvInviteMeetingContentCountryDial: "\n\n在智能手机上一键加入纯音频会议：\n    {smartphones}\n\n或拨打：\n    {dialNumber}\n    访问码/会议 ID：{pinNumber} ",
  rcvTeleconference: "\n\n可用的国际号码： {teleconference} ",
  rcvSipHeader: "\n\n通过会话启动协议加入：",
  rcvSipContentWithPwd: "\n    {meetingId}.{meetingPasswordPSTN}@rcv.com\n    会话启动协议密码：{meetingPasswordPSTN}",
  rcvSipContentNoPwd: "\n    {meetingId}@rcv.com",
  doNotModify: "===== 请勿修改此文本 =====",
  password: "\n\n密码",
  passwordPstn: "\n\n拨入密码:",
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
//# sourceMappingURL=zh-CN.js.map
