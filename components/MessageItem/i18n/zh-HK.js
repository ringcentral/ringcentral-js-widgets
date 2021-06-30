"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _messageTypes = _interopRequireDefault(require("@ringcentral-integration/commons/enums/messageTypes"));

var _addLog$editLog$viewD;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_addLog$editLog$viewD = {
  addLog: "記錄",
  editLog: "編輯記錄",
  viewDetails: "檢視詳細資訊",
  addEntity: "建立",
  call: "通話",
  text: "簡訊",
  conversation: "對話",
  groupConversation: "群組對話",
  voiceMessage: "語音訊息"
}, _defineProperty(_addLog$editLog$viewD, _messageTypes["default"].voiceMail, "語音信箱"), _defineProperty(_addLog$editLog$viewD, _messageTypes["default"].fax, "傳真"), _defineProperty(_addLog$editLog$viewD, "mark", "標示為未讀"), _defineProperty(_addLog$editLog$viewD, "unmark", "標示為已讀"), _defineProperty(_addLog$editLog$viewD, "delete", "刪除"), _defineProperty(_addLog$editLog$viewD, "faxSent", "傳真已傳送"), _defineProperty(_addLog$editLog$viewD, "faxReceived", "傳真已接收"), _defineProperty(_addLog$editLog$viewD, "pages", "頁"), _defineProperty(_addLog$editLog$viewD, "preview", "檢視"), _defineProperty(_addLog$editLog$viewD, "download", "下載"), _defineProperty(_addLog$editLog$viewD, "imageAttachment", "附件：{count} 個影像"), _defineProperty(_addLog$editLog$viewD, "fileAttachment", "附件：{count} 份檔案"), _addLog$editLog$viewD); // @key: @#@"addLog"@#@ @source: @#@"Log"@#@
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
//# sourceMappingURL=zh-HK.js.map
