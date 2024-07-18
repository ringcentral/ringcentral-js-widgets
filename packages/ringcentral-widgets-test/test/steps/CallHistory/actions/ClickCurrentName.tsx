import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

/**
 * Click the first item in active call list
 */
export const ClickCurrentName: StepFunction = () => {
  screen.getByTestId('currentName').click();
};
