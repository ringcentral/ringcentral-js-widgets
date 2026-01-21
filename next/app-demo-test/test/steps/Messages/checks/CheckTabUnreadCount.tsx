import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type {
  BaseContext,
  StepFunction,
} from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckTabUnreadCountProps {
  count: string;
  tab: string;
}

export const CheckTabUnreadCount: StepFunction<
  CheckTabUnreadCountProps,
  BaseContext
> = async ({ count, tab }, _) => {
  await whenStateChange(async () => {
    const tabCount = screen
      .getByTestId(tab)
      .querySelector('[data-sign=noticeCounts]');
    count === '0'
      ? expect(tabCount).toBeNull()
      : expect(tabCount?.textContent).toBe(count);
  });
};
