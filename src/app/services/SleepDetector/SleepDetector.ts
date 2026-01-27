import { SleepDetection } from '@ringcentral-integration/commons/lib/SleepDetection';
import {
  injectable,
  optional,
  RcModule,
} from '@ringcentral-integration/next-core';
import { Observable, share } from 'rxjs';

import type { SleepDetectorOptions } from './SleepDetector.interface';

@injectable({
  name: 'SleepDetector',
})
export class SleepDetector extends RcModule {
  protected _detector = new SleepDetection({
    ...this._sleepDetectorOptions,
  });

  heartbeat$ = new Observable<void>((observer) => {
    const heartbeatHandler = () => observer.next();
    this._detector.on(this._detector.events.heartbeat, heartbeatHandler);

    return () => {
      this._detector.off(this._detector.events.heartbeat, heartbeatHandler);
    };
  }).pipe(share());

  /**
   * when the user in sleep mode, the event will got when user wake up
   */
  detect$ = new Observable<boolean>((observer) => {
    const detectHandler = (sleeping: boolean) => observer.next(sleeping);
    this._detector.on(this.events.detected, detectHandler);

    return () => {
      this._detector.off(this.events.detected, detectHandler);
    };
  }).pipe(share());

  constructor(
    @optional('SleepDetectorOptions')
    protected _sleepDetectorOptions?: SleepDetectorOptions,
  ) {
    super();
  }

  get events() {
    return this._detector.events;
  }
}
