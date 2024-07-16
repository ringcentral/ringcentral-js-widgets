import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckNoAnyAlerts: StepFunction = () => {
  expect(screen.queryAllByTestId('alert')).toStrictEqual([]);
};
