/* eslint-disable */
import messageTypes from '@ringcentral-integration/commons/enums/messageTypes';
export default {
  title: 'Berichten',
  search: 'Zoeken...',
  composeText: 'Tekst opstellen',
  noMessages: 'Geen berichten',
  noSearchResults: 'Geen overeenkomende opnamen gevonden',
  [messageTypes.all]: 'Alles',
  [messageTypes.voiceMail]: 'Voice',
  [messageTypes.text]: 'Tekstbericht',
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
