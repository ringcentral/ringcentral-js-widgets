import Enum from '../../lib/Enum';
import moduleActionTypes from '../../enums/moduleActionTypes';

export default new Enum([
  ...Object.keys(moduleActionTypes),
  'updateCurrentConversationId',
  'updateSearchInput',
  'updateTypeFilter',
  'fetchOldConverstaions',
  'fetchOldConverstaionsSuccess',
  'fetchOldConverstaionsError',
  'fetchOldMessagesSuccess',
  'fetchOldMessagesError',
  'fetchOldMessages',
  'updateMessageText',
  'removeMessageText',
  'reply',
  'replySuccess',
  'replyError',
  'deleteConversation',
  'increaseCurrentPage',
  'resetCurrentPage',
], 'conversations');
