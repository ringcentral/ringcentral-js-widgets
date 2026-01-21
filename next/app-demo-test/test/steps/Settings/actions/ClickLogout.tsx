import {
  fireEvent,
  screen,
  StepFunction,
} from '@ringcentral-integration/test-utils';

export const ClickLogoutButton: StepFunction = (_, { app }) => {
  fireEvent.click(screen.queryByTestId('logoutButton')!);
};
