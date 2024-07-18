import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { StepFunction } from '../../../lib/step';

export const ClickCallItemByLabel: StepFunction<{
  label: string;
  currentName?: string;
}> = async ({ label, currentName }) => {
  const callsList = screen.queryAllByTestId('callList');
  callsList.forEach((list) => {
    if (within(list).queryByText(label)) {
      if (currentName) {
        expect(within(list).getByTestId('currentName')).toHaveTextContent(
          currentName,
        );
      }
      userEvent.click(within(list).getByTestId('currentName'));
    }
  });

  await waitForRenderReady();
};
