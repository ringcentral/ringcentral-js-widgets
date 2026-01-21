import { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckButtonExist: StepFunction<{
  callButtonBehaviorType: string;
}> = async (props) => {
  const { callButtonBehaviorType } = props;
  const callButton = screen.queryByTestId(callButtonBehaviorType);
  expect(callButton).toBeInTheDocument();
};
