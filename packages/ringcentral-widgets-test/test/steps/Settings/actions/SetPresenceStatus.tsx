import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockPutPresence } from '../../Mock';
import type { StepFunction } from '../../../lib/step';

interface SetPresenceStatusOptions {
  presence: 'available' | 'busy' | 'DND' | 'offline';
}

export const SetPresenceStatus: StepFunction<SetPresenceStatusOptions> = (
  { presence },
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
      MockPutPresence({}, context);
      userEvent.click(statusIcon.parentElement!);
    }
  }
};
