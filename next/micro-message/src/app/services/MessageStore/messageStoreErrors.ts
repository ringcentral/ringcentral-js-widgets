import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const messageStoreErrors = ObjectMap.prefixKeys(
  ['deleteFailed', 'readFailed', 'unreadFailed'],
  'messageStore',
);
