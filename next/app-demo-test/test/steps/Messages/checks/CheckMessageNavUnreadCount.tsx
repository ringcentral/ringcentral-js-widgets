import type {
  BaseContext,
  StepFunction,
} from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckMessageNavUnreadCountProps {
  count: string;
}

export const CheckMessageNavUnreadCount: StepFunction<
  CheckMessageNavUnreadCountProps,
  BaseContext
> = async ({ count }, _) => {
  const navCountBadge = screen
    .getByTestId('messagesTab')
    .querySelector('.RcBadge-badge');
  if (navCountBadge) {
    expect(navCountBadge).toHaveTextContent(count);
    if (count === '0') {
      expect(navCountBadge).toHaveClass('RcBadge-invisible');
    }
    return;
  }
  if (count === '0') {
    expect(screen.queryByTestId('navigationNoticeCount')).toBeNull();
    return;
  }
  expect(screen.getByTestId('navigationNoticeCount')).toHaveTextContent(count);
};
