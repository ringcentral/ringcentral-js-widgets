/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-console */
import type {
  RcModule,
  RcViewModule,
} from '@ringcentral-integration/next-core';
import { getRef } from '@ringcentral-integration/next-core';

import { Analytics } from './Analytics';
import type { IAnalytics } from './Analytics.interface';
import { execTracking, TrackEvent } from './execTracking';

interface Descriptor<T> extends TypedPropertyDescriptor<T> {
  initializer?(): T;
}

/**
 * decorate a method with `Analytics` Module
 *
 * @param trackEvent define trackEvent for tracking
 * @param enable enable or disable tracking
 */
export const track = (trackEvent: TrackEvent, enable = true) => {
  return (
    target: RcModule | RcViewModule,
    name: string,
    descriptor?: Descriptor<any>,
  ) => {
    if (!enable) {
      return descriptor;
    }

    if (
      typeof descriptor?.value !== 'function' &&
      typeof descriptor?.initializer !== 'function'
    ) {
      throw new Error(`@track decorated '${name}' is not a method`);
    }
    let fn: (...args: any) => any = descriptor?.value;
    const initializer = descriptor.initializer;
    // eslint-disable-next-line func-names
    const trackedFn = function (this: RcModule, ...args: any) {
      let analytics: IAnalytics | null = null;
      try {
        analytics = getRef(this).container!.got(Analytics)!;
      } catch (e) {
        //
      }
      if (typeof initializer === 'function') {
        fn = initializer.call(this);
      }
      if (typeof fn !== 'function') {
        throw new Error(`@track decorated '${name}' is not a function`);
      }
      const result = fn.apply(this, args);
      if (!analytics) {
        return result;
      }
      try {
        execTracking(analytics, trackEvent, [this, ...args]);
      } catch (e) {
        console.warn(`Analytics Error: ${getRef(target).identifier}.${name}`);
        console.error(e);
      }
      return result;
    };
    // the any type is just to be compatible with babel and tsc.
    return {
      enumerable: true,
      configurable: true,
      value: trackedFn,
    } as any;
  };
};
