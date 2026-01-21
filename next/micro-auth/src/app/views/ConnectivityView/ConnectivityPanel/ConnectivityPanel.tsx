import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  Announcement,
  CircularProgressIndicator,
} from '@ringcentral/spring-ui';
import type { FunctionComponent } from 'react';
import React from 'react';

import type { ConnectivityViewProps } from '../Connectivity.view.interface';

import i18n from './i18n';

export const ConnectivityPanel: FunctionComponent<ConnectivityViewProps> = ({
  mode,
  loading,
  onClick,
  retry,
  ...rest
}) => {
  const { t } = useLocale(i18n);
  if (!mode) return null;

  return (
    <Announcement
      severity="error"
      className="rounded-none"
      classes={{
        body: 'gap-2',
      }}
      data-sign="ConnectivityBadge"
      action={
        loading ? (
          <CircularProgressIndicator
            title={t('connecting')}
            color="danger"
            size="small"
          />
        ) : retry ? (
          <button
            className="typography-subtitleMini hover:underline active:opacity-80"
            onClick={onClick}
            data-sign="ConnectivityBadgeRefresh"
          >
            {t('refresh')}
          </button>
        ) : null
      }
      {...rest}
    >
      {t(mode as never)}
    </Announcement>
  );
};
