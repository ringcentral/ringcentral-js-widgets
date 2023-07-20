import {
  screen,
  waitFor,
} from '@testing-library/react';
import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import type { StepFunction } from '../../../lib/step';

export const CheckVoipOnlyBadge: StepFunction<{
  show?: boolean;
}> = async ({ show = true }) => {
  jest.useFakeTimers();
  jest.advanceTimersByTime(1000);
  await waitForRenderReady();
  jest.useRealTimers();
  if (show) {
    await waitFor(
      () => {
        const badge = screen.queryByText('VoIP Only');
        expect(badge).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  } else {
    await waitFor(
      () => {
        const badge = screen.queryByText('VoIP Only');
        expect(badge).not.toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  }
};
