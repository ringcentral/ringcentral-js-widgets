import React from 'react';
import { RcAlert, RcAlertProps, RcLink } from '@ringcentral/juno';

import styles from './styles.scss';
import i18n from './i18n';
import FormattedMessage from '../FormattedMessage';

type RemoveMeetingWarnProps = Pick<RcAlertProps, 'severity'> & {
  currentLocale: string;
  brandConfig: any;
};

export const RemoveMeetingWarn = ({
  currentLocale,
  brandConfig,
}: RemoveMeetingWarnProps) => {
  const app = (
    <RcLink
      variant="inherit"
      data-sign="removeMeetingWarningLink"
      className={styles.underline}
      target="_blank"
      color="warning.f02"
      href={brandConfig.alternativeLink}
    >
      {brandConfig.substituteName}
    </RcLink>
  );
  return (
    <div className={styles.expandWrapper} data-sign="removeMeetingWarning">
      <RcAlert severity="warning" className={styles.expandAlert}>
        <FormattedMessage
          message={i18n.getString('removeMeetingWarning', currentLocale)}
          values={{
            app,
          }}
        />
      </RcAlert>
    </div>
  );
};
