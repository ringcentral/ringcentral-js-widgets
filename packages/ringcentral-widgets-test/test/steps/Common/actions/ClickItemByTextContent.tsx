import { screen, fireEvent, waitFor, within } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

interface ClickItemByTextContentProps {
  text: string;
  getByRole?: string;
}

export const ClickItemByTextContent: StepFunction<
  ClickItemByTextContentProps
> = async ({ text, getByRole }, { app }) => {
  if (getByRole) {
    await waitFor(() => {
      const ele = screen.getByRole(getByRole);
      expect(ele).toBeInTheDocument();
      expect(within(ele).getByText(text)).toBeInTheDocument();
    });

    fireEvent.click(within(screen.getByRole(getByRole)).getByText(text));
  } else {
    await waitFor(() => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(text));
  }
};
