import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckControlButtonOnWarmTransferProps {
  isDisable: boolean;
}

export const CheckCompleteTransferButtonStatus: StepFunction<
  CheckControlButtonOnWarmTransferProps
> = async ({ isDisable }) => {
  const button = screen.getByTestId('completeTransfer');
  isDisable
    ? expect(button).toHaveClass('buttonDisabled')
    : expect(button).not.toHaveClass('buttonDisabled');
};
