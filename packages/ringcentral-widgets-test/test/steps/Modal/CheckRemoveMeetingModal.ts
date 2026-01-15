import type { Context } from '../../interfaces';
import type { StepFunction } from '../../lib/step';

import { CheckModalValue } from './CheckModalValue';

export const CheckRemoveMeetingModal: StepFunction = async (
  _,
  context: Context,
) => {
  return CheckModalValue(
    {
      title: 'Remove RingCentral meeting?',
      confirmButtonText: 'Remove',
      cancelButtonText: 'Cancel',
      childrenContent:
        'The RingCentral meeting will be removed from this event.',
    },
    context,
  );
};
