import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const contactSearchStatus = ObjectMap.prefixKeys(
  ['prepareSearching', 'searching', 'idle'],
  'contactSearchStatus',
);
