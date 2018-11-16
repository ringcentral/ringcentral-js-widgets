
const isYestoday = (time) => {
  const theDate = new Date(time);
  const date = (new Date());
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const yestday = new Date(today - 24 * 3600 * 1000).getTime();
  return theDate.getTime() < today && yestday <= theDate.getTime();
};

const isToday = (time) => {
  const theDate = new Date(time);
  const date = (new Date());
  const todayBegin = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const todayEnd = todayBegin + 24 * 3600 * 1000;
  return theDate.getTime() > todayBegin && theDate.getTime() < todayEnd;
};

const zeroFix = number => (`00${number}`).slice(-2);

const formatToday = (time) => {
  const today = new Date(time);
  const hours = zeroFix(today.getHours());
  const minus = zeroFix(today.getMinutes());
  const suffix = hours > 12 ? 'PM' : 'AM';
  return `${hours}:${minus} ${suffix}`;
};

const formatDate = (time) => {
  const dateTime = new Date(time);
  const month = zeroFix(dateTime.getMonth() + 1);
  const date = zeroFix(dateTime.getDate());
  return `${month}/${date}`;
};

export function formatTime(timestamp) {
  if (isYestoday(timestamp)) {
    return 'Yestoday';
  }
  if (isToday(timestamp)) {
    return formatToday(timestamp);
  }
  return formatDate(timestamp);
}
