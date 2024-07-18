import type { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import type { GetPresenceInfo } from '@ringcentral-integration/mock';

import type { StepFunction } from '../../../lib/step';

interface TriggerActiveCallChangedProps {
  handler?: (eventData: GetPresenceInfo) => GetPresenceInfo;
  handlerSessions?: (sessions: NormalizedSession[]) => NormalizedSession[];
}

export const TriggerActiveCallChanged: StepFunction<
  TriggerActiveCallChangedProps
> = ({ handler, handlerSessions }, { phone, rcMock }) => {
  const sessions =
    handlerSessions?.(phone.webphone.sessions) ?? phone.webphone.sessions;
  rcMock.triggerActiveCallChanged({ sessions, handler });
};
