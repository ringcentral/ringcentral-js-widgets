import { logger } from '@ringcentral-integration/next-core';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import {
  getDstEndDate,
  getDstStartDate,
  isInDstPeriod,
  parseDstDescription,
} from './utils';

dayjs.extend(utc);

describe('StaticTimezoneService utils', () => {
  beforeEach(() => {
    jest.spyOn(logger, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  describe('parseDstDescription', () => {
    it('uses the current year when year is omitted', () => {
      jest.useFakeTimers().setSystemTime(new Date('2026-05-20T12:00:00Z'));

      expect(
        parseDstDescription('2nd Sunday of March').format('YYYY-MM-DD'),
      ).toBe('2026-03-08');
    });

    it('returns the start of the year when description is empty', () => {
      const result = parseDstDescription('', 2025);

      expect(result.format('YYYY-MM-DD')).toBe('2025-01-01');
      expect(result.isUTC()).toBe(true);
    });

    it('parses ordinal weekday descriptions', () => {
      expect(
        parseDstDescription('2nd Sunday of March', 2025).format('YYYY-MM-DD'),
      ).toBe('2025-03-09');
      expect(
        parseDstDescription('1st Sunday of November', 2025).format(
          'YYYY-MM-DD',
        ),
      ).toBe('2025-11-02');
    });

    it('parses last weekday descriptions', () => {
      expect(
        parseDstDescription('last Sunday of October', 2025).format(
          'YYYY-MM-DD',
        ),
      ).toBe('2025-10-26');
    });

    it('supports abbreviated month and day names', () => {
      expect(
        parseDstDescription('2nd Sun of Mar', 2025).format('YYYY-MM-DD'),
      ).toBe('2025-03-09');
      expect(
        parseDstDescription('last Thurs of Oct', 2025).format('YYYY-MM-DD'),
      ).toBe('2025-10-30');
    });

    it('throws for invalid description formats', () => {
      expect(() => parseDstDescription('invalid', 2025)).toThrow(
        'Invalid DST description format: invalid',
      );
      expect(() => parseDstDescription('2nd Sunday', 2025)).toThrow(
        'Invalid DST description format: 2nd Sunday',
      );
    });

    it('throws for invalid month and weekday names', () => {
      expect(() =>
        parseDstDescription('2nd Sunday of NotAMonth', 2025),
      ).toThrow('Invalid month: notamonth');
      expect(() => parseDstDescription('2nd NotADay of March', 2025)).toThrow(
        'Invalid day of week: notaday',
      );
    });

    it('throws for invalid ordinals and missing nth weekday', () => {
      expect(() => parseDstDescription('zeroth Sunday of March', 2025)).toThrow(
        'Invalid ordinal: zeroth',
      );
      expect(() => parseDstDescription('6th Sunday of February', 2025)).toThrow(
        'Cannot find 6th sunday in february 2025',
      );
    });
  });

  describe('getDstStartDate', () => {
    it('uses the current year when year is omitted', () => {
      jest.useFakeTimers().setSystemTime(new Date('2026-05-20T12:00:00Z'));

      expect(getDstStartDate('2nd Sunday of March').format('YYYY-MM-DD')).toBe(
        '2026-03-08',
      );
    });

    it('delegates to parseDstDescription', () => {
      expect(
        getDstStartDate('2nd Sunday of March', 2025).format('YYYY-MM-DD'),
      ).toBe('2025-03-09');
    });
  });

  describe('getDstEndDate', () => {
    it('uses the current year when year is omitted', () => {
      jest.useFakeTimers().setSystemTime(new Date('2026-05-20T12:00:00Z'));

      expect(getDstEndDate('1st Sunday of November').format('YYYY-MM-DD')).toBe(
        '2026-11-01',
      );
    });

    it('parses end dates in the same year', () => {
      expect(
        getDstEndDate('1st Sunday of November', 2025).format('YYYY-MM-DD'),
      ).toBe('2025-11-02');
    });

    it('parses end dates that continue into the next year', () => {
      expect(
        getDstEndDate('1st Sunday of April (next year)', 2024).format(
          'YYYY-MM-DD',
        ),
      ).toBe('2025-04-06');
    });
  });

  describe('isInDstPeriod', () => {
    const usDstStart = '2nd Sunday of March';
    const usDstEnd = '1st Sunday of November';

    it('returns true for dates inside a same-year DST window', () => {
      expect(
        isInDstPeriod('2025-07-01T12:00:00.000Z', usDstStart, usDstEnd),
      ).toBe(true);
    });

    it('includes the start date and excludes the end date for same-year DST windows', () => {
      expect(
        isInDstPeriod('2025-03-09T00:00:00.000Z', usDstStart, usDstEnd),
      ).toBe(true);
      expect(
        isInDstPeriod('2025-11-02T00:00:00.000Z', usDstStart, usDstEnd),
      ).toBe(false);
    });

    it('accepts Date and dayjs values as the date to check', () => {
      expect(
        isInDstPeriod(
          new Date('2025-07-01T12:00:00.000Z'),
          usDstStart,
          usDstEnd,
        ),
      ).toBe(true);
      expect(
        isInDstPeriod(dayjs('2025-01-15T12:00:00.000Z'), usDstStart, usDstEnd),
      ).toBe(false);
    });

    it('returns false for dates outside a same-year DST window', () => {
      expect(
        isInDstPeriod('2025-01-15T12:00:00.000Z', usDstStart, usDstEnd),
      ).toBe(false);
      expect(
        isInDstPeriod('2025-11-03T12:00:00.000Z', usDstStart, usDstEnd),
      ).toBe(false);
    });

    it('handles cross-year DST windows', () => {
      const dstStart = '1st Sunday of October';
      const dstEnd = '1st Sunday of April (next year)';

      expect(isInDstPeriod('2025-01-15T12:00:00.000Z', dstStart, dstEnd)).toBe(
        true,
      );
      expect(isInDstPeriod('2025-06-15T12:00:00.000Z', dstStart, dstEnd)).toBe(
        false,
      );
      expect(isInDstPeriod('2025-10-15T12:00:00.000Z', dstStart, dstEnd)).toBe(
        true,
      );
    });

    it('includes the start date and excludes the end date for cross-year DST windows', () => {
      const dstStart = '1st Sunday of October';
      const dstEnd = '1st Sunday of April (next year)';

      expect(isInDstPeriod('2025-04-06T00:00:00.000Z', dstStart, dstEnd)).toBe(
        false,
      );
      expect(isInDstPeriod('2025-10-05T00:00:00.000Z', dstStart, dstEnd)).toBe(
        true,
      );
    });

    it('returns false and logs when DST calculation fails', () => {
      expect(
        isInDstPeriod('2025-07-01T12:00:00.000Z', 'invalid', usDstEnd),
      ).toBe(false);
      expect(logger.error).toHaveBeenCalledWith(
        'Failed to calculate DST period',
        expect.any(Error),
      );
    });
  });
});
