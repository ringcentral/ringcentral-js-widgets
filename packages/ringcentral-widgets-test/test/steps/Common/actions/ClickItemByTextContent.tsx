import { screen, fireEvent, waitFor, within } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

interface ClickItemByTextContentProps {
  text: string;
  getByRole?: string;
  containerDataSign?: string;
}

export const ClickItemByTextContent: StepFunction<
  ClickItemByTextContentProps
> = async ({ text, getByRole, containerDataSign }, { app }) => {
  const container = containerDataSign
    ? within(screen.getByTestId(containerDataSign))
    : screen;
  if (getByRole) {
    await waitFor(() => {
      const ele = container.getByRole(getByRole);
      expect(ele).toBeInTheDocument();
      expect(within(ele).getByText(text)).toBeInTheDocument();
    });

    fireEvent.click(within(container.getByRole(getByRole)).getByText(text));
  } else {
    await waitFor(() => {
      expect(container.getByText(text)).toBeInTheDocument();
    });

    fireEvent.click(container.getByText(text));
  }
};
