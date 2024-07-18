"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _messageTypes = _interopRequireDefault(require("@ringcentral-integration/commons/enums/messageTypes"));
var _addLog$editLog$viewD;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_addLog$editLog$viewD = {
  addLog: "기록",
  editLog: "기록 편집",
  viewDetails: "세부 정보 보기",
  addEntity: "새로 만들기",
  call: "전화",
  text: "문자",
  conversation: "대화",
  groupConversation: "그룹 대화",
  voiceMessage: "음성 메시지"
}, _defineProperty(_addLog$editLog$viewD, _messageTypes["default"].voiceMail, "음성 사서함"), _defineProperty(_addLog$editLog$viewD, _messageTypes["default"].fax, "팩스"), _defineProperty(_addLog$editLog$viewD, "mark", "읽지 않은 상태로 표시"), _defineProperty(_addLog$editLog$viewD, "unmark", "읽은 상태로 표시"), _defineProperty(_addLog$editLog$viewD, "delete", "삭제"), _defineProperty(_addLog$editLog$viewD, "faxSent", "팩스 전송됨"), _defineProperty(_addLog$editLog$viewD, "faxReceived", "팩스 수신됨"), _defineProperty(_addLog$editLog$viewD, "pages", "페이지"), _defineProperty(_addLog$editLog$viewD, "page", "페이지"), _defineProperty(_addLog$editLog$viewD, "preview", "보기"), _defineProperty(_addLog$editLog$viewD, "download", "다운로드"), _defineProperty(_addLog$editLog$viewD, "imageAttachment", "첨부 파일: {count}개 이미지"), _defineProperty(_addLog$editLog$viewD, "fileAttachment", "첨부 파일: {count}개의 파일"), _addLog$editLog$viewD); // @key: @#@"addLog"@#@ @source: @#@"Log"@#@
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
//# sourceMappingURL=ko-KR.js.map
