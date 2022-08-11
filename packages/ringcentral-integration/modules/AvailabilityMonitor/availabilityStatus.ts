import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const availability = ObjectMap.prefixKeys(
  ['HIGH', 'LIMITED'],
  'availability',
);
