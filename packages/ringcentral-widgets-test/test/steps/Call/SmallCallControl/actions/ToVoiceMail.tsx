import type { StepFunction } from '../../../../lib/step';
import { CallButtonBehavior } from './CallButtonBehavior';

export const ToVoiceMail: StepFunction = async (props, context) => {
  await CallButtonBehavior({ callButtonBehaviorType: 'voicemail' }, context);
};
