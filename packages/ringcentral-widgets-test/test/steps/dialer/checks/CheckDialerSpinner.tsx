import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckDialerShowSpinner: StepFunction = () => {
  expect(screen.getByTestId('spinnerOverlay')).not.toBeNull();
};

export const CheckDialerNotShowSpinner: StepFunction = () => {
  expect(screen.queryByTestId('spinnerOverlay')).toBeNull();
};
