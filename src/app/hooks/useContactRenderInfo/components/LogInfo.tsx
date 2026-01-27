import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { Tag } from '@ringcentral/spring-ui';
import React from 'react';

import i18n from '../i18n';

export const LogInfo = ({
  logged,
  delaySavingState,
  DelayComponent,
}: {
  logged?: boolean;
  delaySavingState?: {
    delayUpdatingStartTime: number;
    delayUpdatingMinutes: number;
  } | null;
  DelayComponent?: React.ComponentType<{
    startTime: number;
    durationMinutes: number;
  }>;
}) => {
  const { t } = useLocale(i18n);

  return (
    <div className="flex gap-1 items-center">
      {delaySavingState && DelayComponent ? (
        <DelayComponent
          startTime={delaySavingState.delayUpdatingStartTime}
          durationMinutes={delaySavingState.delayUpdatingMinutes}
        />
      ) : logged ? (
        <Tag data-sign="loggedCall" color="success" variant="inverted">
          {t('logged')}
        </Tag>
      ) : (
        <Tag data-sign="unloggedCall" color="neutral" variant="inverted">
          {t('unlogged')}
        </Tag>
      )}
    </div>
  );
};
