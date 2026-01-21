import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@ringcentral-integration/test-utils';

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
