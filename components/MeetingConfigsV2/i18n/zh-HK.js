"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _Meeting = require("@ringcentral-integration/commons/modules/Meeting");

var _date$time$hours$minu;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_date$time$hours$minu = {
  date: "日期",
  time: "時間",
  hours: "{howMany} 小時",
  minutes: "{howMany} 分",
  today: "今日",
  duration: "時長",
  topic: "會議標題",
  voIPOnly: "僅限網路音訊",
  telephonyOnly: "僅限電話",
  both: "電話和網路音訊",
  thirdParty: "第三方音訊",
  meetingId: "會議 ID",
  password: "密碼",
  video: "視訊",
  audio: "音訊",
  scheduleFor: "代表以下對象排程"
}, _defineProperty(_date$time$hours$minu, _Meeting.ASSISTED_USERS_MYSELF, "我本人"), _defineProperty(_date$time$hours$minu, "meetingOptions", "會議選項"), _defineProperty(_date$time$hours$minu, "meetingSettings", "會議設定"), _defineProperty(_date$time$hours$minu, "rcMeetingSettings", "視訊會議設定"), _defineProperty(_date$time$hours$minu, "audioOptions", "音訊選項"), _defineProperty(_date$time$hours$minu, "recurringMeeting", "定期會議"), _defineProperty(_date$time$hours$minu, "recurringNote", "注意：選擇「定期」時請啟用此選項"), _defineProperty(_date$time$hours$minu, "joinBeforeHost", "允許參與者在主持人之前加入"), _defineProperty(_date$time$hours$minu, "turnOffCamera", "關閉參與者的相機"), _defineProperty(_date$time$hours$minu, "turnOffHostCamera", "主持人加入會議時請關閉攝影機"), _defineProperty(_date$time$hours$minu, "requirePassword", "需要密碼"), _defineProperty(_date$time$hours$minu, "enterPassword", "輸入密碼"), _defineProperty(_date$time$hours$minu, "setPassword", "請設定密碼 *"), _defineProperty(_date$time$hours$minu, "passwordEmptyError", "必須提供會議密碼"), _defineProperty(_date$time$hours$minu, "rcmPasswordInvalidError", "您的密碼必須包含 1 到 10 個字元和數字，並且不得包含任何符號 (除 @、* 或 - 以外)"), _defineProperty(_date$time$hours$minu, "rcmPasswordHintText", "您的密碼應包含 1 到 10 個字元和數字，並且不得包含任何符號 (除 @、* 或 - 以外)"), _defineProperty(_date$time$hours$minu, "usePersonalMeetingId", "使用個人會議 ID"), _defineProperty(_date$time$hours$minu, "pmiChangeConfirm", "如果您想變更個人會議， "), _defineProperty(_date$time$hours$minu, "changePmiSettings", "請變更 PMI 設定"), _defineProperty(_date$time$hours$minu, "pmiSettingChangeAlert", "若您變更設定並排程此會議，相同的最新設定會套用至使用個人會議 ID 的所有會議。"), _defineProperty(_date$time$hours$minu, "lockedTooltip", "此設定是由貴公司管理員負責管理"), _defineProperty(_date$time$hours$minu, "when", "時間"), _defineProperty(_date$time$hours$minu, "recurringDescribe", "請記得確認傳送給列席者的行事曆邀請中的定期或重複會議。"), _defineProperty(_date$time$hours$minu, "ieSupportAlert", "請注意 {appName} 在 2022 年二月 16 日以後將不再與 Internet Explorer 11 合作。我們推薦您切換到 Microsoft Edge 或更新至 Outlook 2016 或以上版本。"), _date$time$hours$minu); // @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"time"@#@ @source: @#@"Time"@#@
// @key: @#@"hours"@#@ @source: @#@"{howMany} hr"@#@
// @key: @#@"minutes"@#@ @source: @#@"{howMany} min"@#@
// @key: @#@"today"@#@ @source: @#@"Today"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"voIPOnly"@#@ @source: @#@"Internet audio only"@#@
// @key: @#@"telephonyOnly"@#@ @source: @#@"Telephone only"@#@
// @key: @#@"both"@#@ @source: @#@"Telephone and Internet audio"@#@
// @key: @#@"thirdParty"@#@ @source: @#@"3rd party audio"@#@
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
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
// @key: @#@"setPassword"@#@ @source: @#@"Set password *"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"rcmPasswordInvalidError"@#@ @source: @#@"Your password must be 1-10 characters, numbers long and cannot have symbols except @, * or -"@#@
// @key: @#@"rcmPasswordHintText"@#@ @source: @#@"Your password should be 1-10 characters, numbers long and cannot have symbols except @, * or -"@#@
// @key: @#@"usePersonalMeetingId"@#@ @source: @#@"Use Personal Meeting ID"@#@
// @key: @#@"pmiChangeConfirm"@#@ @source: @#@"If you want to make changes for your Personal Meeting, "@#@
// @key: @#@"changePmiSettings"@#@ @source: @#@"change PMI settings"@#@
// @key: @#@"pmiSettingChangeAlert"@#@ @source: @#@"If you change the settings and schedule this meeting, all of meetings with Personal Meeting ID will use the same latest settings."@#@
// @key: @#@"lockedTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"when"@#@ @source: @#@"When"@#@
// @key: @#@"recurringDescribe"@#@ @source: @#@"Please remember to check recurrence or repeat in your calendar invitation to your attendees."@#@
// @key: @#@"ieSupportAlert"@#@ @source: @#@"Please note that {appName} won't work with Internet Explorer 11 after Feb 16, 2022. We recommend switching to Microsoft Edge or updating to Outlook 2016 or above."@#@


exports["default"] = _default;
//# sourceMappingURL=zh-HK.js.map
