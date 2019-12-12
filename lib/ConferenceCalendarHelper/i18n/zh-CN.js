"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _inviteMeetingContent;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_inviteMeetingContent = {
  inviteMeetingContent: "{accountName}正在邀请您参加 {brandName} 会议。\n\n通过 PC、Mac、iOS、Android 加入: {joinUri}{passwordTpl}\n\n 或通过 iPhone 一键加入：\n\t    {mobileDialingNumberTpl}\n\n    或使用电话：\n\t     拨号：\n\t    {phoneDialingNumberTpl}\n\t     会议 ID：{meetingId}\n\t     可用的国际号码：{teleconference} ",
  conferenceLocationField: "电话会议，拨入号码：{dialInNumber}",
  scheduleError: "对不起，出了点问题，请重试。",
  noMeetingPermission: "对不起，您没有使用 {brandName} Meetings 的权限。请联系贵公司的管理员以继续。",
  noConferencePermission: "对不起，您没有使用 {brandName} 电话会议的权限。请联系贵公司的管理员以继续。",
  conferenceTitle: "{displayName}的电话会议",
  internationalNumber: "国际拨入号码：",
  inviteText_att: "请加入 {brandName} 电话会议。\n\n拨入号码：{formattedDialInNumber} \n{additionalNumbersSection} \n参与者访问码：{participantCode} \n\n需要国际拨入电话号码？请访问 {dialInNumbersLinks} \n\n此电话会议由 {brandName} 电话会议提供。",
  inviteText_bt: "请加入 {brandName} 电话会议。\n\n拨入号码：{formattedDialInNumber} \n{additionalNumbersSection} \n参与者访问码：{participantCode} \n\n附加拨入号码：{dialInNumbersLinks} ",
  inviteText_rc: "请加入 {brandName} 电话会议。\n\n拨入号码：{formattedDialInNumber} \n{additionalNumbersSection} \n参与者访问码：{participantCode} \n\n需要国际拨入电话号码？请访问 {dialInNumbersLinks} \n\n此电话会议由 {brandName} 电话会议提供。",
  inviteText_telus: "请加入 {brandName} 电话会议。\n\n拨入号码：{formattedDialInNumber} \n{additionalNumbersSection} \n参与者访问码：{participantCode}\n\n附加拨入号码：{dialInNumbersLinks} ",
  conferenceCall: "{brandName} 语音通话",
  videoCall: "{brandName} 视频通话",
  addConferencingDetails: "添加电话会议详细信息",
  updateConferencingDetails: "更新电话会议详细信息"
}, _defineProperty(_inviteMeetingContent, "scheduleError", "对不起，出了点问题，请重试。"), _defineProperty(_inviteMeetingContent, "deleteBtn", "删除"), _defineProperty(_inviteMeetingContent, "settingsBtn", "设置"), _defineProperty(_inviteMeetingContent, "saveAsDefaultAndNotShowAgain", "保存为默认值且不再显示"), _defineProperty(_inviteMeetingContent, "saveAsDefault", "保存为默认值"), _defineProperty(_inviteMeetingContent, "done", "完成"), _defineProperty(_inviteMeetingContent, "update", "更新"), _defineProperty(_inviteMeetingContent, "conferenceSettingsTitle", "{brand} 电话会议设置"), _defineProperty(_inviteMeetingContent, "videoSettingsTitle", "{brand} 会议设置"), _defineProperty(_inviteMeetingContent, "password", "密码"), _defineProperty(_inviteMeetingContent, "failedToRetrieveMeeting", "网络连接中断。请删除此会议，然后再重试。"), _defineProperty(_inviteMeetingContent, "meetingSettingsTitle", "{brand} 会议 - 设置"), _defineProperty(_inviteMeetingContent, "recurringMeeting", "定期会议"), _defineProperty(_inviteMeetingContent, "meetingOptions", "会议选项"), _defineProperty(_inviteMeetingContent, "schedule", "计划"), _defineProperty(_inviteMeetingContent, "settingsBtn", "设置"), _inviteMeetingContent); // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\n Or iPhone one-tap:\n\t    {mobileDialingNumberTpl}\n\n    Or Telephone:\n\t     Dial:\n\t    {phoneDialingNumberTpl}\n\t     Meeting ID: {meetingId}\n\t     International numbers available: {teleconference} "@#@
// @key: @#@"conferenceLocationField"@#@ @source: @#@"Conference Meeting, Dial-in Number: {dialInNumber}"@#@
// @key: @#@"scheduleError"@#@ @source: @#@"Sorry, something went wrong, please try again."@#@
// @key: @#@"noMeetingPermission"@#@ @source: @#@"Sorry, you don't have {brandName} Meetings permissions. Contact your company administrator to continue."@#@
// @key: @#@"noConferencePermission"@#@ @source: @#@"Sorry, you don't have {brandName} Conference permissions. Contact your company administrator to continue."@#@
// @key: @#@"conferenceTitle"@#@ @source: @#@"{displayName}'s Conference Meeting"@#@
// @key: @#@"internationalNumber"@#@ @source: @#@"International Dial-in Numbers:"@#@
// @key: @#@"inviteText_att"@#@ @source: @#@"Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nNeed an international dial-in phone number? Please visit {dialInNumbersLinks} \n\nThis conference call is brought to you by {brandName} Conferencing."@#@
// @key: @#@"inviteText_bt"@#@ @source: @#@"Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nAdditional dial-in numbers {dialInNumbersLinks} "@#@
// @key: @#@"inviteText_rc"@#@ @source: @#@"Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nNeed an international dial-in phone number? Please visit {dialInNumbersLinks} \n\nThis conference call is brought to you by {brandName} Conferencing."@#@
// @key: @#@"inviteText_telus"@#@ @source: @#@"Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nAdditional dial-in numbers {dialInNumbersLinks} "@#@
// @key: @#@"conferenceCall"@#@ @source: @#@"{brandName} Conference Call"@#@
// @key: @#@"videoCall"@#@ @source: @#@"{brandName} Video Call"@#@
// @key: @#@"addConferencingDetails"@#@ @source: @#@"Adding conferencing details"@#@
// @key: @#@"updateConferencingDetails"@#@ @source: @#@"Updating conferencing details"@#@
// @key: @#@"deleteBtn"@#@ @source: @#@"Delete"@#@
// @key: @#@"settingsBtn"@#@ @source: @#@"Settings"@#@
// @key: @#@"saveAsDefaultAndNotShowAgain"@#@ @source: @#@"Save as default and do not show again"@#@
// @key: @#@"saveAsDefault"@#@ @source: @#@"Save as default"@#@
// @key: @#@"done"@#@ @source: @#@"Done"@#@
// @key: @#@"update"@#@ @source: @#@"Update"@#@
// @key: @#@"conferenceSettingsTitle"@#@ @source: @#@"{brand} Conference Settings"@#@
// @key: @#@"videoSettingsTitle"@#@ @source: @#@"{brand} Meetings Settings"@#@
// @key: @#@"password"@#@ @source: @#@"Password"@#@
// @key: @#@"failedToRetrieveMeeting"@#@ @source: @#@"The network connection is lost. Delete this meeting and try again later."@#@
// @key: @#@"meetingSettingsTitle"@#@ @source: @#@"{brand} Meetings - Settings"@#@
// @key: @#@"recurringMeeting"@#@ @source: @#@"Recurring Meeting"@#@
// @key: @#@"meetingOptions"@#@ @source: @#@"Meeting Options"@#@
// @key: @#@"schedule"@#@ @source: @#@"Schedule"@#@


exports["default"] = _default;
//# sourceMappingURL=zh-CN.js.map
