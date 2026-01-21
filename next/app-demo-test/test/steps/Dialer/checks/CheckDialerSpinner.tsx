import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckDialerShowSpinner: StepFunction = () => {
  expect(screen.getByTestId('spinnerOverlay')).not.toBeNull();
};

export const CheckDialerNotShowSpinner: StepFunction = () => {
  expect(screen.queryByTestId('spinnerOverlay')).toBeNull();
};
