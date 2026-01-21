import {
  userEvent,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const ClickDialButton = async () => {
  userEvent.click(screen.getByTestId('callButton'));
  await waitForRenderReady();
};
