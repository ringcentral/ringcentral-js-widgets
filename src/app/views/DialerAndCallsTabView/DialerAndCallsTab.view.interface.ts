import type { TabContentView } from '@ringcentral-integration/widgets/components/TabContentView';

import type { CallingSettings, CallMonitor, Webphone } from '../../services';

export interface DialerAndCallsTabViewOptions {
  component?: typeof TabContentView;
}

export interface DialerAndCallsTabViewProps {
  hasActiveCalls?: (options: {
    callingSettings: CallingSettings;
    webphone?: Webphone;
    callMonitor?: CallMonitor;
  }) => boolean;
  children?: React.ReactNode;
}
