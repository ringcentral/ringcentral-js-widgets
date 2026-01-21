import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface IProps {
  isButtonDisabled: boolean;
}
const CheckTransferSwitchButtonStatus: StepFunction<IProps> = async ({
  isButtonDisabled,
}) => {
  if (isButtonDisabled) {
    expect(screen.getByTestId('warmTransferSwitchCallButton')).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  } else {
    expect(screen.getByTestId('warmTransferSwitchCallButton')).toHaveAttribute(
      'aria-disabled',
      'false',
    );
  }

  expect(screen.getByTestId('warmTransferSwitchCallButton')).not.toBeNull();
};

export { CheckTransferSwitchButtonStatus };
