import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const genericMeetingStatus = ObjectMap.prefixKeys(
  ['updating', 'updated', 'idle'],
  'genericMeetingStatus',
);
