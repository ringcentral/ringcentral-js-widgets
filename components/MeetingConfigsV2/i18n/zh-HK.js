"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _Meeting = require("ringcentral-integration/modules/Meeting");

var _voIPOnly$telephonyOn;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_voIPOnly$telephonyOn = {
  voIPOnly: "僅限網路音訊",
  telephonyOnly: "僅限電話",
  both: "電話和網路音訊",
  meetingId: "會議 ID",
  password: "密碼",
  video: "視訊",
  audio: "音訊",
  scheduleFor: "代表以下對象排程"
}, _defineProperty(_voIPOnly$telephonyOn, _Meeting.ASSISTED_USERS_MYSELF, "我本人"), _defineProperty(_voIPOnly$telephonyOn, "meetingOptions", "會議選項"), _defineProperty(_voIPOnly$telephonyOn, "meetingSettings", "會議設定"), _defineProperty(_voIPOnly$telephonyOn, "rcMeetingSettings", "視訊會議設定"), _defineProperty(_voIPOnly$telephonyOn, "audioOptions", "音訊選項"), _defineProperty(_voIPOnly$telephonyOn, "recurringMeeting", "定期會議"), _defineProperty(_voIPOnly$telephonyOn, "recurringNote", "注意：選擇「定期」時請啟用此選項"), _defineProperty(_voIPOnly$telephonyOn, "joinBeforeHost", "允許參與者在主持人之前加入"), _defineProperty(_voIPOnly$telephonyOn, "turnOffCamera", "關閉參與者的相機"), _defineProperty(_voIPOnly$telephonyOn, "turnOffHostCamera", "主持人加入會議時請關閉攝影機"), _defineProperty(_voIPOnly$telephonyOn, "requirePassword", "需要密碼"), _defineProperty(_voIPOnly$telephonyOn, "setPassword", "請設定密碼 *"), _defineProperty(_voIPOnly$telephonyOn, "passwordEmptyError", "必須提供會議密碼"), _defineProperty(_voIPOnly$telephonyOn, "rcmPasswordInvalidError", "您的密碼必須包含 1 到 10 個字元和數字，並且不得包含任何符號 (除 @、* 或 - 以外)"), _defineProperty(_voIPOnly$telephonyOn, "rcmPasswordHintText", "您的密碼應包含 1 到 10 個字元和數字，並且不得包含任何符號 (除 @、* 或 - 以外)"), _defineProperty(_voIPOnly$telephonyOn, "usePersonalMeetingId", "使用個人會議 ID"), _defineProperty(_voIPOnly$telephonyOn, "pmiChangeConfirm", "如果您想變更個人會議， "), _defineProperty(_voIPOnly$telephonyOn, "changePmiSettings", "請變更 PMI 設定"), _defineProperty(_voIPOnly$telephonyOn, "pmiSettingChangeAlert", "若您變更設定並排程此會議，相同的最新設定會套用至使用個人會議 ID 的所有會議。"), _defineProperty(_voIPOnly$telephonyOn, "lockedTooltip", "此設定是由貴公司管理員負責管理"), _voIPOnly$telephonyOn); // @key: @#@"voIPOnly"@#@ @source: @#@"Internet audio only"@#@
// @key: @#@"telephonyOnly"@#@ @source: @#@"Telephone only"@#@
// @key: @#@"both"@#@ @source: @#@"Telephone and Internet Audio"@#@
// @key: @#@"meetingId"@#@ @source: @#@"Meeting ID"@#@
// @key: @#@"password"@#@ @source: @#@"Password"@#@
// @key: @#@"video"@#@ @source: @#@"Video"@#@
// @key: @#@"audio"@#@ @source: @#@"Audio"@#@
// @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"meetingOptions"@#@ @source: @#@"Meeting options"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"rcMeetingSettings"@#@ @source: @#@"Video Meeting settings"@#@
// @key: @#@"audioOptions"@#@ @source: @#@"Audio options"@#@
// @key: @#@"recurringMeeting"@#@ @source: @#@"Recurring meeting"@#@
// @key: @#@"recurringNote"@#@ @source: @#@"Note: Enable this one when choosing \"Recurrence\""@#@
// @key: @#@"joinBeforeHost"@#@ @source: @#@"Allow participants to join before host"@#@
// @key: @#@"turnOffCamera"@#@ @source: @#@"Turn off camera for participants"@#@
// @key: @#@"turnOffHostCamera"@#@ @source: @#@"Turn off camera for host when joining meeting"@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"setPassword"@#@ @source: @#@"Set password *"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"rcmPasswordInvalidError"@#@ @source: @#@"Your password must be 1-10 characters, numbers long and cannot have symbols except @, * or -"@#@
// @key: @#@"rcmPasswordHintText"@#@ @source: @#@"Your password should be 1-10 characters, numbers long and cannot have symbols except @, * or -"@#@
// @key: @#@"usePersonalMeetingId"@#@ @source: @#@"Use Personal Meeting ID"@#@
// @key: @#@"pmiChangeConfirm"@#@ @source: @#@"If you want to make changes for your Personal Meeting, "@#@
// @key: @#@"changePmiSettings"@#@ @source: @#@"change PMI settings"@#@
// @key: @#@"pmiSettingChangeAlert"@#@ @source: @#@"If you change the settings and schedule this meeting, all of meetings with Personal Meeting ID will use the same latest settings."@#@
// @key: @#@"lockedTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@


exports["default"] = _default;
//# sourceMappingURL=zh-HK.js.map
