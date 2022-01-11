"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _messageTypes = _interopRequireDefault(require("@ringcentral-integration/commons/enums/messageTypes"));

var _title$search$compose;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_title$search$compose = {
  title: "Nachrichten",
  search: "Suchen ...",
  composeText: "Textnachricht erstellen",
  noMessages: "Keine Meldungen",
  noSearchResults: "Kein übereinstimmender Datensatz gefunden"
}, _defineProperty(_title$search$compose, _messageTypes["default"].all, "Alle"), _defineProperty(_title$search$compose, _messageTypes["default"].voiceMail, "Sprachn."), _defineProperty(_title$search$compose, _messageTypes["default"].text, "Text"), _defineProperty(_title$search$compose, _messageTypes["default"].fax, "Fax"), _title$search$compose); // @key: @#@"title"@#@ @source: @#@"Messages"@#@
// @key: @#@"search"@#@ @source: @#@"Search..."@#@
// @key: @#@"composeText"@#@ @source: @#@"Compose Text"@#@
// @key: @#@"noMessages"@#@ @source: @#@"No Messages"@#@
// @key: @#@"noSearchResults"@#@ @source: @#@"No matching records found"@#@
// @key: @#@"[messageTypes.all]"@#@ @source: @#@"All"@#@
// @key: @#@"[messageTypes.voiceMail]"@#@ @source: @#@"Voice"@#@
// @key: @#@"[messageTypes.text]"@#@ @source: @#@"Text"@#@
// @key: @#@"[messageTypes.fax]"@#@ @source: @#@"Fax"@#@


exports["default"] = _default;
//# sourceMappingURL=de-DE.js.map
