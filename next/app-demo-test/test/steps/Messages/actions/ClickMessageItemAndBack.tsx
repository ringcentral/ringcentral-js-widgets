import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import {
  type StepFunction,
  userEvent,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const ClickMessageItemAndBack: StepFunction = async () => {
  const smsItem = await whenStateOrTimerChange(() => {
    const smsItem =
      screen.queryAllByTestId('unread')[0] ??
      screen.getAllByTestId('conversationItem')[0];
    expect(smsItem).toBeInTheDocument();
    return smsItem;
  });
  await userEvent.click(smsItem);
  await waitForRenderReady();

  const backButton = await whenStateOrTimerChange(
    () => screen.getByTestId('backButton'),
    { timeout: 10000 },
  );
  await userEvent.click(backButton);
  await waitForRenderReady();
};
