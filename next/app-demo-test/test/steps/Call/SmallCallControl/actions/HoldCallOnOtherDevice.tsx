import { ActiveCallControl } from '@ringcentral-integration/micro-phone/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const HoldCallOnOtherDevice: StepFunction = (_, { rcMock, app }) => {
  const activeControl = app.container.get(ActiveCallControl);
  rcMock.holdCall(activeControl!.activeSessionId!);
};
