import moment from 'moment-timezone';

function getTimeStamp(
  time: string,
  timezone: string = 'America/New_York',
): number {
  return new Date(moment.tz(time, timezone).format()).getTime();
}

export { getTimeStamp };
