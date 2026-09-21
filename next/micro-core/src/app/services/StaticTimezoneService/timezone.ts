import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export const UTC_TIMEZONE_NAME = 'UTC';

export function normalizeTimezoneName(timezoneName?: string | null): string {
  if (!timezoneName || timezoneName === 'GMT' || timezoneName === 'UTC') {
    return UTC_TIMEZONE_NAME;
  }

  return timezoneName;
}

export function resolveTimezoneName(timezoneName?: string | null): string {
  const normalizedTimezoneName = normalizeTimezoneName(timezoneName);

  if (normalizedTimezoneName === UTC_TIMEZONE_NAME) {
    return UTC_TIMEZONE_NAME;
  }

  try {
    new Intl.DateTimeFormat('en-US', {
      timeZone: normalizedTimezoneName,
    });
    return normalizedTimezoneName;
  } catch {
    return UTC_TIMEZONE_NAME;
  }
}

export function convertUtcTimeToTimezone(
  timeString: string,
  timezoneName?: string | null,
): dayjs.Dayjs {
  return dayjs.utc(timeString).tz(resolveTimezoneName(timezoneName));
}

export function formatTimezoneOffsetMinutes(offsetMinutes: number): string {
  const offsetSign = offsetMinutes >= 0 ? '+' : '-';
  const absoluteOffsetMinutes = Math.abs(offsetMinutes);
  const offsetHours = Math.floor(absoluteOffsetMinutes / 60);
  const remainingMinutes = absoluteOffsetMinutes % 60;

  return `GMT${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(
    remainingMinutes,
  ).padStart(2, '0')}`;
}

export function getTimezoneOffsetMinutes(
  timezoneName?: string | null,
  referenceTime = dayjs().toISOString(),
): number {
  return convertUtcTimeToTimezone(referenceTime, timezoneName).utcOffset();
}

export function formatTimezoneGmtOffset(
  timezoneName?: string | null,
  referenceTime = dayjs().toISOString(),
): string {
  return formatTimezoneOffsetMinutes(
    getTimezoneOffsetMinutes(timezoneName, referenceTime),
  );
}
