import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const conferenceCallStatus = ObjectMap.prefixKeys(
  ['idle', 'requesting'],
  'conferenceCall',
);

export default conferenceCallStatus;
