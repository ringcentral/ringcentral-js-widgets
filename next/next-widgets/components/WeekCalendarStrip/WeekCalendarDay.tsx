import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { STATIC_TIMEZONE_LIST } from '@ringcentral-integration/micro-core/src/app/services/StaticTimezoneService';
import clsx from 'clsx';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, { useMemo } from 'react';

import { WeekCalendarDayProps } from './WeekCalendarStrip.interface';
import i18n from './i18n';

dayjs.extend(utc);
dayjs.extend(timezone);

export const WeekCalendarDay: React.FC<WeekCalendarDayProps> = ({
  dayDate,
  selected = false,
  disabled = false,
  onClick,
  timezoneId,
}) => {
  const { currentLocale } = useLocale(i18n);

  const date = useMemo(() => {
    const d = dayjs(dayDate);
    return currentLocale ? d.locale(currentLocale) : d;
  }, [dayDate, currentLocale]);

  const dateText = useMemo(() => date.format('D'), [date]);
  const timezoneName = useMemo(() => {
    const timezoneInfo = STATIC_TIMEZONE_LIST.find(
      (tz) => tz.id === timezoneId,
    );
    return timezoneInfo?.name || 'GMT';
  }, [timezoneId]);
  const isToday = useMemo(() => {
    const todayInTimezone = dayjs
      .tz(dayjs(), timezoneName)
      .format('YYYY-MM-DD');
    return dayDate === todayInTimezone;
  }, [dayDate, timezoneName]);
  const todayNotSelected = isToday && !selected;

  return (
    <div className="flex-1 flex items-center justify-center">
      <button
        role="option"
        disabled={disabled}
        onClick={onClick}
        data-sign={`date-button-${dateText}`}
        data-date={dayDate}
        aria-selected={selected ? 'true' : 'false'}
        className={clsx(
          // Base styles
          'relative flex h-10 w-full max-w-[48px] items-center justify-center rounded-[10px] transition-all',
          // Default(Enabled) state
          !disabled &&
            !selected &&
            'cursor-pointer text-neutral-b0 hover:bg-neutral-b5',
          // Selected state
          selected &&
            'cursor-pointer bg-primary-b text-neutral-high-contrast-b0',
          // Disabled state
          disabled && 'cursor-default text-neutral-b3',
          // today(not selected) state
          todayNotSelected && 'border border-solid border-neutral-b2',
        )}
      >
        {dateText}
      </button>
    </div>
  );
};
