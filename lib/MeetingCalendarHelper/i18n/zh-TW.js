"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  inviteMeetingContent: "{accountName} 邀請您加入 {brandName} 會議。\n\n從 PC、Mac、iOS、Android 加入：{joinUri}{passwordTpl}\n\n或從 iPhone 點選加入：\n\t{mobileDialingNumberTpl}\n\n或從電話加入：\n\t撥號：{phoneDialingNumberTpl}\n\t會議 ID：{meetingId}\n\t可用的國際號碼： {teleconference} ",
  rcvInviteMeetingContent: "{accountName} 已邀請您參加 {brandName} 會議。\n\n請使用以下連結加入：\n\t{joinUri} ",
  rcvRCBrandInviteMeetingContent: "{accountName} 已邀請您加入 {productName} 會議。\n\n請使用這個連結加入：\n\t{joinUri} ",
  rcvInviteMeetingContentDial: "\n\n只需輕觸智慧型手機即可加入音訊：\n\t{smartphones}\n\n或撥號：\n\t撥號：{dialNumber}\n\tPIN 碼：{pinNumber} ",
  rcvTeleconference: "可用的國際號碼： {teleconference} ",
  doNotModify: "===== 不要修改此文字 =====",
  password: "密碼"
}; // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n\t{mobileDialingNumberTpl}\n\nOr Telephone:\n\tDial: {phoneDialingNumberTpl}\n\tMeeting ID: {meetingId}\n\tInternational numbers available: {teleconference} "@#@
// @key: @#@"rcvInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {brandName} Meeting.\n\nPlease join using this link:\n\t{joinUri} "@#@
// @key: @#@"rcvRCBrandInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {productName} meeting.\n\nPlease join using this link:\n\t{joinUri} "@#@
// @key: @#@"rcvInviteMeetingContentDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n\t{smartphones}\n\nOr dial:\n\tDial: {dialNumber}\n\tPIN: {pinNumber} "@#@
// @key: @#@"rcvTeleconference"@#@ @source: @#@"International numbers available: {teleconference} "@#@
// @key: @#@"doNotModify"@#@ @source: @#@"===== Do not modify this text ====="@#@
// @key: @#@"password"@#@ @source: @#@"Password"@#@

exports["default"] = _default;
//# sourceMappingURL=zh-TW.js.map
