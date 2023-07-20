import type { StepFunction } from '../../../../lib/step';

export const HoldCallOnOtherDevice: StepFunction = (_, context) => {
  context.rcMock.holdCall(context.phone.activeControl?.activeSessionId);
};
