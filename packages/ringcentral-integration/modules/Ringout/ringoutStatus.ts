import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const ringoutStatus = ObjectMap.prefixKeys(
  ['idle', 'connecting'],
  'ringoutStatus',
);
