import { ASSISTED_USERS_MYSELF } from '@ringcentral-integration/commons/modules/RcVideo';
export default {
  topic: "会議タイトル",
  date: "日付",
  startTime: "時刻",
  duration: "期間",
  scheduleFor: "次のユーザーに代わってスケジュール：",
  meetingSettings: "会議設定",
  [ASSISTED_USERS_MYSELF]: "自分",
  joinBeforeHost: "ホストより早く参加者が参加することを許可",
  enableWaitingRoom: "待機ルームを有効にする",
  waitingRoom: "有効にするユーザー",
  waitingRoomNotCoworker: "すべての社外ユーザー",
  waitingRoomGuest: "すべての未サインインユーザー",
  waitingRoomAll: "全員",
  enterPassword: "パスワードを入力",
  onlyJoinAfterMe: "自分が入る前に参加者の入室を許可しない",
  onlyJoinAfterHost: "参加者はホストの後にのみ参加可能",
  muteAudio: "参加者のオーディオをミュートにする",
  turnOffCamera: "参加者のカメラをオフにする",
  requirePassword: "パスワードが必要です",
  useE2ee: "エンドツーエンド暗号化を使用",
  e2eeTooltip: "エンドツーエンドで暗号化された会議は最もプライベートが守られる環境ですが、電話での参加、字幕、レコーディングなどの機能は使用できません。",
  setPassword: "パスワードを設定*",
  setPasswordNotSymbol: "パスワードを設定",
  passwordEmptyError: "会議パスワードが必要です",
  passwordInvalidError: "パスワードは1～10文字で英数字を使用できます。記号は使用できません",
  passwordHintText: "パスワードは1～10文字で英数字を使用できます。記号は使用できません",
  usePersonalMeetingId: "個人会議IDを使用",
  meetingSettingsSecurity: "セキュリティ",
  onlyAuthUserJoin: "認証済みユーザーのみ参加可能",
  signedInUsers: "サインイン済みユーザー",
  signedInCoWorkers: "サインイン済みの同僚",
  limitScreenSharing: "ホストとモデレータのみが画面を共有可能にする",
  lockTooltip: "この設定は会社の管理者により管理されています",
  pmiSettingAlert: "これらの設定はPMIを使って作成された会議すべてに適用されます",
  today: "今日",
  scheduleForGuidance: "別の人のためにスケジュールしますか？\n1. Outlook予定表を開きます。\n2. ドロップダウンからスケジュールするメンバーを選択します。\n",
  scheduleForGuidanceMore: "詳細を確認",
  changePmiSettings: "個人会議の設定を変更"
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
