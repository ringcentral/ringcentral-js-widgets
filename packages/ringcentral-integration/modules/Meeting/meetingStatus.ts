import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const meetingStatus = ObjectMap.prefixKeys(
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
    'renderInviteError',
  ],
  'meetingStatus',
);
