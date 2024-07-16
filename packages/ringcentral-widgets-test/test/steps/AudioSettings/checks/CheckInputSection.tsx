import { screen, within } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckInputSection: StepFunction<{
  selectedItem?: string;
  isEnabled: boolean;
}> = async ({ isEnabled, selectedItem }) => {
  const inputDeviceSection = screen.getByTestId('inputDeviceSection');
  expect(within(inputDeviceSection).getByText('Input')).toBeInTheDocument();
  expect(
    within(inputDeviceSection).getByText('Microphone'),
  ).toBeInTheDocument();

  const inputSourceDropdown = screen.getByTestId('microphoneDeviceSelect');

  if (isEnabled) {
    expect(inputSourceDropdown).not.toHaveClass('Mui-disabled');
  } else {
    expect(inputSourceDropdown).toHaveClass('Mui-disabled');
  }

  if (selectedItem) {
    expect(
      within(inputSourceDropdown).getByText(selectedItem),
    ).toBeInTheDocument();
  }
};
