import type { EmailRecipientInfo } from './EmailRecipientInfo';
import type { InboundFaxesInfo } from './InboundFaxesInfo';
import type { InboundTextsInfo } from './InboundTextsInfo';
import type { MissedCallsInfo } from './MissedCallsInfo';
import type { OutboundFaxesInfo } from './OutboundFaxesInfo';
import type { VoicemailsInfo } from './VoicemailsInfo';

export interface NotificationSettings {
  /**
   * Canonical URI of notifications settings resource
   */
  uri: string;
  /**
   * List of extensions specified as email notification recipients. Returned only for call queues where queue managers are assigned as user extensions.
   */
  emailRecipients: EmailRecipientInfo[];
  /**
   * List of notification recipient email addresses
   */
  emailAddresses: string[];
  /**
   * Specifies if managers' emails are included in the list of emails to which notifications are sent
   */
  includeManagers: boolean;
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
}
