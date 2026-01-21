import React from 'react';

import { t } from './i18n';

interface SmsCapabilityAlertProps {
  phoneNumber: string;
}

export const SmsCapabilityAlert = ({
  phoneNumber,
}: SmsCapabilityAlertProps) => {
  return (
    <div className="flex items-center gap-1">
      {t('smsCapabilityAlert', { phoneNumber })}
    </div>
  );
};
