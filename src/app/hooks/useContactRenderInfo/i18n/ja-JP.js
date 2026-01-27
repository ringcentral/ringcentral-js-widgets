"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* eslint-disable */
var _default = exports["default"] = {
  to: '発信先',
  from: '発信元',
  ext: '内線',
  myCallerId: '自分の発信者番号',
  callerId: '発信者番号',
  unknownNumber: '不明',
  Inbound: '着信通話',
  Outbound: '発信通話',
  activeCall: 'アクティブな通話',
  otherDevice: '他のデバイス',
  onHold: '保留中',
  day: '日',
  hr: '時間',
  min: '分',
  sec: '秒',
  yesterday: '昨日',
  notes: 'AIメモ',
  logged: 'ログ記録済み',
  unlogged: 'ログ記録解除済み',
  answeredBy: '応答者',
  conferenceCall: '電話会議',
  copyNumberSuccess: '番号がコピーされました',
  // #region call status
  '911': '911',
  '933': '933',
  Abandoned: '放棄済み',
  Accepted: '承諾済み',
  'Answered Not Accepted': '未承諾で応答',
  Blocked: 'ブロック済み',
  Busy: 'ビジー状態',
  'Call Failed': '通話失敗',
  'Call Failure': '通話失敗',
  'Call connected': '通話接続済み',
  'Carrier is not active': '通信キャリアがアクティブではありません',
  Declined: '拒否済み',
  'EDGE trunk misconfigured': 'EDGEトランクが正しく構成されていません',
  'Fax Not Sent': 'FAXが送信されませんでした',
  'Fax Partially Sent': 'FAXが部分的に送信されました',
  'Fax Poor Line': 'FAX不良の回線',
  'Fax Receipt Error': 'FAX受信エラー',
  'Fax on Demand': 'オンデマンドFAX',
  'Hang Up': '通話終了',
  'IP Phone Offline': 'IP電話オフライン',
  'In Progress': '進行中',
  'Internal Error': '内部エラー',
  'International Disabled': '国際電話が無効です',
  'International Restricted': '国際電話が制限されています',
  Missed: '不在着信',
  'No Answer': '応答なし',
  'No Calling Credit': '通話クレジットなし',
  'Not Allowed': '許可されていません',
  'Partial Receive': '部分受信',
  'Phone Login': '電話でのログイン',
  'Receive Error': 'エラーの受信',
  Received: '受信済み',
  Rejected: '拒否済み',
  Reply: '応答',
  'Restricted Number': '制限された番号',
  'Send Error': '送信エラー',
  Sent: '送信済み',
  'Sent to Voicemail': 'ボイスメールへ送信',
  Stopped: '停止済み',
  'Suspended account': '利用が停止されたアカウント',
  Unknown: '不明',
  Voicemail: 'ボイスメール',
  'Wrong Number': '番号が間違っています',
  // some fields are not in the platform list
  'Answered Elsewhere': '他のユーザーによって応答済み',
  'Ringing Elsewhere': '別の場所で呼び出し中',
  'Fax Send Error': 'FAX送信エラー',
  Account: 'アカウント',
  'Call accepted': '通話が承諾されました',
  'Hang up': '通話を終了',
  'International Restriction': '国際規制',
  'No fax machine': 'FAXがありません',
  'Partially Sent': '一部送信済み',
  'Poor Line Quality': '回線品質不良',
  ResultEmpty: '空',
  ResultInProgress: '進行中',
  Suspended: '利用停止',
  'Fax Receipt': 'FAX受信',
  'Suspended Account': '利用が停止されたアカウント',
  Disconnected: '切断しました',
  multiMatchesContactName: '{name}、他{count}か所',
  // #endregion call status
  matches: '{numberOfMatches}件の一致',
  maybe: '可能性のあるもの：{contactName}',
  optedOut: '受信者がオプトアウトしました。',
  optOutAlertTooltip: 'この番号からテキストを受信するには、受信者がオプトインし直す必要があります。'
}; // @key: @#@"to"@#@ @source: @#@"To"@#@
// @key: @#@"from"@#@ @source: @#@"From"@#@
// @key: @#@"ext"@#@ @source: @#@"Ext."@#@
// @key: @#@"myCallerId"@#@ @source: @#@"My caller ID"@#@
// @key: @#@"callerId"@#@ @source: @#@"Caller ID"@#@
// @key: @#@"unknownNumber"@#@ @source: @#@"Unknown"@#@
// @key: @#@"Inbound"@#@ @source: @#@"Incoming call"@#@
// @key: @#@"Outbound"@#@ @source: @#@"Outgoing call"@#@
// @key: @#@"activeCall"@#@ @source: @#@"Active call"@#@
// @key: @#@"otherDevice"@#@ @source: @#@"On other device"@#@
// @key: @#@"onHold"@#@ @source: @#@"On hold"@#@
// @key: @#@"day"@#@ @source: @#@"day"@#@
// @key: @#@"hr"@#@ @source: @#@"hr"@#@
// @key: @#@"min"@#@ @source: @#@"min"@#@
// @key: @#@"sec"@#@ @source: @#@"sec"@#@
// @key: @#@"yesterday"@#@ @source: @#@"Yesterday"@#@
// @key: @#@"notes"@#@ @source: @#@"AI notes"@#@
// @key: @#@"logged"@#@ @source: @#@"Logged"@#@
// @key: @#@"unlogged"@#@ @source: @#@"Unlogged"@#@
// @key: @#@"answeredBy"@#@ @source: @#@"Answered by"@#@
// @key: @#@"conferenceCall"@#@ @source: @#@"Conference Call"@#@
// @key: @#@"copyNumberSuccess"@#@ @source: @#@"Number copied"@#@
// @key: @#@"'911'"@#@ @source: @#@"911"@#@
// @key: @#@"'933'"@#@ @source: @#@"933"@#@
// @key: @#@"Abandoned"@#@ @source: @#@"Abandoned"@#@
// @key: @#@"Accepted"@#@ @source: @#@"Accepted"@#@
// @key: @#@"'Answered Not Accepted'"@#@ @source: @#@"Answered Not Accepted"@#@
// @key: @#@"Blocked"@#@ @source: @#@"Blocked"@#@
// @key: @#@"Busy"@#@ @source: @#@"Busy"@#@
// @key: @#@"'Call Failed'"@#@ @source: @#@"Call Failed"@#@
// @key: @#@"'Call Failure'"@#@ @source: @#@"Call Failure"@#@
// @key: @#@"'Call connected'"@#@ @source: @#@"Call connected"@#@
// @key: @#@"'Carrier is not active'"@#@ @source: @#@"Carrier is not active"@#@
// @key: @#@"Declined"@#@ @source: @#@"Declined"@#@
// @key: @#@"'EDGE trunk misconfigured'"@#@ @source: @#@"EDGE trunk misconfigured"@#@
// @key: @#@"'Fax Not Sent'"@#@ @source: @#@"Fax Not Sent"@#@
// @key: @#@"'Fax Partially Sent'"@#@ @source: @#@"Fax Partially Sent"@#@
// @key: @#@"'Fax Poor Line'"@#@ @source: @#@"Fax Poor Line"@#@
// @key: @#@"'Fax Receipt Error'"@#@ @source: @#@"Fax Receipt Error"@#@
// @key: @#@"'Fax on Demand'"@#@ @source: @#@"Fax on Demand"@#@
// @key: @#@"'Hang Up'"@#@ @source: @#@"Hang Up"@#@
// @key: @#@"'IP Phone Offline'"@#@ @source: @#@"IP Phone Offline"@#@
// @key: @#@"'In Progress'"@#@ @source: @#@"In Progress"@#@
// @key: @#@"'Internal Error'"@#@ @source: @#@"Internal Error"@#@
// @key: @#@"'International Disabled'"@#@ @source: @#@"International Disabled"@#@
// @key: @#@"'International Restricted'"@#@ @source: @#@"International Restricted"@#@
// @key: @#@"Missed"@#@ @source: @#@"Missed"@#@
// @key: @#@"'No Answer'"@#@ @source: @#@"No Answer"@#@
// @key: @#@"'No Calling Credit'"@#@ @source: @#@"No Calling Credit"@#@
// @key: @#@"'Not Allowed'"@#@ @source: @#@"Not Allowed"@#@
// @key: @#@"'Partial Receive'"@#@ @source: @#@"Partial Receive"@#@
// @key: @#@"'Phone Login'"@#@ @source: @#@"Phone Login"@#@
// @key: @#@"'Receive Error'"@#@ @source: @#@"Receive Error"@#@
// @key: @#@"Received"@#@ @source: @#@"Received"@#@
// @key: @#@"Rejected"@#@ @source: @#@"Rejected"@#@
// @key: @#@"Reply"@#@ @source: @#@"Reply"@#@
// @key: @#@"'Restricted Number'"@#@ @source: @#@"Restricted Number"@#@
// @key: @#@"'Send Error'"@#@ @source: @#@"Send Error"@#@
// @key: @#@"Sent"@#@ @source: @#@"Sent"@#@
// @key: @#@"'Sent to Voicemail'"@#@ @source: @#@"Sent to Voicemail"@#@
// @key: @#@"Stopped"@#@ @source: @#@"Stopped"@#@
// @key: @#@"'Suspended account'"@#@ @source: @#@"Suspended account"@#@
// @key: @#@"Unknown"@#@ @source: @#@"Unknown"@#@
// @key: @#@"Voicemail"@#@ @source: @#@"Voicemail"@#@
// @key: @#@"'Wrong Number'"@#@ @source: @#@"Wrong Number"@#@
// @key: @#@"'Answered Elsewhere'"@#@ @source: @#@"Answered elsewhere"@#@
// @key: @#@"'Ringing Elsewhere'"@#@ @source: @#@"Ringing elsewhere"@#@
// @key: @#@"'Fax Send Error'"@#@ @source: @#@"Fax Send Error"@#@
// @key: @#@"Account"@#@ @source: @#@"Account"@#@
// @key: @#@"'Call accepted'"@#@ @source: @#@"Call accepted"@#@
// @key: @#@"'Hang up'"@#@ @source: @#@"Hang up"@#@
// @key: @#@"'International Restriction'"@#@ @source: @#@"International Restriction"@#@
// @key: @#@"'No fax machine'"@#@ @source: @#@"No fax machine"@#@
// @key: @#@"'Partially Sent'"@#@ @source: @#@"Partially Sent"@#@
// @key: @#@"'Poor Line Quality'"@#@ @source: @#@"Poor Line Quality"@#@
// @key: @#@"ResultEmpty"@#@ @source: @#@"empty"@#@
// @key: @#@"ResultInProgress"@#@ @source: @#@"In Progress"@#@
// @key: @#@"Suspended"@#@ @source: @#@"Suspended"@#@
// @key: @#@"'Fax Receipt'"@#@ @source: @#@"Fax Receipt"@#@
// @key: @#@"'Suspended Account'"@#@ @source: @#@"Suspended Account"@#@
// @key: @#@"Disconnected"@#@ @source: @#@"Disconnected"@#@
// @key: @#@"multiMatchesContactName"@#@ @source: @#@"{name} and {count} more"@#@
// @key: @#@"matches"@#@ @source: @#@"{numberOfMatches} matches"@#@
// @key: @#@"maybe"@#@ @source: @#@"Maybe: {contactName}"@#@
// @key: @#@"optedOut"@#@ @source: @#@"Recipient has opted out."@#@
// @key: @#@"optOutAlertTooltip"@#@ @source: @#@"The recipient must opt back in to receive texts from this number."@#@
//# sourceMappingURL=ja-JP.js.map
