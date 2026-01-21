import { StepFunction } from '@ringcentral-integration/test-utils';

import { CallButtonBehavior } from './CallButtonBehavior';

export const AnswerCall: StepFunction = async () => {
  return <CallButtonBehavior callButtonBehaviorType={'answer'} />;
};
