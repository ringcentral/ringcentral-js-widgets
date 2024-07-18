import { whenStateOrTimerChange } from '@ringcentral-integration/core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const WaitForSpinner: StepFunction = async () => {
  if (screen.queryByTestId('spinnerOverlay')) {
    await whenStateOrTimerChange(() => {
      const overlay = screen.queryByTestId('spinnerOverlay');
      expect(overlay).not.toBeInTheDocument();
    });
  }
};
