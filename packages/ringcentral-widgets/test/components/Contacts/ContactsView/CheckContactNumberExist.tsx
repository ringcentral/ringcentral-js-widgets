import { screen } from '@testing-library/react';

import { formatContactPhoneNumber } from '../../../../modules/ContactDetailsUI';
import type { StepFunction } from '../../../lib/step';

export const CheckContactNumberExist: StepFunction<
  { number: string },
  { phone: any }
> = ({ number }, { phone }) => {
  const formatNumber = formatContactPhoneNumber(
    number,
    phone.regionSettings.countryCode,
    phone.extensionInfo.isMultipleSiteEnabled,
    phone.extensionInfo.site?.code,
  );
  const numberItem = screen.queryByTitle(formatNumber);
  expect(numberItem).toBeInTheDocument();
};
