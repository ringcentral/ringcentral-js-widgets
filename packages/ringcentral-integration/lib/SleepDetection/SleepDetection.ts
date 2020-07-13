import EventEmitter from 'events';
import {
  ObjectMap,
  ObjectMapValue,
} from '@ringcentral-integration/core/lib/ObjectMap';

const DEFAULT_INTERVAL = 30 * 1000;
const DEFAULT_THRESHOLD = 60 * 1000;
const DEFAULT_MAX_LISTENERS = 30;

export const EVENTS = ObjectMap.fromKeys(['heartbeat', 'detected']);

export interface ISleepDetectionProps {
  detectionInterval?: number;
  detectionThreshold?: number;
  startImmediately?: boolean;
  maxListeners?: number;
}

export class SleepDetection {
  protected _detectionInterval: number;
  protected _detectionThreshold: number;
  protected _timeoutId: NodeJS.Timeout = null;
  protected _emitter = new EventEmitter();

  constructor({
    detectionInterval = DEFAULT_INTERVAL,
    detectionThreshold = DEFAULT_THRESHOLD,
    maxListeners = DEFAULT_MAX_LISTENERS,
    startImmediately = true,
  }: ISleepDetectionProps = {}) {
    this._detectionInterval = detectionInterval;
    this._detectionThreshold = detectionThreshold;
    this._emitter.setMaxListeners(maxListeners);
    if (startImmediately) {
      this.start();
    }
  }

  get events() {
    return EVENTS;
  }

  on(event: ObjectMapValue<typeof EVENTS>, handler: (...args: any[]) => void) {
    this._emitter.on(event, handler);
  }

  off(event: ObjectMapValue<typeof EVENTS>, handler: (...args: any[]) => void) {
    this._emitter.off(event, handler);
  }

  protected _detect() {
    this.stop();
    const startTime = Date.now();
    this._emitter.emit(this.events.heartbeat, startTime);
    this._timeoutId = global.setTimeout(() => {
      const endTime = Date.now();
      const sleepTime = endTime - startTime - this._detectionInterval;
      if (sleepTime > this._detectionThreshold) {
        this._emitter.emit(this.events.detected, startTime, endTime, sleepTime);
      }
      this._timeoutId = null;
      this._detect();
    }, this._detectionInterval);
  }

  start() {
    this._detect();
  }

  stop() {
    if (this._timeoutId) {
      global.clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }
  }
}
