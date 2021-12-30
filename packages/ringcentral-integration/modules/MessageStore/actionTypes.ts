import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import { moduleActionTypes } from '../../enums/moduleActionTypes';

export const actionTypes = ObjectMap.prefixKeys(
  [
    ...ObjectMap.keys(moduleActionTypes),
    'conversationsSync',
    'conversationsFSyncSuccess',
    'conversationsISyncSuccess',
    'conversationsSyncError',
    'conversationSync',
    'conversationSyncError',
    'updateMessages',
    'markMessages',
    'clickToSMS',
    'clickToCall',
    'deleteConversation',
    'sliceConversations',
  ],
  'newMessageStore',
);

export default actionTypes;
