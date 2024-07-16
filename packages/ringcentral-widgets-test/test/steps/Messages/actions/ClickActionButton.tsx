import { whenStateChange } from '@ringcentral-integration/core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

  act(() => {
    userEvent.click(actionButton);
  });
};
