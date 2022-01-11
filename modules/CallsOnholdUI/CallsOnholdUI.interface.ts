import { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';

import {
  ActiveCallsContainerProps,
  ActiveCallsPanelProps,
  Deps as BaseDeps,
} from '../ActiveCallsUI';
import { RouterInteraction } from '../RouterInteraction';

export interface Deps extends BaseDeps {
  routerInteraction: RouterInteraction;
}

export interface CallsOnholdContainerProps extends ActiveCallsContainerProps {
  params: {
    fromSessionId: string;
    fromNumber: string;
  };
}

export interface CallsOnholdPanelProps extends ActiveCallsPanelProps {
  calls: Call[];
  onMerge: (sessionId: string) => Promise<void>;
  onBackButtonClick: () => void;
  onAdd: () => void;
}
