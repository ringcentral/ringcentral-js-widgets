import {
  NotificationPanel,
  NotificationPanelProps,
} from '../../components/NotificationPanel';
import { connectModule } from '../../lib/phoneContext';

// NotificationProps &
type NotificationContainerProp = {
  regionSettingsUrl?: string;
  callingSettingsUrl?: string;
  getAdditionalRenderer?: Function;
} & Pick<NotificationPanelProps, 'classes'>;

export const NotificationContainer = connectModule<
  any,
  NotificationContainerProp
>((phone) => phone.alertUI)(NotificationPanel);
