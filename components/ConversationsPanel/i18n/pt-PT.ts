/* eslint-disable */
import messageTypes from '@ringcentral-integration/commons/enums/messageTypes';
export default {
  title: 'Mensagens',
  search: 'Pesquisar…',
  composeText: 'Compor SMS',
  noMessages: 'Sem mensagens',
  noSearchResults: 'Não foram encontrados registos correspondentes',
  [messageTypes.all]: 'Tudo',
  [messageTypes.voiceMail]: 'Voz',
  [messageTypes.text]: 'SMS',
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
