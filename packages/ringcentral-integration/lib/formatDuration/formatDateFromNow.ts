import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(duration);
dayjs.extend(localizedFormat);

const defaultTimeFormat = 'LT';

/**
 * return from now day format
 *
 * If the date is today, it returns the time in the default format.
 * If the date is yesterday, it returns 'yesterday' or 'yesterday, time' based on the startTimeMode.
 * If the date is within the current week, it returns the day of the week or 'day of the week, time' based on the startTimeMode.
 * If the date is within the current year, it returns the date in 'M/D' format or 'M/D, time' based on the startTimeMode.
 * Otherwise, it returns the date in localized format or 'localized format, time' based on the startTimeMode.
 *
 * @param date
 * @returns
 */
export const formatDateFromNow = (
  dateTime: number | undefined | null,
  {
    yesterday,
    baseTime,
    timePresentationMode = 'withTime',
  }: {
    /**
     * yesterday text for render
     */
    yesterday: string;
    /**
     * base time for compare
     *
     * @default Date.now()
     */
    baseTime?: number;
    /**
     * how to display the startTime
     *
     * @default 'withTime'
     */
    timePresentationMode?: 'withoutTime' | 'withTime';
  },
) => {
  const withoutTime = timePresentationMode === 'withoutTime';

  if (!dateTime) return '';
  const date = dayjs(dateTime);
  const baseTimeDate = dayjs(baseTime);

  if (date.isSame(baseTimeDate, 'day')) return date.format(defaultTimeFormat);

  if (date.isSame(baseTimeDate.subtract(1, 'day'), 'day'))
    return withoutTime
      ? yesterday
      : `${yesterday}, ${date.format(defaultTimeFormat)}`;

  if (date.isSame(baseTimeDate, 'week'))
    return date.format(withoutTime ? 'ddd' : `ddd, ${defaultTimeFormat}`);

  if (date.isSame(baseTimeDate, 'year'))
    return date.format(withoutTime ? 'M/D' : `M/D ${defaultTimeFormat}`);

  return date.format(withoutTime ? 'l' : `l ${defaultTimeFormat}`);
};
