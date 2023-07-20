import { RcModuleV2 } from '@ringcentral-integration/core';

import { Module } from '../../lib/di';
import { SleepDetection } from '../../lib/SleepDetection';
import type { Deps } from './SleepDetector.interface';

@Module({
  name: 'SleepDetector',
  deps: [{ dep: 'SleepDetectorOptions', optional: true }],
})
export class SleepDetector extends RcModuleV2<Deps> {
  protected _detector: SleepDetection;
  constructor(deps: Deps) {
    super({
      deps,
    });
    this._detector = new SleepDetection({
      ...deps.sleepDetectorOptions,
    });
  }

  get events() {
    return this._detector.events;
  }

  on(...args: Parameters<SleepDetection['on']>) {
    this._detector.on(...args);
  }

  off(...args: Parameters<SleepDetection['off']>) {
    this._detector.off(...args);
  }
}
