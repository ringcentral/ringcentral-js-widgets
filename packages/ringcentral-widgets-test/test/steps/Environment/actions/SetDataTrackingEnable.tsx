import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { Context } from '../../../interfaces';
import type { StepFunction } from '../../../lib/step';

export const SetDataTrackingEnable: StepFunction<{
  enable: boolean;
}> = ({ enable }, { phone }: Context) => {
  if (enable) {
    phone.analytics.mixpanel.init('xxx');
    phone.analytics.setUserId();
  }
  // enable
  const toggleElem = screen.getByTestId('dataTrackingToggle');
  expect(toggleElem).toBeInTheDocument();
  if (toggleElem.querySelector('input')!.checked !== enable) {
    userEvent.click(toggleElem);
  }

  // save
  const saveElem = screen.getByTestId('envSave');
  expect(saveElem).toBeInTheDocument();
  userEvent.click(saveElem);
};
