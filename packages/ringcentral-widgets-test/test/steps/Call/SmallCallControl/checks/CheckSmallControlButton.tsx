import { getByTestId, screen } from '@testing-library/react';

import type { StepFunction } from '../../../../lib/step';

type ButtonKey =
  | 'hold'
  | 'onHold'
  | 'record'
  | 'mute'
  | 'hangup'
  | 'showKeypad'
  | 'forward'
  | 'toVoiceMail'
  | 'answer'
  | 'ignore';
export const CheckSmallControlButton: StepFunction<{
  callButtonBehaviorTypes?: ButtonKey[];
  callButtonBehaviorType?: ButtonKey;
  disabled?: boolean;
}> = async ({ callButtonBehaviorTypes, callButtonBehaviorType, disabled }) => {
  const smallControlControlPanel = screen.getByTestId('smallCallControl');
  if (callButtonBehaviorTypes) {
    callButtonBehaviorTypes.forEach((key) => {
      expect(getByTestId(smallControlControlPanel, key)).toBeInTheDocument();
    });
  }
  if (callButtonBehaviorType) {
    expect(
      getByTestId(smallControlControlPanel, callButtonBehaviorType),
    ).toBeInTheDocument();
    if (disabled) {
      expect(
        getByTestId(smallControlControlPanel, callButtonBehaviorType).classList
          .value,
      ).toContain('buttonDisabled');
    }
  }
};
