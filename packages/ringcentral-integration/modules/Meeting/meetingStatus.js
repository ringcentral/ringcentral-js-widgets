import Enum from '../../lib/Enum';

export default new Enum([
  'invalidMeetingInfo',
  'emptyTopic',
  'noPassword',
  'durationIncorrect',
  'insufficientPermissions',
  'scheduledSuccess',
  'updatedSuccess',
  'internalError',
], 'meetingStatus');
