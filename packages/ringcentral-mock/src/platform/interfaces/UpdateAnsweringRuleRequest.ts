import { ForwardingInfoCreateRuleRequest } from './ForwardingInfoCreateRuleRequest';
import { CallersInfoRequest } from './CallersInfoRequest';
import { CalledNumberInfo } from './CalledNumberInfo';
import { ScheduleInfo } from './ScheduleInfo';
import { UnconditionalForwardingInfo } from './UnconditionalForwardingInfo';
import { QueueInfo } from './QueueInfo';
import { VoicemailInfo } from './VoicemailInfo';
import { MissedCallInfo } from './MissedCallInfo';
import { GreetingInfo } from './GreetingInfo';
import { TransferredExtensionInfo } from './TransferredExtensionInfo';

export interface UpdateAnsweringRuleRequest {
  /**
   * Identifier of an answering rule
   */
  id: string;
  /**
   */
  forwarding: ForwardingInfoCreateRuleRequest;
  /**
   * Specifies if the rule is active or inactive. The default value is 'True'
   */
  enabled: boolean;
  /**
   * Name of an answering rule specified by user
   */
  name: string;
  /**
   * Answering rule will be applied when calls are received from the specified caller(s)
   */
  callers: CallersInfoRequest[];
  /**
   * Answering rules are applied when calling to selected number(s)
   */
  calledNumbers: CalledNumberInfo[];
  /**
   */
  schedule: ScheduleInfo;
  /**
   * Specifies how incoming calls are forwarded
   */
  callHandlingAction:
    | 'ForwardCalls'
    | 'UnconditionalForwarding'
    | 'AgentQueue'
    | 'TransferToExtension'
    | 'TakeMessagesOnly'
    | 'PlayAnnouncementOnly'
    | 'SharedLines';
  /**
   * Type of an answering rule
   */
  type: 'BusinessHours' | 'AfterHours' | 'Custom';
  /**
   */
  unconditionalForwarding: UnconditionalForwardingInfo;
  /**
   */
  queue: QueueInfo;
  /**
   */
  voicemail: VoicemailInfo;
  /**
   */
  missedCall: MissedCallInfo;
  /**
   * Greetings applied for an answering rule; only predefined greetings can be applied, see Dictionary Greeting List
   */
  greetings: GreetingInfo[];
  /**
   * Call screening status. 'Off' - no call screening; 'NoCallerId' - if caller ID is missing, then callers are asked to say their name before connecting; 'UnknownCallerId' - if caller ID is not in contact list, then callers are asked to say their name before connecting; 'Always' - the callers are always asked to say their name before connecting. The default value is 'Off'
   */
  screening: 'Off' | 'NoCallerId' | 'UnknownCallerId' | 'Always';
  /**
   * Indicates whether inactive numbers should be returned or not
   */
  showInactiveNumbers: boolean;
  /**
   */
  transfer: TransferredExtensionInfo;
}
