import { whenStateChange } from '@ringcentral-integration/core/test';
import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckCallCtrlButtonEnable: StepFunction<{
  callButtonBehaviorType:
    | 'hold'
    | 'onHold'
    | 'record'
    | 'flip'
    | 'unmute'
    | 'transfer';
  isDisabled?: boolean;
}> = async ({ callButtonBehaviorType, isDisabled }) => {
  await whenStateChange(() => {
    const button = screen.getByTestId(callButtonBehaviorType);
    if (isDisabled) {
      expect(button.classList.value).toContain('buttonDisabled');
    } else {
      expect(button.classList.value).not.toContain('buttonDisabled');
    }
  });
};
