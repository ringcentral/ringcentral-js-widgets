import { whenStateOrTimerChange } from '@ringcentral-integration/core/test';
import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const ClickRemoveButton: StepFunction = async () => {
  await whenStateOrTimerChange(() => {
    const removeButton = screen.getByTestId('removeButton');
    removeButton.click();
  });
};
