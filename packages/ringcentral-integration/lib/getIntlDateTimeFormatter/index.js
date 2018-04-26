import isToday from '../isToday';

export const formatterCache = {};

export function getFormatter(locale, options) {
  const key = JSON.stringify([locale, options]);
  if (!formatterCache[key]) {
    formatterCache[key] = new Intl.DateTimeFormat(locale, { ...options });
  }
  return formatterCache[key];
}

export const DEFAULT_DATE_TIME_OPTIONS = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
};
export const DEFAULT_DATE_OPTIONS = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};
export const DEFAULT_TIME_OPTIONS = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
};

export default function getIntlDateTimeFormatter({
  dateTimeOptions = DEFAULT_DATE_TIME_OPTIONS,
  dateOptions = DEFAULT_DATE_OPTIONS,
  timeOptions = DEFAULT_TIME_OPTIONS,
} = {}) {
  return ({
    utcTimestamp,
    locale,
    type = isToday(utcTimestamp) ? 'time' : 'date',
  }) => {
    switch (type) {
      case 'date':
        return getFormatter(locale, dateOptions).format(new Date(utcTimestamp));
      case 'time':
        return getFormatter(locale, timeOptions).format(new Date(utcTimestamp));
      default:
        return getFormatter(locale, dateTimeOptions).format(new Date(utcTimestamp));
    }
  };
}
