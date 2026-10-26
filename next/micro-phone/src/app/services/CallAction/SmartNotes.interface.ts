import type { ComponentType, ReactNode } from 'react';

/**
 * Contracts for the optional AI notes services. Apps that include AI notes
 * provide implementations under these names through `@dynamic`; micro-phone
 * only relies on the members declared here.
 */
export interface SmartNotes {
  readonly hasPermission: boolean;
  /** Whether a call (by telephony session id) has AI notes. */
  readonly aiNotedCallMapping: Record<string, boolean>;
  verifySessionFromId(telephonySessionId: string): Promise<void> | void;
}

export interface SmartNoteClient {
  readonly isAiNotesLoading: boolean;
  readonly isAiNotesPauseable: boolean;
  startOrResume(): Promise<boolean>;
  stopNotes(): Promise<boolean>;
}

export interface SmartNotesViewProps {
  variant: string;
  info: unknown;
  mode: 'in-call' | 'post-call';
  logNotesButton?: ReactNode;
  'data-sign'?: string;
  'data-tab-type'?: string;
}

export interface SmartNotesView {
  component: ComponentType<SmartNotesViewProps>;
}

export interface LogNotesButtonProps {
  sessionId: string;
  telephonySessionId: string;
}
