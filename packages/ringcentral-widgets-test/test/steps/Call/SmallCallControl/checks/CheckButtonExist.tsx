import { screen, queryByTestId } from '@testing-library/react';

import type { StepFunction } from '../../../../lib/step';

export const CheckButtonExist: StepFunction<{
  callButtonBehaviorType: string;
  isExist?: boolean;
}> = async (props) => {
  const { callButtonBehaviorType, isExist = true } = props;
  const callButton = screen.queryByTestId(callButtonBehaviorType);
  if (isExist) {
    expect(callButton).toBeInTheDocument();
  } else {
    expect(callButton).not.toBeInTheDocument();
  }
};

export const CheckCallLogButtonExist: StepFunction<{
  callButtonBehaviorType: string;
  isExist?: boolean;
}> = async (props) => {
  const smallControlControlPanel = screen.getByTestId('smallCallControl');
  const { callButtonBehaviorType, isExist = true } = props;
  const callButton = queryByTestId(
    smallControlControlPanel,
    callButtonBehaviorType,
  );
  if (isExist) {
    expect(callButton).toBeInTheDocument();
  } else {
    expect(callButton).not.toBeInTheDocument();
  }
};
