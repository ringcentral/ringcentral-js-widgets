import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../../lib/step';

export const CheckButtonExist: StepFunction<{
  callButtonBehaviorType: string;
}> = async (props) => {
  const { callButtonBehaviorType } = props;
  const callButton = screen.queryAllByTestId(callButtonBehaviorType)[0];
  expect(callButton).toBeInTheDocument();
};
