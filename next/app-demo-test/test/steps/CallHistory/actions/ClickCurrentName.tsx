import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

/**
 * Click the first item in active call list
 */
export const ClickCurrentName: StepFunction = () => {
  screen.getByTestId('currentName').click();
};
