import { BaseContext, StepFunction } from '@ringcentral-integration/test-utils';
import { screen, waitFor } from '@testing-library/react';

interface CheckFaxActionButtonProps {
  testId: string;
}

export const CheckFaxActionButton: StepFunction<
  CheckFaxActionButtonProps,
  BaseContext
> = async ({ testId }, { phone }) => {
  await waitFor(async () => {
    const actionButton = screen.getAllByTitle(testId);
    expect(actionButton.length).toBeGreaterThan(0);
  });
};
