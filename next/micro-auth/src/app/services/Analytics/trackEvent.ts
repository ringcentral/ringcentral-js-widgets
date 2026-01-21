import { Subject } from 'rxjs';

import type { TrackEventPropertyMap } from '../TrackPropsService';

export const globalTrackEvent$ = new Subject<
  [eventName: string, properties: Record<string, any>]
>();

/**
 * Track an event with type-safe properties directly.
 *
 * @param eventName - The event name to track.
 * @param properties - The properties for the event, type-checked by event name.
 */
export function trackEvent<T extends keyof TrackEventPropertyMap>(
  eventName: T,
  properties: TrackEventPropertyMap[T],
): void {
  if (!globalTrackEvent$.observed) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(
        'No observers for globalTrackEvent$. Please ensure you have subscribed to it before tracking events.',
      );
    }
    return;
  }

  globalTrackEvent$.next([eventName, properties]);
}
