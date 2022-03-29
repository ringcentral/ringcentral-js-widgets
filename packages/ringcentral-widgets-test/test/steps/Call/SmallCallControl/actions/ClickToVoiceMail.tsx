import { StepFunction } from '../../../../lib/step';
import { CallButtonBehavior } from './CallButtonBehavior';

export const ClickToVoiceMail: StepFunction = async (props, context) => {
  await CallButtonBehavior({ callButtonBehaviorType: 'voicemail' }, context);
};
