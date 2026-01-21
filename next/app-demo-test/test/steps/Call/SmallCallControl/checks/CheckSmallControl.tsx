import { whenStateChange } from '@ringcentral-integration/next-core/test';
import { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckSmallControlControlPanel: StepFunction<{
  isExist: boolean;
}> = async ({ isExist }) => {
  await whenStateChange(async () => {
    if (isExist) {
      expect(screen.getByTestId('smallCallControl')).toBeInTheDocument();
    } else {
      expect(
        await screen.queryByTestId('smallCallControl'),
      ).not.toBeInTheDocument();
    }
  });
};
