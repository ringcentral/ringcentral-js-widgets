import { ASSISTED_USERS_MYSELF } from '@ringcentral-integration/commons/modules/RcVideo';
export default {
  topic: "모임 제목",
  date: "날짜",
  startTime: "시간",
  duration: "지속 시간",
  scheduleFor: "다음 사람 대신 예약",
  meetingSettings: "모임 설정",
  [ASSISTED_USERS_MYSELF]: "나",
  joinBeforeHost: "참가자가 호스트보다 먼저 참가하도록 허용",
  enableWaitingRoom: "대기실 사용하도록 설정",
  waitingRoom: "다음 사람을 위해 대기실 사용하도록 설정",
  waitingRoomNotCoworker: "회사 외부의 사람",
  waitingRoomGuest: "로그인하지 않은 사람",
  waitingRoomAll: "모두",
  enterPassword: "비밀번호 입력",
  onlyJoinAfterMe: "참가자는 내가 참가한 이후에만 참가 가능",
  onlyJoinAfterHost: "참가자는 호스트가 참가한 이후에만 참가할 수 있습니다.",
  muteAudio: "참가자 오디오 음소거",
  turnOffCamera: "참가자 카메라 끄기",
  requirePassword: "비밀번호 필요",
  useE2ee: "엔드투엔드 암호화 사용",
  e2eeTooltip: "엔드투엔드 모임이 가장 사생활이 보장되지만 전화로 참여, 자막, 녹음과 같은 기능은 사용할 수 없습니다.",
  setPassword: "비밀번호 설정 *",
  setPasswordNotSymbol: "비밀번호 설정",
  passwordEmptyError: "모임 비밀번호 필요",
  passwordInvalidError: "비밀번호는 1~10자의 문자 및 숫자여야 하며 기호를 포함하지 않아야 합니다.",
  passwordHintText: "비밀번호는 1~10자의 문자 및 숫자여야 하며 기호를 포함하지 않아야 합니다.",
  usePersonalMeetingId: "개인 모임 ID 사용",
  meetingSettingsSecurity: "보안",
  onlyAuthUserJoin: "인증된 사용자만 참가할 수 있습니다.",
  signedInUsers: "로그인한 사용자",
  signedInCoWorkers: "로그인한 동료",
  limitScreenSharing: "호스트 및 중재자만 화면 공유 가능",
  lockTooltip: "이 설정은 회사 관리자가 관리합니다.",
  pmiSettingAlert: "이 설정은 PMI로 생성된 모든 모임에 적용됩니다.",
  today: "오늘",
  scheduleForGuidance: "다른 사람을 대신하여 예약을 하시나요?\n1. 예약할 사람의 Outlook 일정에 포함되어 있는지 확인하세요.\n2. 드롭다운에서 예약할 사람을 선택합니다.\n",
  scheduleForGuidanceMore: "자세히 알아보기",
  changePmiSettings: "개인 모임 설정 변경",
  ieSupportAlert: "2022년 2월 16일 이후 {appName} 앱은 Internet Explorer 11과 호환되지 않습니다. Microsoft Edge로 전환하거나 Outlook 2016 이상으로 업데이트하는 것이 좋습니다."
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
