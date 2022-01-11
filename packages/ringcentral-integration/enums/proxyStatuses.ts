import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export default ObjectMap.prefixKeys(
  ['pending', 'initializing', 'ready'],
  'module',
);
