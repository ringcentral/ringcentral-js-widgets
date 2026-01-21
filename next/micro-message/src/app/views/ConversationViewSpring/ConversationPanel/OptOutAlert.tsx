import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import useContactRenderInfoI18n from '@ringcentral-integration/micro-phone/src/app/hooks/useContactRenderInfo/i18n';
import { InfoMd } from '@ringcentral/spring-icon';
import { Icon, Tooltip } from '@ringcentral/spring-ui';
import React from 'react';

import i18n from './i18n';

export const OptOutAlert = () => {
  const { t } = useLocale(i18n, useContactRenderInfoI18n);
  return (
    <div className="flex items-center gap-1">
      {t('optOutAlert')}
      <Tooltip title={t('optOutAlertTooltip')}>
        <Icon symbol={InfoMd} size="small" />
      </Tooltip>
    </div>
  );
};
