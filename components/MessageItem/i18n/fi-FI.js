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
  addLog: "Loki",
  editLog: "Muokkaa lokia",
  viewDetails: "Näytä tiedot",
  addEntity: "Luo uusi",
  call: "Soita",
  text: "Tekstiviesti",
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
