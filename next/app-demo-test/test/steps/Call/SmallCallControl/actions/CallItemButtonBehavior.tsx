import {
  StepFunction,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const CallItemButtonBehavior: StepFunction<{
  callButtonBehaviorType: string;
}> = async (props) => {
  await waitForRenderReady();
  const { callButtonBehaviorType } = props;
  const callButton = screen.queryAllByTestId(callButtonBehaviorType)[0];
  expect(callButton).toBeInTheDocument();

  const circleIcon = callButton.getElementsByClassName('circle')[0];
  fireEvent.click(circleIcon);
};
