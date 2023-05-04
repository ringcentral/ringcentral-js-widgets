import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { StepFunction } from '../lib/step';

export const WaitForSpinner: StepFunction = async () => {
  if (screen.queryByTestId('spinnerOverlay')) {
    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('spinnerOverlay'),
    );
  }
};
