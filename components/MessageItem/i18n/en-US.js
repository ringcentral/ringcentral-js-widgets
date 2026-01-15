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
  addLog: 'Log',
  editLog: 'Edit Log',
  viewDetails: 'View Details',
  addEntity: 'Create New',
  call: 'Call',
  text: 'Text',
  conversation: 'Conversation',
  groupConversation: 'Group Conversation',
  voiceMessage: 'Voice message'
}, _defineProperty(_addLog$editLog$viewD, _messageTypes["default"].voiceMail, 'Voice Mail'), _defineProperty(_addLog$editLog$viewD, _messageTypes["default"].fax, 'Fax'), _defineProperty(_addLog$editLog$viewD, "mark", 'Mark as Unread'), _defineProperty(_addLog$editLog$viewD, "unmark", 'Mark as Read'), _defineProperty(_addLog$editLog$viewD, "delete", 'Delete'), _defineProperty(_addLog$editLog$viewD, "faxSent", 'Fax sent'), _defineProperty(_addLog$editLog$viewD, "faxReceived", 'Fax received'), _defineProperty(_addLog$editLog$viewD, "pages", 'pages'), _defineProperty(_addLog$editLog$viewD, "page", 'page'), _defineProperty(_addLog$editLog$viewD, "preview", 'View'), _defineProperty(_addLog$editLog$viewD, "download", 'Download'), _defineProperty(_addLog$editLog$viewD, "mmsWithOneAttachment", 'MMS with 1 attachment'), _defineProperty(_addLog$editLog$viewD, "mmsWithAttachments", 'MMS with {count} attachments'), _addLog$editLog$viewD);
exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
