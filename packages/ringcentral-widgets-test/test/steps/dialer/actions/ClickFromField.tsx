import { screen, waitFor } from '@testing-library/react';
import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import userEvent from '@testing-library/user-event';
import type { StepFunction } from '../../../lib/step';

export const ClickFromField: StepFunction = async () => {
  await waitFor(() => {
    expect(screen.queryByTestId('dropdownSelect')).not.toBeNull();
  });
  jest.useFakeTimers();
  userEvent.click(screen.getByTestId('selectedItem'));
  await waitForRenderReady();
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
};
