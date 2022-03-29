import { ICurrentDeviceCallsMap } from '@ringcentral-integration/commons/modules/ActiveCallControlV2';
import { StepFunction } from '../../../../lib/step';
import { CallButtonBehavior } from './CallButtonBehavior';

export const AnswerCallAtOtherDevice: StepFunction = async (props, context) => {
  await CallButtonBehavior({ callButtonBehaviorType: 'answer' }, context);
  const { phone } = context;
  const currentDeviceCallsMap: ICurrentDeviceCallsMap = {};
  const callControlSessions = phone.activeCallControl.data.sessions;
  phone.activeCallControl._updateActiveSessions(
    currentDeviceCallsMap,
    callControlSessions,
  );
};
