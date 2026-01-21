import type { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import { Webphone } from '@ringcentral-integration/micro-phone/src/app/services';
import type { EventData, GetPresenceInfo } from '@ringcentral-integration/mock';
import { StepFunction } from '@ringcentral-integration/test-utils';

interface TriggerActiveCallChangedProps {
  handler?: (
    eventData: EventData<GetPresenceInfo>,
  ) => EventData<GetPresenceInfo>;
  handlerSessions?: (sessions: NormalizedSession[]) => NormalizedSession[];
}

export const TriggerActiveCallChanged: StepFunction<
  TriggerActiveCallChangedProps
> = ({ handler, handlerSessions }, { app, rcMock }) => {
  const webphone = app.container.got(Webphone)!;
  const sessions = handlerSessions?.(webphone.sessions) ?? webphone.sessions;
  rcMock.triggerActiveCallChanged({ sessions, handler });
};
