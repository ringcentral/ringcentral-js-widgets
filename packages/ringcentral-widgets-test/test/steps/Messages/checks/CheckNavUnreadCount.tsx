import { BaseContext, StepFunction } from '@ringcentral-integration/test-utils';
import { screen, waitFor } from '@testing-library/react';

interface CheckNavUnreadCountProps {
  count: string;
}

export const CheckNavUnreadCount: StepFunction<
  CheckNavUnreadCountProps,
  BaseContext
> = async ({ count }, _) => {
  await waitFor(async () => {
    const navCount = screen.queryByTestId('navigationNoticeCount');
    count === '0'
      ? expect(navCount).toBeNull()
      : expect(navCount?.textContent).toBe(count);
  });
};
