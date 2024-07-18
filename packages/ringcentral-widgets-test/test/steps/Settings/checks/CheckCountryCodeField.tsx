import { formatCountryDisplay } from '@ringcentral-integration/widgets/components/RegionSettingsPanel';
import { getNodeText, screen, waitFor } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

interface CheckCountryCodeFieldProps {
  countryCallingCode: string;
  countryName: string;
}

export const CheckCountryCodeField: StepFunction<
  CheckCountryCodeFieldProps
> = async ({ countryCallingCode, countryName }) => {
  // format target value
  const targetValue = formatCountryDisplay(countryCallingCode, countryName);

  await waitFor(() =>
    expect(getNodeText(screen.getByTestId('selectedItem'))).toBe(targetValue),
  );
};
