import type { LogNotesButtonProps } from '@ringcentral-integration/ai-notes/src/app/views/SmartNotesView/SmartNotes.view.interface';

export type SmartNotesLogViewProps = LogNotesButtonProps;

export interface SmartNotesLogViewOptions {
  shouldShowSaveToCrmButton?: (callMetadata: {
    sessionId: string;
    telephonySessionId: string;
  }) => boolean;
}
