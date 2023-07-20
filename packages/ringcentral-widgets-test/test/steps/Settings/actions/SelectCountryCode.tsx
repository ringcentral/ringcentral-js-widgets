import { queryByText, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { StepFunction } from '../../../lib/step';

interface SelectCountryCodeInt {
  countryCode: string;
}

export const SelectCountryCode: StepFunction<SelectCountryCodeInt> = async ({
  countryCode,
}) => {
  userEvent.click(screen.queryByTestId('selectedItem'));
  await waitFor(() => expect(screen.queryByRole('menu')).toBeInTheDocument());
  userEvent.click(queryByText(screen.queryByRole('menu'), countryCode));
  await waitFor(() =>
    expect(screen.queryByRole('menu')).not.toBeInTheDocument(),
  );
};
