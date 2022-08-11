import { ScheduleInfo } from './ScheduleInfo';
import { CalledNumberInfo } from './CalledNumberInfo';
import { CallersInfo } from './CallersInfo';
import { ForwardingInfo } from './ForwardingInfo';
import { UnconditionalForwardingInfo } from './UnconditionalForwardingInfo';
import { QueueInfo } from './QueueInfo';
import { TransferredExtensionInfo } from './TransferredExtensionInfo';
import { VoicemailInfo } from './VoicemailInfo';
import { GreetingInfo } from './GreetingInfo';
import { SharedLinesInfo } from './SharedLinesInfo';
import { MissedCallInfo } from './MissedCallInfo';

export interface AnsweringRuleInfo {
  /**
   * Canonical URI to an answering rule resource
   */
  uri: string;
  /**
   * Internal identifier of an answering rule
   */
  id: string;
  /**
   * Type of an answering rule
   */
  type: 'BusinessHours' | 'AfterHours' | 'Custom';
  /**
   * Name of an answering rule specified by user
   */
  name: string;
  /**
   * Specifies if an answering rule is active or inactive
   */
  enabled: boolean;
  /**
   */
  schedule: ScheduleInfo;
  /**
   * Answering rules are applied when calling to selected number(s)
   */
  calledNumbers: CalledNumberInfo[];
  /**
   * Answering rules are applied when calls are received from specified caller(s)
   */
  callers: CallersInfo[];
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
   * Greetings applied for an answering rule; only predefined greetings can be applied, see Dictionary Greeting List
   */
  greetings: GreetingInfo[];
  /**
   * Call screening status. 'Off' - no call screening; 'NoCallerId' - if caller ID is missing, then callers are asked to say their name before connecting; 'UnknownCallerId' - if caller ID is not in contact list, then callers are asked to say their name before connecting; 'Always' - the callers are always asked to say their name before connecting. The default value is 'Off'
   */
  screening: 'Off' | 'NoCallerId' | 'UnknownCallerId' | 'Always';
  /**
   */
  sharedLines: SharedLinesInfo;
  /**
   */
  missedCall: MissedCallInfo;
}
