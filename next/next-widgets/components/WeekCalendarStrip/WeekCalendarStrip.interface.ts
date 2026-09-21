import type dayjs from 'dayjs';

export interface WeekCalendarStripProps {
  selectedDate: string | null;
  onDateSelected: (
    dateStr: string,
    context?: WeekCalendarDateSelectionContext,
  ) => void;
  availableDates: Set<string>;
  onVisibleRangeChange: (
    startDate: dayjs.Dayjs,
    endDate: dayjs.Dayjs,
    isMonthlyView: boolean,
  ) => void;
  onTodayNavigated?: (todayDate: string) => void;
  timezoneId: string;
}

export interface WeekCalendarDateSelectionContext {
  source: 'dateButton';
}

export interface WeekCalendarDayProps {
  dayDate: string;
  timezoneId: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}
