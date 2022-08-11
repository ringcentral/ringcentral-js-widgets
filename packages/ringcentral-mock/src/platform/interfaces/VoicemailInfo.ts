import { RecipientInfo } from './RecipientInfo';

// Specifies whether to take a voicemail and who should do it
export interface VoicemailInfo {
  /**
   * If 'True' then voicemails are allowed to be received
   */
  enabled: boolean;
  /**
   */
  recipient: RecipientInfo;
}
