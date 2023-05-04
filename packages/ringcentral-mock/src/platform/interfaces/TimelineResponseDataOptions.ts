import { TimelineCountersResponseOptions } from './TimelineCountersResponseOptions';
import { TimelineTimersResponseOptions } from './TimelineTimersResponseOptions';

// This field provides mapping of possible breakdown options for call aggregation time intervals
export interface TimelineResponseDataOptions {
  /**
   */
  counters: TimelineCountersResponseOptions;
  /**
   */
  timers: TimelineTimersResponseOptions;
}
