import { screen, fireEvent, waitFor } from '@testing-library/react';
import type { StepFunction } from '../../../lib/step';

interface ClickItemByDataSignProps {
  dataSign: string;
}

export const ClickItemByDataSign: StepFunction<ClickItemByDataSignProps> =
  async ({ dataSign }) => {
    await waitFor(() => {
      expect(screen.getByTestId(dataSign)).toBeInTheDocument();
      fireEvent.click(screen.getByTestId(dataSign));
    });
  };
