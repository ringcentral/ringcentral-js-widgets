import {
  StepFunction,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const ClickCallItemByLabel: StepFunction<{
  label: string;
}> = async ({ label }) => {
  const callsList = screen.queryAllByTestId('callList');
  callsList.forEach((list) => {
    if (within(list).queryAllByLabelText(label)) {
      userEvent.click(within(list).getByTestId('currentName'));
    }
  });

  await waitForRenderReady();
};
