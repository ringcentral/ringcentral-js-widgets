import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckVoipOnlyBadge: StepFunction<{
  show?: boolean;
}> = async ({ show = true }) => {
  await whenStateOrTimerChange(() => {
    const badge = screen.queryByText('VoIP Only');
    if (show) {
      expect(badge).toBeInTheDocument();
    } else {
      expect(badge).not.toBeInTheDocument();
    }
  });
};
