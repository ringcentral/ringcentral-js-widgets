import { waitUntilTo } from '@ringcentral-integration/commons/utils';
import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';
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
  await waitUntilTo(
    () => {
      expect(screen.queryByTestId('meetingConfigsPanel')).toBeInTheDocument();
    },
    { timeout },
  );
};
