import { fireEvent, screen, within } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

interface SelectCallingSettingProps {
  settingName: string;
}

/**
 * Select the specified calling option
 * @param settingName Option name to select
 */
export const SelectCallingSetting: StepFunction<SelectCallingSettingProps> = ({
  settingName,
}) => {
  const menuItem = within(screen.getByRole('menu')).getByText(settingName);
  fireEvent.click(menuItem);
  expect(screen.getByTestId('callingSetting')).toHaveTextContent(settingName);
};
