/* eslint-disable */
import { ASSISTED_USERS_MYSELF } from '@ringcentral-integration/commons/modules/RcVideo';
export default {
  topic: '모임 제목',
  date: '날짜',
  startTime: '시간',
  duration: '지속 시간',
  scheduleFor: '다음 사람 대신 예약',
  meetingSettings: '모임 설정',
  meetingSettingsDescription:
    '이 설정을 업데이트하면 현재 모임에만 적용됩니다.',
  here: '여기',
  [ASSISTED_USERS_MYSELF]: '나',
  joinBeforeHost: '참가자가 호스트보다 먼저 참가하도록 허용',
  enableWaitingRoom: '대기실 사용하도록 설정',
  waitingRoom: '다음 사람을 위해 대기실 사용하도록 설정',
  waitingRoomTitle: '대기실',
  waitingRoomDescription: '참가자를 수락할 때까지 모임을 비공개로 유지합니다.',
  waitingRoomNotCoworker: '회사 외부의 사람',
  waitingRoomGuest: '로그인하지 않은 사람',
  waitingRoomAll: '모두',
  enterPassword: '비밀번호 입력',
  onlyJoinAfterMe: '참가자는 내가 참가한 이후에만 참가 가능',
  onlyJoinAfterHost: '참가자는 호스트가 참가한 이후에만 참가할 수 있습니다.',
  allowJoinBeforeHostDescription:
    '내가 참가할 때까지 모임이 방해받지 않고 안전하게 보호합니다.',
  muteAudio: '참가자 오디오 음소거',
  turnOffCamera: '참가자 카메라 끄기',
  requirePassword: '비밀번호 필요',
  useE2ee: '엔드투엔드 암호화 사용',
  e2eeTooltip:
    '엔드투엔드 모임이 가장 사생활이 보장되지만 전화로 참여, 자막, 녹음과 같은 기능은 사용할 수 없습니다.',
  setPassword: '비밀번호 설정 *',
  setPasswordNotSymbol: '비밀번호 설정',
  passwordEmptyError: '모임 비밀번호 필요',
  passwordInvalidError:
    '비밀번호는 1~10자의 문자 및 숫자여야 하며 기호를 포함하지 않아야 합니다.',
  passwordHintText:
    '비밀번호는 1~10자의 문자 및 숫자여야 하며 기호를 포함하지 않아야 합니다.',
  usePersonalMeetingId: '개인 모임 ID 사용',
  usePersonalMeetingIdInstead: '대신 개인 모임 사용',
  usePersonalMeetingName: '개인 모임 사용:',
  meetingSettingsSecurity: '보안',
  onlyAuthUserJoin: '인증된 사용자만 참가할 수 있습니다.',
  signedInUsers: '로그인한 사용자',
  signedInCoWorkers: '로그인한 동료',
  limitScreenSharing: '호스트 및 중재자만 화면 공유 가능',
  lockTooltip: '이 설정은 회사 관리자가 관리합니다',
  pmiSettingAlert: '이 설정은 PMI로 생성된 모든 모임에 적용됩니다.',
  today: '오늘',
  scheduleForGuidance:
    '다른 사람을 대신하여 예약을 하시나요?\n1. 예약할 사람의 Outlook 일정에 포함되어 있는지 확인하세요.\n2. 드롭다운에서 예약할 사람을 선택합니다.\n',
  scheduleForGuidanceMore: '자세히 알아보기',
  changePmiSettings: '개인 모임 설정 변경',
  allowToRecording: '레코딩 시작 및 중지 허용',
  allowTranscribe: '기록 시작 및 중지 허용',
  everyone: '모두',
  onlyHostModerators: '호스트 및 중재자만',
  advancedSettings: '고급 설정',
  whoCanJoin: '참가할 수 있는 사용자',
  requirePasswordDescription:
    '모임 링크를 통해 참가하는 참가자는 비밀번호를 입력하지 않아도 됩니다.',
  password: '비밀번호:',
  passwordLabel: '비밀번호',
  edit: '편집',
  changePassword: '비밀번호 변경',
  passwordRequired: '비밀번호는 필수 항목입니다.',
  passwordLengthError: '비밀번호는 1~10자 길이여야 합니다.',
  passwordFormatError: '비밀번호는 문자 및 숫자만 포함할 수 있습니다.',
  passwordHint:
    '비밀번호는 1~10자의 문자 및 숫자여야 하며 기호를 포함하지 않아야 합니다.',
} as const;

// @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"startTime"@#@ @source: @#@"Time"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"meetingSettingsDescription"@#@ @source: @#@"Update these settings will apply to current meeting only."@#@
// @key: @#@"here"@#@ @source: @#@"here"@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"joinBeforeHost"@#@ @source: @#@"Allow participants to join before host"@#@
// @key: @#@"enableWaitingRoom"@#@ @source: @#@"Enable waiting room"@#@
// @key: @#@"waitingRoom"@#@ @source: @#@"Enable waiting room for"@#@
// @key: @#@"waitingRoomTitle"@#@ @source: @#@"Waiting room"@#@
// @key: @#@"waitingRoomDescription"@#@ @source: @#@"Keep meetings private until you admit participants."@#@
// @key: @#@"waitingRoomNotCoworker"@#@ @source: @#@"Anyone outside my company"@#@
// @key: @#@"waitingRoomGuest"@#@ @source: @#@"Anyone not signed in"@#@
// @key: @#@"waitingRoomAll"@#@ @source: @#@"Everyone"@#@
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
// @key: @#@"onlyJoinAfterMe"@#@ @source: @#@"Participants can only join after me"@#@
// @key: @#@"onlyJoinAfterHost"@#@ @source: @#@"Participants can only join after host"@#@
// @key: @#@"allowJoinBeforeHostDescription"@#@ @source: @#@"Keeps the meeting secure and distraction-free until you join."@#@
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
// @key: @#@"usePersonalMeetingIdInstead"@#@ @source: @#@"Use personal meeting instead"@#@
// @key: @#@"usePersonalMeetingName"@#@ @source: @#@"Use personal meeting:"@#@
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
// @key: @#@"allowToRecording"@#@ @source: @#@"Allow to start and stop recording"@#@
// @key: @#@"allowTranscribe"@#@ @source: @#@"Allow to start and stop transcription"@#@
// @key: @#@"everyone"@#@ @source: @#@"Everyone"@#@
// @key: @#@"onlyHostModerators"@#@ @source: @#@"Only host and moderators"@#@
// @key: @#@"advancedSettings"@#@ @source: @#@"Advanced settings"@#@
// @key: @#@"whoCanJoin"@#@ @source: @#@"Who can join?"@#@
// @key: @#@"requirePasswordDescription"@#@ @source: @#@"Participants who join via the meeting link won’t need to enter the password."@#@
// @key: @#@"password"@#@ @source: @#@"Password:"@#@
// @key: @#@"passwordLabel"@#@ @source: @#@"Password"@#@
// @key: @#@"edit"@#@ @source: @#@"Edit"@#@
// @key: @#@"changePassword"@#@ @source: @#@"Change Password"@#@
// @key: @#@"passwordRequired"@#@ @source: @#@"Password is required"@#@
// @key: @#@"passwordLengthError"@#@ @source: @#@"Password must be 1-10 characters long"@#@
// @key: @#@"passwordFormatError"@#@ @source: @#@"Password can only contain letters and numbers"@#@
// @key: @#@"passwordHint"@#@ @source: @#@"Your password should be 1-10 letters and numbers long, but can not contain symbols."@#@
