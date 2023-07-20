import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen, waitFor } from '@testing-library/react';

interface ICheckNavigationBarItemProps {
  item: 'DialPad' | 'History' | 'Messages' | 'More Menu';
  isExist: boolean;
}

export const CheckNavigationBarItem: StepFunction<ICheckNavigationBarItemProps> =
  async ({ item, isExist }) => {
    await waitFor(() => {
      const ItemComp = screen.queryByTestId(item);

      if (isExist) {
        expect(ItemComp).toBeInTheDocument();
      } else {
        expect(ItemComp).not.toBeInTheDocument();
      }
    });
  };
