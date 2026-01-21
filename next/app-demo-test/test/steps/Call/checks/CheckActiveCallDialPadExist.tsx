import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckActiveCallDialPadExist: StepFunction = async () => {
  await whenStateChange(() => {
    expect(screen.getByTestId('activeCallDialPad')).toBeInTheDocument();
  });
};
