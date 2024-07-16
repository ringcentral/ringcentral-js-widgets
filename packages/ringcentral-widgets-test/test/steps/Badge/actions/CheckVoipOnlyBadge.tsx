import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { screen, waitFor } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckVoipOnlyBadge: StepFunction<{
  show?: boolean;
}> = async ({ show = true }) => {
  const badge = screen.queryByText('VoIP Only');
  if (show) {
    expect(badge).toBeInTheDocument();
  } else {
    expect(badge).not.toBeInTheDocument();
  }
};
