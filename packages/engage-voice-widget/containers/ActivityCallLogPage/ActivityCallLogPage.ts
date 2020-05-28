import { ActivityCallLogPanel } from '../../components/ActivityCallLogPanel';
import { connectModule } from '../../lib/connectModule';

export interface ActivityCallLogPageProps {
  id: string;
}

export const ActivityCallLogPage = connectModule<ActivityCallLogPageProps>(
  (phone) => phone.evActivityCallUI,
)(ActivityCallLogPanel);
