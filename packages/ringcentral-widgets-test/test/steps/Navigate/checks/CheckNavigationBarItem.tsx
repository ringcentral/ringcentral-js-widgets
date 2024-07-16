import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen, waitFor } from '@testing-library/react';

interface ICheckNavigationBarItemProps {
  dataSign: 'dialerTab' | 'historyTab' | 'messagesTab' | 'moreMenu';
  isExist: boolean;
}

export const CheckNavigationBarItem: StepFunction<
  ICheckNavigationBarItemProps
> = async ({ dataSign, isExist }) => {
  await waitFor(() => {
    const item = screen.queryByTestId(dataSign);
    if (isExist) {
      expect(item).toBeInTheDocument();
    } else {
      expect(item).not.toBeInTheDocument();
    }
  });
};
