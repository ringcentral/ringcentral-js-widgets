import { ASSISTED_USERS_MYSELF } from '@ringcentral-integration/commons/modules/RcVideo';
export default {
  topic: "会议标题",
  date: "日期",
  startTime: "时间",
  duration: "时长",
  scheduleFor: "代表以下人员安排：",
  meetingSettings: "会议设置",
  [ASSISTED_USERS_MYSELF]: "我自己",
  joinBeforeHost: "允许参与者在主持人之前加入",
  enableWaitingRoom: "启用等候室",
  waitingRoom: "为以下人员启用等候室",
  waitingRoomNotCoworker: "我公司以外的任何人员",
  waitingRoomGuest: "任何未登录的人员",
  waitingRoomAll: "所有人",
  enterPassword: "输入密码",
  onlyJoinAfterMe: "参与者只能在我之后加入",
  onlyJoinAfterHost: "参与者只能在主持人之后加入",
  muteAudio: "为参与者静音",
  turnOffCamera: "关闭参与者的摄像头",
  requirePassword: "需要输入密码",
  useE2ee: "使用端到端加密",
  e2eeTooltip: "端到端加密会议的私密性最强，但无法使用通过电话加入、隐藏式字幕和录制等功能。",
  setPassword: "设置密码*",
  setPasswordNotSymbol: "设置密码",
  passwordEmptyError: "会议密码为必填项",
  passwordInvalidError: "密码必须包含 1 到 10 个字母和数字，但不能包含特殊符号",
  passwordHintText: "您的密码应为 1 到 10 个字母和数字，但不能包含特殊符号",
  usePersonalMeetingId: "使用个人会议 ID",
  meetingSettingsSecurity: "安全性",
  onlyAuthUserJoin: "只有经过身份验证的用户才能加入",
  signedInUsers: "已登录的用户",
  signedInCoWorkers: "已登录的同事",
  limitScreenSharing: "仅主持人和代理主持人可以共享屏幕",
  lockTooltip: "此设置由公司管理员管理",
  pmiSettingAlert: "这些设置将应用到使用 PMI 创建的所有会议",
  today: "今天",
  scheduleForGuidance: "要为其他人安排会议？\n1. 请确保您在他们的 Outlook 日历中。\n2. 从下拉列表中选择您要为其安排会议的人。\n",
  scheduleForGuidanceMore: "了解详情",
  changePmiSettings: "更改个人会议设置"
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
