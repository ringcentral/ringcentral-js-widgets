import { createEnum } from '../../lib/Enum';

export default createEnum(
  [
    'invalidMeetingInfo',
    'emptyTopic',
    'noPassword',
    'durationIncorrect',
    'insufficientPermissions',
    'scheduledSuccess',
    'updatedSuccess',
    'internalError',
  ],
  'meetingStatus',
);
