import { fireEvent, screen, within } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const ExpandDropdown: StepFunction = async () => {
  const callingSettingElement = screen.getByTestId('callingSetting');
  const selectRoot = within(callingSettingElement).getByTestId('selectRoot');
  fireEvent.click(selectRoot);
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
