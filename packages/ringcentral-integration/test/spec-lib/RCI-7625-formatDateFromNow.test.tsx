import dayjs from 'dayjs';

import { formatDateFromNow } from '../../lib/formatDuration';

describe('formatDateFromNow', () => {
  const yesterdayText = 'yesterday';
  const defaultTime = '2024/11/22 12:05:20';
  const baseTime = dayjs(defaultTime).valueOf();

  it('should return the time if the date is today', () => {
    const startTime = dayjs(defaultTime).valueOf();
    const result = formatDateFromNow(startTime, {
      baseTime,
      yesterday: yesterdayText,
    });
    expect(result).toBe(dayjs(startTime).format('LT'));
    expect(result).toMatchInlineSnapshot(`"12:05 PM"`);
  });

  it('should return "yesterday" if the date is yesterday and startTimeMode is "withoutTime"', () => {
    const startTime = dayjs(defaultTime).subtract(1, 'day').valueOf();
    const result = formatDateFromNow(startTime, {
      baseTime,
      yesterday: yesterdayText,
      timePresentationMode: 'withoutTime',
    });
    expect(result).toBe(yesterdayText);
    expect(result).toMatchInlineSnapshot(`"yesterday"`);
  });

  it('should return "yesterday, time" if the date is yesterday and startTimeMode is "withTime"', () => {
    const startTime = dayjs(defaultTime).subtract(1, 'day').valueOf();
    const result = formatDateFromNow(startTime, {
      baseTime,
      yesterday: yesterdayText,
      timePresentationMode: 'withTime',
    });
    expect(result).toBe(`${yesterdayText}, ${dayjs(startTime).format('LT')}`);
    expect(result).toMatchInlineSnapshot(`"yesterday, 12:05 PM"`);
  });

  it('should return the day of the week if the date is within the current week and startTimeMode is "withoutTime"', () => {
    const startTime = dayjs(defaultTime).subtract(2, 'day').valueOf();
    const result = formatDateFromNow(startTime, {
      baseTime,
      yesterday: yesterdayText,
      timePresentationMode: 'withoutTime',
    });
    expect(result).toBe(dayjs(startTime).format('ddd'));
    expect(result).toMatchInlineSnapshot(`"Wed"`);
  });

  it('should return "day of the week, time" if the date is within the current week and startTimeMode is "withTime"', () => {
    const startTime = dayjs(defaultTime).subtract(2, 'day').valueOf();
    const result = formatDateFromNow(startTime, {
      baseTime,
      yesterday: yesterdayText,
      timePresentationMode: 'withTime',
    });
    expect(result).toBe(dayjs(startTime).format(`ddd, LT`));
    expect(result).toMatchInlineSnapshot(`"Wed, 12:05 PM"`);
  });

  it('should return the date in "M/D" format if the date is within the current year and startTimeMode is "withoutTime"', () => {
    const startTime = dayjs(defaultTime).subtract(1, 'month').valueOf();
    const result = formatDateFromNow(startTime, {
      baseTime,
      yesterday: yesterdayText,
      timePresentationMode: 'withoutTime',
    });
    expect(result).toBe(dayjs(startTime).format('M/D'));
    expect(result).toMatchInlineSnapshot(`"10/22"`);
  });

  it('should return "M/D, time" if the date is within the current year and startTimeMode is "withTime"', () => {
    const startTime = dayjs(defaultTime).subtract(1, 'month').valueOf();
    const result = formatDateFromNow(startTime, {
      baseTime,
      yesterday: yesterdayText,
      timePresentationMode: 'withTime',
    });
    expect(result).toBe(dayjs(startTime).format(`M/D LT`));
    expect(result).toMatchInlineSnapshot(`"10/22 12:05 PM"`);
  });

  it('should return the date in localized format if the date is not within the current year and startTimeMode is "withoutTime"', () => {
    const startTime = dayjs(defaultTime).subtract(1, 'year').valueOf();
    const result = formatDateFromNow(startTime, {
      baseTime,
      yesterday: yesterdayText,
      timePresentationMode: 'withoutTime',
    });
    expect(result).toBe(dayjs(startTime).format('l'));
    expect(result).toMatchInlineSnapshot(`"11/22/2023"`);
  });

  it('should return "localized format, time" if the date is not within the current year and startTimeMode is "withTime"', () => {
    const startTime = dayjs(defaultTime).subtract(1, 'year').valueOf();
    const result = formatDateFromNow(startTime, {
      baseTime,
      yesterday: yesterdayText,
      timePresentationMode: 'withTime',
    });
    expect(result).toBe(dayjs(startTime).format(`l LT`));
    expect(result).toMatchInlineSnapshot(`"11/22/2023 12:05 PM"`);
  });

  it('should return an empty string if startTime is undefined', () => {
    const result = formatDateFromNow(undefined, {
      baseTime,
      yesterday: yesterdayText,
    });
    expect(result).toBe('');
    expect(result).toMatchInlineSnapshot(`""`);
  });

  it('should return an empty string if startTime is null', () => {
    const result = formatDateFromNow(null, {
      baseTime,
      yesterday: yesterdayText,
    });
    expect(result).toBe('');
    expect(result).toMatchInlineSnapshot(`""`);
  });
});
