import type { StepFunction } from '../../../lib/step';

export const NetworkOff: StepFunction = (_, context) => {
  context.phone.connectivityMonitor.setNetworkLoss();
};
