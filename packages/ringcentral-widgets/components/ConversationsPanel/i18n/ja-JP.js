import messageTypes from 'ringcentral-integration/enums/messageTypes';

export default {
  title: 'メッセージ',
  search: '検索...',
  composeText: 'テキストの作成',
  noMessages: 'メッセージなし',
  noSearchResults: '一致する記録が見つかりません',
  [messageTypes.all]: 'すべて',
  [messageTypes.voiceMail]: '音声',
  [messageTypes.text]: 'テキスト',
  [messageTypes.fax]: 'FAX'
};

// @key: @#@"title"@#@ @source: @#@"Messages"@#@
// @key: @#@"search"@#@ @source: @#@"Search..."@#@
// @key: @#@"composeText"@#@ @source: @#@"Compose Text"@#@
// @key: @#@"noMessages"@#@ @source: @#@"No Messages"@#@
// @key: @#@"noSearchResults"@#@ @source: @#@"No matching records found"@#@
// @key: @#@"[messageTypes.all]"@#@ @source: @#@"All"@#@
// @key: @#@"[messageTypes.voiceMail]"@#@ @source: @#@"Voice"@#@
// @key: @#@"[messageTypes.text]"@#@ @source: @#@"Text"@#@
// @key: @#@"[messageTypes.fax]"@#@ @source: @#@"Fax"@#@
