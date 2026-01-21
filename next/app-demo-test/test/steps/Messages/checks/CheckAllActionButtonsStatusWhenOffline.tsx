import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckAllActionButtonsStatusWhenOfflineProps {
  actionButtons: string[];
}

export const CheckAllActionButtonsStatusWhenOffline: StepFunction<
  CheckAllActionButtonsStatusWhenOfflineProps
> = async ({ actionButtons }) => {
  actionButtons.forEach((item) => {
    expect(screen.getByTestId(item).className).toContain('disabled');
  });
};
