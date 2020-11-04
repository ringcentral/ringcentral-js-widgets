import {
  NotificationPanel,
  NotificationPanelProps,
} from '../../components/NotificationPanel';
import { connectModule } from '../../lib/phoneContext';

type NotificationContainerProp = {
  regionSettingsUrl?: string;
  callingSettingsUrl?: string;
  getAdditionalRenderer?: Function;
} & Pick<
  NotificationPanelProps,
  'classes' | 'size' | 'messageAlign' | 'fullWidth' | 'className'
>;

export const NotificationContainer = connectModule<
  any,
  NotificationContainerProp
>((phone) => phone.alertUI)(NotificationPanel);
