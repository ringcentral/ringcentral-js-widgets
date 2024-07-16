import type { TrackLog } from '@ringcentral-integration/commons/modules/AnalyticsV2';

import type { StepFunction } from '../../lib/step';

interface CheckEventTrackingProps {
  /**
   * The checked event name
   */
  event?: TrackLog['event'];
  /**
   * Enable debugging the tracking logs
   */
  debug?: boolean;
  /**
   * The checked event data
   */
  data?: Partial<TrackLog['trackProps'] & Record<string, any>>;
  /**
   * The additional check function
   */
  check?: (logs: TrackLog[]) => void;
}

export const CheckEventTracking: StepFunction<CheckEventTrackingProps> = async (
  { event, debug, data, check },
  { phone },
) => {
  if (!phone.analytics) {
    throw new Error('Analytics module is not injected');
  }
  if (!phone.analytics._useLog) {
    throw new Error('Analytics module option `useLog` is not enabled');
  }
  const lastTrackEvent = phone.analytics._logs.slice(-1)[0] as TrackLog;

  if (debug) {
    console.log(phone.analytics._logs);
  }

  if (event) {
    expect(lastTrackEvent.event).toBe(event);
  }

  if (data) {
    expect(lastTrackEvent.trackProps).toEqual(expect.objectContaining(data));
  }

  check?.(phone.analytics._logs);
};
