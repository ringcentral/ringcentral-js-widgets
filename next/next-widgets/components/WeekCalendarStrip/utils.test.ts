import { shouldSkipTodayNavigation } from './utils';

describe('shouldSkipTodayNavigation', () => {
  it('should skip today navigation when selected date is in the week range', () => {
    expect(
      shouldSkipTodayNavigation({
        selectedDate: '2026-05-20',
        rangeStartDate: '2026-05-17',
        rangeEndDate: '2026-05-23',
      }),
    ).toBe(true);
  });

  it('should skip today navigation when selected date is in the month range', () => {
    expect(
      shouldSkipTodayNavigation({
        selectedDate: '2026-05-29',
        rangeStartDate: '2026-05-01',
        rangeEndDate: '2026-05-31',
      }),
    ).toBe(true);
  });

  it.each([
    {
      selectedDate: '2026-05-16',
      rangeStartDate: '2026-05-17',
      rangeEndDate: '2026-05-23',
    },
    {
      selectedDate: '2026-06-01',
      rangeStartDate: '2026-05-01',
      rangeEndDate: '2026-05-31',
    },
  ])(
    'should not skip today navigation when selected date is outside the range',
    (params) => {
      expect(shouldSkipTodayNavigation(params)).toBe(false);
    },
  );
});
