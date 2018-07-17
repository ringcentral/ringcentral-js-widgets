import messageTypes from 'ringcentral-integration/enums/messageTypes';

export default {
  title: 'Mensajes',
  search: 'Buscar...',
  noMessages: 'Sin mensajes',
  noSearchResults: 'No se han encontrado registros que coincidan',
  composeText: 'Redactar mensaje',
  [messageTypes.all]: 'Todo',
  [messageTypes.voiceMail]: 'Voz',
  [messageTypes.text]: 'Texto',
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
