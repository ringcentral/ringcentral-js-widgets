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
  addLog: "Loki",
  editLog: "Muokkaa lokia",
  viewDetails: "Näytä tiedot",
  addEntity: "Luo uusi",
  call: "Puhelu",
  text: "Teksti",
  conversation: "Keskustelu",
  groupConversation: "Ryhmäkeskustelu",
  voiceMessage: "Ääniviesti"
}, _defineProperty(_addLog$editLog$viewD, _messageTypes["default"].voiceMail, "Vastaajaviesti"), _defineProperty(_addLog$editLog$viewD, _messageTypes["default"].fax, "Faksi"), _defineProperty(_addLog$editLog$viewD, "mark", "Merkitse lukemattomaksi"), _defineProperty(_addLog$editLog$viewD, "unmark", "Merkitse luetuksi"), _defineProperty(_addLog$editLog$viewD, "delete", "Poista"), _defineProperty(_addLog$editLog$viewD, "faxSent", "Faksi lähetetty"), _defineProperty(_addLog$editLog$viewD, "faxReceived", "Faksi vastaanotettu"), _defineProperty(_addLog$editLog$viewD, "pages", "sivua"), _defineProperty(_addLog$editLog$viewD, "page", "sivu"), _defineProperty(_addLog$editLog$viewD, "preview", "Näytä"), _defineProperty(_addLog$editLog$viewD, "download", "Lataa"), _defineProperty(_addLog$editLog$viewD, "imageAttachment", "Liite: kuva ({count})"), _defineProperty(_addLog$editLog$viewD, "fileAttachment", "Liite: tiedosto ({count})"), _addLog$editLog$viewD); // @key: @#@"addLog"@#@ @source: @#@"Log"@#@
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
//# sourceMappingURL=fi-FI.js.map
