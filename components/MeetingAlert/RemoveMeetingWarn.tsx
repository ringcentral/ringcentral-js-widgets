import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import type { AlertProps } from '@ringcentral/spring-ui';
import { Alert, Link } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React from 'react';

import { FormattedMessage } from '../FormattedMessage';

import i18n from './i18n';
import styles from './styles.scss';

type RemoveMeetingWarnProps = Pick<AlertProps, 'severity'> & {
  brandConfig: any;
  // for Firefox
  hasRemoved?: boolean;
};

export const RemoveMeetingWarn = ({
  brandConfig,
  hasRemoved = false,
}: RemoveMeetingWarnProps) => {
  const app = (
    <Link
      data-sign="removeMeetingWarningLink"
      className={clsx(styles.underline, styles.textInherit)}
      target="_blank"
      color="warning.f02"
      href={`${brandConfig.alternativeLink}${brandConfig.id}`}
      key={brandConfig.id}
    >
      {brandConfig.substituteName}
    </Link>
  );
  const { t } = useLocale(i18n);

  return (
    <div className={styles.expandWrapper} data-sign="removeMeetingWarning">
      <Alert severity="warning" className={styles.expandAlert}>
        <FormattedMessage
          message={t('scheduleMeetingTips')}
          values={{
            app,
          }}
        />
      </Alert>
    </div>
  );
};
