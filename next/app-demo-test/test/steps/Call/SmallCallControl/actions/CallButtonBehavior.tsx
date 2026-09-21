import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import {
  fireEvent,
  StepFunction,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CallButtonBehavior: StepFunction<{
  callButtonBehaviorType: string;
}> = async ({ callButtonBehaviorType }) => {
  const callButton = await whenStateOrTimerChange(() => {
    const callButton =
      screen.queryAllByTestId(callButtonBehaviorType)[0] ??
      (callButtonBehaviorType === 'showKeypad'
        ? screen.queryAllByTestId('keypad')[0]
        : undefined);
    expect(callButton).toBeInTheDocument();
    return callButton;
  });
  const circleIcon = callButton.getElementsByClassName('circle')[0];

  fireEvent.click(circleIcon ?? callButton);
  await waitForRenderReady();
};
