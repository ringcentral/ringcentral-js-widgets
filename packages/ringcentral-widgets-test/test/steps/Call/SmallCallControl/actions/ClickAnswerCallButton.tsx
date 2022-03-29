import { StepFunction } from '../../../../lib/step';
import { CallButtonBehavior } from './CallButtonBehavior';

export const ClickAnswerCallButton: StepFunction = async (props, context) => {
  await CallButtonBehavior({ callButtonBehaviorType: 'answer' }, context);
};
