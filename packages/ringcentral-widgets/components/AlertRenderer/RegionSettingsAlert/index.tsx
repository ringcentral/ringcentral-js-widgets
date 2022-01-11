import React from 'react';

import { regionSettingsMessages } from '@ringcentral-integration/commons/modules/RegionSettings/regionSettingsMessages';

import FormattedMessage from '../../FormattedMessage';
import i18n from './i18n';
import styles from './styles.scss';

type RegionSettingsAlertProps = {
  message: {
    id: string;
    message: string;
  };
  currentLocale: string;
  onRegionSettingsLinkClick?: (...args: any[]) => any;
};
export const RegionSettingsAlert: React.SFC<RegionSettingsAlertProps> = ({
  message: { id, message },
  currentLocale,
  onRegionSettingsLinkClick,
}) => {
  let msg;
  switch (message) {
    case regionSettingsMessages.dialingPlansChanged:
      {
        const regionSettings = i18n.getString('regionSettings', currentLocale);
        const regionSettingsLink = onRegionSettingsLinkClick ? (
          <a
            className={styles.link}
            onClick={(e) => {
              e.preventDefault();
              onRegionSettingsLinkClick({ alertId: id });
            }}
          >
            {regionSettings}
          </a>
        ) : (
          regionSettings
        );
        msg = (
          <FormattedMessage
            message={i18n.getString(message, currentLocale)}
            values={{ regionSettingsLink }}
          />
        );
      }
      break;
    default:
      msg = i18n.getString(message, currentLocale);
      break;
  }
  return <div>{msg}</div>;
};
RegionSettingsAlert.defaultProps = {
  onRegionSettingsLinkClick: undefined,
};
RegionSettingsAlert.handleMessage = ({ message }) =>
  message === regionSettingsMessages.saveSuccess ||
  message === regionSettingsMessages.dialingPlansChanged ||
  message === regionSettingsMessages.areaCodeInvalid;
export default RegionSettingsAlert;
