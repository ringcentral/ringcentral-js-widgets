import { fireEvent, screen, within } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const MarkOnPMIAndEdit: StepFunction<{
  dataSign?: string;
}> = async ({ dataSign = 'usePersonalMeetingId' }) => {
  const checkbox = screen.getByTestId(dataSign).querySelector('input')!;
  if (!checkbox.checked) {
    checkbox.click();
  }

  // For New Scheduler UI
  const pmiField = screen.queryByTestId('personalMeetingField');

  if (pmiField) {
    fireEvent.click(within(pmiField).getByText('Edit settings'));
  }
};
