import { fireEvent, screen, waitFor } from '@testing-library/react';

import { StepFunction } from '../../../../lib/step';

export const CallItemButtonBehavior: StepFunction<{
  callButtonBehaviorType: string;
}> = async (props) => {
  const { callButtonBehaviorType } = props;
  const callButton = screen.queryAllByTestId(callButtonBehaviorType)[0];
  expect(callButton).toBeInTheDocument();

  const circleIcon = callButton.getElementsByClassName('circle')[0];
  fireEvent.click(circleIcon);
};
