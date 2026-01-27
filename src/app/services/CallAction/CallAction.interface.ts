import { type ReplyWithTextParams } from 'ringcentral-call-control/lib/Session';

export interface CallActionOptions {
  /**
   * If true, will have the ability to expand the call view. which means the right hand side view will be able to be expanded or collapsed.
   *
   * @default true
   */
  expandedAbility?: boolean;
  /**
   * Callback that is called before closing the call view (e.g., when clicking back button during a call)
   * Can be used to show warnings or perform checks before allowing navigation
   *
   * @param sessionId - The session ID of the call being closed (used for call logging)
   */
  onBeforeClose?: (sessionId: string) => Promise<void> | void;

  /**
   * If true, the smart notes feature will be enabled for the brand.
   *
   */
  brandAllowsSmartNotes?: boolean;
}

export type CallMetaInfo = {
  /**
   * does current call action panel open
   */
  open: boolean;
  /**
   * the path of the current render panel
   */
  currentPath: CallActionRoutePath | null;
  /**
   * does actions disabled
   */
  actionsDisabled: boolean;
  /**
   * incoming call minimized status
   */
  minimized: boolean;
  /**
   * expanded status of the expanded detail
   *
   * when be null, means that still be init state
   */
  expanded: boolean | null;
};

export type CallActionRoutePath =
  | 'incoming'
  | 'controls'
  | 'transfer'
  | 'forward'
  | 'reply'
  | 'keypad';

export type CallActionTypeDataMap = {
  sendDTMF: string;
  flip: string;
  startSwap: string;
  activeCall: string;
  startTransfer: string;
  startWarmTransfer: string;
  startTransferToVoicemail: string;
  startForward: string;
  startReply: ReplyWithTextParams;
  hangUp: string;
  hangUpWarmTransfer: string;
  unHold: string;
  voicemail: string;
  startMerge: string;
  viewConferenceList: string;
  removeParticipant: string;
} & Record<string, undefined>;
