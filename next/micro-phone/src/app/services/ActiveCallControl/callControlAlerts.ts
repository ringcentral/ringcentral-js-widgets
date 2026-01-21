import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const callControlAlerts = ObjectMap.prefixKeys(
  ['callsMerged', 'somethingWentWrong', 'tooManyParticipants'],
  'callControlAlerts',
);
