import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const composeTextStatus = ObjectMap.prefixKeys(
  ['idle', 'sending'],
  'composeText',
);

export default composeTextStatus;
