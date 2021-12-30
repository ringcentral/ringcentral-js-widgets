import { ASSISTED_USERS_MYSELF } from '@ringcentral-integration/commons/modules/RcVideo/constants';
export default {
  topic: "会議タイトル",
  date: "日付",
  startTime: "時間",
  duration: "通話時間",
  scheduleFor: "次のユーザーに代わってスケジュール：",
  meetingSettings: "会議設定",
  [ASSISTED_USERS_MYSELF]: "自分",
  joinBeforeHost: "ホストより早く参加者が参加することを許可",
  enableWaitingRoom: "待機ルームを有効にする",
  waitingRoom: "次のユーザーのために待機ルームを有効にする",
  waitingRoomNotCoworker: "すべての社外ユーザー",
  waitingRoomGuest: "すべての未サインインユーザー",
  waitingRoomAll: "全員",
  enterPassword: "パスワードを入力",
  onlyJoinAfterMe: "自分の後にのみ参加者が参加可能にする",
  onlyJoinAfterHost: "ホストの後にのみ参加者が参加可能にする",
  muteAudio: "参加者のオーディオをミュート",
  turnOffCamera: "参加者のカメラをオフにする",
  requirePassword: "パスワードを必須にする",
  useE2ee: "エンドツーエンドの暗号化を使用",
  e2eeTooltip: "エンドツーエンドで暗号化された会議は最もプライベートが守られる環境ですが、電話での参加、字幕、レコーディングなどの機能は使用できません。",
  setPassword: "パスワードを設定*",
  setPasswordNotSymbol: "パスワードを設定",
  passwordEmptyError: "会議パスワードが必要です",
  passwordInvalidError: "パスワードは1～10文字で英数字を使用できます。記号は使用できません",
  passwordHintText: "パスワードは1～10文字で英数字を使用できます。記号は使用できません",
  usePersonalMeetingId: "個人会議IDを使用",
  meetingSettingsSecurity: "セキュリティ",
  onlyAuthUserJoin: "認証済みユーザーのみ参加可能にする",
  signedInUsers: "サインイン済みユーザー",
  signedInCoWorkers: "サインイン済みの同僚",
  limitScreenSharing: "ホストとモデレータのみが画面を共有可能にする",
  lockTooltip: "この設定は会社の管理者により管理されています",
  pmiSettingAlert: "これらの設定はPMIを使って作成された会議すべてに適用されます",
  today: "今日",
  scheduleForGuidance: "別の人のためにスケジュールしますか？\n1. Outlook予定表を開きます。\n2. ドロップダウンからスケジュールするメンバーを選択します。\n",
  scheduleForGuidanceMore: "詳細を確認",
  changePmiSettings: "個人会議の設定を変更",
  ieSupportAlert: "2022年2月16日以降、Internet Explorer 11では{appName}が機能しないことにご注意ください。Microsoft Edgeを代わりに使用するか、Outlook 2016以降に更新することをお勧めします。"
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
// @key: @#@"changePmiSettings"@#@ @source: @#@"Change Personal meeting settings"@#@
// @key: @#@"ieSupportAlert"@#@ @source: @#@"Please note that {appName} won't work with Internet Explorer 11 after Feb 16, 2022. We recommend switching to Microsoft Edge or updating to Outlook 2016 or above."@#@
