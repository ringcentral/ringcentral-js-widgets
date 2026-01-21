import { IAnalytics } from './Analytics.interface';

export type TrackEvent =
  | string
  | ((
      ...args: any
    ) =>
      | (
          | [string, object?]
          | ((analytics: IAnalytics) => [string, object?] | void)
        )
      | void);

export function execTracking(
  analytics: IAnalytics,
  trackEvent: TrackEvent,
  args: any[],
) {
  if (typeof analytics?.track === 'function') {
    if (typeof trackEvent === 'string') {
      analytics.track(trackEvent);
    } else {
      let trackReturn = trackEvent(...args);
      if (typeof trackReturn === 'function') {
        trackReturn = trackReturn(analytics);
      }
      if (Array.isArray(trackReturn)) {
        const [event, trackProps] = trackReturn;
        if (event) {
          analytics.track(event, trackProps);
        }
      }
    }
  }
}
