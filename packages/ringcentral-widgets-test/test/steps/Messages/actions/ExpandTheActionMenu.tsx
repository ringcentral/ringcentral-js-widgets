import { whenStateOrTimerChange } from '@ringcentral-integration/core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const ExpandTheActionMenu: StepFunction = async () => {
  await whenStateOrTimerChange(() => {
    act(() => {
      const extendButton = screen.getAllByTestId('extendButton')[0];
      userEvent.click(extendButton);
    });
  });
};
