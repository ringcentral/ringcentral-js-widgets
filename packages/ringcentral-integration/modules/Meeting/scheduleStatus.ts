import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export default ObjectMap.prefixKeys(
  ['idle', 'scheduling', 'scheduled'],
  'meetingScheduleStatus',
);
