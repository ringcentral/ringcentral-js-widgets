import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckNoAnyAlerts: StepFunction = () => {
  expect(screen.queryAllByTestId('Toast')).toHaveLength(0);
};
