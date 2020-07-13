import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const syncStatus = ObjectMap.prefixKeys(
  ['syncing', 'idle'],
  'address-book',
);

export default syncStatus;
