import {
  fireEvent,
  screen,
  StepFunction,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';

import { NavigateToMessagesTab } from './NavigateToMessages';

export const NavigateToComposeText: StepFunction = async (props, context) => {
  await NavigateToMessagesTab(props, context);
  fireEvent.click(screen.getByTestId('ComposeText'));
  await waitForRenderReady();
};
