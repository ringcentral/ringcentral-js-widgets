import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { moduleActionTypes } from '../../enums/moduleActionTypes';

export const actionTypes = ObjectMap.prefixKeys(
  [
    ...ObjectMap.keys(moduleActionTypes),
    'updateCurrentConversationId',
    'updateSearchInput',
    'updateTypeFilter',
    'fetchOldConversations',
    'fetchOldConversationsSuccess',
    'fetchOldConversationsError',
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
    'cleanOldConversations',
    'addEntities',
    'removeEntity',
    'addResponses',
    'removeResponse',
  ],
  'conversations',
);

export default actionTypes;
