import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  fireEvent,
  screen,
  StepFunction,
} from '@ringcentral-integration/test-utils';

export const NavigateToFax: StepFunction = async () => {
  fireEvent.click(screen.queryByTestId('messagesTab')!);
  await whenStateChange(() => {
    expect(screen.getByTestId('Fax')).toBeInTheDocument();
  });
  fireEvent.click(screen.getByTestId('Fax'));
};
