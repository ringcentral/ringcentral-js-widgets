import moduleStatuses from '../../enums/moduleStatuses';
/* eslint-disable prettier/prettier */
import { Module } from '../../lib/di';
import RcModule from '../../lib/RcModule';
import { SleepDetection } from '../../lib/SleepDetection';

@Module({
  name: 'SleepDetector',
  deps: [{ dep: 'SleepDetectorOptions', optional: true }],
})
export default class SleepDetector extends RcModule {
  constructor({ detectionInterval, detectionThreshold }) {
    super();
    this._detector = new SleepDetection({
      detectionInterval,
      detectionThreshold,
    });
  }

  get events() {
    return this._detector.events;
  }

  on(...args) {
    this._detector.on(...args);
  }

  off(...args) {
    this._detector.off(...args);
  }

  get status() {
    return moduleStatuses.ready;
  }
}
