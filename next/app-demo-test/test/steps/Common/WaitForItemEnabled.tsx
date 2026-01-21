import { whenStateChange } from '@ringcentral-integration/next-core/test';
import { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const WaitForItemEnabled: StepFunction<{
  dataSign: string;
}> = async ({ dataSign }) => {
  await whenStateChange(() => {
    const button = screen.getByTestId(dataSign);
    expect(button).toBeEnabled();
  });
};
