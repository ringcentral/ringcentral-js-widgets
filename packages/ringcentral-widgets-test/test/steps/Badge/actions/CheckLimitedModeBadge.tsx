import { screen, waitFor } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckLimitedModeBadge: StepFunction<{
  show?: boolean;
}> = async ({ show = true }) => {
  const badge = screen.queryByText('Limited Mode');
  if (show) {
    expect(badge).toBeInTheDocument();
  } else {
    expect(badge).not.toBeInTheDocument();
  }
};
