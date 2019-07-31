import { Module } from '../../lib/di';
import RcModule from '../../lib/RcModule';
import moduleStatuses from '../../enums/moduleStatuses';
import {
  SleepDetector as Detector,
  SleepDetectorEvents,
} from '../../lib/SleepDetector';

@Module({
  deps: [
    { dep: 'SleepDetectorOptions', optional: true },
  ],
})
export default class SleepDetector extends RcModule {
  constructor({
    detectionInterval,
    detectionThreshold,
  }) {
    super();
    this._detector = new Detector({ detectionInterval, detectionThreshold });
  }

  get events() {
    return SleepDetectorEvents;
  }

  on(...args) {
    this._detector.on(...args);
  }

  off(...args) {
    this._detector.on(...args);
  }

  get status() {
    return moduleStatuses.ready;
  }
}
