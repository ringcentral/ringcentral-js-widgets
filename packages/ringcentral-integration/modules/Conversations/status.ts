import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const status = ObjectMap.prefixKeys(
  ['fetching', 'idle', 'pushing'],
  'conversations',
);

export default status;
