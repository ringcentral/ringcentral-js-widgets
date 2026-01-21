import {
  BoundFunctions,
  ByRoleOptions,
  screen,
  StepFunction,
  userEvent,
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
  await waitForRenderReady();
  const dialogScreen = within(screen.getByRole('dialog', dialogOptions));

  switch (closeBy) {
    case 'cancelButton': {
      const cancelButton = getCancelButton
        ? getCancelButton(dialogScreen as any)
        : dialogScreen.getByRole('button', {
            name: 'Cancel',
          });

      userEvent.click(cancelButton);
      break;
    }
    case 'esc':
      userEvent.keyboard('{esc}');
      break;
    case 'confirmButton':
      {
        const confirmButton = getConfirmButton
          ? getConfirmButton(dialogScreen as any)
          : dialogScreen.getByRole('button', {
              name: 'OK',
            });
        userEvent.click(confirmButton);
      }
      break;
    case 'backdrop': {
      // if juno backdrop exists, click it, if not click body directly
      const junoBackdrop = document.querySelector('.RcBackdrop-root');
      if (junoBackdrop) {
        userEvent.click(junoBackdrop);
      } else {
        userEvent.click(document.body);
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
  expect(screen.queryByRole('dialog', dialogOptions)).not.toBeInTheDocument();
  await waitForRenderReady();
};
