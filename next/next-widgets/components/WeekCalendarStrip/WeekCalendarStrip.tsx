import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { STATIC_TIMEZONE_LIST } from '@ringcentral-integration/micro-core/src/app/services/StaticTimezoneService';
import {
  CaretDownMd,
  CaretUpMd,
  CaretLeftMd,
  CaretRightMd,
} from '@ringcentral/spring-icon';
import { Button, IconButton } from '@ringcentral/spring-ui';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { WeekCalendarDay } from './WeekCalendarDay';
import { WeekCalendarStripProps } from './WeekCalendarStrip.interface';
import { MAX_DAYS, WEEK_DAYS } from './constants';
import i18n from './i18n';
import { shouldSkipTodayNavigation } from './utils';

dayjs.extend(utc);
dayjs.extend(timezone);

const WEEK_DAY_LABELS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const;

export const WeekCalendarStrip: React.FC<WeekCalendarStripProps> = ({
  selectedDate,
  onDateSelected,
  availableDates,
  onVisibleRangeChange,
  onTodayNavigated,
  timezoneId,
}) => {
  const { t, currentLocale } = useLocale(i18n);

  const timezoneName = useMemo((): string => {
    const tz = STATIC_TIMEZONE_LIST.find((item) => item.id === timezoneId);
    if (tz?.name === 'GMT') {
      return 'UTC';
    }
    return tz?.name || 'UTC';
  }, [timezoneId]);

  const parseCalendarDate = useCallback(
    (dateStr: string): dayjs.Dayjs => dayjs(dateStr),
    [],
  );

  const monthLabelFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(currentLocale, {
        year: 'numeric',
        month: 'long',
        timeZone: timezoneName,
      }),
    [currentLocale, timezoneName],
  );

  /**
   * Get current time in the specified timezone
   */
  const getNow = useCallback((): dayjs.Dayjs => {
    return dayjs().tz(timezoneName).startOf('day');
  }, [timezoneName]);

  const getSundayOfWeek = useCallback((date: dayjs.Dayjs): dayjs.Dayjs => {
    return date.startOf('day').subtract(date.day(), 'day').startOf('day');
  }, []);

  const [isMonthlyView, setIsMonthlyView] = useState(false);

  // Single anchor date used by both week and month views
  const [viewingDate, setViewingDate] = useState<string>(() => {
    const tz = STATIC_TIMEZONE_LIST.find((item) => item.id === timezoneId);
    const initialTimezoneName = tz?.name === 'GMT' ? 'UTC' : tz?.name || 'UTC';
    const today = dayjs().tz(initialTimezoneName).format('YYYY-MM-DD');
    return selectedDate || today;
  });

  const onVisibleRangeChangeRef = useRef(onVisibleRangeChange);

  useEffect(() => {
    onVisibleRangeChangeRef.current = onVisibleRangeChange;
  }, [onVisibleRangeChange]);

  const [pendingSelectedDate, setPendingSelectedDate] = useState<string | null>(
    null,
  );

  const shouldDisableDateInternal = useCallback(
    (dayDate: string) => {
      return !availableDates.has(dayDate);
    },
    [availableDates],
  );

  const viewingDayjs = useMemo(
    () => parseCalendarDate(viewingDate),
    [parseCalendarDate, viewingDate],
  );

  const weekStart = useMemo(
    () => getSundayOfWeek(viewingDayjs),
    [getSundayOfWeek, viewingDayjs],
  );
  const weekEnd = useMemo(
    () => weekStart.add(WEEK_DAYS - 1, 'day'),
    [weekStart],
  );
  const monthStart = useMemo(
    () => viewingDayjs.startOf('month'),
    [viewingDayjs],
  );
  const monthEnd = useMemo(() => viewingDayjs.endOf('month'), [viewingDayjs]);

  // Month grid spans full Sun..Sat rows; leading/trailing cells fall in the
  // previous/next month and are still real, potentially-clickable dates.
  const monthGrid = useMemo(() => {
    const leadingBlanks = monthStart.day();
    const daysInMonth = monthEnd.date();
    const totalCells =
      Math.ceil((leadingBlanks + daysInMonth) / WEEK_DAYS) * WEEK_DAYS;
    const gridStart = monthStart.subtract(leadingBlanks, 'day');
    const gridEnd = gridStart.add(totalCells - 1, 'day');
    const rows: string[][] = [];
    for (let r = 0; r < totalCells; r += WEEK_DAYS) {
      const row: string[] = [];
      for (let c = 0; c < WEEK_DAYS; c += 1) {
        row.push(gridStart.add(r + c, 'day').format('YYYY-MM-DD'));
      }
      rows.push(row);
    }
    return { gridStart, gridEnd, rows };
  }, [monthStart, monthEnd]);

  // All day cells rendered in the strip (week row, or full month grid incl. spillover).
  // Used for selection highlight, optimistic pick, and isDateInVisibleRange.
  const visibleStart = useMemo(
    () => (isMonthlyView ? monthGrid.gridStart : weekStart),
    [isMonthlyView, monthGrid.gridStart, weekStart],
  );
  const visibleEnd = useMemo(
    () => (isMonthlyView ? monthGrid.gridEnd : weekEnd),
    [isMonthlyView, monthGrid.gridEnd, weekEnd],
  );

  // Range passed to onVisibleRangeChange: same as the strip row in week view;
  // in month view, the natural calendar month only (excludes grid spillover days).
  const notifyParentRangeStart = useMemo(
    () => (isMonthlyView ? monthStart : weekStart),
    [isMonthlyView, monthStart, weekStart],
  );
  const notifyParentRangeEnd = useMemo(
    () => (isMonthlyView ? monthEnd : weekEnd),
    [isMonthlyView, monthEnd, weekEnd],
  );

  const weekDays = useMemo(() => {
    const days: string[] = [];
    for (let i = 0; i < WEEK_DAYS; i += 1) {
      days.push(weekStart.add(i, 'day').format('YYYY-MM-DD'));
    }
    return days;
  }, [weekStart]);

  const isDateInRange = useCallback(
    (
      dateStr: string,
      rangeStart: dayjs.Dayjs,
      rangeEnd: dayjs.Dayjs,
    ): boolean => {
      const date = parseCalendarDate(dateStr);
      return (
        (date.isAfter(rangeStart, 'day') || date.isSame(rangeStart, 'day')) &&
        (date.isBefore(rangeEnd, 'day') || date.isSame(rangeEnd, 'day'))
      );
    },
    [parseCalendarDate],
  );

  const isDateInVisibleRange = useCallback(
    (dateStr: string): boolean =>
      isDateInRange(dateStr, visibleStart, visibleEnd),
    [isDateInRange, visibleStart, visibleEnd],
  );

  const findFirstAvailableDateInRange = useCallback(
    (rangeStart: dayjs.Dayjs, rangeEnd: dayjs.Dayjs): string | null => {
      const total = rangeEnd.diff(rangeStart, 'day') + 1;
      for (let i = 0; i < total; i += 1) {
        const dateStr = rangeStart.add(i, 'day').format('YYYY-MM-DD');
        if (availableDates.has(dateStr)) {
          return dateStr;
        }
      }
      return null;
    },
    [availableDates],
  );

  const displaySelectedDate = useMemo(() => {
    if (pendingSelectedDate && isDateInVisibleRange(pendingSelectedDate)) {
      return pendingSelectedDate;
    }
    if (selectedDate && isDateInVisibleRange(selectedDate)) {
      return selectedDate;
    }
    return null;
  }, [isDateInVisibleRange, pendingSelectedDate, selectedDate]);

  const goToToday = useCallback(() => {
    const today = getNow();
    const todayDate = today.format('YYYY-MM-DD');
    const rangeStart = isMonthlyView
      ? today.startOf('month')
      : getSundayOfWeek(today);
    const rangeEnd = isMonthlyView
      ? today.endOf('month')
      : rangeStart.add(WEEK_DAYS - 1, 'day');
    if (
      shouldSkipTodayNavigation({
        selectedDate,
        rangeStartDate: rangeStart.format('YYYY-MM-DD'),
        rangeEndDate: rangeEnd.format('YYYY-MM-DD'),
      }) &&
      (!availableDates.has(todayDate) || selectedDate === todayDate)
    ) {
      return;
    }

    const nextSelectedDate = availableDates.has(todayDate)
      ? todayDate
      : findFirstAvailableDateInRange(rangeStart, rangeEnd);

    setPendingSelectedDate(nextSelectedDate);
    if (nextSelectedDate) {
      onDateSelected(nextSelectedDate);
    }
    setViewingDate(todayDate);
    onTodayNavigated?.(todayDate);
  }, [
    availableDates,
    findFirstAvailableDateInRange,
    getNow,
    getSundayOfWeek,
    isMonthlyView,
    onDateSelected,
    onTodayNavigated,
    selectedDate,
  ]);

  const canGoPrevious = useMemo(() => {
    const today = dayjs(getNow().format('YYYY-MM-DD'));
    if (isMonthlyView) {
      // Allow if any day of the previous month is still within
      // [today, today + MAX_DAYS] (i.e. previous month end >= today)
      const prevMonthEnd = viewingDayjs.subtract(1, 'month').endOf('month');
      return !prevMonthEnd.isBefore(today, 'day');
    }
    return weekStart.isAfter(today, 'day');
  }, [getNow, isMonthlyView, viewingDayjs, weekStart]);

  const canGoNext = useMemo(() => {
    const maxDate = dayjs(getNow().format('YYYY-MM-DD')).add(MAX_DAYS, 'day');
    if (isMonthlyView) {
      // Allow if any day of the next month is still within
      // [today, today + MAX_DAYS] (i.e. next month start <= maxDate)
      const nextMonthStart = viewingDayjs.add(1, 'month').startOf('month');
      return !nextMonthStart.isAfter(maxDate, 'day');
    }
    return weekEnd.isBefore(maxDate, 'day');
  }, [getNow, isMonthlyView, viewingDayjs, weekEnd]);

  const goToPrevious = useCallback(() => {
    if (!canGoPrevious) return;
    const next = isMonthlyView
      ? viewingDayjs.subtract(1, 'month')
      : viewingDayjs.subtract(1, 'week');
    const rangeStart = isMonthlyView
      ? next.startOf('month')
      : getSundayOfWeek(next);
    const rangeEnd = isMonthlyView
      ? next.endOf('month')
      : rangeStart.add(WEEK_DAYS - 1, 'day');
    const nextSelectedDate = findFirstAvailableDateInRange(
      rangeStart,
      rangeEnd,
    );
    setPendingSelectedDate(nextSelectedDate);
    if (nextSelectedDate) {
      onDateSelected(nextSelectedDate);
    }
    setViewingDate(next.format('YYYY-MM-DD'));
  }, [
    canGoPrevious,
    findFirstAvailableDateInRange,
    getSundayOfWeek,
    isMonthlyView,
    onDateSelected,
    viewingDayjs,
  ]);

  const goToNext = useCallback(() => {
    if (!canGoNext) return;
    const next = isMonthlyView
      ? viewingDayjs.add(1, 'month')
      : viewingDayjs.add(1, 'week');
    const rangeStart = isMonthlyView
      ? next.startOf('month')
      : getSundayOfWeek(next);
    const rangeEnd = isMonthlyView
      ? next.endOf('month')
      : rangeStart.add(WEEK_DAYS - 1, 'day');
    const nextSelectedDate = findFirstAvailableDateInRange(
      rangeStart,
      rangeEnd,
    );
    setPendingSelectedDate(nextSelectedDate);
    if (nextSelectedDate) {
      onDateSelected(nextSelectedDate);
    }
    setViewingDate(next.format('YYYY-MM-DD'));
  }, [
    canGoNext,
    findFirstAvailableDateInRange,
    getSundayOfWeek,
    isMonthlyView,
    onDateSelected,
    viewingDayjs,
  ]);

  // Sync viewingDate when selectedDate moves to a different "logical" view:
  // - month view: selectedDate's month differs from viewingDate's month
  //   (so clicking a spillover cell from an adjacent month flips the grid)
  // - week view: selectedDate falls outside the visible week
  useEffect(() => {
    if (!selectedDate) return;
    const selected = parseCalendarDate(selectedDate);
    setViewingDate((prev) => {
      const prevDate = parseCalendarDate(prev);
      if (isMonthlyView) {
        return selected.isSame(prevDate, 'month') ? prev : selectedDate;
      }
      const start = getSundayOfWeek(prevDate);
      const end = start.add(WEEK_DAYS - 1, 'day');
      const inRange =
        (selected.isAfter(start, 'day') || selected.isSame(start, 'day')) &&
        (selected.isBefore(end, 'day') || selected.isSame(end, 'day'));
      return inRange ? prev : selectedDate;
    });
  }, [getSundayOfWeek, isMonthlyView, parseCalendarDate, selectedDate]);

  useEffect(() => {
    if (!pendingSelectedDate) {
      return;
    }
    if (
      selectedDate === pendingSelectedDate ||
      !isDateInVisibleRange(pendingSelectedDate)
    ) {
      setPendingSelectedDate(null);
    }
  }, [isDateInVisibleRange, pendingSelectedDate, selectedDate]);

  useEffect(() => {
    onVisibleRangeChangeRef.current(
      notifyParentRangeStart,
      notifyParentRangeEnd,
      isMonthlyView,
    );
  }, [
    viewingDate,
    isMonthlyView,
    notifyParentRangeStart,
    notifyParentRangeEnd,
  ]);

  const handleDateClick = useCallback(
    (dayDate: string) => {
      setPendingSelectedDate(dayDate);
      return onDateSelected(dayDate, { source: 'dateButton' });
    },
    [onDateSelected],
  );

  // monthLabel priority: visible selected date first, then view-specific anchor.
  // - selectedDate present in the current view: that date's month
  // - week view: Saturday of the visible week
  // - month view: viewingDate's month
  const monthLabelDate = useMemo((): dayjs.Dayjs => {
    if (displaySelectedDate) {
      return parseCalendarDate(displaySelectedDate);
    }
    return isMonthlyView ? viewingDayjs : weekStart.add(WEEK_DAYS - 1, 'day');
  }, [
    displaySelectedDate,
    isMonthlyView,
    parseCalendarDate,
    viewingDayjs,
    weekStart,
  ]);

  const monthLabel = useMemo((): string | null => {
    const parsed = dayjs.tz(monthLabelDate.format('YYYY-MM-DD'), timezoneName);
    return parsed.isValid()
      ? monthLabelFormatter.format(parsed.toDate())
      : null;
  }, [monthLabelDate, monthLabelFormatter, timezoneName]);

  const toggleViewMode = useCallback(() => {
    setIsMonthlyView((prev) => {
      const next = !prev;
      if (next) {
        // Expanding to month view: align viewingDate with the month label so
        // the rendered month matches what the header is showing.
        setViewingDate(monthLabelDate.format('YYYY-MM-DD'));
      } else {
        // Collapsing to week view: keep the selected date only when it belongs
        // to the current natural month; otherwise anchor the week at day 1.
        const selectedDateInViewingMonth =
          selectedDate &&
          parseCalendarDate(selectedDate).isSame(viewingDayjs, 'month');
        setViewingDate(
          selectedDateInViewingMonth
            ? selectedDate
            : monthStart.format('YYYY-MM-DD'),
        );
      }
      return next;
    });
  }, [
    monthLabelDate,
    monthStart,
    parseCalendarDate,
    selectedDate,
    viewingDayjs,
  ]);

  return (
    <div
      className="flex w-full flex-shrink-0 flex-col"
      data-sign="calendar-container"
    >
      <div className="flex flex-col">
        <div className="flex h-10 -my-2 mb-2 items-center justify-between">
          <span
            className="typography-subtitleBold text-neutral-b0"
            data-sign="month-label"
          >
            {monthLabel}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              title={t('today')}
              className="!typography-labelSemiBold !normal-case !rounded-full"
              data-sign="today-button"
              onClick={goToToday}
            >
              {t('today')}
            </Button>
            <IconButton
              onClick={goToPrevious}
              disabled={!canGoPrevious}
              data-sign="previous-button"
              symbol={CaretLeftMd}
              size="large"
              variant="icon"
              color="neutral"
              iconSize="medium"
              className="rounded-full hover:bg-neutral-b5 transition-colors text-neutral-b0"
            />
            <IconButton
              onClick={goToNext}
              disabled={!canGoNext}
              data-sign="next-button"
              symbol={CaretRightMd}
              size="large"
              variant="icon"
              color="neutral"
              iconSize="medium"
              className="rounded-full hover:bg-neutral-b5 transition-colors text-neutral-b0"
            />
          </div>
        </div>
        <div className="w-full flex-shrink-0 overflow-hidden">
          <div className="flex gap-2">
            {WEEK_DAY_LABELS.map((label, index) => (
              <div
                key={`week-day-label-${index}`}
                className="flex h-5 min-w-0 flex-1 items-center justify-center text-neutral-b2"
              >
                {t(label)}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 pt-2">
            {isMonthlyView ? (
              <>
                {monthGrid.rows.map((row, rowIndex) => (
                  <div
                    key={`month-row-${rowIndex}`}
                    className="flex gap-2 h-10"
                  >
                    {row.map((dayDate) => {
                      const isSelected = dayDate === displaySelectedDate;
                      const isDisabled = shouldDisableDateInternal(dayDate);
                      return (
                        <WeekCalendarDay
                          key={dayDate}
                          dayDate={dayDate}
                          timezoneId={timezoneId}
                          selected={isSelected}
                          disabled={isDisabled}
                          onClick={() => handleDateClick(dayDate)}
                        />
                      );
                    })}
                  </div>
                ))}
              </>
            ) : (
              <div className="flex gap-2 h-10">
                {weekDays.map((dayDate) => {
                  const isSelected = dayDate === displaySelectedDate;
                  const isDisabled = shouldDisableDateInternal(dayDate);
                  return (
                    <WeekCalendarDay
                      key={dayDate}
                      dayDate={dayDate}
                      timezoneId={timezoneId}
                      selected={isSelected}
                      disabled={isDisabled}
                      onClick={() => handleDateClick(dayDate)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="mt-3 flex justify-center py-0">
          <IconButton
            onClick={toggleViewMode}
            symbol={isMonthlyView ? CaretUpMd : CaretDownMd}
            variant="icon"
            color="secondary"
            size="large"
            data-sign="month-toggle"
            className="rounded-full transition-colors hover:bg-neutral-b5"
          />
        </div>
      </div>
    </div>
  );
};
