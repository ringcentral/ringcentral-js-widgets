import { fireEvent, screen, waitFor } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const NavigateToRegionSettings: StepFunction = async () => {
  expect(screen.getByText('Region')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Region'));
  await waitFor(() => expect(screen.getByText('Country')).toBeInTheDocument());
};
