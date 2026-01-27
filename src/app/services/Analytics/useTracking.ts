import { useEventCallback } from '@material-ui/core';
import { useContainer } from '@ringcentral-integration/next-core';

import { Analytics } from './Analytics';
import { IAnalytics } from './Analytics.interface';
import { execTracking } from './execTracking';

type Args<T extends unknown[], A extends IAnalytics = IAnalytics> = [
  ...T,
  Omit<A, 'track'>,
];

/**
 *
 * Provide you can use track hook inside component
 *
 * #### - when you just need trackEvent directly, `useTracking` without any callback

 * ```ts
 * const trackEvent = useTracking();
 *
 * const onClick = () => {
 *   // track that event directly
 *   trackEvent('come events');
 * };
 * ```
 *
 * #### - when you need use analytics module methods
 *
 * ```ts
 * const trackEvent2 = useTracking<[number, string], Analytics>(
 *   (times, message, analytics) => {
 *     const info = analytics.getAccountInfo?.();
 *
 *     return [
 *       'EventName',
 *       {
 *         info,
 *         times,
 *         message,
 *       },
 *     ];
 *   },
 * );
 *
 * const onClick2 = () => {
 *   const times = 1;
 *   const message = 'login';
 *   trackEvent2(times, message);
 * };
 * ```
 *
 * #### - also can track with object parameters
 * ```ts
 * const trackEvent3 = useTracking<[{ userId: string }]>(({ userId }) => {
 *   return [
 *     'EventName',
 *     {
 *       userId,
 *     },
 *   ];
 * });
 *
 * const onClick3 = () => {
 *   // track event with object
 *   trackEvent3({ userId: 'example user' });
 * };
 * ```
 */
export const useTracking = <
  T extends unknown[] = [string],
  A extends IAnalytics = IAnalytics,
>(
  trackCallback?: (...args: Args<T, A>) => [string, object?],
) => {
  const analytics = useContainer<Analytics, true>('Analytics');

  const trackEvent = useEventCallback((...args: unknown[]) => {
    // when not have track module, do nothing return directly
    if (!analytics) return;

    const toTrackEvent = trackCallback ?? (args[0] as string);
    execTracking(analytics, toTrackEvent, [...args, analytics]);
  });
  return trackEvent as unknown as (...args: T) => void;
};
