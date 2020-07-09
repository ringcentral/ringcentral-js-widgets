import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const baseActionTypes = ObjectMap.prefixKeys(
  ['action', 'execute', 'sync', 'initSync', 'syncSuccess', 'initModule'],
  'proxy',
);

export default baseActionTypes;
