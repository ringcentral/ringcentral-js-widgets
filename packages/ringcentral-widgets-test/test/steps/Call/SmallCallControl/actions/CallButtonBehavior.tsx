import { fireEvent, screen, act } from '@testing-library/react';

import type { StepFunction } from '../../../../lib/step';

export const CallButtonBehavior: StepFunction<{
  callButtonBehaviorType: string;
}> = ({ callButtonBehaviorType }) => {
  act(() => {
    const callButton = screen.getAllByTestId(callButtonBehaviorType)[0];
    const circleIcon = callButton.getElementsByClassName('circle')[0];
    expect(callButton).toBeInTheDocument();

    fireEvent.click(circleIcon);
  });
};
