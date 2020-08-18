import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export default ObjectMap.prefixKeys(
  [
    'invalidMeetingInfo',
    'emptyTopic',
    'noPassword',
    'durationIncorrect',
    'insufficientPermissions',
    'scheduledSuccess',
    'updatedSuccess',
    'internalError',
    'meetingIsDeleted',
  ],
  'meetingStatus',
);
