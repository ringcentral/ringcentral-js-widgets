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
  addLog: "记录",
  editLog: "编辑记录",
  viewDetails: "查看详细信息",
  addEntity: "新建",
  call: "呼叫",
  text: "短信",
  conversation: "对话",
  groupConversation: "群组对话",
  voiceMessage: "语音消息"
}, _defineProperty(_addLog$editLog$viewD, _messageTypes["default"].voiceMail, "语音邮件"), _defineProperty(_addLog$editLog$viewD, _messageTypes["default"].fax, "传真"), _defineProperty(_addLog$editLog$viewD, "mark", "标记为未读"), _defineProperty(_addLog$editLog$viewD, "unmark", "标记为已读"), _defineProperty(_addLog$editLog$viewD, "delete", "删除"), _defineProperty(_addLog$editLog$viewD, "faxSent", "传真已发送"), _defineProperty(_addLog$editLog$viewD, "faxReceived", "传真已接收"), _defineProperty(_addLog$editLog$viewD, "pages", "页"), _defineProperty(_addLog$editLog$viewD, "page", "页"), _defineProperty(_addLog$editLog$viewD, "preview", "查看"), _defineProperty(_addLog$editLog$viewD, "download", "下载"), _defineProperty(_addLog$editLog$viewD, "imageAttachment", "附件：{count} 张图片"), _defineProperty(_addLog$editLog$viewD, "fileAttachment", "附件：{count} 文件"), _addLog$editLog$viewD); // @key: @#@"addLog"@#@ @source: @#@"Log"@#@
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
// @key: @#@"page"@#@ @source: @#@"page"@#@
// @key: @#@"preview"@#@ @source: @#@"View"@#@
// @key: @#@"download"@#@ @source: @#@"Download"@#@
// @key: @#@"imageAttachment"@#@ @source: @#@"Attachment: {count} image"@#@
// @key: @#@"fileAttachment"@#@ @source: @#@"Attachment: {count} file"@#@


exports["default"] = _default;
//# sourceMappingURL=zh-CN.js.map
