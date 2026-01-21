import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const ClickFromField: StepFunction = async () => {
  await whenStateChange(() => {
    expect(screen.queryByTestId('dropdownSelect')).not.toBeNull();
  });
  jest.useFakeTimers();
  userEvent.click(screen.getByTestId('selectedItem'));
  await waitForRenderReady();
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
};
