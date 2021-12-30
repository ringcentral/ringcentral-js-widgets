import { ASSISTED_USERS_MYSELF } from '@ringcentral-integration/commons/modules/Meeting';
export default {
  date: "날짜",
  time: "시간",
  hours: "{howMany} 시간",
  minutes: "{howMany} 분",
  today: "오늘",
  duration: "지속 시간",
  topic: "모임 제목",
  voIPOnly: "인터넷 오디오만",
  telephonyOnly: "전화만",
  both: "전화 및 인터넷 오디오",
  thirdParty: "타사 오디오",
  meetingId: "모임 ID",
  password: "비밀번호",
  video: "비디오",
  audio: "오디오",
  scheduleFor: "다음 사람 대신 예약",
  [ASSISTED_USERS_MYSELF]: "나",
  meetingOptions: "모임 옵션",
  meetingSettings: "모임 설정",
  rcMeetingSettings: "화상 모임 설정",
  audioOptions: "오디오 옵션",
  recurringMeeting: "되풀이 모임",
  recurringNote: "참고: \"되풀이\"를 선택하는 경우 이를 사용하도록 설정하세요.",
  joinBeforeHost: "참가자가 호스트보다 먼저 참가하도록 허용",
  turnOffCamera: "참가자의 카메라 끄기",
  turnOffHostCamera: "모임에 참가할 때 호스트용 카메라 끄기",
  requirePassword: "비밀번호가 필요함",
  enterPassword: "비밀번호 입력",
  setPassword: "비밀번호 설정 *",
  passwordEmptyError: "모임 비밀번호 필요",
  rcmPasswordInvalidError: "비밀번호는 1~10자 길이의 문자, 숫자여야 하며 @, * or -를 제외한 기호를 포함할 수 없습니다.",
  rcmPasswordHintText: "비밀번호는 1~10자 길이의 문자, 숫자여야 하며 @, * or -를 제외한 기호를 포함할 수 없습니다.",
  usePersonalMeetingId: "개인 모임 ID 사용",
  pmiChangeConfirm: "개인 모임을 변경하려면 ",
  changePmiSettings: "PMI 설정 변경",
  pmiSettingChangeAlert: "설정을 변경하고 이 모임을 예약하면 개인 모임 ID가 있는 모든 모임이 동일한 최신 설정을 사용합니다.",
  lockedTooltip: "이 설정은 회사 관리자가 관리합니다.",
  when: "일시",
  recurringDescribe: "참석자에게 보낸 일정 초대장에서 되풀이 또는 반복 일정을 확인하세요.",
  ieSupportAlert: "2022년 2월 16일 이후 {appName} 앱은 Internet Explorer 11과 호환되지 않습니다. Microsoft Edge로 전환하거나 Outlook 2016 이상으로 업데이트하는 것이 좋습니다."
};

// @key: @#@"date"@#@ @source: @#@"Date"@#@
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
