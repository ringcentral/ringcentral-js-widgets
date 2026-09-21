import {
  AvailabilityMonitor,
  ConnectivityManager,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  jestFakeTimersAreEnabled,
  userEvent,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

import { MockPutPresence } from '../../Mock';

interface SetPresenceStatusOptions {
  presence: 'available' | 'busy' | 'DND' | 'offline';
  shouldMockPutPresence?: boolean;
}

async function clickAndFlush(element: HTMLElement) {
  const user = jestFakeTimersAreEnabled()
    ? userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    : userEvent;

  await user.click(element);
  await waitForRenderReady();
}

export const SetPresenceStatus: StepFunction<SetPresenceStatusOptions> = async (
  { presence, shouldMockPutPresence = true },
  context,
) => {
  let element: HTMLDivElement;
  try {
    element = await whenStateOrTimerChange(() => {
      const element = screen.queryByTestId<HTMLDivElement>('statusToggleShow');
      expect(element).toBeInTheDocument();
      return element!;
    });
  } catch (error) {
    const dataSigns = Array.from(document.body.querySelectorAll('[data-sign]'))
      .map((item) => item.getAttribute('data-sign'))
      .filter(Boolean);
    throw new Error(
      `statusToggleShow was not rendered. data-signs: ${dataSigns.join(', ')}`,
    );
  }

  // display container
  const container = element.parentElement!;
  if (!container.className.includes('showDropdown')) {
    await clickAndFlush(container);
  }

  // set status
  const statusIcon = await whenStateOrTimerChange(() => {
    const statusIcon = container.querySelector(`[type="${presence}"]`);
    expect(statusIcon).toBeInTheDocument();
    return statusIcon!;
  });

  if (shouldMockPutPresence) {
    MockPutPresence({}, context);
  }
  await clickAndFlush(statusIcon.parentElement!);

  if (!shouldMockPutPresence) {
    const availabilityMonitor = context.app.container.got(AvailabilityMonitor);
    const connectivityManager = context.app.container.got(ConnectivityManager);
    await whenStateOrTimerChange(() => {
      expect(availabilityMonitor?.isLimitedMode).toBe(true);
      expect(connectivityManager?.ready).toBe(true);
      expect(connectivityManager?.mode).toBe('survival');
    });
    if (jestFakeTimersAreEnabled()) {
      jest.advanceTimersByTime(1000);
    }
    await waitForRenderReady();
  }
};
