import { CallRecordingCustomGreetingData } from './CallRecordingCustomGreetingData';
import { CallRecordingCustomGreetingLanguage } from './CallRecordingCustomGreetingLanguage';

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
