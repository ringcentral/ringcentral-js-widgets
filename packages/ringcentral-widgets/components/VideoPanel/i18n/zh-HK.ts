import { ASSISTED_USERS_MYSELF } from '@ringcentral-integration/commons/modules/RcVideo';
export default {
  topic: "會議標題",
  date: "日期",
  startTime: "時間",
  duration: "時長",
  scheduleFor: "代表以下對象安排時間",
  meetingSettings: "會議設定",
  [ASSISTED_USERS_MYSELF]: "我本人",
  joinBeforeHost: "允許參與者在主持人之前加入",
  enableWaitingRoom: "啟用等候室",
  waitingRoom: "為以下對象啟用等候室",
  waitingRoomNotCoworker: "公司以外任何人",
  waitingRoomGuest: "未登入的任何人",
  waitingRoomAll: "所有人",
  enterPassword: "輸入密碼",
  onlyJoinAfterMe: "參與者只能在我之後加入",
  onlyJoinAfterHost: "參加者僅能在主持人之後加入",
  muteAudio: "靜音參與者的音訊",
  turnOffCamera: "關閉參與者的相機",
  requirePassword: "需要密碼",
  useE2ee: "使用端對端加密",
  e2eeTooltip: "端對端加密的會議最具私密性，但無法使用透過電話加入、隱藏式字幕和錄製等功能。",
  setPassword: "請設定密碼 *",
  setPasswordNotSymbol: "請設定密碼",
  passwordEmptyError: "需要會議密碼",
  passwordInvalidError: "您的密碼須為 1 到 10 個字母和數字，但不得包含任何符號",
  passwordHintText: "您的密碼應為 1 到 10 個字母和數字，但不得包含任何符號",
  usePersonalMeetingId: "使用個人會議 ID",
  meetingSettingsSecurity: "安全性",
  onlyAuthUserJoin: "只有通過驗證的使用者可以加入",
  signedInUsers: "已登入的使用者",
  signedInCoWorkers: "登入的同仁",
  limitScreenSharing: "只有主持人和仲裁者可以分享畫面",
  lockTooltip: "此設定由貴公司管理員管理",
  pmiSettingAlert: "這些設定將套用至所有使用 PMI 建立的會議",
  today: "今日",
  scheduleForGuidance: "要為其他人排程嗎？\n1. 請確認您在他們的 Outlook 行事曆中。\n2. 從下拉選單中選取您要幫助其排程的人員。\n",
  scheduleForGuidanceMore: "瞭解詳細資訊",
  changePmiSettings: "變更個人會議設定",
  ieSupportAlert: "請注意，2022 年 2 月 16 日以後，{appName} 將無法再在 Internet Explorer 11 中使用。我們推薦您切換到 Microsoft Edge 或更新至 Outlook 2016 或以上版本。"
};

// @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"startTime"@#@ @source: @#@"Time"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"joinBeforeHost"@#@ @source: @#@"Allow participants to join before host"@#@
// @key: @#@"enableWaitingRoom"@#@ @source: @#@"Enable waiting room"@#@
// @key: @#@"waitingRoom"@#@ @source: @#@"Enable waiting room for"@#@
// @key: @#@"waitingRoomNotCoworker"@#@ @source: @#@"Anyone outside my company"@#@
// @key: @#@"waitingRoomGuest"@#@ @source: @#@"Anyone not signed in"@#@
// @key: @#@"waitingRoomAll"@#@ @source: @#@"Everyone"@#@
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
// @key: @#@"onlyJoinAfterMe"@#@ @source: @#@"Participants can only join after me"@#@
// @key: @#@"onlyJoinAfterHost"@#@ @source: @#@"Participants can only join after host"@#@
// @key: @#@"muteAudio"@#@ @source: @#@"Mute audio for participants"@#@
// @key: @#@"turnOffCamera"@#@ @source: @#@"Turn off camera for participants"@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"useE2ee"@#@ @source: @#@"Use end-to-end encryption"@#@
// @key: @#@"e2eeTooltip"@#@ @source: @#@"End-to-end encrypted meetings are the most private, but features like joining by phone, closed captions, and recording aren't available."@#@
// @key: @#@"setPassword"@#@ @source: @#@"Set password *"@#@
// @key: @#@"setPasswordNotSymbol"@#@ @source: @#@"Set password"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"passwordInvalidError"@#@ @source: @#@"Your password must be 1-10 letters and numbers long but cannot contain symbols"@#@
// @key: @#@"passwordHintText"@#@ @source: @#@"Your password should be 1-10 letters and numbers long but cannot contain symbols"@#@
// @key: @#@"usePersonalMeetingId"@#@ @source: @#@"Use Personal Meeting ID"@#@
// @key: @#@"meetingSettingsSecurity"@#@ @source: @#@"Security"@#@
// @key: @#@"onlyAuthUserJoin"@#@ @source: @#@"Only authenticated users can join"@#@
// @key: @#@"signedInUsers"@#@ @source: @#@"Signed in users"@#@
// @key: @#@"signedInCoWorkers"@#@ @source: @#@"Signed in co-workers"@#@
// @key: @#@"limitScreenSharing"@#@ @source: @#@"Only host & moderators can share screen"@#@
// @key: @#@"lockTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"pmiSettingAlert"@#@ @source: @#@"These settings will apply to all meetings created with PMI"@#@
// @key: @#@"today"@#@ @source: @#@"Today"@#@
// @key: @#@"scheduleForGuidance"@#@ @source: @#@"Scheduling for someone else?\n1. Make sure you're on their Outlook calendar.\n2. From the dropdown, select the person you're scheduling for.\n"@#@
// @key: @#@"scheduleForGuidanceMore"@#@ @source: @#@"Learn details"@#@
// @key: @#@"changePmiSettings"@#@ @source: @#@"Change Personal Meeting settings"@#@
// @key: @#@"ieSupportAlert"@#@ @source: @#@"Please note that {appName} won't work with Internet Explorer 11 after Feb 16, 2022. We recommend switching to Microsoft Edge or updating to Outlook 2016 or above."@#@
