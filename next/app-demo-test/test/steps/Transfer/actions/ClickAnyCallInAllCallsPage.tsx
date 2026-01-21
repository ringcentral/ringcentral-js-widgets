import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const ClickAnyCallInAllCallsPage: StepFunction = async () => {
  const callNameAndDurationSection = screen.getAllByTestId(
    'callNameAndDurationWrap',
  )[Math.floor(Math.random() * 2)];

  if (callNameAndDurationSection) {
    userEvent.click(callNameAndDurationSection);
  }
};
