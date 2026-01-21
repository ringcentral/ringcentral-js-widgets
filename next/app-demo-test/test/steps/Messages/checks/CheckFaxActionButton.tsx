import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type {
  BaseContext,
  StepFunction,
} from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckFaxActionButtonProps {
  testId: string;
}

export const CheckFaxActionButton: StepFunction<
  CheckFaxActionButtonProps,
  BaseContext
> = async ({ testId }) => {
  await whenStateChange(async () => {
    const actionButton = screen.getAllByTitle(testId);
    expect(actionButton.length).toBeGreaterThan(0);
  });
};
