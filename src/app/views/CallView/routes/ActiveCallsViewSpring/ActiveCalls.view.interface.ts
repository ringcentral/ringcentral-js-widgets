import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';

import { ICallAction } from '../../../../hooks';
import type { CreateActionsHandler } from '../../../../services';

import type { ActiveCallsPanel } from './ActiveCallsPanel';

export interface ActiveCallsViewProps {}

export interface ActiveCallsPanelProps {
  /**
   * the call show on the announcement for back call
   */
  backToCall: Call;
  calls: Call[];
  useActiveCallItemActions(call: Call): ICallAction[];
  useActionsHandler: CreateActionsHandler;
}

export interface ActiveCallsViewOptions {
  component?: typeof ActiveCallsPanel;
}
