import { StepFunction } from '@ringcentral-integration/test-utils';

import { CallButtonBehavior } from './CallButtonBehavior';

export const AnswerAndHoldCall: StepFunction = async (_, context) => {
  return <CallButtonBehavior callButtonBehaviorType="answerAndHold" />;
};
