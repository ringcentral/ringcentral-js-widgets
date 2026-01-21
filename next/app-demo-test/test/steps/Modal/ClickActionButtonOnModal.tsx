import {
  act,
  screen,
  StepFunction,
  userEvent,
  within,
} from '@ringcentral-integration/test-utils';

export const ClickActionButtonOnModal: StepFunction<{
  buttonText: string;
}> = ({ buttonText }) => {
  act(() => {
    const modal = screen.getByRole('dialog');
    const button = within(modal).getByRole('button', {
      name: buttonText,
    });
    userEvent.click(button!);
  });
};
