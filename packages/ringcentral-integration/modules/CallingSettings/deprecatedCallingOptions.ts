import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export default ObjectMap.prefixKeys(
  ['myphone', 'otherphone', 'customphone'],
  'callingOptions',
);
