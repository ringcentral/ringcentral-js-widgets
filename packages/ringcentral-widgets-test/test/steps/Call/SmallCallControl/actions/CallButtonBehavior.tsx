import { fireEvent, waitFor } from '@testing-library/react';
import { StepFunction } from '../../../../lib/step';

export const CallButtonBehavior: StepFunction<{
  callButtonBehaviorType: string;
}> = async (props) => {
  const { callButtonBehaviorType } = props;
  const selectorLabel = `[data-sign="${callButtonBehaviorType}"] circle`;
  const selector = document.querySelector(selectorLabel);
  await waitFor(
    () => {
      expect(selector).not.toBeNull();
    },
    {
      timeout: 3000,
    },
  );
  fireEvent.click(selector);
};
