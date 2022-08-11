import { VoicemailsInfo } from './VoicemailsInfo';
import { InboundFaxesInfo } from './InboundFaxesInfo';
import { OutboundFaxesInfo } from './OutboundFaxesInfo';
import { InboundTextsInfo } from './InboundTextsInfo';
import { MissedCallsInfo } from './MissedCallsInfo';

export interface NotificationSettingsUpdateRequest {
  /**
   * List of notification recipient email addresses. Should not be empty if 'includeManagers' parameter is set to false
   */
  emailAddresses: string[];
  /**
   * List of notification recipient email addresses
   */
  smsEmailAddresses: string[];
  /**
   * Specifies notifications settings mode. If 'True' then advanced mode is on, it allows using different emails and/or phone numbers for each notification type. If 'False' then basic mode is on. Advanced mode settings are returned in both modes, if specified once, but if basic mode is switched on, they are not applied
   */
  advancedMode: boolean;
  /**
   */
  voicemails: VoicemailsInfo;
  /**
   */
  inboundFaxes: InboundFaxesInfo;
  /**
   */
  outboundFaxes: OutboundFaxesInfo;
  /**
   */
  inboundTexts: InboundTextsInfo;
  /**
   */
  missedCalls: MissedCallsInfo;
  /**
   * Specifies if managers' emails are included in the list of emails to which notifications are sent. If not specified, then the value is 'True'
   * Default: true
   */
  includeManagers: boolean;
}
