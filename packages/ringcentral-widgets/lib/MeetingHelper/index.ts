import formatMessage from 'format-message';
import { reduce } from 'ramda';
import i18n from '../../components/MeetingConfigsV2/i18n';

export const MINUTE_SCALE: number = 4;
export const HOUR_SCALE: number = 13;

export function getMinutesList(MINUTE_SCALE: number, currentLocale: string) {
  return reduce(
    (result) => {
      const index = result.length;
      const value = (60 / MINUTE_SCALE) * index;
      const text = formatMessage(i18n.getString('minutes', currentLocale), {
        howMany: `${value}0`.slice(0, 2),
      });
      return result.concat({
        value,
        text,
      });
    },
    [],
    new Array(MINUTE_SCALE),
  );
}

export function getHoursList(HOUR_SCALE: number, currentLocale: string) {
  if (HOUR_SCALE > 23) {
    throw new Error('HOUR_SCALE must be less than 23.');
  }
  return reduce(
    (result) => {
      const value = result.length;
      const text = formatMessage(i18n.getString('hours', currentLocale), {
        howMany: `0${value}0`.slice(-3, -1),
      });
      return result.concat({
        value,
        text,
      });
    },
    [],
    new Array(HOUR_SCALE),
  );
}
