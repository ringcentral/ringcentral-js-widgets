import {
  fireEvent,
  screen,
  StepFunction,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';

interface NavigateToMessageHistoryProps {
  tabName: 'Fax' | 'Text' | 'All' | 'Voice';
}

export const NavigateToMessageHistory: StepFunction<
  NavigateToMessageHistoryProps
> = async ({ tabName = 'All' }) => {
  fireEvent.click(screen.getByText(tabName));
  await waitForRenderReady();
};
