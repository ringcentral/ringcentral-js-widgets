import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

function getTimeStamp(time: string, timezone = 'America/New_York'): number {
  return new Date(dayjs.tz(time, timezone).format()).getTime();
}

export { getTimeStamp };
