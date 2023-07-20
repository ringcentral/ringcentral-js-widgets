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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
}, _defineProperty(_addLog$editLog$viewD, _messageTypes["default"].voiceMail, 'Voice Mail'), _defineProperty(_addLog$editLog$viewD, _messageTypes["default"].fax, 'Fax'), _defineProperty(_addLog$editLog$viewD, "mark", 'Mark as Unread'), _defineProperty(_addLog$editLog$viewD, "unmark", 'Mark as Read'), _defineProperty(_addLog$editLog$viewD, "delete", 'Delete'), _defineProperty(_addLog$editLog$viewD, "faxSent", 'Fax sent'), _defineProperty(_addLog$editLog$viewD, "faxReceived", 'Fax received'), _defineProperty(_addLog$editLog$viewD, "pages", 'pages'), _defineProperty(_addLog$editLog$viewD, "page", 'page'), _defineProperty(_addLog$editLog$viewD, "preview", 'View'), _defineProperty(_addLog$editLog$viewD, "download", 'Download'), _defineProperty(_addLog$editLog$viewD, "imageAttachment", 'Attachment: {count} image'), _defineProperty(_addLog$editLog$viewD, "fileAttachment", 'Attachment: {count} file'), _addLog$editLog$viewD);
exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
