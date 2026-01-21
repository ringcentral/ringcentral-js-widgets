import {
  ActiveCallControl,
  ICurrentDeviceCallsMap,
} from '@ringcentral-integration/micro-phone/src/app/services';
import { StepFunction } from '@ringcentral-integration/test-utils';

import { CallButtonBehavior } from './CallButtonBehavior';

export const AnswerCallAtOtherDevice: StepFunction = async (props, { app }) => {
  return (
    <>
      <CallButtonBehavior callButtonBehaviorType={'answer'} />
      {() => {
        const activeCallControl = app.container.got(ActiveCallControl)!;
        const currentDeviceCallsMap: ICurrentDeviceCallsMap = {};
        const callControlSessions = activeCallControl.data.sessions;
        activeCallControl._updateActiveSessions(
          currentDeviceCallsMap,
          callControlSessions,
        );
      }}
    </>
  );
};
