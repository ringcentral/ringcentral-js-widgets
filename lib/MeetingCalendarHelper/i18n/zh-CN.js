"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  inviteMeetingContent: "{accountName} 正在邀请您参加 {brandName} 会议。\n\n从电脑、Mac、iOS 或 Android 加入：{joinUri}{passwordTpl}\n\n或者从 iPhone 一键加入：\n    {mobileDialingNumberTpl}\n\n或者从电话加入：\n    拨号：{phoneDialingNumberTpl}\n    会议 ID：{meetingId}\n    可用的国际号码：{teleconference} ",
  rcvE2EEInviteMeetingContent: "{accountName} 已邀请您参加 {rcvProductName} 端到端加密会议。\n\n请使用此链接加入。请注意，您需要先登录 {brandName} 应用：\n{joinUri}\n\n此会议不支持使用拨入。\n\n{e2EESupportLinkText}\n{rcvE2EESupportUrl}",
  e2EESupportLinkText: "详细了解 {brandName}的端到端加密。",
  rcvInviteMeetingContentDial: "\n\n在智能手机上一键加入纯音频会议：\n    {smartphones}\n\n或拨打：\n    拨号：{dialNumber}\n    访问码/会议 ID：{pinNumber} ",
  rcvInviteMeetingContentCountryDial: "\n\n在智能手机上一键加入纯音频会议：\n    {smartphones}\n\n或拨打：\n    {dialNumber}\n    访问码/会议 ID：{pinNumber} ",
  rcvTeleconference: "\n\n可用的国际号码：{teleconference} ",
  rcvSipHeader: "\n\n通过会话启动协议加入：",
  rcvSipContentWithPwd: "\n    {meetingId}.{meetingPasswordPSTN}@sip.rcv.com\n    SIP 密码：{meetingPasswordPSTN}\n",
  rcvSipContentNoPwd: "\n    {meetingId}@sip.rcv.com\n",
  doNotModify: "===== 请勿修改此文本 =====",
  password: "\n\n密码",
  passwordPstn: "\n\n拨入密码："
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
//# sourceMappingURL=zh-CN.js.map
