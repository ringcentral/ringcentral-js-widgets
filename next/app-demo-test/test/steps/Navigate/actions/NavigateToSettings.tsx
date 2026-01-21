import {
  fireEvent,
  screen,
  StepFunction,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';

export const NavigateToSettings: StepFunction = async () => {
  const showSettings = screen.queryByTestId('settingsTab');
  if (showSettings) {
    fireEvent.click(showSettings);
    return;
  }

  const moreMenu = screen.queryByTestId('moreMenu');
  if (moreMenu) {
    fireEvent.click(moreMenu);
    await waitForRenderReady();
  }

  fireEvent.click(screen.getByTestId('settingsTab'));
  await waitForRenderReady();

  expect(screen.getByTestId('version')).toBeInTheDocument();
};
