import type { StepFunction } from '@ringcentral-integration/test-utils';
import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const InputToField: StepFunction<{
  input: string;
  needEnter?: boolean;
}> = async ({ input, needEnter = false }) => {
  jest.useFakeTimers();
  const inputField = screen.getByTestId('recipientsInput');
  userEvent.click(inputField);
  if (needEnter) {
    input = `${input}{enter}`;
  }
  userEvent.type(inputField, input);
  await waitForRenderReady();
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
};
