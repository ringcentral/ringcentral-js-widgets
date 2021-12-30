import { fireEvent, screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

export const SaveCallLog: StepFunction = () => {
  fireEvent.click(screen.getByTestId('saveCall'));
};
