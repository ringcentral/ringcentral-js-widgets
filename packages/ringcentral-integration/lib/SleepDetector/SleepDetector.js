import EventEmitter from 'events';
import Enum from '../Enum';

const DEFAULT_INTERVAL = 30 * 1000;
const DEFAULT_THRESHOLD = 60 * 1000;

export const SleepDetectorEvents = new Enum([
  'heartbeat',
  'detected',
], 'SleepDetectorEvents');

export class SleepDetector extends EventEmitter {
  constructor({
    detectionInterval = DEFAULT_INTERVAL,
    detectionThreshold = DEFAULT_THRESHOLD,
    startImmediately = true,
  } = {}) {
    super();
    this._detectionInterval = detectionInterval;
    this._detectionThreshold = detectionThreshold;
    this._timeout = null;
    if (startImmediately) {
      this.detect();
    }
  }

  detect() {
    this.stop();
    const startTime = Date.now();
    this.emit(SleepDetectorEvents.heartbeat, startTime);
    this._timeout = global.setTimeout(
      () => {
        const endTime = Date.now();
        const sleepTime = endTime - startTime - this._detectionInterval;
        if (sleepTime > this._detectionThreshold) {
          this.emit(SleepDetectorEvents.detected, startTime, endTime, sleepTime);
        }
        this._timeout = null;
        this.detect();
      },
      this._detectionInterval
    );
  }

  stop() {
    if (this._timeout) {
      global.clearTimeout(this._timeout);
      this._timeout = null;
    }
  }
}
