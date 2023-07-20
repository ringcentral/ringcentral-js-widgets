import { screen, waitFor } from '@testing-library/react';
import type { StepFunction } from '../../../../lib/step';

export const CheckSmallControlControlPanel: StepFunction<{
  isExist: boolean;
}> = async ({ isExist }) => {
  await waitFor(async () => {
    if (isExist) {
      expect(screen.getByTestId('smallCallControl')).toBeInTheDocument();
    } else {
      expect(
        await screen.queryByTestId('smallCallControl'),
      ).not.toBeInTheDocument();
    }
  });
};
