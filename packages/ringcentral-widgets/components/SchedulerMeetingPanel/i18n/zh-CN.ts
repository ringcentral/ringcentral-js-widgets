/* eslint-disable */
import { ASSISTED_USERS_MYSELF } from '@ringcentral-integration/commons/modules/RcVideo';
export default {
  scheduleFor: '代表以下人员安排时间：',
  scheduleForAssistedUser: '代表 {userName} 更新会议设置。',
  scheduleForGuidance:
    '要为其他人安排会议？\n1. 请确保您在他们的 Outlook 日历中。\n2. 从下拉列表中选择您要为其安排会议的人。\n',
  scheduleForGuidanceMore: '了解详情',
  meetingSettings: '会议设置',
  meetingSettingsDescription: '更新将仅适用于此会议。',
  [ASSISTED_USERS_MYSELF]: '我本人',
  waitingRoomTitle: '使用等候室',
  waitingRoomDescription:
    '参与者需要一直等待，直到您允许他们加入。非常适合面试或邀请外部与会者参加。',
  waitingRoomNotCoworker: '适用于我公司以外的所有人',
  waitingRoomGuest: '适用于未登录的所有人',
  waitingRoomAll: '适用于所有参会者',
  enterPassword: '输入密码',
  onlyJoinAfterMe: '在您加入后开始会议',
  allowJoinBeforeHostDescription: '会议将在您加入后开始，以防止对话提前进行。',
  requirePassword: '需要输入密码',
  requirePasswordDescription:
    '确保您的会议安全。使用该链接的任何人都不会收到输入密码的提示。',
  password: '密码：',
  passwordEmptyError: '会议密码为必填项',
  passwordInvalidError: '密码必须包含 1 到 10 个字母和数字，但不能包含特殊符号',
  passwordHintText: '密码应包含 1 到 10 个字母和数字，但不能包含特殊符号',
  usePersonalMeetingIdInstead: '使用个人会议链接',
  allowMeetingAccess: '管理哪些人可以加入',
  anyoneWithLink: '收到链接的任何人',
  signedInUsers: '仅限 {shortName} 帐户',
  signedInCoWorkers: '仅限我的同事',
  passwordLabel: '密码',
  edit: '编辑',
  editSettings: '编辑设置',
  lockTooltip: '此设置由公司管理员管理',
  cancel: '取消',
  update: '更新',
  pmiSettingsTitle: '个人会议设置',
  pmiSettingsDescription:
    '设置哪些人可以使用您的个人会议链接加入以及如何加入。',
} as const;

// @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"scheduleForAssistedUser"@#@ @source: @#@"Update meetings settings on behalf of {userName}."@#@
// @key: @#@"scheduleForGuidance"@#@ @source: @#@"Scheduling for someone else?\n1. Make sure you're on their Outlook calendar.\n2. From the dropdown, select the person you're scheduling for.\n"@#@
// @key: @#@"scheduleForGuidanceMore"@#@ @source: @#@"Learn details"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"meetingSettingsDescription"@#@ @source: @#@"Updates will apply to this meeting only."@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"waitingRoomTitle"@#@ @source: @#@"Use waiting room"@#@
// @key: @#@"waitingRoomDescription"@#@ @source: @#@"Participants wait until you admit them. Great for interviews or outside attendees."@#@
// @key: @#@"waitingRoomNotCoworker"@#@ @source: @#@"For anyone outside my company"@#@
// @key: @#@"waitingRoomGuest"@#@ @source: @#@"For anyone not signed in"@#@
// @key: @#@"waitingRoomAll"@#@ @source: @#@"For all participants"@#@
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
// @key: @#@"onlyJoinAfterMe"@#@ @source: @#@"Start meeting after you join"@#@
// @key: @#@"allowJoinBeforeHostDescription"@#@ @source: @#@"The meeting will start after you join to prevent early conversations."@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"requirePasswordDescription"@#@ @source: @#@"Keep your meeting secure. Anyone using the link won't be prompted for a password."@#@
// @key: @#@"password"@#@ @source: @#@"Password:"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"passwordInvalidError"@#@ @source: @#@"Your password must be 1-10 letters and numbers long but cannot contain symbols"@#@
// @key: @#@"passwordHintText"@#@ @source: @#@"Your password should be 1-10 letters and numbers long, but can not contain symbols."@#@
// @key: @#@"usePersonalMeetingIdInstead"@#@ @source: @#@"Use personal meeting link"@#@
// @key: @#@"allowMeetingAccess"@#@ @source: @#@"Manage who can join"@#@
// @key: @#@"anyoneWithLink"@#@ @source: @#@"Anyone with link"@#@
// @key: @#@"signedInUsers"@#@ @source: @#@"Only {shortName} accounts"@#@
// @key: @#@"signedInCoWorkers"@#@ @source: @#@"Only my coworkers"@#@
// @key: @#@"passwordLabel"@#@ @source: @#@"Password"@#@
// @key: @#@"edit"@#@ @source: @#@"Edit"@#@
// @key: @#@"editSettings"@#@ @source: @#@"Edit settings"@#@
// @key: @#@"lockTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"cancel"@#@ @source: @#@"Cancel"@#@
// @key: @#@"update"@#@ @source: @#@"Update"@#@
// @key: @#@"pmiSettingsTitle"@#@ @source: @#@"Personal meeting settings"@#@
// @key: @#@"pmiSettingsDescription"@#@ @source: @#@"Set who can join and how for your personal meeting link."@#@
