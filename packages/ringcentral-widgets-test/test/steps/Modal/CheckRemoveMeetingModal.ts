import type { Context } from '../../interfaces';
import type { StepFunction } from '../../lib/step';

import { CheckModalValue } from './CheckModalValue';

export const CheckRemoveMeetingModal: StepFunction = async (
  _,
  context: Context,
) => {
  return CheckModalValue(
    {
      title: 'Remove meeting?',
      confirmButtonText: 'Remove',
      cancelButtonText: 'Cancel',
      childrenContent: 'Would you like to remove the meeting?',
    },
    context,
  );
};
