import type { StepFunction } from '@ringcentral-integration/test-utils';

import { CallButtonBehavior } from './CallButtonBehavior';

export const IgnoreCall: StepFunction = async () => {
  return <CallButtonBehavior callButtonBehaviorType={'ignore'} />;
};
