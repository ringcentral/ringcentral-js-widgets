import { HelpMd } from '@ringcentral/spring-icon';
import { Icon } from '@ringcentral/spring-ui';
import React from 'react';

import { t } from './i18n';

interface SmsCapabilityAlertProps {
  phoneNumber: string;
}

export const SmsCapabilityAlert = ({
  phoneNumber,
}: SmsCapabilityAlertProps) => {
  return (
    <div className="flex items-center gap-1" data-sign="smsCapabilityAlert">
      <Icon symbol={HelpMd} size="small" />
      {t('smsCapabilityAlert', { phoneNumber })}
    </div>
  );
};
