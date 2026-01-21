import { fireEvent, screen } from '@ringcentral-integration/test-utils';

import type { StepFunction } from '../../../lib/step';

export const ClickRingtoneInput: StepFunction = async () => {
  const inputNode = screen
    .getByTestId('ringtoneSelection')
    .querySelector('[role = button]');
  fireEvent.mouseDown(inputNode!);
};
