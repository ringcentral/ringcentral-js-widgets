import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import {
  type StepFunction,
  userEvent,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const ClickConfirmOnPopup: StepFunction = async () => {
  const confirmButton = await whenStateOrTimerChange(() => {
    const deleteModal = screen.queryByTestId('deleteModal');
    const confirmButton = deleteModal!.querySelector('[data-sign=confirm]');
    expect(confirmButton).toBeInTheDocument();
    return confirmButton as HTMLElement;
  });
  await userEvent.click(confirmButton);
  await waitForRenderReady();
};

export const ClickCancelOnPopup: StepFunction = async () => {
  const cancelButton = await whenStateOrTimerChange(() => {
    const deleteModal = screen.queryByTestId('deleteModal');
    const cancelButton = deleteModal!.querySelector('[data-sign=cancel]');
    expect(cancelButton).toBeInTheDocument();
    return cancelButton as HTMLElement;
  });
  await userEvent.click(cancelButton);
  await waitForRenderReady();
};

export const ClickCloseOnPopup: StepFunction = async () => {
  const closeButton = await whenStateOrTimerChange(() => {
    const deleteModal = screen.queryByTestId('deleteModal');
    const closeButton = deleteModal!.querySelector('[data-sign=closeButton]');
    expect(closeButton).toBeInTheDocument();
    return closeButton as HTMLElement;
  });
  await userEvent.click(closeButton);
  await waitForRenderReady();
};
