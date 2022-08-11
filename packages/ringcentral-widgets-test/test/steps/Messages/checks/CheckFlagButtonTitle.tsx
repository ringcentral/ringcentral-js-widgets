import { BaseContext, StepFunction } from '@ringcentral-integration/test-utils';
import { waitFor } from '@testing-library/react';

interface CheckFlagButtonTitleProps {
  isRead: boolean;
}

export const CheckFlagButtonTitle: StepFunction<
  CheckFlagButtonTitleProps,
  BaseContext
> = async ({ isRead }, _) => {
  await waitFor(async () => {
    const flagButton = document.querySelector(
      "[data-sign='mark'] span",
    ) as HTMLElement;
    isRead
      ? expect(flagButton.title).toBe('Mark as Unread')
      : expect(flagButton.title).toBe('Mark as Read');
  });
};
