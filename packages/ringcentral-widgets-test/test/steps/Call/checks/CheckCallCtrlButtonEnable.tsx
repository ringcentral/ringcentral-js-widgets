import { screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

export const CheckCallCtrlButtonEnable: StepFunction<{
  callButtonBehaviorType: 'hold' | 'onHold' | 'record' | 'flip' | 'unmute';
  isDisabled?: boolean;
}> = async ({ callButtonBehaviorType, isDisabled }) => {
  const button = screen.getByTestId(callButtonBehaviorType);
  if (isDisabled) {
    expect(button.classList.value).toContain('buttonDisabled');
  } else {
    expect(button.classList.value).not.toContain('buttonDisabled');
  }
};
