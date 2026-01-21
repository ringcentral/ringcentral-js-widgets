import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen, within } from '@testing-library/react';

export const CheckItemExistById: StepFunction<{
  dataSign: string;
  containerDataSign?: string;
  isExist: boolean;
}> = async ({ dataSign, isExist, containerDataSign }) => {
  const container = containerDataSign
    ? within(screen.getByTestId(containerDataSign))
    : screen;
  if (isExist) {
    expect(container.getByTestId(dataSign)).toBeInTheDocument();
  } else {
    expect(container.queryByTestId(dataSign)).not.toBeInTheDocument();
  }
};
