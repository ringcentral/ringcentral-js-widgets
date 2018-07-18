import messageTypes from 'ringcentral-integration/enums/messageTypes';

export default {
  title: 'Messaggi',
  search: 'Cerca...',
  noMessages: 'Nessun messaggio',
  noSearchResults: 'Nessun record corrispondente',
  composeText: 'Componi messaggio',
  [messageTypes.all]: 'Tutti',
  [messageTypes.voiceMail]: 'Voce',
  [messageTypes.text]: 'SMS',
  [messageTypes.fax]: 'Fax',
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
