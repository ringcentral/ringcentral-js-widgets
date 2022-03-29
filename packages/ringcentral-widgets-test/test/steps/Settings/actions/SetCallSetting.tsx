import { fireEvent, screen, within } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const ExpandDropdown: StepFunction = async () => {
  fireEvent.click(screen.getByTestId('callingSetting'));
};

export const SelectCallingSetting: StepFunction<{ settingName: string }> = ({
  settingName,
}) => {
  const menuItem = within(screen.getByRole('menu')).getByText(settingName);
  fireEvent.click(menuItem);
  expect(screen.getByTestId('callingSetting')).toHaveTextContent(settingName);
};

export const ClickSaveButton: StepFunction = () => {
  fireEvent.click(screen.getByText('Save'));
};
