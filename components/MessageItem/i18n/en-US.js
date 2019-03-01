"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _messageTypes = _interopRequireDefault(require("ringcentral-integration/enums/messageTypes"));

var _addLog$editLog$viewD;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
}, _defineProperty(_addLog$editLog$viewD, _messageTypes.default.voiceMail, 'Voice Mail'), _defineProperty(_addLog$editLog$viewD, _messageTypes.default.fax, "Fax"), _defineProperty(_addLog$editLog$viewD, "mark", 'Mark as Unread'), _defineProperty(_addLog$editLog$viewD, "unmark", 'Mark as Read'), _defineProperty(_addLog$editLog$viewD, "delete", 'Delete'), _defineProperty(_addLog$editLog$viewD, "faxSent", 'Fax sent'), _defineProperty(_addLog$editLog$viewD, "faxReceived", 'Fax received'), _defineProperty(_addLog$editLog$viewD, "pages", 'pages'), _defineProperty(_addLog$editLog$viewD, "preview", 'View'), _defineProperty(_addLog$editLog$viewD, "download", 'Download'), _defineProperty(_addLog$editLog$viewD, "imageAttachment", 'Attachment: 1 image'), _addLog$editLog$viewD);

exports.default = _default;
//# sourceMappingURL=en-US.js.map
