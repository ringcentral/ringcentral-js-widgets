import { getNodeText, screen, waitFor } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const CheckAreaCodeField: StepFunction<{
  exist?: boolean;
  value?: string;
}> = async ({ exist = true, value = '' }) => {
  if (exist) {
    expect(screen.queryByTestId('areaCodeInputField')).toBeInTheDocument();
    expect(
      screen.queryByTestId<HTMLInputElement>('areaCodeInputField')?.value,
    ).toBe(value);
  } else {
    expect(screen.queryByTestId('areaCodeInputField')).not.toBeInTheDocument();
  }
};
