import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type {
  BaseContext,
  StepFunction,
} from '@ringcentral-integration/test-utils';

interface CheckFlagButtonTitleProps {
  isRead: boolean;
}

export const CheckFlagButtonTitle: StepFunction<
  CheckFlagButtonTitleProps,
  BaseContext
> = async ({ isRead }, _) => {
  await whenStateChange(async () => {
    const flagButton = document.querySelector(
      "[data-sign='mark'] span",
    ) as HTMLElement;
    isRead
      ? expect(flagButton.title).toBe('Mark as Unread')
      : expect(flagButton.title).toBe('Mark as Read');
  });
};
