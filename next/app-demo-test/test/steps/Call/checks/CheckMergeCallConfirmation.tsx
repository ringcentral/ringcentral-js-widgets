import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen, within } from '@testing-library/react';

interface CheckMergeCallConfirmationProps {
  open: boolean;
  contactName?: string;
}

export const CheckMergeCallConfirmation: StepFunction<
  CheckMergeCallConfirmationProps
> = async ({ open, contactName }) => {
  await whenStateOrTimerChange(() => {
    const confirmationElement = screen.queryByTestId('mergeCallConfirmation')!;

    if (!open) {
      expect(confirmationElement).not.toBeInTheDocument();
      return;
    }

    const confirmationScope = within(confirmationElement);
    expect(
      confirmationScope.getByText('Merge with active call?'),
    ).toBeInTheDocument();

    expect(
      confirmationScope.getByText(
        `You're currently on a call. Would you like to add ${contactName} and merge into a conference call?`,
      ),
    ).toBeInTheDocument();

    expect(confirmationScope.getByTestId('doNotAsk')).toBeInTheDocument();

    expect(confirmationScope.getByTestId('confirmMerge')).toBeInTheDocument();

    expect(confirmationScope.getByTestId('cancelMerge')).toBeInTheDocument();
  });
};
