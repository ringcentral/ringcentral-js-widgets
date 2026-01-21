import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  fireEvent,
  screen,
  StepFunction,
} from '@ringcentral-integration/test-utils';

export const NavigateToVoiceMail: StepFunction = async () => {
  fireEvent.click(screen.queryByTestId('messagesTab')!);
  await whenStateChange(() => {
    expect(screen.getByTestId('Voice')).toBeInTheDocument();
  });
  fireEvent.click(screen.getByTestId('Voice'));
};
