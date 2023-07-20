import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { StepFunction } from '../../../lib/step';

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
