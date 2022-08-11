import { fireEvent, screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

export const NavigateToTransferPage: StepFunction = () => {
  fireEvent.click(screen.getByTestId('transfer'));
};
