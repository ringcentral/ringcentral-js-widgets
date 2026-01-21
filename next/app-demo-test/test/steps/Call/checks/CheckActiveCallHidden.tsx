import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckActiveCallHidden: StepFunction = async () => {
  await whenStateChange(() => {
    expect(screen.queryByTestId('activeCallPanel')).not.toBeInTheDocument();
  });
};
