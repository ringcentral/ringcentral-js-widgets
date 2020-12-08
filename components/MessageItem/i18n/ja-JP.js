"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _messageTypes = _interopRequireDefault(require("ringcentral-integration/enums/messageTypes"));

var _addLog$editLog$viewD;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_addLog$editLog$viewD = {
  addLog: "ログ",
  editLog: "ログの編集",
  viewDetails: "詳細の表示",
  addEntity: "新規作成",
  call: "通話",
  text: "テキスト",
  conversation: "会話",
  groupConversation: "グループ会話",
  voiceMessage: "ボイスメッセージ"
}, _defineProperty(_addLog$editLog$viewD, _messageTypes["default"].voiceMail, "ボイスメール"), _defineProperty(_addLog$editLog$viewD, _messageTypes["default"].fax, "FAX"), _defineProperty(_addLog$editLog$viewD, "mark", "未読にする"), _defineProperty(_addLog$editLog$viewD, "unmark", "既読にする"), _defineProperty(_addLog$editLog$viewD, "delete", "削除"), _defineProperty(_addLog$editLog$viewD, "faxSent", "FAX送信済み"), _defineProperty(_addLog$editLog$viewD, "faxReceived", "FAX受信済み"), _defineProperty(_addLog$editLog$viewD, "pages", "ページ"), _defineProperty(_addLog$editLog$viewD, "preview", "表示"), _defineProperty(_addLog$editLog$viewD, "download", "ダウンロード"), _defineProperty(_addLog$editLog$viewD, "imageAttachment", "添付ファイル：{count}件のイメージ"), _defineProperty(_addLog$editLog$viewD, "fileAttachment", "添付ファイル：{count}ファイル"), _addLog$editLog$viewD); // @key: @#@"addLog"@#@ @source: @#@"Log"@#@
// @key: @#@"editLog"@#@ @source: @#@"Edit Log"@#@
// @key: @#@"viewDetails"@#@ @source: @#@"View Details"@#@
// @key: @#@"addEntity"@#@ @source: @#@"Create New"@#@
// @key: @#@"call"@#@ @source: @#@"Call"@#@
// @key: @#@"text"@#@ @source: @#@"Text"@#@
// @key: @#@"conversation"@#@ @source: @#@"Conversation"@#@
// @key: @#@"groupConversation"@#@ @source: @#@"Group Conversation"@#@
// @key: @#@"voiceMessage"@#@ @source: @#@"Voice message"@#@
// @key: @#@"[messageTypes.voiceMail]"@#@ @source: @#@"Voice Mail"@#@
// @key: @#@"[messageTypes.fax]"@#@ @source: @#@"Fax"@#@
// @key: @#@"mark"@#@ @source: @#@"Mark as Unread"@#@
// @key: @#@"unmark"@#@ @source: @#@"Mark as Read"@#@
// @key: @#@"delete"@#@ @source: @#@"Delete"@#@
// @key: @#@"faxSent"@#@ @source: @#@"Fax sent"@#@
// @key: @#@"faxReceived"@#@ @source: @#@"Fax received"@#@
// @key: @#@"pages"@#@ @source: @#@"pages"@#@
// @key: @#@"preview"@#@ @source: @#@"View"@#@
// @key: @#@"download"@#@ @source: @#@"Download"@#@
// @key: @#@"imageAttachment"@#@ @source: @#@"Attachment: {count} image"@#@
// @key: @#@"fileAttachment"@#@ @source: @#@"Attachment: {count} file"@#@


exports["default"] = _default;
//# sourceMappingURL=ja-JP.js.map
