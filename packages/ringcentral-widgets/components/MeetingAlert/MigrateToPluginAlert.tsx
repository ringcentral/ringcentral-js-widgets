import type { RcAlertProps } from '@ringcentral/juno';
import { RcAlert, RcLink, RcBox, RcIconButton } from '@ringcentral/juno';
import { Close } from '@ringcentral/juno-icon';
import React from 'react';

import FormattedMessage from '../FormattedMessage';

import i18n from './i18n';
import styles from './styles.scss';

type MigrateToPluginAlertProps = RcAlertProps & {
  currentLocale: string;
  substituteName: string;
  onCloseAlert?: () => void;
};

export const MigrateToPluginAlert = ({
  substituteName,
  currentLocale,
  onCloseAlert,
}: MigrateToPluginAlertProps) => {
  const app = (
    <RcLink
      variant="inherit"
      data-sign="substituteLink"
      target="_blank"
      href="https://www.ringcentral.com/apps/microsoft-outlook"
    >
      {substituteName}
    </RcLink>
  );

  return (
    <div className={styles.wrapper} data-sign="outlook-outdated-alert">
      <RcAlert severity="warning" className={styles.alert} icon>
        <RcBox display="flex" justifyContent="flex-start">
          <RcBox flex={1} mt={2}>
            <FormattedMessage
              message={i18n.getString('migrateToPluginAlert', currentLocale)}
              values={{
                app,
              }}
            />
          </RcBox>
          <RcIconButton symbol={Close} onClick={onCloseAlert} />
        </RcBox>
      </RcAlert>
    </div>
  );
};
