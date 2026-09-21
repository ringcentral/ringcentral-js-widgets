import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import {
  type StepFunction,
  userEvent,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const ExpandTheActionMenu: StepFunction = async () => {
  const extendButton = await whenStateOrTimerChange(() => {
    const extendButton = screen.getAllByTestId('extendButton')[0];
    expect(extendButton).toBeInTheDocument();
    return extendButton;
  });
  await userEvent.click(extendButton);
  await waitForRenderReady();
};
