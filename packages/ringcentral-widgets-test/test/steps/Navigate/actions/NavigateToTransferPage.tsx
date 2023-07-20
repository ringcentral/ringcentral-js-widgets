import { fireEvent, screen } from '@testing-library/react';
import type { StepFunction } from '../../../lib/step';

export const NavigateToTransferPage: StepFunction = () => {
  fireEvent.click(screen.getByTestId('transfer'));
};
