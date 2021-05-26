import { Descriptor, identifierKey, RcModuleV2 } from './RcModule';

// TODO: move to `ringcentral-integration` package and import Analytics type

type Analytics = any;

type TrackEvent =
  | string
  | ((
      ...args: any
    ) =>
      | (
          | [string, object?]
          | ((analytics: Analytics) => [string, object?] | void)
        )
      | void);

/**
 * decorate a method with `Analytics` Module
 *
 * @param trackEvent define trackEvent for tracking
 */
export const track = (trackEvent: TrackEvent) => {
  return (target: RcModuleV2, name: string, descriptor?: Descriptor<any>) => {
    if (
      typeof descriptor.value !== 'function' &&
      typeof descriptor.initializer !== 'function'
    ) {
      throw new Error(`@track decorated '${name}' is not a method`);
    }
    let fn: (...args: any) => any = descriptor.value;
    const initializer = descriptor.initializer;
    // eslint-disable-next-line func-names
    const trackedFn = function (this: RcModuleV2, ...args: any) {
      const { analytics }: { analytics: Analytics } = this.parentModule as any;
      if (typeof initializer === 'function') {
        fn = initializer.call(this);
      }
      if (typeof fn !== 'function') {
        throw new Error(`@track decorated '${name}' is not a function`);
      }
      const result = fn.apply(this, args);
      try {
        if (typeof analytics?.track === 'function') {
          if (typeof trackEvent === 'string') {
            analytics.track(trackEvent);
          } else {
            let trackReturn = trackEvent(this, ...args);
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
      } catch (e) {
        console.warn(`Analytics Error: ${target[identifierKey]}.${name}`);
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
