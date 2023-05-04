import React from 'react';

import { RcAlert, RcAlertProps, RcLink } from '@ringcentral/juno';

import FormattedMessage from '../FormattedMessage';
import i18n from './i18n';
import styles from './styles.scss';

type RemoveMeetingWarnProps = Pick<RcAlertProps, 'severity'> & {
  currentLocale: string;
  brandConfig: any;
  hasRemoved?: boolean;
};

export const RemoveMeetingWarn = ({
  currentLocale,
  brandConfig,
  hasRemoved = false,
}: RemoveMeetingWarnProps) => {
  const app = (
    <RcLink
      variant="inherit"
      data-sign="removeMeetingWarningLink"
      className={styles.underline}
      target="_blank"
      color="warning.f02"
      href={`${brandConfig.alternativeLink}${brandConfig.id}`}
      key={brandConfig.id}
    >
      {brandConfig.substituteName}
    </RcLink>
  );
  return (
    <div className={styles.expandWrapper} data-sign="removeMeetingWarning">
      <RcAlert severity="warning" className={styles.expandAlert}>
        <FormattedMessage
          message={i18n.getString(
            hasRemoved ? 'scheduleMeetingTips' : 'removeMeetingWarning',
            currentLocale,
          )}
          values={{
            // @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
            app,
          }}
        />
      </RcAlert>
    </div>
  );
};
