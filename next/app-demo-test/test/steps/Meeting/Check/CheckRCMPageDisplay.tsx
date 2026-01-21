import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

import { WaitForSpinner } from '../../WaitForSpinner';

export const CheckRCMPageDisplay: StepFunction<{ timeout?: number }> = async (
  props,
  context,
) => {
  const { timeout = 3000 } = props;
  await WaitForSpinner(props, context);
  if (timeout === 0) {
    expect(screen.queryByTestId('meetingConfigsPanel')).toBeInTheDocument();
    return;
  }
  await whenStateChange(
    () => {
      expect(screen.queryByTestId('meetingConfigsPanel')).toBeInTheDocument();
    },
    { timeout },
  );
};
