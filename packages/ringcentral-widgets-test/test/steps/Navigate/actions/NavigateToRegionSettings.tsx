import { fireEvent, screen, waitFor } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

interface NavigateToRegionSettingsProps {
  checkCountryField?: boolean;
}

export const NavigateToRegionSettings: StepFunction<
  NavigateToRegionSettingsProps
> = async ({ checkCountryField = true }) => {
  const region = screen.queryByTestId('region');
  expect(region).toBeInTheDocument();
  fireEvent.click(region!);

  if (checkCountryField) {
    await waitFor(() => {
      expect(screen.getByText('Country')).toBeInTheDocument();
    });
  }
};
