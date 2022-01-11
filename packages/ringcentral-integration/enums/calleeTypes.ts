import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export default ObjectMap.prefixKeys(
  ['unknown', 'contacts', 'conference'],
  'calleeTypes',
);
