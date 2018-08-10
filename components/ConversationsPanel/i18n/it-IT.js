"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _title$search$compose;

var _messageTypes = require("ringcentral-integration/enums/messageTypes");

var _messageTypes2 = _interopRequireDefault(_messageTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_title$search$compose = {
  title: "Messaggi",
  search: "Cerca...",
  composeText: "Componi messaggio",
  noMessages: "Nessun messaggio",
  noSearchResults: "Nessun record corrispondente"
}, (0, _defineProperty3.default)(_title$search$compose, _messageTypes2.default.all, "Tutti"), (0, _defineProperty3.default)(_title$search$compose, _messageTypes2.default.voiceMail, "Voce"), (0, _defineProperty3.default)(_title$search$compose, _messageTypes2.default.text, "SMS"), (0, _defineProperty3.default)(_title$search$compose, _messageTypes2.default.fax, "Fax"), _title$search$compose);

// @key: @#@"title"@#@ @source: @#@"Messages"@#@
// @key: @#@"search"@#@ @source: @#@"Search..."@#@
// @key: @#@"composeText"@#@ @source: @#@"Compose Text"@#@
// @key: @#@"noMessages"@#@ @source: @#@"No Messages"@#@
// @key: @#@"noSearchResults"@#@ @source: @#@"No matching records found"@#@
// @key: @#@"[messageTypes.all]"@#@ @source: @#@"All"@#@
// @key: @#@"[messageTypes.voiceMail]"@#@ @source: @#@"Voice"@#@
// @key: @#@"[messageTypes.text]"@#@ @source: @#@"Text"@#@
// @key: @#@"[messageTypes.fax]"@#@ @source: @#@"Fax"@#@
//# sourceMappingURL=it-IT.js.map
