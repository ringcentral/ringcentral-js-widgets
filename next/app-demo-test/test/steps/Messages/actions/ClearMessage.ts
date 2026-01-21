import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { runInFakeTimer } from '../../../lib/runInFakeTimer';

export const ClearMessage: StepFunction = async () => {
  await runInFakeTimer(async () => {
    userEvent.clear(screen.getByTestId('messageInput'));
    console.log('debug:', screen.getByTestId('messageInput').textContent);
    await waitForRenderReady();
    jest.runOnlyPendingTimers();
  });
  await whenStateChange(() => {
    expect(screen.getByTestId('messageButton')).toBeDisabled();
  });
};
