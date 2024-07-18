import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { StepFunction } from '../../../lib/step';
import { MockPutPresence } from '../../Mock';

interface SetPresenceStatusOptions {
  presence: 'available' | 'busy' | 'DND' | 'offline';
  shouldMockPutPresence?: boolean;
}

export const SetPresenceStatus: StepFunction<SetPresenceStatusOptions> = (
  { presence, shouldMockPutPresence = true },
  context,
) => {
  const element = screen.queryByTestId<HTMLDivElement>('statusToggleShow');
  expect(element).toBeInTheDocument();
  if (element) {
    // display container
    const container = element.parentElement!;
    if (!container.className.includes('showDropdown')) {
      userEvent.click(container);
    }
    // set status
    const statusIcon = container.querySelector(`[type="${presence}"]`);
    expect(statusIcon).toBeInTheDocument();
    if (statusIcon) {
      if (shouldMockPutPresence) {
        MockPutPresence({}, context);
      }
      userEvent.click(statusIcon.parentElement!);
    }
  }
};
