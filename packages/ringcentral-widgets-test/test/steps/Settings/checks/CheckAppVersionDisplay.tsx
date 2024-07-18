import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckAppVersionDisplay: StepFunction = async (props, context) => {
  expect(screen.queryByTestId('version')).not.toBeNull();
};
