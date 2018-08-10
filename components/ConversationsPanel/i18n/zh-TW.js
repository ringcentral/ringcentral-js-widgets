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
  title: "訊息",
  search: "搜尋……",
  composeText: "撰寫簡訊",
  noMessages: "無訊息",
  noSearchResults: "找不到相符的記錄"
}, (0, _defineProperty3.default)(_title$search$compose, _messageTypes2.default.all, "所有"), (0, _defineProperty3.default)(_title$search$compose, _messageTypes2.default.voiceMail, "聲音"), (0, _defineProperty3.default)(_title$search$compose, _messageTypes2.default.text, "簡訊"), (0, _defineProperty3.default)(_title$search$compose, _messageTypes2.default.fax, "傳真"), _title$search$compose);

// @key: @#@"title"@#@ @source: @#@"Messages"@#@
// @key: @#@"search"@#@ @source: @#@"Search..."@#@
// @key: @#@"composeText"@#@ @source: @#@"Compose Text"@#@
// @key: @#@"noMessages"@#@ @source: @#@"No Messages"@#@
// @key: @#@"noSearchResults"@#@ @source: @#@"No matching records found"@#@
// @key: @#@"[messageTypes.all]"@#@ @source: @#@"All"@#@
// @key: @#@"[messageTypes.voiceMail]"@#@ @source: @#@"Voice"@#@
// @key: @#@"[messageTypes.text]"@#@ @source: @#@"Text"@#@
// @key: @#@"[messageTypes.fax]"@#@ @source: @#@"Fax"@#@
//# sourceMappingURL=zh-TW.js.map
