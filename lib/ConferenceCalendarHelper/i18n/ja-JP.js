"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _inviteMeetingContent;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_inviteMeetingContent = {
  inviteMeetingContent: "{accountName}から{brandName}会議に招待されています。\n\nPC、Mac、iOS、またはAndroidからの参加：{joinUri}{passwordTpl}\n\n またはiPhoneで1回タップ：\n\t    {mobileDialingNumberTpl}\n\n    または電話：\n\t     ダイヤル：\n\t    {phoneDialingNumberTpl}\n\t     会議ID：{meetingId}\n\t     利用可能な国際電話番号：{teleconference} ",
  conferenceLocationField: "音声会議、ダイヤルイン番号: {dialInNumber}",
  scheduleError: "問題が発生しました。お手数をおかけしますが、もう一度やり直してください。",
  noMeetingPermission: "申し訳ございませんが、お客様は{brandName}会議に参加する権限をお持ちではありません。続行するには、会社の管理者にお問い合わせください。",
  noConferencePermission: "申し訳ございませんが、お客様は{brandName}電話会議に参加する権限をお持ちではありません。続行するには、会社の管理者にお問い合わせください。",
  conferenceTitle: "{displayName}の音声会議",
  internationalNumber: "国際ダイヤルイン番号：",
  inviteText_att: "{brandName}電話会議に参加してください。\n\nダイヤルイン番号：{formattedDialInNumber} \n{additionalNumbersSection} \n参加者アクセス：{participantCode} \n\n国際ダイヤルイン番号が必要な場合は、{dialInNumbersLinks}にアクセスしてください。\n\nこの電話会議は{brandName} Conferencingによって提供されます。",
  inviteText_bt: "{brandName}電話会議に参加してください。\n\nダイヤルイン番号：{formattedDialInNumber} \n{additionalNumbersSection} \n参加者アクセス：{participantCode} \n\n追加のダイヤルイン番号{dialInNumbersLinks} ",
  inviteText_rc: "{brandName}電話会議に参加してください。\n\nダイヤルイン番号：{formattedDialInNumber} \n{additionalNumbersSection} \n参加者アクセス：{participantCode} \n\n国際ダイヤルイン番号が必要な場合は、{dialInNumbersLinks}にアクセスしてください。\n\nこの電話会議は{brandName} Conferencingによって提供されます。",
  inviteText_telus: "{brandName}電話会議に参加してください。\n\nダイヤルイン番号：{formattedDialInNumber} \n{additionalNumbersSection} \n参加者アクセス：{participantCode} \n\n追加のダイヤルイン番号{dialInNumbersLinks} ",
  conferenceCall: "{brandName}電話会議",
  videoCall: "{brandName}ビデオ通話",
  addConferencingDetails: "会議開催の詳細を追加中",
  updateConferencingDetails: "会議開催の詳細を更新中"
}, _defineProperty(_inviteMeetingContent, "scheduleError", "問題が発生しました。お手数をおかけしますが、もう一度やり直してください。"), _defineProperty(_inviteMeetingContent, "deleteBtn", "削除"), _defineProperty(_inviteMeetingContent, "settingsBtn", "設定"), _defineProperty(_inviteMeetingContent, "saveAsDefaultAndNotShowAgain", "既定として保存し次から表示しない"), _defineProperty(_inviteMeetingContent, "saveAsDefault", "既定として保存"), _defineProperty(_inviteMeetingContent, "done", "完了"), _defineProperty(_inviteMeetingContent, "update", "更新"), _defineProperty(_inviteMeetingContent, "conferenceSettingsTitle", "{brand}会議の設定"), _defineProperty(_inviteMeetingContent, "videoSettingsTitle", "{brand} Meetingsの設定"), _defineProperty(_inviteMeetingContent, "password", "パスワード"), _defineProperty(_inviteMeetingContent, "failedToRetrieveMeeting", "ネットワーク接続が切断されています。会議を削除し、後でもう一度やり直してください。"), _defineProperty(_inviteMeetingContent, "meetingSettingsTitle", "{brand} Meetings - 設定"), _defineProperty(_inviteMeetingContent, "recurringMeeting", "定期的な会議"), _defineProperty(_inviteMeetingContent, "meetingOptions", "会議のオプション"), _defineProperty(_inviteMeetingContent, "schedule", "スケジュール"), _defineProperty(_inviteMeetingContent, "settingsBtn", "設定"), _inviteMeetingContent); // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\n Or iPhone one-tap:\n\t    {mobileDialingNumberTpl}\n\n    Or Telephone:\n\t     Dial:\n\t    {phoneDialingNumberTpl}\n\t     Meeting ID: {meetingId}\n\t     International numbers available: {teleconference} "@#@
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
//# sourceMappingURL=ja-JP.js.map
