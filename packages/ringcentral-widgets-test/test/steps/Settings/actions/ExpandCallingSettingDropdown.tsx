import { fireEvent, screen, within } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

/**
 * Expand the calling options dropdown list
 */
export const ExpandCallingSettingDropdown: StepFunction = () => {
  const callingSettingElement = screen.getByTestId('callingSetting');
  const selectRoot = within(callingSettingElement).getByTestId('selectRoot');
  fireEvent.click(selectRoot);
};
