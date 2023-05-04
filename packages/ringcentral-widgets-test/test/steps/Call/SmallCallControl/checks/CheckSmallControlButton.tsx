import { getByTestId, screen } from '@testing-library/react';
import { StepFunction } from '../../../../lib/step';

export const CheckSmallControlButton: StepFunction<{
  callButtonBehaviorType:
    | 'hold'
    | 'onHold'
    | 'record'
    | 'mute'
    | 'hangup'
    | 'showKeypad';
  disabled?: boolean;
}> = async ({ callButtonBehaviorType, disabled }) => {
  const smallControlControlPanel = screen.getByTestId('smallCallControl');
  expect(
    getByTestId(smallControlControlPanel, callButtonBehaviorType),
  ).toBeInTheDocument();
  if (disabled) {
    expect(
      getByTestId(smallControlControlPanel, callButtonBehaviorType).classList
        .value,
    ).toContain('buttonDisabled');
  }
};
