import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

import type { RcvCheckboxDataSign } from '../../Meeting/Meeting.interface';

export const TurnOnToggle: StepFunction<{
  dataSign: RcvCheckboxDataSign | string;
}> = async ({ dataSign }) => {
  const checkbox = screen
    .getByTestId(dataSign)
    .getElementsByTagName('input')[0];

  if (!checkbox.checked) {
    screen.getByTestId(dataSign).click();
  }
};
