import { StepFunction } from '../../../../lib/step';
import { CallButtonBehavior } from './CallButtonBehavior';

export const ClickIgnoreCall: StepFunction = async (props, context) => {
  await CallButtonBehavior({ callButtonBehaviorType: 'ignore' }, context);
};
