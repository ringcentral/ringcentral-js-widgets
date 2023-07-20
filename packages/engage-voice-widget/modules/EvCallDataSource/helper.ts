import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

function getTimeStamp(time: string, timezone = 'America/New_York'): number {
  return new Date(dayjs.tz(time, timezone).format()).getTime();
}

export { getTimeStamp };
