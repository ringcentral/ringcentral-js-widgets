import { StepFunction } from '@ringcentral-integration/test-utils';
import { screen, waitFor } from '@testing-library/react';

export const CheckButtonExist: StepFunction<{
  callButtonBehaviorType: string;
}> = async (props) => {
  const { callButtonBehaviorType } = props;
  await waitFor(() => {
    const callButton =
      screen.queryByTestId(callButtonBehaviorType) ??
      (callButtonBehaviorType === 'showKeypad'
        ? screen.queryByTestId('keypad')
        : null);
    expect(callButton).toBeInTheDocument();
  });
};
