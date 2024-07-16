import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

interface CheckAreaCodeFieldProps {
  exist?: boolean;
  value?: string;
}

export const CheckAreaCodeField: StepFunction<
  CheckAreaCodeFieldProps
> = async ({ exist = true, value }) => {
  const areaCodeInputField =
    screen.queryByTestId<HTMLInputElement>('areaCodeInputField');
  if (exist) {
    expect(areaCodeInputField).toBeInTheDocument();
    if (typeof value === 'string') {
      expect(areaCodeInputField?.value).toBe(value);
    }
  } else {
    expect(areaCodeInputField).not.toBeInTheDocument();
  }
};
