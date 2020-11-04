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
  addLog: "기록",
  editLog: "기록 편집",
  viewDetails: "세부 정보 보기",
  addEntity: "새로 만들기",
  call: "통화",
  text: "텍스트",
  conversation: "대화",
  groupConversation: "그룹 대화",
  voiceMessage: "음성 메시지"
}, _defineProperty(_addLog$editLog$viewD, _messageTypes["default"].voiceMail, "음성 사서함"), _defineProperty(_addLog$editLog$viewD, _messageTypes["default"].fax, "팩스"), _defineProperty(_addLog$editLog$viewD, "mark", "읽지 않은 상태로 표시"), _defineProperty(_addLog$editLog$viewD, "unmark", "읽은 상태로 표시"), _defineProperty(_addLog$editLog$viewD, "delete", "삭제"), _defineProperty(_addLog$editLog$viewD, "faxSent", "팩스 전송됨"), _defineProperty(_addLog$editLog$viewD, "faxReceived", "팩스 수신됨"), _defineProperty(_addLog$editLog$viewD, "pages", "페이지"), _defineProperty(_addLog$editLog$viewD, "preview", "보기"), _defineProperty(_addLog$editLog$viewD, "download", "다운로드"), _defineProperty(_addLog$editLog$viewD, "imageAttachment", "첨부 파일: {count}개 이미지"), _addLog$editLog$viewD); // @key: @#@"addLog"@#@ @source: @#@"Log"@#@
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


exports["default"] = _default;
//# sourceMappingURL=ko-KR.js.map
