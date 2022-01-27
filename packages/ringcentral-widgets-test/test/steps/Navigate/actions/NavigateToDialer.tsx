import { fireEvent, screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

export const NavigateToDialer: StepFunction = () => {
  fireEvent.click(screen.getByTestId('Dial Pad'));
};