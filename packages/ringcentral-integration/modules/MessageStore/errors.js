import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const errors = ObjectMap.prefixKeys(
  ['deleteFailed', 'readFailed', 'unreadFailed'],
  'messageStore',
);

export default errors;
