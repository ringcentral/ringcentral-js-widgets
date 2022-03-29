import { screen } from '@testing-library/react';

import { StepFunction } from '../../../../lib/step';

const CheckCannotAutoCallRecording: StepFunction = async () => {
  expect(screen.getByTestId('record')).toBeInTheDocument();
  expect(screen.queryByTestId('stopRecord')).toBeNull();
};

export { CheckCannotAutoCallRecording };
