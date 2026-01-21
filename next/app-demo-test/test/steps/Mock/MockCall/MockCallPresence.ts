import { Webphone } from '@ringcentral-integration/micro-phone/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockCallPresenceProps {}

export const MockCallPresence: StepFunction<MockCallPresenceProps> = (
  props,
  { rcMock, app },
) => {
  const webphone = app.container.got(Webphone)!;
  rcMock.mockCallPresence(webphone.sessions);
};
