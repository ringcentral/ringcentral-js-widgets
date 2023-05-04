import { BaseContext, StepFunction } from '@ringcentral-integration/test-utils';
import { screen, waitFor } from '@testing-library/react';

interface CheckTabUnreadCountProps {
  count: string;
  tab: string;
}

export const CheckTabUnreadCount: StepFunction<
  CheckTabUnreadCountProps,
  BaseContext
> = async ({ count, tab }, _) => {
  await waitFor(async () => {
    const tabCount = screen
      .getByTestId(tab)
      .querySelector('[data-sign=noticeCounts]');
    count === '0'
      ? expect(tabCount).toBeNull()
      : expect(tabCount?.textContent).toBe(count);
  });
};
