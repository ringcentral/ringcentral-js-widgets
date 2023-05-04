import { PresetInfo } from './PresetInfo';
import { CustomGreetingInfoRequest } from './CustomGreetingInfoRequest';

export interface GreetingInfo {
  /**
   * Type of a greeting, specifying the case when the greeting is played.
   */
  type:
    | 'Introductory'
    | 'Announcement'
    | 'ConnectingMessage'
    | 'ConnectingAudio'
    | 'Voicemail'
    | 'Unavailable'
    | 'InterruptPrompt'
    | 'HoldMusic'
    | 'Custom'
    | 'Company'
    | 'BlockedCallersSpecific'
    | 'BlockedCallersAll'
    | 'BlockedNoCallerId'
    | 'BlockedPayPhones'
    | 'StartRecording'
    | 'StopRecording'
    | 'AutomaticRecording';
  /**
   */
  preset: PresetInfo;
  /**
   */
  custom: CustomGreetingInfoRequest;
}
