import {
  fireEvent,
  screen,
  StepFunction,
} from '@ringcentral-integration/test-utils';

export const NavigateToDialer: StepFunction = async () => {
  if (screen.queryByTestId('dialerTab')) {
    fireEvent.click(screen.getByTestId('dialerTab'));
  }
  // When there is calls ongoing, the second level tab "dial pad" will be shown
  const dialPad = screen.queryByTestId('Dial Pad');
  if (dialPad) {
    fireEvent.click(dialPad);
  }
};
