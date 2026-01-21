import { type StepFunction, screen } from '@ringcentral-integration/test-utils';

import { CallButtonBehavior } from './CallButtonBehavior';

export const ToVoiceMail: StepFunction = async () => {
  if (screen.queryByTestId('voicemail')) {
    return <CallButtonBehavior callButtonBehaviorType={'voicemail'} />;
  }

  return <CallButtonBehavior callButtonBehaviorType={'toVoiceMail'} />;
};
