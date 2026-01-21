import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckMessageNumbers: StepFunction<{
  count: number;
  dataSign?: string;
}> = async ({ count, dataSign = 'messagesTab' }) => {
  await whenStateChange(() => {
    expect(screen.getByTestId(dataSign)).toHaveTextContent(`${count}`);
  });
};
