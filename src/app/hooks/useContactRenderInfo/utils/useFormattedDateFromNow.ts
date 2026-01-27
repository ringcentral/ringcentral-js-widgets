import { formatDateFromNow } from '@ringcentral-integration/commons/lib/formatDuration';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { useMemo } from 'react';

import i18n from '../i18n';

export function useFormattedDateFromNow(
  dateTime: number | undefined | null,
  /**
   * how to display the startTime
   *
   * @default 'withTime'
   */
  timePresentationMode: 'withoutTime' | 'withTime' = 'withTime',
) {
  const formattedDateFromNow = useFormattedDateFromNowFn();

  return useMemo(
    () => formattedDateFromNow(dateTime, timePresentationMode),
    [formattedDateFromNow, dateTime, timePresentationMode],
  );
}

export function useFormattedDateFromNowFn() {
  const { t } = useLocale(i18n);

  return (
    dateTime: number | undefined | null,
    timePresentationMode: 'withoutTime' | 'withTime' = 'withTime',
  ) => {
    return formatDateFromNow(dateTime, {
      yesterday: t('yesterday'),
      timePresentationMode,
    });
  };
}
