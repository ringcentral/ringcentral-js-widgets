export interface PerfTrackerOptions {
  /**
   * build environment
   */
  env?: string;
  /**
   * enabled track performance
   */
  enabled: boolean;
  /**
   * interval to send measure data to andon server
   */
  interval?: number;
  /**
   * pass a unified Performance instance only when it is only allowed one
   */
  performanceProvider?: Performance;
  /**
   * sort the measure data by name
   */
  sortByName?: string[];
}

export interface KeyValue {
  [key: string]: any;
}

export interface AndonMetricsBody {
  name: string;
  value: string;
  unit?: string;
  ctx_id: string;
  labels?: KeyValue;
}

export type PerfMetricsParams = Omit<AndonMetricsBody, 'ctx_id'>;

export interface AndonMetricsBatchBody extends AndonMetricsBody {
  create_at?: number;
}

export type PerfMetricsBatchParams = Omit<AndonMetricsBatchBody, 'ctx_id'>;
