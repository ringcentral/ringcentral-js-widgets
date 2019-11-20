export function setUTCTime(time = new Date()) {
  const _time = new Date(time);
  const year = _time.getFullYear();
  const month = _time.getMonth();
  const date = _time.getDate();
  return Date.UTC(year, month, date);
}
