import { CallHistoryPanel } from 'ringcentral-widgets/components/CallHistoryPanel';
import { connectModule } from '../../lib/connectModule';

export const CallHistoryPage = connectModule((phone) => phone.evCallHistoryUI)(
  CallHistoryPanel,
);
