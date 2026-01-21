import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckControlButtonOnWarmTransferProps {
  isDisable: boolean;
}
const CheckCompleteTransferButtonStatus: StepFunction<
  CheckControlButtonOnWarmTransferProps
> = async ({ isDisable }) => {
  isDisable
    ? expect(screen.getByTestId('completeTransfer')).toBeDisabled()
    : expect(screen.getByTestId('completeTransfer')).not.toBeDisabled();
};

export { CheckCompleteTransferButtonStatus };
