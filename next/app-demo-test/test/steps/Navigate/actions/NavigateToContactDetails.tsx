import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  StepFunction,
  fireEvent,
  screen,
  waitForRenderReady,
  within,
} from '@ringcentral-integration/test-utils';

export const NavigateToContactDetails: StepFunction<{
  userName: string;
}> = async ({ userName }) => {
  await whenStateChange(() => {
    expect(screen.getByTitle(userName)).toBeInTheDocument();
  });
  const contactItem = screen.getByTitle(userName);
  fireEvent.click(contactItem);
  await waitForRenderReady();

  let recentActivityHeader: HTMLElement | undefined;
  const recentActivityPanel = screen.queryByTestId('recentActivityPanel');
  if (recentActivityPanel) {
    recentActivityHeader =
      within(recentActivityPanel).getByTestId('headerTitle');
  }

  const header = screen
    .queryAllByTestId('headerTitle')
    .filter((node) => node !== recentActivityHeader);

  expect(header[0]).toBeInTheDocument();
  expect(header[0]).toHaveTextContent('Contact Details');
};
