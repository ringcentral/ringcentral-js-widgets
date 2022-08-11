import { screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

export const CheckAppVersionDisplay: StepFunction = async (props, context) => {
  expect(screen.queryByTestId('version')).not.toBeNull();
};
