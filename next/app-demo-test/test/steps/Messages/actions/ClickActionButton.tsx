import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  type StepFunction,
  userEvent,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface ClickActionButtonProps {
  testId: string;
}

export const ClickActionButton: StepFunction<ClickActionButtonProps> = async ({
  testId,
}) => {
  const actionButton = await whenStateChange(() => {
    const actionButton = screen.getByTestId(testId);
    if (actionButton.getAttribute('aria-disabled')) {
      expect(actionButton).toHaveAttribute('aria-disabled', 'false');
    }
    return actionButton;
  });

  await userEvent.click(actionButton);
  await waitForRenderReady();
};
