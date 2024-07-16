import { NotificationPanel } from '../../components/NotificationPanel';
import { connectModule } from '../../lib/phoneContext';

import type { NotificationContainerProps } from './NotificationContainer.interface';

export const NotificationContainer = connectModule<
  any,
  NotificationContainerProps
>((phone) => phone.alertUI)(NotificationPanel);
