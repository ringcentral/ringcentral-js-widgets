export interface SleepDetectorOptions {
  detectionInterval?: number;
  detectionThreshold?: number;
  maxListeners?: number;
}

export interface Deps {
  sleepDetectorOptions?: SleepDetectorOptions;
}
