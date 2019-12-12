"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _inviteMeetingContent;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_inviteMeetingContent = {
  inviteMeetingContent: "{accountName} 邀請您加入 {brandName} 會議。\n\n從 PC、Mac、iOS、Android 加入：{joinUri}{passwordTpl}\n\n 或從 iPhone 點選加入：\n\t    {mobileDialingNumberTpl}\n\n    或從電話加入：\n\t     撥號：\n\t    {phoneDialingNumberTpl}\n\t     會議 ID：{meetingId}\n\t     可用的國際號碼： {teleconference} ",
  conferenceLocationField: "會議撥入號碼：{dialInNumber}",
  scheduleError: "抱歉，發生問題，請再試一次。",
  noMeetingPermission: "抱歉，您沒有使用 {brandName} Meetings 的權限。請聯絡貴公司管理員以繼續。",
  noConferencePermission: "抱歉，您沒有使用 {brandName} 電話會議的權限。請聯絡貴公司管理員以繼續。",
  conferenceTitle: "{displayName} 的電話會議",
  internationalNumber: "國際電話撥入號碼：",
  inviteText_att: "請加入 {brandName} 電話會議。\n\n撥入號碼：{formattedDialInNumber} \n{additionalNumbersSection} \n參與者存取碼：{participantCode} \n\n需要國際撥入電話號碼嗎？請造訪 {dialInNumbersLinks} \n\n此電話會議由 {brandName} 電話會議提供。",
  inviteText_bt: "請加入 {brandName} 電話會議。\n\n撥入號碼：{formattedDialInNumber} \n{additionalNumbersSection} \n參與者存取碼：{participantCode} \n\n其他撥入號碼 {dialInNumbersLinks} ",
  inviteText_rc: "請加入 {brandName} 電話會議。\n\n撥入號碼：{formattedDialInNumber} \n{additionalNumbersSection} \n參與者存取碼：{participantCode} \n\n需要國際撥入電話號碼嗎？請造訪 {dialInNumbersLinks} \n\n此電話會議由 {brandName} 電話會議提供。",
  inviteText_telus: "請加入 {brandName} 電話會議。\n\n撥入號碼：{formattedDialInNumber} \n{additionalNumbersSection} \n參與者存取碼：{participantCode}\n\n其他撥入號碼 {dialInNumbersLinks} ",
  conferenceCall: "{brandName} 電話會議",
  videoCall: "{brandName} 視訊會議",
  addConferencingDetails: "新增電話會議詳細資料",
  updateConferencingDetails: "更新電話會議詳細資料"
}, _defineProperty(_inviteMeetingContent, "scheduleError", "抱歉，發生問題，請再試一次。"), _defineProperty(_inviteMeetingContent, "deleteBtn", "刪除"), _defineProperty(_inviteMeetingContent, "settingsBtn", "設定"), _defineProperty(_inviteMeetingContent, "saveAsDefaultAndNotShowAgain", "儲存為預設值且不再顯示"), _defineProperty(_inviteMeetingContent, "saveAsDefault", "儲存為預設值"), _defineProperty(_inviteMeetingContent, "done", "完成"), _defineProperty(_inviteMeetingContent, "update", "更新"), _defineProperty(_inviteMeetingContent, "conferenceSettingsTitle", "{brand} 電話會議設定"), _defineProperty(_inviteMeetingContent, "videoSettingsTitle", "{brand} 會議設定"), _defineProperty(_inviteMeetingContent, "password", "密碼"), _defineProperty(_inviteMeetingContent, "failedToRetrieveMeeting", "網路連線中斷。刪除此會議並稍後再試一次。"), _defineProperty(_inviteMeetingContent, "meetingSettingsTitle", "{brand} 會議 - 設定"), _defineProperty(_inviteMeetingContent, "recurringMeeting", "定期會議"), _defineProperty(_inviteMeetingContent, "meetingOptions", "會議選項"), _defineProperty(_inviteMeetingContent, "schedule", "排程"), _defineProperty(_inviteMeetingContent, "settingsBtn", "設定"), _inviteMeetingContent); // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\n Or iPhone one-tap:\n\t    {mobileDialingNumberTpl}\n\n    Or Telephone:\n\t     Dial:\n\t    {phoneDialingNumberTpl}\n\t     Meeting ID: {meetingId}\n\t     International numbers available: {teleconference} "@#@
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
//# sourceMappingURL=zh-TW.js.map
