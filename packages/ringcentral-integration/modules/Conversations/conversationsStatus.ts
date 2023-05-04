import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const conversationsStatus = ObjectMap.prefixKeys(
  ['fetching', 'idle', 'pushing'],
  'conversations',
);

export default conversationsStatus;
