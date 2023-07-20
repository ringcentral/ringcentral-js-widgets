import { screen } from '@testing-library/react';
import type { StepFunction } from '../../../lib/step';

interface CheckAllActionButtonsStatusWhenOfflineProps {
  actionButtons: string[];
}

export const CheckAllActionButtonsStatusWhenOffline: StepFunction<CheckAllActionButtonsStatusWhenOfflineProps> =
  async ({ actionButtons }) => {
    actionButtons.forEach((item) => {
      if (item === 'download') {
        expect(screen.getByTestId(item).className).toContain('disabled');
      } else {
        expect(screen.getByTestId(item)).toHaveAttribute(
          'aria-disabled',
          'true',
        );
      }
    });
  };
