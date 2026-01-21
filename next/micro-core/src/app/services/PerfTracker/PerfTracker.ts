import {
  injectable,
  optional,
  RcModule,
  Root,
} from '@ringcentral-integration/next-core';
import { getOSType } from '@ringcentral-integration/utils';
import { equals } from 'ramda';
import { interval, takeUntil, tap } from 'rxjs';

import type {
  PerfMetricsParams,
  PerfTrackerOptions,
} from './PerfTracker.interface';
import { getMemoryUsed } from './helper';

export const APPLICATION_NAME = 'int-teams-trace';
export const DEFAULT_INTERVAL = 60 * 1000;

/**
 * performance tracking module, if you need custom report detail data, can use `detailProcessor` to custom that
 */
@injectable({
  name: 'PerfTracker',
})
export class PerfTracker extends RcModule {
  private _marks = new Set<string>();
  private _measures = new Set<string>();
  private _lastMeasurements?: PerfMetricsParams[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  detailProcessor = new Set<(value: any) => any>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getProcessedDetail(value: any) {
    if (this.detailProcessor.size > 0) {
      return [...this.detailProcessor].reduce((acc, curr) => {
        return curr(acc);
      }, value);
    }

    return value;
  }

  get performance() {
    return this._perfTrackerOption?.performanceProvider ?? performance;
  }

  constructor(
    private _root: Root,
    @optional('PerfTrackerOptions')
    protected _perfTrackerOption: PerfTrackerOptions,
  ) {
    super();
    const intervalTime = this._perfTrackerOption.interval || DEFAULT_INTERVAL;

    if (this.enabled) {
      interval(intervalTime)
        .pipe(
          tap(() => {
            this.flush();
          }),
          // when app destroy remove that interval
          takeUntil(this._root.destroy$),
        )
        .subscribe();
    }
  }
  /**
   * create a timestamp marker in the browser's performance timeline
   * @param key
   * @returns
   */
  public mark(key: string, markOptions?: PerformanceMarkOptions) {
    if (!this.enabled) return;
    try {
      this.performance.mark(key, markOptions);
      this._marks.add(key);
    } catch (err) {
      this.logger.log('performance mark error', err);
    }
  }

  /**
   * create a timestamp marker in the browser's performance timeline only one time
   * if call this function multiple times, only create the first timestamp marker
   * @param mark key
   * @returns
   */
  public markOnce(key: string, markOptions?: PerformanceMarkOptions) {
    if (!this.enabled || this._marks.has(key)) return;
    this.mark(key, markOptions);
  }

  /**
   * measure the time between two marks in the browser's performance timeline.
   * @param param0
   * @returns
   */
  public measure({
    name,
    startMark,
    endMark,
  }: {
    name: string;
    startMark?: string | number;
    endMark?: string | number;
  }) {
    if (!this.enabled) return;
    try {
      const detail = this.getProcessedDetail({
        type: 'duration',
        os: getOSType(),
        memoryUsed: getMemoryUsed(),
        applicationName: APPLICATION_NAME,
        // This is a temporary filed, will modified in the future
        createAt: Date.now(),
        env: this._perfTrackerOption.env,
      });

      this.performance.measure(name, {
        start: startMark ? startMark : 0,
        end: endMark || this.performance.now(),
        detail,
      });
      this._measures.add(name);
    } catch (err) {
      this.logger.log('performance measure error', err);
    }
  }

  /**
   * measure the time between two marks in the browser's performance timeline.
   * if call mulptile time, only measure the first time
   * @param param0
   * @returns
   */
  public measureOnce({
    name,
    startMark,
    endMark,
  }: {
    name: string;
    startMark?: string | number;
    endMark?: string | number;
  }) {
    if (!this.enabled || this._measures.has(name)) return;
    this.measure({ name, startMark, endMark });
  }

  public now() {
    return this.performance.now() + this.performance.timeOrigin;
  }

  private transform(entries: PerformanceMeasure[]) {
    return entries.map(
      ({ name, duration, detail }) =>
        ({
          name,
          value: `${duration}`,
          unit: 'ms',
          labels: detail,
        } as PerfMetricsParams),
    );
  }

  public peakMeasurement() {
    const measured =
      (this.performance.getEntriesByType?.(
        'measure',
      ) as PerformanceMeasure[]) ?? [];
    const { sortByName } = this._perfTrackerOption ?? {};
    const bulk = this.transform(
      sortByName
        ? measured.sort(
            (a, b) => sortByName!.indexOf(a.name) - sortByName!.indexOf(b.name),
          )
        : measured,
    );
    return bulk;
  }

  public flush() {
    const measured = this.peakMeasurement();
    if (!measured.length) return;
    if (!equals(measured, this._lastMeasurements)) {
      this.logger.log(measured);
      this._lastMeasurements = measured;
      console.table(measured);
    }
  }

  get enabled() {
    return this._perfTrackerOption.enabled ?? false;
  }
}
