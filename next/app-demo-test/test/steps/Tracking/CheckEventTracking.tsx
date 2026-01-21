import { Analytics } from '@ringcentral-integration/micro-auth/src/app/services';
import { BrowserLogger } from '@ringcentral-integration/micro-core/src/app/services';
import { StepFunction } from '@ringcentral-integration/test-utils';

interface TrackLog {
  event: string;
  trackProps: any;
}

interface CheckEventTrackingProps {
  /**
   * The checked event name
   */
  event?: TrackLog['event'];
  /**
   * @deprecated should use `toHaveBeenTracked` instead for more accurate check
   */
  contain?: TrackLog['event'][];
  /**
   * The checked event data
   */
  data?: Partial<TrackLog['trackProps'] & Record<string, any>>;
  /**
   * The additional check function
   */
  check?: (logs: TrackLog[]) => void;
  /**
   * that the event has been tracked detail
   */
  toHaveBeenTracked?: TrackLog;
}

export const CheckEventTracking: StepFunction<CheckEventTrackingProps> = async (
  { event, data, check, contain, toHaveBeenTracked },
  { app },
) => {
  const analytics = app.container.got(Analytics);
  if (!analytics) {
    throw new Error('Analytics module is not injected');
  }
  const browserLogger = app.container.got(BrowserLogger);

  // Extract and parse analytics logs from browser logger
  // 2025-05-17T03:10:10.091Z|108 info: [root:Analytics] MSG: ["track event","Navigation: Click/Settings",{"router":"/settings"},1747450901523]
  const messages: TrackLog[] = (
    (browserLogger?.storageTransport as any)['_data'].messages || []
  )
    .filter((x: any) => x.data[0] === 'track event')
    .map((x: any) => {
      const [_, eventName, trackProps] = x.data;
      return {
        event: eventName,
        trackProps,
        timeStamp: x.time,
      };
    });

  if (toHaveBeenTracked) {
    expect(messages).toContainEqual(expect.objectContaining(toHaveBeenTracked));
  }

  const lastTrackEvent = messages.slice(-1)[0];

  if (event) {
    expect(lastTrackEvent.event).toBe(event);
  }

  if (data) {
    expect(lastTrackEvent.trackProps).toEqual(expect.objectContaining(data));
  }

  if (contain) {
    contain.forEach((event) => {
      const log = messages.some((l) => l.event === event);
      expect(log).toBeTruthy();
    });
  }

  check?.(messages);
};
