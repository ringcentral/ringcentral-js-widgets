import {
  fireEvent,
  screen,
  StepFunction,
} from '@ringcentral-integration/test-utils';

export const NavigateToAllCalls: StepFunction = async () => {
  fireEvent.click(screen.getByText('All Calls'));
  return;
};
