import {
  fireEvent,
  screen,
  StepFunction,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';

export const NavigateToMeeting: StepFunction = async () => {
  const showMeeting = screen.queryByTestId('meetingTab');
  if (showMeeting) {
    fireEvent.click(screen.getByTestId('meetingTab'));
    return;
  }

  if (screen.queryByTestId('moreMenu')) {
    fireEvent.click(screen.getByTestId('moreMenu'));
    await waitForRenderReady();
  }

  fireEvent.click(screen.getByTestId('meetingTab'));
};
