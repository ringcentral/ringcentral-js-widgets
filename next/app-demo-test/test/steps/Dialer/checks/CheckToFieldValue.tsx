import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckToFieldValue: StepFunction<{
  value: string;
}> = async ({ value }) => {
  await whenStateOrTimerChange(() => {
    expect(screen.getByTestId('recipientsInput')).toHaveValue(value);
  });
};
