import { fireEvent, screen, waitFor, within } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

interface ClickItemByDataSignProps {
  dataSign: string;
  containerDataSign?: string;
  index?: number;
}

export const ClickItemByDataSign: StepFunction<
  ClickItemByDataSignProps
> = async ({ dataSign, containerDataSign, index }) => {
  let container: HTMLElement | undefined;
  if (containerDataSign) {
    container = screen.getByTestId(containerDataSign);
  }

  let element: HTMLElement | undefined;
  const queryRoot = container ? within(container) : screen;

  if (typeof index === 'number') {
    if (index < 0) {
      throw new Error('"index" must be >= 0');
    }
    await waitFor(() => {
      element = queryRoot.queryAllByTestId(dataSign)[index];
      expect(element).toBeInTheDocument();
    });
  } else {
    await waitFor(() => {
      element = queryRoot.getByTestId(dataSign);
      expect(element).toBeInTheDocument();
    });
  }

  fireEvent.click(element!);
};
