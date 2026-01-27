import type ForwardPanel from '@ringcentral-integration/widgets/components/ForwardPanel';

export interface ForwardViewOptions {
  component?: typeof ForwardPanel;
}

export interface ForwardViewFunctions {
  onForward: (
    forwardNumber: string,
    telephonySessionId: string,
  ) => Promise<void>;
  onBackClick: () => void;
}
export interface ForwardViewProps {}
