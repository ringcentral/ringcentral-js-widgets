/* eslint-disable */
import messageTypes from '@ringcentral-integration/commons/enums/messageTypes';
export default {
  title: 'Messages',
  search: 'Search...',
  composeText: 'Compose Text',
  noMessages: 'No messages',
  noSearchResults: 'No matching records found',
  [messageTypes.all]: 'All',
  [messageTypes.voiceMail]: 'Voice',
  [messageTypes.text]: 'Text',
  [messageTypes.fax]: 'Fax',
} as const;

// @key: @#@"title"@#@ @source: @#@"Messages"@#@
// @key: @#@"search"@#@ @source: @#@"Search..."@#@
// @key: @#@"composeText"@#@ @source: @#@"Compose Text"@#@
// @key: @#@"noMessages"@#@ @source: @#@"No Messages"@#@
// @key: @#@"noSearchResults"@#@ @source: @#@"No matching records found"@#@
// @key: @#@"[messageTypes.all]"@#@ @source: @#@"All"@#@
// @key: @#@"[messageTypes.voiceMail]"@#@ @source: @#@"Voice"@#@
// @key: @#@"[messageTypes.text]"@#@ @source: @#@"Text"@#@
// @key: @#@"[messageTypes.fax]"@#@ @source: @#@"Fax"@#@
