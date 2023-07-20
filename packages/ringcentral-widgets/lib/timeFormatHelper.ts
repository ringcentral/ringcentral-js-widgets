import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function setUTCTime(time: number | Date = Date.now()) {
  const _time = new Date(time);
  const year = _time.getFullYear();
  const month = _time.getMonth();
  const date = _time.getDate();
  return Date.UTC(year, month, date);
}

export function getDateFromUTCDay(timeStamp: any) {
  return new Date(dayjs.utc(timeStamp).format('MM/DD/YYYY'));
}
