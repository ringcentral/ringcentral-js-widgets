import { screen } from '@testing-library/react';
import type { StepFunction } from '../../../../lib/step';

export const CheckStopRecordButtonExist: StepFunction = () => {
  expect(screen.queryByTestId('stopRecord')).toBeInTheDocument();
};
