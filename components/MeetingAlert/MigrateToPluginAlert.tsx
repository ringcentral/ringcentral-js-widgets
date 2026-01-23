import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { Xmd } from '@ringcentral/spring-icon';
import {
  Alert,
  type AlertProps,
  IconButton,
  Link,
} from '@ringcentral/spring-ui';
import React from 'react';

import { FormattedMessage } from '../FormattedMessage';

import i18n from './i18n';
import styles from './styles.scss';

type MigrateToPluginAlertProps = AlertProps & {
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
    <Link
      className="text-inherit"
      data-sign="substituteLink"
      target="_blank"
      href="https://www.ringcentral.com/apps/microsoft-outlook"
    >
      {substituteName}
    </Link>
  );
  const { t } = useLocale(i18n);

  return (
    <div className={styles.wrapper} data-sign="outlook-outdated-alert">
      <Alert severity="warning" className={styles.alert} icon>
        <div className="flex justify-start">
          <div className="flex-1 mt-3">
            <FormattedMessage
              message={t('migrateToPluginAlert')}
              values={{
                app,
              }}
            />
          </div>
          <IconButton symbol={Xmd} onClick={onCloseAlert} />
        </div>
      </Alert>
    </div>
  );
};
