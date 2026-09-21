import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const ClickFromField: StepFunction = async () => {
  await whenStateOrTimerChange(() => {
    expect(screen.queryByTestId('dropdownSelect')).not.toBeNull();
  });
  jest.useFakeTimers();
  try {
    fireEvent.click(screen.getByTestId('selectedItem'));
    await waitForRenderReady();
    jest.runOnlyPendingTimers();
  } finally {
    jest.useRealTimers();
  }
};
