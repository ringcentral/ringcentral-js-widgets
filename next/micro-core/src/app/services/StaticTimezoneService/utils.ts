import { logger } from '@ringcentral-integration/next-core';
import dayjs from 'dayjs';

/**
 * Parse a DST time description, e.g., "2nd Sunday of March".
 * @param description Time description in format like "2nd Sunday of March", "last Sunday of October", etc.
 * @param year Year, defaults to current year
 * @returns dayjs object in UTC representing the start of the day (00:00:00)
 */
export function parseDstDescription(
  description: string,
  year: number = dayjs().year(),
): dayjs.Dayjs {
  if (!description) {
    return dayjs().utc().year(year).startOf('year');
  }

  const parts = description.toLowerCase().split(' ');

  if (parts.length < 4) {
    throw new Error(`Invalid DST description format: ${description}`);
  }

  const ordinal = parts[0];
  const dayOfWeek = parts[1];
  const month = parts[3];

  const monthMap: Record<string, number> = {
    january: 0,
    jan: 0,
    february: 1,
    feb: 1,
    march: 2,
    mar: 2,
    april: 3,
    apr: 3,
    may: 4,
    june: 5,
    jun: 5,
    july: 6,
    jul: 6,
    august: 7,
    aug: 7,
    september: 8,
    sep: 8,
    sept: 8,
    october: 9,
    oct: 9,
    november: 10,
    nov: 10,
    december: 11,
    dec: 11,
  };

  const dayMap: Record<string, number> = {
    sunday: 0,
    sun: 0,
    monday: 1,
    mon: 1,
    tuesday: 2,
    tue: 2,
    tues: 2,
    wednesday: 3,
    wed: 3,
    thursday: 4,
    thu: 4,
    thurs: 4,
    friday: 5,
    fri: 5,
    saturday: 6,
    sat: 6,
  };

  const monthIndex = monthMap[month];
  const dayIndex = dayMap[dayOfWeek];

  if (monthIndex === undefined) {
    throw new Error(`Invalid month: ${month}`);
  }

  if (dayIndex === undefined) {
    throw new Error(`Invalid day of week: ${dayOfWeek}`);
  }

  const firstDayOfMonth = dayjs()
    .utc()
    .year(year)
    .month(monthIndex)
    .startOf('month');

  let targetDate: dayjs.Dayjs = firstDayOfMonth;

  if (ordinal === 'last') {
    const lastDayOfMonth = firstDayOfMonth.endOf('month');
    let currentDate = lastDayOfMonth;
    while (currentDate.day() !== dayIndex) {
      currentDate = currentDate.subtract(1, 'day');
    }
    targetDate = currentDate;
  } else {
    const ordinalNumber = parseInt(ordinal.replace(/\D/g, ''));

    if (isNaN(ordinalNumber) || ordinalNumber < 1) {
      throw new Error(`Invalid ordinal: ${ordinal}`);
    }

    let currentDate = firstDayOfMonth;
    let count = 0;

    while (count < ordinalNumber) {
      if (currentDate.day() === dayIndex) {
        count++;
        if (count === ordinalNumber) {
          targetDate = currentDate;
          break;
        }
      }
      currentDate = currentDate.add(1, 'day');

      if (currentDate.month() !== monthIndex) {
        throw new Error(
          `Cannot find ${ordinal} ${dayOfWeek} in ${month} ${year}`,
        );
      }
    }
  }

  return targetDate;
}

export function getDstStartDate(
  dstStart: string,
  year: number = dayjs().year(),
): dayjs.Dayjs {
  return parseDstDescription(dstStart, year);
}

export function getDstEndDate(
  dstEnd: string,
  year: number = dayjs().year(),
): dayjs.Dayjs {
  if (dstEnd.includes('(next year)')) {
    const cleanDescription = dstEnd.replace(' (next year)', '');
    return parseDstDescription(cleanDescription, year + 1);
  }

  return parseDstDescription(dstEnd, year);
}

export function isInDstPeriod(
  date: dayjs.Dayjs | string | Date,
  dstStart: string,
  dstEnd: string,
): boolean {
  const checkDate = dayjs(date);
  const year = checkDate.year();

  try {
    const isCrossYear = dstEnd.includes('(next year)');
    const checkMs = checkDate.valueOf();

    if (isCrossYear) {
      const startDatePrev = getDstStartDate(dstStart, year - 1);
      const endDateCurrent = getDstEndDate(dstEnd, year - 1);
      const startDateCurrent = getDstStartDate(dstStart, year);
      const endDateNext = getDstEndDate(dstEnd, year);

      if (
        checkMs >= startDatePrev.valueOf() &&
        checkMs < endDateCurrent.valueOf()
      ) {
        return true;
      }

      if (
        checkMs >= startDateCurrent.valueOf() &&
        checkMs < endDateNext.valueOf()
      ) {
        return true;
      }

      return false;
    }

    const startDateCurrent = getDstStartDate(dstStart, year);
    const endDateCurrent = getDstEndDate(dstEnd, year);

    return (
      checkMs >= startDateCurrent.valueOf() &&
      checkMs < endDateCurrent.valueOf()
    );
  } catch (error) {
    logger.error('Failed to calculate DST period', error);
    return false;
  }
}
