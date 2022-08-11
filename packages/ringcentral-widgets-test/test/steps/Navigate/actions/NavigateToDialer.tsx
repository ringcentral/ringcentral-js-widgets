import { fireEvent, screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

export const NavigateToDialer: StepFunction = () => {
  if (screen.queryByTestId('Dial Pad')) {
    fireEvent.click(screen.getByTestId('Dial Pad'));
    return;
  }
  if (screen.queryByTestId('dialerTab')) {
    fireEvent.click(screen.getByTestId('dialerTab'));
  }
};

export const NavigateToDialerPage: StepFunction = () => {
  fireEvent.click(screen.getByTestId('Phone'));
};
