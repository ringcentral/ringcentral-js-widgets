import type { LogNotesButtonProps } from '../../services/CallAction/SmartNotes.interface';

export type SmartNotesLogViewProps = LogNotesButtonProps;

export interface SmartNotesLogViewOptions {
  shouldShowSaveToCrmButton?: (callMetadata: {
    sessionId: string;
    telephonySessionId: string;
  }) => boolean;
}
