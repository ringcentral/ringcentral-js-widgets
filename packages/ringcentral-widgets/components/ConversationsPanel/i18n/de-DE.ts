/* eslint-disable */
import messageTypes from '@ringcentral-integration/commons/enums/messageTypes';
export default {
  title: 'Nachrichten',
  search: 'Suchen...',
  composeText: 'Text erstellen',
  noMessages: 'Keine Meldungen',
  noSearchResults: 'Kein übereinstimmender Datensatz gefunden',
  [messageTypes.all]: 'Alle',
  [messageTypes.voiceMail]: 'Sprachn.',
  [messageTypes.text]: 'Textnachricht',
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
