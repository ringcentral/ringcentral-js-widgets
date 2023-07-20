import { getNodeText, screen, waitFor } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckCountryCodeField: StepFunction<{ countryCode: string }> =
  async ({ countryCode }) => {
    await waitFor(() =>
      expect(getNodeText(screen.getByTestId('selectedItem'))).toBe(countryCode),
    );
  };
