'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _search$noMessages$no;

var _messageTypes = require('ringcentral-integration/enums/messageTypes');

var _messageTypes2 = _interopRequireDefault(_messageTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_search$noMessages$no = {
  search: '検索...',
  noMessages: 'メッセージなし',
  noSearchResults: '一致する記録が見つかりません',
  title: 'メッセージ',
  composeText: 'テキストの作成'
}, (0, _defineProperty3.default)(_search$noMessages$no, _messageTypes2.default.all, 'すべて'), (0, _defineProperty3.default)(_search$noMessages$no, _messageTypes2.default.voiceMail, '音声'), (0, _defineProperty3.default)(_search$noMessages$no, _messageTypes2.default.text, 'テキスト'), (0, _defineProperty3.default)(_search$noMessages$no, _messageTypes2.default.fax, 'FAX'), _search$noMessages$no);

// @key: @#@"title"@#@ @source: @#@"Messages"@#@
// @key: @#@"search"@#@ @source: @#@"Search..."@#@
// @key: @#@"composeText"@#@ @source: @#@"Compose Text"@#@
// @key: @#@"noMessages"@#@ @source: @#@"No Messages"@#@
// @key: @#@"noSearchResults"@#@ @source: @#@"No matching records found"@#@
// @key: @#@"[messageTypes.all]"@#@ @source: @#@"All"@#@
// @key: @#@"[messageTypes.voiceMail]"@#@ @source: @#@"Voice"@#@
// @key: @#@"[messageTypes.text]"@#@ @source: @#@"Text"@#@
// @key: @#@"[messageTypes.fax]"@#@ @source: @#@"Fax"@#@
//# sourceMappingURL=ja-JP.js.map
