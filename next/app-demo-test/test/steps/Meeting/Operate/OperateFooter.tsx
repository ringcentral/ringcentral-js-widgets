import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const ClickRemoveButton: StepFunction = async () => {
  await whenStateOrTimerChange(() => {
    const removeButton = screen.getByTestId('removeButton');
    removeButton.click();
  });
};
