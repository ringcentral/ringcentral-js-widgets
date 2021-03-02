import { CallLogMethods } from '../../interfaces/EvActivityCallUI.interface';
import { ActivityCallLogPanelProps } from '../../components/ActivityCallLogPanel';
import { CallHistoryCallLogPanel } from '../../components/CallHistoryCallLogPanel';
import { connectModule } from '../../lib/connectModule';

export type CallHistoryCallLogPageProps = {
  id: string;
  method: CallLogMethods;
} & Pick<ActivityCallLogPanelProps, 'startAdornmentRender'>;

export const CallHistoryCallLogPage = connectModule<
  CallHistoryCallLogPageProps
>((phone) => phone.evActivityCallUI)(CallHistoryCallLogPanel);
