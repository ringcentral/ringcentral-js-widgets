import {
  fireEvent,
  screen,
  StepFunction,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';

export const NavigateToDialer: StepFunction = async () => {
  fireEvent.click(screen.getByTestId('dialerTab'));
  await waitForRenderReady();

  // When there is calls ongoing, the second level tab "dial pad" will be shown
  const dialPad = screen.queryByTestId('Dial Pad');
  if (dialPad) {
    fireEvent.click(dialPad);
  }
};
