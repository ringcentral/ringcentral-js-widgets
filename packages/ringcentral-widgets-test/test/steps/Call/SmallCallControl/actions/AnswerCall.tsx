import type { StepFunction } from '../../../../lib/step';
import { CallButtonBehavior } from './CallButtonBehavior';

export const AnswerCall: StepFunction = async (props, context) => {
  await CallButtonBehavior({ callButtonBehaviorType: 'answer' }, context);
};
