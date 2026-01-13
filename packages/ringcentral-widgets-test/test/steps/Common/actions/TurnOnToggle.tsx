import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';
import type { RcvCheckboxDataSign } from '../../Meeting/Meeting.interface';

export const TurnOnToggle: StepFunction<{
  dataSign: RcvCheckboxDataSign | string;
}> = async ({ dataSign }) => {
  const checkbox = screen.getByTestId(dataSign).querySelector('input')!;

  if (!checkbox.checked) {
    checkbox.click();
  }
};
