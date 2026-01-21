import { screen, within } from '@ringcentral-integration/test-utils';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const CheckOutputSection: StepFunction<{
  selectedItem: string;
  isEnabled: boolean;
}> = async ({ isEnabled, selectedItem }) => {
  const outputDeviceSection = screen.getByTestId('outputDeviceSection');
  expect(within(outputDeviceSection).getByText('Output')).toBeInTheDocument();
  expect(
    within(outputDeviceSection).getByText('Speaker source'),
  ).toBeInTheDocument();

  const outputSourceDropdown = screen.getByTestId('speakerDeviceSelect');

  if (isEnabled) {
    expect(outputSourceDropdown).not.toHaveClass('Mui-disabled');
  } else {
    expect(outputSourceDropdown).toHaveClass('Mui-disabled');
  }

  expect(
    within(outputSourceDropdown).getByText(selectedItem),
  ).toBeInTheDocument();
};
