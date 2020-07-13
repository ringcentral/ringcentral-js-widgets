import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const actionTypes = ObjectMap.prefixKeys(
  ['startToConnect', 'connectComplete'],
  'softphone',
);

export default actionTypes;
