import { StepFunction } from '@ringcentral-integration/test-utils';
import { screen, waitFor } from '@testing-library/react';

interface CheckIsAddCallPageParams {
  inPage?: boolean;
}

export const CheckIsAddCallPage: StepFunction<
  CheckIsAddCallPageParams
> = async ({ inPage }) => {
  await waitFor(() => {
    const container = screen.queryByTestId('addCallPage');
    if (inPage) {
      expect(container).toBeInTheDocument();
    } else {
      expect(container).not.toBeTruthy();
    }
  });
};
