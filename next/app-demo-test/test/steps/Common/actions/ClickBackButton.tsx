import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  screen,
  userEvent,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';

export const ClickBackButton: StepFunction = async () => {
  const backButton = await whenStateOrTimerChange(() => {
    const button = screen.getByTestId('backButton');
    expect(button).toBeInTheDocument();
    return button;
  });
  await userEvent.click(backButton);
  await waitForRenderReady();
};
