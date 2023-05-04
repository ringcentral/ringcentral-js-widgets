import { screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';
import { RcvCheckboxDataSign } from '../../Meeting/Meeting.interface';

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
