import { formatDuration } from '@ringcentral-integration/commons/lib/formatDuration';
import { useContainer } from '@ringcentral-integration/next-core';
import React, { FunctionComponent, useMemo } from 'react';

import type { DateTimeFormat, FormatDateTimeOptions } from '../services';

export const useFormattedDateTime = (
  options: Partial<FormatDateTimeOptions> = {},
) => {
  const dateTimeFormat = useContainer<DateTimeFormat>('DateTimeFormat');

  return useMemo(
    () => options && dateTimeFormat.formatDateTime(options),
    /* eslint-disable react-hooks/exhaustive-deps */
    [
      dateTimeFormat,
      // only compare values
      Object.values(options),
      // also listen to locale change
      dateTimeFormat['_locale'].locale,
    ],
  );
};

/**
 * use `FormattedDateTime` to format date time, that will inject DI, so only work inside reactant DI environment
 */
export const FormattedDateTime: FunctionComponent<
  Partial<FormatDateTimeOptions>
> = (props) => {
  const formattedDateTime = useFormattedDateTime(props);

  return <>{formattedDateTime}</>;
};

export const useFormatDuration = (
  duration: number | undefined,
  invalidDisplay?: string,
) => {
  return useMemo(
    () => formatDuration(duration, invalidDisplay),
    [duration, invalidDisplay],
  );
};
