import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { AlertMd } from '@ringcentral/spring-icon';
import { Icon, Button } from '@ringcentral/spring-ui';
import type { FunctionComponent } from 'react';
import React from 'react';

import i18n from './i18n';

export type CRMAuthFailPanelProps = {
  onSignOut: () => void;
  onTryAgain: () => void;
  tryAgainAfterSeconds: number;
};

export const CRMAuthFailPanel: FunctionComponent<CRMAuthFailPanelProps> = ({
  onSignOut,
  onTryAgain,
  tryAgainAfterSeconds,
}) => {
  const { t } = useLocale(i18n);

  return (
    <div className="w-full h-full pt-[179px]">
      <div className="text-center">
        <Icon className="text-danger" size="xxlarge" symbol={AlertMd} />
        <div className="typography-mainText text-center text-neutral-b0 mt-6">
          {t('canNotAuthenticate')}
        </div>
        <div className="typography-mainText text-center text-neutral-b0">
          {tryAgainAfterSeconds
            ? t('tryAgainLater', {
                seconds: tryAgainAfterSeconds,
              })
            : t('tryAgainNow')}
        </div>
      </div>
      <div className="fixed w-full flex flex-col bottom-0 p-4">
        <Button
          variant="contained"
          onClick={onTryAgain}
          size="large"
          disabled={!!tryAgainAfterSeconds}
          data-sign="tryAgain"
          fullWidth
        >
          {t('tryBtn')}
        </Button>
        <Button
          variant="outlined"
          onClick={onSignOut}
          size="large"
          data-sign="signOut"
          fullWidth
          className="mt-4"
        >
          {t('signOut')}
        </Button>
      </div>
    </div>
  );
};
