import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  userEvent,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';
import { fireEvent, screen, within } from '@testing-library/react';

export const ClickMessageFromField: StepFunction = async (_, { app }) => {
  let dropdownInput = screen.queryByTestId('dropdownSelect');
  // old ui
  if (dropdownInput) {
    jest.useFakeTimers();
    try {
      fireEvent.click(screen.getByTestId('selectedItem'));
      await waitForRenderReady();
      jest.runOnlyPendingTimers();
    } finally {
      jest.useRealTimers();
    }
    return;
  }

  dropdownInput = within(screen.getByTestId('phoneNumber')).getByRole('button');
  fireEvent.mouseDown(dropdownInput!);
  await waitForRenderReady();
  await whenStateOrTimerChange(() => {
    expect(
      screen.getAllByTestId('selectMenuItem', { exact: false }).length,
    ).toBeGreaterThan(0);
  });
};
