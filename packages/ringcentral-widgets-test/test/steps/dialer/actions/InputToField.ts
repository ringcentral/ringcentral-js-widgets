import { waitForRenderReady } from '@ringcentral-integration/test-utils/lib/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

export const InputToField: StepFunction<{
  input: string;
}> = async ({ input }) => {
  jest.useFakeTimers();
  const inputField = screen.getByTestId('recipientsInput');
  inputField.focus();
  fireEvent.change(inputField, { target: { value: input } });
  await waitForRenderReady();
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
};
