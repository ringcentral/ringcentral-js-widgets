import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const deprecatedCallingOptions = ObjectMap.prefixKeys(
  ['myphone', 'otherphone', 'customphone'],
  'callingOptions',
);
