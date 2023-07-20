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
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default = (_inviteMeetingContent = {
  inviteMeetingContent: "{accountName} 님이 {brandName} 모임에 회원님을 초대 중입니다.\n\nPC, Mac, iOS 또는 Android에서 참가: {joinUri}{passwordTpl}\n\n 또는 iPhone 한 번 탭:\n\t    {mobileDialingNumberTpl}\n\n    또는 전화:\n\t     전화 걸기:\n\t    {phoneDialingNumberTpl}\n\t     모임 ID: {meetingId}\n\t     사용 가능한 국제 번호: {teleconference} ",
  conferenceLocationField: "전화 회의 모임, 전화 접속 번호: {dialInNumber}",
  scheduleError: "죄송합니다. 문제가 발생했습니다. 다시 시도하세요.",
  noMeetingPermission: "죄송합니다. {brandName} 모임 권한이 없습니다. 계속하려면 회사 관리자에게 문의하세요.",
  noConferencePermission: "죄송합니다. {brandName} 전화 회의 권한이 없습니다. 계속하려면 회사 관리자에게 문의하세요.",
  conferenceTitle: "{displayName}의 전화 회의 모임",
  internationalNumber: "국제 전화 접속 번호:",
  inviteText_att: "{brandName} 전화 회의에 참가하세요.\n\n전화 접속 번호: {formattedDialInNumber} \n{additionalNumbersSection} \n참가자 액세스: {participantCode} \n\n국제 전화 접속 전화번호가 필요하신가요? {dialInNumbersLink}을(를) 방문하세요. \n\n이 전화 회의는 {brandName} 전화 회의에서 제공됩니다",
  inviteText_bt: "{brandName} 전화 회의에 참가하세요.\n\n전화 접속 번호: {formattedDialInNumber} \n{additionalNumbersSection} \n참가자 액세스: {participantCode} \n\n추가 전화 접속 번호{dialInNumbersLink} ",
  inviteText_rc: "{brandName} 전화 회의에 참가하세요.\n\n전화 접속 번호: {formattedDialInNumber} \n{additionalNumbersSection} \n참가자 액세스: {participantCode} \n\n국제 전화 접속 전화번호가 필요하신가요? {dialInNumbersLink}을(를) 방문하세요. \n\n이 전화 회의는 {brandName} 전화 회의에서 제공됩니다",
  inviteText_telus: "{brandName} 전화 회의에 참가하세요.\n\n전화 접속 번호: {formattedDialInNumber} \n{additionalNumbersSection} \n참가자 액세스: {participantCode} \n\n추가 전화 접속 번호{dialInNumbersLink} ",
  conferenceCall: "{brandName} 전화 회의",
  videoCall: "{brandName} Video Call",
  addConferencingDetails: "전화 회의 세부 정보 추가",
  updateConferencingDetails: "전화 회의 세부 정보 업데이트"
}, _defineProperty(_inviteMeetingContent, "scheduleError", "죄송합니다. 문제가 발생했습니다. 다시 시도하세요."), _defineProperty(_inviteMeetingContent, "deleteBtn", "삭제"), _defineProperty(_inviteMeetingContent, "settingsBtn", "설정"), _defineProperty(_inviteMeetingContent, "saveAsDefaultAndNotShowAgain", "기본값으로 저장하고 다시 표시 안 함"), _defineProperty(_inviteMeetingContent, "saveAsDefault", "기본값으로 저장"), _defineProperty(_inviteMeetingContent, "done", "완료"), _defineProperty(_inviteMeetingContent, "update", "업데이트"), _defineProperty(_inviteMeetingContent, "conferenceSettingsTitle", "{brand} 전화 회의 설정"), _defineProperty(_inviteMeetingContent, "videoSettingsTitle", "{brand} 모임 설정"), _defineProperty(_inviteMeetingContent, "password", "비밀번호"), _defineProperty(_inviteMeetingContent, "failedToRetrieveMeeting", "네트워크 연결이 끊어졌습니다. 이 모임을 삭제하고 나중에 다시 시도하세요."), _defineProperty(_inviteMeetingContent, "meetingSettingsTitle", "{brand} 모임 - 설정"), _defineProperty(_inviteMeetingContent, "recurringMeeting", "되풀이 모임"), _defineProperty(_inviteMeetingContent, "meetingOptions", "모임 옵션"), _defineProperty(_inviteMeetingContent, "schedule", "예약"), _defineProperty(_inviteMeetingContent, "settingsBtn", "설정"), _inviteMeetingContent); // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\n Or iPhone one-tap:\n\t    {mobileDialingNumberTpl}\n\n    Or Telephone:\n\t     Dial:\n\t    {phoneDialingNumberTpl}\n\t     Meeting ID: {meetingId}\n\t     International numbers available: {teleconference} "@#@
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
//# sourceMappingURL=ko-KR.js.map
