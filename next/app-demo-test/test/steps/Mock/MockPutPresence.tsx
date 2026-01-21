import { Presence } from '@ringcentral-integration/micro-auth/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockPutPresenceProps {}

export const MockPutPresence: StepFunction<MockPutPresenceProps> = (
  _,
  { rcMock, app },
) => {
  const presence = app.container.got(Presence)!;
  rcMock.presenceUpdate((defaultBody, request) => {
    const requestPayload = JSON.parse(request?.body?.toString() ?? '{}');
    const presenceData = presence.data;
    return {
      ...defaultBody,
      ...presenceData,
      ...requestPayload,
    };
  });
};
