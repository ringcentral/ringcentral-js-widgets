import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';
import type { RcvCheckboxDataSign } from '../../Meeting/Meeting.interface';

export const TurnOffToggle: StepFunction<{
  dataSign: RcvCheckboxDataSign | string;
}> = async ({ dataSign }) => {
  const checkbox = screen
    .getByTestId(dataSign)
    .getElementsByTagName('input')[0];

  if (checkbox.checked) {
    screen.getByTestId(dataSign).click();
  }
};
