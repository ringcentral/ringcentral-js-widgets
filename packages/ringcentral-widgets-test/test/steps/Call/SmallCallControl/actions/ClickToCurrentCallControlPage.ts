import { fireEvent, screen } from '@testing-library/react';
import type { StepFunction } from '../../../../lib/step';

export const ClickToCurrentCallControlPage: StepFunction = () => {
  fireEvent.click(screen.getByTestId('currentCallButton'));
  expect(screen.getByTestId('activeCallPanel')).toBeInTheDocument();
};
