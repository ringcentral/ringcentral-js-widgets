import { StepFunction } from '@ringcentral-integration/test-utils';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const ClickConfirmOnPopup: StepFunction = () => {
  act(() => {
    const deleteModal = screen.queryByTestId('deleteModal');
    const confirmButton = deleteModal!.querySelector('[data-sign=confirm]');
    userEvent.click(confirmButton!);
  });
};

export const ClickCancelOnPopup: StepFunction = () => {
  act(() => {
    const deleteModal = screen.queryByTestId('deleteModal');
    const cancelButton = deleteModal!.querySelector('[data-sign=cancel]');
    userEvent.click(cancelButton!);
  });
};

export const ClickCloseOnPopup: StepFunction = () => {
  act(() => {
    const deleteModal = screen.queryByTestId('deleteModal');
    const closeButton = deleteModal!.querySelector('[data-sign=closeButton]');
    userEvent.click(closeButton!);
  });
};
