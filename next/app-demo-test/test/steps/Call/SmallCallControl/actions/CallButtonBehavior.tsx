import { whenStateChange } from '@ringcentral-integration/next-core/test';
import { StepFunction } from '@ringcentral-integration/test-utils';
import { act, fireEvent, screen } from '@testing-library/react';

export const CallButtonBehavior: StepFunction<{
  callButtonBehaviorType: string;
}> = async ({ callButtonBehaviorType }) => {
  await whenStateChange(() => {
    act(() => {
      const callButton = screen.getAllByTestId(callButtonBehaviorType)[0];
      const circleIcon = callButton.getElementsByClassName('circle')[0];
      expect(callButton).toBeInTheDocument();

      fireEvent.click(circleIcon);
    });
  });
};
