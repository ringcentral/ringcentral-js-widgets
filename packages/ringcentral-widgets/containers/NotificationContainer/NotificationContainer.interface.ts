import type { NotificationPanelProps } from '../../components/NotificationPanel/NotificationPanel.interface';

export type NotificationContainerProps = {
  regionSettingsUrl?: string;
  callingSettingsUrl?: string;
  getAdditionalRenderer?: Function;
} & Pick<
  NotificationPanelProps,
  'classes' | 'size' | 'messageAlign' | 'fullWidth' | 'className'
>;
