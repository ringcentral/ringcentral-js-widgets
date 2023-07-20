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
  addLog: "Journal",
  editLog: "Modifier le journal",
  viewDetails: "Afficher les détails",
  addEntity: "Créer nouveau",
  call: "Appel",
  text: "SMS",
  conversation: "Conversation",
  groupConversation: "Conversation de groupe",
  voiceMessage: "Message vocal"
}, _defineProperty(_addLog$editLog$viewD, _messageTypes["default"].voiceMail, "Messagerie vocale"), _defineProperty(_addLog$editLog$viewD, _messageTypes["default"].fax, "Fax"), _defineProperty(_addLog$editLog$viewD, "mark", "Marquer comme non lu"), _defineProperty(_addLog$editLog$viewD, "unmark", "Marquer comme lu"), _defineProperty(_addLog$editLog$viewD, "delete", "Supprimer"), _defineProperty(_addLog$editLog$viewD, "faxSent", "Fax envoyé"), _defineProperty(_addLog$editLog$viewD, "faxReceived", "Fax reçu"), _defineProperty(_addLog$editLog$viewD, "pages", "pages"), _defineProperty(_addLog$editLog$viewD, "page", "page"), _defineProperty(_addLog$editLog$viewD, "preview", "Afficher"), _defineProperty(_addLog$editLog$viewD, "download", "Télécharger"), _defineProperty(_addLog$editLog$viewD, "imageAttachment", "Pièce jointe : {count} image(s)"), _defineProperty(_addLog$editLog$viewD, "fileAttachment", "Pièce jointe : {count} fichier"), _addLog$editLog$viewD); // @key: @#@"addLog"@#@ @source: @#@"Log"@#@
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
//# sourceMappingURL=fr-FR.js.map
