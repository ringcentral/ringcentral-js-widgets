import type CallLogPanel from '@ringcentral-integration/widgets/components/CallLogPanel';
import type { CallLogPanelProps } from '@ringcentral-integration/widgets/components/CallLogPanel';

export interface CallLogViewOptions {
  component?: typeof CallLogPanel;
}

export interface CallLogViewProps extends CallLogViewPanelProps {
  //
}

// TODO: fix Partial<CallLogPanelProps>
export interface CallLogViewPanelProps extends Partial<CallLogPanelProps> {
  //
}
