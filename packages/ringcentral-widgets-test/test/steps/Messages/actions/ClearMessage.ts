import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { runInFakeTimer } from '../../../lib/runInFakeTimer';
import type { StepFunction } from '../../../lib/step';

export const ClearMessage: StepFunction = async () => {
  await runInFakeTimer(async () => {
    userEvent.clear(screen.getByTestId('messageInput'));
    console.log('debug:', screen.getByTestId('messageInput').textContent);
    await waitForRenderReady();
    jest.runOnlyPendingTimers();
  });
  await waitFor(() => {
    expect(screen.getByTestId('messageButton')).toBeDisabled();
  });
};
