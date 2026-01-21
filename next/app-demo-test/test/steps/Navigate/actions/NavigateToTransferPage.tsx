import {
  fireEvent,
  screen,
  StepFunction,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';

export const NavigateToTransferPage: StepFunction = async () => {
  fireEvent.click(screen.getByTestId('transfer'));
  await waitForRenderReady();
};
