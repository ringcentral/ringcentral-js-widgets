import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckUserAtRegionSettings: StepFunction = () => {
  expect(screen.getByText('Region')).toBeInTheDocument();
};
