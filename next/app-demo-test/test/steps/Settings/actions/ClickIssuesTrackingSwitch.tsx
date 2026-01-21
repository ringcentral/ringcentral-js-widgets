import { screen, userEvent, within } from '@ringcentral-integration/test-utils';

// https://jira_domain/browse/RCINT-33622
export const ClickIssuesTrackingSwitch = () => {
  const switchElm = screen.getByTestId('issuesTrackingSwitch');
  const checkbox = within(switchElm).getByRole('checkbox');
  userEvent.click(checkbox);
};
