import { StepFunction } from '../../lib/step';

export const CleanEventsTrackData: StepFunction = async (_, { phone }) => {
  if (!phone.analytics) {
    throw new Error('Analytics module is not injected');
  }
  if (!phone.analytics._useLog) {
    throw new Error('Analytics module option `useLog` is not enabled');
  }

  phone.analytics._logs = [];
};
