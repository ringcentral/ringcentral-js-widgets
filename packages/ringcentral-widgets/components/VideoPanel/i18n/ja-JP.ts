/* eslint-disable */
import { ASSISTED_USERS_MYSELF } from '@ringcentral-integration/commons/modules/RcVideo';
export default {
  topic: '会議タイトル',
  date: '日付',
  startTime: '時刻',
  duration: '期間',
  scheduleFor: '次のユーザーに代わってスケジュール：',
  meetingSettings: '会議設定',
  meetingSettingsDescription:
    'これらの設定の更新は現在の会議にのみ適用されます。',
  here: 'こちら',
  [ASSISTED_USERS_MYSELF]: '自分',
  joinBeforeHost: 'ホストより早く参加者が参加することを許可',
  enableWaitingRoom: '待機ルームを有効にする',
  waitingRoom: '有効にするユーザー',
  waitingRoomTitle: '待機ルーム',
  waitingRoomDescription:
    '参加者の入室を許可するまで会議をプライベートにします。',
  waitingRoomNotCoworker: '社外の人',
  waitingRoomGuest: 'サインインしていないユーザー',
  waitingRoomAll: '全員',
  enterPassword: 'パスワードを入力',
  onlyJoinAfterMe: '自分が入る前に参加者の入室を許可しない',
  onlyJoinAfterHost: '参加者はホストの後にのみ参加可能',
  allowJoinBeforeHostDescription:
    '自分が参加するまで、会議の安全を確保し、妨げられないようにします。',
  muteAudio: '参加者のオーディオをミュートにする',
  turnOffCamera: '参加者のカメラをオフにする',
  requirePassword: 'パスワードが必要です',
  useE2ee: 'エンドツーエンド暗号化を使用',
  e2eeTooltip:
    'エンドツーエンドで暗号化された会議は最もプライベートが守られる環境ですが、電話での参加、字幕、レコーディングなどの機能は使用できません。',
  setPassword: 'パスワードを設定*',
  setPasswordNotSymbol: 'パスワードを設定',
  passwordEmptyError: '会議パスワードが必要です',
  passwordInvalidError:
    'パスワードは1～10文字で英数字を使用できます。記号は使用できません',
  passwordHintText:
    'パスワードは1～10文字で英数字を使用できます。記号は使用できません',
  usePersonalMeetingId: '個人会議IDを使用',
  usePersonalMeetingIdInstead: '代わりに個人会議を使用',
  usePersonalMeetingName: '個人会議を使用：',
  meetingSettingsSecurity: 'セキュリティ',
  onlyAuthUserJoin: '認証済みユーザーのみ参加可能',
  signedInUsers: 'サインイン済みユーザー',
  signedInCoWorkers: 'サインイン済みの同僚',
  limitScreenSharing: 'ホストとモデレータのみが画面を共有可能にする',
  lockTooltip: 'この設定は会社の管理者により管理されています',
  pmiSettingAlert:
    'これらの設定はPMIを使って作成された会議すべてに適用されます',
  today: '今日',
  scheduleForGuidance:
    '別の人のためにスケジュールしますか？\n1. Outlook予定表を開きます。\n2. ドロップダウンからスケジュールするメンバーを選択します。\n',
  scheduleForGuidanceMore: '詳細を確認',
  changePmiSettings: '個人会議の設定を変更',
  allowToRecording: 'レコーディングの開始/停止を許可',
  allowTranscribe: 'トランスクリプトの開始/停止を許可',
  everyone: '全員',
  onlyHostModerators: 'ホストとモデレーターのみ',
  advancedSettings: '詳細設定',
  whoCanJoin: '誰が参加できますか？',
  requirePasswordDescription:
    '会議リンクから参加する参加者の場合、パスワードを入力する必要はありません。',
  password: 'パスワード：',
  passwordLabel: 'パスワード',
  edit: '編集',
  changePassword: 'パスワードを変更',
  passwordRequired: 'パスワードは必須です',
  passwordLengthError: 'パスワードは1〜10文字である必要があります',
  passwordFormatError: 'パスワードには英数字のみが使用できます',
  passwordHint:
    'パスワードは1～10文字で英数字を使用できます。記号は使用できません。',
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
