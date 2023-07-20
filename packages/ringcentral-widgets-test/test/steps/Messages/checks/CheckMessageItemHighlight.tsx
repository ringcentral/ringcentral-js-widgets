import type {
  BaseContext,
  StepFunction,
} from '@ringcentral-integration/test-utils';
import { waitFor } from '@testing-library/react';

interface CheckMessageItemHighlightProps {
  isHighlight: boolean;
  messageType: string;
}

export const CheckMessageItemHighlight: StepFunction<
  CheckMessageItemHighlightProps,
  BaseContext
> = async ({ isHighlight, messageType }, _) => {
  await waitFor(async () => {
    const messageItem = document.querySelector(
      `[data-sign=${messageType}MessageItem] > div`,
    );
    isHighlight
      ? expect(messageItem?.className).toContain('unread')
      : expect(messageItem?.className).not.toContain('unread');
  });
};
