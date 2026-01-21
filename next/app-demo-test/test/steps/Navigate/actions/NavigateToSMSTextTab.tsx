import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  fireEvent,
  screen,
  StepFunction,
} from '@ringcentral-integration/test-utils';

import { NavigateToMessagesTab } from './NavigateToMessages';

export const NavigateToSMSTextTab: StepFunction = async (props, context) => {
  await NavigateToMessagesTab(props, context);
  await whenStateChange(() => {
    expect(screen.getByTestId('Text')).toBeInTheDocument();
  });
  fireEvent.click(screen.getByTestId('Text'));
};
