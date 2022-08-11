import { StepFunction } from '../../../lib/step';

interface MockCallPresenceProps {}

export const MockCallPresence: StepFunction<MockCallPresenceProps> = (
  props,
  { rcMock, phone },
) => {
  rcMock.mockCallPresence(phone.webphone.sessions);
};
