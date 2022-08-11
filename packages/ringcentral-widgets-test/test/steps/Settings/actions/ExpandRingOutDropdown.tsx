import { fireEvent, screen, within } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const ExpandRingOutDropdown: StepFunction = async () => {
  const callingSettingElement = screen.getByTestId('dropdownSelect');
  const selectRoot = within(callingSettingElement).getByTestId('selectRoot');
  fireEvent.click(selectRoot);
};
