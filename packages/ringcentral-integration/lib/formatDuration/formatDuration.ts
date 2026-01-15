import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

type DurationInput = number | string | null | undefined;

const getDuration = (duration: DurationInput) => {
  if (duration === null || duration === undefined || Number.isNaN(duration)) {
    return null;
  }

  const dur = dayjs.duration(
    typeof duration === 'number' ? duration : parseInt(duration, 10),
    'seconds',
  );

  return dur;
};

/**
 * format duration to string, 'hh:mm:ss'
 *
 * if duration is NaN or undefined, return '--:--'
 *
 * when you need to format duration with locale, try use `formatDurationWithLocale` instead
 */
export function formatDuration(
  duration: DurationInput,
  invalidDisplay = '--:--',
) {
  const dur = getDuration(duration);

  if (!dur) return invalidDisplay;

  const hours = dur.hours();
  const minutes = dur.minutes();
  const seconds = dur.seconds();

  const hourString = hours > 0 ? `${hours.toString().padStart(2, '0')}:` : '';
  const minuteString = minutes.toString().padStart(2, '0');
  const secondString = seconds.toString().padStart(2, '0');
  return `${hourString}${minuteString}:${secondString}`;
}

type LocaleMessages = {
  day: string;
  hr: string;
  min: string;
  sec: string;
};

/**
 * Formats a duration provided in seconds into a localized string representation.
 *
 * Trailing zero units are omitted from the output.
 *
 * like `1 hr 2 min 5 secs`
 *
 * @param duration - The duration in seconds. Can be null or undefined.
 * @returns A formatted duration string based on the provided duration and locale.
 *
 * @example
 * formatDurationWithLocale(3725, {
 *   day: 'days',
 *   hr: 'hr',
 *   min: 'min',
 *   sec: 'secs'
 * })
 * - // Returns: "1 hr 2 min 5 secs"
 *
 * @example
 * formatDurationWithLocale(3720, {
 *   day: 'days',
 *   hr: 'hr',
 *   min: 'min',
 *   sec: 'secs'
 * })
 * - // Returns: "1 hr 2 min" (trailing 0 secs omitted)
 */
export const formatDurationWithLocale = (
  /**
   * duration in seconds
   */
  duration: DurationInput,
  /**
   * locale text for render
   */
  { day, hr, min, sec }: LocaleMessages,
) => {
  const dur = getDuration(duration);

  if (!dur) return '';

  const totalDays = Math.floor(dur.asDays());
  const hours = dur.hours();
  const minutes = dur.minutes();
  const seconds = dur.seconds();

  const parts: string[] = [];

  if (totalDays > 0) {
    parts.push(`${totalDays} ${day}`);
  }
  if (hours > 0) {
    parts.push(`${hours} ${hr}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} ${min}`);
  }
  if (seconds > 0) {
    parts.push(`${seconds} ${sec}`);
  }

  return parts.join(' ');
};
