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
  addLog: "Log",
  editLog: "Edit log",
  viewDetails: "View details",
  addEntity: "Create new",
  call: "Call",
  text: "Text",
  conversation: "Conversation",
  groupConversation: "Group conversation",
  voiceMessage: "Voice message"
}, _defineProperty(_addLog$editLog$viewD, _messageTypes["default"].voiceMail, "Voicemail"), _defineProperty(_addLog$editLog$viewD, _messageTypes["default"].fax, "Fax"), _defineProperty(_addLog$editLog$viewD, "mark", "Mark as unread"), _defineProperty(_addLog$editLog$viewD, "unmark", "Mark as read"), _defineProperty(_addLog$editLog$viewD, "delete", "Delete"), _defineProperty(_addLog$editLog$viewD, "faxSent", "Fax sent"), _defineProperty(_addLog$editLog$viewD, "faxReceived", "Fax received"), _defineProperty(_addLog$editLog$viewD, "pages", "pages"), _defineProperty(_addLog$editLog$viewD, "preview", "View"), _defineProperty(_addLog$editLog$viewD, "download", "Download"), _defineProperty(_addLog$editLog$viewD, "imageAttachment", "Attachment: {count} image"), _defineProperty(_addLog$editLog$viewD, "fileAttachment", "Attachment: {count} file"), _addLog$editLog$viewD); // @key: @#@"addLog"@#@ @source: @#@"Log"@#@
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
//# sourceMappingURL=en-AU.js.map
