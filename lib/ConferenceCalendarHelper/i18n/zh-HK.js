"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _inviteMeetingContent;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_inviteMeetingContent = {
  inviteMeetingContent: "{accountName} 正邀請您加入 {brandName} 會議。\n\n透過 PC、Mac、iOS 或 Android 參加：{joinUri}{passwordTpl}\n\n 或 iPhone 觸碰一次：\n\t    {mobileDialingNumberTpl}\n\n    或電話：\n\t     撥號：\n\t    {phoneDialingNumberTpl}\n\t     會議 ID：{meetingId}\n\t     可使用的國際號碼：{teleconference} ",
  conferenceLocationField: "會議撥入號碼：{dialInNumber}",
  scheduleError: "抱歉，發生問題，請再試一次。",
  noMeetingPermission: "抱歉，您沒有使用 {brandName} Meetings 的權限。請連絡貴公司管理員以繼續。",
  noConferencePermission: "抱歉，您沒有使用 {brandName} 電話會議的權限。請連絡貴公司管理員以繼續。",
  conferenceTitle: "{displayName} 的電話會議",
  internationalNumber: "國際電話撥入號碼：",
  inviteText_att: "請加入 {brandName} 會議。\n\n撥入號碼：{formattedDialInNumber} \n{additionalNumbersSection} \n參與者存取碼：{participantCode}需要國際撥入電話號碼嗎？ \n\n請前往 {dialInNumbersLink} \n\n此電話會議由 {brandName} Conferencing 提供。",
  inviteText_bt: "請加入 {brandName} 會議。\n\n撥入號碼：{formattedDialInNumber} \n{additionalNumbersSection} \n參與者存取碼：{participantCode} \n\n其他撥入號碼 {dialInNumbersLink} ",
  inviteText_rc: "請加入 {brandName} 會議。\n\n撥入號碼：{formattedDialInNumber} \n{additionalNumbersSection} \n參與者存取碼：{participantCode}需要國際撥入電話號碼嗎？ \n\n請前往 {dialInNumbersLink} \n\n此電話會議由 {brandName} Conferencing 提供。",
  inviteText_telus: "請加入 {brandName} 會議。\n\n撥入號碼：{formattedDialInNumber} \n{additionalNumbersSection} \n參與者存取碼：{participantCode} \n\n其他撥入號碼 {dialInNumbersLink} ",
  conferenceCall: "{brandName} 電話會議",
  videoCall: "{brandName} 視訊會議",
  addConferencingDetails: "新增電話會議詳細資料",
  updateConferencingDetails: "更新電話會議詳細資料"
}, _defineProperty(_inviteMeetingContent, "scheduleError", "抱歉，發生問題，請再試一次。"), _defineProperty(_inviteMeetingContent, "deleteBtn", "刪除"), _defineProperty(_inviteMeetingContent, "settingsBtn", "設定"), _defineProperty(_inviteMeetingContent, "saveAsDefaultAndNotShowAgain", "儲存為預設值且不再顯示"), _defineProperty(_inviteMeetingContent, "saveAsDefault", "儲存為預設值"), _defineProperty(_inviteMeetingContent, "done", "完成"), _defineProperty(_inviteMeetingContent, "update", "更新"), _defineProperty(_inviteMeetingContent, "conferenceSettingsTitle", "{brand} 電話會議設定"), _defineProperty(_inviteMeetingContent, "videoSettingsTitle", "{brand} Meetings 設定"), _defineProperty(_inviteMeetingContent, "password", "密碼"), _defineProperty(_inviteMeetingContent, "failedToRetrieveMeeting", "網路連線中斷。請刪除此會議，並稍後再試一次。"), _defineProperty(_inviteMeetingContent, "meetingSettingsTitle", "{brand} Meetings - 設定"), _defineProperty(_inviteMeetingContent, "recurringMeeting", "定期會議"), _defineProperty(_inviteMeetingContent, "meetingOptions", "會議選項"), _defineProperty(_inviteMeetingContent, "schedule", "排程"), _defineProperty(_inviteMeetingContent, "settingsBtn", "設定"), _inviteMeetingContent); // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\n Or iPhone one-tap:\n\t    {mobileDialingNumberTpl}\n\n    Or Telephone:\n\t     Dial:\n\t    {phoneDialingNumberTpl}\n\t     Meeting ID: {meetingId}\n\t     International numbers available: {teleconference} "@#@
// @key: @#@"conferenceLocationField"@#@ @source: @#@"Conference Meeting, Dial-in Number: {dialInNumber}"@#@
// @key: @#@"scheduleError"@#@ @source: @#@"Sorry, something went wrong, please try again."@#@
// @key: @#@"noMeetingPermission"@#@ @source: @#@"Sorry, you don't have {brandName} Meetings permissions. Contact your company administrator to continue."@#@
// @key: @#@"noConferencePermission"@#@ @source: @#@"Sorry, you don't have {brandName} Conference permissions. Contact your company administrator to continue."@#@
// @key: @#@"conferenceTitle"@#@ @source: @#@"{displayName}'s Conference Meeting"@#@
// @key: @#@"internationalNumber"@#@ @source: @#@"International Dial-in Numbers:"@#@
// @key: @#@"inviteText_att"@#@ @source: @#@"Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nNeed an international dial-in phone number? Please visit {dialInNumbersLink} \n\nThis conference call is brought to you by {brandName} Conferencing."@#@
// @key: @#@"inviteText_bt"@#@ @source: @#@"Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nAdditional dial-in numbers {dialInNumbersLink} "@#@
// @key: @#@"inviteText_rc"@#@ @source: @#@"Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nNeed an international dial-in phone number? Please visit {dialInNumbersLink} \n\nThis conference call is brought to you by {brandName} Conferencing."@#@
// @key: @#@"inviteText_telus"@#@ @source: @#@"Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nAdditional dial-in numbers {dialInNumbersLink} "@#@
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
//# sourceMappingURL=zh-HK.js.map
