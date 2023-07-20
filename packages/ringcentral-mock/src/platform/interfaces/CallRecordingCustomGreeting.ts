import type { CallRecordingCustomGreetingData } from './CallRecordingCustomGreetingData';
import type { CallRecordingCustomGreetingLanguage } from './CallRecordingCustomGreetingLanguage';

export interface CallRecordingCustomGreeting {
  /**
   */
  type: 'StartRecording' | 'StopRecording' | 'AutomaticRecording';
  /**
   */
  custom: CallRecordingCustomGreetingData;
  /**
   */
  language: CallRecordingCustomGreetingLanguage;
}
