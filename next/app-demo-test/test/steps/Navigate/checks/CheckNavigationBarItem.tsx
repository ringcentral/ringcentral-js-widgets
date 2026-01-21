import { whenStateChange } from '@ringcentral-integration/next-core/test';
import { screen, StepFunction } from '@ringcentral-integration/test-utils';

interface ICheckNavigationBarItemProps {
  dataSign: 'dialerTab' | 'historyTab' | 'messagesTab' | 'moreMenu';
  isExist: boolean;
}

export const CheckNavigationBarItem: StepFunction<
  ICheckNavigationBarItemProps
> = async ({ dataSign, isExist }) => {
  await whenStateChange(() => {
    const ItemComp = screen.queryByTestId(dataSign);

    if (isExist) {
      expect(ItemComp).toBeInTheDocument();
    } else {
      expect(ItemComp).not.toBeInTheDocument();
    }
  });
};
