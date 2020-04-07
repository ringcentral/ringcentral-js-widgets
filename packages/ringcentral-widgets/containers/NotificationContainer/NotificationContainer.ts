import { NotificationPanel } from '../../components/NotificationPanel';
import { connectModule } from '../../lib/phoneContext';

export const NotificationContainer = connectModule((phone) => phone.alertUI)(
  NotificationPanel,
);
