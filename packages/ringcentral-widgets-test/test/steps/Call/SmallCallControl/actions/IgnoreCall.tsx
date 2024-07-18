import type { StepFunction } from '../../../../lib/step';

import { CallButtonBehavior } from './CallButtonBehavior';

export const IgnoreCall: StepFunction = async (props, context) => {
  await CallButtonBehavior({ callButtonBehaviorType: 'ignore' }, context);
};
