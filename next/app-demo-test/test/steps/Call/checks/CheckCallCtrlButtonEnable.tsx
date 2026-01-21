import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckCallCtrlButtonEnable: StepFunction<{
  callButtonBehaviorType: 'hold' | 'onHold' | 'record' | 'flip' | 'unmute';
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
