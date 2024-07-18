import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

interface CheckFromFieldExistsProps {}

export const CheckFromFieldExists: StepFunction<
  CheckFromFieldExistsProps
> = () => {
  expect(screen.getByTitle('From:')).toBeTruthy();
};
