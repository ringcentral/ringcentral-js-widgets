import { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckStopRecordButtonExist: StepFunction = () => {
  expect(screen.queryByTestId('stopRecord')).toBeInTheDocument();
};
