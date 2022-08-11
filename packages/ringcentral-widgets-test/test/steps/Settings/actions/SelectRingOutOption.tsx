import { fireEvent, screen, within } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const SelectRingOutOption: StepFunction<{ settingName: string }> = ({
  settingName,
}) => {
  const menuItem = within(screen.getByRole('menu')).getByText(settingName);
  fireEvent.click(menuItem);
};
