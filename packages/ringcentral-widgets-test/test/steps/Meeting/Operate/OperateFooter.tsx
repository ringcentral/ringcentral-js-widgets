import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const ClickRemoveButton: StepFunction = async () => {
  const removeButton = screen.getByTestId('removeButton');
  removeButton.click();
};
