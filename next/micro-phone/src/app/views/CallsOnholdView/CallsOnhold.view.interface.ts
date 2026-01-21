import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';

import type {
  ActiveCallsPanelProps,
  ActiveCallsViewProps,
} from '../ActiveCallsView';

export interface CallsOnholdViewProps extends ActiveCallsViewProps {}

export interface CallsOnholdPanelProps extends ActiveCallsPanelProps {
  calls: Call[];
  onMerge: (sessionId: string) => Promise<void>;
  onBackButtonClick: () => void;
  onAdd: () => void;
}

export type ICallsOnholdViewParams = {
  fromNumber?: string;
  fromSessionId?: string;
};
