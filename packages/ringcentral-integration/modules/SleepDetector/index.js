/* eslint-disable prettier/prettier */
import { Module } from '../../lib/di';
import RcModule from '../../lib/RcModule';
import moduleStatuses from '../../enums/moduleStatuses';
import {
  SleepDetector as Detector,
  SleepDetectorEvents,
} from '../../lib/SleepDetector';

const MAX_LISTENERS = 30;

@Module({
  name: 'SleepDetector',
  deps: [{ dep: 'SleepDetectorOptions', optional: true }],
})
export default class SleepDetector extends RcModule {
  constructor({ detectionInterval, detectionThreshold, maxListeners = MAX_LISTENERS }) {
    super();
    this._detector = new Detector({ detectionInterval, detectionThreshold });
    // It is very normal to have more than 10 listeners, since all DataFetcher classes
    // will listen to the sleep detected event.
    this._detector.setMaxListeners(maxListeners);
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
