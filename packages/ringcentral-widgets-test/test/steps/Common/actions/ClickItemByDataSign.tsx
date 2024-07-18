import { screen, fireEvent, waitFor } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

interface ClickItemByDataSignProps {
  dataSign: string;
}

export const ClickItemByDataSign: StepFunction<
  ClickItemByDataSignProps
> = async ({ dataSign }, { app }) => {
  await waitFor(() => {
    expect(screen.getByTestId(dataSign)).toBeInTheDocument();
  });
  fireEvent.click(screen.getByTestId(dataSign));
};

export const ClickDataSignItemByIndex: StepFunction<
  ClickItemByDataSignProps & { index?: number }
> = async ({ dataSign, index = 0 }, { app }) => {
  let elm: HTMLElement | null = null;
  await waitFor(() => {
    const elements = screen.getAllByTestId(dataSign);
    elm = elements[index];
    expect(elm).toBeInTheDocument();
  });
  fireEvent.click(elm!);
};
