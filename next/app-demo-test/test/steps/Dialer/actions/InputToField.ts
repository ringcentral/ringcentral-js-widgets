import type { StepFunction } from '@ringcentral-integration/test-utils';
import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const InputToField: StepFunction<{
  input: string;
  needEnter?: boolean;
}> = async ({ input, needEnter = false }) => {
  jest.useFakeTimers();
  try {
    const user = userEvent.setup({
      advanceTimers: jest.advanceTimersByTime,
    });
    const inputField = screen.getByTestId('recipientsInput');
    await user.click(inputField);
    if (needEnter) {
      input = `${input}{enter}`;
    }
    await user.type(inputField, input);
    await waitForRenderReady();
    jest.advanceTimersByTime(1000);
    await waitForRenderReady();
  } finally {
    jest.useRealTimers();
  }
};
