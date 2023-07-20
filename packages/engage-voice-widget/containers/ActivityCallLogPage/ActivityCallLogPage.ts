import type { ActivityCallLogPanelProps } from '../../components/ActivityCallLogPanel';
import { ActivityCallLogPanel } from '../../components/ActivityCallLogPanel';
import { connectModule } from '../../lib/connectModule';

export type ActivityCallLogPageProps = {
  id: string;
} & Pick<ActivityCallLogPanelProps, 'startAdornmentRender'>;

export const ActivityCallLogPage = connectModule<ActivityCallLogPageProps>(
  (phone) => phone.evActivityCallUI,
)(ActivityCallLogPanel);
