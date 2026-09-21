import {
  BoundFunctions,
  ByRoleOptions,
  screen,
  StepFunction,
  userEvent,
  waitFor,
  waitForRenderReady,
  within,
} from '@ringcentral-integration/test-utils';

export interface CloseDialogThenCheckNotExistProps {
  closeBy?: 'cancelButton' | 'confirmButton' | 'esc' | 'backdrop';
  getCancelButton?: (dialogScreen: BoundFunctions<any>) => any;
  getConfirmButton?: (dialogScreen: BoundFunctions<any>) => any;
  dialogOptions?: ByRoleOptions;
  /**
   * action after close dialog
   */
  action?: () => Promise<void> | void;
}

export const CloseDialogThenCheckNotExist: StepFunction<
  CloseDialogThenCheckNotExistProps
> = async ({
  closeBy = 'cancelButton',
  getCancelButton,
  getConfirmButton,
  dialogOptions,
  action,
}) => {
  jest.useFakeTimers();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await waitForRenderReady();
  const dialogScreen = within(screen.getByRole('dialog', dialogOptions));

  switch (closeBy) {
    case 'cancelButton': {
      const cancelButton = getCancelButton
        ? getCancelButton(dialogScreen as any)
        : dialogScreen.getByRole('button', {
            name: 'Cancel',
          });

      await user.click(cancelButton);
      break;
    }
    case 'esc':
      await user.keyboard('{esc}');
      break;
    case 'confirmButton':
      {
        const confirmButton = getConfirmButton
          ? getConfirmButton(dialogScreen as any)
          : dialogScreen.getByRole('button', {
              name: 'OK',
            });
        await user.click(confirmButton);
      }
      break;
    case 'backdrop': {
      // if juno backdrop exists, click it, if not click body directly
      const junoBackdrop = document.querySelector('.RcBackdrop-root');
      if (junoBackdrop) {
        await user.click(junoBackdrop);
      } else {
        await user.click(document.body);
      }
      break;
    }
    default:
      throw new Error(
        'closeBy must be `cancelButton` | `confirmButton` | `esc` | `backdrop`',
      );
  }

  await action?.();

  await waitForRenderReady();
  jest.advanceTimersByTime(195);

  jest.useRealTimers();
  await waitFor(() => {
    expect(screen.queryByRole('dialog', dialogOptions)).not.toBeInTheDocument();
  });
  await waitForRenderReady();
};
