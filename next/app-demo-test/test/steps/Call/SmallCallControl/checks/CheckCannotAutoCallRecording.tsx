import { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

const CheckCannotAutoCallRecording: StepFunction = async () => {
  expect(screen.getByTestId('record')).toBeInTheDocument();
  expect(screen.queryByTestId('stopRecord')).toBeNull();
};

export { CheckCannotAutoCallRecording };
