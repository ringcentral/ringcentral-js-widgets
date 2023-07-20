import type { StepFunction } from '../../lib/step';

interface MockPutPresenceProps {}

export const MockPutPresence: StepFunction<MockPutPresenceProps> = (
  _,
  { rcMock, phone },
) => {
  rcMock.presenceUpdate((defaultBody, request) => {
    const requestPayload = JSON.parse(request?.body?.toString() ?? '{}');
    const presenceData = phone.presence.data;
    return {
      ...defaultBody,
      ...presenceData,
      ...requestPayload,
    };
  });
};
