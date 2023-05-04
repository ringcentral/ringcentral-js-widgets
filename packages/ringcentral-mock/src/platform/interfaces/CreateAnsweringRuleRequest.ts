import { CallersInfoRequest } from './CallersInfoRequest';
import { CalledNumberInfo } from './CalledNumberInfo';
import { ScheduleInfo } from './ScheduleInfo';
import { ForwardingInfo } from './ForwardingInfo';
import { UnconditionalForwardingInfo } from './UnconditionalForwardingInfo';
import { QueueInfo } from './QueueInfo';
import { TransferredExtensionInfo } from './TransferredExtensionInfo';
import { VoicemailInfo } from './VoicemailInfo';
import { MissedCallInfo } from './MissedCallInfo';
import { GreetingInfo } from './GreetingInfo';

export interface CreateAnsweringRuleRequest {
  /**
   * Specifies if the rule is active or inactive. The default value is 'True'
   */
  enabled: boolean;
  /**
   * Type of an answering rule. The 'Custom' value should be specified
   */
  type: string;
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
   */
  forwarding: ForwardingInfo;
  /**
   */
  unconditionalForwarding: UnconditionalForwardingInfo;
  /**
   */
  queue: QueueInfo;
  /**
   */
  transfer: TransferredExtensionInfo;
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
}
