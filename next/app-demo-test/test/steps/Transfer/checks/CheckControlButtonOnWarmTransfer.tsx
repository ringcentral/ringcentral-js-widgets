import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

const CheckControlButtonOnWarmTransfer: StepFunction = async () => {
  await whenStateChange(() => {
    expect(screen.getByTestId('smallCallControl')).toBeInTheDocument();
    expect(screen.getByTestId('completeTransfer')).toBeInTheDocument();
    expect(screen.getByTestId('more')).toBeInTheDocument();
  });
};

export { CheckControlButtonOnWarmTransfer };
