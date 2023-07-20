import type { ActivityCallLogPanelProps } from '../../components/ActivityCallLogPanel';
import { CallHistoryCallLogPanel } from '../../components/CallHistoryCallLogPanel';
import type { CallLogMethods } from '../../interfaces/EvActivityCallUI.interface';
import { connectModule } from '../../lib/connectModule';

export type CallHistoryCallLogPageProps = {
  id: string;
  method: CallLogMethods;
} & Pick<ActivityCallLogPanelProps, 'startAdornmentRender'>;

export const CallHistoryCallLogPage =
  connectModule<CallHistoryCallLogPageProps>((phone) => phone.evActivityCallUI)(
    CallHistoryCallLogPanel,
  );
