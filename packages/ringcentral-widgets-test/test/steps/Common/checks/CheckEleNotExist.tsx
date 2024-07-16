import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckEleNotExist: StepFunction<{
  dataSign: string;
}> = async ({ dataSign }) => {
  const dom = screen.queryByTestId(dataSign);
  expect(dom).not.toBeInTheDocument();
};
