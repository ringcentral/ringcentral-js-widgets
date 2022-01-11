import { screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

export const CheckNoAnyAlerts: StepFunction = () => {
  expect(screen.queryAllByTestId('alert')).toStrictEqual([]);
};
