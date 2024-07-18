import { screen, within } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckRingtoneSection: StepFunction<{
  selectedItem: string;
  isEnabled: boolean;
}> = async ({ isEnabled, selectedItem }) => {
  const outputDeviceSection = screen.getByTestId('outputDeviceSection');
  expect(
    within(outputDeviceSection).getByText('Ringtone and notification source'),
  ).toBeInTheDocument();

  const dropdown = screen.getByTestId('ringtoneDeviceSelect');

  if (isEnabled) {
    expect(dropdown).not.toHaveClass('Mui-disabled');
  } else {
    expect(dropdown).toHaveClass('Mui-disabled');
  }

  expect(within(dropdown).getByText(selectedItem)).toBeInTheDocument();
};
