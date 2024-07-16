import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckCallCtrlButton: StepFunction<{
  callButtonBehaviorType: 'hold' | 'onHold' | 'record' | 'mute';
}> = async ({ callButtonBehaviorType }) => {
  await waitForRenderReady();
  switch (callButtonBehaviorType) {
    case 'onHold':
      expect(screen.getByTestId('onHold')).toBeInTheDocument();
      expect(screen.getByText('On Hold')).toBeInTheDocument();
      break;
    case 'hold':
      expect(screen.getByTestId('hold')).toBeInTheDocument();
      expect(screen.getByText('Hold')).toBeInTheDocument();
      break;
    case 'mute':
      expect(screen.getByTestId('mute')).toBeInTheDocument();
      expect(screen.getByText('Mute')).toBeInTheDocument();
      break;
    default:
      throw new Error('callButtonBehaviorType error');
  }
};
