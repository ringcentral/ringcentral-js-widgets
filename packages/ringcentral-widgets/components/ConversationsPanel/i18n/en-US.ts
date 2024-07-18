import messageTypes from '@ringcentral-integration/commons/enums/messageTypes';

export default {
  title: 'Messages',
  search: 'Search...',
  composeText: 'Compose Text',
  noMessages: 'No Messages',
  noSearchResults: 'No matching records found',
  [messageTypes.all]: 'All',
  [messageTypes.voiceMail]: 'Voice',
  [messageTypes.text]: 'Text',
  [messageTypes.fax]: 'Fax',
} as const;
