import type { StepFunction } from '../../../../lib/step';

import { CallButtonBehavior } from './CallButtonBehavior';

export const AnswerAndHoldCall: StepFunction = async (_, context) => {
  await CallButtonBehavior(
    { callButtonBehaviorType: 'answerAndHold' },
    context,
  );
};
