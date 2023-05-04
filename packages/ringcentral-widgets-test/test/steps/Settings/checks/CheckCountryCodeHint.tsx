import { screen, waitFor } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const CheckCountryCodeHint: StepFunction<{ hint: string }> = async ({
  hint,
}) => {
  await waitFor(() =>
    expect(screen.getByTestId('countryCodeHint')).toHaveTextContent(hint),
  );
};
