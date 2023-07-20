import type { StepFunction } from '@ringcentral-integration/test-utils';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const ExpandTheActionMenu: StepFunction = async () => {
  act(() => {
    const extendButton = screen.getAllByTestId('extendButton')[0];
    userEvent.click(extendButton);
  });
};
