import dayjs from 'dayjs';

interface ShouldSkipTodayNavigationParams {
  selectedDate: string | null;
  rangeStartDate: string;
  rangeEndDate: string;
}

export function shouldSkipTodayNavigation({
  selectedDate,
  rangeStartDate,
  rangeEndDate,
}: ShouldSkipTodayNavigationParams): boolean {
  if (!selectedDate) {
    return false;
  }

  const selected = dayjs(selectedDate);
  const rangeStart = dayjs(rangeStartDate);
  const rangeEnd = dayjs(rangeEndDate);

  return (
    selected.isValid() &&
    rangeStart.isValid() &&
    rangeEnd.isValid() &&
    (selected.isSame(rangeStart, 'day') ||
      selected.isAfter(rangeStart, 'day')) &&
    (selected.isSame(rangeEnd, 'day') || selected.isBefore(rangeEnd, 'day'))
  );
}
