import {
  fireEvent,
  screen,
  type StepFunction,
} from '@ringcentral-integration/test-utils';

export const ClickRingtoneInput: StepFunction = async () => {
  const inputNode = screen
    .getByTestId('ringtoneSelection')
    .querySelector('[role = button]');
  fireEvent.mouseDown(inputNode!);
};
