import { waitUntilTo } from '@ringcentral-integration/utils';
import { screen } from '@testing-library/react';
import type { StepFunction } from '../../lib/step';

export const CheckMessageNumbers: StepFunction<{
  count: number;
  dataSign?: string;
}> = async ({ count, dataSign = 'Messages' }) => {
  await waitUntilTo(() => {
    expect(screen.getByTestId(dataSign)).toHaveTextContent(`${count}`);
  });
};
