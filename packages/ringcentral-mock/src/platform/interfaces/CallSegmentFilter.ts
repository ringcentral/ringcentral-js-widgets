import { PerformanceCallsCallSegmentLengthFilter } from './PerformanceCallsCallSegmentLengthFilter';

export interface CallSegmentFilter {
  /**
   */
  callSegment:
    | 'Ringing'
    | 'LiveTalk'
    | 'Hold'
    | 'Park'
    | 'Transfer'
    | 'IvrPrompt'
    | 'Voicemail'
    | 'VmGreeting';
  /**
   */
  callSegmentLength: PerformanceCallsCallSegmentLengthFilter;
}
