import { screen, waitFor } from '@testing-library/react';
import { waitForRenderReady } from '@ringcentral-integration/test-utils/lib/test-utils';
import { StepFunction } from '../../../lib/step';

export const CheckVoipOnlyBadge: StepFunction = async () => {
  jest.useFakeTimers();
  jest.advanceTimersByTime(1000);
  await waitForRenderReady();
  jest.useRealTimers();
  await waitFor(
    () => {
      const badge = screen.queryByText('VoIP Only');
      expect(badge).toBeInTheDocument();
    },
    { timeout: 3000 },
  );
};
