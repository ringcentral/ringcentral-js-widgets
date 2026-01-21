import { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen, act } from '@testing-library/react';

export const CallButtonBehaviorOnAllCalls: StepFunction<{
  callButtonBehaviorType: string;
}> = ({ callButtonBehaviorType }) => {
  act(() => {
    const callButton = screen.getAllByTestId(callButtonBehaviorType)[0];
    const circleIcon = callButton.getElementsByTagName('svg')[0];
    expect(callButton).toBeInTheDocument();

    fireEvent.click(circleIcon);
  });
};
