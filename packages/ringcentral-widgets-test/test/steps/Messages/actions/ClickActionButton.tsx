import type { StepFunction } from '@ringcentral-integration/test-utils';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

interface ClickActionButtonProps {
  testId: string;
}

export const ClickActionButton: StepFunction<ClickActionButtonProps> = ({
  testId,
}) => {
  act(() => {
    const actionButton = screen.getByTestId(testId);
    userEvent.click(actionButton);
  });
};
