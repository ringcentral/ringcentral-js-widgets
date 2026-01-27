"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* eslint-disable */
var _default = exports["default"] = {
  video: '視訊',
  meetingTitle: '會議標題',
  date: '日期',
  time: '時間',
  duration: '時長',
  scheduleVideoMeeting: '排程視訊會議',
  requirePassword: '需要密碼',
  requirePasswordDescription: '確保會議安全。系統不會提示使用該連結的任何人輸入密碼。',
  password: '密碼',
  edit: '編輯',
  noPasswordSet: '未設定密碼',
  manageWhoCanJoin: '管理哪些人可加入',
  useWaitingRoom: '使用等候室',
  useWaitingRoomDescription: '參與者需要一直等待，等到您准許他們加入。非常適合面試或邀請外部與會者參加。',
  startMeetingAfterJoin: '在您加入後開始會議',
  startMeetingAfterJoinDescription: '為了防止對話提前進行，會議將在您加入後開始。',
  usePersonalMeetingLink: '使用個人會議連結',
  personalMeetingLink: '個人會議連結',
  editSettings: '編輯設定',
  scheduleMeeting: '排程會議',
  cancel: '取消',
  update: '更新',
  updating: '更新中...',
  passwordFormatError: '您的密碼須為 1 到 10 個字母和數字，但不得包含任何符號',
  passwordRequiredError: '密碼為必填',
  updatePassword: '更新密碼',
  passwordRequired: '密碼為必填',
  passwordValidationHint: '輸入 1-10 個字元的密碼（僅限字母和數字）',
  anyoneWithLink: '收到連結的任何人',
  onlyRingCentralAccounts: '僅限 {shortName} 帳戶',
  onlyMyCoworkers: '僅限我的同事',
  allParticipants: '所有參與者',
  forAnyoneOutsideMyCompany: '適用於公司以外的任何人',
  forAnyoneNotSignedIn: '適用於任何未登入的人',
  personalMeetingSettings: '個人會議設定',
  personalMeetingSettingsDescription: '設定哪些人可以使用您的個人會議連結加入，以及如何加入。',
  hour: '小時',
  minute: '分鐘',
  adminLockedSetting: '此設定由公司管理員管理',
  passwordPlaceholder: '輸入密碼'
}; // @key: @#@"video"@#@ @source: @#@"Video"@#@
// @key: @#@"meetingTitle"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"time"@#@ @source: @#@"Time"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"scheduleVideoMeeting"@#@ @source: @#@"Schedule video meeting"@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"requirePasswordDescription"@#@ @source: @#@"Keep your meeting secure. Anyone using the link won’t be prompted for a password."@#@
// @key: @#@"password"@#@ @source: @#@"Password"@#@
// @key: @#@"edit"@#@ @source: @#@"Edit"@#@
// @key: @#@"noPasswordSet"@#@ @source: @#@"No password set"@#@
// @key: @#@"manageWhoCanJoin"@#@ @source: @#@"Manage who can join"@#@
// @key: @#@"useWaitingRoom"@#@ @source: @#@"Use waiting room"@#@
// @key: @#@"useWaitingRoomDescription"@#@ @source: @#@"Participants wait until you admit them. Great for interviews or outside attendees."@#@
// @key: @#@"startMeetingAfterJoin"@#@ @source: @#@"Start meeting after you join"@#@
// @key: @#@"startMeetingAfterJoinDescription"@#@ @source: @#@"The meeting will start after you join to prevent early conversations."@#@
// @key: @#@"usePersonalMeetingLink"@#@ @source: @#@"Use personal meeting link"@#@
// @key: @#@"personalMeetingLink"@#@ @source: @#@"Personal meeting link"@#@
// @key: @#@"editSettings"@#@ @source: @#@"Edit settings"@#@
// @key: @#@"scheduleMeeting"@#@ @source: @#@"Schedule meeting"@#@
// @key: @#@"cancel"@#@ @source: @#@"Cancel"@#@
// @key: @#@"update"@#@ @source: @#@"Update"@#@
// @key: @#@"updating"@#@ @source: @#@"Updating..."@#@
// @key: @#@"passwordFormatError"@#@ @source: @#@"Your password must be 1-10 letters and numbers long but cannot contain symbols"@#@
// @key: @#@"passwordRequiredError"@#@ @source: @#@"Password is required"@#@
// @key: @#@"updatePassword"@#@ @source: @#@"Update Password"@#@
// @key: @#@"passwordRequired"@#@ @source: @#@"Password is required"@#@
// @key: @#@"passwordValidationHint"@#@ @source: @#@"Enter a password 1-10 characters long (letters and numbers only)"@#@
// @key: @#@"anyoneWithLink"@#@ @source: @#@"Anyone with link"@#@
// @key: @#@"onlyRingCentralAccounts"@#@ @source: @#@"Only {shortName} accounts"@#@
// @key: @#@"onlyMyCoworkers"@#@ @source: @#@"Only my coworkers"@#@
// @key: @#@"allParticipants"@#@ @source: @#@"All participants"@#@
// @key: @#@"forAnyoneOutsideMyCompany"@#@ @source: @#@"For anyone outside my company"@#@
// @key: @#@"forAnyoneNotSignedIn"@#@ @source: @#@"For anyone not signed in"@#@
// @key: @#@"personalMeetingSettings"@#@ @source: @#@"Personal meeting settings"@#@
// @key: @#@"personalMeetingSettingsDescription"@#@ @source: @#@"Set who can join and how for your personal meeting link."@#@
// @key: @#@"hour"@#@ @source: @#@"hr"@#@
// @key: @#@"minute"@#@ @source: @#@"min"@#@
// @key: @#@"adminLockedSetting"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"passwordPlaceholder"@#@ @source: @#@"Enter Password"@#@
//# sourceMappingURL=zh-HK.js.map
