import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const contactSearchStatus = ObjectMap.prefixKeys(
  ['searching', 'idle'],
  'contactSearchStatus',
);

export default contactSearchStatus;
