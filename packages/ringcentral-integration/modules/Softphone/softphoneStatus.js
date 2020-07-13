import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const softphoneStatus = ObjectMap.prefixKeys(
  ['idle', 'connecting'],
  'softphone',
);

export default softphoneStatus;
