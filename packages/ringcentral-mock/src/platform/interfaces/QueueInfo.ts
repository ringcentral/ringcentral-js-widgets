import type { TransferInfo } from './TransferInfo';
import type { FixedOrderAgents } from './FixedOrderAgents';
import type { UnconditionalForwardingInfo } from './UnconditionalForwardingInfo';

// Queue settings applied for department (call queue) extension type, with the 'AgentQueue' value specified as a call handling action
export interface QueueInfo {
  /**
   * Specifies how calls are transferred to group members
   */
  transferMode: 'Rotating' | 'Simultaneous' | 'FixedOrder';
  /**
   * Call transfer information
   */
  transfer: TransferInfo[];
  /**
   * Specifies the type of action to be taken if: members are available but no one answers, or all members are busy/unavailable. This option is available for Business hours only. For simultaneous transfer mode only 'WaitPrimaryMembers' and 'WaitPrimaryAndOverflowMembers' are supported
   */
  noAnswerAction:
    | 'WaitPrimaryMembers'
    | 'WaitPrimaryAndOverflowMembers'
    | 'Voicemail'
    | 'TransferToExtension'
    | 'UnconditionalForwarding';
  /**
   * Information on a call forwarding rule
   */
  fixedOrderAgents: FixedOrderAgents[];
  /**
   * Connecting audio interruption mode
   */
  holdAudioInterruptionMode: 'Never' | 'WhenMusicEnds' | 'Periodically';
  /**
   * Connecting audio interruption message period in seconds
   */
  holdAudioInterruptionPeriod: number;
  /**
   * Specifies the type of action to be taken after the hold time (waiting for an available call queue member) expires. If 'TransferToExtension' option is selected, the extension specified in `transfer` field is used. The default value is `Voicemail`
   * Default: Voicemail
   */
  holdTimeExpirationAction:
    | 'TransferToExtension'
    | 'UnconditionalForwarding'
    | 'Voicemail';
  /**
   * Maximum time in seconds to wait for a call queue member before trying the next member
   */
  agentTimeout: number;
  /**
   * Minimum post-call wrap up time in seconds before agent status is automatically set; the value range is from 180 to 300
   */
  wrapUpTime: number;
  /**
   * Maximum hold time in seconds to wait for an available call queue member
   */
  holdTime: number;
  /**
   * Maximum count of callers on hold; the limitation is 25 callers
   */
  maxCallers: number;
  /**
   * Specifies the type of action to be taken if count of callers on hold exceeds the supported maximum
   */
  maxCallersAction:
    | 'Voicemail'
    | 'Announcement'
    | 'TransferToExtension'
    | 'UnconditionalForwarding';
  /**
   */
  unconditionalForwarding: UnconditionalForwardingInfo[];
}
