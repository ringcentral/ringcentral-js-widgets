import moment from 'moment';

export function setUTCTime(time: number | Date = Date.now()) {
  const _time = new Date(time);
  const year = _time.getFullYear();
  const month = _time.getMonth();
  const date = _time.getDate();
  return Date.UTC(year, month, date);
}

export function getDateFromUTCDay(timeStamp) {
  return new Date(moment.utc(timeStamp).format('MM/DD/YYYY'));
}
