export function isToday(utcString: string) {
  const now = new Date();
  const t = new Date(utcString);

  return (
    now.getFullYear() === t.getFullYear() &&
    now.getMonth() === t.getMonth() &&
    now.getDate() === t.getDate()
  );
}

export const formatterCache: Record<string, Intl.DateTimeFormat> = {};

export function getFormatter(
  locale: string,
  options: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormat {
  const key = JSON.stringify([locale, options]);
  if (!formatterCache[key]) {
    formatterCache[key] = new Intl.DateTimeFormat(locale, { ...options });
  }
  return formatterCache[key];
}

export const DEFAULT_DATE_TIME_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
};

export const DEFAULT_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

export const DEFAULT_TIME_OPTIONS: Intl.DateTimeFormatOptions = {
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
  }: DateTimeFormatterParams) => {
    if (!utcTimestamp) {
      // Too much helpless message. Ignore it for test env.
      if (process.env.NODE_ENV !== 'test') {
        console.warn('timestamp should not be empty');
      }
      return null;
    }
    switch (type) {
      case 'date':
        return getFormatter(locale, dateOptions)
          .format(new Date(utcTimestamp))
          .replace(/\u200E|\u200F/g, ''); // FIX: https://github.com/tc39/ecma402/issues/28
      case 'time':
        return getFormatter(locale, timeOptions).format(new Date(utcTimestamp));
      default:
        return getFormatter(locale, dateTimeOptions).format(
          new Date(utcTimestamp),
        );
    }
  };
}

export type DateTimeFormatter = ReturnType<typeof getIntlDateTimeFormatter>;

export type DateTimeFormatterParams = {
  utcTimestamp: any;
  locale: string;
  type?: 'datetime' | 'time' | 'date';
};
