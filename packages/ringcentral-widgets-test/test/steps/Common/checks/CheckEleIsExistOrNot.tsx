import { screen, within } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckEleIsExistOrNot: StepFunction<{
  containerDataSign?: string;
  dataSign: string;
  isExist: boolean;
}> = async ({ containerDataSign, dataSign, isExist }) => {
  const queryRoot = containerDataSign
    ? within(screen.getByTestId(containerDataSign))
    : screen;
  const dom = queryRoot.queryByTestId(dataSign);

  if (isExist) {
    expect(dom).toBeInTheDocument();
  } else {
    expect(dom).not.toBeInTheDocument();
  }
};
