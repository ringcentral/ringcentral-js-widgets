import { createEnum } from '../../lib/Enum';

export default createEnum(
  ['idle', 'scheduling', 'scheduled'],
  'meetingScheduleStatus',
);
