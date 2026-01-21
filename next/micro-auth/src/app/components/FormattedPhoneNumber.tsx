import { useContainer } from '@ringcentral-integration/next-core';
import React, { FunctionComponent, useMemo } from 'react';

import type { NumberFormatter } from '../services';

export const useFormattedPhoneNumberFn = () => {
  const numberFormatter = useContainer<NumberFormatter>('NumberFormatter');

  return useMemo(
    () => numberFormatter.formatNumber.bind(numberFormatter),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      numberFormatter,
      // when formattingParams changed, we need to reformat the phone number
      numberFormatter.formattingParams,
    ],
  );
};

export const useFormattedPhoneNumber = (
  phoneNumber?: string | undefined | null,
) => {
  const numberFormatter = useFormattedPhoneNumberFn();

  return useMemo(() => {
    return typeof phoneNumber === 'string'
      ? numberFormatter(phoneNumber)
      : undefined;
  }, [numberFormatter, phoneNumber]);
};

/**
 * use NumberFormatter to format phone number, that will inject DI, so only work inside reactant DI environment
 */
export const FormattedPhoneNumber: FunctionComponent<{
  phoneNumber: string | null | undefined;
}> = ({ phoneNumber }) => {
  const formattedNumber = useFormattedPhoneNumber(phoneNumber);

  return <>{formattedNumber}</>;
};
