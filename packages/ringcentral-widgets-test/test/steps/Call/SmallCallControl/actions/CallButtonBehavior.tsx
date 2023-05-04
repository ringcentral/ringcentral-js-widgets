import { fireEvent, screen, waitFor } from '@testing-library/react';

import { StepFunction } from '../../../../lib/step';

export const CallButtonBehavior: StepFunction<{
  callButtonBehaviorType: string;
}> = ({ callButtonBehaviorType }) => {
  const callButton = screen.getAllByTestId(callButtonBehaviorType)[0];
  const circleIcon = callButton.getElementsByClassName('circle')[0];
  expect(callButton).toBeInTheDocument();

  fireEvent.click(circleIcon);
};
